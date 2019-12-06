import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import "./MarketPlaceSection.css";
import Truncate from "react-truncate";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";
//market place section component
export default class MarketPlaceSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      error: null
    };
  }
  //handle sort
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
    window.scroll(0, 0);
    const { marketPlaceId } = this.props.match.params;
    apiServices
      .getMarketPlacePostsByCat(marketPlaceId)
      .then(listings => {
        if (listings.error) {
          this.setState({
            error: listings.error
          });
        } else {
          this.setState({
            listings: listings
          });
        }
      })
      .then(() => {
        apiServices.getMarketPlaceCatagories().then(cats => {
          const currCat = cats.filter(c => c.id.toString() === marketPlaceId);
          this.setState({
            market_place_name: currCat[0].name
          });
        });
      });
  }
  //make all listings for section
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
          className="post-teaser"
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
          {l.price && l.price !== "0" ? (
            <p>
              <i
                className="fas fa-dollar-sign"
                samesite="none"
                secure="true"
              ></i>{" "}
              {l.price}
            </p>
          ) : null}
          {l.location ? (
            <p>
              <i
                className="fas fa-map-marked-alt"
                samesite="none"
                secure="true"
              ></i>{" "}
              {l.location}
            </p>
          ) : null}
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
        <header>
          {this.state.market_place_name ? (
            <h4>{this.state.market_place_name}</h4>
          ) : null}
        </header>
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
