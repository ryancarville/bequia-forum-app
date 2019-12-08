import React from "react";
import ReactDOM from "react-dom";
import Rentals from "../components/Rentals/Rentals";
import RentalsSection from "../components/RentalSection/RentalSection";
import RentalPage from "../components/RentalPage/RentalPage";

describe("Rentals Components", () => {
  const div = document.createElement("div");
  it("Rentals renders without crashing", () => {
    ReactDOM.render(<Rentals />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Rentals Section renders without crashing", () => {
    const match = { params: { rental_cat: 2 } };
    ReactDOM.render(<RentalsSection match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Rentals Pagerenders without crashing", () => {
    const match = { params: { rentalId: 2 } };
    ReactDOM.render(<RentalPage match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
