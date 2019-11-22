import React, { Component } from "react";
import "./SearchResults.css";
import JobSearchResults from "./jobsResults";
import RentalsSearchResults from "./rentalsResults";
import MarketPlaceSearchResults from "./marketPlaceResults";
import ForumSearchResults from "./forumResults";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import waveLoader from "../Icons/waveLoader";

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
      apiServices
        .searchPosts(searchCreds)
        .then(data => {
          this.context.searchResults(data);
        })
        .then(() => {
          this.context.resetsearchRedirect();
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
              {context.state.showSearch ? (
                context.state.searchBoardDataLoaded ? (
                  <ul
                    className="search-results-section"
                    id="forum-search-results"
                  >
                    <ForumSearchResults
                      posts={context.state.searchResults.formattedPosts}
                    />
                  </ul>
                ) : null || context.state.siteSearchDataLoaded ? (
                  <>
                    {context.state.siteSearchResults.mbPosts.length > 0 ? (
                      <>
                        {" "}
                        <h3>Messageboards</h3>
                        <ul
                          className="search-results-section"
                          id="forum-search-results"
                        >
                          <ForumSearchResults
                            posts={context.state.siteSearchResults.mbPosts}
                          />
                        </ul>
                      </>
                    ) : null}
                    {context.state.siteSearchResults.mpPosts.length > 0 ? (
                      <>
                        <h3>Market Place</h3>
                        <ul
                          className="search-results-section"
                          id="market-place-search-results"
                        >
                          <MarketPlaceSearchResults
                            posts={context.state.siteSearchResults.mpPosts}
                          />
                        </ul>
                      </>
                    ) : null}
                    {context.state.siteSearchResults.rPosts.length > 0 ? (
                      <>
                        <h3>Rentals</h3>
                        <ul
                          className="search-results-section"
                          id="rentals-search-results"
                        >
                          <RentalsSearchResults
                            posts={context.state.siteSearchResults.rPosts}
                          />
                        </ul>
                      </>
                    ) : null}
                    {context.state.siteSearchResults.jPosts.length > 0 ? (
                      <>
                        <h3>Jobs</h3>
                        <ul
                          className="search-results-section"
                          id="jobs-search-results"
                        >
                          <JobSearchResults
                            posts={context.state.siteSearchResults.jPosts}
                          />
                        </ul>
                      </>
                    ) : null}
                  </>
                ) : null
              ) : (
                <span className="forum-loader">{waveLoader}</span>
              )}
            </div>
          </section>
        )}
      </ForumContext.Consumer>
    );
  }
}
