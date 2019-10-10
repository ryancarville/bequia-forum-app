import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ShowJobListingPreview from './ShowJobListingPreview';
import './CreateJobListing.css';
import JobListingForm from './JobListingForm';
import ForumContext from '../../ForumContext';

export default class CreateJobListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: '',
			job_cat: '',
			title: '',
			location: '',
			description: '',
			employment: '',
			contact_name: '',
			contact_email: '',
			website: '',
			contact_phone: '',
			date_posted: new Date().toISOString().slice(0, 10),
			showPreview: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			user_id: '',
			job_cat: '',
			title: '',
			location: '',
			description: '',
			employment: '',
			contact_name: null,
			contact_email: null,
			website: null,
			contact_phone: null,
			showPreview: false
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
	handleShowPreview = e => {
		e.preventDefault();
		this.setState({
			showPreview: !this.state.showPreview
		});
	};
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
		this.context.createJobListing(newListing);
		this.setState({
			success: true
		});
	};
	goBack = e => {
		this.props.history.goBack();
	};
	componentDidMount() {
		this.setState({
			user_id: this.context.user.id
		});
	}

	render() {
		if (this.state.success) {
			const { job_cat } = this.state;
			return <Redirect to={`/jobs/${job_cat}`} />;
		}
		return (
			<section className='create-job-lisitng-container'>
				{' '}
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
