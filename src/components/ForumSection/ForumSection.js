import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import TokenServices from '../../services/TokenServices';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';
import comment from '../Icons/comment';
import like from '../Icons/like';
import './ForumSection.css';
import Sort from '../Sort/Sort';

export default function ForumSection(props) {
	const getForumName = forum => {
		const name = forum.filter(
			f => f.id.toString() === props.match.params.forumId
		);
		if (!name[0]) {
			return localStorage.getItem('forumTitle');
		} else {
			localStorage.setItem('forumTitle', name[0].name);
			return name[0].name;
		}
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
								pathname: `/messageBoard/${props.match.params.forumCatId}/${p.board_id}/${p.id}`,
								state: { id: p.id }
							}}>
							{p.title}
						</Link>
						<br />

						<Truncate
							lines={2}
							ellipsis={
								<span>
									...
									<Link
										to={{
											pathname: `/messageBoard/${props.match.params.forumCatId}/${p.board_id}/${p.id}`,
											state: { id: p.id }
										}}>
										Read more
									</Link>
								</span>
							}>
							{p.content}
						</Truncate>
						<span className='post-info'>
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
	return (
		<ForumContext.Consumer>
			{context => (
				<section className='forum-section-container'>
					<header>
						<h3>{getForumName(context.state.forum)}</h3>
					</header>

					<Sort sortType='posts' />
					<div className='forum-section-content'>
						<ul>{getPosts(context.state.posts, context.state.comments)}</ul>
					</div>
				</section>
			)}
		</ForumContext.Consumer>
	);
}
