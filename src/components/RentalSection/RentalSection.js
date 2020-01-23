import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import ToolBar from "../ToolBar/ToolBar";
import "./RentalSection.css";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
//rentals section component
export default class RentalSection extends Component {
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

  //make all rental listings for section
  makeRentalListings = listings => {
    return listings.map(r => (
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
  componentDidMount() {
    window.scroll(0, 0);
    const { rental_cat } = this.props.match.params;
    apiServices
      .getRentalCatagories()
      .then(cats => {
        const rental_cat_title = cats.filter(
          c => c.id.toString() === rental_cat
        );
        this.setState({
          rentalCats: cats,
          rental_cat_title: rental_cat_title[0].name
        });
      })
      .then(() => {
        apiServices.getRentalListings(rental_cat).then(listings => {
          if (listings.error) {
            this.setState({ error: listings.error });
          }
          this.setState({
            listings: listings,
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
    const { listings, currentListings } = this.state;
    const totalPosts = listings.length;
    if (totalPosts === 0) return null;
    return this.state.error !== null ? (
      <section className="rentals-section-container">
        <header>
          <h3>
            {this.state.rental_cat_title ? this.state.rental_cat_title : null}
          </h3>
        </header>
        <article>
          <p style={{ textAlign: "center" }}>
            <strong>{this.state.error}</strong>
          </p>
        </article>
      </section>
    ) : this.state.dataLoaded ? (
      <section className="rentals-section-container">
        <header>
          <h3>
            {this.state.rental_cat_title ? this.state.rental_cat_title : null}
          </h3>
          <ToolBar
            currentPosts={currentListings}
            posts={listings}
            handleCurrentPosts={this.handleCurrentPosts}
            handleSort={this.handleSort}
          />
        </header>
        <div className="rentals-section-content">
          <ul>{this.makeRentalListings(currentListings)}</ul>
        </div>
      </section>
    ) : (
      waveLoader
    );
  }
}
