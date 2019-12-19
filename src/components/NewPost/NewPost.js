import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import apiServices from "../../services/apiServices";
import formatDate from "../../helpers/formatDate";
import Sort from "../Sort/Sort";
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

  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "title") {
      const sorted = this.state.posts.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "title") {
      const sorted = this.state.posts.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "date_posted") {
      const sorted = this.state.posts.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "date_posted") {
      const sorted = this.state.posts.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "likes") {
      const sorted = this.state.posts.sort(function(a, b) {
        return a.likes - b.likes;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "likes") {
      const sorted = this.state.posts.sort(function(a, b) {
        return b.likes - a.likes;
      });
      this.setState({
        posts: sorted
      });
      return;
    }
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
    return this.state.dataLoaded ? (
      <div className="newPost-container">
        <header>
          {this.props.dashboard ? null : <h2>Newest Posts</h2>}{" "}
          <Sort sortType="posts" handleSort={this.handleSort} />
        </header>
        <div className="newPost-content">
          <ul>{this.recentPosts()}</ul>
          <p>{this.state.error}</p>)
        </div>
      </div>
    ) : (
      <span>{waveLoader}</span>
    );
  }
}
