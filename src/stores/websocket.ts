import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import * as ACTIONS from '../store';
import { p2pSignal } from '../stores/peer';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}

export const wsConnect = createAction('WS_CONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsConnected = createAction('WS_CONNECTED');
export const wsDisconnect = createAction('WS_DISCONNECT');
export const wsMessage = createAction('WS_MESSAGE');
export const wsSend = createAction('WS_NEW_MESSAGE', withPayloadType<any>());

type Store = MiddlewareAPI<Dispatch<AnyAction>, ACTIONS.State>;

const socketMiddleware: () => Middleware<{}, ACTIONS.State> = () => {
  let socket: WebSocket = null;

  const onOpen = (store: Store) => (event: Event) => {
    store.dispatch(wsConnected());
  };

  const onClose = (store: Store) => () => {
    store.dispatch(wsDisconnect());
  };

  const onMessage = (store: Store) => (event: MessageEvent) => {
    const payload = JSON.parse(event.data);

    // @ts-ignore
    const maybeAction = ACTIONS[payload.type];
    if (typeof(maybeAction) === "function") {
        store.dispatch(maybeAction(payload.content));
    } else if (payload.type == "Signal") {
      store.dispatch(p2pSignal(payload.content));
    } else {
      console.error("unrecognized response!");
    }
  };

  // the middleware part of this function
  return store => next => action => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.payload.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        // console.log('websocket closed');
        break;
      case 'WS_NEW_MESSAGE':
        socket.send(JSON.stringify(action.payload));
        break;
      default:
        // console.log('the next action:', action);
        return next(action);
    }
  };
};

export default socketMiddleware();