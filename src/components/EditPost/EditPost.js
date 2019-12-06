import React from "react";
import "./EditPost.css";
//edit forum post component
export default function EditPost(props) {
  return (
    <section className="post-edit-container">
      <form onSubmit={props.handleEditSubmit}>
        <label htmlFor="editPostTitle">Title</label>
        <input
          type="text"
          name="editPostTitle"
          id="edit-post-tile"
          value={props.state.title}
          onChange={props.handleTitle}
        />
        <label htmlFor="editPostContent">Content</label>
        <textarea
          name="editPostContent"
          id="edit-post-content"
          value={props.state.content}
          onChange={props.handleContent}
        />
        <span>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={props.closeEdit}>
            Cancel
          </button>
        </span>
      </form>
    </section>
  );
}
