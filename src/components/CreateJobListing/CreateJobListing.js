import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ShowJobListingPreview from "./ShowJobListingPreview";
import "./CreateJobListing.css";
import JobListingForm from "./JobListingForm";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
//create job listing
export default class CreateJobListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobCats: [],
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
      date_posted: new Date().toISOString().slice(0, 10),
      showPreview: false
    };
  }
  static contextType = ForumContext;
  //reset form
  resetState = () => {
    this.setState({
      user_id: "",
      job_cat: "",
      title: "",
      location: "",
      description: "",
      employment: "",
      contact_name: null,
      contact_email: null,
      website: null,
      contact_phone: null,
      showPreview: false
    });
  };
  //handle catagory
  handleJobCatagory = e => {
    this.setState({
      job_cat: e.target.value
    });
  };
  //handle title
  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
  //handle location
  handleLocation = e => {
    this.setState({
      location: e.target.value
    });
  };
  //handle employmnet type
  handleEmploymentType = e => {
    this.setState({
      employment: e.target.value
    });
  };
  //handle descripton
  handleDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  //handle contact name
  handleContactName = e => {
    this.setState({
      contact_name: e.target.value
    });
  };
  //handle contact email
  handleContactEmail = e => {
    this.setState({
      contact_email: e.target.value
    });
  };
  //handle website
  handleWebsite = e => {
    this.setState({ website: e.target.value });
  };
  //handle contact phone
  handleContactPhone = e => {
    this.setState({
      contact_phone: e
    });
  };
  //handle preview
  handleShowPreview = e => {
    e.preventDefault();
    this.setState({
      showPreview: !this.state.showPreview
    });
  };
  //handle submit
  handleSubmit = e => {
    const {
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
    const newListing = {
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
    apiServices.addJobListing(newListing).then(() => {
      this.setState({
        success: true
      });
    });
  };
  //handle back
  goBack = e => {
    this.props.history.goBack();
  };
  componentDidMount() {
    window.scroll(0, 0);
    apiServices.getJobCatagories().then(cats => {
      this.setState({
        user_id: this.context.user.id,
        jobCats: cats
      });
    });
  }

  render() {
    if (this.state.success) {
      const { job_cat } = this.state;
      return <Redirect to={`/jobs/${job_cat}`} />;
    }
    return (
      <section className="create-job-lisitng-container">
        {" "}
        {this.state.showPreview ? (
          <ShowJobListingPreview
            state={this.state}
            goBack={this.showPreview}
            handleShowPreview={this.handleShowPreview}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <JobListingForm
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
            handleSubmit={this.handleShowPreview}
            resetState={this.resetState}
            goBack={this.goBack}
          />
        )}
      </section>
    );
  }
}
