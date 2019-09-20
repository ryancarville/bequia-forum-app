import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import ForumContext from '../../ForumContext';
import './NewPost.css';

export default function NewPost() {
	const context = useContext(ForumContext);

	const formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};

	const posts = context.posts ? (
		context.posts.map(p => {
			return (
				<div className='newest-posts' key={p.postId}>
					<Link to={`/forum/${p.postId}`}>
						<h4>{p.title}</h4>
					</Link>
					<Truncate
						lines={1}
						ellipsis={
							<span>
								...<Link to={`/forum/${p.postId}`}>Read more</Link>
							</span>
						}>
						{p.content}
					</Truncate>
					<span className='postInfo'>
						<p>Posted By: {p.author}</p>
						<p>Posted On: {formatDate(p.date)}</p>
						<p>Likes: {p.likes}</p>
					</span>
				</div>
			);
		})
	) : (
		<p>Loading...</p>
	);

	return (
		<div className='newPost-container'>
			<div className='newPost-content'>
				<h2>Newest Posts</h2>
				{posts}
			</div>
		</div>
	);
}
