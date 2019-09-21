import React from 'react';
import './PostPage.css';

export default function PostPage(props) {
	const p = props.location.state.post;
	const formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	const post = (
		<section className='post-container'>
			<div className='post-content'>
				<h3>{p.title}</h3>
				<p>{p.content}</p>
				<span className='postInfo'>
					<p>Posted By: {p.author}</p>
					<p>Posted On: {formatDate(p.date)}</p>
					<p>Likes: {p.likes}</p>
				</span>
			</div>
		</section>
	);

	return post;
}
