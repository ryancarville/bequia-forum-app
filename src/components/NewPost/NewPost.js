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
		let recentPosts = context.state.newestPosts;
		const visiblePosts = recentPosts ? (
			recentPosts.map(p => {
				const numOfComments = context.state.comments.filter(
					comment => comment.post_id === p.id
				).length;
				return (
					<div className='newest-posts' key={p.id}>
						<Link
							to={{
								pathname: `/messageBoard/${p.board_id}/${p.id}`,
								state: { id: p.id }
							}}>
							<h4>{p.title}</h4>
						</Link>
						<Truncate
							lines={1}
							ellipsis={
								<span>
									...
									<Link
										to={{
											pathname: `/messageBoard/${p.board_id}/${p.id}`,
											state: { id: p.id }
										}}>
										Read more
									</Link>
								</span>
							}>
							{p.content}
						</Truncate>
						<span className='postInfo'>
							<p>Posted By: {p.user_name}</p>
							<p>Posted On: {formatDate(p.date_posted)}</p>
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
