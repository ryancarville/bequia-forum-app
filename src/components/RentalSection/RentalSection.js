import React, { Component } from "react";
import { Link } from "react-router-dom";

import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import "./RentalSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";

export default class RentalSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  handleSort = sort => {
    console.log(sort);
    if (sort.sortType === "asc" && sort.column === "title") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "desc" && sort.column === "title") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "asc" && sort.column === "date_posted") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "desc" && sort.column === "date_posted") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "asc" && sort.column === "price") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "desc" && sort.column === "price") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "asc" && sort.column === "location") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    } else if (sort.sortType === "desc" && sort.column === "location") {
      var sorted = this.state.listings.sort(function(a, b) {
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
    }
  };

  componentDidMount() {
    const { rental_cat } = this.props.match.params;
    apiServices.getRentalListings(rental_cat).then(listings => {
      if (listings.error) {
        this.setState({ error: listings.error });
      } else {
        this.setState({ listings: listings });
      }
    });
  }

  makeRentalListings = () => {
    return this.state.listings.map(r => (
      <li key={r.id}>
        <Link to={`/rentals/${r.rental_cat}/${r.id}`}>
          <h3>{r.title}</h3>
        </Link>
        <Truncate
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
        <span className="post-info">
          {r.price ? <p>Price: {r.price}</p> : null}
          {r.location ? <p>Location: {r.location}</p> : null}
          <p>Posted By: {r.contact_name}</p>
          <p>Posted On: {formatDate(r.date_posted)}</p>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <section className="rentals-section-container">
        <Sort sortType="rentals" handleSort={this.handleSort} />
        <div className="rentals-section-content">
          {this.state.listings.length !== 0 ? (
            <ul>{this.makeRentalListings()}</ul>
          ) : (
            <p id="rentals-section-error">{this.state.error}</p>
          )}
        </div>
      </section>
    );
  }
}
