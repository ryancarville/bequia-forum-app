import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import "./JobPage.css";
import formatDate from "../../helpers/formatDate";
import DeleteButton from "../Buttons/deleteButton";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import EditButton from "../Buttons/Edit";
import JobListingForm from "../CreateJobListing/JobListingForm";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
import waveLoader from "../Icons/waveLoader";
class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.jobId,
      user_id: "",
      job_cat: "",
      title: "",
      location: "",
      description: "",
      employment: "",
      contact_name: "",
      contact_email: "",
      website: "",
      contact_phone: "",
      showEditPopUp: false,
      showDeletePopUp: false
    };
  }
  static contextType = ForumContext;
  resetState = () => {
    this.setState({
      user_id: "",
      job_cat: "",
      title: "",
      location: "",
      description: "",
      employment: "",
      contact_name: "",
      contact_email: "",
      website: "",
      contact_phone: ""
    });
  };
  handleJobCatagory = e => {
    this.setState({
      job_cat: e.target.value
    });
  };
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  };
  handleEmploymentType = e => {
    this.setState({
      employment: e.target.value
    });
  };
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  handleContactEmail = e => {
    this.setState({
      contact_email: e.target.value
    });
  };
  handleWebsite = e => {
    this.setState({ website: e.target.value });
  };
  handleContactPhone = e => {
    this.setState({
      contact_phone: e
    });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    const {
      id,
      user_id,
      job_cat,
      title,
      location,
      description,
      contact_name,
      contact_email,
      website,
      contact_phone,
      employment,
      date_posted
    } = this.state;
    const listingToUpdate = {
      id,
      user_id,
      job_cat,
      title,
      location,
      description,
      contact_name,
      contact_email,
      website,
      contact_phone,
      employment,
      date_posted
    };
    apiServices.editJobListing(listingToUpdate).then(() => {
      this.setState({
        showEditPopUp: !this.state.showEditPopUp
      });
    });
  };
  showEditPopUp = () => {
    this.setState({
      showEditPopUp: !this.state.showEditPopUp
    });
  };
  showDeletePopUp = () => {
    this.setState({
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  handleDelete = () => {
    const { id } = this.state;
    apiServices.deleteJobListing(id).then(() => {
      this.setState({
        rediect: true
      });
    });
  };
  componentDidMount() {
    this.context.verifyLoginOnReload();
    apiServices.getJobCatagories().then(cats => {
      this.setState({
        jobCats: cats
      });
    });
    var { jobId } = this.props.match.params;
    apiServices
      .getJobListingById(jobId)
      .then(listing => {
        console.log(listing);
        if (listing.error) {
          this.setState({
            error: listing.error
          });
        } else {
          this.setState(
            {
              user_id: listing.user_id,
              job_cat: listing.jobCat,
              title: listing.title,
              description: listing.description,
              location: listing.location,
              employment: listing.employment,
              contact_name: listing.contact_name,
              contact_email: listing.contact_email,
              contact_phone: listing.contact_phone,
              website: listing.website,
              date_posted: listing.dateposted,
              loaded: true
            },
            () => {
              console.log(this.state);
            }
          );
        }
      })
      .then(() => {
        if (this.context.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      });
  }
  componentWillUnmount() {
    this.setState({ loaded: false });
  }

  render() {
    if (this.state.rediect) {
      return <Redirect to={"/jobs"} />;
    }
    const j = this.state;

    return this.state.loaded ? (
      <section className="job-page-container">
        {this.state.showDeletePopUp ? (
          <DeletePopUp
            jobTitle={j.title}
            showDeletePopUp={this.showDeletePopUp}
            handleDelete={this.handleDelete}
          />
        ) : null}
        {this.state.showEditPopUp ? (
          <JobListingForm
            type={"edit"}
            state={this.state}
            handleJobCatagory={this.handleJobCatagory}
            handleTitle={this.handleTitle}
            handleEmploymentType={this.handleEmploymentType}
            handleDescription={this.handleDescription}
            handleLocation={this.handleLocation}
            handleContactName={this.handleContactName}
            handleContactEmail={this.handleContactEmail}
            handleWebsite={this.handleWebsite}
            handleContactPhone={this.handleContactPhone}
            resetState={this.resetState}
            showEditPopUp={this.showEditPopUp}
            handleSubmit={this.handleEditSubmit}
          />
        ) : (
          <div className="job-page-content">
            {this.state.loaded ? (
              <>
                <h3>{j.title}</h3>
                <p>
                  <i className="fas fa-business-time" samesite="none"></i>{" "}
                  {j.employment}
                </p>
                <p>
                  <i className="fas fa-map-marked-alt" samesite="none"></i>{" "}
                  {j.location}
                </p>
                <h4>Job Description</h4>
                <p>{j.description}</p>
                {j.contact_name || j.contact_phone || j.contact_email ? (
                  <div id='job-contact-info'>
                    {j.contact_name ? (
                      <p>
                        <i class="fas fa-user-tie"></i> {j.contact_name}
                      </p>
                    ) : null}

                    {j.contact_phone ? (
                      <p>
                        <i className="fas fa-mobile-alt" samesite="none"></i>{" "}
                        {formatPhoneNumberIntl(j.contact_phone)}
                      </p>
                    ) : null}
                    {j.website ? (
                      <>
                        <i className="fas fa-laptop" samesite="none"></i>
                        <a
                          href={j.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {j.website}
                        </a>
                      </>
                    ) : null}
                    {j.contact_email ? (
                      <>
                        <i className="fas fa-at"></i>{" "}
                        <a
                          href={`mailto: ${j.contact_email}?subject=New Enquiry from you post on Bequia Forum: ${j.title}`}
                        >
                          {j.contact_email}
                        </a>
                      </>
                    ) : null}
                  </div>
                ) : null}
                <p>Posted on: {formatDate(j.date_posted)}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <ForumContext.Consumer>
              {context =>
                this.state.loggedIn ? (
                  context.user.id === j.user_id ? (
                    <span>
                      <DeleteButton
                        id={j.id}
                        showDeletePopUp={this.showDeletePopUp}
                      />{" "}
                      <EditButton
                        type={"job"}
                        showEditPopUp={this.showEditPopUp}
                      />
                    </span>
                  ) : null
                ) : null
              }
            </ForumContext.Consumer>
          </div>
        )}
      </section>
    ) : (
      waveLoader
    );
  }
}
export default withRouter(JobPage);
