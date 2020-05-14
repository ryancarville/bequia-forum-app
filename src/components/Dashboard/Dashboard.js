import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import UserEvents from "../UserEvents/UserEvents";
import ThisWeek from "../ThisWeek/ThisWeek";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import UserPosts from "../UserPosts/UserPosts";
import Weather from "../Weather/Weather";
import UserSettings from "../UserSettings/UserSettings";
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
      showUpcomingEvents: false,
      showUserEvents: false,
      showUserPosts: true,
      showWeather: true,
      dashEvents: true,
      dashUserEvents: "dashboard-user-events",
      liActive: "",
      navFixed: "dash-nav",
    };
    this.root = document.root;
  }

  static contextType = ForumContext;
  componentDidMount() {
    apiServices
      .getThisWeeksEvents()
      .then((events) => {
        this.setState({ events: events });
      })
      .then(() => {
        apiServices.getAllUserPosts(this.context.user.id).then((posts) => {
          this.setState({
            userPosts: posts,
            postsLoaded: true,
          });
        });
      })
      .then(() => {
        apiServices
          .getAllEventsByUserId(this.context.user.id)
          .then((events) => {
            if (events.error) {
              this.setState({
                eventsError: events.error,
              });
            }
            this.setState({
              userEvents: events,
              eventsLoaded: true,
              dataLoaded: true,
            });
          });
      });
  }
  //desktop page views
  handleDashView = (path) => {
    window.scroll(0, 0);
    if (path === "upcomingEvents") {
      const tab = document.getElementById("dash-nav-events");
      this.setState(
        {
          showUserEvents: false,
          showUserPosts: false,
          showWeather: false,
          showSettings: false,
          showUpcomingEvents: true,
          dashEvents: false,
          liActive: "showEvents",
          dashUserEvents: "dashboard-user-events-solo",
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
          showUserPosts: false,
          showWeather: false,
          showUserEvents: true,
          showSettings: false,
          dashEvents: false,
          liActive: "showUserEvents",
          dashUserEvents: "dashboard-user-events-solo",
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
          showWeather: false,
          showUserPosts: true,
          showSettings: false,
          dashEvents: false,
          dashUserEvents: "dashboard-user-events",
          liActive: "showUserPosts",
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
          showSettings: false,
          dashEvents: false,
          dashUserEvents: "dashboard-user-events",
          liActive: "showWeather",
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "dash") {
      const tab = document.getElementById("dash-nav-dash");

      this.setState(
        {
          showUpcomingEvents: false,
          showUserEvents: false,
          dashEvents: true,
          showUserPosts: true,
          showWeather: true,
          showSettings: false,
          dashUserEvents: "dashboard-user-events",
          liActive: "showDash",
        },
        () => {
          tab.classList.add("dash-nav-active");
        }
      );
    }
    if (path === "settings") {
      const tab = document.getElementById("dash-nav-dash");

      this.setState(
        {
          showUpcomingEvents: false,
          showUserEvents: false,
          showUserPosts: false,
          showWeather: false,
          showSettings: true,
          dashEvents: false,
          dashUserEvents: "dashboard-user-events",
          liActive: "showSettings",
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
      showSettings,
      postsLoaded,
      userPosts,
      eventsLoaded,
      showUpcomingEvents,
      userEvents,
      dashEvents,
      dashUserEvents,
      dataLoaded,
      navFixed,
    } = this.state;
    return (
      <>
        {/* <section className="mobile-home-page-container">
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
        </section> */}
        {dataLoaded ? (
          <section className="dash-container">
            <nav className={navFixed}>
              <ul>
                <li
                  className={liActive + "dash-nav-active"}
                  id="dash-nav-dash"
                  onClick={() => this.handleDashView("dash")}
                >
                  <i className="fas fa-tachometer-alt"></i>
                </li>
                <li
                  className={liActive}
                  id="dash-nav-events"
                  onClick={() => this.handleDashView("upcomingEvents")}
                >
                  <i className="fas fa-glass-cheers"></i>
                </li>
                <li
                  className={liActive}
                  id="dash-nav-weather"
                  onClick={() => this.handleDashView("weather")}
                >
                  <i className="fas fa-cloud-sun"></i>
                </li>
                <li
                  className={liActive}
                  id="dash-nav-user-posts"
                  onClick={() => this.handleDashView("userPosts")}
                >
                  <i className="far fa-sticky-note"></i>
                </li>
                <li
                  className={liActive}
                  id="dash-nav-user-events"
                  onClick={() => this.handleDashView("userEvents")}
                >
                  <i className="far fa-calendar-alt"></i>
                </li>
                <li
                  className={liActive}
                  id="dash-nav-settings"
                  onClick={() => this.handleDashView("settings")}
                >
                  <i className="fas fa-user-cog"></i>
                </li>
              </ul>
            </nav>
            <div className="dash-content">
              {showSettings ? (
                <section className="dash">
                  <h3>Profile Settings</h3>
                  <UserSettings />
                </section>
              ) : null}
              {showWeather ? (
                <section id="weather-wrapper">
                  <Weather />
                </section>
              ) : null}
              {showUpcomingEvents ? (
                <section id="home-page-upcoming-events">
                  <span>
                    <h3 className="dashboard-header-link">Upcoming Events</h3>
                    <h4>
                      <Link to={"/events"} style={{ textDecoration: "none" }}>
                        <i className="fas fa-arrow-right"></i> Go to Events
                        Section
                      </Link>
                    </h4>
                  </span>
                  {events.length > 0 ? (
                    <ThisWeek events={this.state.events} />
                  ) : (
                    <p>Currently there are no events for this week.</p>
                  )}
                </section>
              ) : null}
              {dashEvents ? (
                <section className="dashboard-events">
                  <section id="home-page-upcoming-events">
                    <span>
                      <h3 className="dashboard-header-link">Upcoming Events</h3>
                      <h4>
                        <Link to={"/events"} style={{ textDecoration: "none" }}>
                          <i className="fas fa-arrow-right"></i> Go to Events
                          Section
                        </Link>
                      </h4>
                    </span>
                    {events.length > 0 ? (
                      <ThisWeek events={this.state.events} />
                    ) : (
                      <p>Currently there are no events for this week.</p>
                    )}
                  </section>
                  <section className="dash-user-events-wrapper">
                    <span>
                      <h3
                        className="dashboard-header-link"
                        onClick={() => this.handleDashView("userEvents")}
                      >
                        Your Events
                      </h3>
                      <p
                        onClick={() => this.handleDashView("userEvents")}
                        style={{ fontSize: "19px", cursor: "pointer" }}
                      >
                        <i className="far fa-calendar-alt"></i> Go To Your
                        Events
                      </p>
                    </span>
                    {userEvents.length > 0 ? (
                      <article className={dashUserEvents}>
                        <UserEvents events={userEvents} />
                      </article>
                    ) : (
                      <p>{this.state.eventsError}</p>
                    )}
                  </section>
                </section>
              ) : null}
              {showUserEvents ? (
                <section className="dash-user-events-wrapper">
                  <span>
                    <h3
                      className="dashboard-header-link"
                      onClick={() => this.handleDashView("userEvents")}
                    >
                      Your Events
                    </h3>
                    <p
                      onClick={() => this.handleDashView("userEvents")}
                      style={{ fontSize: "19px", cursor: "pointer" }}
                    >
                      <i className="far fa-calendar-alt"></i> Go To Your Events
                    </p>
                  </span>
                  {userEvents.length > 0 ? (
                    <article className={dashUserEvents}>
                      <UserEvents events={userEvents} />
                    </article>
                  ) : (
                    <p>{this.state.eventsError}</p>
                  )}
                </section>
              ) : null}
              {showUserPosts ? (
                <section className="dash-user-posts">
                  <h3
                    onClick={() => this.handleDashView("userPosts")}
                    className="dashboard-header-link"
                  >
                    Your Posts
                  </h3>
                  {userPosts.length > 0 ? (
                    <article className="dashboard-scroll-content">
                      <UserPosts posts={userPosts} />
                    </article>
                  ) : (
                    <p>No posts yest</p>
                  )}
                </section>
              ) : null}
            </div>
          </section>
        ) : (
          waveLoader
        )}
      </>
    );
  }
}
