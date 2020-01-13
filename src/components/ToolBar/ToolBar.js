import React, { Component } from "react";
import Sort from "../Sort/Sort";
import Paginator from "../Paginator/Paginator";
import "./ToolBar.css";

class ToolBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: this.props.posts,
      pageLimit: 10,
      pages: [],
      totalPages: 0,
      currentPage: 1,
      pageNeighbours: 1,
      paginatorScroll: "paginator-wrapper",
      error: null
    };
  }
  paginatorScroll = () => {
    if (window.scrollY >= 165) {
      this.setState({
        paginatorScroll: "paginator-wrapper-fixed"
      });
    } else {
      this.setState({
        paginatorScroll: "paginator-wrapper"
      });
    }
  };

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  fetchPageNumbers = () => {
    console.log("HELLO");
    const LEFT_PAGE = "LEFT";
    const RIGHT_PAGE = "RIGHT";
    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.state.pageNeighbours;
    console.log(totalPages);
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = this.range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = this.range(
          startPage - singleSpillOffset,
          startPage - 1
        );
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = this.range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  };
  componentDidMount() {
    window.scroll(0, 0);
    const intPageCount = Math.ceil(
      this.props.posts.length / this.state.pageLimit
    );
    this.setState(
      {
        totalPages: intPageCount
      },
      () => {
        const p = this.fetchPageNumbers();
        this.setState({
          pages: p,
          dataLoaded: true
        });
      }
    );
    window.addEventListener("scroll", () => {
      this.paginatorScroll();
    });
  }

  onPageChanged = data => {
    const { posts } = this.props;
    let { currentPage } = data;
    const { pageLimit } = this.state;
    const offset = (currentPage - 1) * pageLimit;
    const currentPosts = posts.slice(offset, offset + pageLimit);
    let pages;
    this.setState({ currentPage }, () => {
      this.props.handleCurrentPosts(currentPosts);
      pages = this.fetchPageNumbers();
      this.setState({
        pages
      });
    });
  };
  handleSort = sort => {
    this.props.handleSort(sort);
    const { posts } = this.props;
    const { pageLimit, totalPages, currentPage } = this.state;
    const pages = this.fetchPageNumbers(totalPages);
    const paginationData = {
      pages,
      currentPage,
      totalPages,
      pageLimit,
      totalRecords: parseInt(posts.length)
    };

    this.onPageChanged(paginationData);
  };
  handlePageLimit = e => {
    e.preventDefault();
    var num = parseInt(e.target.value);
    const { posts } = this.props;
    const totalPages = Math.ceil(parseInt(posts.length) / num);
    const pages = this.fetchPageNumbers(totalPages);
    const { currentPage } = this.state;
    let currPage = currentPage;
    if (currPage >= totalPages) {
      currPage = totalPages;
    }
    this.setState(
      {
        pageLimit: num,
        pageLimitReload: true,
        totalPages
      },
      () => {
        if (parseInt(posts.length) <= num) {
          const paginationData = {
            pages,
            currentPage: 1,
            totalPages: 1,
            pageLimit: num,
            totalRecords: parseInt(posts.length)
          };
          this.onPageChanged(paginationData);
        } else {
          const paginationData = {
            pages,
            currentPage: currPage,
            totalPages,
            pageLimit: num,
            totalRecords: parseInt(posts.length)
          };
          this.onPageChanged(paginationData);
        }
      }
    );
  };

  render() {
    const {
      currentPage,
      totalPages,
      pageLimit,
      pageNeighbours,
      pages,
      dataLoaded
    } = this.state;
    const { posts } = this.props;
    const totalPosts = parseInt(posts.length);
    if (totalPosts === 0) return null;
    return !dataLoaded ? null : (
      <div className={this.state.paginatorScroll}>
        <Sort sortType="posts" handleSort={this.handleSort} />
        <select
          className="num-post-results"
          onChange={e => this.handlePageLimit(e)}
        >
          <option value="5">5 post per page</option>
          <option selected value="10">
            10 post per page
          </option>
          <option value="15">15 post per page</option>
          <option value="20">20 post per page</option>
          <option value="25">25 post per page</option>
          <option value="30">30 post per page</option>
        </select>
        <span id="paginator-stats">
          <Paginator
            pages={pages}
            totalPages={totalPages}
            currentPage={currentPage}
            totalRecords={totalPosts}
            pageLimit={pageLimit}
            pageNeighbours={pageNeighbours}
            onPageChanged={this.onPageChanged}
            fetchPageNumbers={this.fetchPageNumbers}
            gotoPage={this.gotoPage}
          />

          {currentPage && (
            <span className="paginator-current-page">
              Page{" "}
              <span>
                <b>{currentPage}</b>
              </span>{" "}
              /{" "}
              <span>
                <b>{totalPages}</b>
              </span>
            </span>
          )}
        </span>
        {totalPages && (
          <span className="paginator-total-results">
            {this.props.posts.length} <span>posts</span>
          </span>
        )}
      </div>
    );
  }
}

export default ToolBar;
