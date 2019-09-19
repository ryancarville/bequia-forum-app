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
			events: STORE.events,
			directory: STORE.directory,
			jobs: STORE.jobs
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
		if (e.target.value === 'dir-asc') {
			let sortedDir = this.state.directory.sort((a, b) =>
				a.userLName < b.userLName ? -1 : 1
			);
			this.setState({
				directory: sortedDir
			});
		}
		if (e.target.value === 'dir-dec') {
			let sortedDir = this.state.directory.sort((a, b) =>
				a.userLName > b.userLName ? -1 : 1
			);
			this.setState({
				directory: sortedDir
			});
		}
	};
	componentDidMount() {
		let sortedDir = this.state.directory.sort((a, b) =>
			a.userLName < b.userLName ? -1 : 1
		);
		this.setState({
			directory: sortedDir
		});
		this.setState({
			directory: sortedDir
		});
	}

	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user,
			posts: this.state.posts,
			events: this.state.events,
			directory: this.state.directory,
			jobs: this.state.jobs,
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
