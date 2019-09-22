import React, { Component } from 'react';
import STORE from '../../STORE/store';
import { Link } from 'react-router-dom';
import './CreatePost.css';

export default class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPostForm: false,
			newPost: {
				title: '',
				category: '',
				content: '',
				dateCreated: (
					new Date().getFullYear() +
					'-' +
					(new Date().getMonth + 1) +
					'-' +
					new Date().getDate()
				).toString()
			}
		};
	}
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
			newPost: {
				category: e
			},
			showPostForm: true
		});
	};
	handleCatagoryPostForm = e => {
		this.setState({
			newPost: {
				category: e.target.value
			}
		});
	};
	handleCancel = () => {
		this.props.history.goBack();
	};
	handleSubmit = e => {
		e.preventDefault();
		window.alert('Submit');
	};
	makeCategorys = () => {
		let i = 0;
		let categorys = [];
		while (i < STORE.forum.length) {
			categorys.push(
				STORE.forum[i].map(item => {
					if (item.sectionTitle) {
						return;
					} else {
						return (
							<div>
								<input
									type='radio'
									name='categoryRadio'
									value={item.title}
									className='categoryInput'
									onClick={() => this.handleCatagory(item.title)}
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
						return;
					} else {
						return <option value={item.title}>{item.title}</option>;
					}
				})
			);
			i++;
		}
		return categorys;
	};

	render() {
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
					autofocus
					required
				/>
				<label htmlFor='catagory'>Catagory</label>
				<select
					name='catagory'
					id='post-catagory'
					value={this.state.newPost.category}
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
