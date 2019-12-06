import React, { Component } from "react";
import ForumContext from "../../ForumContext";
import "./EditEvent.css";
//edit event component
export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.event.id,
      title: this.props.event.title,
      location: this.props.event.location,
      description: this.props.event.description,
      event_date: this.props.event.event_date,
      start_time: "",
      end_time: "",
      today: new Date().toISOString()
    };
  }
  static contextType = ForumContext;
  //reset form
  resetState = () => {
    this.setState({
      title: "",
      location: "",
      description: "",
      event_date: "",
      start_time: "",
      end_time: ""
    });
  };
  //handle title
  handleEventTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  //handle description
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  //handle location
  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  };
  //handle date
  handleDate = e => {
    this.setState({
      event_date: e.target.value
    });
  };
  //handle start time
  handleStartTime = e => {
    this.setState({
      start_time: e.target.value
    });
  };
  //handle end time
  handleEndTime = e => {
    this.setState({
      end_time: e.target.value
    });
  };
  //handle submit
  handleSubmit = e => {
    e.preventDefault();
    const { start_time, end_time } = this.state;
    var event_time = [start_time, end_time];
    event_time = event_time.join(" - ");
    const { id, title, location, event_date, description } = this.state;
    const eventToUpdate = {
      id,
      title,
      location,
      event_date,
      event_time,
      description
    };
    this.context.editEvent(eventToUpdate);
    this.setState({
      redirect: true
    });
  };
  //make event times menus
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
    window.scroll(0, 0);
    const splitEventTime = this.props.event.event_time.split(" - ");
    this.setState({
      start_time: splitEventTime[0],
      end_time: splitEventTime[1]
    });
  }

  render() {
    if (this.state.redirect) {
      this.props.showEditPopUp();
    }

    return (
      <section className="create-event-container">
        <div className="create-event-content">
          {" "}
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="eventTitle">Event Title</label>
            <input
              type="text"
              name="eventTitle"
              id="event-title"
              value={this.state.title}
              onChange={this.handleEventTitle}
              autoFocus
              required
            />
            <label htmlFor="eventLocation">Event Location</label>
            <input
              type="text"
              name="eventLocation"
              id="event-location"
              value={this.state.location}
              onChange={this.handleLocation}
              required
            />
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              name="eventDate"
              id="event-date"
              value={this.state.event_date}
              min={this.state.today}
              onChange={this.handleDate}
              required
            />
            <label htmlFor="eventStartTime">Event Start Time</label>
            <select
              name="eventStartTime"
              id="event-start-time"
              value={this.state.start_time}
              onChange={this.handleStartTime}
            >
              {this.eventTimeSelect()}
            </select>
            <label htmlFor="eventEndTime">Event End Time</label>
            <select
              name="eventEndTime"
              id="event-end-time"
              value={this.state.end_time}
              onChange={this.handleEndTime}
            >
              {this.eventTimeSelect()}
            </select>
            <label htmlFor="eventDescription">Event Description</label>
            <textarea
              name="eventDescritption"
              id="event-description"
              value={this.state.description}
              onChange={this.handleDescription}
            />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={this.resetState}>
              Clear Form
            </button>
            <button type="button" onClick={this.props.showEditPopUp}>
              Cancel
            </button>
          </form>
        </div>
      </section>
    );
  }
}
