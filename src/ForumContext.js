import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	posts: [],
	events: []
});

export default ForumContext;
