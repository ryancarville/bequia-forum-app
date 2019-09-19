import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import STORE from './STORE/store';
import Router from './Router/Router';
import ForumContext from './ForumContext';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: 1,
				name: 'Test user',
				lastLogin: '2019-05-23'
			},
			posts: STORE.posts,
			events: STORE.events
		};
	}
	static contextType = ForumContext;
	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user,
			posts: this.state.posts,
			events: this.state.events
		};
		return (
			<BrowserRouter>
				<ForumContext.Provider value={contextValue}>
					<div className='App'>
						<Router />
						<Footer />
					</div>
				</ForumContext.Provider>
			</BrowserRouter>
		);
	}
}
export default App;
