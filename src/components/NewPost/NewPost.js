import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import apiServices from "../../services/apiServices";
import formatDate from "../../helpers/formatDate";
import "./NewPost.css";
import like from "../Icons/like";
import comment from "../Icons/comment";

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      commentCount: [],
      error: null
    };
  }
  recentPosts = () => {
    return this.state.posts.map(p => {
      var forum = this.state.forum.filter(f => f.id === p.board_id);
      const numOfComments = this.state.commentCount.filter(
        count => count.post_id === p.id
      );

      forum = forum[0];
      return (
        <article className="newest-posts" key={p.id}>
          <Link
            to={{
              pathname: `/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`,
              state: { id: p.id }
            }}
          >
            <h4>{p.title}</h4>
          </Link>
          <Truncate
            lines={2}
            ellipsis={
              <span>
                ...
                <Link
                  to={{
                    pathname: `/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`,
                    state: { id: p.id }
                  }}
                >
                  Read more
                </Link>
              </span>
            }
          >
            {p.content}
          </Truncate>
          <span className="post-info">
            <p>Posted By: {p.user_name}</p>
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
                {numOfComments.length !== 0 ? numOfComments[0].count : null}
              </p>
            </span>
          </span>
        </article>
      );
    });
  };
  componentDidMount() {
    apiServices
      .getFourm()
      .then(forum => this.setState({ forum: forum }))
      .then(() =>
        apiServices.getNewestPosts().then(posts => {
          posts.forEach(post => {
            apiServices.getNumOfCommentsByPostId(post.id).then(num => {
              const count = { post_id: post.id, count: num[0].count };
              this.setState({
                commentCount: [...this.state.commentCount, count]
              });
            });
          });
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
      );
  }

  render() {
    return (
      <div className="newPost-container">
        <div className="newPost-content">
          {this.state.commentCount ? (
            this.recentPosts()
          ) : (
            <p>{this.state.error}</p>
          )}
        </div>
      </div>
    );
  }
}
