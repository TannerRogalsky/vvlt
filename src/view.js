import React from 'react';
import ReactDOM from 'react-dom';

export default function render(state, container) {
	ReactDOM.render(<View {...state} />, container);
}

function View(state) {
	console.log(state);
	return (
		<div>
			ID: {state.user_id}
		</div>
	);
}