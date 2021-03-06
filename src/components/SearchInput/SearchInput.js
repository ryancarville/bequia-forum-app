import React, { Component } from "react";
import "./SearchInput.css";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
import waveLoader from "../Icons/waveLoader";
//search component
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: "search-form-fadeIn",
      board_name: "Search Entire Forum",
      board_id: "null",
      term: "",
      showForm: false,
      showResults: false,
      forum: [],
      cats: [],
    };
  }
  static contextType = ForumContext;
  //handle search term
  handleSearchTerm = (e) => {
    this.setState({
      term: e.target.value,
    });
  };
  //handle site category
  handleCat = (e) => {
    const id = e.target.value;
    if (id === "null") {
      this.setState({
        board_name: "Search Entire Forum",
        board_id: "null",
      });
    } else {
      apiServices.getForumNameById(id).then((name) => {
        this.setState({
          board_name: "Search " + name.name,
          board_id: id,
        });
      });
    }
  };
  //close search and clear term
  closeSearch = () => {
    this.setState({
      term: "",
      fadeOut: "search-form-fadeOut",
    });
    return this.props.closeSearchForm;
  };
  //handle search submit
  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.term === "") {
      this.setState({
        fadeOut: "search-form-fadeOut",
      });
      this.props.handleNavTextColor("/");
      this.props.closeSearchForm();
      return true;
    }
    const { board_id, term } = this.state;
    sessionStorage.setItem("searchTerm", term);
    sessionStorage.setItem("searchBoard", board_id);
    var searchCreds = { board_id, term };
    if (term === undefined) {
      const term = sessionStorage.getItem("searchTerm");
      const board_id = sessionStorage.getItem("searchBoard");
      searchCreds = { board_id, term };
    }
    apiServices.searchPosts(searchCreds).then((data) => {
      this.context.searchResults(data);
      this.props.handleNavTextColor("/searchResults");
    });
  };

  //make site sections menu
  makeOptions = () => {
    return this.state.cats.map((cat) => {
      if (
        cat.name === "Jobs" ||
        cat.name === "Rentals" ||
        cat.name === "Market Place" ||
        cat.name === "Events"
      ) {
        return (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        );
      }
      return (
        <option key={cat.id} value={cat.id}>
          {cat.name} - {cat.count} threads
        </option>
      );
    });
  };
  componentDidMount() {
    apiServices
      .getForum()
      .then((forum) => {
        this.setState({
          forum: forum,
          cats: [],
        });
      })
      .then(() => {
        this.state.forum.map((cat) =>
          apiServices
            .getNumOfThreads(cat.id)
            .then((count) => {
              cat.count = count[0].count;
              this.setState({
                cats: [...this.state.cats, cat],
              });
            })
            .then(() => {
              if (this.state.cats.length === this.state.forum.length) {
                this.setState({
                  forumLoaded: true,
                });
              }
            })
        );
      });
  }
  componentWillUnmount() {
    this.setState({
      forum: [],
      cats: [],
      forumLoaded: false,
    });
  }
  render() {
    return this.state.forumLoaded ? (
      <section className="search-input-container">
        <form
          className={this.state.fadeOut}
          id="search-form"
          onSubmit={this.handleSearch}
        >
          <button
            id="search-submit"
            type="submit"
            value="Search"
            onClick={() => this.props.handleNavTextColor("/")}
          >
            <i className={this.props.colorClass + " fas fa-search"}></i>
          </button>
          <input
            type="text"
            name="search"
            id="search-input"
            className={
              this.props.colorClass + " " + this.props.placeholderColor
            }
            placeholder={this.state.board_name}
            value={this.state.term}
            onChange={this.handleSearchTerm}
          />

          <select
            name="catagories"
            className={this.props.colorClass}
            id="search-catagories"
            value={this.state.board_id}
            onChange={this.handleCat}
          >
            <option value="null">Search Entire Forum</option>
            {this.makeOptions()}
          </select>
          <button
            id="search-cancel-icon"
            type="submit"
            onClick={() => this.closeSearch()}
          >
            <i className={this.props.colorClass + " fas fa-times"}></i>
          </button>
        </form>
      </section>
    ) : (
      <span className={this.props.colorClass} id="search-input-loader">
        {waveLoader}
      </span>
    );
  }
}
