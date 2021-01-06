import React from 'react';
import { connect, useDispatch } from 'react-redux';
// @ts-ignore
import { newCanvas } from '../stores/peer';
import { State, Room, } from '../store';

interface PassedProps {
	room: Room,
}

interface GameProps extends PassedProps {
	user_id: string,
}

const mapStateToProps = (state: State, props: PassedProps) => ({
	...props,
	user_id: state.user_id
})

export default connect(
	mapStateToProps,
	null,
)(function Game({ room, user_id }: GameProps) {

	const dispatch = useDispatch();
	const refCallback = (canvas: HTMLCanvasElement) => {
		dispatch(newCanvas(canvas));
	}

	return (
		<div>
			{room.name}
			<canvas width={512} height={512} ref={refCallback} />
		</div>
	);
});