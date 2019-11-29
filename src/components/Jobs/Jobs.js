import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiSevices from "../../services/apiServices";
import TokenService from "../../services/TokenServices";
import "./Jobs.css";

export default class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagories: []
    };
  }
  makeCatagories = () => {
    return this.state.catagories.map(j => (
      <div className="job-card" key={j.id}>
        <Link to={`/jobs/${j.id}`}>
          <img
            className="job-cat-icon"
            src={j.img_url}
            alt={j.name + "-icon"}
          />
          <h3>{j.name}</h3>
          <p>{j.description}</p>
        </Link>
      </div>
    ));
  };
  componentDidMount() {
    apiSevices.getJobCatagories().then(cats => {
      if (cats.error) {
        this.setState({
          error: cats.error
        });
      } else {
        this.setState({
          catagories: cats
        });
      }
    });
  }

  render() {
    return (
      <>
        <section className="jobs-container">
          <div>
            <h2>Jobs</h2>
            {TokenService.getAuthToken() ? (
              <span className="create-post-button">
                <Link to={"/createJobListing"} id="create-job-listing-button">
                  <i className="fas fa-plus" samesite="none" secure="true"></i>
                  Listing
                </Link>
              </span>
            ) : null}
          </div>
          <div className="jobs-content">
            {this.state.catagories.length !== 0 ? (
              this.makeCatagories()
            ) : (
              <p>{this.state.error}</p>
            )}
          </div>
        </section>
      </>
    );
  }
}
