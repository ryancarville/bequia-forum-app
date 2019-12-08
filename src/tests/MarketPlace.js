import React from 'react'
import ReactDOM from 'react-dom'
import MarketPlace from '../components/MarketPlace/MarketPlace'
import MarketPlaceSection from '../components/MarketPlaceSection/MarketPlaceSection'
import MarketPlacePage from '../components/MarketPlacePage/MarketPlacePage'

describe("Market Place Components", () => {
  const div = document.createElement("div");
  it("Market Place renders without crashing", () => {
    ReactDOM.render(<MarketPlace />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Market Place Section renders without crashing", () => {
    const match = { params: { market_place_cat: 2 } };
    ReactDOM.render(<MarketPlaceSection match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Market Place Page renders without crashing", () => {
    const match = { params: { liastingId: 2 } };
    ReactDOM.render(<MarketPlacePage match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
