import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	getFourm: () => {},
	getPosts: () => {},
	getNewestPosts: () => {},
	handleLike: () => {},
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
