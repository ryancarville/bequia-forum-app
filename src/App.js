import React, { Component } from 'react';
import ForumContext from './ForumContext';
import Footer from './components/Footer/Footer';
import './App.css';
import Router from './Router/Router';
import Nav from '../src/components/Nav/Nav';
import apiServices from './services/apiServices';
import TokenServices from './services/TokenServices';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: null,
				name: '',
				email: '',
				lastLogin: ''
			},
			forumTitles: [],
			forum: [],
			posts: [],
			likesTracker: [],
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

	getUserData = id => {
		apiServices.getUserData(id).then(data => {
			this.setState({
				user: {
					id: id,
					name: data.first_name + ' ' + data.last_name,
					email: data.email,
					lastLogin: data.last_login
				}
			});
		});
	};
	createPost = newPost => {
		apiServices.createPost(newPost).then(() => this.getPosts());
	};
	updatePost = postToUpdate => {
		apiServices.editPost(postToUpdate).then(() => this.getPosts());
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
		apiServices.addEvent(newEvent).then(() => this.getEvents());
	};
	editEvent = eventToUpdate => {
		apiServices.editEvent(eventToUpdate).then(() => this.getEvents());
	};
	deleteEvent = id => {
		apiServices.deleteEvent(id).then(() => this.getEvents());
	};
	createJobListing = newListing => {
		apiServices.addJobListing(newListing).then(() => this.getJobPosts());
	};
	editJobListing = listingToUpdate => {
		apiServices.editJobListing(listingToUpdate).then(() => this.getJobPosts());
	};
	deleteJobListing = id => {
		apiServices.deleteJobListing(id).then(() => this.getJobPosts());
	};
	createRentalListing = newListing => {
		apiServices
			.addRentalListing(newListing)
			.then(() => this.getRentalListings());
	};
	editRentalListing = listingToUpdate => {
		apiServices
			.editRentalListing(listingToUpdate)
			.then(() => this.getRentalListings());
	};
	deleteRentalListing = id => {
		apiServices.deleteRentalListing(id).then(() => this.getRentalListings());
	};
	createMarketPlaceListing = newListing => {
		apiServices
			.addMarketPlaceListing(newListing)
			.then(() => this.getMarketPlaceListings());
	};
	editMarketPlaceListing = listingToUpdate => {
		apiServices
			.editMarketPlaceListing(listingToUpdate)
			.then(() => this.getMarketPlaceListings());
	};
	deleteMarketPlaceListing = id => {
		apiServices
			.deleteMarketPlaceListing(id)
			.then(() => this.getMarketPlaceListings(0));
	};

	getForumSectionTitles = () => {
		apiServices
			.getFourmSectionTitles()
			.then(data => this.setState({ forumTitles: data }));
	};
	getForum = () => {
		apiServices.getFourm().then(data => this.setState({ forum: data }));
	};
	getPosts = () => {
		apiServices.getPosts().then(data => this.setState({ posts: data }));
	};
	getNewestPosts = () => {
		apiServices
			.getNewestPosts()
			.then(data => this.setState({ newestPosts: data }));
	};
	handleAddLike = post_id => {
		apiServices.addLike(post_id).then(() => {
			this.getPosts();
		});
	};
	handleAddToLikesTracker = info => {
		apiServices.addToLikesTracker(info).then(() => {
			this.getLikesTracker();
		});
	};
	handleMinusLike = post_id => {
		apiServices.minusLike(post_id).then(() => {
			this.getPosts();
		});
	};
	handleDeleteFromLikesTracker = info => {
		apiServices.deleteFromLikesTracker(info).then(() => {
			this.getLikesTracker();
		});
	};
	getLikesTracker = () => {
		apiServices
			.getLikesTracker()
			.then(data => this.setState({ likesTracker: data }));
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
	getRentalListings = () => {
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
	setAppState = () => {
		this.getForumSectionTitles();
		this.getForum();
		this.getPosts();
		this.getLikesTracker();
		this.getNewestPosts();
		this.getEvents();
		this.getJobCatagories();
		this.getJobPosts();
		this.getRentalCatagories();
		this.getRentalListings();
		this.getMarketPlaceCatagories();
		this.getMarketPlaceListings();
		this.getDirectory();
		this.getComments();
	};
	componentDidMount() {
		this.getForumSectionTitles();
		this.getForum();
		this.getPosts();
		this.getLikesTracker();
		this.getNewestPosts();
		this.getEvents();
		this.getJobCatagories();
		this.getJobPosts();
		this.getRentalCatagories();
		this.getRentalListings();
		this.getMarketPlaceCatagories();
		this.getMarketPlaceListings();
		this.getDirectory();
		this.getComments();
		const token = TokenServices.getAuthToken();
		if (token) {
			apiServices
				.verifyToken(token)
				.then(data => this.getUserData(data.user_id));
		}
	}

	render() {
		const contextValue = {
			setAppState: this.setAppState,
			signUp: this.signUp,
			login: this.login,
			getUserData: this.getUserData,
			state: this.state,
			user: this.state.user,
			getForumSectionTitles: this.getForumSectionTitles,
			getForum: this.getForum,
			getPosts: this.getPosts,
			getNewestPosts: this.getNewestPosts,
			handleAddLike: this.handleAddLike,
			handleAddToLikesTracker: this.handleAddToLikesTracker,
			handleMinusLike: this.handleMinusLike,
			handleDeleteFromLikesTracker: this.handleDeleteFromLikesTracker,
			getLikesTracker: this.getLikesTracker,
			comments: this.state.comments,
			addComment: this.addComment,
			deleteComment: this.deleteComment,
			getDirectory: this.getDirectory,
			directory: this.state.directory,
			createPost: this.createPost,
			updatePost: this.updatePost,
			deletePost: this.deletePost,
			createEvent: this.createEvent,
			editEvent: this.editEvent,
			deleteEvent: this.deleteEvent,
			createJobListing: this.createJobListing,
			editJobListing: this.editJobListing,
			deleteJobListing: this.deleteJobListing,
			createRentalListing: this.createRentalListing,
			editRentalListing: this.editRentalListing,
			deleteRentalListing: this.deleteRentalListing,
			createMarketPlaceListing: this.createMarketPlaceListing,
			editMarketPlaceListing: this.editMarketPlaceListing,
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
