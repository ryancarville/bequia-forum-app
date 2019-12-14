import React from "react";
//add to directory button
export default function AddToDirectory(props) {
  return (
    <button
      className="add-to-directory"
      type="button"
      onClick={props.showAddForm}
    >
      <i className="far fa-address-card"></i>
      Create Listing
    </button>
  );
}
