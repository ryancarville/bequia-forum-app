import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import formatDate from "../../helpers/formatDate";
//market place search results
export default function MarketPlaceSearchResults(props) {
  const marketPlacePosts = () => {
    return props.posts.map(l => {
      const marketPlaceId = l.market_place_cat;
      return (
        <li key={l.id} className="search-result-item">
          <article className="post-card-info">
            <Link to={`/marketPlace/${marketPlaceId}/${l.id}`}>
              <h4>{l.title}</h4>
            </Link>
            <Truncate
              className="post-teaser"
              lines={2}
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
            {l.price ? <p>Price: {l.price}</p> : null}
            {l.location ? <p>Location: {l.location}</p> : null}
          </article>
          <span className="post-card-user-info">
            <p>Posted By: {l.user_name}</p>
            <p>Posted On: {formatDate(l.date_posted)}</p>
          </span>
        </li>
      );
    });
  };
  return marketPlacePosts();
}
