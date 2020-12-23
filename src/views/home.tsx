import React from 'react';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import store, { State, Room, createRoom } from '../store';

import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	root: {},
}));

interface HomeProps {
	rooms: Array<Room>
	user_id?: number,
}

const mapStateToProps = (state: State) => ({
	rooms: state.rooms,
	user_id: state.user_id,
})

const mapDispatchToProps = {
	// ... normally is an object full of action creators
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(function Home({rooms, user_id}: State) {
	const classes = useStyles();

	// const history = useHistory();
	const createRoomCallback = () => {
		store.dispatch(createRoom());
	}

	return (
		<div className={classes.root} >
			<div>User ID: {user_id}</div>
			<Button variant="contained" color="primary" onClick={createRoomCallback}>
				Create Room
			</Button>
			<List component='nav' >
				{
					rooms.map((room) => {
						return <ListItem key={room.name} button>
							<ListItemText primary={room.name} />
						</ListItem>;
					})
				}
			</List>
		</div>
	);
});