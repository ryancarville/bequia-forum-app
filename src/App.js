import React, { Component } from 'react';
import STORE from './STORE/store';
import ForumContext from './ForumContext';
import Footer from './components/Footer/Footer';
import './App.css';
import Router from './Router/Router';
import Nav from '../src/components/Nav/Nav';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: 1,
				name: 'Sam Smith',
				email: 'test@user.com',
				lastLogin: '2019-05-23'
			},
			forum: [],
			posts: [],
			comments: [],
			events: [],
			jobs: [],
			jobPosts: [],
			rentals: [],
			rentalPosts: [],
			marketPlace: [],
			marketPlacePosts: [],
			directory: []
		};
	}
	static contextType = ForumContext;

	createPost = post => {
		this.setState({
			posts: [...this.state.posts, post]
		});
	};
	updatePost = newPost => {
		var currPosts = this.state.posts.filter(p => p.id !== newPost.id);
		currPosts.push(newPost);
		this.setState({
			posts: currPosts
		});
	};
	deletePost = postId => {
		const newPosts = this.state.posts.filter(p => p.id !== postId);
		this.setState({
			posts: newPosts
		});
	};
	addComment = newComment => {
		this.setState({
			comments: [...this.state.comments, newComment]
		});
	};
	deleteComment = commentId => {
		const newComments = this.state.comments.filter(c => c.id !== commentId);
		this.setState({
			comments: newComments
		});
	};
	createEvent = newEvent => {
		this.setState({
			events: [...this.state.events, newEvent]
		});
	};
	deleteEvent = eventId => {
		const newEvents = this.state.events.filter(e => e.eventId !== eventId);
		this.setState({
			events: newEvents
		});
	};
	createJobListing = newListing => {
		this.setState(
			{
				jobPosts: [...this.state.jobPosts, newListing]
			},
			() => {
				console.log(this.state.jobPosts);
			}
		);
	};
	createRentalListing = newRentalListing => {
		this.setState({
			rentalPosts: [...this.state.rentalPosts, newRentalListing]
		});
	};
	deleteRentalListing = id => {
		const newRentalListings = this.state.rentals.filter(l => l.id !== id);
		this.setState({
			rentals: newRentalListings
		});
	};
	createMarketPlaceListing = newListing => {
		this.setState({
			marketPlacePosts: [...this.state.marketPlacePosts, newListing]
		});
	};
	deleteMarketPlaceListing = id => {
		const newLisitngs = this.state.marketPlacePosts.filter(p => p.id !== id);
		this.setState({
			marketPlacePosts: newLisitngs
		});
	};
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
		this.setState({
			forum: STORE.forum,
			posts: STORE.posts,
			comments: STORE.comments,
			events: STORE.events,
			directory: STORE.directory,
			jobs: STORE.jobs,
			jobPosts: STORE.jobPosts,
			rentals: STORE.rentals,
			rentalPosts: STORE.rentalPosts,
			marketPlace: STORE.marketPlace,
			marketPlacePosts: STORE.marketPlacePosts
		});
		// let sortedDir = this.state.directory.sort((a, b) =>
		// 	a.userLName < b.userLName ? -1 : 1
		// );
		// this.setState({
		// 	directory: sortedDir
		// });
	}

	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user,
			posts: this.state.posts,
			comments: this.state.comments,
			addComment: this.addComment,
			deleteComment: this.deleteComment,
			events: this.state.events,
			directory: this.state.directory,
			sort: this.handleSort,
			createPost: this.createPost,
			updatePost: this.updatePost,
			deletePost: this.deletePost,
			createEvent: this.createEvent,
			deleteEvent: this.deleteEvent,
			createJobListing: this.createJobListing,
			createRentalListing: this.createRentalListing,
			createMarketPlaceListing: this.createMarketPlaceListing,
			deleteMarketPlaceListing: this.deleteMarketPlaceListing
		};
		return (
			<ForumContext.Provider value={contextValue}>
				<div className='App'>
					<Nav />
					<Router />
					<Footer />
				</div>
			</ForumContext.Provider>
		);
	}
}
export default App;
