import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import './AddComment.css';

export default class AddComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postId: this.props.postId,
			id: Math.floor(Math.random() * 10000000),
			userId: null,
			userName: '',
			content: '',
			date: new Date().toISOString().slice(0, 10),
			posted: false
		};
	}
	static contextType = ForumContext;
	handleCommentSubmit = e => {
		e.preventDefault();
		const { id, userId, userName, content, date, postId } = this.state;
		const newComment = { id, userId, userName, content, date, postId };
		this.context.addComment(newComment);
		this.setState({
			posted: true
		});
	};
	handleComment = e => {
		this.setState({
			content: e.target.value
		});
	};
	componentDidMount() {
		this.setState({
			userId: this.context.user.id,
			userName: this.context.user.name
		});
	}

	render() {
		if (this.state.posted) {
			const forumId = this.props.forumId;
			const postId = this.props.postId;
			return <Redirect to={`/messageBoard/${forumId}/${postId}`} />;
		}
		const commentForm = (
			<section className='add-comment-container'>
				<form onSubmit={this.handleCommentSubmit}>
					<label htmlFor='addComment'>Comment</label>
					<textarea
						name='addComment'
						id='add-comment'
						autoFocus
						required
						onChange={this.handleComment}
					/>
					<span>
						<button type='submit'>Post</button>
						<button type='reset'>Clear Form</button>
						<button type='button' onClick={this.props.closeAddComment}>
							Cancel
						</button>
					</span>
				</form>
			</section>
		);
		return commentForm;
	}
}
