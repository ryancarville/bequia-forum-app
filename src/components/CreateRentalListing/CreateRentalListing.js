import React, { Component } from 'react';
import './CreateRentalListing.css';
import { Redirect } from 'react-router-dom';
import RentalForm from './RentalForm';
import ShowRentalPreview from './ShowRentalPreview';
import ForumContext from '../../ForumContext';

export default class CreateRentalListings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rentalTypeId: null,
			id: Math.floor(Math.random() * 1000000),
			title: '',
			description: '',
			contact: {
				name: '',
				email: '',
				phone: ''
			},
			date: new Date().toISOString().slice(0, 10),
			airbnb: false,
			airbnbSite: 'https://www.airbnb.com/',
			homeAway: false,
			homeAwaySite: 'https://www.homeaway.com/',
			booking_com: false,
			booking_comSite: 'https://www.booking.com/',
			other: false,
			otherSite: 'https://www.your-site.com',
			showPreview: false,
			sucess: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			rentalTypeId: null,
			id: Math.floor(Math.random() * 1000000),
			title: '',
			description: '',
			contact: {
				name: '',
				email: '',
				phone: ''
			},
			date: new Date().toISOString().slice(0, 10),
			airbnb: false,
			airbnbSite: 'https://www.airbnb.com/',
			homeAway: false,
			homeAwaySite: 'https://www.homeaway.com/',
			booking_com: false,
			booking_comSite: 'https://www.booking.com/',
			other: false,
			otherSite: 'https://www.your-site.com',
			showPreview: false,
			sucess: false
		});
	};
	handleRentalType = e => {
		this.setState({
			rentalTypeId: e.target.value
		});
	};
	handleTitle = e => {
		this.setState({
			title: e.target.value
		});
	};
	handleDescription = e => {
		this.setState({
			description: e.target.value
		});
	};
	handleAirbnb = e => {
		this.setState({
			airbnbSite: e.target.value
		});
	};
	handleHomeAway = e => {
		this.setState({
			homeAwaySite: e.target.value
		});
	};
	handleBooking_com = e => {
		this.setState({
			booking_comSite: e.target.value
		});
	};
	handleOtherSite = e => {
		this.setState({
			otherSite: e.target.value
		});
	};
	handleShowAirBnbSiteInput = e => {
		this.setState({
			airbnb: !this.state.airbnb
		});
	};
	handleShowHomeAwaySiteInput = e => {
		this.setState({
			homeAway: !this.state.homeAway
		});
	};
	handleShowBookingSiteInput = e => {
		this.setState({
			booking_com: !this.state.booking_com
		});
	};
	handleShowOtherSiteInput = e => {
		this.setState({
			other: !this.state.other
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
		var airbnbSite = '';
		var homeAwaySite = '';
		var booking_comSite = '';
		var otherSite = '';
		if (this.state.airbnb) {
			airbnbSite = this.state.airbnbSite;
		}
		if (this.state.homeAway) {
			homeAwaySite = this.state.homeAwaySite;
		}
		if (this.state.booking_com) {
			booking_comSite = this.state.booking_comSite;
		}
		if (this.state.other) {
			otherSite = this.state.otherSite;
		}

		const { id, rentalTypeId, title, description, contact, date } = this.state;
		const newRentalListing = {
			id,
			rentalTypeId,
			title,
			description,
			contact,
			bookingSites: [
				{ title: 'AirBnb', site: airbnbSite },
				{ title: 'HomeAway', site: homeAwaySite },
				{ title: 'Booking.com', site: booking_comSite },
				{ title: 'Other Site', site: otherSite }
			],
			date
		};
		this.context.createRentalListing(newRentalListing);
		this.setState({
			sucess: true
		});
	};
	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		if (this.state.sucess) {
			const { rentalTypeId } = this.state;

			return (
				<Redirect
					to={{
						pathname: `/rentals/${rentalTypeId}`
					}}
				/>
			);
		}
		return (
			<section>
				{this.state.showPreview ? (
					<ShowRentalPreview
						state={this.state}
						handleShowPreview={this.handleShowPreview}
						goBack={this.goBack}
						handleSubmit={this.handleSubmit}
					/>
				) : (
					<RentalForm
						state={this.state}
						handleRentalType={this.handleRentalType}
						handleTitle={this.handleTitle}
						handleDescription={this.handleDescription}
						handleShowAirBnbSiteInput={this.handleShowAirBnbSiteInput}
						handleShowHomeAwaySiteInput={this.handleShowHomeAwaySiteInput}
						handleShowBookingSiteInput={this.handleShowBookingSiteInput}
						handleShowOtherSiteInput={this.handleShowOtherSiteInput}
						handleAirbnb={this.handleAirbnb}
						handleHomeAway={this.handleHomeAway}
						handleBooking_com={this.handleBooking_com}
						handleOtherSite={this.handleOtherSite}
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
