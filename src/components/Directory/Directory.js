import React, { Component } from 'react';
import './Directory.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';
import CreateListing from '../CreateDirectoryListing/CreateListing';
import TokenServices from '../../services/TokenServices';
import AddToDirectory from './AddToDirectory';
import Listings from './listings';
export default class Directory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddForm: false
		};
	}
	handleShowAddForm = () => {
		this.setState({
			showAddForm: !this.state.showAddForm
		});
	};
	render() {
		return (
			<div className='directory-container'>
				<h2>Directory</h2>
				{TokenServices.getAuthToken() ? (
					<AddToDirectory showAddForm={this.handleShowAddForm} />
				) : null}
				{this.state.showAddForm ? (
					<CreateListing />
				) : (
					<ForumContext.Consumer>
						{context => (
							<>
								<Sort handleSort={context.sort} sortType={'dir'} />
								<div className='directory-content'>
									<Listings directory={context.state.directory} />
								</div>
							</>
						)}
					</ForumContext.Consumer>
				)}
			</div>
		);
	}
}
