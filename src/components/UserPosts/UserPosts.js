import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserPosts.css";
import apiServices from "../../services/apiServices";
import like from "../Icons/like";
import comment from "../Icons/comment";
import waveLoader from "../Icons/waveLoader";
//logged in users posts
export default class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: this.props.posts,
      mbPosts: [],
      mpPosts: [],
      rPosts: [],
      jPosts: [],
      messageBoards: [],
      sectionsLoaded: 0,
      dataLoaded: false,
    };
  }
  //divide posts into forum sections
  divideResponsePosts = () => {
    const { allPosts } = this.state;
    let i = 0;
    allPosts.forEach((sec) => {
      i++;

      if (sec.mpPosts) {
        return this.setState({
          mpPosts: sec.mpPosts,
        });
      }
      if (sec.jPosts) {
        return this.setState({
          jPosts: sec.jPosts,
        });
      }
      if (sec.rPosts) {
        return this.setState({
          rPosts: sec.rPosts,
        });
      }
      if (sec.mbPosts) {
        return apiServices
          .getForum()
          .then((boards) => {
            this.setState({
              messageBoards: boards,
            });
          })
          .then(() => {
            sec.mbPosts.forEach((post) => {
              const forumTitle = this.state.messageBoards.filter(
                (board) => post.board_id === board.id
              );
              apiServices.getNumOfCommentsByPostId(post.id).then((num) => {
                post.numComments = num[0].count;
                post.messageboard_section = forumTitle[0].messageboard_section;
                this.setState({
                  mbPosts: [...this.state.mbPosts, post],
                });
              });
            });
          });
      }
    });
    if (i === allPosts.length) {
      this.setState({
        dataLoaded: true,
      });
    }
  };
  //makes a message board posts
  makeMbPosts = () => {
    const { mbPosts } = this.state;
    return mbPosts.map((p) => (
      <li key={p.id}>
        <Link
          key={p.id}
          className="dashboard-user-post-card-item"
          to={`/messageBoard/${p.messageboard_section}/${p.board_id}/${p.id}`}
        >
          <div>
            <h4>{p.title}</h4>
            <article className="dash-post-teaser"></article>
          </div>
          <aside className="post-stats-wrapper">
            <span>
              {like} {p.likes}
              {comment} {p.numComments}
            </span>
          </aside>
        </Link>
      </li>
    ));
  };
  //makes all market place posts
  makeMpPosts = () => {
    const { mpPosts } = this.state;
    return mpPosts.map((p) => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/marketPlace/${p.market_place_cat}/${p.id}`}
      >
        <li key={p.id}>{p.title}</li>
      </Link>
    ));
  };
  //makes all rental posts
  makeRPosts = () => {
    const { rPosts } = this.state;
    return rPosts.map((p) => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/rentals/${p.rental_cat}/${p.id}`}
      >
        <li key={p.id}>{p.title}</li>
      </Link>
    ));
  };
  //make all job posts
  makeJPosts = () => {
    const { jPosts } = this.state;
    return jPosts.map((p) => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/jobs/${p.job_cat}/${p.id}`}
      >
        <li key={p.id}>{p.title}</li>
      </Link>
    ));
  };

  componentDidMount() {
    this.divideResponsePosts();
  }

  render() {
    return this.state.dataLoaded ? (
      <>
        {this.state.mbPosts.length > 0 ? (
          <div>
            <h3>Messageboards</h3>
            <ul>{this.makeMbPosts()}</ul>
          </div>
        ) : null}
        {this.state.mpPosts.length > 0 ? (
          <div>
            <h3>Marketplace</h3>
            <ul>{this.makeMpPosts()}</ul>
          </div>
        ) : null}
        {this.state.rPosts.length > 0 ? (
          <div>
            <h3>Rentals</h3>
            <ul>{this.makeRPosts()}</ul>
          </div>
        ) : null}
        {this.state.jPosts.length > 0 ? (
          <div>
            <h3>Jobs</h3>
            <ul>{this.makeJPosts()}</ul>
          </div>
        ) : null}
      </>
    ) : (
      waveLoader
    );
  }
}
