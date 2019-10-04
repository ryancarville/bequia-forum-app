import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	// posts: [],
	// comments: [],
	// events: [],
	// directory: [],
	sort: () => {},
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
