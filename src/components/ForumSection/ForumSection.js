import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Truncate from 'react-truncate';
import STORE from '../../STORE/store';
import CreatePostButton from '../CreatePostButton/CreatePostButton';
import './ForumSection.css';
import TokenServices from '../../services/TokenServices';

class ForumSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: STORE.posts
		};
	}

	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	getPosts = () => {
		const forumId = this.props.match.params.forumId;
		const forumSectionPosts = this.state.posts.filter(
			p => p.forumId.toString() === forumId
		);
		const visiblePosts = forumSectionPosts.map(p => {
			return (
				<li key={p.id}>
					<Link to={`/messageBoard/${forumId}/${p.id}`}>{p.title}</Link>
					<br />
					<Truncate
						lines={1}
						ellipsis={
							<span>
								...
								<Link to={`/messageBoard/${forumId}/${p.id}`}>Read more</Link>
							</span>
						}>
						{p.content}
					</Truncate>
					<span className='postInfo'>
						<p>Posted By: {p.author || p.contact.name}</p>
						<p>Posted On: {this.formatDate(p.date)}</p>
						<p>Likes: {p.likes}</p>
					</span>
				</li>
			);
		});

		return forumSectionPosts.length === 0 ? (
			<p>There are currently no posts in this section. Be the first one!</p>
		) : (
			visiblePosts
		);
	};

	render() {
		console.log(this.state.forumTitle);
		return (
			<div className='forum-section-container'>
				<h3>{this.props.location.state.forum.title}</h3>
				<span>{TokenServices.getAuthToken() ? CreatePostButton : null}</span>
				<div className='forum-section-content'>
					<ul>{this.getPosts()}</ul>
				</div>
			</div>
		);
	}
}
export default withRouter(ForumSection);
