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
	const context = useContext(ForumContext);
	const forumId = props.match.params.forumId;
	const getPosts = () => {
		const boardPosts = context.state.posts
			.filter(p => p.boardid.toString() === forumId)
			.map(p => {
				const numOfComments = context.state.comments.filter(
					comment => comment.postid === p.id
				).length;
				return (
					<li key={p.id}>
						<Link
							to={{
								pathname: `/messageBoard/${forumId}/${p.id}`,
								state: { post: p }
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
											pathname: `/messageBoard/${forumId}/${p.id}`,
											state: { postId: p.id }
										}}>
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
	const name = context.state.forum.filter(f => f.id.toString() === id);
	console.log(name);
	return (
		<section className='forum-section-container'>
			<header>
				<h3>{name[0].name}</h3>
			</header>
			<span>
				{TokenServices.getAuthToken() ? (
					<CreateContentButton forumId={id} />
				) : null}
			</span>
			<div className='forum-section-content'>
				<ul>{getPosts()}</ul>
			</div>
		</section>
	);
}
