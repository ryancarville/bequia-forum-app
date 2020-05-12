import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import apiServices from "../../services/apiServices";
import TokenServices from "../../services/TokenServices";
import ForumContext from "../../ForumContext";
import "./LogIn.css";
//login component
export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: "",
      password: "",
      success: false,
      error: null
    };
  }
  static contextType = ForumContext;
  resetState = () => {
    this.setState({
      loginName: "",
      password: "",
      success: false,
      error: null
    });
  };
  //handle user name
  handleLoginName = e => {
    if (this.state.error) {
      this.setState({ error: null });
    }
    this.setState({
      loginName: e.target.value
    });
  };
  //handle user password
  handlePass = e => {
    this.setState({
      password: e.target.value
    });
  };
  //handle submit
  handleSubmit = e => {
    e.preventDefault();
    const { loginName, password } = this.state;
    const whatLogName = loginName.indexOf("@");
    var creds = {};
    if (whatLogName > 0) {
      const email = loginName;
      creds = { email, password };
    } else {
      const user_name = loginName;
      creds = { user_name, password };
    }
    let token;
    apiServices.login(creds).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
        return true;
      } else {
        token = data.authToken;
        TokenServices.saveAuthToken(token);
        apiServices
          .getUserData(data.user_id)
          .then(user => {
            this.context.setUserData(data.user_id, user);
          })
          .then(() => {
            this.setState({
              success: true
            });
          });
      }
    });
  };
  //set test user credentials
  setTestUser = e => {
    this.setState({
      loginName: "testUser@gmail.com",
      password: "testUser!2"
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    if (this.state.success) {
      this.context.handleNavTextColor(window.location.pathname);
      return <Redirect to={"/dashboard"} />;
    }
    return (
      <div className="logIn-container">
        <div className="logIn-content">
          <h3>Sign In</h3>
          <form onSubmit={this.handleSubmit}>
            <button type="button" onClick={this.setTestUser}>
              Login as Test User
            </button>
            {this.state.error}
            <input
              type="text"
              name="email"
              id="logIn-email"
              placeholder="User Name or Email Address"
              value={this.state.loginName}
              onChange={this.handleLoginName}
              required
            />

            <input
              type="password"
              name="pass"
              id="logIn-pass"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePass}
              required
            />
            <button type="submit" onKeyDownCapture={this.handleSubmit}>
              Log In
            </button>
            <button type="reset" onClick={this.resetState}>
              Clear Form
            </button>
          </form>
        </div>
      </div>
    );
  }
}
