import React, { Component } from "react";
import { Link } from "react-router-dom";
import CreateContentButton from "../CreateContentButton/CreateContentButton";
import TokenServices from "../../services/TokenServices";
import SearchInput from "../SearchInput/SearchInput";
import "./mobileSiteNav.css";
export default class MobileNav extends Component {
  render() {
    const mobileSiteNav = (
      <>
        <span className="mobile-search">
          <SearchInput />
        </span>
        <section className="mobile-nav-container">
          <ul className="mobile-nav-bar">
            <li>
              <Link to="/messageBoard" className="mobile-nav-link">
                <i
                  className="fas fa-align-justify"
                  samesite="none"
                  secure="true"
                ></i>
              </Link>
            </li>
            <li>
              <Link to="/new-post" className="mobile-nav-link">
                <i
                  className="far fa-newspaper"
                  samesite="none"
                  secure="true"
                ></i>
              </Link>
            </li>

            {TokenServices.getAuthToken() ? (
              <CreateContentButton forumType="mobile" />
            ) : null}

            <li>
              <Link to="/events" className="mobile-nav-link">
                <i
                  className="far fa-calendar-alt"
                  samesite="none"
                  secure="true"
                ></i>
              </Link>
            </li>
            <li>
              <Link to="/directory" className="mobile-nav-link">
                <i
                  className="far fa-address-book"
                  samesite="none"
                  secure="true"
                ></i>
              </Link>
            </li>
          </ul>
        </section>
      </>
    );
    return mobileSiteNav;
  }
}
