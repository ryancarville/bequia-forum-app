import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserPosts.css";
import apiServices from "../../services/apiServices";
import like from "../Icons/like";
import comment from "../Icons/comment";
import waveLoader from "../Icons/waveLoader";
export default class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: this.props.posts,
      mbPosts: [],
      mpPosts: [],
      rPosts: [],
      jPosts: []
    };
  }
  divideResponsePosts = () => {
    const { allPosts } = this.state;
    allPosts.forEach(posts => {
      if (posts.mbPosts) {
        apiServices
          .getFourm()
          .then(boards => {
            this.setState({
              messageBoards: boards
            });
          })
          .then(() => {
            posts.mbPosts.forEach(post => {
              apiServices.getNumOfCommentsByPostId(post.id).then(num => {
                const forumTitle = this.state.messageBoards.filter(
                  board => post.board_id === board.id
                );

                post.numComments = num[0].count;
                post.messageboard_section = forumTitle[0].messageboard_section;
                this.setState({
                  mbPosts: [...this.state.mbPosts, post],
                  dataLoaded: true
                });
              });
            });
          });
      }
      if (posts.mpPosts) {
        this.setState({
          mpPosts: posts.mpPosts
        });
      }
      if (posts.rPosts) {
        this.setState({
          rPosts: posts.rPosts
        });
      }
      if (posts.jPosts) {
        this.setState({
          jPosts: posts.jPosts
        });
      }
    });
  };
  makeMbPosts = () => {
    const { mbPosts } = this.state;

    return mbPosts.map(p => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/messageBoard/${p.messageboard_section}/${p.board_id}/${p.id}`}
      >
        {p.title}{" "}
        <span>
          {like} {p.likes}
          {comment} {p.numComments}
        </span>
      </Link>
    ));
  };
  makeMpPosts = () => {
    const { mpPosts } = this.state;
    return mpPosts.map(p => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/marketPlace/${p.market_place_cat}/${p.id}`}
      >
        <li>{p.title}</li>
      </Link>
    ));
  };
  makerPosts = () => {
    const { rPosts } = this.state;
    return rPosts.map(p => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/rentals/${p.rental_cat}/${p.id}`}
      >
        <li>{p.title}</li>
      </Link>
    ));
  };
  makejPosts = () => {
    const { jPosts } = this.state;
    return jPosts.map(p => (
      <Link
        key={p.id}
        className="dashboard-user-post-card-item"
        to={`/jobs/${p.job_cat}/${p.id}`}
      >
        <li>{p.title}</li>
      </Link>
    ));
  };

  componentDidMount() {
    this.divideResponsePosts();
  }

  render() {
    return (
      <div>
        {this.state.dataLoaded
          ? this.state.mbPosts.length > 0
            ? this.makeMbPosts()
            : null(this.state.mpPosts.length > 0)
            ? this.makeMpPosts()
            : null(this.state.rPosts.length > 0)
            ? this.makerPosts()
            : null(this.state.jPosts.length > 0)
            ? this.makejPosts()
            : null
          : waveLoader}
      </div>
    );
  }
}
