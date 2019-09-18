import React, { useContext } from 'react';
import ForumContext from '../../ForumContext';
import './NewPost.css';

export default function NewPost() {
	const context = useContext(ForumContext);
	const posts = context.posts.map(p => {
		return (
			<div className='posts' key={p.postId}>
				<h4>{p.title}</h4>
				<p>{p.content}</p>
				<span className='postInfo'>
					<p>Posted By: {p.author}</p>
					<p>Posted On: {p.date}</p>
					<p>Likes: {p.likes}</p>
				</span>
			</div>
		);
	});

	return (
		<div className='newPost-container'>
			<div className='newPost-content'>
				<h2>Newest Posts</h2>
				{posts}
			</div>
		</div>
	);
}
