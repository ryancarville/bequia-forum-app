import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreatePostButton.css';
const AddPost = (
	<span id='create-post-button'>
		<Link to={`/createPost`}>Create Post</Link>
	</span>
);
export default AddPost;
