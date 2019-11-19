import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import formatDate from '../../helpers/formatDate';
export default function MarketPlaceSearchResults(props) {
	const marketPlacePosts = () => {
		return props.posts.map(l => {
			const marketPlaceId = l.post.market_place_cat;
			return (
        <li key={l.post.id}>
          <Link
            to={{
              pathname: `/marketPlace/${marketPlaceId}/${l.post.id}`,
              state: { id: l.post.id }
            }}
          >
            <p>{l.post.title}</p>
          </Link>
          <Truncate
            lines={1}
            ellipsis={
              <span>
                ...
                <Link
                  to={{
                    pathname: `/marketPlace/${marketPlaceId}/${l.post.id}`,
                    state: { id: l.post.id }
                  }}
                >
                  Read more
                </Link>
              </span>
            }
          >
            <p>{l.post.description}</p>
          </Truncate>
          <span className="postInfo">
            {l.post.price ? <p>Price: {l.post.price}</p> : null}
            {l.post.location ? <p>Location: {l.post.location}</p> : null}
            <p>Posted By: {l.post.contact_name}</p>
            <p>Posted On: {formatDate(l.post.date_posted)}</p>
          </span>
        </li>
      );
		});
	};
	return marketPlacePosts();
}
