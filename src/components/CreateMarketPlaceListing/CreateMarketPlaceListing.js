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
			userId: null,
			id: Math.floor(Math.random() * 10000000),
			marketPlaceId: null,
			title: '',
			description: '',
			price: null,
			location: null,
			contact: {
				name: '',
				email: '',
				phone: ''
			},
			date: new Date().toISOString().slice(0, 10),
			showPreview: false,
			success: false
		};
	}
	static contextType = ForumContext;
	resetState = () => {
		this.setState({
			marketPlaceId: '',
			title: '',
			description: '',
			price: null,
			location: '',
			contact: {
				name: '',
				email: '',
				phone: ''
			}
		});
	};
	handleMarketPlaceCat = e => {
		this.setState({
			marketPlaceId: e.target.value
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
	handleSubmit = () => {
		const {
			id,
			marketPlaceId,
			title,
			description,
			price,
			location,
			contact,
			date
		} = this.state;
		const newListing = {
			id,
			marketPlaceId,
			title,
			description,
			price,
			location,
			contact,
			date
		};
		this.context.createMarketPlaceListing(newListing);
		this.setState({
			success: true
		});
	};
	goBack = () => {
		this.props.history.goBack();
	};
	render() {
		if (this.state.success) {
			const mpId = this.state.marketPlaceId;
			return <Redirect to={`/marketPlace/${mpId}`} />;
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
