import Peer from 'simple-peer';
import render from './view';
import store, { setUserId, fetchRooms } from './store.tsx';

const reactAnchor = document.createElement('div');
document.body.appendChild(reactAnchor);
render(reactAnchor);

// they'd rather we do this in the component
store.dispatch(fetchRooms());

async function run() {
	const signalingChannel = await new Promise(function(resolve, reject) {
		let connection = new WebSocket('ws://localhost:8080/connect');
		let onOpen = (event) => {
			connection.removeEventListener('open', onOpen);
			connection.removeEventListener('error', onError);
			resolve(connection);
		};
		let onError = (event) => {
			connection.removeEventListener('open', onOpen);
			connection.removeEventListener('error', onError);
			reject(event);
		};
		connection.addEventListener('open', onOpen);
		connection.addEventListener('error', onError);
		connection.addEventListener('error', (event) => {
			console.error('SOCKET ERROR', event);
		});

		connection.addEventListener('close', (event) => {
			console.error('SOCKET CLOSE', event);
		});
	});

	let peerConnection = null;
	signalingChannel.addEventListener('message', async (event) => {
		console.log('SOCKET MSG', event.data);
		const msg = JSON.parse(event.data);

		if (msg.simple_peer_signal) {
			peerConnection.signal(msg.simple_peer_signal);
		} else if (typeof(msg) == "number") {
			store.dispatch(setUserId(msg));

			const isHost = msg % 2 == 0;
			peerConnection = new Peer({ initiator: isHost });
			console.log("IS HOST", isHost);
			peerConnection.on('signal', data => {
				signalingChannel.send(JSON.stringify({simple_peer_signal: data}));
			});
			peerConnection.on('connect', () => {
				console.log("connected");
				let payload = isHost ? "from host" : "from client";
				peerConnection.send(payload);
			});
			peerConnection.on('data', data => {
				console.log('data', new TextDecoder("utf-8").decode(data));
			});
		}
	});
}

run();
