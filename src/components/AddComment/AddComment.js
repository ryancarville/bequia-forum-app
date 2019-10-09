import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import './AddComment.css';

export default class AddComment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postid: this.props.postId,
			userid: null,
			content: '',
			dateposted: new Date().toISOString().slice(0, 10),
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
		var { postid } = this.state;
		postid = parseInt(postid);
		const { userid, content, dateposted } = this.state;
		const newComment = { userid, content, dateposted, postid };
		this.context.addComment(newComment);
		this.setState({
			posted: true
		});
	};
	componentDidMount() {
		this.setState({
			userid: this.context.user.id
		});
	}
	render() {
		return (
			<>
				{this.state.posted ? this.props.closeAddComment() : null}
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
			</>
		);
	}
}
