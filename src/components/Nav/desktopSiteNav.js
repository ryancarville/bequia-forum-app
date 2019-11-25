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
            <Link to="/messageBoard">
              <p>Forum</p>
            </Link>
          </li>
          <li>
            <Link to="/new-post">
              <p>New Posts</p>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <p>Events</p>
            </Link>
          </li>
          <li>
            <Link to="/directory">
              <p>Directory</p>
            </Link>
          </li>

          <li>
            {!this.state.showSearchForm ? (
              <i
                className="fas fa-search"
                onClick={() => this.showSearchForm()}
                samesite="none"
              ></i>
            ) : null}
            <div className="search-container">
              {this.state.showSearchForm ? (
                <SearchInput closeNavSearch={this.showSearchForm} />
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
