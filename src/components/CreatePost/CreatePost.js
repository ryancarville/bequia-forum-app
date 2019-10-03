import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import STORE from '../../STORE/store';
import ForumContext from '../../ForumContext';
import './CreatePost.css';

export default class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: Math.floor(Math.random() * 1000000),
			showPostForm: false,
			author: '',
			email: '',
			title: '',
			forumId: this.props.location.state.from || this.props.from,
			content: '',
			date: '',
			redirectToPost: false
		};
	}
	static contextType = ForumContext;
	handleTitle = e => {
		this.setState({
			title: e.target.value
		});
	};
	handleContent = e => {
		this.setState({
			content: e.target.value
		});
	};

	handleCatagoryPostForm = e => {
		this.setState({
			forumId: e.target.value
		});
	};
	handleCancel = () => {
		this.props.history.goBack();
	};
	handleSubmit = e => {
		e.preventDefault();

		const { id, title, content, forumId, date, author, email } = this.state;
		const newPost = { id, title, content, forumId, date, author, email };
		this.context.createPost(newPost);
		this.setState({
			redirectToPost: true
		});
	};
	componentDidMount() {
		const user = this.context.user;
		const today = new Date().toISOString();
		this.setState({
			author: user.name,
			email: user.email,
			date: today.slice(0, 10)
		});
	}

	makeSelectCategorys = () => {
		let i = 0;
		let categorys = [];
		while (i < STORE.forum.length) {
			categorys.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return true;
					} else {
						return (
							<option key={item.forumId} value={item.forumId}>
								{item.title}
							</option>
						);
					}
				})
			);
			i++;
		}
		return categorys;
	};

	render() {
		if (this.state.redirectToPost) {
			const fourmId = this.state.forumId;
			const postId = this.state.id;
			const { id, title, content, forumId, date } = this.state;
			const newPost = { id, title, content, forumId, date };
			return (
				<Redirect
					to={{
						pathname: `/messageBoard/${fourmId}/${postId}`,
						state: { post: newPost }
					}}
				/>
			);
		}

		const postForm = (
			<form onSubmit={this.handleSubmit}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					name='title'
					id='post-title'
					onChange={this.handleTitle}
					autoFocus
					required
				/>
				<label htmlFor='catagory'>Catagory</label>
				<select
					name='catagory'
					id='post-catagory'
					value={this.state.forumId}
					onChange={this.handleCatagoryPostForm}
					required>
					<option selected disabled value={0}>
						Please Select a Forum
					</option>
					{this.makeSelectCategorys()}
				</select>
				<label htmlFor='content'>Content</label>
				<textarea
					name='content'
					id='post-content'
					onChange={this.handleContent}
					required></textarea>
				<button type='submit'>Create Post</button>
				<button type='reset'>Clear Form</button>
				<button type='button' onClick={this.handleCancel}>
					Cancel
				</button>
			</form>
		);

		return (
			<section className='create-post-container'>
				<div className='create-post-content'>{postForm}</div>
			</section>
		);
	}
}
