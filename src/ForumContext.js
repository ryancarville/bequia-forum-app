import React from "react";

const ForumContext = React.createContext({
  state: {},
  user: {},
  loggedIn: Boolean,
  setUserData: () => {},
  singUp: () => {},
  login: () => {},
  getUserData: () => {},
  verifyLoginOnReload: () => {},
  searchResults: () => {}
});

export default ForumContext;
