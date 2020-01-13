import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import TokenServices from "../../services/TokenServices";
import formatDate from "../../helpers/formatDate";
import comment from "../Icons/comment";
import like from "../Icons/like";
import "./ForumSection.css";
import ToolBar from "../ToolBar/ToolBar";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
import MakePostCard from "../MakePostCards/MakePostCards";
//forum board
export default class ForumSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: this.props.match.params.board_id,
      boardName: "",
      posts: [],
      postsWithCount: [],
      completePost: [],
      currentPosts: [],

      error: null
    };
  }

  //handle sort
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
    //get all the board info and post info
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
                error: posts.error,
                dataLoaded: true
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
                    postsWithCount: [...this.state.postsWithCount, newPost]
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
                        ],
                        dataLoaded: true
                      });
                    });
                  });
                });
            });
          });
      });
  }
  handleCurrentPosts = currentPosts => {
    this.setState({
      currentPosts: currentPosts
    });
  };
  render() {
    const { posts, currentPosts, postsWithCount,boardName, dataLoaded } = this.state;

    return !dataLoaded ? null : (
      <section className="forum-section-container">
        <header>
          <h3 className="forum-title">{boardName}</h3>
          <ToolBar
            currentPosts={currentPosts}
            posts={posts}
            handleCurrentPosts={this.handleCurrentPosts}
            handleSort={this.handleSort}
          />
        </header>

        <div className="forum-section-content">
          {dataLoaded ? (
            postsWithCount.length > 0 ? (
              <ul>
                <MakePostCard
                  posts={currentPosts}
                  boardName={boardName}
                />
              </ul>
            ) : TokenServices.getAuthToken() ? (
              <p className="error-message">
                {this.state.error} Be the first one!
              </p>
            ) : (
              <p className="error-message">
                {this.state.error} <Link to={"/signup"}>Create a account</Link>{" "}
                or <Link to={"/login"}>Log in</Link> and be the first one!
              </p>
            )
          ) : (
            <div className="forum-loader">{waveLoader}</div>
          )}
        </div>
      </section>
    );
  }
}
