import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import ToolBar from "../ToolBar/ToolBar";
import "./MarketPlaceSection.css";
import Truncate from "react-truncate";
import apiServices from "../../services/apiServices";
//market place section component
export default class MarketPlaceSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      currentListings: [],
      currentPage: 1,
      totalPages: null,
      pageLimit: null,
      pageNeighbours: null,
      paginatorScroll: "paginator-wrapper",
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

  //make all listings for section
  makeListings = listings => {
    return listings.map(l => (
      <li key={l.id} className="post-card">
        <article className="post-card-info non-board-post">
          <span>
            <Link
              className="mp-card-title"
              to={{
                pathname: `/marketPlace/${l.market_place_cat}/${l.id}`,
                state: { id: l.id }
              }}
            >
              <h5>{l.title}</h5>
            </Link>
            <Truncate
              className="post-teaser"
              lines={3}
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
          </span>
          <span className="post-info">
            {l.price && l.price !== "0" ? (
              <p>
                <i className="fas fa-dollar-sign"></i> {l.price}
              </p>
            ) : null}
            {l.location ? (
              <p>
                <i className="fas fa-map-marked-alt"></i> {l.location}
              </p>
            ) : null}
            <p>Posted By: {l.contact_name}</p>
            <p>Posted On: {formatDate(l.date_posted)}</p>
          </span>
        </article>
      </li>
    ));
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
        }
        this.setState({
          listings: listings
        });
      })
      .then(() => {
        apiServices.getMarketPlaceCatagories().then(cats => {
          const currCat = cats.filter(c => c.id.toString() === marketPlaceId);
          this.setState({
            market_place_name: currCat[0].name,
            dataLoaded: true
          });
        });
      });
  }

  handleCurrentPosts = currentListings => {
    this.setState({
      currentListings
    });
  };
  render() {
    const {
      listings,
      currentListings,
      market_place_name,
      dataLoaded
    } = this.state;

    return !dataLoaded ? null : (
      <section className="market-place-section-container">
        <header>
          <h4>{market_place_name}</h4>
          <ToolBar
            currentPosts={currentListings}
            posts={listings}
            handleCurrentPosts={this.handleCurrentPosts}
            handleSort={this.handleSort}
          />
        </header>
        {this.state.error !== null ? (
          <article>
            <p style={{ textAlign: "center" }}>
              <strong>{this.state.error}</strong>
            </p>
          </article>
        ) : (
          <article className="market-place-section-content">
            <ul>{this.makeListings(currentListings)}</ul>
          </article>
        )}
      </section>
    );
  }
}
