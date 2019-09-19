import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	events: [],
	directory: [],
	jobs: [],
	sort: () => {}
});

export default ForumContext;
