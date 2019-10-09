import React, { Component } from 'react';
import ForumContext from './ForumContext';
import Footer from './components/Footer/Footer';
import './App.css';
import Router from './Router/Router';
import Nav from '../src/components/Nav/Nav';
import apiServices from './services/apiServices';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: 1,
				name: 'Ryan Carville',
				email: 'test@user.com',
				lastLogin: '2019-05-23'
			},
			forum: [],
			posts: [],
			newestPosts: [],
			comments: [],
			events: [],
			jobCatagories: [],
			jobPosts: [],
			rentalCatagories: [],
			rentalPosts: [],
			marketPlaceCatagories: [],
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
	deletePost = id => {
		apiServices.deletePost(id).then(() => this.getPosts());
	};
	addComment = newComment => {
		apiServices.addComment(newComment).then(() => this.getComments());
	};
	deleteComment = id => {
		apiServices.deleteComment(id).then(() => this.getComments());
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

	getForumSectionTitles = () => {
		apiServices
			.getFourmSectionTitles()
			.then(data => this.setState({ forumTitles: data }));
	};
	getFourm = () => {
		apiServices.getFourm().then(data => this.setState({ forum: data }));
	};
	getPosts = () => {
		console.log('get post ran');
		apiServices.getPosts().then(data => this.setState({ posts: data }));
	};
	getNewestPosts = () => {
		apiServices
			.getNewestPosts()
			.then(data => this.setState({ newestPosts: data }));
	};
	handleLike = (id, like) => {
		apiServices.handleLike(id, like).then(() => {
			this.getPosts();
		});
	};
	getComments = () => {
		apiServices.getComments().then(data => this.setState({ comments: data }));
	};
	getEvents = () => {
		apiServices.getEvents().then(data => this.setState({ events: data }));
	};
	getJobCatagories = () => {
		apiServices
			.getJobCatagories()
			.then(data => this.setState({ jobCatagories: data }));
	};
	getJobPosts = () => {
		apiServices.getJobPosts().then(data => this.setState({ jobPosts: data }));
	};
	getRentalCatagories = () => {
		apiServices
			.getRentalCatagories()
			.then(data => this.setState({ rentalCatagories: data }));
	};
	getRentalListing = () => {
		apiServices
			.getRentalListings()
			.then(data => this.setState({ rentalPosts: data }));
	};
	getMarketPlaceCatagories = () => {
		apiServices
			.getMarketPlaceCatagories()
			.then(data => this.setState({ marketPlaceCatagories: data }));
	};
	getMarketPlaceListings = () => {
		apiServices
			.getMarketPlacePosts()
			.then(data => this.setState({ marketPlacePosts: data }));
	};
	getDirectory = () => {
		apiServices.getDriectory().then(data => this.setState({ directory: data }));
	};
	componentDidMount() {
		this.getForumSectionTitles();
		this.getFourm();
		this.getPosts();
		this.getNewestPosts();
		this.getEvents();
		this.getJobCatagories();
		this.getJobPosts();
		this.getRentalCatagories();
		this.getRentalListing();
		this.getMarketPlaceCatagories();
		this.getMarketPlaceListings();
		this.getDirectory();
		this.getComments();
	}

	render() {
		const contextValue = {
			state: this.state,
			user: this.state.user,
			handleLike: this.handleLike,
			comments: this.state.comments,
			addComment: this.addComment,
			deleteComment: this.deleteComment,
			directory: this.state.directory,
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
