import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./UserPosts.css";
import apiServices from "../../services/apiServices";

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
    console.log(this.state.allPosts);
    const { allPosts } = this.state;
    allPosts.forEach(posts => {
      if (posts.mbPosts) {
        apiServices
          .getFourm()
          .then(boards => {
            console.log(boards);
            this.setState({
              messageBoards: boards
            });
          })
          .then(() => {
            posts.mbPosts.forEach(post => {
              const forumTitle = this.state.messageBoards.filter(
                board => post.board_id === board.id
              );
              post.messageboard_section = forumTitle[0].messageboard_section;
              this.setState({
                mbPosts: [...this.state.mbPosts, post]
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
      <li key={p.id} className="dashboard-user-post-card-item">
        <Link
          to={`/messageBoard/${p.messageboard_section}/${p.board_id}/${p.id}`}
        >
          {p.title}
        </Link>
      </li>
    ));
  };
  makeMpPosts = () => {
    const { mpPosts } = this.state;
    console.log(mpPosts);
    return mpPosts.map(p => (
      <li key={p.id} className="dashboard-user-post-card-item">
        <Link to={`/marketPlace/${p.market_place_cat}/${p.id}`}>{p.title}</Link>
      </li>
    ));
  };
  makerPosts = () => {
    const { rPosts } = this.state;
    console.log(rPosts);
    return rPosts.map(p => (
      <li key={p.id} className="dashboard-user-post-card-item">
        <Link to={`/rentals/${p.rental_cat}/${p.id}`}>{p.title}</Link>
      </li>
    ));
  };
  makejPosts = () => {
    const { jPosts } = this.state;
    console.log(jPosts);
    return jPosts.map(p => (
      <li key={p.id} className="dashboard-user-post-card-item">
        <Link to={`/jobs/${p.job_cat}/${p.id}`}>{p.title}</Link>
      </li>
    ));
  };

  componentDidMount() {
    this.divideResponsePosts();
  }

  render() {
    return (
      <div>
        {this.state.mbPosts ? this.makeMbPosts() : null}
        {this.state.mpPosts ? this.makeMpPosts() : null}
        {this.state.rPosts ? this.makerPosts() : null}
        {this.state.jPosts ? this.makejPosts() : null}
      </div>
    );
  }
}
