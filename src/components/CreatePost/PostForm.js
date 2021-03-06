import React, { Component } from "react";
import "./PostForm.css";
import apiServices from "../../services/apiServices";
// forum post form
export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forum: []
    };
  }
  //make forum catagories menu
  makeSelectCategorys = () => {
    return this.state.forum.map(item => {
      if (item.id >= 26 && item.id <= 29) {
        return false;
      } else {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      }
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
    //get all forum catagories
    apiServices.getForum().then(forum =>
      this.setState({
        forum: forum,
        dataLoaded: true
      })
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleShowPreview}>
        <input
          type="text"
          name="title"
          id="post-title"
          placeholder="Title"
          value={this.props.state.title}
          onChange={this.props.handleTitle}
          autoFocus
          required
        />
        <label htmlFor="catagory">Forum</label>
        <select
          name="catagory"
          id="post-catagory"
          value={this.props.state.board_id}
          onChange={this.props.handleCatagory}
          required
        >
          <option defaultValue disabled value="0">
            Please Select a Forum
          </option>
          {this.state.dataLoaded ? this.makeSelectCategorys() : null}
        </select>

        <textarea
          name="content"
          id="post-content"
          placeholder="Enter contet here..."
          value={this.props.state.content}
          onChange={this.props.handleContent}
          required
        ></textarea>
        <button type="submit">Preview Post</button>
        <button onClick={this.props.resetState}>Reset Form</button>
        <button type="button" onClick={() => this.props.goBack()}>
          Cancel
        </button>
      </form>
    );
  }
}
