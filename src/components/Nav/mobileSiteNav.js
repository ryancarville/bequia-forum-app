import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateContentButton from "../CreateContentButton/CreateContentButton";
import TokenServices from "../../services/TokenServices";
import SearchInput from "../SearchInput/SearchInput";
import "./mobileSiteNav.css";
//mobile nav version
export default class MobileNav extends Component {
  render() {
    const mobileSiteNav = (
      <>
        <span className="mobile-search">
          <SearchInput
            handleNavTextColor={() => this.props.handleNavTextColor()}
          />
        </span>
        <section className="mobile-nav-container">
          <ul
            className="mobile-nav-bar"
            onClick={this.props.handleNavTextColor}
          >
            <li>
              <Link to="/messageBoard" className="mobile-nav-link">
                <i className="fas fa-align-justify"></i>
              </Link>
            </li>
            <li>
              <Link to="/new-post" className="mobile-nav-link">
                <i className="far fa-newspaper"></i>
              </Link>
            </li>

            {TokenServices.getAuthToken() ? (
              <CreateContentButton forumType="mobile" />
            ) : null}

            <li>
              <Link to="/events" className="mobile-nav-link">
                <i className="far fa-calendar-alt"></i>
              </Link>
            </li>
            <li>
              <Link to="/directory" className="mobile-nav-link">
                <i className="far fa-address-book"></i>
              </Link>
            </li>
          </ul>
        </section>
      </>
    );
    return mobileSiteNav;
  }
}
