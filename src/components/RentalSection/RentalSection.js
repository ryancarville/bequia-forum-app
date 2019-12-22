import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import Paginator from "../Paginator/Paginator";
import "./RentalSection.css";
import Sort from "../Sort/Sort";
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
  onPageChanged = data => {
    const { listings } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentListings = listings.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentListings, totalPages });
  };

  handlePageLimit = e => {
    this.setState(
      {
        pageLimit: parseInt(e.target.value)
      },
      () => {
        if (this.state.pageLimit >= this.state.listings.length) {
          const paginationData = {
            currentPage: 1,
            totalPages: 1,
            pageLimit: this.state.pageLimit,
            totalRecords: this.state.posts.length
          };
          this.onPageChanged(paginationData);
        } else {
          const paginationData = {
            currentPage: this.state.currentPage,
            totalPages: this.state.totalPages,
            pageLimit: this.state.pageLimit,
            totalRecords: this.state.posts.length
          };
          this.onPageChanged(paginationData);
        }
      }
    );
  };

  paginatorScroll = () => {
    if (window.scrollY > 140) {
      this.setState({
        paginatorScroll: "paginator-wrapper paginator-wrapper-fixed"
      });
    } else {
      this.setState({
        paginatorScroll: "paginator-wrapper"
      });
    }
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

  render() {
    const { listings, currentListings, currentPage, totalPages } = this.state;
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
          <div className={this.state.paginatorScroll}>
            <Sort sortType="rentals" handleSort={this.handleSort} />
            <select
              className="num-post-results"
              onChange={this.handlePageLimit}
            >
              <option selected disabled value="">
                Posts per page
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <Paginator
              totalRecords={totalPosts}
              pageLimit={this.state.pageLimit}
              pageNeighbours={this.state.pageNeighbours}
              onPageChanged={this.onPageChanged}
            />

            {currentPage && (
              <span className="paginator-current-page">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
            {totalPages && (
              <span className="paginator-total-results">
                {this.state.listings.length} <span>Results</span>{" "}
              </span>
            )}
          </div>
        </header>
        <div className="rentals-section-content">
          <ul>{this.makeRentalListings()}</ul>
        </div>
      </section>
    ) : (
      waveLoader
    );
  }
}
