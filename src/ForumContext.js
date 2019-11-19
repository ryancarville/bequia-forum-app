import React from "react";

const ForumContext = React.createContext({
  user: {},
  loggedIn: Boolean,
  setUserData: () => {},
  singUp: () => {},
  login: () => {},
  getUserData: () => {},
  verifyLoginOnReload: () => {}
});

export default ForumContext;
