import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ListingBody from './ListingBody';
import RentalForm from '../CreateRentalListing/RentalForm';
import './RentalPage.css';
import ForumContext from '../../ForumContext';
import TokenServices from '../../services/TokenServices';
import DeleteButton from '../Buttons/deleteButton';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import EditButton from '../Buttons/Edit';
export default class RentalPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			rentalcat: '',
			userid: '',
			title: '',
			description: '',
			location: '',
			price: '',
			contactname: '',
			contactemail: '',
			contactphone: '',
			airbnb: '',
			homeaway: '',
			bookingdotcom: '',
			othersite: '',
			dateposted: new Date().toISOString(),
			showEditPopUp: false,
			showDeletePopUp: false,
			showAirbnb: false,
			showHomeAway: false,
			showBooking_com: false,
			showOther: false
		};
	}
	static contextType = ForumContext;
	showEditPopUp = () => {
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
		});
	};
	showDeletePopUp = () => {
		this.setState({ showDeletePopUp: !this.state.showDeletePopUp });
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
		e.preventDefault();
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
			id,
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
		const listingToUpdate = {
			id,
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
		this.context.editRentalListing(listingToUpdate);
		this.setState({
			showEditPopUp: !this.state.showEditPopUp
		});
	};
	handleDelete = () => {
		const { id } = this.state;
		this.context.deleteRentalListing(id);
		this.setState({
			redirect: true
		});
	};

	componentDidMount() {
		var r = this.context.state.rentalPosts.filter(
			p => p.id === this.props.location.state.id
		);
		r = r[0];
		console.log(r);
		this.setState({
			id: r.id,
			rentalcat: r.rentalcat,
			userid: r.userid,
			title: r.title,
			description: r.description,
			location: r.location,
			price: r.price,
			contactname: r.contactname,
			contactemail: r.contactemail,
			contactphone: r.contactphone,
			airbnb: r.airbnb,
			homeaway: r.homeaway,
			bookingdotcom: r.bookingdotcom,
			othersite: r.othersite,
			dateposted: r.dateposted
		});
	}
	render() {
		if (this.state.redirect) {
			return <Redirect to={'/rentals'} />;
		}
		return (
			<section className='rental-page-container'>
				<div className='rental-page-content'>
					{this.state.showDeletePopUp ? (
						<DeletePopUp
							rentalTitle={this.state.title}
							showDeletePopUp={this.showDeletePopUp}
							handleDelete={this.handleDelete}
						/>
					) : null}
					{this.state.showEditPopUp ? (
						<RentalForm
							type={'edit'}
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
							handleShowPreview={this.handleSubmit}
							resetState={this.resetState}
							goBack={this.goBack}
						/>
					) : (
						<ListingBody state={this.state} />
					)}
					{TokenServices.getAuthToken() ? (
						this.context.user.id === this.state.userid ? (
							<DeleteButton showDeletePopUp={this.showDeletePopUp} />
						) : null
					) : null}
					{TokenServices.getAuthToken() ? (
						this.context.user.id === this.state.userid ? (
							<EditButton type={'rental'} showEditPopUp={this.showEditPopUp} />
						) : null
					) : null}
				</div>
			</section>
		);
	}
}
