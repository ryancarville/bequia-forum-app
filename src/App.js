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
	handleSort = e => {
		if (e.target.value === 'newest') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.date > b.date ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'oldest') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.date < b.date ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'likes-asc') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.likes > b.likes ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'likes-dec') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.likes < b.likes ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
	};
	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user,
			posts: this.state.posts,
			events: this.state.events,
			sort: this.handleSort
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
