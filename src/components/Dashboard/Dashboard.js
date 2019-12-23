import React, { Component } from "react";
import "./Dashboard.css";

import ThisWeek from "../ThisWeek/ThisWeek";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import UserPosts from "../UserPosts/UserPosts";
import waveLoader from "../Icons/waveLoader";
//user dashboard
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userPosts: [],
      error: null,
      showEvents: false,
      showPosts: false
    };
  }
  //show upcoming events
  showHomePageEvents = () => {
    this.setState({
      showEvents: !this.state.showEvents
    });
  };
  //show newest posts
  showNewPosts = () => {
    this.setState({
      showPosts: !this.state.showPosts
    });
  };
  //show users posts
  showUserPosts = () => {
    this.setState({
      showUserPosts: !this.state.showUserPosts
    });
  };
  static contextType = ForumContext;
  componentDidMount() {
    window.scroll(0, 0);
    apiServices
      .getThisWeeksEvents()
      .then(events => {
        this.setState({ events: events });
      })
      .then(() => {
        apiServices.getAllUserPosts(this.context.user.id).then(posts => {
          this.setState({
            userPosts: posts,
            postsLoaded: true
          });
        });
      });
  }

  render() {
    return (
      <>
        <section className="mobile-home-page-container">
          <div className="mobile-home-page-event-content">
            <h3 onClick={this.showHomePageEvents}>
              {this.state.showEvents ? (
                <i
                  className="far fa-times-circle"
                  samesite="none"
                  secure="true"
                ></i>
              ) : (
                "Upcoming Events"
              )}
            </h3>
            <div
              className={`${
                this.state.showEvents
                  ? "mobile-home-page-events-open"
                  : "mobile-home-page-events-closed"
              }`}
            >
              {this.state.events ? (
                <ThisWeek events={this.state.events} />
              ) : (
                <p>Currently there are no events for this week.</p>
              )}
            </div>

            <div className="mobile-home-page-user-post-content"></div>

            <h3 onClick={this.showUserPosts}>
              {this.state.showUserPosts ? (
                <i
                  className="far fa-times-circle"
                  samesite="none"
                  secure="true"
                ></i>
              ) : (
                "Your Posts"
              )}
            </h3>
            <div
              className={`${
                this.state.showUserPosts
                  ? "mobile-home-page-user-posts-open"
                  : "mobile-home-page-user-posts-closed"
              }`}
            >
              {this.state.postsLoaded ? (
                <ul>
                  <UserPosts posts={this.state.userPosts} />
                </ul>
              ) : (
                waveLoader
              )}
            </div>
          </div>
        </section>
        <div className="home-page-container">
          <div className="home-page-content">
            <section id="home-page-upcoming-events">
              <h3>Upcoming Events</h3>
              {this.state.events.length > 0 ? (
                <ThisWeek events={this.state.events} />
              ) : (
                <p>Currently there are no events for this week.</p>
              )}
            </section>
            <section className="dashboard-home-user-posts">
              <h3>Your Posts</h3>
              {this.state.userPosts.length > 0 ? (
                <ul>
                  <UserPosts posts={this.state.userPosts} />
                </ul>
              ) : (
                <p>No posts yest</p>
              )}
            </section>
          </div>
        </div>
      </>
    );
  }
}
