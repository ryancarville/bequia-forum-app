import React from 'react';

const ForumContext = React.createContext({
	state: {},
	user: {},
	newPosts: []
});

export default ForumContext;
