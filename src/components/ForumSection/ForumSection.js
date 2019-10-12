import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';
import comment from '../Icons/comment';
import like from '../Icons/like';
import './ForumSection.css';

export default function ForumSection(props) {
	const getForumName = forum => {
		const forumSection = forum.filter(f => f.id.toString() === id);
		const name = forumSection[0];
		if (!name) {
			return 'Loading...';
		}
		return name.name;
	};
	const getPosts = (posts, comments) => {
		const forumId = props.match.params.forumId;
		const boardPosts = posts
			.filter(p => p.board_id === parseInt(forumId))
			.map(p => {
				const numOfComments = comments.filter(
					comment => comment.post_id === p.id
				).length;
				return (
					<li key={p.id}>
						<Link
							to={{
								pathname: `/messageBoard/${p.board_id}/${p.id}`,
								state: { id: p.id }
							}}>
							{p.title}
						</Link>
						<br />
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
					</li>
				);
			});

		return boardPosts.length === 0 ? (
			TokenServices.getAuthToken() ? (
				<p>There are currently no posts in this section. Be the first one!</p>
			) : (
				<p>
					There are currently no posts in this section.{' '}
					<Link to={'/signup'}>Create a account</Link> or{' '}
					<Link to={'/login'}>Log in</Link> and be the first one!
				</p>
			)
		) : (
			boardPosts
		);
	};

	const id = props.match.params.forumId;

	return (
		<ForumContext.Consumer>
			{context => (
				<section className='forum-section-container'>
					<header>
						<h3>{getForumName(context.state.forum)}</h3>
					</header>
					<span>
						{TokenServices.getAuthToken() ? (
							<CreateContentButton forumId={id} />
						) : null}
					</span>

					<div className='forum-section-content'>
						<ul>{getPosts(context.state.posts, context.state.comments)}</ul>
					</div>
				</section>
			)}
		</ForumContext.Consumer>
	);
}
