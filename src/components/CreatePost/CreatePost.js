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
			title: '',
			forumId: '',
			content: '',
			date: new Date(),
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
	handleCatagory = e => {
		this.setState({
			forumId: e,
			showPostForm: true
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

		const { id, title, content, forumId, date } = this.state;
		const newPost = { id, title, content, forumId, date };
		console.log(newPost);
		this.context.createPost(newPost);
		this.setState({
			redirectToPost: true
		});
	};
	makeCategorys = () => {
		let i = 0;
		let categorys = [];
		while (i < STORE.forum.length) {
			categorys.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return true;
					} else {
						return (
							<div>
								<input
									type='radio'
									name='categoryRadio'
									value={item.forumId}
									className='categoryInput'
									onClick={() => this.handleCatagory(item.forumId)}
									required
								/>
								<label htmlFor='categoryRadio'>{item.title}</label>
							</div>
						);
					}
				})
			);
			i++;
		}
		return categorys;
	};
	makeSelectCategorys = () => {
		let i = 0;
		let categorys = [];
		while (i < STORE.forum.length) {
			categorys.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return true;
					} else {
						return <option value={item.forumId}>{item.title}</option>;
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
		const category = (
			<section className='category-pop-up-container'>
				<div className='categoryPopUp'>
					<div className='categoryPopUpForm'>{this.makeCategorys()}</div>
				</div>
			</section>
		);

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
		const postFlow = !this.state.showPostForm ? category : postForm;
		return (
			<section className='create-post-container'>
				<div className='create-post-content'>{postFlow}</div>
			</section>
		);
	}
}
