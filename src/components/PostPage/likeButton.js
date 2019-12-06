import React from "react";
import like from "../Icons/like";
//set like button on post page
export default function likeButtons(props) {
  return props.didLike ? (
    <button type="button" onClick={props.handleLike} id="coconut-likes-btn">
      {like} Unlike
    </button>
  ) : (
    <button type="button" onClick={props.handleLike} id="coconut-likes-btn">
      {like} Like
    </button>
  );
}
