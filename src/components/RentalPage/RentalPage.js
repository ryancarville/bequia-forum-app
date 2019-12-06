import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ListingBody from "./ListingBody";
import RentalForm from "../CreateRentalListing/RentalForm";
import "./RentalPage.css";
import ForumContext from "../../ForumContext";
import TokenServices from "../../services/TokenServices";
import DeleteButton from "../Buttons/deleteButton";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import EditButton from "../Buttons/Edit";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
//rental listing component
export default class RentalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      rental_cat: "",
      user_id: "",
      title: "",
      description: "",
      location: "",
      price: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      airbnb: "",
      homeaway: "",
      booking_dot_com: "",
      other_site: "",
      date_posted: new Date().toISOString(),
      showEditPopUp: false,
      showDeletePopUp: false,
      showAirbnb: false,
      showHomeAway: false,
      showBooking_com: false,
      showOther: false,
      dataLoaded: false
    };
  }
  static contextType = ForumContext;
  //show edit form
  showEditPopUp = () => {
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  //show delete pop up
  showDeletePopUp = () => {
    this.setState({
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //handle rental type
  handleRentalType = e => {
    this.setState({
      rental_cat: e.target.value
    });
  };
  //handle title
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  //handle description
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  //handle location
  handleLocation = e => {
    this.setState({ location: e.target.value });
  };
  //handle price
  handlePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  //handle airbnb
  handleAirbnb = e => {
    this.setState({
      airbnb: e.target.value
    });
  };
  //handle homeaway
  handleHomeAway = e => {
    this.setState({
      homeaway: e.target.value
    });
  };
  //handle booking.com
  handleBooking_com = e => {
    this.setState({
      booking_dot_com: e.target.value
    });
  };
  //handle other site
  handleOtherSite = e => {
    this.setState({
      other_site: e.target.value
    });
  };
  //show airbnb input
  handleShowAirBnbSiteInput = e => {
    this.setState({
      showAirbnb: !this.state.showAirbnb
    });
  };
  //show homeaway input
  handleShowHomeAwaySiteInput = e => {
    this.setState({
      showHomeAway: !this.state.showHomeAway
    });
  };
  //show booking.com input
  handleShowBookingSiteInput = e => {
    this.setState({
      showBooking_com: !this.state.showBooking_com
    });
  };
  //show other site input
  handleShowOtherSiteInput = e => {
    this.setState({
      showOther: !this.state.showOther
    });
  };
  //handle contact name
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  //handle contact email
  handleContactEmail = e => {
    this.setState({
      contact_email: e.target.value
    });
  };
  //handle contact phone
  handleContactPhone = e => {
    this.setState({
      contact_phone: e
    });
  };
  //handle show listing preivew
  handleShowPreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  };
  //handle submit
  handleSubmit = e => {
    e.preventDefault();
    var airbnb = "";
    var homeaway = "";
    var booking_dot_com = "";
    var other_site = "";
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
      other_site = this.state.other_site;
    }

    const {
      id,
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
    const listingToUpdate = {
      id,
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
      other_site,
      date_posted
    };
    apiServices.editRentalListing(listingToUpdate);
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  //handle delete
  handleDelete = () => {
    const { id } = this.state;
    apiServices.deleteRentalListing(id);
    this.setState({
      redirect: true
    });
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { rentalId } = this.props.match.params;
    apiServices
      .getRentalListing(rentalId)
      .then(r => {
        this.setState({
          id: r.id,
          rental_cat: r.rentalcat,
          user_id: r.userid,
          title: r.title,
          description: r.description,
          location: r.location,
          price: r.price,
          contact_name: r.contact_name,
          contact_email: r.contact_email,
          contact_phone: r.contact_phone,
          airbnb: r.airbnb,
          homeaway: r.homeaway,
          booking_dot_com: r.booking_dot_com,
          other_site: r.other_site,
          date_posted: r.date_posted,
          dataLoaded: true
        });
      })
      .then(() => {
        apiServices.getRentalCatagories().then(cats => {
          this.setState({
            rentalCats: cats
          });
        });
      });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/rentals"} />;
    }
    if (this.state.dataLoaded) {
      return (
        <section className="rental-page-container">
          <div className="rental-page-content">
            {this.state.showDeletePopUp ? (
              <DeletePopUp
                rentalTitle={this.state.title}
                showDeletePopUp={this.showDeletePopUp}
                handleDelete={this.handleDelete}
              />
            ) : null}
            {this.state.showEditPopUp ? (
              <RentalForm
                type={"edit"}
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
                handleShowPreview={this.handleSubmit}
                resetState={this.resetState}
                goBack={this.goBack}
              />
            ) : this.state.dataLoaded ? (
              <ListingBody post={this.state} />
            ) : (
              waveLoader
            )}

            {TokenServices.getAuthToken() ? (
              this.context.user.id === this.state.user_id ? (
                <span className="rental-edit-buttons">
                  <DeleteButton showDeletePopUp={this.showDeletePopUp} />
                  <EditButton
                    type={"rental"}
                    showEditPopUp={this.showEditPopUp}
                  />
                </span>
              ) : null
            ) : null}
          </div>
        </section>
      );
    }
    return waveLoader;
  }
}
