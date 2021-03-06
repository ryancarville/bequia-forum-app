import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ForumContext from "../../ForumContext";
import MakeEvent from "./makeEvent";
import EditEvent from "../EditEvent/EditEvent";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import "./EventPage.css";
import apiServices from "../../services/apiServices";
import EditButton from "../Buttons/Edit";
import TokenServices from "../../services/TokenServices";
import deleteIcon from "../Icons/delete";
//event page component
export default class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.eventId,
      event: null,
      showEditPopUp: false,
      showDeletePopUp: false,
      redirect: false
    };
  }
  //show edit form
  showEditPopUp = () => {
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  //show delete pop up
  showDeletePopUp = () => {
    this.setState({
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //updates calendar after new event added
  updateEvent = () => {
    this.setState({
      event: null
    });
    const { eventId } = this.props.match.params;
    apiServices.getEventById(eventId).then(event => {
      console.log(event);
      this.setState({
        event: event
      });
    });
  };
  //handle detlete
  handleDelete = () => {
    const { id } = this.state;
    apiServices.deleteEvent(id).then(() => {
      this.setState({
        redirect: !this.state.redirect
      });
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
    if (TokenServices.getAuthToken()) {
      this.setState({
        loggedIn: true
      });
    }
    const { eventId } = this.props.match.params;
    apiServices.getEventById(eventId).then(event => {
      console.log(event);
      this.setState({
        event: event
      });
    });
  }

  render() {
    const { event } = this.state;
    if (this.state.redirect) {
      return <Redirect to={"/events"} />;
    }
    return (
      <div className="event-page-container">
        {this.state.showDeletePopUp ? (
          <DeletePopUp
            eventTitle={event.title}
            showDeletePopUp={this.showDeletePopUp}
            handleDelete={this.handleDelete}
          />
        ) : null}
        {this.state.showEditPopUp ? (
          <EditEvent
            event={event}
            showEditPopUp={this.showEditPopUp}
            updateEvent={this.updateEvent}
          />
        ) : this.state.event ? (
          <MakeEvent event={event} />
        ) : null}
        {this.state.event ? (
          <ForumContext.Consumer>
            {context =>
              this.state.loggedIn ? (
                context.user.id === event.user_id ? (
                  <span className="event-edit-buttons">
                    <button type="button" onClick={this.showDeletePopUp}>
                      {deleteIcon}
                    </button>
                    <EditButton
                      type={"event"}
                      showEditPopUp={this.showEditPopUp}
                    />
                  </span>
                ) : null
              ) : null
            }
          </ForumContext.Consumer>
        ) : null}
      </div>
    );
  }
}
