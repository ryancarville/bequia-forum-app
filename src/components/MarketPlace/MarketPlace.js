import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MarketPlace.css";
import CreateContentButton from "../CreateContentButton/CreateContentButton";
import ForumContext from "../../ForumContext";
import apiServices from "../../services/apiServices";
//market place component
export default class MarketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      catagories: []
    };
  }
  //make all market place catagories
  makeCatagories = () => {
    return this.state.catagories.map(mp => (
      <li key={mp.id} className="market-place-card">
        <Link key={`link-${mp.id}`} to={`/marketPlace/${mp.id}`}>
          <img src={mp.img_path} alt={mp.name} className="market-place-img" />
          <p className="market-place-card-text">
            {mp.name}
          </p>
        </Link>
      </li>
    ));
  };
  static contextType = ForumContext;
  componentDidMount() {
    window.scroll(0, 0);
    this.context.verifyLoginOnReload();
    apiServices
      .getMarketPlaceCatagories()
      .then(cats => {
        if (cats.error) {
          this.setState({ error: cats.error });
        } else {
          this.setState({
            catagories: cats
          });
        }
      })
      .then(() => {
        if (this.context.loggedIn) {
          this.setState({
            loggedIn: true
          });
        }
      });
  }

  render() {
    return (
      <section className="market-place-container">
        <span>
          <h3>Market Place</h3>
          {this.state.loggedIn ? (
            <CreateContentButton forumType="market-place" />
          ) : null}
        </span>
        <div className="market-place-content">
          <ul>
            {this.state.catagories ? (
              this.makeCatagories()
            ) : (
              <p>{this.state.error}</p>
            )}
          </ul>
        </div>
      </section>
    );
  }
}
