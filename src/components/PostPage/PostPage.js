import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './PostPage.css';
import Post from '../Post/Post';
import ForumContext from '../../ForumContext';
import TokenService from '../../services/TokenServices';
import AddComment from '../AddComment/AddComment';
import EditPost from '../EditPost/EditPost';
import Comments from '../Comments/Comments';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import LikeButtons from './likeButton';
import CommentButton from './commentButton';
import EditButtons from './editButtons';

class PostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			user_id: '',
			title: '',
			content: '',
			user_name: '',
			date_posted: new Date(),
			likes: '',
			didLike: false,
			redirectToForum: false
		};
	}
	static contextType = ForumContext;

	showDeletePopUp = () => {
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
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
	handleDelete = () => {
		const { id } = this.state;
		this.context.deletePost(id);
		this.setState({
			redirectToForum: !this.state.redirectToForum
		});
	};
	handleLike = () => {
		const post_id = this.state.id;
		const user_id = this.context.user.id;
		const info = { post_id, user_id };
		console.log(info);
		if (this.state.didLike) {
			this.context.handleMinusLike(post_id);
			this.context.handleDeleteFromLikesTracker(info);
			this.setState({
				likes: this.state.likes - 1,
				didLike: !this.state.didLike
			});
		}
		if (!this.state.didLike) {
			this.context.handleAddLike(post_id);
			this.context.handleAddToLikesTracker(info);
			this.setState({
				likes: this.state.likes + 1,
				didLike: !this.state.didLike
			});
		}
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
	handleEditSubmit = e => {
		e.preventDefault();
		const { id, title, content } = this.state;
		const postToUpdate = { id, title, content };
		this.context.updatePost(postToUpdate);
		this.setState({
			showPostEdit: !this.state.showPostEdit
		});
	};
	postLiked = (post, user_id, context) => {
		context.getLikesTracker();
		const postAlreadyLiked = context.state.likesTracker.filter(
			p => p.user_id === user_id && p.post_id === post.id
		);
		if (postAlreadyLiked.length === 1) {
			this.setState({
				didLike: true
			});
		}
	};
	getPost = context => {
		const { postId } = this.props.match.params;
		var post = context.state.posts.filter(p => p.id.toString() === postId);
		post = post[0];
		if (post) {
			this.setState({
				id: post.id,
				user_id: post.user_id,
				board_id: post.board_id,
				title: post.title,
				content: post.content,
				user_name: post.user_name,
				date_posted: post.date_posted,
				likes: post.likes
			});
		}
		return post;
	};

	render() {
		if (this.state.redirectToForum) {
			const boardid = this.state.boardid;
			return <Redirect to={`/messageBoard/${boardid}`} />;
		}
		return (
			<section className='post-container'>
				<div className='post-content'>
					<ForumContext.Consumer>
						{context =>
							!this.state.title
								? this.postLiked(
										this.getPost(context),
										context.user.id,
										context
								  )
								: null
						}
					</ForumContext.Consumer>
					{TokenService.getAuthToken() ? (
						this.context.user.id === this.state.user_id ? (
							<EditButtons
								showPostEdit={this.showPostEdit}
								showDeletePopUp={this.showDeletePopUp}
							/>
						) : null
					) : null}
					{this.state.showDeletePopUp ? (
						<DeletePopUp
							showDeletePopUp={this.showDeletePopUp}
							postTitle={this.state.title}
							handleDelete={this.handleDelete}
						/>
					) : null}
					{this.state.showPostEdit ? (
						<EditPost
							state={this.state}
							handleTitle={this.handleTitle}
							handleContent={this.handleContent}
							handleEditSubmit={this.handleEditSubmit}
							closeEdit={this.showPostEdit}
						/>
					) : (
						<ForumContext.Consumer>
							{context => (
								<Post post={this.state} comments={context.state.comments} />
							)}
						</ForumContext.Consumer>
					)}
					{TokenService.getAuthToken() ? (
						<span className='comment-like-button-container'>
							<LikeButtons
								didLike={this.state.didLike}
								handleLike={this.handleLike}
							/>
							<CommentButton handleComment={this.handleComment} />
						</span>
					) : null}
					{this.state.showAddComment ? (
						<AddComment
							forumId={this.props.match.params.forumId}
							postId={this.props.match.params.postId}
							closeAddComment={this.handleComment}
						/>
					) : null}
					<Comments forumId={this.state.board_id} postId={this.state.id} />
				</div>
			</section>
		);
	}
}

export default withRouter(PostPage);
