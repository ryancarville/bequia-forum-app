import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
			}
		};
	}
	static contextType = ForumContext;
	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user
		};
		return (
			<BrowserRouter>
				<div className='App'>
					<ForumContext.Provider value={contextValue}>
						<Router />
						<Footer />
					</ForumContext.Provider>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;
