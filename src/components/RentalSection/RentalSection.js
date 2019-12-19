import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import "./RentalSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
//rentals section component
export default class RentalSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }
  //handle sort
  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "title") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "title") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "date_posted") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "date_posted") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "price") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.price.toLowerCase();
        var y = b.price.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "price") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.price.toLowerCase();
        var y = b.price.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "location") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.location.toLowerCase();
        var y = b.location.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "location") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.location.toLowerCase();
        var y = b.location.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
  };

  componentDidMount() {
    window.scroll(0, 0);
    const { rental_cat } = this.props.match.params;
    apiServices
      .getRentalListings(rental_cat)
      .then(listings => {
        if (listings.error) {
          this.setState({ error: listings.error });
        } else {
          this.setState({ listings: listings });
        }
      })
      .then(() => {
        apiServices.getRentalCatagories().then(cats => {
          const rental_cat_title = cats.filter(
            c => c.id.toString() === rental_cat
          );
          this.setState({
            rentalCats: cats,
            rental_cat_title: rental_cat_title[0].name,
            dataLoaded: true
          });
        });
      });
  }
  //make all rental listings for section
  makeRentalListings = () => {
    return this.state.listings.map(r => (
      <li key={r.id} className="post-card">
        <article className="post-card-info non-board-post">
          <span>
            <Link to={`/rentals/${r.rental_cat}/${r.id}`}>
              <h3>{r.title}</h3>
            </Link>
            <Truncate
              className="post-teaser"
              lines={2}
              ellipsis={
                <span>
                  ...
                  <Link to={`/rentals/${r.rental_cat}/${r.id}`}>Read more</Link>
                </span>
              }
            >
              <p>{r.description}</p>
            </Truncate>
          </span>
          <span className="post-info">
            {r.price ? (
              r.price === "0" ? null : (
                <p>
                  <i className="fas fa-dollar-sign"></i> {r.price}
                </p>
              )
            ) : null}
            {r.location ? (
              <p>
                <i className="fas fa-map-marked-alt"></i> {r.location}
              </p>
            ) : null}
            <p>Posted By: {r.contact_name}</p>
            <p>Posted On: {formatDate(r.date_posted)}</p>
          </span>
        </article>
      </li>
    ));
  };

  render() {
    return this.state.dataLoaded ? (
      <section className="rentals-section-container">
        <header>
          <h3>
            {this.state.rental_cat_title ? this.state.rental_cat_title : null}
          </h3>
          <Sort sortType="rentals" handleSort={this.handleSort} />
        </header>
        <div className="rentals-section-content">
          {this.state.error ? (
            <p id="rentals-section-error">{this.state.error}</p>
          ) : null}
          {this.state.listings.length > 0 ? (
            <ul>{this.makeRentalListings()}</ul>
          ) : this.state.error ? null : (
            <span className="loader-wrapper">{waveLoader}</span>
          )}
        </div>
      </section>
    ) : (
      waveLoader
    );
  }
}
