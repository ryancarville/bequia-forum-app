import React, { Component } from "react";
import "./SignUp.css";
import ForumContext from "../../ForumContext";
import apiService from "../../services/apiServices";
import { Redirect } from "react-router-dom";
//sign up component
export default class SingUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      user_name: "",
      password: "",
      confirmPass: "",
      showPass: false,
      showConfirmPass: false,
      error: null
    };
  }
  static contextType = ForumContext;
  resetState = () => {
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      user_name: "",
      password: "",
      confirmPass: "",
      showPass: false,
      showConfirmPass: false,
      error: null
    });
  };
  //show password
  showPass = () => {
    const pass = document.getElementById("signUp-pass");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
    this.setState({
      showPass: !this.state.showPass
    });
  };
  //show confirm password
  showConfirmPass = () => {
    const pass = document.getElementById("signUp-re-pass");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
    this.setState({
      showConfirmPass: !this.state.showConfirmPass
    });
  };
  //handle first name
  handleFirstName = e => {
    this.setState({
      first_name: e.target.value
    });
  };
  //handle last name
  handleLastName = e => {
    this.setState({
      last_name: e.target.value
    });
  };
  //handle email
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  //handle username
  handleUserName = e => {
    this.setState({
      user_name: e.target.value
    });
  };
  //handle password
  handlePass = e => {
    this.setState({
      password: e.target.value
    });
  };
  //handle confirm password
  handleConfirmPass = e => {
    this.setState(
      {
        confirmPass: e.target.value
      },
      () => {
        if (this.state.confirmPass !== this.state.password) {
          this.setState({
            error: "Passwords do not match."
          });
        } else if (this.state.confirmPass === this.state.password) {
          this.setState({
            error: null
          });
        }
      }
    );
  };
  //handle submit
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.confirmPass !== this.state.password) {
      this.setState({
        error: "Passwords do not match."
      });
      return true;
    }
    const { first_name, last_name, email, user_name, password } = this.state;
    const newUser = {
      first_name,
      last_name,
      email,
      user_name,
      password
    };
    apiService.signUp(newUser).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      } else {
        this.setState({
          success: true
        });
      }
    });
  };
  render() {
    if (this.state.success) {
      return <Redirect to={"/login"} />;
    }
    return (
      <div className="signUp-container">
        <div className="signUp-content">
          <h3>Create Account</h3>

          <form onSubmit={this.handleSubmit}>
            {this.state.error}
            <input
              type="text"
              name="fName"
              id="signUp-fName"
              value={this.state.first_name}
              placeholder="First Name"
              onChange={this.handleFirstName}
              required
            />
            <input
              type="text"
              name="lName"
              id="signUp-lname"
              value={this.state.last_name}
              placeholder="Last Name"
              onChange={this.handleLastName}
              required
            />
            <input
              type="email"
              name="email"
              id="signUp-email"
              value={this.state.email}
              placeholder="Email Address"
              onChange={this.handleEmail}
              required
            />
            <input
              type="text"
              name="user_name"
              id="signUp-user_name"
              value={this.state.user_name}
              placeholder="User Name"
              onChange={this.handleUserName}
              required
            />

            <input
              type="password"
              name="pass"
              id="signUp-pass"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handlePass}
              required
            />
            {this.state.showPass ? (
              <i
                className="far fa-eye-slash showPass"
                onClick={this.showPass}
              />
            ) : (
              <i className="far fa-eye showPass" onClick={this.showPass} />
            )}
            <input
              type="password"
              name="confirmPass"
              id="signUp-re-pass"
              value={this.state.confirmPass}
              placeholder="Confirm Password"
              onChange={this.handleConfirmPass}
              required
            />

            {this.state.showConfirmPass ? (
              <i
                className="far fa-eye-slash showPass"
                onClick={this.showConfirmPass}
              />
            ) : (
              <i
                className="far fa-eye showPass"
                onClick={this.showConfirmPass}
              />
            )}
            <button type="submit" onSubmit={this.handleSubmit}>
              Create Account
            </button>
            <button type="button" onClick={this.resetState}>
              Clear Form
            </button>
          </form>
        </div>
      </div>
    );
  }
}
