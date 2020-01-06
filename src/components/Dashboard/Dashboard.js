import React, { Component } from "react";
import "./Dashboard.css";
import UserEvents from "../UserEvents/UserEvents";
import ThisWeek from "../ThisWeek/ThisWeek";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import UserPosts from "../UserPosts/UserPosts";
import Weather from "../Weather/Weather";
import waveLoader from "../Icons/waveLoader";
//user dashboard
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userPosts: [],
      userEvents: [],
      error: null,
      postsLoaded: false,
      eventsLoaded: false,
      showUpcomingEvents: true,
      showUserEvents: true,
      showUserPosts: true,
      showWeather: true
    };
  }
  //show upcoming events
  showHomePageEvents = () => {
    this.setState({
      showEvents: !this.state.showEvents
    });
  };
  //show weather
  showWeather = () => {
    this.setState({
      showWeather: !this.state.showWeather
    });
  };
  //show users posts
  showUserPosts = () => {
    this.setState({
      showUserPosts: !this.state.showUserPosts
    });
  };
  showUserEvents = () => {
    this.setState({
      showUserEvents: !this.state.showUserEvents
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
      })
      .then(() => {
        apiServices.getAllEventsByUserId(this.context.user.id).then(events => {
          if (events.error) {
            this.setState({
              eventsError: events.error
            });
          }
          this.setState({
            userEvents: events,
            eventsLoaded: true
          });
        });
      });
  }
  //desktop page views
  handleDashView = path => {
    if (path === "upcomingEvents") {
      this.setState({
        showUpcomingEvents: true,
        showUserEvents: false,
        showUserPosts: false,
        showWeather: false
      });
    }
    if (path === "userEvents") {
      this.setState({
        showUpcomingEvents: false,
        showUserEvents: true,
        showUserPosts: false,
        showWeather: false
      });
    }
    if (path === "userPosts") {
      this.setState({
        showUpcomingEvents: false,
        showUserEvents: false,
        showUserPosts: true,
        showWeather: false
      });
    }
    if (path === "weather") {
      this.setState({
        showUpcomingEvents: false,
        showUserEvents: false,
        showUserPosts: false,
        showWeather: true
      });
    }
    if (path === "dash") {
      this.setState({
        showUpcomingEvents: true,
        showUserEvents: true,
        showUserPosts: true,
        showWeather: true
      });
    }
  };
  render() {
    return (
      <>
        <section className="mobile-home-page-container">
          <div className="mobile-home-page-weather-content">
            <h3 onClick={this.showWeather}>
              {this.state.showWeather ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Weather"
              )}
            </h3>
            <div
              className={`${
                this.state.showWeather
                  ? "mobile-home-page-weather-open"
                  : "mobile-home-page-weather-closed"
              }`}
            ></div>
          </div>
          <div className="mobile-home-page-event-content">
            <h3 onClick={this.showHomePageEvents}>
              {this.state.showEvents ? (
                <i className="far fa-times-circle"></i>
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
              {this.state.events.length > 0 ? (
                <ThisWeek events={this.state.events} />
              ) : (
                <p>Currently there are no events for this week.</p>
              )}
            </div>
          </div>
          <div className="mobile-home-page-user-post-content">
            <h3 onClick={this.showUserPosts}>
              {this.state.showUserPosts ? (
                <i className="far fa-times-circle"></i>
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
          <div className="mobile-home-page-user-events-content">
            <h3 onClick={this.showUserEvents}>
              {this.state.showUserEvents ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Your Events"
              )}
            </h3>
            <div
              className={`${
                this.state.showUserEvents
                  ? "mobile-home-page-user-events-open"
                  : "mobile-home-page-user-events-closed"
              }`}
            >
              {this.state.eventsLoaded ? (
                <ul>
                  <UserEvents events={this.state.userEvents} />
                </ul>
              ) : (
                waveLoader
              )}
            </div>
          </div>
        </section>
        <section className="home-page-container">
          <nav className="home-page-nav">
            <ul>
              <li onClick={() => this.handleDashView("dash")}>HOME</li>
              <li onClick={() => this.handleDashView("upcomingEvents")}>
                <i className="fas fa-glass-cheers"></i> Upcoming Events
              </li>
              <li onClick={() => this.handleDashView("weather")}>
                <i className="fas fa-cloud-sun"></i> Weather
              </li>
              <li onClick={() => this.handleDashView("userPosts")}>
                <i className="far fa-sticky-note"></i> Your Posts
              </li>
              <li onClick={() => this.handleDashView("userEvents")}>
                <i className="far fa-calendar-alt"></i> Your Events
              </li>
            </ul>
          </nav>
          <div className="home-page-content">
            {this.state.showWeather ? (
              <section id="home-page-weather-wrapper">
                <h3>Current Weather</h3>
                <Weather />
              </section>
            ) : null}
            {this.state.showUpcomingEvents ? (
              <section id="home-page-upcoming-events">
                <h3>Upcoming Events</h3>
                {this.state.events.length > 0 ? (
                  <ThisWeek events={this.state.events} />
                ) : (
                  <p>Currently there are no events for this week.</p>
                )}
              </section>
            ) : null}
            {this.state.showUserPosts ? (
              <section className="dashboard-home-user-posts">
                <h3>Your Posts</h3>
                {this.state.userPosts.length > 0 ? (
                  <article className="dashboard-scroll-content">
                    <ul>
                      <UserPosts posts={this.state.userPosts} />
                    </ul>
                  </article>
                ) : (
                  <p>No posts yest</p>
                )}
              </section>
            ) : null}
            {this.state.showUserEvents ? (
              <section className="dashboard-home-user-events">
                <h3>Your Events</h3>
                {this.state.userEvents.length > 0 ? (
                  <article className="dashboard-scroll-content">
                    <ul>
                      <UserEvents events={this.state.userEvents} />
                    </ul>
                  </article>
                ) : (
                  <p>{this.state.eventsError}</p>
                )}
              </section>
            ) : null}
          </div>
        </section>
      </>
    );
  }
}
