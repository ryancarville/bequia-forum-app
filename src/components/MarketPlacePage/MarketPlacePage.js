import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./MarketPlacePage.css";
import DeleteButton from "../Buttons/deleteButton";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import EditButton from "../Buttons/Edit";
import TokenServices from "../../services/TokenServices";
import MarketPlaceListingForm from "../CreateMarketPlaceListing/MarketPlaceListingForm";
import ForumContext from "../../ForumContext";
import ListingBody from "./ListingBody";
import apiServices from "../../services/apiServices";
export default class MarketPlacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketPlaceCats: [],
      id: "",
      user_id: "",
      market_place_cat: "",
      title: "",
      description: "",
      price: "",
      location: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      date_posted: new Date().toISOString(),
      showEditPopUp: false,
      showDeletePopUp: false,
      success: false
    };
  }
  static contextType = ForumContext;
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
  handleMarketPlaceCat = e => {
    this.setState({
      market_place_cat: e.target.value
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
    this.setState({
      location: e.target.value
    });
  };
  handlePrice = e => {
    this.setState({
      price: e.target.value
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
    this.context.editMarketPlaceListing(newListing);
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  showEditPopUp = () => {
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  showDeletePopUp = () => {
    this.setState({
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  handleDelete = () => {
    const { id } = this.state;
    this.context.deleteMarketPlaceListing(id);
    this.setState({
      redirect: true
    });
  };
  componentDidMount() {
    const { id } = this.props.location.state;
    apiServices.getMarketPlaceCatagories().then(cats => {
      this.setState({
        marketPlaceCats: cats
      });
    });
    apiServices.getMarketPlacePostsById(id).then(l => {
      this.setState({
        id: l.id,
        user_id: l.user_id,
        market_place_cat: l.market_placec_at,
        title: l.title,
        description: l.description,
        price: l.price,
        location: l.location,
        contact_name: l.contact_name,
        contact_email: l.contact_email,
        contact_phone: l.contact_phone,
        date_posted: l.date_posted
      });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/marketPlace"} />;
    }
    return (
      <section className="market-place-page-container">
        <div className="market-place-page-content">
          {this.state.showDeletePopUp ? (
            <DeletePopUp
              marketPlaceTitle={this.state.title}
              showDeletePopUp={this.showDeletePopUp}
              handleDelete={this.handleDelete}
            />
          ) : null}
          {this.state.showEditPopUp ? (
            <MarketPlaceListingForm
              edit={true}
              state={this.state}
              handleMarketPlaceCat={this.handleMarketPlaceCat}
              handleTitle={this.handleTitle}
              handleLocation={this.handleLocation}
              handleDescription={this.handleDescription}
              handlePrice={this.handlePrice}
              handleContactName={this.handleContactName}
              handleContactEmail={this.handleContactEmail}
              handleContactPhone={this.handleContactPhone}
              handleShowPreview={this.handleSubmit}
              showEditPopUp={this.showEditPopUp}
              resetState={this.resetState}
            />
          ) : (
            <ListingBody state={this.state} />
          )}
          {TokenServices.getAuthToken() ? (
            this.state.user_id === this.context.user.id ? (
              <DeleteButton showDeletePopUp={this.showDeletePopUp} />
            ) : null
          ) : null}
          {TokenServices.getAuthToken() ? (
            this.state.user_id === this.context.user.id ? (
              <EditButton
                type="marketPlace"
                showEditPopUp={this.showEditPopUp}
              />
            ) : null
          ) : null}
        </div>
      </section>
    );
  }
}
