import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Forum.css";
import waveLoader from "../Icons/waveLoader";
import apiServices from "../../services/apiServices";
//forum component
export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumTitles: [],
      error: null
    };
  }
  //make forum sections
  makeForum = () => {
    let links = [];
    this.state.forumTitles.forEach(title => {
      if (title.name === "Jobs") {
        links.push(
          <Link to={"/jobs"} className="section-menu-link" key={title.id}>
            {title.name}
            <i className="fas fa-briefcase"></i>
          </Link>
        );
      }
      if (title.name === "Market Place") {
        links.push(
          <Link
            className="section-menu-link"
            to={"/marketPlace"}
            key={title.id}
          >
            {title.name}
            <i className="fas fa-store"></i>
          </Link>
        );
      }
      if (title.name === "Rentals") {
        links.push(
          <Link to={"/rentals"} className="section-menu-link" key={title.id}>
            {title.name}
            <i className="fas fa-home"></i>
          </Link>
        );
      }
      if (title.name === "Events") {
        links.push(
          <Link to={"/events"} className="section-menu-link" key={title.id}>
            {title.name}
            <i className="far fa-calendar-alt"></i>
          </Link>
        );
      }
      if (title.name === "Life on Bequia") {
        links.push(
          <Link
            to={`/messageBoard/${title.id}`}
            className="section-menu-link"
            key={title.id}
          >
            {title.name}
            <i className="fas fa-umbrella-beach"></i>
          </Link>
        );
      }
      if (title.name === "Help & Tips") {
        links.push(
          <Link
            to={`/messageBoard/${title.id}`}
            className="section-menu-link"
            key={title.id}
          >
            {title.name}
            <i className="fas fa-people-carry"></i>
          </Link>
        );
      }
      if (title.name === "Activities") {
        links.push(
          <Link
            to={`/messageBoard/${title.id}`}
            className="section-menu-link"
            key={title.id}
          >
            {title.name}
            <i className="fas fa-hiking"></i>
          </Link>
        );
      }
      if (title.name === "Off-Topic") {
        links.push(
          <Link
            to={`/messageBoard/${title.id}`}
            className="section-menu-link"
            key={title.id}
          >
            {title.name}
            <i className="fas fa-question"></i>
          </Link>
        );
      }
      if (title.name === "Support") {
        links.push(
          <Link
            to={`/messageBoard/${title.id}`}
            className="section-menu-link"
            key={title.id}
          >
            {title.name}
            <i className="fas fa-info"></i>
          </Link>
        );
      }
    });
    return links;
  };
  componentDidMount() {
    window.scroll(0, 0);
    apiServices.getForumSectionTitles().then(titles => {
      if (titles.error) {
        this.setState({
          error: titles.error
        });
      } else {
        this.setState({
          forumTitles: titles,
          dataLoaded: true
        });
      }
    });
  }

  render() {
    return this.state.dataLoaded ? (
      <section className="forum-container">
        <div className="forum-content">
          <header>
            <h3>Forum</h3>
          </header>
          {this.state.error ? <p>{this.state.error}</p> : null}

          <ul className="sectionMenu">{this.makeForum()}</ul>
        </div>
      </section>
    ) : (
      <span className="loader-wrapper">{waveLoader}</span>
    );
  }
}
