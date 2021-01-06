import React from 'react';
import { connect, useDispatch } from 'react-redux';
// @ts-ignore
import { newCanvas } from '../stores/peer';
import { State, Room, ConnectionState } from '../store';

interface PassedProps {
	room: Room,
}

interface GameProps extends PassedProps {
	user_id: string,
	connection_state: ConnectionState,
}

const mapStateToProps = (state: State, props: PassedProps) => ({ 
	...props,
	user_id: state.user_id,
	connection_state: state.p2p_connection_state,
});

export default connect(
	mapStateToProps,
	null,
)(function Game({ room, user_id, connection_state }: GameProps) {

	const dispatch = useDispatch();
	const refCallback = (canvas: HTMLCanvasElement) => {
		dispatch(newCanvas(canvas));
	}

	switch (connection_state) {
		case ConnectionState.NotConnected: 
		case ConnectionState.Connecting:
			return (
				<div>
					Loading: {room.name}
				</div>
			);
		case ConnectionState.Connected:
			return (
				<div>
					{room.name}
					<canvas width={512} height={512} ref={refCallback} />
				</div>
			);
	}
});