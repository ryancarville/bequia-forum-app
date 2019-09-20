import React, { Component } from 'react';
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
			jobs: STORE.jobs,
			rentals: STORE.rentals,
			marketPlace: STORE.marketPlace
		};
	}
	static contextType = ForumContext;

	handleSort = e => {
		if (e.target.value === 'newest-posts') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.date > b.date ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'oldest-posts') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.date < b.date ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'likes-asc-posts') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.likes > b.likes ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'likes-dec-posts') {
			let sortedPosts = this.state.posts.sort((a, b) =>
				a.likes < b.likes ? -1 : 1
			);
			this.setState({
				posts: sortedPosts
			});
		}
		if (e.target.value === 'all-posts') {
			this.setState({
				posts: STORE.posts
			});
		}
		if (e.target.value === 'asc-dir') {
			let sortedDir = this.state.directory.sort((a, b) =>
				a.userLName < b.userLName ? -1 : 1
			);
			this.setState({
				directory: sortedDir
			});
		}
		if (e.target.value === 'dec-dir') {
			let sortedDir = this.state.directory.sort((a, b) =>
				a.userLName > b.userLName ? -1 : 1
			);
			this.setState({
				directory: sortedDir
			});
		}
		if (e.target.value === 'all-dir') {
			this.setState({
				directory: STORE.directory
			});
		}
		if (e.target.value === 'newest-rent') {
			let sortedRentals = this.state.rentals.sort((a, b) =>
				a.datePosted < b.datePosted ? -1 : 1
			);
			this.setState({
				rentals: sortedRentals
			});
		}
		if (e.target.value === 'oldest-rent') {
			let sortedRentals = this.state.rentals.sort((a, b) =>
				a.datePosted > b.datePosted ? -1 : 1
			);
			this.setState({
				rentals: sortedRentals
			});
		}
		if (e.target.value === 'housing-rent') {
			let sortedRentals = this.state.rentals.filter(
				a => a.catagory === 'housing'
			);
			this.setState({
				rentals: sortedRentals
			});
		}
		if (e.target.value === 'marine-rent') {
			let sortedRentals = this.state.rentals.filter(
				a => a.catagory === 'marine'
			);
			this.setState({
				rentals: sortedRentals
			});
		}
		if (e.target.value === 'all-rent') {
			this.setState({
				rentals: STORE.rentals
			});
		}
		if (e.target.value === 'newest-jobs') {
			let sortedJobs = this.state.jobs.sort((a, b) =>
				a.datePosted < b.datePosted ? -1 : 1
			);
			this.setState({
				jobs: sortedJobs
			});
		}
		if (e.target.value === 'oldest-jobs') {
			let sortedJobs = this.state.jobs.sort((a, b) =>
				a.datePosted > b.datePosted ? -1 : 1
			);
			this.setState({
				jobs: sortedJobs
			});
		}
		if (e.target.value === 'service-jobs') {
			let sortedJobs = this.state.jobs.filter(a => a.catagory === 'service');
			this.setState({
				jobs: sortedJobs
			});
		}
		if (e.target.value === 'marine-jobs') {
			let sortedJobs = this.state.jobs.filter(a => a.catagory === 'marine');
			this.setState({
				jobs: sortedJobs
			});
		}
		if (e.target.value === 'all-jobs') {
			this.setState({
				jobs: STORE.jobs
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
			rentals: this.state.rentals,
			marketPlace: this.state.marketPlace,
			sort: this.handleSort
		};
		return (
			<ForumContext.Provider value={contextValue}>
				<div className='App'>
					<Router />
					<Footer />
				</div>
			</ForumContext.Provider>
		);
	}
}
export default App;
