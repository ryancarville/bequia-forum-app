import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import "./Events.css";
import { Link } from "react-router-dom";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
import SelectedEvents from "../SelectedEvents/SelectedEvents";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      events: [],
      showEvents: false,
      selectedEvents: []
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

  handleShowEvents = events => {
    console.log(events);

    this.setState({
      showEvents: true,
      selectedEvents: events
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
          <Calendar
            events={this.state.events}
            handleShowEvents={this.handleShowEvents}
          />
          {this.state.selectedEvents.length > 0 ? (
            <SelectedEvents events={this.state.selectedEvents} />
          ) : this.state.showEvents ? (
            <p>There are no scheduled events for this date.</p>
          ) : (
            <h4>Click on a date to see the events for that day.</h4>
          )}
        </div>
      </section>
    );
  }
}
export default withRouter(Events);
