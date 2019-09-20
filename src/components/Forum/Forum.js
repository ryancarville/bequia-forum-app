import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import './Forum.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';

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
				<Link to={`/messageBoard/${p.postId}`}>
					<h4>{p.title}</h4>
				</Link>
				<Truncate
					lines={1}
					ellipsis={
						<span>
							...<Link to={`/forum/${p.postId}`}>Read more</Link>
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
	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<div className='forum-container'>
						<Sort sortType={'posts'} handleSort={context.sort} />
						<div className='forum-content'>{this.threads(context.posts)}</div>
					</div>
				)}
			</ForumContext.Consumer>
		);
	}
}
