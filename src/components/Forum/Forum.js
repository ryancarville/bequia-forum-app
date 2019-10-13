import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Forum.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
import ForumContext from '../../ForumContext';

import apiServices from '../../services/apiServices';
export default class Forum extends Component {
	count = id => {
		apiServices.getNumOfThreads(id).then(numOfThreads => {
			document.getElementById(`thread-count-${id}`).innerText =
				numOfThreads[0].count;
			return true;
		});
	};
	makeForum = (forumTitles, forumSections) => {
		let i = 0;
		let links = [];
		while (i < forumTitles.length) {
			const titleId = forumTitles[i].id;
			links.push(<h4 key={titleId}>{forumTitles[i].name}</h4>);
			links.push(
				forumSections
					.filter(section => section.messageboard_section === titleId)
					.map(item => {
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
									<p>Threads</p>
									<p id={`thread-count-${item.id}`}>counting...</p>
									{this.count(item.id)}
								</span>
							</li>
						);
					})
			);
			i++;
		}
		return links;
	};

	render() {
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
				<ForumContext.Consumer>
					{context => (
						<div className='forum-content'>
							<ul>
								{this.makeForum(
									context.state.forumTitles,
									context.state.forum,
									context.state.posts
								)}
							</ul>
						</div>
					)}
				</ForumContext.Consumer>
			</section>
		);
	}
}
