import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
// @ts-ignore
import { newCanvas, newDebugCanvas } from '../stores/peer';
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
	const debugRefCallback = (canvas: HTMLCanvasElement) => {
		dispatch(newDebugCanvas(canvas))
	}

	const [debug, setDebug] = useState(process.env.NODE_ENV !== 'production');
	const toggleDebug = (e: any) => {
		setDebug(e.target.checked);
	}

	const parentStyle = {
		position: 'relative',
	} as React.CSSProperties;

	const overlayStyle = {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		width: '100%',
	} as React.CSSProperties;

	switch (connection_state) {
		case ConnectionState.NotConnected: 
		case ConnectionState.Connecting:
			return (
				<div>
					Loading: {room.name}
				</div>
			);
		case ConnectionState.Connected:
			const width = 1920;
			const height = 1080;
			return (
				<div>
					<div>{room.name}</div>
					<div style={parentStyle} >
						<canvas style={overlayStyle} width={width} height={height} ref={refCallback} />
						{
							debug ?
								<canvas style={overlayStyle} width={width} height={height} ref={debugRefCallback} /> :
								<></>
						}
					</div>
					<div>
						<label>
							<input onChange={toggleDebug} type="checkbox" checked={debug} />
							Debug: {debug ? 'true' : 'false' }
						</label>
					</div>
				</div>
			);
	}
});