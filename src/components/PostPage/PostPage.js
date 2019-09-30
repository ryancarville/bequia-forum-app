import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './PostPage.css';
import ForumContext from '../../ForumContext';
import TokenService from '../../services/TokenServices';
import AddComment from '../AddComment/AddComment';
import EditPost from '../EditPost/EditPost';
import Comments from '../Comments/Comments';
import formatDate from '../../helpers/formatDate';
import like from '../Icons/like';
import comment from '../Icons/comment';
import edit from '../Icons/edit';
import deleteIcon from '../Icons/delete';

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
					<div className='edit-button-container'>
						<button tupe='button' onClick={this.showPostEdit}>
							{edit}
						</button>
						<button type='button' onClick={this.showDeleteWindow}>
							{deleteIcon}
						</button>
					</div>
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

	UNSAFE_componentWillMount() {
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
					<p>Posted On: {formatDate(p.date)}</p>
					<p>
						{like} {'  '} {p.likes}
					</p>
				</span>
				{this.userEditButtons()}
				{TokenService.getAuthToken() ? (
					<div className='comment-like-button-container'>
						<button
							type='button'
							onClick={this.handleLike}
							id='coconut-likes-btn'>
							{like} Like
						</button>
						<button
							type='button'
							onClick={this.handleComment}
							id='add-comment-btn'>
							{comment} Comment
						</button>
					</div>
				) : null}

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
				<div className='post-delete-pop-up'>
					<h3>Are you sure you want to delete post '{this.state.p.title}'?</h3>
					<span>
						<button type='submit'>Yes</button>
						<button type='button' onClick={this.showDeleteWindow}>
							No
						</button>
					</span>
				</div>
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
