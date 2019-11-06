import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './AddComment.css';

export default class AddComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post_id: this.props.postId,
			user_id: null,
			content: '',
			date_posted: new Date().toISOString().slice(0, 10),
			posted: false
		};
	}
	static contextType = ForumContext;
	handleComment = e => {
		this.setState({
			content: e.target.value
		});
	};
	handleCommentSubmit = e => {
		e.preventDefault();
		var { post_id } = this.state;
		post_id = parseInt(post_id);
		const { user_id, content, date_posted } = this.state;
		const newComment = { user_id, content, date_posted, post_id };
		this.context.addComment(newComment);
		this.setState({
			posted: true
		});
	};
	componentDidMount() {
		this.setState({
			user_id: this.context.user.id
		});
	}
	render() {
		return (
			<>
				{this.state.posted ? this.props.closeAddComment() : null}
				<section className='add-comment-container'>
					<form onSubmit={this.handleCommentSubmit}>
						<textarea
							name='addComment'
							id='add-comment'
							placeholder='Enter comment here...'
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
			</>
		);
	}
}
