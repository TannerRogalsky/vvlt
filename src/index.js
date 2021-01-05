import render from './view';
import store, { setUserId, fetchRooms, setRooms } from './store.tsx';
import { wsConnect } from './stores/websocket';

const reactAnchor = document.createElement('div');
document.body.appendChild(reactAnchor);
render(reactAnchor);

if (process.env.NODE_ENV !== 'production') {
	store.dispatch(wsConnect({ host: 'wss://salty-mesa-40253.herokuapp.com/connect' }));
} else { 
	store.dispatch(wsConnect({ host: 'ws://localhost:8080/connect' }));
}
