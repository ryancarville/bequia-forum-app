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
			userid: '',
			jobcat: '',
			title: '',
			location: '',
			description: '',
			employment: '',
			contactname: '',
			contactemail: '',
			website: '',
			contactphone: '',
			dateposted: new Date().toISOString().slice(0, 10),
			showPreview: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			userid: '',
			jobcat: '',
			title: '',
			location: '',
			description: '',
			employment: '',
			contactname: null,
			contactemail: null,
			website: null,
			contactphone: null,
			showPreview: false
		});
	};
	handleJobCatagory = e => {
		this.setState({
			jobcat: e.target.value
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
			contactname: e.target.value
		});
	};
	handleContactEmail = e => {
		this.setState({
			contactemail: e.target.value
		});
	};
	handleWebsite = e => {
		this.setState({ website: e.target.value });
	};
	handleContactPhone = e => {
		this.setState({
			contactphone: e
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
			userid,
			jobcat,
			title,
			location,
			description,
			contactname,
			contactemail,
			website,
			contactphone,
			employment,
			dateposted
		} = this.state;
		const newListing = {
			userid,
			jobcat,
			title,
			location,
			description,
			contactname,
			contactemail,
			website,
			contactphone,
			employment,
			dateposted
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
			userid: this.context.user.id
		});
	}

	render() {
		if (this.state.success) {
			const { jobcat } = this.state;
			return <Redirect to={`/jobs/${jobcat}`} />;
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
