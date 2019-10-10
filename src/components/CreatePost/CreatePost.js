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
			title: '',
			boardid: this.props.location.state.forumId,
			userid: 0,
			content: '',
			dateposted: new Date().toISOString(),
			showPreview: false,
			redirectToPost: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			title: '',
			boardid: this.props.location.state.forumId,
			content: '',
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

	handleCatagory = e => {
		this.setState(
			{
				boardid: e.target.value
			},
			() => {
				console.log(this.state.boardid);
			}
		);
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
		var { boardid } = this.state;
		boardid = parseInt(boardid);
		const { userid, title, content, dateposted } = this.state;
		const newPost = { boardid, userid, title, content, dateposted };
		this.context.createPost(newPost);

		this.setState({
			redirectToPost: true
		});
	};
	componentDidMount() {
		this.setState({
			userid: this.context.user.id
		});
	}

	render() {
		if (this.state.redirectToPost) {
			const boardid = this.state.boardid;
			return <Redirect to={`/messageBoard/${boardid}`} />;
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
							handleCatagory={this.handleCatagory}
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
