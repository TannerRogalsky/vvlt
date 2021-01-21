import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import Peer, { Instance } from 'simple-peer';
import { wsSend } from './websocket';
import { Renderer, RendererSettings, VvltClient } from 'vvlt';
import { State } from '../store';

import player1ImageSrc from '../../../../../rust/vult/resources/images/playerShip1_red.png';
import enemy1ImageSrc from '../../../../../rust/vult/resources/images/enemyBlack1.png';
// @ts-ignore
import levelDataPath from '../../../../../rust/vult/resources/levels/level1.lvl';

let levelData: null | Uint8Array = null;
fetch(levelDataPath).then(r => r.arrayBuffer()).then(r => levelData = new Uint8Array(r));

const player1Image = new Image();
player1Image.src = player1ImageSrc;

const enemy1Image = new Image();
enemy1Image.src = enemy1ImageSrc;

function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const p2pConnect = createAction('P2P_CONNECT', withPayloadType<boolean>());
export const p2pConnecting = createAction('P2P_CONNECTING');
export const p2pConnected = createAction('P2P_CONNECTED');
export const p2pDisconnect = createAction('P2P_DISCONNECT');
export const p2pMessage = createAction('P2P_MESSAGE');
export const p2pSend = createAction('P2P_NEW_MESSAGE', withPayloadType<any>());
export const p2pSignal = createAction('P2P_SIGNAL', function prepare(any) {
  return any;
});
export const newCanvas = createAction('NEW_GAME_CANVAS', withPayloadType<HTMLCanvasElement>());
export const newDebugCanvas = createAction('NEW_DEBUG_CANVAS', withPayloadType<HTMLCanvasElement>());

const peerMiddleware: () => Middleware<{}, State> = () => {
  let peerConnection: null | Instance = null;
  let vvlt: null | VvltClient = null;
  let isHost: null | boolean = null;
  let canvas: null | HTMLCanvasElement = null;
  let raf: null | number = null;
  let step: null | number = null;

  let currentFrame = 0;
  let hashesSent = 0;

  let debugRaf: null | number = null;

  type Store = MiddlewareAPI<Dispatch<AnyAction>, State>;

  const onConnect = (store: Store) => () => {
    console.log("p2p", "onConnect");
    store.dispatch(p2pConnected());
  };

  const onClose = (store: Store) => () => {
    console.log("p2p", "onClose");
    store.dispatch(p2pDisconnect());
  };

  const onSignal = (store: Store) => (event: any) => {
    store.dispatch(wsSend({
      Signal: {
        payload: JSON.stringify(event),
      }
    }));
  };

  const onError = (store: Store) => () => {
    console.log("p2p", "onError");
    store.dispatch(p2pDisconnect());
    store.dispatch(wsSend('LeaveRoom'));
  }

  const onData = (store: Store) => (data: Uint8Array) => {
    let response = vvlt.handle_remote_input(data, performance.now());
    if (response) {
      peerConnection.send(response);
    }
  }

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case 'P2P_CONNECT':
        if (peerConnection !== null) {
          peerConnection.destroy();
        }

        // connect to the remote host
        peerConnection = new Peer({ 
          initiator: action.payload,
          // trickle: false
        });
        isHost = action.payload;

        peerConnection.on('signal', onSignal(store));
        peerConnection.on('connect', onConnect(store));
        peerConnection.on('error', onError(store));
        peerConnection.on('data', onData(store));

        return next(action);
      case 'P2P_DISCONNECT':
        if (peerConnection !== null) {
          peerConnection.destroy();
        }
        peerConnection = null;
        // console.log('websocket closed');
        return next(action);
      case 'P2P_NEW_MESSAGE':
        peerConnection.send(action.payload);
        break;
      case 'P2P_SIGNAL':
        peerConnection.signal(JSON.parse(action.payload))
        break;
      case 'NEW_DEBUG_CANVAS':
        const debugCanvas = action.payload;
        if (debugCanvas === null) {
          cancelAnimationFrame(debugRaf);
          break;
        }

        const debugCtx = debugCanvas.getContext('2d');
        const X = 3;
        const FONT_SIZE = 16;
        const debugLoop = (t: DOMHighResTimeStamp) => {
          let y = 0;
          debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
          debugCtx.font = `${FONT_SIZE}px serif`;
          debugCtx.fillText(`Latency (ms): ${vvlt.latency_ms()}`, X, y += FONT_SIZE);
          debugCtx.fillText(`Local Frame: ${currentFrame}`, X, y += FONT_SIZE);
          debugCtx.fillText(`Remote Frame: ${vvlt.estimated_remote_frame()}`, X, y += FONT_SIZE);
          debugCtx.fillText(`Synced Frame: ${vvlt.last_synchronized()}`, X, y += FONT_SIZE);
          debugCtx.fillText(`Hashes Sent: ${hashesSent}`, X, y += FONT_SIZE);

          debugRaf = requestAnimationFrame(debugLoop);
        }
        debugRaf = requestAnimationFrame(debugLoop);

        break;
      case 'NEW_GAME_CANVAS':
        if (canvas) {
          break;
        }

        canvas = action.payload;
        if (canvas === null) {
          cancelAnimationFrame(raf);
          clearInterval(step);
          break;
        }

        vvlt = new VvltClient(isHost, levelData);
        const settings = new RendererSettings(canvas, player1Image, enemy1Image);
        const renderer = new Renderer(settings, vvlt);

        document.addEventListener('keydown', (event) => {
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
            event.preventDefault();
            peerConnection.send(input);
          }
        });

        document.addEventListener('keyup', (event) => {
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
            event.preventDefault();
            peerConnection.send(input);
          }
        });

        const loop = (time: DOMHighResTimeStamp) => {
          renderer.render(vvlt);
          raf = requestAnimationFrame(loop);
        }
        raf = requestAnimationFrame(loop);

        const FRAME_TIME_MS = 16;
        step = window.setInterval(() => {
          const hashMsg = vvlt.needs_hash();
          if (hashMsg) {
            hashesSent += 1;
            peerConnection.send(hashMsg);
          }
          const pingMsg = vvlt.needs_ping(performance.now());
          if (pingMsg) {
            peerConnection.send(pingMsg);
          }

          const est_remote_frame = vvlt.estimated_remote_frame();
          // allow at least 10 frames of flex
          const latency = Math.max(vvlt.latency_ms(), FRAME_TIME_MS * 10);
          const frame_latency = (latency * 2) / (FRAME_TIME_MS);
          const remote_frame = est_remote_frame + frame_latency;
          if (remote_frame >= currentFrame) {
            currentFrame = vvlt.step();
          }
        }, FRAME_TIME_MS);
        break;
      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default peerMiddleware();