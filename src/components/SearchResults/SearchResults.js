import React, { Component } from "react";
import "./SearchResults.css";
import JobSearchResults from "./jobsResults";
import RentalsSearchResults from "./rentalsResults";
import MarketPlaceSearchResults from "./marketPlaceResults";
import ForumSearchResults from "./forumResults";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.results
    };
  }
  static contextType = ForumContext;
  componentDidMount() {
    const prevSearch = sessionStorage.getItem("searchTerm");
    if (prevSearch) {
      const term = sessionStorage.getItem("searchTerm");
      const board_id = sessionStorage.getItem("searchBoard");
      var searchCreds = { board_id, term };
      apiServices.searchPosts(searchCreds).then(data => {
        this.context.searchResults(data);
      });
    }
  }

  render() {
    return (
      <ForumContext.Consumer>
        {context => (
          <section className="forum-search-container">
            <div className="forum-search-content">
              <header>
                <h2>Search Results</h2>
              </header>
              {context.state.searchResults.error ? (
                <p id="no-search-results-message">
                  {context.state.searchResults.error}
                </p>
              ) : null}

              <ul className="search-results-section" id="forum-search-results">
                {context.state.searchBoardDataLoaded ? (
                  context.state.searchResults.formattedPosts.length > 0 ? (
                    <ForumSearchResults
                      posts={context.state.searchResults.formattedPosts}
                      numOfComments={context.state.searchResults.numOfComments}
                    />
                  ) : (
                    <p>
                      There are no posts on that messageboard with those
                      keywords.{" "}
                    </p>
                  )
                ) : null}
              </ul>
              {context.state.siteSearchDataLoaded ? (
                context.state.searchResults.mbPosts ? (
                  <h3>Messageboards</h3>
                ) : null
              ) : null}
              <ul className="search-results-section" id="forum-search-results">
                {context.state.siteSearchDataLoaded ? (
                  context.state.searchResults.mbPosts ? (
                    <ForumSearchResults
                      posts={context.state.searchResults.mbPosts}
                      numOfComments={context.state.searchResults.numOfComments}
                    />
                  ) : null
                ) : null}
              </ul>
              {context.state.siteSearchDataLoaded ? (
                context.state.searchResults.mpPosts ? (
                  <h3>Market Place</h3>
                ) : null
              ) : null}
              <ul
                className="search-results-section"
                id="market-place-search-results"
              >
                {context.state.siteSearchDataLoaded ? (
                  context.state.searchResults.mpPosts ? (
                    <MarketPlaceSearchResults
                      posts={context.state.searchResults.mpPosts}
                    />
                  ) : null
                ) : null}
              </ul>
              {context.state.siteSearchDataLoaded ? (
                context.state.searchResults.rPosts ? (
                  <h3>Rentals</h3>
                ) : null
              ) : null}
              <ul
                className="search-results-section"
                id="rentals-search-results"
              >
                {context.state.siteSearchDataLoaded ? (
                  context.state.searchResults.rPosts ? (
                    <RentalsSearchResults
                      posts={context.state.searchResults.rPosts}
                    />
                  ) : null
                ) : null}
              </ul>
              {context.state.siteSearchDataLoaded ? (
                context.state.searchResults.jPosts ? (
                  <h3>Jobs</h3>
                ) : null
              ) : null}
              <ul className="search-results-section" id="jobs-search-results">
                {context.state.siteSearchDataLoaded ? (
                  context.state.searchResults.jPosts ? (
                    <JobSearchResults
                      posts={context.state.searchResults.jPosts}
                    />
                  ) : null
                ) : null}
              </ul>
            </div>
          </section>
        )}
      </ForumContext.Consumer>
    );
  }
}
