import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./MarketPlacePage.css";
import DeleteButton from "../Buttons/deleteButton";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import EditButton from "../Buttons/Edit";
import MarketPlaceListingForm from "../CreateMarketPlaceListing/MarketPlaceListingForm";
import ForumContext from "../../ForumContext";
import ListingBody from "./ListingBody";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
//market place page component
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
      showEditButtons: true,
      showEditPopUp: false,
      showDeletePopUp: false,
      success: false
    };
  }
  static contextType = ForumContext;
  //reset form
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
    apiServices.editMarketPlaceListing(newListing).then(() => {
      this.setState({
        showEditButtons: !this.state.showEditButtons,
        showEditPopUp: !this.state.showEditPopUp
      });
    });
  };
  //show edit form
  showEditPopUp = () => {
    this.setState({
      showEditButtons: !this.state.showEditButtons,
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  //show delete pop up
  showDeletePopUp = () => {
    this.setState({
      showEditButtons: !this.state.showEditButtons,
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //handle delete
  handleDelete = () => {
    const { id } = this.state;
    apiServices.deleteMarketPlaceListing(id);
    this.setState({
      redirect: true
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
    const id = this.props.match.params.marektPlaceListingId;
    this.context.verifyLoginOnReload();
    apiServices.getMarketPlaceCatagories().then(cats => {
      this.setState({
        marketPlaceCats: cats
      });
    });
    apiServices
      .getMarketPlacePostsById(id)
      .then(l => {
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
          date_posted: l.date_posted,
          dataLoaded: true
        });
      })
      .then(() => {
        if (this.context.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
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
          ) : this.state.dataLoaded ? (
            <ListingBody state={this.state} />
          ) : (
            waveLoader
          )}
          <ForumContext.Consumer>
            {context =>
              this.state.loggedIn ? (
                this.state.user_id === context.user.id ? (
                  this.state.showEditButtons ? (
                    <span>
                      <DeleteButton showDeletePopUp={this.showDeletePopUp} />
                      <EditButton
                        type="marketPlace"
                        showEditPopUp={this.showEditPopUp}
                      />
                    </span>
                  ) : null
                ) : null
              ) : null
            }
          </ForumContext.Consumer>
        </div>
      </section>
    );
  }
}
