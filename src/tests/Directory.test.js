import React from "react";
import ReactDOM from "react-dom";
import Directory from "../components/Directory/Directory";

describe("Directory Smoke Tests", () => {
  it("Directory renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Directory />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
