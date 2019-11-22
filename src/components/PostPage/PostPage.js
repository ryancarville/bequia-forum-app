import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "./PostPage.css";
import Post from "../Post/Post";
import ForumContext from "../../ForumContext";
import AddComment from "../AddComment/AddComment";
import EditPost from "../EditPost/EditPost";
import Comments from "../Comments/Comments";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import LikeButtons from "./likeButton";
import CommentButton from "./commentButton";
import EditButtons from "./editButtons";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.postId,
      user_id: "",
      board_id: "",
      title: "",
      content: "",
      user_name: "",
      date_posted: "",
      likes: "",
      numOfComments: "",
      comments: [],
      didLike: false,
      dataLoaded: false,
      hideEditButtons: false,
      redirectToForum: false
    };
  }
  static contextType = ForumContext;
  //post like handlers
  handlePostLike = () => {
    const post_id = this.state.id;
    const user_id = this.context.user.id;
    const info = { post_id, user_id };
    if (this.state.didLike) {
      apiServices.minusLike(post_id).then(res => {
        this.setState({
          likes: res.likes,
          didLike: false
        });
        apiServices.deleteFromLikesTracker(info);
      });
    }
    if (!this.state.didLike) {
      apiServices.addLike(post_id).then(res => {
        this.setState({
          likes: res.likes,
          didLike: true
        });
        apiServices.addToLikesTracker(info);
      });
    }
  };

  //post edit handlers
  showPostEdit = () => {
    this.setState({
      hideEditButtons: !this.state.hideEditButtons,
      showPostEdit: !this.state.showPostEdit
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
  handleEditSubmit = e => {
    e.preventDefault();
    const { id, title, content } = this.state;
    const postToUpdate = { id, title, content };
    apiServices.editPost(postToUpdate).then(() => {
      this.setState({
        showPostEdit: !this.state.showPostEdit,
        hideEditButtons: !this.state.hideEditButtons
      });
    });
  };
  //post delete handlers
  showDeletePopUp = () => {
    this.setState({
      hideEditButtons: !this.state.hideEditButtons,
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  handlePostDelete = () => {
    const { id } = this.state;
    apiServices.deletePost(id).then(() => {
      this.setState({
        redirectToForum: !this.state.redirectToForum
      });
    });
  };
  //comment handlers
  showAddComment = () => {
    this.setState({
      showAddComment: !this.state.showAddComment
    });
  };
  updateComments = () => {
    const { id } = this.state;

    apiServices
      .getNumOfCommentsByPostId(id)
      .then(numOfComments => {
        this.setState({
          numOfComments: numOfComments[0].count
        });
      })
      .then(() => {
        apiServices.getCommentsByPostId(id).then(comments => {
          this.setState({
            comments: []
          });
          this.setState({
            comments: comments
          });
        });
      });
  };
  handleCommentDelete = id => {
    console.log(id);
    apiServices.deleteComment(id).then(() => this.updateComments());
  };
  //API calls for post by id, comments for post and num of comments for post

  componentDidMount() {
    const { id } = this.state;
    this.context.verifyLoginOnReload();
    apiServices
      .getPostById(id)
      .then(post => {
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
      })
      .then(() => {
        apiServices.getUserName(this.state.user_id).then(user => {
          this.setState({
            user_name: user.user_name
          });
        });
      })
      .then(() => {
        apiServices
          .getNumOfCommentsByPostId(id)
          .then(numOfComments => {
            this.setState({
              numOfComments: numOfComments[0].count,
              dataLoaded: true
            });
          })
          .then(() => {
            apiServices
              .getCommentsByPostId(id)
              .then(comments => {
                this.setState({
                  comments: comments
                });
              })
              .then(() => {
                if (this.context.loggedIn) {
                  this.setState({
                    loggedIn: true
                  });
                } else {
                  this.setState({
                    loggedIn: false
                  });
                }
              });
          });
      });

    const user_id = this.context.user.id;
    const post_id = this.state.id;
    const likeInfo = { user_id, post_id };
    if (user_id !== null) {
      apiServices.getLikesTracker(likeInfo).then(res => {
        if (res.length !== 0) {
          this.setState({
            didLike: true
          });
        }
      });
    }
  }

  render() {
    if (this.state.redirectToForum) {
      const { board_id } = this.state;
      return <Redirect to={`/messageBoard/${board_id}`} />;
    }
    return (
      <section className="post-container">
        <div className="post-content">
          <ForumContext.Consumer>
            {context =>
              this.state.loggedIn ? (
                context.user.id === this.state.user_id ? (
                  !this.state.hideEditButtons ? (
                    <EditButtons
                      showPostEdit={this.showPostEdit}
                      showDeletePopUp={this.showDeletePopUp}
                    />
                  ) : null
                ) : null
              ) : null
            }
          </ForumContext.Consumer>
          {this.state.showDeletePopUp ? (
            <DeletePopUp
              showDeletePopUp={this.showDeletePopUp}
              postTitle={this.state.title}
              handleDelete={this.handlePostDelete}
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
          ) : this.state.dataLoaded ? (
            <Post post={this.state} numOfComments={this.state.numOfComments} />
          ) : (
            <div className="forum-loader">{waveLoader}</div>
          )}
          {this.state.loggedIn ? (
            <span className="comment-like-button-container">
              <LikeButtons
                didLike={this.state.didLike}
                handleLike={this.handlePostLike}
              />
              <CommentButton handleComment={this.showAddComment} />
            </span>
          ) : null}
          {this.state.showAddComment ? (
            <AddComment
              post_id={this.state.id}
              updateComments={this.updateComments}
              closeAddComment={this.showAddComment}
            />
          ) : null}
          {this.state.comments.length !== 0 ? (
            <Comments
              comments={this.state.comments}
              handleCommentDelete={this.handleCommentDelete}
            />
          ) : null}
        </div>
      </section>
    );
  }
}

export default withRouter(PostPage);
