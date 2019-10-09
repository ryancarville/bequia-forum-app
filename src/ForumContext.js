import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	handleLike: () => {},
	creatPost: () => {},
	updatePost: () => {},
	deletePost: () => {},
	addComment: () => {},
	deleteComment: () => {},
	createEvent: () => {},
	deleteEvent: () => {},
	createJobListing: () => {},
	createRentalListing: () => {},
	createMarketPlaceListing: () => {},
	deleteMarketPlaceListing: () => {}
});

export default ForumContext;
