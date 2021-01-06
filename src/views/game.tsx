import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Renderer, RendererSettings, VvltClient } from 'vvlt';

import store, { State, Room } from '../store';
import { p2pSend } from '../stores/peer';

import player1ImageSrc from '../../../../../rust/vult/resources/images/playerShip1_red.png';
import enemy1ImageSrc from '../../../../../rust/vult/resources/images/enemyBlack1.png';

const player1Image = new Image();
player1Image.src = player1ImageSrc;

const enemy1Image = new Image();
enemy1Image.src = enemy1ImageSrc;

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

	const refCallback = (canvas: HTMLCanvasElement) => {
		if (canvas === null) {
			// TODO: cleanup?
			return;
		}
		
		const settings = new RendererSettings(canvas, player1Image, enemy1Image);
		const renderer = new Renderer(settings);
		renderer.set_width_height(512, 512);
		const vvlt = new VvltClient(room.host.id === user_id);

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

		const loop = (time: DOMHighResTimeStamp) => {
			vvlt.step();
			vvlt.render(renderer);
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	}

	return (
		<div>
			{room.name}
			<canvas width={512} height={512} ref={refCallback} />
		</div>
	);
});