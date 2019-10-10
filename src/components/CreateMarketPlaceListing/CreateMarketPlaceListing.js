import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ShowMarketPlaceListingPreview from './ShowMarketPlaceListingPreview';
import MarketPlaceListingForm from './MarketPlaceListingForm';
import './CreateMarketPlaceListing.css';
import ForumContext from '../../ForumContext';

export default class CreateMarketPlaceListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: '',
			market_place_cat: '',
			title: '',
			description: '',
			price: '',
			location: '',
			contact_name: '',
			contact_email: '',
			contact_phone: '',
			date_posted: new Date().toISOString().slice(0, 10),
			showPreview: false,
			success: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			user_id: '',
			market_place_cat: '',
			title: '',
			description: '',
			price: '',
			location: '',
			contact_name: '',
			contact_email: '',
			contact_phone: ''
		});
	};
	handleMarketPlaceCat = e => {
		this.setState({
			market_place_cat: e.target.value
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
		this.setState({
			location: e.target.value
		});
	};
	handlePrice = e => {
		this.setState({
			price: e.target.value
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
		e.preventDefault();
		const {
			user_id,
			market_place_cat,
			title,
			description,
			price,
			location,
			contact_name,
			contact_email,
			contact_phone,
			date_posted
		} = this.state;
		const newListing = {
			user_id,
			market_place_cat,
			title,
			description,
			price,
			location,
			contact_name,
			contact_email,
			contact_phone,
			date_posted
		};
		this.context.createMarketPlaceListing(newListing);
		this.setState({
			success: true
		});
	};
	goBack = () => {
		this.props.history.goBack();
	};
	componentDidMount() {
		this.setState({
			user_id: this.context.user.id
		});
	}

	render() {
		if (this.state.success) {
			const id = this.state.market_place_cat;
			return <Redirect to={`/marketPlace/${id}`} />;
		}
		return (
			<section className='create-mp-listing-container'>
				<div className='create-job-lisitng-content'>
					{this.state.showPreview ? (
						<ShowMarketPlaceListingPreview
							state={this.state}
							handleShowPreview={this.handleShowPreview}
							handleSubmit={this.handleSubmit}
							goBack={this.goBack}
						/>
					) : (
						<MarketPlaceListingForm
							state={this.state}
							handleMarketPlaceCat={this.handleMarketPlaceCat}
							handleTitle={this.handleTitle}
							handleLocation={this.handleLocation}
							handleDescription={this.handleDescription}
							handlePrice={this.handlePrice}
							handleContactName={this.handleContactName}
							handleContactEmail={this.handleContactEmail}
							handleContactPhone={this.handleContactPhone}
							handleShowPreview={this.handleShowPreview}
							resetState={this.resetState}
							goBack={this.goBack}
						/>
					)}
				</div>
			</section>
		);
	}
}
