import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import CreatePostButton from '../CreatePostButton/CreatePostButton';
import STORE from '../../STORE/store';
import TokenServices from '../../services/TokenServices';

export default class Forum extends Component {
	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};

	makeForum = () => {
		let i = 0;
		let links = [];
		while (i < STORE.forum.length) {
			links.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return <h4 key={item}>{item.sectionTitle}</h4>;
					} else {
						const numOfThreads = STORE.posts.filter(
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
								<sapn className='thread-count'>
									<p>Threads</p> {numOfThreads}
								</sapn>
							</li>
						);
					}
				})
			);

			i++;
		}
		return links;
	};
	render() {
		return (
			<div className='forum-container'>
				<h3>Fourm</h3>
				<span>
					{TokenServices.getAuthToken() ? (
						<CreatePostButton page='forum' />
					) : null}
				</span>
				<div className='forum-content'>
					<ul>{this.makeForum()}</ul>
				</div>
			</div>
		);
	}
}
