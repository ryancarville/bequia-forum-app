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
      navColorClass: "nav-text-color-white",
      navClass: "navBar",
    };
  }
  //handle nav text color change when not landing page
  handleNavTextColor = () => {
    if (window.location.pathname !== "/") {
      this.setState({
        navColorClass: "nav-text-color-blue",
      });
    } else {
      this.setState({
        navColorClass: "nav-text-color-white",
      });
    }
  };
  navClass = () => {
    let y = window.scrollY;

    if (y > 15) {
      this.setState({
        navClass: "navBar navBarFixed",
      });
    } else {
      this.setState({
        navClass: "navBar",
      });
    }
  };
  componentDidMount() {
    document.addEventListener("scroll", () => {
      this.navClass(window.scrollY);
    });
  }

  render() {
    let navClass = this.state.navClass;
    const publicNav = (
      <>
        <div className={navClass}>
          <span className="forumLogo">
            <Link to="/" onClick={() => this.props.handleNavTextColor("/")}>
              <img src="/images/nav/bequia-logo.png" alt="forum-icon" />
            </Link>
            <Link to="/" onClick={() => this.props.handleNavTextColor("/")}>
              <h1 className={this.props.navColorClass}>Bequia Forum</h1>
            </Link>
          </span>
          <DesktopSiteNav
            colorClass={this.props.navColorClass}
            placeholderColor={this.props.placeholderColor}
            handleNavTextColor={this.props.handleNavTextColor}
          />
          <div className="rightNavInfo">
            <Link
              to="/signup"
              className={this.props.navColorClass}
              onClick={() => this.props.handleNavTextColor("/signup")}
            >
              <i className="fas fa-user-plus"></i>
            </Link>
            <Link
              to="/login"
              className={this.props.navColorClass}
              onClick={() => this.props.handleNavTextColor("/login")}
            >
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          </div>
        </div>
        <MobileSiteNav
          colorClass={this.props.navColorClass}
          handleNavTextColor={this.props.handleNavTextColor}
        />
      </>
    );
    const privateNav = (
      <>
        <div className={navClass}>
          <span className="forumLogo">
            <Link to="/" onClick={() => this.props.handleNavTextColor("/")}>
              <img src="/images/nav/bequia-logo.png" alt="forum-icon" />
            </Link>
            <Link to="/" onClick={() => this.props.handleNavTextColor("/")}>
              <h1 className={this.props.navColorClass}>Bequia Forum</h1>
            </Link>
          </span>
          <DesktopSiteNav
            colorClass={this.props.navColorClass}
            placeholderColor={this.props.placeholderColor}
            handleNavTextColor={this.props.handleNavTextColor}
          />
          <div className="rightNavInfo">
            {TokenServices.getAuthToken() ? (
              <Link
                to={`/createPost`}
                id="create-forum-post-button"
                className={this.props.navColorClass}
                onClick={() => this.props.handleNavTextColor("/createPosts")}
              >
                <i className="fas fa-plus"></i>
              </Link>
            ) : null}

            <Link
              to="/dashboard"
              className={this.props.navColorClass}
              onClick={() => this.props.handleNavTextColor("/dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i>
            </Link>
            <Link
              to="/"
              onClick={() => this.props.handleLogOut()}
              className={this.props.navColorClass}
            >
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        </div>
        <MobileSiteNav
          colorClass={this.props.navColorClass}
          handleNavTextColor={() => this.props.handleNavTextColor()}
        />
      </>
    );

    return <nav>{this.props.loggedIn === true ? privateNav : publicNav}</nav>;
  }
}

export default Nav;
