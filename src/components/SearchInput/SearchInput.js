import React, { Component } from "react";
import "./SearchInput.css";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board_id: "null",
      term: "",
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
    if (this.state.term === "") {
      this.props.closeNavSearch();
      return true;
    }
    this.setState({
      noResults: false
    });

    const { board_id, term } = this.state;
    sessionStorage.setItem("searchTerm", term);
    sessionStorage.setItem("searchBoard", board_id);
    var searchCreds = { board_id, term };
    if (term === undefined) {
      const term = sessionStorage.getItem("searchTerm");
      const board_id = sessionStorage.getItem("searchBoard");
      searchCreds = { board_id, term };
    }
    apiServices.searchPosts(searchCreds).then(data => {
      console.log(data);
      if (data.length !== 0) {
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
  componentDidMount() {
    apiServices.getFourm().then(forum => {
      this.setState({
        forum: forum
      });
    });
  }

  render() {
    if (this.state.noResults) {
      setTimeout(() => {
        this.setState({
          noResults: false
        });
      }, 5000);
    }

    return (
      <form className="search-form" onSubmit={this.handleSearch}>
        {this.state.noResults ? (
          <p>There are no posts with {this.state.term} in them.</p>
        ) : null}
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="Enter search keywords"
          value={this.state.term}
          onChange={this.handleSearchTerm}
        />

        <select
          name="catagories"
          id="search-catagories"
          value={this.state.board_id}
          onChange={this.handleCat}
        >
          <option value="null">Search Entire Forum</option>
          {this.state.forum ? this.makeOptions(this.state.forum) : null}
        </select>
        <button id="search-submit" type="submit" value="Search">
          <i className="fas fa-search" samesite="none"></i>
        </button>
      </form>
    );
  }
}
