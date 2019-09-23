import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './PostPage.css';
import ForumContext from '../../ForumContext';

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p: {},
			redirectToForum: false
		};
	}
	static contextType = ForumContext;
	showDeleteWindow = () => {
		this.setState({
			showDeleteWindow: !this.state.showDeleteWindow
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { p } = this.state;
		this.context.deletePost(p.id);
		this.setState({
			redirectToForum: true
		});
	};
	formatDate = imageDate => {
		const date = new Date(imageDate);
		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	componentWillMount() {
		const post = this.context.posts.filter(
			p => p.id.toString() === this.props.match.params.postId
		);
		console.log(post);
		this.setState({
			p: post[0]
		});
	}
	render() {
		if (this.state.redirectToForum) {
			return <Redirect to={`/messageBoard`} />;
		}
		const { p } = this.state;
		const post = (
			<>
				<h3>{p.title}</h3>
				<p>{p.content}</p>
				<span className='postInfo'>
					<p>Posted By: {p.author}</p>
					<p>Posted On: {this.formatDate(p.date)}</p>
					<p>Likes: {p.likes}</p>
				</span>
				<button type='button' onClick={this.showDeleteWindow}>
					Delete
				</button>
			</>
		);
		const deleteWindow = (
			<form onSubmit={this.handleSubmit}>
				<div>
					<h3>Are you sure you want to delete post '{this.state.p.title}'?</h3>
				</div>
				<button type='submit'>Yes</button>
				<button type='button' onClick={this.showDeleteWindow}>
					No
				</button>
			</form>
		);
		return (
			<section className='post-container'>
				<div className='post-content'>
					{!this.state.showDeleteWindow ? post : deleteWindow}
				</div>
			</section>
		);
	}
}

export default withRouter(PostPage);
