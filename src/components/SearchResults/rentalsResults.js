import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
export default function RentalsSearchResults(props) {
  const rentalsPosts = () => {
    return props.posts.map(r => (
      <li key={r.id} className="search-result-item">
        <article className="post-card-info">
          <Link to={`/rentals/${r.rental_cat}/${r.id}`}>
            <h4>{r.title}</h4>
          </Link>

          <Truncate
            className="post-teaser"
            lines={2}
            ellipsis={
              <span>
                ...
                <Link to={`/rentals/${r.rental_cat}/${r.id}`}>Read more</Link>
              </span>
            }
          >
            <p>{r.description}</p>
          </Truncate>
          {r.price ? <p>Price: {r.price}</p> : null}
          {r.location ? <p>Location: {r.location}</p> : null}
        </article>
        <span className="post-card-user-info">
          <p>Posted By: {r.user_name}</p>
          <p>Posted On: {formatDate(r.date_posted)}</p>
        </span>
      </li>
    ));
  };
  return rentalsPosts();
}
