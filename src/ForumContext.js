import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	events: [],
	directory: [],
	jobs: [],
	rentals:[],
	sort: () => {}
});

export default ForumContext;
