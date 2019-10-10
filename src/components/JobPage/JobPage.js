import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './JobPage.css';
import formatDate from '../../helpers/formatDate';
import TokenServices from '../../services/TokenServices';
import DeleteButton from '../Buttons/deleteButton';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import EditButton from '../Buttons/Edit';
import JobListingForm from '../CreateJobListing/JobListingForm';
import ForumContext from '../../ForumContext';

export default class JobPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.location.state.id,
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
			showEditPopUp: false,
			showDeletePopUp: false
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
			contact_name: '',
			contact_email: '',
			website: '',
			contact_phone: ''
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
		this.context.editJobListing(listingToUpdate);
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
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
		this.context.deleteJobListing(id);
		this.setState({
			rediect: true
		});
	};
	componentWillMount() {
		const { id } = this.state;
		const currJob = this.context.state.jobPosts.filter(j => j.id === id);
		this.setState({
			user_id: this.context.user.id,
			job_cat: currJob[0].job_cat,
			title: currJob[0].title,
			description: currJob[0].description,
			location: currJob[0].location,
			employment: currJob[0].employment,
			contact_name: currJob[0].contact_name,
			contact_email: currJob[0].contact_email,
			contact_phone: currJob[0].contact_phone,
			website: currJob[0].website,
			date_posted: currJob[0].date_posted
		});
	}

	render() {
		if (this.state.rediect) {
			return <Redirect to={'/jobs'} />;
		}
		const j = this.state;

		return (
			<section className='job-page-container'>
				{this.state.showDeletePopUp ? (
					<DeletePopUp
						jobTitle={j.title}
						showDeletePopUp={this.showDeletePopUp}
						handleDelete={this.handleDelete}
					/>
				) : null}
				{this.state.showEditPopUp ? (
					<JobListingForm
						type={'edit'}
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
					<div className='job-page-content'>
						<h3>{j.title}</h3>
						<p>Employment Type: {j.employment}</p>

						<p>Where: {j.location}</p>
						<h4>Job Description</h4>
						<p>{j.description}</p>
						<span>
							<h4>Contact Information</h4>
							<p>{j.contact_name}</p>
							<a
								href={`mailto: ${j.contact_email}?subject=New Enquiry from you post on Bequia Forum: ${j.title}`}>
								{j.contact_email}
							</a>
							{j.contactphone ? (
								<p>Phone: {formatPhoneNumberIntl(j.contact_phone)}</p>
							) : null}
							<a href={j.website} target='_blank' rel='noopener noreferrer'>
								{j.website}
							</a>
						</span>
						<p>Posted on: {formatDate(j.date_posted)}</p>
					</div>
				)}
				{!this.state.showDeletePopUp ? (
					TokenServices.getAuthToken() ? (
						<DeleteButton id={j.id} showDeletePopUp={this.showDeletePopUp} />
					) : null
				) : null}
				{TokenServices.getAuthToken() ? (
					<EditButton type={'job'} showEditPopUp={this.showEditPopUp} />
				) : null}
			</section>
		);
	}
}
