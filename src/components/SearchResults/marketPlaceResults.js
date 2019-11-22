import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
export default function MarketPlaceSearchResults(props) {
  const marketPlacePosts = () => {
    return props.posts.map(l => {
      const marketPlaceId = l.market_place_cat;
      return (
        <li key={l.id} className="search-result-item">
          <Link to={`/marketPlace/${marketPlaceId}/${l.id}`}>{l.title}</Link>
          <Truncate
            lines={1}
            ellipsis={
              <span>
                ...
                <Link to={`/marketPlace/${marketPlaceId}/${l.id}`}>
                  Read more
                </Link>
              </span>
            }
          >
            <p>{l.description}</p>
          </Truncate>
          <span className="postInfo">
            {l.price ? <p>Price: {l.price}</p> : null}
            {l.location ? <p>Location: {l.location}</p> : null}
            <p>Posted By: {l.contact_name}</p>
            <p>Posted On: {formatDate(l.date_posted)}</p>
          </span>
        </li>
      );
    });
  };
  return marketPlacePosts();
}
