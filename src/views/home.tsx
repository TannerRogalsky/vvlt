import React from 'react';
import { connect, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Game from './game';
import store, { State, Room, } from '../store';
import { wsSend } from '../stores/websocket';
import { p2pConnect } from '../stores/peer';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

interface HomeProps {
	rooms: Array<Room>
	active_room?: string,
}

const mapStateToProps = (state: State) => ({
	rooms: state.rooms,
	active_room: state.active_room,
})

const mapDispatchToProps = {
	// ... normally is an object full of action creators
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(function Home({rooms, active_room}: HomeProps) {
	const classes = useStyles();
	const history = useHistory();

	let dispatch = useDispatch();

	const createRoomCallback = () => {
		dispatch(wsSend({ CreateRoom: { name: "Test Room " + Math.random() }}));
		dispatch(p2pConnect(true));
	};

	const joinRoomCallback = (room_id: string) => {
		store.dispatch(wsSend({ JoinRoom: { room_id: room_id }}));
		dispatch(p2pConnect(false));
	};

	if (active_room) {
		let room = rooms.find((room) => room.id == active_room);
		return <Game room={room} />;
	} else {
		return (
			<div className={classes.root} >
				<Button variant="contained" color="primary" onClick={createRoomCallback}>
					Create Room
				</Button>
				<List component='nav' >
					{
						rooms.map((room, index) => {
							return <ListItem key={room.id} button onClick={joinRoomCallback.bind(null, room.id)}>
								<ListItemText primary={room.name} />
							</ListItem>;
						})
					}
				</List>
			</div>
		);
	}
});