import { createAction } from '@reduxjs/toolkit';
import Peer from 'simple-peer';
import { wsSend } from './websocket';

export const p2pConnect = createAction('P2P_CONNECT', function prepare(any) {
  return {
    payload: any
  }
});
export const p2pConnecting = createAction('P2P_CONNECTING');
export const p2pConnected = createAction('P2P_CONNECTED');
export const p2pDisconnect = createAction('P2P_DISCONNECT');
export const p2pMessage = createAction('P2P_MESSAGE');
export const p2pSend = createAction('P2P_NEW_MESSAGE');
export const p2pSignal = createAction('P2P_SIGNAL', function prepare(any) {
  return any;
});

const peerMiddleware = () => {
  let peerConnection = null;

  const onConnect = store => () => {
    console.log("p2p", "onConnect");
    store.dispatch(p2pConnected());
    store.dispatch(p2pSend({ hello: "my boys" }))
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
    store.dispatch(wsSend({ LeaveRoom: true }))
  }

  const onData = store => (event) => {
    console.log('p2pData', event);
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
        // console.log('sending a message', action.payload.msg);
        peerConnection.send(JSON.stringify(action.payload.msg));
        break;
      case 'P2P_SIGNAL':
        console.log(action);
        peerConnection.signal(JSON.parse(action.payload))
        break;
      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default peerMiddleware();