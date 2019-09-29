import React from 'react';
import { Link } from 'react-router-dom';
import './CreatePostButton.css';
export default function AddPost(props) {
	return (
		<span id='create-post-button'>
			<Link to={{ pathname: `/createPost`, state: { from: props.forumId } }}>
				Create Post
			</Link>
		</span>
	);
}
