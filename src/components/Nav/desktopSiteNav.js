import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import "./desktopSiteNav.css";
//desktop nav version
export default class DesktopSiteNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchForm: false,
      fadeOut: ""
    };
  }
  //expand or hide search input
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
    }
  };
  closeSearchForm = () => {
    if (this.state.showSearchForm) {
      this.setState({
        fadeOut: "fadeOut"
      });
      setTimeout(() => {
        this.setState({
          showSearchForm: false
        });
      }, 1000);
    }
  };

  render() {
    return (
      <div className="siteNav">
        <ul>
          {!this.state.showSearchForm ? (
            <>
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
                <i
                  className={this.props.colorClass + " fas fa-search"}
                  onClick={() => this.showSearchForm()}
                ></i>
              </li>
            </>
          ) : (
            <SearchInput
              closeSearchForm={this.closeSearchForm}
              colorClass={this.props.colorClass}
              placeholderColor={this.props.placeholderColor}
              handleNavTextColor={this.props.handleNavTextColor}
            />
          )}
        </ul>
      </div>
    );
  }
}
