import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
import ForumContext from '../../ForumContext';

export default function Forum(props) {
	const context = useContext(ForumContext);
	const makeForum = () => {
		let i = 0;
		let links = [];
		const forumTitles = context.state.forumTitles;
		const forumSections = context.state.forum;
		const posts = context.state.posts;
		console.log(context.state.forumTitles);
		console.log(context.state.forum);
		while (i < forumTitles.length) {
			const titleId = forumTitles[i].id;
			links.push(<h4 key={forumTitles[i].id}>{forumTitles[i].name}</h4>);
			links.push(
				forumSections
					.filter(section => section.messageboardsection === titleId)
					.map(item => {
						const numOfThreads = posts.filter(post => post.boardid === item.id)
							.length;
						return (
							<li key={'u-' + item.forumId}>
								<div>
									<Link
										to={{
											pathname: `/messageBoard/${item.id}`,
											state: { forum: item }
										}}>
										{item.title}
									</Link>
									<p>{item.description}</p>
								</div>
								<span className='thread-count'>
									<p>Threads</p> {numOfThreads}
								</span>
							</li>
						);
					})
			);

			// links.push(
			// 	context.state.forumTitles.map(item => {
			// 		if (item.sectionTitle) {
			// 			return <h4 key={item}>{item.sectionTitle}</h4>;
			// 		} else {
			// 			const numOfThreads = context.state.posts.filter(
			// 				post => post.forumId === item.forumId
			// 			).length;
			// 			return (
			// 				<li key={'u-' + item.forumId}>
			// 					<div>
			// 						<Link
			// 							to={{
			// 								pathname: `/messageBoard/${item.forumId}`,
			// 								state: { forum: item }
			// 							}}>
			// 							{item.title}
			// 						</Link>
			// 						<p>{item.description}</p>
			// 					</div>
			// 					<span className='thread-count'>
			// 						<p>Threads</p> {numOfThreads}
			// 					</span>
			// 				</li>
			// 			);
			// 		}
			// 	})
			// );

			i++;
		}
		return links;
	};

	return (
		<div className='forum-container'>
			<span>
				<h3>Fourm</h3>
				{TokenServices.getAuthToken() ? (
					<CreateContentButton page='forum' />
				) : null}
			</span>
			<div className='forum-content'>
				<ul>{makeForum()}</ul>
			</div>
		</div>
	);
}
