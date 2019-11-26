import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";

import "./desktopSiteNav.css";
export default class DesktopSiteNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchForm: false,
      fadeOut: ""
    };
  }

  showSearchForm = () => {
    if (this.state.showSearchForm === true) {
      this.setState({
        fadeOut: "fadeOut"
      });
      setTimeout(() => {
        this.setState({
          showSearchForm: false
        });
      }, 1000);
    } else {
      this.setState({
        fadeOut: "",
        showSearchForm: true
      });

      console.log("ran");
    }
  };

  render() {
    return (
      <div className="siteNav">
        <ul>
          <li>
            <Link to="/messageBoard" className={this.props.colorClass}>
              <p>Forum</p>
            </Link>
          </li>
          <li>
            <Link to="/new-post" className={this.props.colorClass}>
              <p>New Posts</p>
            </Link>
          </li>
          <li>
            <Link to="/events" className={this.props.colorClass}>
              <p>Events</p>
            </Link>
          </li>
          <li>
            <Link to="/directory" className={this.props.colorClass}>
              <p>Directory</p>
            </Link>
          </li>

          <li>
            {!this.state.showSearchForm ? (
              <i
                className={this.props.colorClass + " " + "fas fa-search"}
                onClick={() => this.showSearchForm()}
                samesite="none"
              ></i>
            ) : null}
            <div className="search-container">
              {this.state.showSearchForm ? (
                <SearchInput
                  closeNavSearch={this.showSearchForm}
                  colorClass={this.props.colorClass}
                />
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
