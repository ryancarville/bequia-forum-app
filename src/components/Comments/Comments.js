import React, { Component } from 'react';
import './Comments.css';
import ForumContext from '../../ForumContext';
import TokenServices from '../../services/TokenServices';

import formatDate from '../../helpers/formatDate';
import DeleteButton from '../Buttons/deleteButton';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			commentDeleted: false
		};
	}
	static contextType = ForumContext;
	showDeletePopUp = id => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp,
			id: id
		});
	};
	handleDelete = () => {
		const { id } = this.state;
		this.context.deleteComment(id);
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};

	render() {
		const comments = this.context.state.comments
			.filter(com => com.postid.toString() === this.props.postId)
			.map(c => {
				console.log(c);
				return (
					<div className='comments-content' key={c.id}>
						<p>{c.content}</p>
						<h5>
							Posted By: {c.username}
							<br />
							Posted on: {formatDate(c.dateposted)}
						</h5>
						{TokenServices.getAuthToken() ? (
							this.context.user.id === c.userid ? (
								<DeleteButton
									showDeletePopUp={this.showDeletePopUp}
									id={c.id}
								/>
							) : null
						) : null}
					</div>
				);
			});

		return this.state.showDeletePopUp ? (
			<DeletePopUp
				handleDelete={this.handleDelete}
				showDeletePopUp={this.showDeletePopUp}
			/>
		) : (
			comments
		);
	}
}
