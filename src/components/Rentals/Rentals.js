import React, { Component } from "react";
import "./Rentals.css";
import { Link } from "react-router-dom";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";

export default class Rentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      catagories: []
    };
  }
  static contextType = ForumContext;
  componentDidMount() {
    this.context.verifyLoginOnReload();
    apiServices
      .getRentalCatagories()
      .then(cats => {
        if (!cats) {
          this.setState({
            error: cats.error
          });
        } else {
          this.setState({ catagories: cats });
        }
      })
      .then(() => {
        if (this.context.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      });
  }
  makeCatagories = () => {
    return this.state.catagories.map(r => (
      <Link key={r.id} to={`/rentals/${r.id}`} className="rentals-card">
        <img src={r.img_path} alt={r.name} className="rental-cat-img" />
        <span className="rentals-card-text">{r.name}</span>
      </Link>
    ));
  };
  render() {
    return (
      <section className="rentals-container">
        <span>
          <h2>Rentals</h2>
          {this.state.loggedIn ? (
            <span className="create-post-button">
              <Link
                to={"/createRentalListing"}
                id="create-rental-listing-button"
              >
                <i className="fas fa-plus" samesite="none" secure="true"></i>
                Listing
              </Link>
            </span>
          ) : null}
        </span>
        <div className="rentals-content">
          {this.state.catagories ? (
            this.makeCatagories()
          ) : (
            <p>{this.state.error}</p>
          )}
        </div>
      </section>
    );
  }
}
