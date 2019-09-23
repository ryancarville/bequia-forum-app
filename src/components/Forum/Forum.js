import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import './Forum.css';
import CreatePostButton from '../CreatePostButton/CreatePostButton';
import STORE from '../../STORE/store';

export default class Forum extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	threads = posts =>
		posts.map(p => (
			<div className='post' key={p.postId}>
				<Link
					to={{
						pathname: `/messageBoard/${p.postId}`,
						state: {
							post: p
						}
					}}>
					<h4>{p.title}</h4>
				</Link>
				<Truncate
					lines={1}
					ellipsis={
						<span>
							...
							<Link
								to={{
									pathname: `/messageBoard/${p.postId}`,
									state: {
										post: p
									}
								}}>
								Read more
							</Link>
						</span>
					}>
					{p.content}
				</Truncate>
				<span className='postInfo'>
					<p>Posted By: {p.author}</p>
					<p>Posted On: {this.formatDate(p.date)}</p>
					<p>Likes: {p.likes}</p>
				</span>
			</div>
		));

	makeForum = () => {
		let i = 0;
		let links = [];
		while (i < STORE.forum.length) {
			links.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return <h4>{item.sectionTitle}</h4>;
					} else {
						return (
							<li key={item.forumId}>
								<Link
									to={{
										pathname: `/messageBoard/${item.forumId}`,
										state: { forum: item }
									}}>
									{item.title}
								</Link>
								<p>{item.description}</p>
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
				<span>{CreatePostButton}</span>
				<h3>Fourm</h3>
				<div className='forum-content'>
					<ul>{this.makeForum()}</ul>
				</div>
			</div>
		);
	}
}
