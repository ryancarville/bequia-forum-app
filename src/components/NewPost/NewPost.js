import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import apiServices from '../../services/apiServices';
import formatDate from '../../helpers/formatDate';
import './NewPost.css';
import like from '../Icons/like';
import comment from '../Icons/comment';

export default class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			error: null
		};
	}
	recentPosts = () => {
		return this.state.posts.map(p => {
			var forum = this.state.forum.filter(f => f.id === p.board_id);
			const numOfComments = this.state.comments.filter(
				comment => comment.post_id === p.id
			).length;
			forum = forum[0];
			return (
				<article className='newest-posts' key={p.id}>
					<Link
						to={{
							pathname: `/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`,
							state: { id: p.id }
						}}>
						<h4>{p.title}</h4>
					</Link>
					<Truncate
						lines={2}
						ellipsis={
							<span>
								...
								<Link
									to={{
										pathname: `/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`,
										state: { id: p.id }
									}}>
									Read more
								</Link>
							</span>
						}>
						{p.content}
					</Truncate>
					<span className='post-info'>
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
				</article>
			);
		});
	};
	componentDidMount() {
		apiServices
			.getFourm()
			.then(forum => this.setState({ forum: forum }))
			.then(() =>
				apiServices
					.getComments()
					.then(comments => this.setState({ comments: comments }))
			)
			.then(() =>
				apiServices.getNewestPosts().then(posts => {
					if (posts.error) {
						this.setState({
							error: posts.error
						});
					} else {
						this.setState({
							posts: posts
						});
					}
				})
			);
	}

	render() {
		return (
			<div className='newPost-container'>
				<div className='newPost-content'>
					{this.state.posts ? this.recentPosts() : <p>{this.state.error}</p>}
				</div>
			</div>
		);
	}
}
