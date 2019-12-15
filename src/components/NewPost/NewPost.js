import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import apiServices from "../../services/apiServices";
import formatDate from "../../helpers/formatDate";
import "./NewPost.css";
import like from "../Icons/like";
import comment from "../Icons/comment";
import waveLoader from "../Icons/waveLoader";
//new posts component
export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      error: null
    };
  }
  //get most rest posts
  recentPosts = () => {
    return this.state.posts.map(p => {
      var forum = this.state.forum.filter(f => f.id === p.board_id);
      forum = forum[0];
      return (
        <li key={p.id} className="post-card">
          <article className="post-card-info">
            <Link
              to={`/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`}
            >
              <h4>{p.title}</h4>
            </Link>
            <Truncate
              className="post-teaser"
              lines={2}
              ellipsis={
                <span>
                  ...
                  <Link
                    to={`/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`}
                  >
                    Read more
                  </Link>
                </span>
              }
            >
              {p.content}
            </Truncate>
          </article>
          <span className="post-card-user-info">
            <p>
              Posted By:{"   "}
              {p.user_name}
            </p>
            <p>Posted On: {formatDate(p.date_posted)}</p>
            <span className="post-card-icons">
              <p>
                {like}
                {"   "}
                {p.likes}
              </p>
              <p>
                {comment}
                {"   "}
                {p.commentCount}
              </p>
            </span>
          </span>
        </li>
      );
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
    apiServices
      .getForum()
      .then(forum => this.setState({ forum: forum }))
      .then(() =>
        apiServices.getNewestPosts().then(posts => {
          if (posts.error) {
            this.setState({
              error: posts.error,
              dataLoaded: true
            });
          }
          posts.forEach(post => {
            console.log(post);
            apiServices
              .getNumOfCommentsByPostId(post.id)
              .then(num => {
                post.commentCount = num[0].count;
                this.setState({
                  posts: [...this.state.posts, post]
                });
              })
              .then(() => {
                const sorted = this.state.posts.sort((a, b) =>
                  a.date_posted > b.date_posted ? -1 : 1
                );
                this.setState({
                  posts: sorted,
                  dataLoaded: true
                });
              });
          });
        })
      );
  }

  render() {
    return (
      <div className="newPost-container">
        <header>{this.props.dashboard ? null : <h2>Newest Posts</h2>}</header>
        <div className="newPost-content">
          {this.state.dataLoaded ? (
            this.state.posts ? (
              <ul>{this.recentPosts()}</ul>
            ) : (
              <p>{this.state.error}</p>
            )
          ) : (
            <div className="forum-loader">{waveLoader}</div>
          )}
        </div>
      </div>
    );
  }
}
