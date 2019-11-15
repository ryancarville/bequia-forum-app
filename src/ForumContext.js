import React from "react";

const ForumContext = React.createContext({
  user: {},
  setUserData: () => {},
  singUp: () => {},
  login: () => {},
  getUserData: () => {},
  verifyLoginOnReload: () => {}
});

export default ForumContext;
