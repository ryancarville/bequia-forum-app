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
      searchResults: { formattedPosts: [], numOfComments: [] },
      resultsCount: 0,
      showSearch: false,
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
  searchResults = data => {
    this.setState({
      showSearch: false,
      searchResults: {},
      siteSearchResults: {},
      resultsCount: 0,
      searchBoardDataLoaded: false,
      siteSearchDataLoaded: false
    });
    if (data.message) {
      this.setState({
        searchResults: { error: data.message },
        showSearch: true
      });
      return true;
    }
    if (data.specificBoard) {
      this.setState({
        searchResults: { formattedPosts: [], numofComments: [] }
      });
      data.specificBoard.map(post => {
        const formattedPost = post;
        return apiServices
          .getBoardById(post.board_id)
          .then(board => {
            formattedPost.section_id = board.messageboard_section;
          })
          .then(() => {
            apiServices
              .getUserName(post.user_id)
              .then(user => {
                formattedPost.user_name = user.user_name;
              })
              .then(() => {
                apiServices
                  .getNumOfCommentsByPostId(post.id)
                  .then(num => {
                    formattedPost.commentCount = num[0].count;
                    this.setState({
                      searchResults: {
                        formattedPosts: [
                          ...this.state.searchResults.formattedPosts,
                          formattedPost
                        ]
                      }
                    });
                  })
                  .then(() => {
                    if (
                      data.specificBoard.length ===
                      this.state.searchResults.formattedPosts.length
                    ) {
                      this.setState({
                        showSearch: true,
                        searchBoardDataLoaded: true
                      });
                    }
                  });
              });
          });
      });
      return true;
    }

    if (data[0].siteSearch) {
      this.setState({
        siteSearchResults: {
          mbPosts: [],
          mpPosts: [],
          rPosts: [],
          jPosts: [],
          numOfComments: []
        },
        newStateSet: true
      });
      let resultsLength = 0;
      data.forEach(data => {
        if (data.siteSearch) {
          return;
        }
        for (var propName in data) {
          if (data.hasOwnProperty(propName)) {
            var propValue = data[propName];
            var size = propValue.length;
            resultsLength += parseInt(size);
          }
        }
      });
      if (this.state.newStateSet) {
        data.forEach(board => {
          if (board.siteSearch) {
            return;
          }
          if (board.mbPosts) {
            board.mbPosts.map(post => {
              const formattedPost = post;
              return apiServices
                .getBoardById(post.board_id)
                .then(board => {
                  formattedPost.section_id = board.messageboard_section;
                })
                .then(() => {
                  apiServices.getUserName(post.user_id).then(user => {
                    formattedPost.user_name = user.user_name;
                  });
                })
                .then(() => {
                  apiServices
                    .getNumOfCommentsByPostId(post.id)
                    .then(num => {
                      formattedPost.commentCount = num[0].count;
                      this.setState({
                        siteSearchResults: {
                          mbPosts: [
                            ...this.state.siteSearchResults.mbPosts,
                            formattedPost
                          ],
                          mpPosts: this.state.siteSearchResults.mpPosts,
                          rPosts: this.state.siteSearchResults.rPosts,
                          jPosts: this.state.siteSearchResults.jPosts
                        },
                        resultsCount: this.state.resultsCount + 1
                      });
                    })
                    .then(() => {
                      if (this.state.resultsCount === resultsLength) {
                        this.setState({
                          showSearch: true,
                          siteSearchDataLoaded: true
                        });
                      }
                    });
                });
            });
          }
          if (board.mpPosts) {
            board.mpPosts.map(post => {
              const formattedPost = post;
              return apiServices
                .getUserName(post.user_id)
                .then(user => {
                  formattedPost.user_name = user.user_name;
                })
                .then(() => {
                  this.setState({
                    siteSearchResults: {
                      mbPosts: this.state.siteSearchResults.mbPosts,
                      mpPosts: [
                        ...this.state.siteSearchResults.mpPosts,
                        formattedPost
                      ],
                      rPosts: this.state.siteSearchResults.rPosts,
                      jPosts: this.state.siteSearchResults.jPosts
                    },
                    resultsCount: this.state.resultsCount + 1
                  });
                });
            });
          }

          if (board.rPosts) {
            board.rPosts.map(post => {
              const formattedPost = post;
              return apiServices
                .getUserName(post.user_id)
                .then(user => {
                  formattedPost.user_name = user.user_name;
                })
                .then(() => {
                  this.setState({
                    siteSearchResults: {
                      mbPosts: this.state.siteSearchResults.mbPosts,
                      mpPosts: this.state.siteSearchResults.mpPosts,

                      rPosts: [
                        ...this.state.siteSearchResults.rPosts,
                        formattedPost
                      ],
                      jPosts: this.state.siteSearchResults.jPosts
                    },
                    resultsCount: this.state.resultsCount + 1
                  });
                });
            });
          }
          if (board.jPosts) {
            board.jPosts.map(post => {
              const formattedPost = post;
              return apiServices
                .getUserName(post.user_id)
                .then(user => {
                  formattedPost.user_name = user.user_name;
                })
                .then(() => {
                  this.setState({
                    siteSearchResults: {
                      mbPosts: this.state.siteSearchResults.mbPosts,
                      mpPosts: this.state.siteSearchResults.mpPosts,
                      rPosts: this.state.siteSearchResults.rPosts,
                      jPosts: [
                        ...this.state.siteSearchResults.jPosts,
                        formattedPost
                      ]
                    },
                    resultsCount: this.state.resultsCount + 1
                  });
                });
            });
          }

          if (this.state.resultsCount === resultsLength) {
            this.setState({
              showSearch: true,
              siteSearchDataLoaded: true
            });
          }
        });
        return true;
      }
    }
  };

  componentDidMount() {
    this.verifyLoginOnReload();
  }

  render() {
    const contextValue = {
      state: this.state,
      loggedIn: this.state.loggedIn,
      setUserData: this.setUserData,
      signUp: this.signUp,
      login: this.login,
      getUserData: this.getUserData,
      user: this.state.user,
      verifyLoginOnReload: this.verifyLoginOnReload,
      searchResults: this.searchResults
    };
    return (
      <ForumContext.Provider value={contextValue}>
        <div className="App">
          <Nav
            loggedIn={this.state.loggedIn}
            handleLogOut={this.handleLogOut}
          />
          <Router
            searchResults={this.state.searchResults}
            showSearch={this.state.showSearch}
          />
          <Footer />
        </div>
      </ForumContext.Provider>
    );
  }
}
export default App;
