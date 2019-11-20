import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import TokenServices from "../../services/TokenServices";
import formatDate from "../../helpers/formatDate";
import comment from "../Icons/comment";
import like from "../Icons/like";
import "./ForumSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";

export default class ForumSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: this.props.match.params.board_id,
      boardName: "",
      posts: [],
      numOfComments: [],
      user_names: [],
      error: null
    };
  }
  getCommentCount = id => {
    const num = this.state.numOfComments.filter(post => post.post_id === id);
    return num[0].count;
  };
  getUserName = user_id => {
    const name = this.state.user_names.filter(user => user.id === user_id);
    return name[0].name;
  };
  getPosts = () => {
    return this.state.posts.map(p => (
      <li key={p.id}>
        <Link
          to={`/messageBoard/${this.props.match.params.forum_cat}/${p.board_id}/${p.id}`}
        >
          <h4>{p.title}</h4>
        </Link>
        <br />
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...
              <Link
                to={{
                  pathname: `/messageBoard/${this.props.match.params.forum_cat}/${p.board_id}/${p.id}`,
                  state: { id: p.id }
                }}
              >
                Read more
              </Link>
            </span>
          }
        >
          <article>{p.content}</article>
        </Truncate>
        <span className="post-info">
          <p>
            Posted By:{"   "}
            {this.state.user_names.length === this.state.posts.length
              ? this.getUserName(p.user_id)
              : "Loading..."}
          </p>
          <p>Posted On: {formatDate(p.date_posted)}</p>
          <span className="post-icons">
            <p>
              {like}
              {"   "}
              {p.likes}
            </p>
            <p>
              {comment}
              {"   "}
              {this.state.numOfComments.length === this.state.posts.length
                ? this.getCommentCount(p.id)
                : "counting..."}
            </p>
          </span>
        </span>
      </li>
    ));
  };
  componentDidMount() {
    apiServices
      .getForumNameById(this.state.boardId)
      .then(boardName => {
        this.setState({ boardName: boardName.name });
      })
      .then(() => {
        apiServices
          .getPostsByBoardId(this.state.boardId)
          .then(posts => {
            if (posts.error) {
              this.setState({
                error: posts.error
              });
            } else {
              this.setState({
                posts: posts
              });
            }
          })
          .then(() => {
            this.state.posts.forEach(post => {
              apiServices
                .getNumOfCommentsByPostId(post.id)
                .then(numOfComments => {
                  const count = {
                    post_id: post.id,
                    count: numOfComments[0].count
                  };
                  this.setState({
                    numOfComments: [...this.state.numOfComments, count]
                  });
                })
                .then(() => {
                  apiServices.getUserName(post.user_id).then(user => {
                    const newName = { id: post.user_id, name: user.user_name };

                    this.setState({
                      user_names: [...this.state.user_names, newName]
                    });
                  });
                });
            });
          });
      });
  }

  render() {
    return (
      <section className="forum-section-container">
        <header>
          <h3 className="forum-title">{this.state.boardName}</h3>
        </header>
        <Sort sortType="posts" />
        <div className="forum-section-content">
          {this.state.posts.length !== 0 ? (
            <ul>{this.getPosts()}</ul>
          ) : TokenServices.getAuthToken() ? (
            <p>
              There are currently no posts in this section. Be the first one!
            </p>
          ) : (
            <p>
              There are currently no posts in this section.{" "}
              <Link to={"/signup"}>Create a account</Link> or{" "}
              <Link to={"/login"}>Log in</Link> and be the first one!
            </p>
          )}
        </div>
      </section>
    );
  }
}
