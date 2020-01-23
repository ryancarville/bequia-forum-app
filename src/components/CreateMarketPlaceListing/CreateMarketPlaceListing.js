import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ListingPreview from "../ListingPreview/ListingPreview";
import ListingEntryForm from "../ListingEntryForm/ListingEntryForm";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import "./CreateMarketPlaceListing.css";

//create market place listing
export default class CreateMarketPlaceListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumSections: [],
      newListing: {},
      showPreview: false,
      success: false
    };
  }
  static contextType = ForumContext;

  //handle show preview
  handleShowPreview = newListing => {
    this.setState({
      newListing: newListing,
      showPreview: !this.state.showPreview
    });
  };
  //handle submit
  handleSubmit = newListing => {
    apiServices.addMarketPlaceListing(newListing).then(() => {
      this.setState({
        success: true
      });
    });
  };

  componentDidMount() {
    window.scroll(0, 0);
    apiServices.getMarketPlaceCatagories().then(cats => {
      this.setState({
        forumSections: cats
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
        <div className="create-mp-listing-content">
          {this.state.showPreview ? (
            <ListingPreview
              state={this.state}
              handleShowPreview={this.handleShowPreview}
              handleSubmit={this.handleSubmit}
            />
          ) : (
            <ListingEntryForm
              state={this.state}
              handleShowPreview={this.handleShowPreview}
            />
          )}
        </div>
      </section>
    );
  }
}
