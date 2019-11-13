import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ForumContext from '../../ForumContext';
import './SearchResults.css';
import JobSearchResults from './jobsResults';
import RentalsSearchResults from './rentalsResults';
import MarketPlaceSearchResults from './marketPlaceResults';
import ForumSearchResults from './forumResults';

export default class SearchResults extends Component {
	static contextType = ForumContext;
	componentWillUnmount() {
		this.context.searchResults(null);
	}

	render() {
		return (
			<ForumContext.Consumer>
				{context => (
					<section className='forum-search-container'>
						<div className='forum-search-content'>
							<header>
								<h2>Search Results</h2>
							</header>
							<ul className='search-results-section' id='forum-search-results'>
								{context.state.searchResults ? (
									context.state.searchResults.specificBoard ? (
										context.state.searchResults.specificBoard.length !== 0 ? (
											<ForumSearchResults
												posts={context.state.searchResults.specificBoard}
												comments={context.state.comments}
												context={context}
											/>
										) : (
											<p>
												There are no posts on that messageboard with those
												keywords.{' '}
											</p>
										)
									) : null
								) : (
									<Redirect to={'/'} />
								)}
							</ul>
							{context.state.searchResults ? (
								context.state.searchResults.mbPosts ? (
									<h3>Messageboards</h3>
								) : null
							) : (
								<Redirect to={'/'} />
							)}
							<ul className='search-results-section' id='forum-search-results'>
								{context.state.searchResults ? (
									context.state.searchResults.mbPosts ? (
										<ForumSearchResults
											posts={context.state.searchResults.mbPosts}
											comments={context.state.comments}
											context={context}
										/>
									) : null
								) : (
									<Redirect to={'/'} />
								)}
							</ul>

							{context.state.searchResults ? (
								context.state.searchResults.mpPosts ? (
									<h3>Market Place</h3>
								) : null
							) : (
								<Redirect to={'/'} />
							)}
							<ul
								className='search-results-section'
								id='market-place-search-results'>
								{context.state.searchResults ? (
									context.state.searchResults.mpPosts ? (
										<MarketPlaceSearchResults
											posts={context.state.searchResults.mpPosts}
										/>
									) : null
								) : (
									<Redirect to={'/'} />
								)}
							</ul>
							{context.state.searchResults ? (
								context.state.searchResults.rPosts ? (
									<h3>Rentals</h3>
								) : null
							) : (
								<Redirect to={'/'} />
							)}
							<ul
								className='search-results-section'
								id='rentals-search-results'>
								{context.state.searchResults ? (
									context.state.searchResults.rPosts ? (
										<RentalsSearchResults
											posts={context.state.searchResults.rPosts}
										/>
									) : null
								) : (
									<Redirect to={'/'} />
								)}
							</ul>
							{context.state.searchResults ? (
								context.state.searchResults.jPosts ? (
									<h3>Jobs</h3>
								) : null
							) : (
								<Redirect to={'/'} />
							)}
							<ul className='search-results-section' id='jobs-search-results'>
								{context.state.searchResults ? (
									context.state.searchResults.jPosts ? (
										<JobSearchResults
											posts={context.state.searchResults.jPosts}
										/>
									) : null
								) : (
									<Redirect to={'/'} />
								)}
							</ul>
						</div>
					</section>
				)}
			</ForumContext.Consumer>
		);
	}
}
