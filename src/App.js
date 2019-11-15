import React, { Component } from "react";
import ForumContext from "./ForumContext";
import Footer from "./components/Footer/Footer";
import "./Animations/Animations.css";
import "./App.css";
import Router from "./Router/Router";
import Nav from "../src/components/Nav/Nav";
import apiServices from "./services/apiServices";
import TokenServices from "./services/TokenServices";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        name: "",
        email: "",
        lastLogin: ""
      },
      loggedIn: false
    };
  }

  setUserData = (user_id, user) => {
    this.setState({
      user: {
        id: user_id,
        name: user.first_name + " " + user.last_name,
        lastLogin: user.last_login
      },
      loggedIn: true
    });
  };
  handleLogOut = () => {
    TokenServices.clearAuthToken();
    this.setState({
      loggedIn: false
    });
  };
  componentDidMount() {
    const token = TokenServices.getAuthToken();
    if (token) {
      apiServices.verifyToken(token).then(data => {
        apiServices.getUserData(data.user_id).then(user => {
          this.setState({
            loggedIn: true,
            user: {
              id: user.id,
              name: user.first_name + " " + user.last_name,
              lastLogin: user.last_login
            }
          });
        });
      });
    } else {
      TokenServices.clearAuthToken();
    }
  }

  render() {
    if (TokenServices.getAuthToken()) {
      setTimeout(() => {
        const token = TokenServices.getAuthToken();
        apiServices.extendToken(token).then(token => {
          if (!token) {
            this.setState({
              loggedIn: false
            });
          } else {
            console.log(token);
            TokenServices.saveAuthToken(token.authToken);
          }
        });
      }, 1.14e6);
    }

    const contextValue = {
      setUserData: this.setUserData,
      signUp: this.signUp,
      login: this.login,
      getUserData: this.getUserData,
      user: this.state.user
    };
    return (
      <ForumContext.Provider value={contextValue}>
        <div className="App">
          <Nav
            loggedIn={this.state.loggedIn}
            handleLogOut={this.handleLogOut}
          />
          <Router searchResults={this.state.searchResults} />
          <Footer />
        </div>
      </ForumContext.Provider>
    );
  }
}
export default App;
