import React, { Component } from "react";
import "./Directory.css";
import ForumContext from "../../ForumContext";
import Sort from "../Sort/Sort";
import CreateListing from "../CreateDirectoryListing/CreateListing";
import TokenServices from "../../services/TokenServices";
import AddToDirectory from "./AddToDirectory";
import Listings from "./listings";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import apiServices from "../../services/apiServices";
//directory component
export default class Directory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directory: [],
      showAddForm: false,
      showDeletePopUp: false
    };
  }
  //updates directory when new entry added
  updateDirectory = () => {
    this.setState({
      directory: []
    });
    apiServices.getDirectory().then(dir => {
      this.setState({
        directory: dir
      });
    });
  };
  //handle show add listing form
  handleShowAddForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm
    });
  };
  //handle show delete pop up
  handleShowDeletePopUp = id => {
    this.setState({
      id: id,
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //handle delete entry
  handleDelete = () => {
    const { id } = this.state;
    apiServices.deleteDirectoryListing(id).then(() => this.updateDirectory());
    this.setState({
      showDeletePopUp: !this.state.showDeletePopUp
    });
  };
  //handle sorting
  handleSort = sort => {
    if (sort.sortType === "asc" && sort.column === "last_name") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.last_name.toLowerCase();
        var y = b.last_name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "last_name") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.last_name.toLowerCase();
        var y = b.last_name.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "first_name") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.first_name.toLowerCase();
        var y = b.first_name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "first_name") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.first_name.toLowerCase();
        var y = b.first_name.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "city") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.city.toLowerCase();
        var y = b.city.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "city") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.city.toLowerCase();
        var y = b.city.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "asc" && sort.column === "country") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.country.toLowerCase();
        var y = b.country.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
    if (sort.sortType === "desc" && sort.column === "country") {
      const sorted = this.state.directory.sort(function(a, b) {
        var x = a.country.toLowerCase();
        var y = b.country.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      this.setState({
        directory: sorted
      });
      return;
    }
  };
  componentDidMount() {
    window.scroll(0, 0);
    apiServices.getDirectory().then(dir => {
      this.setState({
        directory: dir
      });
    });
  }

  render() {
    return (
      <div className="directory-container">
        <ForumContext.Consumer>
          {context =>
            this.state.showAddForm ? (
              <CreateListing
                context={context}
                showAddForm={this.handleShowAddForm}
                user_id={context.user.id}
                updateDirectory={this.updateDirectory}
              />
            ) : this.state.showDeletePopUp ? (
              <DeletePopUp
                directoryListing={true}
                handleDelete={() => this.handleDelete}
                showDeletePopUp={this.handleShowDeletePopUp}
              />
            ) : (
              <>
                <Sort handleSort={this.handleSort} sortType={"dir"} />
                <h2>Directory</h2>
                {TokenServices.getAuthToken() ? (
                  <AddToDirectory showAddForm={this.handleShowAddForm} />
                ) : null}
                <br />
                <div className="directory-content">
                  <div className="directory-listings">
                    <ul>
                      <Listings
                        directory={this.state.directory}
                        user_id={context.user.id}
                        showDeletePopUp={this.handleShowDeletePopUp}
                      />
                    </ul>
                  </div>
                </div>
              </>
            )
          }
        </ForumContext.Consumer>
      </div>
    );
  }
}
