import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import comment from "../Icons/comment";
import like from "../Icons/like";
export default function ForumSearchResults(props) {
  const forumPosts = () => {
    return props.posts.map(p => {
      const numOfComments = props.numOfComments.find(
        count => count.post_id === p.post.id
      );
      return (
        <li key={p.post.id}>
          <Link
            to={{
              pathname: `/messageBoard/${p.section_id}/${p.post.board_id}/${p.post.id}`,
              state: { id: p.post.id }
            }}
          >
            {p.post.title}
          </Link>
          <br />
          <Truncate
            lines={1}
            ellipsis={
              <span>
                ...
                <Link
                  to={{
                    pathname: `/messageBoard/${p.section_id}/${p.post.board_id}/${p.post.id}`,
                    state: { id: p.post.id }
                  }}
                >
                  Read more
                </Link>
              </span>
            }
          >
            {p.post.content}
          </Truncate>
          <span className="postInfo">
            <p>Posted By: {p.post.user_name}</p>
            <p>Posted On: {formatDate(p.post.date_posted)}</p>
            <span className="post-icons">
              <p>
                {like}
                {"   "}
                {p.post.likes}
              </p>
              <p>
                {comment}
                {"   "}
                {numOfComments.count}
              </p>
            </span>
          </span>
        </li>
      );
    });
  };
  return forumPosts();
}
