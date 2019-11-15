import React from "react";
import "./ShowPostPreview.css";

export default function ShowPostPreview(props) {
  return (
    <div className="create-post-preview">
      <h2>Posting in {props.state.board_title.name}</h2>
      <h3>{props.state.title}</h3>
      <p>{props.state.content}</p>
      <span>
        <button onClick={() => props.handleSubmit()}>Create Listing</button>
        <button onClick={props.handleShowPreview}>Edit</button>
        <button onClick={() => props.goBack()}>Cancel</button>
      </span>
    </div>
  );
}
