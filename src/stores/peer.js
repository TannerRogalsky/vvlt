import { createAction } from '@reduxjs/toolkit';
import Peer from 'simple-peer';
import { wsSend } from './websocket';
import { Renderer, RendererSettings, VvltClient } from 'vvlt';

import player1ImageSrc from '../../../../../rust/vult/resources/images/playerShip1_red.png';
import enemy1ImageSrc from '../../../../../rust/vult/resources/images/enemyBlack1.png';

const player1Image = new Image();
player1Image.src = player1ImageSrc;

const enemy1Image = new Image();
enemy1Image.src = enemy1ImageSrc;

export const p2pConnect = createAction('P2P_CONNECT', function prepare(any) {
  return {
    payload: any
  }
});
export const p2pConnecting = createAction('P2P_CONNECTING');
export const p2pConnected = createAction('P2P_CONNECTED');
export const p2pDisconnect = createAction('P2P_DISCONNECT');
export const p2pMessage = createAction('P2P_MESSAGE');
export const p2pSend = createAction('P2P_NEW_MESSAGE', function prepare(any) {
  return {
    payload: any
  };
});
export const p2pSignal = createAction('P2P_SIGNAL', function prepare(any) {
  return any;
});
export const newCanvas = createAction('NEW_GAME_CANVAS', function prepare(any) {
  return {
    payload: any
  };
});

const peerMiddleware = () => {
  let peerConnection = null;
  let vvlt = null;
  let isHost = null;
  let raf = null;

  const onConnect = store => () => {
    console.log("p2p", "onConnect");
    store.dispatch(p2pConnected());
  };

  const onClose = store => () => {
    console.log("p2p", "onClose");
    store.dispatch(p2pDisconnect());
  };

  const onSignal = store => (event) => {
    store.dispatch(wsSend({
      Signal: {
        payload: JSON.stringify(event),
      }
    }));
  };

  const onError = store => event => {
    console.log("p2p", "onError");
    store.dispatch(wsSend('LeaveRoom'));
  }

  const onData = store => (data) => {
    vvlt.handle_remote_input(data);
  }

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case 'P2P_CONNECT':
        if (peerConnection !== null) {
          peerConnection.destroy();
        }

        console.log('P2P_CONNECT', action.payload);
        // connect to the remote host
        peerConnection = new Peer({ initiator: action.payload });
        isHost = action.payload;

        peerConnection.on('signal', onSignal(store));
        peerConnection.on('connect', onConnect(store));
        peerConnection.on('error', onError(store));
        peerConnection.on('data', onData(store));

        break;
      case 'P2P_DISCONNECT':
        if (peerConnection !== null) {
          peerConnection.destroy();
        }
        peerConnection = null;
        // console.log('websocket closed');
        break;
      case 'P2P_NEW_MESSAGE':
        peerConnection.send(action.payload);
        break;
      case 'P2P_SIGNAL':
        peerConnection.signal(JSON.parse(action.payload))
        break;
      case 'NEW_GAME_CANVAS':
        let canvas = action.payload;
        if (canvas === null) {
          cancelAnimationFrame(raf);
          break;
        }

        const settings = new RendererSettings(canvas, player1Image, enemy1Image);
        const renderer = new Renderer(settings);
        renderer.set_width_height(512, 512);
        vvlt = new VvltClient(isHost);

        document.addEventListener('keydown', (event) => {
          event.preventDefault();
          let input = null;
          switch (event.key) {
            case 'ArrowUp':
              input = vvlt.handle_up_pressed();
              break;
            case 'ArrowDown':
              input = vvlt.handle_down_pressed();
              break;
            case 'ArrowLeft':
              input = vvlt.handle_left_pressed();
              break;
            case 'ArrowRight':
              input = vvlt.handle_right_pressed();
              break;
            case ' ':
              input = vvlt.handle_fire_pressed();
              break;
          }
          if (input) {
            store.dispatch(p2pSend(input))
          }
        });

        document.addEventListener('keyup', (event) => {
          event.preventDefault();
          let input = null;
          switch (event.key) {
            case 'ArrowUp':
              input = vvlt.handle_up_released();
              break;
            case 'ArrowDown':
              input = vvlt.handle_down_released();
              break;
            case 'ArrowLeft':
              input = vvlt.handle_left_released();
              break;
            case 'ArrowRight':
              input = vvlt.handle_right_released();
              break;
            case ' ':
              input = vvlt.handle_fire_released();
              break;
          }
          if (input) {
            store.dispatch(p2pSend(input))
          }
        });

        const loop = (time) => {
          vvlt.step();
          vvlt.render(renderer);
          raf = requestAnimationFrame(loop);
        }
        raf = requestAnimationFrame(loop);
        break;
      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default peerMiddleware();