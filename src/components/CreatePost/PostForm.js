import React, { Component } from "react";
import "./PostForm.css";
import apiServices from "../../services/apiServices";

export default class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forum: []
    };
  }
  makeSelectCategorys = () => {
    return this.state.forum.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  };
  componentDidMount() {
    apiServices.getFourm().then(forum =>
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
          <option selected disabled value="">
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
