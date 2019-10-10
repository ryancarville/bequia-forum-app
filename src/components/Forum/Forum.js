import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
import ForumContext from '../../ForumContext';

export default function Forum() {
	const context = useContext(ForumContext);
	const makeForum = () => {
		let i = 0;
		let links = [];
		const forumTitles = context.state.forumTitles;
		const forumSections = context.state.forum;
		const posts = context.state.posts;
		while (i < forumTitles.length) {
			const titleId = forumTitles[i].id;
			links.push(<h4 key={titleId}>{forumTitles[i].name}</h4>);
			links.push(
				forumSections
					.filter(section => section.messageboard_section === titleId)
					.map(item => {
						const numOfThreads = posts.filter(post => post.board_id === item.id)
							.length;
						return (
							<li key={item.id}>
								<span>
									<Link
										to={{
											pathname: `/messageBoard/${item.id}`,
											state: { id: item.id, name: item.name }
										}}>
										{item.name}
									</Link>
									<p>{item.description}</p>
								</span>
								<span className='thread-count'>
									<p>Threads</p> {numOfThreads}
								</span>
							</li>
						);
					})
			);
			i++;
		}
		return links;
	};
	return (
		<section className='forum-container'>
			<header>
				<h3>Fourm</h3>
			</header>
			<span>
				{TokenServices.getAuthToken() ? (
					<CreateContentButton page='forum' />
				) : null}
			</span>
			<div className='forum-content'>
				<ul>{makeForum()}</ul>
			</div>
		</section>
	);
}
