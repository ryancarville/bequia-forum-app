import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SearchInput.css';
import apiServices from '../../services/apiServices';
import ForumContext from '../../ForumContext';

export default class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board_id: 100,
			term: '',
			showResults: false
		};
	}
	static contextType = ForumContext;
	handleSearchTerm = e => {
		this.setState({
			term: e.target.value
		});
	};
	handleCat = e => {
		this.setState({
			board_id: parseInt(e.target.value)
		});
	};
	handleSearch = e => {
		e.preventDefault();
		this.setState({
			noResults: false
		});

		const { board_id, term } = this.state;
		const searchCreds = { board_id, term };
		apiServices.searchPosts(searchCreds).then(data => {
			if (data.length !== 0) {
				this.context.searchResults(data);
				this.setState({
					showResults: !this.state.showResults
				});
			}
			this.setState({
				noResults: true
			});
		});
	};
	makeOptions = catagories => {
		return catagories.map(cat => (
			<option key={cat.id} value={cat.id}>
				{cat.name}
			</option>
		));
	};

	render() {
		if (this.state.noResults) {
			setTimeout(() => {
				this.setState({
					noResults: false
				});
			}, 5000);
		}
		if (this.state.showResults) {
			return <Redirect to={'/searchResults'} />;
		}
		return (
			<ForumContext.Consumer>
				{context => (
					<form onSubmit={this.handleSearch}>
						{this.state.noResults ? (
							<p>There are no posts with {this.state.term} in them.</p>
						) : null}
						<input
							type='text'
							name='search'
							placeholder='Enter search keywords'
							onChange={this.handleSearchTerm}
						/>
						<select
							name='catagories'
							id='search-catagories'
							value={this.state.board_id}
							onChange={this.handleCat}>
							<option value='all'>Search Entire Forum</option>
							{this.makeOptions(context.state.forum)}
						</select>
						<button type='submit' value='Search'>Search</button>
					</form>
				)}
			</ForumContext.Consumer>
		);
	}
}
