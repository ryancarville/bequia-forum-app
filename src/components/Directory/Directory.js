import React, { Component } from 'react';
import './Directory.css';
import ForumContext from '../../ForumContext';
import Sort from '../Sort/Sort';
import CreateListing from '../CreateDirectoryListing/CreateListing';
import TokenServices from '../../services/TokenServices';
import AddToDirectory from './AddToDirectory';
import Listings from './listings';
import DeletePopUp from '../DeletePopUp/DeletePopUp';
import apiServices from '../../services/apiServices';
export default class Directory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddForm: false,
			showDeletePopUp: false
		};
	}
	handleShowAddForm = context => {
		this.setState({
			showAddForm: !this.state.showAddForm
		});
	};
	handleShowDeletePopUp = id => {
		this.setState({
			id: id,
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	handleDelete = context => {
		const { id } = this.state;
		apiServices.deleteDirectoryListing(id).then(() => context.getDirectory());
		this.setState({
			showDeletePopUp: !this.state.showDeletePopUp
		});
	};
	render() {
		return (
			<div className='directory-container'>
				<ForumContext.Consumer>
					{context =>
						this.state.showAddForm ? (
							<CreateListing
								context={context}
								showAddForm={this.handleShowAddForm}
								user_id={context.user.id}
							/>
						) : this.state.showDeletePopUp ? (
							<DeletePopUp
								directoryListing={true}
								handleDelete={() => this.handleDelete(context)}
								showDeletePopUp={this.handleShowDeletePopUp}
							/>
						) : (
							<>
								<h2>Directory</h2>
								{TokenServices.getAuthToken() ? (
									<AddToDirectory showAddForm={this.handleShowAddForm} />
								) : null}
								<Sort handleSort={context.sort} sortType={'dir'} />
								<div className='directory-content'>
									<div className='directory-listings'>
										<ul>
											<Listings
												directory={context.state.directory}
												user_id={context.user.id}
												showDeletePopUp={this.handleShowDeletePopUp}
											/>
										</ul>
									</div>
								</div>
							</>
						)
					}
				</ForumContext.Consumer>
			</div>
		);
	}
}
