import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Paginator.css";
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords, pageLimit, pageNeighbours, totalPages } = this.props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 10;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = totalPages;

    this.state = {
      currentPage: this.props.currentPage,
      pages: [],
      dataLoaded: false,
      paginatorScroll: "paginator-wrapper"
    };
  }

  gotoPage = page => {
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    console.log(currentPage);
    const paginationData = {
      currentPage
    };
    this.setState({ currentPage }, () => {
      this.props.onPageChanged(paginationData);
    });
  };

  componentDidMount() {
    const p = this.props.fetchPageNumbers();
    this.setState({
      pages: p,
      dataLoaded: true
    });
    this.gotoPage(1);
  }
  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.props.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.props.currentPage + this.pageNeighbours * 2 + 1);
  };

  render() {
    if (!this.totalRecords) return null;
    if (this.totalPages === 1) return null;

    const { currentPage, dataLoaded } = this.state;
    const { pages } = this.props;
    return !dataLoaded ? null : (
      <ul className="paginator">
        {pages.map((page, index) => {
          console.log(page);
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={this.handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={this.handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            );

          return (
            <>
              <li
                key={index}
                className={`page-item${currentPage === page ? " active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={e => this.handleClick(page, e)}
                >
                  {page}
                </button>
              </li>
            </>
          );
        })}
      </ul>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
