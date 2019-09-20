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
	eventsLink: () => {}
});

export default ForumContext;
