import React, { Component } from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
import like from "../Icons/like";
import comment from "../Icons/comment";

export default class MakePostCard extends Component {
  makeCards = () => {
    return this.props.posts.map(p => {
      if (this.props.boardName) {
        var forum = this.props.boardName;
      } else if (this.props.forum) {
        forum = this.props.forum.filter(f => f.id === p.board_id);
        forum = forum[0];
      }

      return (
        <li key={p.id} className="post-card">
          <article className="post-card-info">
            <Link
              to={`/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`}
            >
              <h4>{p.title}</h4>
            </Link>
            <Truncate
              className="post-teaser"
              lines={2}
              ellipsis={
                <span>
                  ...
                  <Link
                    to={`/messageBoard/${forum.messageboard_section}/${p.board_id}/${p.id}`}
                  >
                    Read more
                  </Link>
                </span>
              }
            >
              {p.content}
            </Truncate>
          </article>
          <span className="post-card-user-info">
            <p>
              Posted By:{"   "}
              {p.user_name}
            </p>
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
  render() {
    return this.makeCards();
  }
}
