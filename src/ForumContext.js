import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	events: [],
	directory: [],
	jobs: [],
	rentals: [],
	marketPlace: [],
	sort: () => {},
	creatPost: () => {},
	deletePost: () => {}
});

export default ForumContext;
