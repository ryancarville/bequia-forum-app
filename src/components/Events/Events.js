import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import "./Events.css";
import { Link } from "react-router-dom";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      events: []
    };
  }
  updateEvents = () => {
    this.setState({
      events: []
    });
    apiServices.getEvents().then(events => {
      this.setState({
        events: events
      });
    });
  };
  static contextType = ForumContext;
  componentDidMount() {
    this.context.verifyLoginOnReload();
    apiServices
      .getEvents()
      .then(events => {
        this.setState({
          events: events
        });
      })
      .then(() => {
        if (this.context.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      });
  }

  render() {
    return (
      <section className="events-container">
        <header>
          <h2>Events Calendar</h2>
        </header>
        {this.state.loggedIn ? (
          <span className="create-post-button">
            <Link
              to={"/createEvent"}
              params={{ updateEvnts: this.updateEvents }}
              id="create-event-listing-button"
            >
              <i className="fas fa-plus"></i>Event
            </Link>
          </span>
        ) : null}

        <div className="events-content">
          <Calendar events={this.state.events} />
        </div>
      </section>
    );
  }
}
export default withRouter(Events);
