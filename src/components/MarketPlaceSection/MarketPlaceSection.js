import React, { Component } from "react";
import { Link } from "react-router-dom";
import formatDate from "../../helpers/formatDate";
import Paginator from "../Paginator/Paginator";
import "./MarketPlaceSection.css";
import Truncate from "react-truncate";
import Sort from "../Sort/Sort";
import apiServices from "../../services/apiServices";
//market place section component
export default class MarketPlaceSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      currentListings: [],
      currentPage: 1,
      totalPages: null,
      pageLimit: null,
      pageNeighbours: null,
      paginatorScroll: "paginator-wrapper",
      error: null
    };
  }
  //handle sort
  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "date_posted") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "date_posted") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.date_posted.toLowerCase();
        var y = b.date_posted.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "price") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.price.toLowerCase();
        var y = b.price.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "price") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.price.toLowerCase();
        var y = b.price.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "location") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.location.toLowerCase();
        var y = b.location.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "location") {
      const sorted = this.state.listings.sort(function(a, b) {
        var x = a.location.toLowerCase();
        var y = b.location.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        listings: sorted
      });
      return;
    }
  };

  //make all listings for section
  makeListings = listings => {
    return listings.map(l => (
      <li key={l.id} className="post-card">
        <article className="post-card-info non-board-post">
          <span>
            <Link
              to={{
                pathname: `/marketPlace/${l.market_place_cat}/${l.id}`,
                state: { id: l.id }
              }}
            >
              <h4>{l.title}</h4>
            </Link>
            <Truncate
              className="post-teaser"
              lines={3}
              ellipsis={
                <span>
                  ...
                  <Link
                    to={{
                      pathname: `/marketPlace/${l.market_place_cat}/${l.id}`,
                      state: { id: l.id }
                    }}
                  >
                    Read more
                  </Link>
                </span>
              }
            >
              <p>{l.description}</p>
            </Truncate>
          </span>
          <span className="post-info">
            {l.price && l.price !== "0" ? (
              <p>
                <i className="fas fa-dollar-sign"></i> {l.price}
              </p>
            ) : null}
            {l.location ? (
              <p>
                <i className="fas fa-map-marked-alt"></i> {l.location}
              </p>
            ) : null}
            <p>Posted By: {l.contact_name}</p>
            <p>Posted On: {formatDate(l.date_posted)}</p>
          </span>
        </article>
      </li>
    ));
  };
  onPageChanged = data => {
    const { listings } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentListings = listings.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentListings, totalPages });
  };

  handlePageLimit = e => {
    this.setState(
      {
        pageLimit: parseInt(e.target.value)
      },
      () => {
        if (this.state.pageLimit >= this.state.listings.length) {
          const paginationData = {
            currentPage: 1,
            totalPages: 1,
            pageLimit: this.state.pageLimit,
            totalRecords: this.state.posts.length
          };
          this.onPageChanged(paginationData);
        } else {
          const paginationData = {
            currentPage: this.state.currentPage,
            totalPages: this.state.totalPages,
            pageLimit: this.state.pageLimit,
            totalRecords: this.state.posts.length
          };
          this.onPageChanged(paginationData);
        }
      }
    );
  };

  paginatorScroll = () => {
    if (window.scrollY > 140) {
      this.setState({
        paginatorScroll: "paginator-wrapper paginator-wrapper-fixed"
      });
    } else {
      this.setState({
        paginatorScroll: "paginator-wrapper"
      });
    }
  };
  componentDidMount() {
    window.scroll(0, 0);
    const { marketPlaceId } = this.props.match.params;
    apiServices
      .getMarketPlacePostsByCat(marketPlaceId)
      .then(listings => {
        if (listings.error) {
          this.setState({
            error: listings.error
          });
        } 
          this.setState({
            listings: listings
          });
      })
      .then(() => {
        apiServices.getMarketPlaceCatagories().then(cats => {
          const currCat = cats.filter(c => c.id.toString() === marketPlaceId);
          this.setState({
            market_place_name: currCat[0].name
          });
        });
      });
    window.addEventListener("scroll", () => this.paginatorScroll());
  }
  render() {
    const { listings, currentListings, currentPage, totalPages } = this.state;
    const totalPosts = listings.length;
    if (totalPosts === 0) return null;
    return this.state.error !== null ? (
      <section className="market-place-section-container">
        <header>
          <h4>{this.state.market_place_name}</h4>
        </header>
        <article>
          <p style={{ textAlign: "center" }}>
            <strong>{this.state.error}</strong>
          </p>
        </article>
      </section>
    ) : (
      <section className="market-place-section-container">
        <header>
          {this.state.market_place_name ? (
            <h4>{this.state.market_place_name}</h4>
          ) : null}

          <div className={this.state.paginatorScroll}>
            <Sort sortType="marketPlace" handleSort={this.handleSort} />
            <select
              className="num-post-results"
              onChange={this.handlePageLimit}
            >
              <option selected disabled value="">
                Posts per page
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
            <Paginator
              totalRecords={totalPosts}
              pageLimit={this.state.pageLimit}
              pageNeighbours={this.state.pageNeighbours}
              onPageChanged={this.onPageChanged}
            />

            {currentPage && (
              <span className="paginator-current-page">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
            {totalPages && (
              <span className="paginator-total-results">
                {this.state.listings.length} <span>Results</span>{" "}
              </span>
            )}
          </div>
        </header>
        <div className="market-place-section-content">
          <ul>{this.makeListings(currentListings)}</ul>
        </div>
      </section>
    );
  }
}
