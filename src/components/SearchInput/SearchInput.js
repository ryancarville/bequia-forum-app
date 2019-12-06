import React, { Component } from "react";
import "./SearchInput.css";
import apiServices from "../../services/apiServices";
import ForumContext from "../../ForumContext";
//serach component
export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeOut: "search-form-fadeIn",
      board_name: "Search Entire Forum",
      board_id: "null",
      term: "",
      showResults: false
    };
  }
  static contextType = ForumContext;
  //handle search term
  handleSearchTerm = e => {
    this.setState({
      term: e.target.value
    });
  };
  //handle site catagory
  handleCat = e => {
    const id = e.target.value;
    if (id === "null") {
      this.setState({
        board_name: "Search Entire Forum",
        board_id: "null"
      });
    } else {
      apiServices.getForumNameById(id).then(name => {
        this.setState({
          board_name: "Search " + name.name,
          board_id: id
        });
      });
    }
  };
  //close search and clear term
  closeSearch = () => {
    this.setState({
      term: ""
    });
    this.props.closeNavSearch();
    return true;
  };
  //handle search submit
  handleSearch = e => {
    e.preventDefault();
    if (this.state.term === "") {
      this.setState({
        fadeOut: "search-form-fadeOut"
      });
      this.props.closeNavSearch();
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
    apiServices.searchPosts(searchCreds).then(data => {
      this.context.searchResults(data);
    });
  };
  //make site sections menu
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
    return (
      <section className="search-input-container">
        <form
          className={this.state.fadeOut}
          id="search-form"
          onSubmit={this.handleSearch}
        >
          <button id="search-submit" type="submit" value="Search">
            <i
              className={this.props.colorClass + " fas fa-search"}
              samesite="none"
              secure="true"
            ></i>
          </button>
          <input
            type="text"
            name="search"
            id="search-input"
            placeholder={this.state.board_name}
            value={this.state.term}
            onChange={this.handleSearchTerm}
            autoFocus
          />

          <select
            name="catagories"
            className={this.props.colorClass}
            id="search-catagories"
            value={this.state.board_id}
            onChange={this.handleCat}
          >
            <option value="null">Search Entire Forum</option>
            {this.state.forum ? this.makeOptions(this.state.forum) : null}
          </select>
          <button
            id="search-cancel-icon"
            type="submit"
            onClick={this.closeSearch}
          >
            <i
              className={this.props.colorClass + " fas fa-times"}
              samesite="none"
              secure="true"
            ></i>
          </button>
        </form>
      </section>
    );
  }
}
