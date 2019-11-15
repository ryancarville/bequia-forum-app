import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MarketPlace.css';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenService from '../../services/TokenServices';
import apiServices from '../../services/apiServices';

export default class MarketPlace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			catagories: []
		};
	}
	makeCatagories = () => {
		return this.state.catagories.map(mp => (
			<li key={mp.id} className='market-place-card'>
				<Link key={`link-${mp.id}`} to={`/marketPlace/${mp.id}`}>
					<img src={mp.img_path} alt={mp.name} className='market-place-img' />
					<span className='market-place-card-text'>
						<h4>{mp.name}</h4>
					</span>
				</Link>
			</li>
		));
	};
	componentDidMount() {
		apiServices.getMarketPlaceCatagories().then(cats => {
			if (cats.error) {
				this.setState({ error: cats.error });
			} else {
				this.setState({
					catagories: cats
				});
			}
		});
	}

	render() {
		return (
			<section className='market-place-container'>
				<span>
					<h3>Market Place</h3>
					{TokenService.getAuthToken() ? (
						<CreateContentButton forumType='market-place' />
					) : null}
				</span>
				<div className='market-place-content'>
					<ul>
						{this.state.catagories ? (
							this.makeCatagories()
						) : (
							<p>{this.state.error}</p>
						)}
					</ul>
				</div>
			</section>
		);
	}
}
