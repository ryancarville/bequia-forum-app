import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './PostPage.css';
import ForumContext from '../../ForumContext';
import TokenService from '../../services/TokenServices';
import AddComment from '../AddComment/AddComment';
import EditPost from '../EditPost/EditPost';
import Comments from '../Comments/Comments';

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			p: {},
			title: '',
			content: '',
			didLike: false,
			redirectToForum: false
		};
	}
	static contextType = ForumContext;
	userEditButtons = () => {
		const { p } = this.state;
		if (TokenService.getAuthToken()) {
			if (this.context.user.id === p.userId) {
				return (
					<>
						<button tupe='button' onClick={this.showPostEdit}>
							Edit Post
						</button>
						<button type='button' onClick={this.showDeleteWindow}>
							Delete
						</button>
					</>
				);
			}
		}
		return null;
	};
	showDeleteWindow = () => {
		this.setState({
			showDeleteWindow: !this.state.showDeleteWindow
		});
	};
	showPostEdit = () => {
		this.setState({
			showPostEdit: !this.state.showPostEdit
		});
	};

	handleComment = () => {
		this.setState({
			showAddComment: !this.state.showAddComment
		});
	};

	handleLike = e => {
		if (this.state.didLike) {
			this.setState({
				didLike: !this.state.didLike,
				p: { ...this.state.p, likes: this.state.p.likes - 1 }
			});
		} else {
			this.setState({
				didLike: !this.state.didLike,
				p: { ...this.state.p, likes: this.state.p.likes + 1 }
			});
		}
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
		imageDate = '2019-9-1' || imageDate;
		const date = new Date(imageDate);

		const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
		return formatted_date;
	};
	componentWillMount() {
		const post = this.context.posts.filter(
			p => p.id.toString() === this.props.match.params.postId
		);
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
				{p.contact ? (
					<>
						<h4>Contact Information</h4>
						<p>
							Email:{' '}
							<a href={`mailto:${p.contact.email}`}> {p.contact.email}</a>
							<br />
							Phone: {p.contact.phone}
							<br />
							Website: {p.contact.website}
						</p>
					</>
				) : null}
				<span className='postInfo'>
					<p>Posted By: {p.author || p.contact.name}</p>
					<p>Posted On: {this.formatDate(p.date)}</p>
					<p>Likes: {p.likes}</p>
				</span>

				{TokenService.getAuthToken() ? (
					<>
						<button type='button' onClick={this.handleComment}>
							Add Comment
						</button>
						<button type='button' onClick={this.handleLike}>
							Like
						</button>
					</>
				) : null}
				{this.userEditButtons()}
				{this.state.showAddComment ? (
					<AddComment
						forumId={this.props.match.params.forumId}
						postId={this.props.match.params.postId}
						closeAddComment={this.handleComment}
					/>
				) : null}
				<Comments
					forumId={this.props.match.params.forumId}
					postId={this.props.match.params.postId}
				/>
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
					{!this.state.showDeleteWindow ? null : deleteWindow}
					{!this.state.showPostEdit ? (
						post
					) : (
						<EditPost post={this.state.p} closeEdit={this.showPostEdit} />
					)}
				</div>
			</section>
		);
	}
}

export default withRouter(PostPage);
