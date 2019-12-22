import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import Paginator from "../Paginator/Paginator";
import "./JobSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";
//job section component
export default class JobPage extends Component {
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
  //get all job listings for section
  makeListings = listings => {
    return listings.map(j => (
      <li key={j.id} className="post-card">
        <article className="post-card-info non-board-post">
          <span>
            <Link to={`/jobs/${j.job_cat}/${j.id}`}>
              <h3>{j.title}</h3>
            </Link>
            <Truncate
              className="post-teaser"
              lines={3}
              ellipsis={
                <span>
                  ...
                  <Link to={`/jobs/${j.job_cat}/${j.id}`}>Read more</Link>
                </span>
              }
            >
              <p>{j.description}</p>
            </Truncate>
          </span>
          <span className="post-card-user-info">
            {j.location ? <p>Location: {j.location}</p> : null}
            {j.employment ? <p>Employment: {j.employment}</p> : null}
            <p>Posted On: {formatDate(j.date_posted)}</p>
          </span>
        </article>
      </li>
    ));
  };
  //handle sort
  handleSort = sort => {
    const { job_cat } = this.props.match.params;
    apiServices
      .getJobListingsByCat(job_cat)
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
        if (sort.sortType === "asc" && sort.column === "title") {
          const sorted = this.state.currentListings.sort(function(a, b) {
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
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "desc" && sort.column === "title") {
          const sorted = this.state.currentListings.sort(function(a, b) {
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
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "asc" && sort.column === "location") {
          var sorted = this.state.currentListings.sort(function(a, b) {
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
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "desc" && sort.column === "location") {
          const sorted = this.state.currentListings.sort(function(a, b) {
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
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "Full Time" && sort.column === "employment") {
          const sorted = this.state.currentListings.filter(
            listing => listing.employment === "Full Time"
          );
          this.setState({
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "Part Time" && sort.column === "employment") {
          const sorted = this.state.currentListings.filter(
            listing => listing.employment === "Part Time"
          );
          this.setState({
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "Contract" && sort.column === "employment") {
          const sorted = this.state.currentListings.filter(
            listing => listing.employment === "Contract"
          );
          this.setState({
            currentListings: sorted
          });
          return;
        }
        if (sort.sortType === "Seasonal" && sort.column === "employment") {
          const sorted = this.state.currentListings.filter(
            listing => listing.employment === "Seasonal"
          );
          this.setState({
            currentListings: sorted
          });
          return;
        }
      });
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
    const { job_cat } = this.props.match.params;
    apiServices.getJobCatagories().then(cats => {
      const cat_name = cats.filter(c => c.id.toString() === job_cat);
      this.setState({
        cat_name: cat_name[0].name
      });
    });
    apiServices.getJobListingsByCat(job_cat).then(listings => {
      if (listings.error) {
        this.setState({
          error: listings.error
        });
      }
      this.setState({
        listings: listings
      });
    });
    window.addEventListener("scroll", () => this.paginatorScroll());
  }

  render() {
    const { listings, currentListings, currentPage, totalPages } = this.state;
    const totalPosts = listings.length;
    if (totalPosts === 0) return null;
    return this.state.error !== null ? (
      <section className="job-section-container">
        <header>
          <h3 id="job-section-cat-title">
            {this.state.cat_name ? this.state.cat_name : null}
          </h3>
        </header>
        <article>
          <p style={{ textAlign: "center" }}>
            <strong>{this.state.error}</strong>
          </p>
        </article>
      </section>
    ) : (
      <section className="job-section-container">
        <header>
          <h3 id="job-section-cat-title">
            {this.state.cat_name ? this.state.cat_name : null}
          </h3>

          <div className={this.state.paginatorScroll}>
            <Sort sortType="jobs" handleSort={this.handleSort} />
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
        <div className="job-section-content">
          <ul className="job-section-ul">
            {this.makeListings(currentListings)}
          </ul>
        </div>
      </section>
    );
  }
}
