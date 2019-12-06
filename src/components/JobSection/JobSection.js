import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import "./JobSection.css";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";
//job section component
export default class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: []
    };
  }
  //get all job listings for section
  makeListings = () => {
    return this.state.listings.map(j => (
      <li key={j.id}>
        <Link to={`/jobs/${j.job_cat}/${j.id}`}>
          <h3>{j.title}</h3>
        </Link>
        <Truncate
          className="post-teaser"
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
        if (sort.sortType === "asc" && sort.column === "location") {
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
        if (sort.sortType === "Full Time" && sort.column === "employment") {
          const sorted = this.state.listings.filter(
            listing => listing.employment === "Full Time"
          );
          this.setState({
            listings: sorted
          });
          return;
        }
        if (sort.sortType === "Part Time" && sort.column === "employment") {
          const sorted = this.state.listings.filter(
            listing => listing.employment === "Part Time"
          );
          this.setState({
            listings: sorted
          });
          return;
        }
        if (sort.sortType === "Contract" && sort.column === "employment") {
          const sorted = this.state.listings.filter(
            listing => listing.employment === "Contract"
          );
          this.setState({
            listings: sorted
          });
          return;
        }
        if (sort.sortType === "Seasonal" && sort.column === "employment") {
          const sorted = this.state.listings.filter(
            listing => listing.employment === "Seasonal"
          );
          this.setState({
            listings: sorted
          });
          return;
        }
      });
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
        <h3 id="job-section-cat-title">
          {this.state.cat_name ? this.state.cat_name : null}
        </h3>
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
