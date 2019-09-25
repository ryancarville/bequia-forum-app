import React, { Component } from 'react';
import ForumContext from '../../ForumContext';
import './EditPost.css';

export default class EditPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			content: '',
			author: '',
			date: '',
			likes: ''
		};
	}
	static contextType = ForumContext;
	handlePostTitleEdit = e => {
		this.setState({
			title: e.target.value
		});
	};
	handlePostContentEdit = e => {
		this.setState({
			content: e.target.value
		});
	};
	handleEditSubmit = e => {
		e.preventDefault();
		const { id, date, author, likes, title, content } = this.state;
		const newPost = { id, title, content, date, author, likes };
		this.context.updatePost(newPost);
		this.setState({
			success: !this.state.success
		});
	};
	componentDidMount() {
		const { post } = this.props;
		this.setState({
			id: post.id,
			title: post.title,
			content: post.content,
			author: post.author,
			date: post.date,
			likes: post.likes
		});
	}

	render() {
		if (this.state.success) {
			this.props.closeEdit();
		}
		const { title, content } = this.state;
		const editWindow = (
			<section className='post-edit-container'>
				<form onSubmit={this.handleEditSubmit}>
					<label htmlFor='editPostTitle'>Title</label>
					<input
						type='text'
						name='editPostTitle'
						id='edit-post-tile'
						value={title}
						onChange={this.handlePostTitleEdit}
					/>
					<label htmlFor='editPostContent'>Content</label>
					<textarea
						name='editPostContent'
						id='edit-post-content'
						value={content}
						onChange={this.handlePostContentEdit}
					/>
					<span>
						<button type='submit'>Save Changes</button>
						<button type='button' onClick={this.props.closeEdit}>
							Cancel
						</button>
					</span>
				</form>
			</section>
		);
		return editWindow;
	}
}
