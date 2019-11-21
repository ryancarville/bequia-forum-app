import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import "./MarketPlaceSection.css";
import Truncate from "react-truncate";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";

export default class MarketPlaceSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      error: null
    };
  }
  handleSort = sort => {
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
    const { marketPlaceId } = this.props.match.params;
    apiServices.getMarketPlacePostsByCat(marketPlaceId).then(listings => {
      console.log(listings.error);
      if (listings.error) {
        this.setState({
          error: listings.error
        });
      } else {
        this.setState({
          listings: listings
        });
      }
    });
  }
  makeListings = () => {
    return this.state.listings.map(l => (
      <li key={l.id}>
        <Link
          to={{
            pathname: `/marketPlace/${l.market_place_cat}/${l.id}`,
            state: { id: l.id }
          }}
        >
          <h4>{l.title}</h4>
        </Link>
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...
              <Link
                to={{
                  pathname: `/marketPlace/${l.market_place_cat}/${l.id}`,
                  state: { id: l.id }
                }}
              >
                Read more
              </Link>
            </span>
          }
        >
          <p>{l.description}</p>
        </Truncate>
        <span className="post-info">
          {l.price ? <p>Price: {l.price}</p> : null}
          {l.location ? <p>Location: {l.location}</p> : null}
          <p>Posted By: {l.contact_name}</p>
          <p>Posted On: {formatDate(l.date_posted)}</p>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <section className="market-place-section-container">
        <Sort sortType="marketPlace" handleSort={this.handleSort} />
        <div className="market-place-section-content">
          {this.state.listings.length !== 0 ? (
            <ul>{this.makeListings()}</ul>
          ) : (
            <p id="mp-section-error">{this.state.error}</p>
          )}
        </div>
      </section>
    );
  }
}
