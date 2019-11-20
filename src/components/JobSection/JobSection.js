import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import "./JobSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";

export default class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }

  makeListings = () => {
    return this.state.listings.map(j => (
      <li key={j.id}>
        <Link to={`/jobs/${j.job_cat}/${j.id}`}>
          <h3>{j.title}</h3>
        </Link>
        <Truncate
          lines={2}
          ellipsis={
            <span>
              ...
              <Link to={`/jobs/${j.job_cat}/${j.id}`}>Read more</Link>
            </span>
          }
        >
          <p>{j.description}</p>
        </Truncate>
        <span className="post-info">
          {j.location ? <p>Location: {j.location}</p> : null}
          {j.employment ? <p>Employment: {j.employment}</p> : null}
          <p>Posted On: {formatDate(j.date_posted)}</p>
        </span>
      </li>
    ));
  };
  handleSort = sort => {
    console.log(sort);
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
        } else if (
          sort.sortType === "Full Time" &&
          sort.column === "employment"
        ) {
          var sorted = this.state.listings.filter(
            listing => listing.employment === "Full Time"
          );
          this.setState({
            listings: sorted
          });
        } else if (
          sort.sortType === "Part Time" &&
          sort.column === "employment"
        ) {
          var sorted = this.state.listings.filter(
            listing => listing.employment === "Part Time"
          );
          this.setState({
            listings: sorted
          });
        } else if (
          sort.sortType === "Contract" &&
          sort.column === "employment"
        ) {
          var sorted = this.state.listings.filter(
            listing => listing.employment === "Contract"
          );
          this.setState({
            listings: sorted
          });
        } else if (
          sort.sortType === "Seasonal" &&
          sort.column === "employment"
        ) {
          var sorted = this.state.listings.filter(
            listing => listing.employment === "Seasonal"
          );
          this.setState({
            listings: sorted
          });
        }
      });
  };
  componentDidMount() {
    const { job_cat } = this.props.match.params;
    apiServices.getJobListingsByCat(job_cat).then(listings => {
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

  render() {
    return (
      <section className="job-section-container">
        <Sort sortType="jobs" handleSort={this.handleSort} />
        <div className="job-section-content">
          {this.state.listings.length !== 0 ? (
            <ul className="job-section-ul">{this.makeListings()}</ul>
          ) : (
            <p id="jobs-section-error">{this.state.error}</p>
          )}
        </div>
      </section>
    );
  }
}
