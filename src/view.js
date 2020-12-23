import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Home from './views/home';


export default function render(container) {
	ReactDOM.render(<App />, container);
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/about">About</Link>
						</li>
					</ul>

					<hr />

					{/*
						A <Switch> looks through all its children <Route>
						elements and renders the first one whose path
						matches the current URL. Use a <Switch> any time
						you have multiple routes, but you want only one
						of them to render at a time
					*/}
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/game">
							<Game />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}


function Game(state) {
	console.log(state);
	return (
		<div>
			{state.rooms[state.active_room].name}
		</div>
	);
}

function About() {
	return (
		<div>Whatch'you wanna know about?</div>
	);
}