import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import './ForumSection.css';
import TokenServices from '../../services/TokenServices';
import formatDate from '../../helpers/formatDate';
import like from '../Icons/like';
import comment from '../Icons/comment';
import ForumContext from '../../ForumContext';

export default function ForumSection(props) {
	const context = useContext(ForumContext);
	const forumId = props.match.params.forumId;
	const getPosts = () => {
		const visiblePosts = context.state.posts
			.filter(p => p.boardid.toString() === forumId)
			.map(p => {
				const numOfComments = context.state.comments.filter(
					comment => comment.postId === p.id
				).length;
				return (
					<li key={p.id}>
						<Link to={`/messageBoard/${forumId}/${p.id}`}>{p.title}</Link>
						<br />
						<Truncate
							lines={1}
							ellipsis={
								<span>
									...
									<Link to={`/messageBoard/${forumId}/${p.id}`}>Read more</Link>
								</span>
							}>
							{p.content}
						</Truncate>
						<span className='postInfo'>
							<p>Posted By: {p.username}</p>
							<p>Posted On: {formatDate(p.date)}</p>
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
					</li>
				);
			});

		return visiblePosts.length === 0 ? (
			<p>There are currently no posts in this section. Be the first one!</p>
		) : (
			visiblePosts
		);
	};

	return (
		<div className='forum-section-container'>
			<h3>{props.location.state.forum.title}</h3>
			<span>
				{TokenServices.getAuthToken() ? (
					<CreateContentButton forumId={forumId} />
				) : null}
			</span>
			<div className='forum-section-content'>
				<ul>{getPosts()}</ul>
			</div>
		</div>
	);
}
