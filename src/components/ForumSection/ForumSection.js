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
      postsWithCount: [],
      completePost: [],

      error: null
    };
  }

  getUserName = user_id => {
    const name = this.state.user_names.filter(user => user.id === user_id);
    return name[0].name;
  };
  getPosts = () => {
    return this.state.postsWithCount.map(p => (
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
            {p.user_name}
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
              {p.commentCount}
            </p>
          </span>
        </span>
      </li>
    ));
  };
  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "title") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
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
        postsWithCount: sorted
      });
    } else if (sort.sortType === "desc" && sort.column === "title") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
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
        postsWithCount: sorted
      });
    } else if (sort.sortType === "asc" && sort.column === "date_posted") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
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
        postsWithCount: sorted
      });
    } else if (sort.sortType === "desc" && sort.column === "date_posted") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
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
        postsWithCount: sorted
      });
    } else if (sort.sortType === "asc" && sort.column === "likes") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
        return a.likes - b.likes;
      });
      this.setState({
        postsWithCount: sorted
      });
    } else if (sort.sortType === "desc" && sort.column === "likes") {
      var sorted = this.state.postsWithCount.sort(function(a, b) {
        return b.likes - a.likes;
      });
      this.setState({
        postsWithCount: sorted
      });
    }
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
                  var newPost = post;
                  newPost.commentCount = numOfComments[0].count;
                  this.setState({
                    postsWithCount: [...this.state.postsWithCount, post]
                  });
                })
                .then(() => {
                  this.state.postsWithCount.forEach(post => {
                    apiServices.getUserName(post.user_id).then(user => {
                      var addUserToPost = post;
                      addUserToPost.user_name = user.user_name;
                      this.setState({
                        completePost: [
                          ...this.state.completePost,
                          addUserToPost
                        ]
                      });
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
        <Sort sortType="posts" handleSort={this.handleSort} />
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
