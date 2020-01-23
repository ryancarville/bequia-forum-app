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
      showWeather: true,
      liActive: ""
    };
    this.root = document.root;
  }

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
    console.log(this.root);
    document.documentElement.style.setProperty(
      "--dash-home-grid-cols",
      1000 + "px"
    );
    document.documentElement.style.setProperty("--dash-scroll-el", "visible");
    if (path === "upcomingEvents") {
      const tab = document.getElementById("dash-nav-events");

      console.log(tab);
      this.setState(
        {
          showUpcomingEvents: true,
          showUserEvents: false,
          showUserPosts: false,
          showWeather: false,
          liActive: "showEvents"
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "userEvents") {
      const tab = document.getElementById("dash-nav-user-events");
      this.setState(
        {
          showUpcomingEvents: false,
          showUserEvents: true,
          showUserPosts: false,
          showWeather: false,
          liActive: "showUserEvents"
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "userPosts") {
      const tab = document.getElementById("dash-nav-user-posts");
      this.setState(
        {
          showUpcomingEvents: false,
          showUserEvents: false,
          showUserPosts: true,
          showWeather: false,
          liActive: "showUserPosts"
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "weather") {
      const tab = document.getElementById("dash-nav-weather");
      this.setState(
        {
          showUpcomingEvents: false,
          showUserEvents: false,
          showUserPosts: false,
          showWeather: true,
          liActive: "showWeather"
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "dash") {
      const tab = document.getElementById("dash-nav-dash");
      document.documentElement.style.setProperty(
        "--dash-home-grid-cols",
        500 + "px"
      );
      document.documentElement.style.setProperty("--dash-scroll-el", "scroll");
      this.setState(
        {
          showUpcomingEvents: true,
          showUserEvents: true,
          showUserPosts: true,
          showWeather: true,
          liActive: "showDash"
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
  };
  render() {
    const {
      liActive,
      showWeather,
      showEvents,
      events,
      showUserPosts,
      showUserEvents,
      postsLoaded,
      userPosts,
      eventsLoaded,
      showUpcomingEvents,
      userEvents
    } = this.state;
    return (
      <>
        <section className="mobile-home-page-container">
          <div className="mobile-home-page-weather-content">
            <h3 onClick={this.showWeather}>
              {showWeather ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Weather"
              )}
            </h3>
            <div
              className={`${
                showWeather
                  ? "mobile-home-page-weather-open"
                  : "mobile-home-page-weather-closed"
              }`}
            >
              <Weather />
            </div>
          </div>
          <div className="mobile-home-page-event-content">
            <h3 onClick={this.showHomePageEvents}>
              {showEvents ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Upcoming Events"
              )}
            </h3>
            <div
              className={`${
                showEvents
                  ? "mobile-home-page-events-open"
                  : "mobile-home-page-events-closed"
              }`}
            >
              {events.length > 0 ? (
                <ThisWeek events={events} />
              ) : (
                <p>Currently there are no events for this week.</p>
              )}
            </div>
          </div>
          <div className="mobile-home-page-user-post-content">
            <h3 onClick={this.showUserPosts}>
              {showUserPosts ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Your Posts"
              )}
            </h3>
            <div
              className={`${
                showUserPosts
                  ? "mobile-home-page-user-posts-open"
                  : "mobile-home-page-user-posts-closed"
              }`}
            >
              {postsLoaded ? (
                <ul>
                  <UserPosts posts={userPosts} />
                </ul>
              ) : (
                waveLoader
              )}
            </div>
          </div>
          <div className="mobile-home-page-user-events-content">
            <h3 onClick={this.showUserEvents}>
              {showUserEvents ? (
                <i className="far fa-times-circle"></i>
              ) : (
                "Your Events"
              )}
            </h3>
            <div
              className={`${
                showUserEvents
                  ? "mobile-home-page-user-events-open"
                  : "mobile-home-page-user-events-closed"
              }`}
            >
              {eventsLoaded ? (
                <ul>
                  <UserEvents events={userEvents} />
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
              <li
                className={liActive}
                id="dash-nav-dash"
                onClick={() => this.handleDashView("dash")}
              >
                DASHBOARD
              </li>
              <li
                className={liActive}
                id="dash-nav-events"
                onClick={() => this.handleDashView("upcomingEvents")}
              >
                <i className="fas fa-glass-cheers"></i> Upcoming Events
              </li>
              <li
                className={liActive}
                id="dash-nav-weather"
                onClick={() => this.handleDashView("weather")}
              >
                <i className="fas fa-cloud-sun"></i> Weather
              </li>
              <li
                className={liActive}
                id="dash-nav-user-posts"
                onClick={() => this.handleDashView("userPosts")}
              >
                <i className="far fa-sticky-note"></i> Your Posts
              </li>
              <li
                className={liActive}
                id="dash-nav-user-events"
                onClick={() => this.handleDashView("userEvents")}
              >
                <i className="far fa-calendar-alt"></i> Your Events
              </li>
            </ul>
          </nav>
          <div className="home-page-content">
            {showWeather ? (
              <section id="home-page-weather-wrapper">
                <h3>Current Weather</h3>
                <Weather />
              </section>
            ) : null}
            {showUpcomingEvents ? (
              <section id="home-page-upcoming-events">
                <h3>Upcoming Events</h3>
                {events.length > 0 ? (
                  <ThisWeek events={this.state.events} />
                ) : (
                  <p>Currently there are no events for this week.</p>
                )}
              </section>
            ) : null}
            {showUserPosts ? (
              <section className="dashboard-home-user-posts">
                <h3>Your Posts</h3>
                {userPosts.length > 0 ? (
                  <article className="dashboard-scroll-content">
                    <ul>
                      <UserPosts posts={userPosts} />
                    </ul>
                  </article>
                ) : (
                  <p>No posts yest</p>
                )}
              </section>
            ) : null}
            {showUserEvents ? (
              <section className="dashboard-home-user-events">
                <h3>Your Events</h3>
                {userEvents.length > 0 ? (
                  <article className="dashboard-scroll-content">
                    <ul>
                      <UserEvents events={userEvents} />
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
