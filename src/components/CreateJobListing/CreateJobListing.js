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
			id: Math.floor(Math.random() * 1000000),
			jobTypeId: '',
			title: '',
			location: '',
			description: '',
			employment: '',
			contact: {
				name: '',
				email: '',
				phone: ''
			},
			date: new Date().toISOString().slice(0, 10),
			showPreview: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			jobTypeId: null,
			title: '',
			location: '',
			description: '',
			fullTime: false,
			partTime: false,
			contract: false,
			seasonal: false,
			contact: {
				name: '',
				email: '',
				phone: ''
			},
			date: new Date().toISOString().slice(0, 10),
			showPreview: false
		});
	};
	handleJobCatagory = e => {
		this.setState({
			jobTypeId: e.target.value
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
			contact: {
				name: e.target.value,
				email: this.state.contact.email,
				phone: this.state.contact.phone
			}
		});
	};
	handleContactEmail = e => {
		this.setState({
			contact: {
				name: this.state.contact.name,
				email: e.target.value,
				phone: this.state.contact.phone
			}
		});
	};
	handleContactPhone = e => {
		this.setState({
			contact: {
				name: this.state.contact.name,
				email: this.state.contact.email,
				phone: e
			}
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
			id,
			jobTypeId,
			title,
			location,
			description,
			contact,
			employment,
			date
		} = this.state;
		const newListing = {
			id,
			jobTypeId,
			title,
			location,
			description,
			contact,
			employment,
			date
		};
		this.context.createJobListing(newListing);
		this.setState({
			success: true
		});
	};
	goBack = e => {
		this.props.history.goBack();
	};
	render() {
		if (this.state.success) {
			const { jobTypeId } = this.state;
			return <Redirect to={`/jobs/${jobTypeId}`} />;
		}
		return (
			<section className='create-job-lisitng-container'>
				{' '}
				{this.state.showPreview ? (
					<ShowJobListingPreview
						state={this.state}
						goBack={this.goBack}
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
						handleContactPhone={this.handleContactPhone}
						handleShowPreview={this.handleShowPreview}
						resetState={this.resetState}
						goBack={this.goBack}
					/>
				)}
			</section>
		);
	}
}
