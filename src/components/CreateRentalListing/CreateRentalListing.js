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
			rentalcat: '',
			userid: '',
			title: '',
			description: '',
			location: '',
			price: '',
			contactname: '',
			contactemail: '',
			contactphone: '',
			showAirbnb: false,
			airbnb: 'https://www.airbnb.com/',
			showHomeAway: false,
			homeaway: 'https://www.homeaway.com/',
			showBooking_com: false,
			bookingdotcom: 'https://www.booking.com/',
			showOther: false,
			othersite: 'https://www.your-site-here.com',
			dateposted: new Date().toISOString().slice(0, 10),
			showPreview: false,
			sucess: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			rentalcat: '',
			userid: '',
			title: '',
			description: '',
			location: '',
			price: '',
			contactname: '',
			contactemail: '',
			contactphone: '',
			showAirbnb: false,
			airbnb: 'https://www.airbnb.com/',
			showHomeAway: false,
			homeaway: 'https://www.homeaway.com/',
			showBooking_com: false,
			bookingcom: 'https://www.booking.com/',
			showOther: false,
			othersite: 'https://www.your-site.com',
			dateposted: new Date().toISOString().slice(0, 10),
			showPreview: false,
			sucess: false
		});
	};
	handleRentalType = e => {
		this.setState({
			rentalcat: e.target.value
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
	handleLocation = e => {
		this.setState({ location: e.target.value });
	};
	handlePrice = e => {
		this.setState({
			price: e.target.value
		});
	};
	handleAirbnb = e => {
		this.setState({
			airbnb: e.target.value
		});
	};
	handleHomeAway = e => {
		this.setState({
			homeaway: e.target.value
		});
	};
	handleBooking_com = e => {
		this.setState({
			bookingcom: e.target.value
		});
	};
	handleOtherSite = e => {
		this.setState({
			othersite: e.target.value
		});
	};
	handleShowAirBnbSiteInput = e => {
		this.setState({
			showAirbnb: !this.state.showAirbnb
		});
	};
	handleShowHomeAwaySiteInput = e => {
		this.setState({
			showHomeAway: !this.state.showHomeAway
		});
	};
	handleShowBookingSiteInput = e => {
		this.setState({
			showBooking_com: !this.state.showBooking_com
		});
	};
	handleShowOtherSiteInput = e => {
		this.setState({
			showOther: !this.state.showOther
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
		var airbnb = '';
		var homeaway = '';
		var bookingdotcom = '';
		var othersite = '';
		if (this.state.showAirbnb) {
			airbnb = this.state.airbnb;
		}
		if (this.state.showHomeaway) {
			homeaway = this.state.homeaway;
		}
		if (this.state.showBooking_com) {
			bookingdotcom = this.state.bookingdotcom;
		}
		if (this.state.showOther) {
			othersite = this.state.othersite;
		}

		const {
			rentalcat,
			userid,
			title,
			description,
			location,
			price,
			contactname,
			contactemail,
			contactphone,
			dateposted
		} = this.state;
		const newRentalListing = {
			rentalcat,
			userid,
			title,
			description,
			location,
			price,
			contactname,
			contactemail,
			contactphone,
			airbnb,
			homeaway,
			bookingdotcom,
			othersite,
			dateposted
		};
		this.context.createRentalListing(newRentalListing);
		this.setState({
			sucess: true
		});
	};
	goBack = () => {
		this.props.history.goBack();
	};
	componentDidMount() {
		this.setState({
			userid: this.context.user.id
		});
	}

	render() {
		if (this.state.sucess) {
			const { rentalcat } = this.state;
			return <Redirect to={`/rentals/${rentalcat}`} />;
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
						handleLocation={this.handleLocation}
						handlePrice={this.handlePrice}
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
