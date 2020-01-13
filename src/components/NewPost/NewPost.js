import React, { Component } from "react";
import apiServices from "../../services/apiServices";

import "./NewPost.css";
import waveLoader from "../Icons/waveLoader";

import MakePostCards from "../MakePostCards/MakePostCards";
import ToolBar from "../ToolBar/ToolBar";

//new posts component
export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPosts: [],
      dataLoaded: false,
      error: null
    };
  }

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
    if (sort.sortType === "desc" && sort.column === "likes") {
      const sorted = this.state.posts.sort(function(a, b) {
        return b.likes - a.likes;
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
                if (sorted.length === posts.length) {
                  this.setState({
                    posts: sorted,
                    currentPosts: sorted,
                    dataLoaded: true
                  });
                }
              });
          });
        })
      );
  }
  handleCurrentPosts = currentPosts => {
    this.setState({
      currentPosts: currentPosts
    });
  };
  render() {
    const { posts, currentPosts, dataLoaded } = this.state;

    return dataLoaded ? (
      <section className="newPost-container">
        <header>
          {this.props.dashboard ? null : <h2>Newest Posts</h2>}{" "}
          <ToolBar
            currentPosts={currentPosts}
            posts={posts}
            handleCurrentPosts={this.handleCurrentPosts}
            handleSort={this.handleSort}
          />
        </header>
        <div className="newPost-content">
          <p>{this.state.error}</p>
          <ul>
            <MakePostCards posts={currentPosts} forum={this.state.forum} />
          </ul>
        </div>
      </section>
    ) : (
      <span>{waveLoader}</span>
    );
  }
}
