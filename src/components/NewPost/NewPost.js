import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import ForumContext from '../../ForumContext';
import formatDate from '../../helpers/formatDate';
import './NewPost.css';
import like from '../Icons/like';
import comment from '../Icons/comment';

export default function NewPost(props) {
	const context = useContext(ForumContext);
	const recentPosts = () => {
		context.getNewestPosts();
		let recentPosts = context.state.newestPosts;
		console.log(recentPosts);
		const visiblePosts = recentPosts ? (
			recentPosts.map(p => {
				const numOfComments = context.state.comments.filter(
					comment => comment.postid === p.id
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
							<p>Posted By: {p.username}</p>
							<p>Posted On: {formatDate(p.dateposted)}</p>
							<span className='post-icons'>
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
	};

	return (
		<div className='newPost-container'>
			{props.location ? <h3>New Posts</h3> : null}
			<div className='newPost-content'>{recentPosts()}</div>
		</div>
	);
}
