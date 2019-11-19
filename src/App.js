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
  searchResults = data => {
    this.setState({
      showSearch: false,
      searchBoardDataLoaded: false,
      siteSearchDataLoaded: false
    });

    console.log(data);
    if (data.specificBoard) {
      this.setState({
        searchResults: { formattedPosts: [], numofComments: [] }
      });
      data.specificBoard.map(post => {
        return apiServices
          .getBoardById(post.board_id)
          .then(board => {
            console.log(post);
            console.log(board);
            const formattedPost = {
              section_id: board.messageboard_section,
              post: post
            };
            this.setState({
              searchResults: {
                formattedPosts: [
                  ...this.state.searchResults.formattedPosts,
                  formattedPost
                ],
                numOfComments: []
              }
            });
          })
          .then(() => {
            apiServices
              .getNumOfCommentsByPostId(post.id)
              .then(num => {
                const count = { post_id: post.id, count: num[0].count };
                console.log(count);
                this.setState({
                  searchResults: {
                    formattedPosts: this.state.searchResults.formattedPosts,
                    numOfComments: [
                      ...this.state.searchResults.numOfComments,
                      count
                    ]
                  }
                });
              })
              .then(() => {
                if (
                  data.specificBoard.length ===
                  this.state.searchResults.numOfComments.length
                ) {
                  this.setState(
                    {
                      showSearch: true,
                      searchBoardDataLoaded: true
                    },
                    () => {
                      console.log(this.state);
                    }
                  );
                }
              });
          });
      });
    }

    if (data.length === 4) {
      this.setState(
        {
          searchResults: {
            mbPosts: [],
            mpPosts: [],
            rPosts: [],
            jPosts: [],
            numOfComments: []
          },
          newStateSet: true
        },
        () => {
          console.log(this.state);
        }
      );
      if (this.state.newStateSet) {
        data.forEach(board => {
          console.log(board);
          if (board.mbPosts) {
            this.setState({
              resultsCount:
                this.state.resultsCount + parseInt(board.mbPosts.length)
            });
            board.mbPosts.map(post => {
              return apiServices
                .getBoardById(post.board_id)
                .then(board => {
                  console.log(post);
                  console.log(board);
                  const formattedPost = {
                    section_id: board.messageboard_section,
                    post: post
                  };
                  this.setState({
                    searchResults: {
                      mbPosts: [
                        ...this.state.searchResults.mbPosts,
                        formattedPost
                      ],
                      mpPosts: this.state.searchResults.mpPosts,
                      rPosts: this.state.searchResults.rPosts,
                      jPosts: this.state.searchResults.jPosts,
                      numOfComments: this.state.searchResults.numOfComments
                    }
                  });
                })
                .then(() => {
                  apiServices
                    .getNumOfCommentsByPostId(post.id)
                    .then(num => {
                      const count = { post_id: post.id, count: num[0].count };
                      console.log(count);
                      this.setState({
                        searchResults: {
                          mbPosts: this.state.searchResults.mbPosts,
                          mpPosts: this.state.searchResults.mpPosts,
                          rPosts: this.state.searchResults.rPosts,
                          jPosts: this.state.searchResults.jPosts,
                          numOfComments: [
                            ...this.state.searchResults.numOfComments,
                            count
                          ]
                        }
                      });
                    })
                    .then(() => {
                      if (
                        this.state.searchResults.numOfComments.length ===
                        this.state.resultsCount
                      ) {
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
            this.setState({
              resultsCount:
                this.state.resultsCount + parseInt(board.mpPosts.length)
            });
            board.mpPosts.map(post => {
              return apiServices
                .getBoardById(post.board_id)
                .then(board => {
                  console.log(post);
                  console.log(board);
                  const formattedPost = {
                    section_id: board.messageboard_section,
                    post: post
                  };
                  this.setState({
                    searchResults: {
                      mbPosts: this.state.searchResults.mbPosts,
                      mpPosts: [
                        ...this.state.searchResults.mpPosts,
                        formattedPost
                      ],
                      rPosts: this.state.searchResults.rPosts,
                      jPosts: this.state.searchResults.jPosts,
                      numOfComments: this.state.searchResults.numOfComments
                    }
                  });
                })
                .then(() => {
                  apiServices
                    .getNumOfCommentsByPostId(post.id)
                    .then(num => {
                      const count = {
                        post_id: post.id,
                        count: num[0].count
                      };
                      console.log(count);
                      this.setState({
                        searchResults: {
                          mbPosts: this.state.searchResults.mbPosts,
                          mpPosts: this.state.searchResults.mpPosts,
                          rPosts: this.state.searchResults.rPosts,
                          jPosts: this.state.searchResults.jPosts,
                          numOfComments: [
                            ...this.state.searchResults.numOfComments,
                            count
                          ]
                        }
                      });
                    })
                    .then(() => {
                      if (
                        this.state.searchResults.numOfComments.length ===
                        this.state.resultsCount
                      ) {
                        this.setState({
                          showSearch: true,
                          siteSearchDataLoaded: true
                        });
                      }
                    });
                });
            });
          }

          if (board.rPosts) {
            this.setState({
              resultsCount:
                this.state.resultsCount + parseInt(board.rPosts.length)
            });
            board.rPosts.map(post => {
              return apiServices
                .getBoardById(post.board_id)
                .then(board => {
                  console.log(post);
                  console.log(board);
                  const formattedPost = {
                    section_id: board.messageboard_section,
                    post: post
                  };
                  this.setState({
                    searchResults: {
                      mbPosts: this.state.searchResults.mbPosts,
                      mpPosts: this.state.searchResults.mpPosts,
                      rPosts: [
                        ...this.state.searchResults.rPosts,
                        formattedPost
                      ],
                      jPosts: this.state.searchResults.jPosts,
                      numOfComments: this.state.searchResults.numOfComments
                    }
                  });
                })
                .then(() => {
                  apiServices
                    .getNumOfCommentsByPostId(post.id)
                    .then(num => {
                      const count = { post_id: post.id, count: num[0].count };
                      console.log(count);
                      this.setState({
                        searchResults: {
                          mbPosts: this.state.searchResults.mbPosts,
                          mpPosts: this.state.searchResults.mpPosts,
                          rPosts: this.state.searchResults.rPosts,
                          jPosts: this.state.searchResults.jPosts,
                          numOfComments: [
                            ...this.state.searchResults.numOfComments,
                            count
                          ]
                        }
                      });
                    })
                    .then(() => {
                      if (
                        this.state.searchResults.numOfComments.length ===
                        this.state.resultsCount
                      ) {
                        this.setState({
                          showSearch: true,
                          siteSearchDataLoaded: true
                        });
                      }
                    });
                });
            });
          }
          if (board.jPosts) {
            this.setState({
              resultsCount:
                this.state.resultsCount + parseInt(board.jPosts.length)
            });
            board.jPosts.map(post => {
              return apiServices
                .getBoardById(post.board_id)
                .then(board => {
                  console.log(post);
                  console.log(board);
                  const formattedPost = {
                    section_id: board.messageboard_section,
                    post: post
                  };
                  this.setState({
                    searchResults: {
                      mbPosts: this.state.searchResults.mbPosts,
                      mpPosts: this.state.searchResults.mpPosts,
                      rPosts: this.state.searchResults.rPosts,
                      jPosts: [
                        ...this.state.searchResults.jPosts,
                        formattedPost
                      ],
                      numOfComments: this.state.searchResults.numOfComments
                    }
                  });
                })
                .then(() => {
                  apiServices
                    .getNumOfCommentsByPostId(post.id)
                    .then(num => {
                      const count = { post_id: post.id, count: num[0].count };
                      console.log(count);
                      this.setState({
                        searchResults: {
                          mbPosts: this.state.searchResults.mbPosts,
                          mpPosts: this.state.searchResults.mpPosts,
                          rPosts: this.state.searchResults.rPosts,
                          jPosts: this.state.searchResults.jPosts,
                          numOfComments: [
                            ...this.state.searchResults.numOfComments,
                            count
                          ]
                        }
                      });
                    })
                    .then(() => {
                      if (
                        this.state.searchResults.numOfComments.length ===
                        this.state.resultsCount
                      ) {
                        this.setState({
                          showSearch: true,
                          siteSearchDataLoaded: true
                        });
                      }
                    });
                });
            });
          }
        });
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
