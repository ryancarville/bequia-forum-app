import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import STORE from '../../STORE/store';
import TokenServices from '../../services/TokenServices';
import ForumContext from '../../ForumContext';

export default function Forum(props) {
	const context = useContext(ForumContext);
	const makeForum = () => {
		let i = 0;
		let links = [];
		while (i < context.state.forum.length) {
			links.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return <h4 key={item}>{item.sectionTitle}</h4>;
					} else {
						const numOfThreads = context.state.posts.filter(
							post => post.forumId === item.forumId
						).length;
						return (
							<li key={'u-' + item.forumId}>
								<div>
									<Link
										to={{
											pathname: `/messageBoard/${item.forumId}`,
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
					}
				})
			);

			i++;
		}
		return links;
	};

	return (
		<div className='forum-container'>
			<h3>Fourm</h3>
			<span>
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
