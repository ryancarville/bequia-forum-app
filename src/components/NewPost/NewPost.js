import React, { useContext } from 'react';
import STORE from '../../STORE/store';
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

	function recentPosts() {
		let recentPosts = [];
		context.posts.forEach(post => {
			let today = new Date();
			let lastWeek = today.getDate() + 7;
			today = today.getDate();
			if (post.date.slice(8) >= lastWeek || post.date.slice(8) <= today) {
				recentPosts.push(post);
			}
		});
		const visiblePosts = recentPosts ? (
			context.posts.map(p => {
				const numOfComments = STORE.comments.filter(
					comment => comment.postId === p.id
				).length;
				return (
					<div className='newest-posts' key={p.id}>
						<Link to={`/messageBoard/${p.forumId}/${p.id}`}>
							<h4>{p.title}</h4>
						</Link>
						<Truncate
							lines={1}
							ellipsis={
								<span>
									...
									<Link to={`/messageBoard/${p.forumId}/${p.id}`}>
										Read more
									</Link>
								</span>
							}>
							{p.content}
						</Truncate>
						<span className='postInfo'>
							<p>Posted By: {p.author}</p>
							<p>Posted On: {formatDate(p.date)}</p>
							<span>
								<p>
									<img
										src='https://beardystudios.com/Bloc_Capstone/bequia-forum/images/coconut.png'
										alt='coconut-likes'
										id='coconut-likes-btn-img'
									/>
									{'   '}
									{p.likes}
								</p>
								<p>
									<img
										src='https://beardystudios.com/Bloc_Capstone/bequia-forum/images/comment.png'
										alt='coconut-likes'
										id='coconut-likes-btn-img'
									/>
									{'   '}
									{numOfComments}
								</p>
							</span>
						</span>
					</div>
				);
			})
		) : (
			<p>Loading...</p>
		);
		return visiblePosts;
	}

	return (
		<div className='newPost-container'>
			<h3>New Posts</h3>
			<div className='newPost-content'>{recentPosts()}</div>
		</div>
	);
}
