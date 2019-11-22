import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
export default function JobSearchResults(props) {
  const jobPosts = () => {
    return props.posts.map(j => (
      <li key={j.id} className="search-result-item">
        <Link to={`/jobs/${j.job_cat}/${j.id}`}>{j.title}</Link>
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...
              <Link to={`/jobs/${j.job_cat}/${j.id}`}>Read more</Link>
            </span>
          }
        >
          <p>{j.description}</p>
        </Truncate>
        <span className="postInfo">
          {j.location ? <p>Location: {j.location}</p> : null}
          {j.employment ? <p>Employment: {j.employment}</p> : null}
          <p>Posted By: {j.user_name}</p>
          <p>Posted On: {formatDate(j.date_posted)}</p>
        </span>
      </li>
    ));
  };
  return jobPosts();
}
