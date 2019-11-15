import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import TokenServices from "../../services/TokenServices";
import "./desktopSiteNav.css";
export default class DesktopSiteNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchForm: false
    };
  }
  showSearchForm = () => {
    this.setState({
      showSearchForm: !this.state.showSearchForm
    });
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
          {TokenServices.getAuthToken() ? (
            <li>
              <span className="create-post-button">
                <Link to={`/createPost`} id="create-forum-post-button">
                  <i className="fas fa-plus" samesite="none"></i>Thread
                </Link>
              </span>
            </li>
          ) : null}
          <li>
            {!this.state.showSearchForm ? (
              <i
                className="fas fa-search"
                onClick={() => this.showSearchForm()}
                samesite="none"
              ></i>
            ) : null}
            {this.state.showSearchForm ? (
              <SearchInput closeNavSearch={this.showSearchForm} />
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
}
