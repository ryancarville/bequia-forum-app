import React, { Component } from "react";
import "./CreateRentalListing.css";
import { Redirect } from "react-router-dom";
import RentalForm from "./RentalForm";
import ShowRentalPreview from "./ShowRentalPreview";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";

export default class CreateRentalListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentalCats:[],
      rental_cat: 1,
      user_id: "",
      title: "",
      description: "",
      location: "",
      price: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      showAirbnb: false,
      airbnb: "https://www.airbnb.com/",
      showHomeAway: false,
      homeaway: "https://www.homeaway.com/",
      showBooking_com: false,
      booking_dot_com: "https://www.booking.com/",
      showOther: false,
      other_site: "https://www.your-site-here.com",
      date_posted: new Date().toISOString().slice(0, 10),
      showPreview: false,
      sucess: false
    };
  }
  static contextType = ForumContext;
  resetState = () => {
    this.setState({
      rental_cat: "",
      user_id: "",
      title: "",
      description: "",
      location: "",
      price: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      showAirbnb: false,
      airbnb: "https://www.airbnb.com/",
      showHomeAway: false,
      homeaway: "https://www.homeaway.com/",
      showBooking_com: false,
      booking_dot_com: "https://www.booking.com/",
      showOther: false,
      other_site: "https://www.your-site.com",
      date_posted: new Date().toISOString().slice(0, 10),
      showPreview: false,
      sucess: false
    });
  };
  handleRentalType = e => {
    this.setState({
      rental_cat: e.target.value
    });
  };
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  handleLocation = e => {
    this.setState({ location: e.target.value });
  };
  handlePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  handleAirbnb = e => {
    this.setState({
      airbnb: e.target.value
    });
  };
  handleHomeAway = e => {
    this.setState({
      homeaway: e.target.value
    });
  };
  handleBooking_com = e => {
    this.setState({
      booking_dot_com: e.target.value
    });
  };
  handleOtherSite = e => {
    this.setState({
      other_site: e.target.value
    });
  };
  handleShowAirBnbSiteInput = e => {
    this.setState({
      showAirbnb: !this.state.showAirbnb
    });
  };
  handleShowHomeAwaySiteInput = e => {
    this.setState({
      showHomeAway: !this.state.showHomeAway
    });
  };
  handleShowBookingSiteInput = e => {
    this.setState({
      showBooking_com: !this.state.showBooking_com
    });
  };
  handleShowOtherSiteInput = e => {
    this.setState({
      showOther: !this.state.showOther
    });
  };
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  handleContactEmail = e => {
    this.setState({
      contact_email: e.target.value
    });
  };
  handleContactPhone = e => {
    this.setState({
      contact_phone: e
    });
  };
  handleShowPreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  };
  handleSubmit = e => {
    var airbnb = "";
    var homeaway = "";
    var booking_dot_com = "";
    var othersite = "";
    if (this.state.showAirbnb) {
      airbnb = this.state.airbnb;
    }
    if (this.state.showHomeaway) {
      homeaway = this.state.homeaway;
    }
    if (this.state.showBooking_com) {
      booking_dot_com = this.state.booking_dot_com;
    }
    if (this.state.showOther) {
      othersite = this.state.other_site;
    }

    const {
      rental_cat,
      user_id,
      title,
      description,
      location,
      price,
      contact_name,
      contact_email,
      contact_phone,
      date_posted
    } = this.state;
    const newRentalListing = {
      rental_cat,
      user_id,
      title,
      description,
      location,
      price,
      contact_name,
      contact_email,
      contact_phone,
      airbnb,
      homeaway,
      booking_dot_com,
      othersite,
      date_posted
    };
    apiServices.addRentalListing(newRentalListing).then(() => {
      this.setState({
        sucess: true
      });
    });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    apiServices.getRentalCatagories().then(cats => {
      this.setState({
        rentalCats: cats,
        user_id: this.context.user.id
      });
    });
  }

  render() {
    if (this.state.sucess) {
      const { rental_cat } = this.state;
      return <Redirect to={`/rentals/${rental_cat}`} />;
    }
    return (
      <section>
        {this.state.showPreview ? (
          <ShowRentalPreview
            state={this.state}
            handleShowPreview={this.handleShowPreview}
            goBack={this.goBack}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <RentalForm
            state={this.state}
            handleRentalType={this.handleRentalType}
            handleTitle={this.handleTitle}
            handleDescription={this.handleDescription}
            handleLocation={this.handleLocation}
            handlePrice={this.handlePrice}
            handleShowAirBnbSiteInput={this.handleShowAirBnbSiteInput}
            handleShowHomeAwaySiteInput={this.handleShowHomeAwaySiteInput}
            handleShowBookingSiteInput={this.handleShowBookingSiteInput}
            handleShowOtherSiteInput={this.handleShowOtherSiteInput}
            handleAirbnb={this.handleAirbnb}
            handleHomeAway={this.handleHomeAway}
            handleBooking_com={this.handleBooking_com}
            handleOtherSite={this.handleOtherSite}
            handleContactName={this.handleContactName}
            handleContactEmail={this.handleContactEmail}
            handleContactPhone={this.handleContactPhone}
            handleShowPreview={this.handleShowPreview}
            resetState={this.resetState}
            goBack={this.goBack}
          />
        )}
      </section>
    );
  }
}
