import React, { Component } from "react";
import "./UserSettings.css";
import apiServices from "../../services/apiServices";
import tokenServices from "../../services/TokenServices";
export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClass: "toggle",
      showPersonalDetailsForm: false,
      checked: false,
      toggleShowDelete: false,
      uploadImage: false,
      settings: "",
      userInfo: [],
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      userProfileImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    };
  }
  getData = () => {
    apiServices.getUserData(tokenServices.getUserId()).then((data) => {
      console.log(data);
      this.setState({
        userInfo: data,
        firstName: data.first_name,
        lastName: data.last_name,
        userName: data.user_name,
        email: data.email,
      });
    });
  };
  componentDidMount() {
    this.getData();
  }
  handleShowDelete = () => {
    const el = document.getElementById("toggle-delete-account");
    this.setState(
      {
        deleteAccount: !this.state.deleteAccount,
      },
      () => {
        el.checked = this.state.deleteAccount;
      }
    );
  };
  handleDelete = (e) => {
    e.preventDefault();
  };
  handleUserName = (e) => {
    this.setState({ userName: e.target.value });
  };
  handleFirstName = (e) => {
    console.log(e);
    this.setState({ firstName: e.target.value });
  };
  handleLastName = (e) => {
    this.setState({ lastName: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleShowPersonalInfoForm = () => {
    this.setState({
      showPersonalDetailsForm: !this.state.showPersonalDetailsForm,
    });
  };
  handleShowUploadImage = () => {
    this.setState({
      uploadImage: !this.state.uploadImage,
    });
  };
  handleImageUpload = () => {
    const file = document.getElementById("image-uploader").files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        userProfileImage: reader.result,
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  render() {
    const {
      showPersonalDetailsForm,
      deleteAccount,
      userProfileImage,
      userInfo,
      userName,
      firstName,
      lastName,
      email,
      uploadImage,
    } = this.state;
    return (
      <article>
        <img
          src={userProfileImage}
          alt="profile"
          className="profile-image-thumb"
        />
        <h3>
          Hey there, {firstName} {lastName}!
        </h3>
        <p>Here you will find all the options for you personal profile.</p>
        <div className="settings-toggle-tool-bar">
          <div id="personal-info-wrapper">
            <span className="toggle-container">
              <label
                htmlFor="personal-info-toggle"
                onChange={this.handleShowPersonalInfoForm}
              >
                Edit Personal Info
                <input
                  type="checkbox"
                  name="personal-info-toggle"
                  id="personal-info-toggle"
                  className="checkbox"
                />
                <span className="checkmark"></span>
              </label>
            </span>
            {!showPersonalDetailsForm ? null : (
              <div className="settings-form">
                <form
                  onSubmit={this.handleSubmit}
                  className="personal-details-form"
                >
                  <input
                    type="text"
                    placeholder={userInfo.user_name || "User Name"}
                    value={userName}
                    onChange={this.handleUserName}
                  />
                  <input
                    type="text"
                    name="first-name"
                    id="setting-change-first-name"
                    placeholder={firstName || " First Name"}
                    value={firstName}
                    onChange={this.handleFirstName}
                  />
                  <input
                    type="text"
                    name="last-name"
                    id="setting-change-last-name"
                    placeholder={lastName || "Last Name"}
                    value={lastName}
                    onChange={this.handleLastName}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder={email || "Email Address"}
                    value={email}
                    onChange={this.handleEmail}
                  />
                </form>
              </div>
            )}
          </div>
          <div className="upload-image-wrapper">
            <span className="toggle-container">
              <label
                htmlFor="upload-image"
                onChange={this.handleShowUploadImage}
              >
                Upload Image
                <input
                  type="checkbox"
                  name="upload-image"
                  id="upload-image"
                  className="checkbox"
                  onSubmit={this.handleImageUpload}
                />
                <span className="checkmark"></span>
              </label>
            </span>
            {!uploadImage ? null : (
              <input
                type="file"
                name="image-uploader"
                id="image-uploader"
                onChange={() => this.handleImageUpload(this)}
              />
            )}
          </div>
          <div className="delete-account">
            <span className="toggle-container">
              <label
                htmlFor="toggle-delete-account"
                onChange={this.handleShowDelete}
              >
                Delete Account
                <input
                  type="checkbox"
                  name="toggle-delete-account"
                  id="toggle-delete-account"
                  className="checkbox"
                />
                <span className="checkmark"></span>
              </label>
            </span>
            {!deleteAccount ? null : (
              <div className="setting-form">
                <form onSubmit={this.handleDelete}>
                  <h3>
                    Are you sure you want to permantely delete your account?
                    This can not be undone.
                  </h3>
                  <button type="submit">I confirm</button>
                  <button onClick={this.handleShowDelete}>
                    I do not confirm
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
}
