import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
export default function RentalsSearchResults(props) {
  const rentalsPosts = () => {
    console.log(props.posts);
    return props.posts.map(r => (
      <li key={r.post.id}>
        <Link
          to={{
            pathname: `/rentals/${r.rental_cat}/${r.post.id}`,
            state: { id: r.post.id }
          }}
        >
          <p>{r.post.title}</p>
        </Link>
        <br />
        <Truncate
          lines={1}
          ellipsis={
            <span>
              ...
              <Link
                to={{
                  pathname: `/rentals/${r.rental_cat}/${r.post.id}`,
                  state: { id: r.post.id }
                }}
              >
                Read more
              </Link>
            </span>
          }
        >
          <p>{r.post.description}</p>
        </Truncate>
        <span className="postInfo">
          {r.post.price ? <p>Price: {r.post.price}</p> : null}
          {r.post.location ? <p>Location: {r.post.location}</p> : null}
          <p>Posted By: {r.post.contact_name}</p>
          <p>Posted On: {formatDate(r.post.date_posted)}</p>
        </span>
      </li>
    ));
  };
  return rentalsPosts();
}
