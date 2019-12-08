import React from "react";
import ReactDOM from "react-dom";
import Jobs from "../components/Jobs/Jobs";
import JobsSection from "../components/JobSection/JobSection";
import JobPage from "../components/JobPage/JobPage";

describe("Jobs Component", () => {
  it("Jobs renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Jobs />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Job Section renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { job_cat: "2" } };
    ReactDOM.render(<JobsSection match={match} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
    it("Job Page renders without crashing", () => {
      const div = document.createElement("div");
      const match = { params: { jobId: "2" } };
      ReactDOM.render(<JobPage match={match} />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});
