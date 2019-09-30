import React, { Component } from 'react';
import './Comments.css';
import ForumContext from '../../ForumContext';
import TokenServices from '../../services/TokenServices';
import deleteIcon from '../Icons/delete';
export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			commentDeleted: false
		};
	}
	static contextType = ForumContext;
	showDeletePopUp = id => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp,
			commentId: id
		});
	};
	handleDeleteComment = () => {
		const { commentId } = this.state;
		this.context.deleteComment(commentId);
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	deleteCommentButton = (userId, id) => {
		if (TokenServices.getAuthToken()) {
			if (this.context.user.id === userId) {
				return (
					<button type='button' onClick={() => this.showDeletePopUp(id)}>
						{deleteIcon}
					</button>
				);
			}
		}

		return null;
	};
	render() {
		const filteredComs = this.context.comments.filter(
			com => com.postId.toString() === this.props.postId
		);
		const visibleComments = filteredComs.map(c => {
			return (
				<div className='comments-content' key={c.id}>
					<p>{c.content}</p>
					<h5>
						Posted By: {c.userName}
						<br />
						Posted on: {c.date}
					</h5>
					{this.deleteCommentButton(c.userId, c.id)}
				</div>
			);
		});
		const deletePopUp = (
			<>
				<section className='comment-delete-pop-up'>
					<h3>Are you sure you want to delete this comment?</h3>
					<span>
						<button type='button' onClick={this.handleDeleteComment}>
							Yes
						</button>
						<button type='button' onClick={this.showDeletePopUp}>
							No
						</button>
					</span>
				</section>
			</>
		);
		return this.state.showDeletePopUp ? deletePopUp : visibleComments;
	}
}
