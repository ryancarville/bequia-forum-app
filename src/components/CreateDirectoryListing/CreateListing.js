import React, { Component } from "react";
import CountriesSelect from "./countriesDropMenu";
import PhoneInput from "react-phone-number-input";
import apiService from "../../services/apiServices";
import "./CreateListing.css";
//create directory listing
export default class CreateListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      email: "",
      phone: "",
      website: ""
    };
  }
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
  //handle address
  handleAddress = e => {
    this.setState({
      address: e.target.value
    });
  };
  //handle city
  handleCity = e => {
    this.setState({
      city: e.target.value
    });
  };
  //handle country
  handleCountry = e => {
    this.setState({
      country: e.target.value
    });
  };
  //handle email
  handleEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  //handle phone
  handlePhone = e => {
    this.setState({
      phone: e
    });
  };
  //handle website
  handleWebsite = e => {
    this.setState({
      website: e.target.value
    });
  };
  //handle directory listing submit
  handleSubmit = e => {
    e.preventDefault();
    const {
      user_id,
      first_name,
      last_name,
      address,
      city,
      country,
      email,
      phone,
      website
    } = this.state;
    const newListing = {
      user_id,
      first_name,
      last_name,
      address,
      city,
      country,
      email,
      phone,
      website
    };
    apiService.addDirectoryListing(newListing).then(data => {
      if (data.error) {
        this.setState({
          error: data.error
        });
      }
      this.props.updateDirectory();
      this.props.showAddForm();
      this.props.context.getDirectory();
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <form className="dir-listing-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="first_name"
          id="dir-listing-form-first-name"
          placeholder="First Name"
          value={this.state.first_name}
          onChange={this.handleFirstName}
          required
        />
        <input
          type="text"
          name="last_name"
          id="dir-listing-form-last-name"
          placeholder="Last Name"
          value={this.state.last_name}
          onChange={this.handleLastName}
          required
        />
        <input
          type="text"
          name="address"
          id="dir-listing-form-address"
          placeholder="Street Address"
          value={this.state.address}
          onChange={this.handleAddress}
        />
        <input
          type="text"
          name="city"
          id="dir-listing-form-city"
          placeholder="City"
          value={this.state.city}
          onChange={this.handleCity}
        />
        <CountriesSelect
          value={this.state.country}
          handleCountry={this.handleCountry}
        />
        <input
          type="email"
          name="email"
          id="dir-listing-form-email"
          placeholder="Email Address"
          value={this.state.email}
          onChange={this.handleEmail}
        />
        <PhoneInput
          type="tel"
          name="phone"
          id="dir-listing-form-phone"
          placeholder="Telephone"
          country="VC"
          value={this.state.phone}
          onChange={value => this.handlePhone(value)}
        />
        <input
          type="text"
          name="website"
          id="dir-listing-form-website"
          placeholder="Website"
          value={this.state.website}
          onChange={this.handleWebsite}
        />
        <button type="submit">Add Listing</button>
        <button type="reset">Clear Form</button>
        <button onClick={this.props.showAddForm}>Cancel</button>
      </form>
    );
  }
}
