import React, { Component } from 'react';
import './SearchInput.css';
import apiServices from '../../services/apiServices';
import ForumContext from '../../ForumContext';

export default class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board_id: 'null',
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
			board_id: e.target.value
		});
	};
	handleSearch = e => {
		e.preventDefault();
		if (this.state.term === '') {
			this.props.closeNavSearch();
			return true;
		}
		this.setState({
			noResults: false
		});

		const { board_id, term } = this.state;
		const searchCreds = { board_id, term };
		apiServices.searchPosts(searchCreds).then(data => {
			console.log(data);
			if (data.length !== 0) {
				this.setState({
					term: ''
				});
				this.context.searchResults(data);
			} else {
				this.setState({
					noResults: true
				});
			}
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

		return (
			<ForumContext.Consumer>
				{context => (
					<form className='search-form' onSubmit={this.handleSearch}>
						{this.state.noResults ? (
							<p>There are no posts with {this.state.term} in them.</p>
						) : null}
						<input
							type='text'
							name='search'
							id='search-input'
							placeholder='Enter search keywords'
							value={this.state.term}
							onChange={this.handleSearchTerm}
						/>
						<span>
							<select
								name='catagories'
								id='search-catagories'
								value={this.state.board_id}
								onChange={this.handleCat}>
								<option value='null'>Search Entire Forum</option>
								{this.makeOptions(context.state.forum)}
							</select>
							<button id='search-submit' type='submit' value='Search'>
								<i class='fas fa-search'></i>
							</button>
						</span>
					</form>
				)}
			</ForumContext.Consumer>
		);
	}
}
