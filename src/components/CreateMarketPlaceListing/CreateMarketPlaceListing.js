import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ShowMarketPlaceListingPreview from "./ShowMarketPlaceListingPreview";
import MarketPlaceListingForm from "./MarketPlaceListingForm";
import "./CreateMarketPlaceListing.css";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
//create market place listing
export default class CreateMarketPlaceListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketPlaceCats: [],
      user_id: "",
      market_place_cat: "",
      title: "",
      description: "",
      price: "",
      location: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      date_posted: new Date().toISOString().slice(0, 10),
      showPreview: false,
      success: false
    };
  }
  static contextType = ForumContext;
  //handle reset form
  resetState = () => {
    this.setState({
      user_id: "",
      market_place_cat: "",
      title: "",
      description: "",
      price: "",
      location: "",
      contact_name: "",
      contact_email: "",
      contact_phone: ""
    });
  };
  //handle catagory
  handleMarketPlaceCat = e => {
    this.setState({
      market_place_cat: e.target.value
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
    this.setState({
      location: e.target.value
    });
  };
  //handle price
  handlePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  //handle contact name
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  //handle contact emial
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
  //handle show preview
  handleShowPreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  };
  //handle submit
  handleSubmit = e => {
    e.preventDefault();
    const {
      user_id,
      market_place_cat,
      title,
      description,
      price,
      location,
      contact_name,
      contact_email,
      contact_phone,
      date_posted
    } = this.state;
    const newListing = {
      user_id,
      market_place_cat,
      title,
      description,
      price,
      location,
      contact_name,
      contact_email,
      contact_phone,
      date_posted
    };
    apiServices.addMarketPlaceListing(newListing).then(() => {
      this.setState({
        success: true
      });
    });
  };
  //handle back
  goBack = () => {
    this.props.history.goBack();
  };
  componentDidMount() {
    window.scroll(0, 0);
    apiServices.getMarketPlaceCatagories().then(cats => {
      this.setState({
        marketPlaceCats: cats,
        user_id: this.context.user.id
      });
    });
  }

  render() {
    if (this.state.success) {
      const id = this.state.market_place_cat;
      return <Redirect to={`/marketPlace/${id}`} />;
    }
    return (
      <section className="create-mp-listing-container">
        <div className="create-job-lisitng-content">
          {this.state.showPreview ? (
            <ShowMarketPlaceListingPreview
              state={this.state}
              handleShowPreview={this.handleShowPreview}
              handleSubmit={this.handleSubmit}
              goBack={this.goBack}
            />
          ) : (
            <MarketPlaceListingForm
              state={this.state}
              handleMarketPlaceCat={this.handleMarketPlaceCat}
              handleTitle={this.handleTitle}
              handleLocation={this.handleLocation}
              handleDescription={this.handleDescription}
              handlePrice={this.handlePrice}
              handleContactName={this.handleContactName}
              handleContactEmail={this.handleContactEmail}
              handleContactPhone={this.handleContactPhone}
              handleShowPreview={this.handleShowPreview}
              resetState={this.resetState}
              goBack={this.goBack}
            />
          )}
        </div>
      </section>
    );
  }
}
