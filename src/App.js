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
  verifyLoginOnReload = () => {
    console.log("verify ran");
    const token = TokenServices.getAuthToken();
    if (token) {
      apiServices.verifyToken(token).then(data => {
        if (data.message === "jwt expired") {
          TokenServices.clearAuthToken();
          this.setState({
            loggedIn: false
          });
          return false;
        } else {
          this.setState({
            user: {
              id: data.user_id
            },
            loggedIn: true
          });
          apiServices.getUserData(data.user_id).then(user => {
            this.setState({
              user: {
                id: this.state.user.id,
                name: user.first_name + " " + user.last_name,
                lastLogin: user.last_login
              },
              loggedIn: true
            });
          });
          return true;
        }
      });
    }
  };
  componentDidMount() {
    this.verifyLoginOnReload();
  }

  render() {
    // if (TokenServices.getAuthToken()) {
    //   setTimeout(() => {
    //     const token = TokenServices.getAuthToken();
    //     apiServices.extendToken(token).then(token => {
    //       if (token.error) {
    //         this.setState({
    //           loggedIn: false
    //         });
    //       } else {
    //         console.log(token);
    //         TokenServices.saveAuthToken(token.authToken);
    //         this.setState({
    //           loggedIn: true
    //         });
    //       }
    //     });
    //   }, 16000);
    // }

    const contextValue = {
      loggedIn: this.state.loggedIn,
      setUserData: this.setUserData,
      signUp: this.signUp,
      login: this.login,
      getUserData: this.getUserData,
      user: this.state.user,
      verifyLoginOnReload: this.verifyLoginOnReload
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
