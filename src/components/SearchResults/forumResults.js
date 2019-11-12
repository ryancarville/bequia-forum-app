import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
import comment from '../Icons/comment';
import like from '../Icons/like';
export default function ForumSearchResults(props) {
	const forumPosts = () => {
		return props.posts.map(p => {
			const numOfComments = props.comments.filter(
				comment => comment.post_id === p.id
			).length;

			const forum = props.context.state.forum.filter(
				forum => forum.id === p.board_id
			);

			return (
				<li key={p.id}>
					<Link
						to={{
							pathname: `/messageBoard/${forum[0].messageboard_section}/${p.board_id}/${p.id}`,
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
										pathname: `/messageBoard/${forum[0].messageboard_section}/${p.board_id}/${p.id}`,
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
	return forumPosts();
}
