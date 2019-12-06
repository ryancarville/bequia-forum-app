import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import comment from "../Icons/comment";
import like from "../Icons/like";
//forum search results
export default function ForumSearchResults(props) {
  const forumPosts = () => {
    return props.posts.map(p => {
      return (
        <li key={p.id} className="search-result-item">
          <article className="post-card-info">
            <Link to={`/messageBoard/${p.section_id}/${p.board_id}/${p.id}`}>
              <h4>{p.title}</h4>
            </Link>
            <Truncate
              className="post-teaser"
              lines={2}
              ellipsis={
                <span>
                  ...
                  <Link
                    to={`/messageBoard/${p.section_id}/${p.board_id}/${p.id}`}
                  >
                    Read more
                  </Link>
                </span>
              }
            >
              <p>{p.content}</p>
            </Truncate>
          </article>
          <span className="post-card-user-info">
            <p>Posted By: {p.user_name}</p>
            <p>Posted On: {formatDate(p.date_posted)}</p>
            <span className="post-card-icons">
              <p>
                {like}
                {"   "}
                {p.likes}
              </p>

              <p>
                {comment}
                {"   "}
                {p.commentCount}
              </p>
            </span>
          </span>
        </li>
      );
    });
  };
  return forumPosts();
}
