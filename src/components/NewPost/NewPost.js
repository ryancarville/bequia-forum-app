import React, { Component } from "react";
import apiServices from "../../services/apiServices";
import Sort from "../Sort/Sort";
import "./NewPost.css";
import waveLoader from "../Icons/waveLoader";
import Paginator from "../Paginator/Paginator";
import MakePostCards from "../MakePostCards/MakePostCards";

//new posts component
export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPosts: [],
      currentPage: 1,
      totalPages: null,
      pageLimit: null,
      pageNeighbours: null,
      paginatorScroll: "paginator-wrapper",
      error: null
    };
  }

  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "title") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        currentPosts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "title") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        currentPosts: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "date_posted") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
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
        currentPosts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "date_posted") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
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
        currentPosts: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "likes") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
        return a.likes - b.likes;
      });
      this.setState({
        currentPosts: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "likes") {
      const sorted = this.state.currentPosts.sort(function(a, b) {
        return b.likes - a.likes;
      });
      this.setState({
        currentPosts: sorted
      });
      return;
    }
  };
  onPageChanged = data => {
    const { posts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentPosts = posts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPosts, totalPages });
  };

  handlePageLimit = e => {
    this.setState(
      {
        pageLimit: parseInt(e.target.value),
        pageLimitReload: true
      },
      () => {
        if (this.state.pageLimit >= this.state.posts.length) {
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
    if (window.scrollY > 160) {
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
    apiServices
      .getForum()
      .then(forum => this.setState({ forum: forum }))
      .then(() =>
        apiServices.getNewestPosts().then(posts => {
          if (posts.error) {
            this.setState({
              error: posts.error,
              dataLoaded: true
            });
          }
          posts.forEach(post => {
            apiServices
              .getNumOfCommentsByPostId(post.id)
              .then(num => {
                post.commentCount = num[0].count;
                this.setState({
                  posts: [...this.state.posts, post]
                });
              })
              .then(() => {
                const sorted = this.state.posts.sort((a, b) =>
                  a.date_posted > b.date_posted ? -1 : 1
                );

                this.setState(
                  {
                    posts: sorted
                  },
                  () => {
                    if (sorted.length === posts.length) {
                      this.setState({
                        dataLoaded: true
                      });
                    }
                  }
                );
              });
          });
        })
      );
    window.addEventListener("scroll", () => this.paginatorScroll());
  }

  render() {
    const { posts, currentPosts, currentPage, totalPages } = this.state;
    const totalPosts = posts.length;
    if (totalPosts === 0) return null;

    return this.state.dataLoaded ? (
      <section className="newPost-container">
        <header>
          {this.props.dashboard ? null : <h2>Newest Posts</h2>}{" "}
          <div className={this.state.paginatorScroll}>
            <Sort sortType="posts" handleSort={this.handleSort} />
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
                {this.state.posts.length} <span>Results</span>{" "}
              </span>
            )}
          </div>
        </header>
        <div className="newPost-content">
          <p>{this.state.error}</p>
          <ul>
            <MakePostCards posts={currentPosts} forum={this.state.forum} />
          </ul>
        </div>
      </section>
    ) : (
      <span>{waveLoader}</span>
    );
  }
}
