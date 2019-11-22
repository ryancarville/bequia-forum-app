import React, { Component } from "react";
import "./Dashboard.css";
import NewPost from "../NewPost/NewPost";
import ThisWeek from "../ThisWeek/ThisWeek";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import UserPosts from "../UserPosts/UserPosts";
import waveLoader from "../Icons/waveLoader";
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

  showHomePageEvents = () => {
    this.setState({
      showEvents: !this.state.showEvents
    });
  };
  showNewPosts = () => {
    this.setState({
      showPosts: !this.state.showPosts
    });
  };
  static contextType = ForumContext;
  componentDidMount() {
    apiServices
      .getThisWeeksEvents()
      .then(events => {
        this.setState({ events: events });
      })
      .then(() => {
        apiServices.getAllUserPosts(this.context.user.id).then(posts => {
          this.setState({
            userPosts: posts
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
                <i class="far fa-times-circle" samesite="none"></i>
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
            <div className="mobile-home-page-new-post-content"></div>

            <h3 onClick={this.showNewPosts}>
              {this.state.showPosts ? (
                <i class="far fa-times-circle" samesite="none"></i>
              ) : (
                "New Posts"
              )}
            </h3>
            <div
              className={`${
                this.state.showPosts
                  ? "mobile-home-page-new-posts-open"
                  : "mobile-home-page-new-posts-closed"
              }`}
            >
              <NewPost />
            </div>
          </div>
        </section>
        <div className="home-page-container">
          <div className="home-page-content">
            <section id="home-page-newest-post">
              <h3>New Posts</h3>
              <NewPost dashboard={true} />
            </section>
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
                waveLoader
              )}
            </section>
          </div>
        </div>
      </>
    );
  }
}
