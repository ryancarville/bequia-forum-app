import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	comments: [],
	events: [],
	directory: [],
	sort: () => {},
	creatPost: () => {},
	deletePost: () => {},
	addComment: () => {},
	deleteComment: () => {},
	createEvent: () => {},
	deleteEvent: () => {}
});

export default ForumContext;
