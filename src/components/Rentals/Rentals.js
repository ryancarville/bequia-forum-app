import React, { Component } from 'react';

import './Rentals.css';
import { Link } from 'react-router-dom';
import TokenService from '../../services/TokenServices';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import apiServices from '../../services/apiServices';

export default class Rentals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catagories: []
		};
	}
	componentDidMount() {
		apiServices.getRentalCatagories().then(cats => {
			if (!cats) {
				this.setState({
					error: cats.error
				});
			} else {
				this.setState({ catagories: cats });
			}
		});
	}
	makeCatagories = () => {
		return this.state.catagories.map(r => (
			<Link key={r.id} to={`/rentals/${r.id}`} className='rentals-card'>
				<img src={r.img_path} alt={r.name} className='rental-cat-img' />
				<span className='rentals-card-text'>{r.name}</span>
			</Link>
		));
	};
	render() {
		return (
			<section className='rentals-container'>
				<span>
					<h2>Rentals</h2>
					{TokenService.getAuthToken() ? (
						<CreateContentButton forumType='rentals' />
					) : null}
				</span>
				<div className='rentals-content'>
					{this.state.catagories ? (
						this.makeCatagories()
					) : (
						<p>{this.state.error}</p>
					)}
				</div>
			</section>
		);
	}
}
