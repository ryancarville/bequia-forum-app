import React, { Component } from 'react';
import STORE from '../../STORE/store';
import { Link } from 'react-router-dom';
import './CreatePost.css';

export default class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: false,

			newPost: {
				title: '',
				catagory: '',
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
			catagory: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		window.alert('Submit');
	};
	makeCategorys = () => {
		let i = 0;
		let links = [];
		while (i < STORE.forum.length) {
			console.log('count ' + i);
			console.log(STORE.forum[i]);
			links.push(
				STORE.forum[i].map(item => (
					<li>
						<Link to={`/messageBoard/${item.path}`}>{item.title}</Link>
					</li>
				))
			);

			i++;
		}
		return links;
	};
	componentDidMount() {}

	render() {
		const category = (
			<section className='category-pop-up-container'>
				<div className='category-pop-up-content'>
					<ul>{this.makeCategorys()}</ul>{' '}
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
				/>
				<label htmlFor='catagory'>Catagory</label>
				<select
					name='catagory'
					id='post-catagory'
					onChange={this.handleCatagory}>
					<optgroup label='Forum'>
						<option value='bequia'>Bequia</option>
						<option value='news'>News</option>
					</optgroup>
					<optgroup lable='Market Place'>
						<option value='for-sale'>For Sale</option>
					</optgroup>
					<option value='rental'>Rental</option>
				</select>
				<label htmlFor='content'>Content</label>
				<textarea
					name='content'
					id='post-content'
					onChange={this.handleContent}></textarea>
				<button type='submit'>Create Post</button>
				<button type='reset'>Clear Form</button>
				<button type='button'>Cancel</button>
			</form>
		);
		const postFlow = !this.state.catagory ? category : postForm;
		return (
			<section className='create-post-container'>
				<div className='create-post-content'>{postFlow}</div>
			</section>
		);
	}
}
