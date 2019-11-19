import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PostForm from "./PostForm";
import ShowPostPreview from "./ShowPostPreview";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
import "./CreatePost.css";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      board_id: 1,
      user_id: null,
      content: "",
      date_posted: new Date().toISOString(),
      showPreview: false,
      redirectToPost: false
    };
  }
  static contextType = ForumContext;
  resetState = () => {
    this.setState({
      title: "",
      board_id: "",
      content: "",
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
    this.setState({
      board_id: e.target.value
    });
    apiServices.getForumNameById(e.target.value).then(title => {
      this.setState({
        board_title: title
      });
    });

    apiServices
      .getBoardById(e.target.value)
      .then(board => {
        this.setState({
          board: board
        });
      })
      .then(() => {
        apiServices.getFourmSectionTitles().then(sections => {
          const forumCat = sections.filter(
            sec => sec.id === this.state.board.messageboard_section
          );
          this.setState({
            forumCat: forumCat[0].id
          });
        });
      });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  handleShowPreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  };
  handleSubmit = e => {
    var { board_id } = this.state;
    board_id = parseInt(board_id);
    const { user_id, title, content, date_posted } = this.state;
    const newPost = { board_id, user_id, title, content, date_posted };
    apiServices.createPost(newPost).then(() => {
      this.setState({
        redirectToPost: true
      });
    });
  };
  componentDidMount() {
    this.setState({
      user_id: this.context.user.id
    });
  }

  render() {
    if (this.state.redirectToPost) {
      const { board_id } = this.state;
      return (
        <Redirect to={`/messageBoard/${this.state.forumCat}/${board_id}`} />
      );
    }

    return (
      <section className="create-post-container">
        <div className="create-post-content">
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
