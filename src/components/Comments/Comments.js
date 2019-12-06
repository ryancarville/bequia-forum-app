import React, { Component } from "react";
import "./Comments.css";
import ForumContext from "../../ForumContext";
import TokenServices from "../../services/TokenServices";

import formatDate from "../../helpers/formatDate";
import DeleteButton from "../Buttons/deleteButton";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import apiServices from "../../services/apiServices";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      commentUsers: [],
      showDeletePopUp: false,
      commentDeleted: false,
      dataLoaded: false
    };
  }
  static contextType = ForumContext;
  //display or hide delete confirmation box
  showDeletePopUp = id => {
    console.log(id);
    this.setState({
      id: id,
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //get user name for owner of comment
  getUserName = id => {
    const user_name = this.state.commentUsers.filter(
      comment => comment.comment_id === id
    );
    return user_name[0].user_name;
  };
  //make all the comments for the post
  makeComments = () => {
    return this.state.comments.map(c => (
      <article className="comments-content" key={c.id}>
        <p>{c.content}</p>
        <h5>
          Posted By:
          {this.state.commentUsers.length === this.state.comments.length
            ? this.getUserName(c.id)
            : "loading..."}
        </h5>
        <h5> Posted on: {formatDate(c.date_posted)}</h5>

        {TokenServices.getAuthToken() ? (
          this.context.user.id === c.user_id ? (
            <DeleteButton showDeletePopUp={this.showDeletePopUp} id={c.id} />
          ) : null
        ) : null}
      </article>
    ));
  };

  componentDidMount() {
    //get all info for each comment
    this.state.comments.forEach(comment => {
      apiServices.getUserName(comment.user_id).then(userName => {
        const commentUser = {
          comment_id: comment.id,
          user_name: userName.user_name
        };
        this.setState({
          commentUsers: [...this.state.commentUsers, commentUser],
          dataLoaded: true
        });
      });
    });
  }

  render() {
    return this.state.showDeletePopUp ? (
      <DeletePopUp
        comment={true}
        handleDelete={() => this.props.handleCommentDelete(this.state.id)}
        showDeletePopUp={this.showDeletePopUp}
        id={this.state.id}
      />
    ) : this.state.comments ? (
      this.makeComments()
    ) : (
      <p>Loading...</p>
    );
  }
}
