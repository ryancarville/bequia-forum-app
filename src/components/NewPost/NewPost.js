import React, { useContext } from 'react';
import STORE from '../../STORE/store';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import ForumContext from '../../ForumContext';
import formatDate from '../../helpers/formatDate';
import './NewPost.css';
import like from '../Icons/like';
import comment from '../Icons/comment';

export default function NewPost() {
	const context = useContext(ForumContext);

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
									{like}
									{'   '}
									{p.likes}
								</p>
								<p>
									{comment}
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
