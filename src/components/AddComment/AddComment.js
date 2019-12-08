import React, { Component } from "react";
import ForumContext from "../../ForumContext";
import "./AddComment.css";
import apiServices from "../../services/apiServices";
//add comment to a post
export default class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: this.props.post_id,
      user_id: null,
      content: "",
      date_posted: new Date().toISOString().slice(0, 10),
      posted: false
    };
  }
  //resets comment form
  resetForm = () => {
    this.setState({
      content: ""
    });
  };
  //set users comment in component state on user input
  handleComment = e => {
    this.setState({
      content: e.target.value
    });
  };
  //handle comment submit
  handleCommentSubmit = e => {
    e.preventDefault();
    var { post_id } = this.state;
    post_id = parseInt(post_id, 10);
    const { user_id, content, date_posted } = this.state;
    const newComment = { user_id, content, date_posted, post_id };
    apiServices
      .addComment(newComment)
      .then(() => {
        this.props.updateComments();
      })
      .then(() => {
        this.setState({
          posted: true
        });
      });
  };
  static contextType = ForumContext;
  componentDidMount() {
    const box = document.getElementById("add-comment");
    box.scrollIntoView();
    this.setState({
      //set logged in user id
      user_id: this.context.user.id
    });
  }
  render() {
    return (
      <>
        {this.state.posted ? this.props.closeAddComment() : null}
        <section className="add-comment-container">
          <form onSubmit={this.handleCommentSubmit}>
            <textarea
              name="addComment"
              id="add-comment"
              value={this.state.content}
              placeholder="Enter comment here..."
              autoFocus
              required
              onChange={this.handleComment}
            />
            <span>
              <button type="submit">Post</button>
              <button type="reset" onClick={this.resetForm}>
                Clear Comment
              </button>
              <button type="button" onClick={this.props.closeAddComment}>
                Cancel
              </button>
            </span>
          </form>
        </section>
      </>
    );
  }
}
