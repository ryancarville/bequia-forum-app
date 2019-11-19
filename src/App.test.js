import React from "react";
import Router from "../src/Router/Router";
import ShallowRenderer from "react-test-renderer/shallow";
import Footer from "../src/components/Footer/Footer";
import Nav from "../src/components/Nav/Nav";
import Forum from "../src/components/Forum/Forum";
import ForumCatSections from "./components/ForumCatSections/ForumCatSections";
import ForumSection from "./components/ForumSection/ForumSection";
import Jobs from "./components/Jobs/Jobs";
import JobsSection from "./components/JobSection/JobSection";
import JobsPage from "./components/JobPage/JobPage";
import Rentals from "./components/Rentals/Rentals";
import RentalSection from "./components/RentalSection/RentalSection";
import RentalPage from "./components/RentalPage/RentalPage";
import MarketPlace from "./components/MarketPlace/MarketPlace";
import MarketPlaceSection from "./components/MarketPlaceSection/MarketPlaceSection";
import MarketPlacePage from "./components/MarketPlacePage/MarketPlacePage";
import Directory from "./components/Directory/Directory";
import NewPost from "./components/NewPost/NewPost";
import Dashboard from "./components/Dashboard/Dashboard";

const renderer = new ShallowRenderer();
const tree = renderer.getRenderOutput();

describe("App Component", () => {
  it("renders Nav correctly", () => {
    renderer.render(<Nav />);
    expect(tree).toMatchSnapshot();
  });
  it("renders Router correctly", () => {
    renderer.render(<Router />);
    expect(tree).toMatchSnapshot();
  });
  it("renders footer correctly", () => {
    renderer.render(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Dashboard components", () => {
  it("renders dashboard correctly", () => {
    renderer.render(<Dashboard />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Forum Components", () => {
  it("renders forum correctly", () => {
    renderer.render(<Forum />);
    expect(tree).toMatchSnapshot();
  });

  it("renders forum catagories correctly", () => {
    renderer.render(<ForumCatSections />);
    expect(tree).toMatchSnapshot();
  });

  it("renders forum section correctly", () => {
    const match = { params: { board_id: "1" } };
    renderer.render(<ForumSection match={match} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders New Posts correctly", () => {
    renderer.render(<NewPost />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Rental Components", () => {
  it("renders rentals correctly", () => {
    renderer.render(<Rentals />);
    expect(tree).toMatchSnapshot();
  });

  it("renders rental cats correctly", () => {
    renderer.render(<RentalSection />);
    expect(tree).toMatchSnapshot();
  });

  it("renders rental page correctly", () => {
    renderer.render(<RentalPage />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Jobs Components", () => {
  it("renders jobs correctly", () => {
    renderer.render(<Jobs />);
    expect(tree).toMatchSnapshot();
  });

  it("renders jobs cats correctly", () => {
    renderer.render(<JobsSection />);
    expect(tree).toMatchSnapshot();
  });

  it("renders jobs page cats correctly", () => {
    renderer.render(<JobsPage />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Market Place Components", () => {
  it("renders Market Place correctly", () => {
    renderer.render(<MarketPlace />);
    expect(tree).toMatchSnapshot();
  });
  it("renders Market Place Section Correctly", () => {
    renderer.render(<MarketPlaceSection />);
    expect(tree).toMatchSnapshot();
  });
  it("renders market Place listing correctly", () => {
    renderer.render(<MarketPlacePage />);
    expect(tree).toMatchSnapshot();
  });
});

describe("All Directory Components", () => {
  it("renders directory correctly", () => {
    renderer.render(<Directory />);
    expect(tree).toMatchSnapshot();
  });
});
