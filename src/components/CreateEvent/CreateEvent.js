import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./CreateEvent.css";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
export default class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      description: "",
      event_date: new Date().toISOString().slice(0, 10),
      start_ime: "",
      end_ime: "",
      user_id: "",
      date_posted: new Date().toISOString()
    };
  }
  static contextType = ForumContext;
  handleEventTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  };
  handleDate = e => {
    this.setState({
      event_date: e.target.value
    });
  };
  handleStartTime = e => {
    this.setState({
      start_time: e.target.value
    });
  };
  handleEndTime = e => {
    this.setState({
      end_time: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { start_time, end_time } = this.state;
    var event_time = [start_time, end_time];
    event_time = event_time.join(" - ");
    const {
      title,
      location,
      event_date,
      description,
      user_id,
      date_posted
    } = this.state;
    const newEvent = {
      title,
      location,
      event_date,
      event_time,
      description,
      user_id,
      date_posted
    };
    apiServices.addEvent(newEvent).then(() => {
      return this.props.match.params;
    });

    this.setState({
      redirectToCalendar: true
    });
  };
  eventTimeSelect = () => {
    const times = [
      "All Day",
      "Morning",
      "Mid Day",
      "Afternoon",
      "Evening",
      "Until Late",
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30"
    ];
    return times.map(t => (
      <option key={t} value={t}>
        {t}
      </option>
    ));
  };
  componentDidMount() {
    this.setState({ user_id: this.context.user.id });
  }

  render() {
    if (this.state.redirectToCalendar) {
      return <Redirect to={"/events"} />;
    }
    const eventForm = (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="eventTitle"
          id="event-title"
          placeholder="Event Title"
          onChange={this.handleEventTitle}
          autoFocus
          required
        />

        <input
          type="text"
          name="eventLocation"
          id="event-location"
          placeholder="Event Location"
          onChange={this.handleLocation}
          required
        />

        <input
          type="date"
          name="eventDate"
          id="event-date"
          value={this.state.event_date}
          min={this.state.event_date}
          onChange={this.handleDate}
          required
        />
        <label htmlFor="eventStartTime">Start Time</label>
        <select
          name="eventStartTime"
          id="event-start-time"
          onChange={this.handleStartTime}
        >
          {this.eventTimeSelect()}
        </select>
        <label htmlFor="eventEndTime">End Time</label>
        <select
          name="eventEndTime"
          id="event-end-time"
          onChange={this.handleEndTime}
        >
          {this.eventTimeSelect()}
        </select>

        <textarea
          name="eventDescritption"
          id="event-description"
          placeholder="Event Description"
          onChange={this.handleDescription}
        />
        <span id="event-form-buttons">
          <button type="submit">Create Event</button>
          <button type="reset">Clear Form</button>
          <button type="button" onClick={() => this.props.history.goBack()}>
            Cancel
          </button>
        </span>
      </form>
    );
    return (
      <section className="create-event-container">
        <div className="create-event-content"> {eventForm}</div>
      </section>
    );
  }
}
