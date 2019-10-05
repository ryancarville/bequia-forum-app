import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PostForm from './PostForm';
import ShowPostPreview from './ShowPostPreview';
import ForumContext from '../../ForumContext';
import './CreatePost.css';

export default class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: Math.floor(Math.random() * 1000000),
			author: '',
			email: '',
			title: '',
			forumId: '',
			content: '',
			date: '',
			showPreview: false,
			redirectToPost: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			author: '',
			email: '',
			title: '',
			forumId: '',
			content: '',
			date: '',
			showPreview: false,
			redirectToPost: false
		});
	};
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
	goBack = () => {
		this.props.history.goBack();
	};
	handleShowPreview = e => {
		e.preventDefault();
		const user = this.context.user;
		this.setState({
			author: user.name,
			email: user.email,
			date: new Date().toISOString().slice(0, 10),
			showPreview: !this.state.showPreview
		});
	};
	handleSubmit = e => {
		var { forumId } = this.state;
		forumId = parseInt(forumId);
		const { id, title, content, date, author, email } = this.state;
		const newPost = { id, title, content, forumId, date, author, email };
		this.context.createPost(newPost);
		this.setState({
			redirectToPost: true
		});
	};
	componentDidMount() {}

	render() {
		if (this.state.redirectToPost) {
			const fourmId = this.state.forumId;
			const { id } = this.state;
			return <Redirect to={`/messageBoard/${fourmId}/${id}`} />;
		}

		return (
			<section className='create-post-container'>
				<div className='create-post-content'>
					{this.state.showPreview ? (
						<ShowPostPreview
							state={this.state}
							handleSubmit={this.handleSubmit}
							handleShowPreview={this.handleShowPreview}
							goBack={this.goBack}
						/>
					) : (
						<PostForm
							state={this.state}
							handleTitle={this.handleTitle}
							handleContent={this.handleContent}
							handleCatagoryPostForm={this.handleCatagoryPostForm}
							handleShowPreview={this.handleShowPreview}
							resetState={this.resetState}
							goBack={this.goBack}
						/>
					)}
				</div>
			</section>
		);
	}
}
