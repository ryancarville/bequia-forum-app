import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	events: [],
	sort: () => {}
});

export default ForumContext;
