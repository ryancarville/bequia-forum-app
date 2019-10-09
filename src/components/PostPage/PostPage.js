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
			post: '',
			title: '',
			content: '',
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
		const { id } = this.state.post;
		this.context.deletePost(id);
		this.setState({
			redirectToForum: !this.state.redirectToForum
		});
	};
	handleLike = e => {
		const { id } = this.state.post;
		const add = '+';
		const subtract = '-';
		if (this.state.didLike) {
			this.context.handleLike(id, subtract);
			this.setState({
				didLike: !this.state.didLike
			});
		}
		if (!this.state.didLike) {
			this.context.handleLike(id, add);
			this.setState({
				didLike: !this.state.didLike
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
	componentDidMount() {
		const post = this.props.posts.filter(
			p => p.id.toString() === this.props.match.params.postId
		);
		this.setState({
			post: post[0]
		});
	}

	render() {
		const postInfo = this.props.posts.filter(
			p => p.id.toString() === this.props.match.params.postId
		);

		if (this.state.redirectToForum) {
			return <Redirect to={`/messageBoard`} />;
		}

		return (
			<section className='post-container'>
				<div className='post-content'>
					{TokenService.getAuthToken() ? (
						this.context.user.id === this.state.post.userid ? (
							<EditButtons
								showPostEdit={this.showPostEdit}
								showDeletePopUp={this.showDeletePopUp}
							/>
						) : null
					) : null}
					{this.state.showDeletePopUp ? (
						<DeletePopUp
							showDeletePopUp={this.showDeletePopUp}
							title={this.state.post.title}
							handleDelete={this.handleDelete}
						/>
					) : null}
					{this.state.showPostEdit ? (
						<EditPost post={this.state.post} closeEdit={this.showPostEdit} />
					) : (
						<Post post={postInfo[0]} />
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
					<Comments
						forumId={this.props.match.params.forumId}
						postId={this.props.match.params.postId}
					/>
				</div>
			</section>
		);
	}
}

export default withRouter(PostPage);
