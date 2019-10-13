import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import TokenServices from '../../services/TokenServices';
import formatDate from '../../helpers/formatDate';
import ForumContext from '../../ForumContext';
import comment from '../Icons/comment';
import like from '../Icons/like';
import './SearchResults.css';

export default function SearchResults(props) {
	const getPosts = (posts, comments) => {
		console.log(posts);
		if (posts.message) {
			return posts.message;
		}
		const forumPosts = posts => {
			return posts.map(p => {
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
		};
		const marketPlacePosts = posts => {
			return posts.map(l => {
				const marketPlaceId = l.market_place_cat;
				return (
					<li key={l.id}>
						<Link
							to={{
								pathname: `/marketPlace/${marketPlaceId}/${l.id}`,
								state: { id: l.id }
							}}>
							<h4>{l.title}</h4>
						</Link>
						<Truncate
							lines={1}
							ellipsis={
								<span>
									...
									<Link
										to={{
											pathname: `/marketPlace/${marketPlaceId}/${l.id}`,
											state: { id: l.id }
										}}>
										Read more
									</Link>
								</span>
							}>
							<p>{l.description}</p>
						</Truncate>
						<span className='postInfo'>
							{l.price ? <p>Price: {l.price}</p> : null}
							{l.location ? <p>Location: {l.location}</p> : null}
							<p>Posted By: {l.contact_name}</p>
							<p>Posted On: {formatDate(l.date_posted)}</p>
						</span>
					</li>
				);
			});
		};
		return forumPosts(posts.mbPosts), marketPlacePosts(posts.mpPosts);
	};

	return (
		<ForumContext.Consumer>
			{context => (
				<section className='forum-section-container'>
					<div className='forum-section-content'>
						<header>
							<h2>Search Results</h2>
						</header>
						<ul>{getPosts(context.state.posts, context.state.comments)}</ul>
					</div>
				</section>
			)}
		</ForumContext.Consumer>
	);
}
