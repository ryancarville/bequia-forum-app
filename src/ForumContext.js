import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	setAppState: () => {},
	singUp: () => {},
	login: () => {},
	getForumSectionTitles: () => {},
	getForum: () => {},
	getPosts: () => {},
	getLikesTracker: () => {},
	getNewestPosts: () => {},
	handleAddLike: () => {},
	handleAddToLikesTracker: () => {},
	handleMinusLike: () => {},
	handleDeleteFromLikesTracker: () => {},
	creatPost: () => {},
	updatePost: () => {},
	deletePost: () => {},
	addComment: () => {},
	deleteComment: () => {},
	createEvent: () => {},
	editEvent: () => {},
	deleteEvent: () => {},
	createJobListing: () => {},
	editJobListing: () => {},
	createRentalListing: () => {},
	editRentalListing: () => {},
	deleteRentalListing: () => {},
	createMarketPlaceListing: () => {},
	editMarketPlaceListing: () => {},
	deleteMarketPlaceListing: () => {}
});

export default ForumContext;
