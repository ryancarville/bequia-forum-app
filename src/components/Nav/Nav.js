import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import MobileSiteNav from "./mobileSiteNav";
import DesktopSiteNav from "./desktopSiteNav";
import TokenServices from "../../services/TokenServices";
//main nav component
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navColorClass: "nav-text-color-white"
    };
  }
  //handle nav text color change when not landing page
  handleNavTextColor = () => {
    if (window.location.pathname !== "/") {
      this.setState({
        navColorClass: "nav-text-color-blue"
      });
    } else {
      this.setState({
        navColorClass: "nav-text-color-white"
      });
    }
  };
  render() {
    const publicNav = (
      <>
        <div
          className="navBar"
          onLoad={this.handleNavTextColor}
          onClick={this.handleNavTextColor}
        >
          <span className="forumLogo">
            <Link to="/" onClick={this.handleNavTextColor}>
              <img src="/images/nav/bequia-logo.png" alt="forum-icon" />
            </Link>
            <Link to="/" onClick={this.handleNavTextColor}>
              <h1 className={this.state.navColorClass}>Bequia Forum</h1>
            </Link>
          </span>
          <DesktopSiteNav colorClass={this.state.navColorClass} />
          <div className="rightNavInfo">
            <Link
              to="/signup"
              className={this.state.navColorClass}
              onClick={this.handleNavTextColor}
            >
              <i className="fas fa-user-plus"></i>
            </Link>
            <Link
              to="/login"
              className={this.state.navColorClass}
              onClick={this.handleNavTextColor}
            >
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          </div>
        </div>
        <MobileSiteNav handleNavTextColor={this.handleNavTextColor} />
      </>
    );
    const privateNav = (
      <>
        <div className="navBar">
          <span className="forumLogo">
            <Link to="/">
              <img src="/images/nav/bequia-logo.png" alt="forum-icon" />
            </Link>
            <Link to="/">
              <h1 className={this.state.navColorClass}>Bequia Forum</h1>
            </Link>
          </span>
          <DesktopSiteNav colorClass={this.state.navColorClass} />
          <div className="rightNavInfo">
            {TokenServices.getAuthToken() ? (
              <Link
                to={`/createPost`}
                id="create-forum-post-button"
                className={this.state.navColorClass}
              >
                <i className="fas fa-plus"></i>
              </Link>
            ) : null}

            <Link to="/dashboard" className={this.state.navColorClass}>
              <i className="fas fa-tachometer-alt"></i>
            </Link>
            <Link
              to="/"
              onClick={() => this.props.handleLogOut()}
              className={this.state.navColorClass}
            >
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        </div>
        <MobileSiteNav />
      </>
    );

    return <nav>{this.props.loggedIn === true ? privateNav : publicNav}</nav>;
  }
}

export default Nav;
