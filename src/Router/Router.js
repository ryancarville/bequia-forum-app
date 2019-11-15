import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import LandingPage from "../components/LandingPage/LandingPage";
import SingUp from "../components/SignUp/SignUp";
import LogIn from "../components/LogIn/LogIn";
import NewPosts from "../components/NewPost/NewPost";
import Forum from "../components/Forum/Forum";
import ForumCatSections from "../components/ForumCatSections/ForumCatSections";
import ForumSection from "../components/ForumSection/ForumSection";
import PostPage from "../components/PostPage/PostPage";
import CreatePost from "../components/CreatePost/CreatePost";
import Events from "../components/Events/Events";
import CreateEvent from "../components/CreateEvent/CreateEvent";
import EventPage from "../components/EventPage/EventPage";
import Directory from "../components/Directory/Directory";
import aboutUs from "../components/AboutUs/aboutUs";
import support from "../components/Support/support";
import donate from "../components/Donate/donate";
import contactUs from "../components/ContactUs/contactUs";
import advertise from "../components/Advertise/advertise";
import Jobs from "../components/Jobs/Jobs";
import JobSection from "../components/JobSection/JobSection";
import JobPage from "../components/JobPage/JobPage";
import CreateJobListing from "../components/CreateJobListing/CreateJobListing";
import Rentals from "../components/Rentals/Rentals";
import RentalSection from "../components/RentalSection/RentalSection";
import RentalPage from "../components/RentalPage/RentalPage";
import CreateRentalListing from "../components/CreateRentalListing/CreateRentalListing";
import MarketPlace from "../components/MarketPlace/MarketPlace";
import MarketPlaceSection from "../components/MarketPlaceSection/MarketPlaceSection";
import NoPath from "../components/404/404";
import MarketPlacePage from "../components/MarketPlacePage/MarketPlacePage";
import CreateMarketPlaceListing from "../components/CreateMarketPlaceListing/CreateMarketPlaceListing";
import ForumContext from "../ForumContext";
import Dashboard from "../components/Dashboard/Dashboard";
import SearchResults from "../components/SearchResults/SearchResults";
export default class Router extends Component {
  static contextType = ForumContext;

  render() {
    return (
      <>
        {this.props.searchResults ? <Redirect to={"/searchResults"} /> : null}
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} exact />
          <Route path="/" component={LandingPage} exact />
          <Route path="/signup" component={SingUp} exact />
          <Route path="/login" component={LogIn} exact />

          <Route path="/searchResults" component={SearchResults} exact />

          <Route path="/new-post" component={NewPosts} exact />

          <Route
            path="/messageBoard/:forum_cat"
            component={ForumCatSections}
            exact
          />
          <Route
            path="/messageBoard/:forum_cat/:board_id"
            component={ForumSection}
            exact
          />
          <Route
            path="/messageBoard/:forum_cat/:board_id/:postId"
            component={PostPage}
            exact
          />
          <Route path="/messageBoard" component={Forum} exact />

          <Route path="/jobs" component={Jobs} exact />
          <Route path="/jobs/:job_cat" component={JobSection} exact />
          <Route path="/jobs/:job_cat/:jobId" component={JobPage} exact />
          <Route path="/createJobListing" component={CreateJobListing} exact />
          <Route path="/createPost" component={CreatePost} exact />
          <Route path="/events" component={Events} exact />
          <Route path="/createEvent" component={CreateEvent} exact />
          <Route path="/events/:eventId" component={EventPage} exact />
          <Route path="/directory" component={Directory} exact />
          <Route path="/rentals" component={Rentals} exact />
          <Route path="/rentals/:rental_cat" component={RentalSection} exact />
          <Route
            path="/rentals/:rentalTypeId/:rentalId"
            component={RentalPage}
            exact
          />
          <Route
            path="/createRentalListing"
            component={CreateRentalListing}
            exact
          />
          <Route path="/marketPlace" component={MarketPlace} exact />
          <Route
            path="/marketPlace/:marketPlaceId"
            component={MarketPlaceSection}
            exact
          />
          <Route
            path="/marketPlace/:marketPlaceId/:marektPlaceListingId"
            component={MarketPlacePage}
            exact
          />
          <Route
            path="/createMarketPlaceListing"
            component={CreateMarketPlaceListing}
            exact
          />

          <Route path="/about-us" component={aboutUs} exact />
          <Route path="/help" component={support} exact />
          <Route path="/donate" component={donate} exact />
          <Route path="/contact-us" component={contactUs} exact />
          <Route path="/advertising" component={advertise} exact />
          <Route component={NoPath} />
        </Switch>
      </>
    );
  }
}
