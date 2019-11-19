import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
export default function JobSearchResults(props) {
  const jobPosts = () => {
    return props.posts.map(j => (
      <li key={j.post.id}>
        <Link
          to={{
            pathname: `/jobs/${j.job_cat}/${j.post.id}`,
            state: { id: j.post.id }
          }}
        >
          <p>{j.post.title}</p>
        </Link>
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...
              <Link
                to={{
                  pathname: `/jobs/${j.job_cat}/${j.post.id}`,
                  state: { id: j.post.id }
                }}
              >
                Read more
              </Link>
            </span>
          }
        >
          <p>{j.description}</p>
        </Truncate>
        <span className="postInfo">
          {j.post.location ? <p>Location: {j.post.location}</p> : null}
          {j.post.employment ? <p>Employment: {j.post.employment}</p> : null}
          <p>Posted By: {j.post.user_name}</p>
          <p>Posted On: {formatDate(j.post.date_posted)}</p>
        </span>
      </li>
    ));
  };
  return jobPosts();
}
