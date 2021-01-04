import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { State } from '../store';


const mapStateToProps = (state: State) => state;

const mapDispatchToProps = {
	// ... normally is an object full of action creators
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(function Game({ rooms, active_room }: State) {

	// if (active_room === null) {
	// 	let history = useHistory();
	// 	history.push('/');
	// }
	// console.log(rooms, active_room);

	// let room = rooms[active_room];

	// if (room) {
		
	// } else {
		return <div>Loading...</div>;
	// }
})