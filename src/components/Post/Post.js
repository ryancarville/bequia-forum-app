import React from 'react';
import formatDate from '../../helpers/formatDate';
import like from '../Icons/like';
export default function Post(props) {
	const p = props.post;
	return (
		<section>
			<header>
				<h3>{p.title}</h3>
			</header>
			<p>{p.content}</p>
			<span className='postInfo'>
				<p>Posted By: {p.user_name}</p>
				<p>Posted On: {formatDate(p.date_posted)}</p>
				<p>
					{like} {'  '} {p.likes}
				</p>
			</span>
		</section>
	);
}
