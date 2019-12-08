import React from "react";
import ReactDOM from "react-dom";
import Forum from "../components/Forum/Forum";
import ForumCatSections from "../components/ForumCatSections/ForumCatSections";
import ForumSection from "../components/ForumSection/ForumSection";
import PostPage from "../components/PostPage/PostPage";
import Post from "../components/Post/Post";
describe(" Forum Smoke Tests", () => {
  it("Forum renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Forum />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Forum Cat Section renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { board_id: 3 } };
    const component = (
      <ForumCatSections match={match}>
        <Post />
      </ForumCatSections>
    );
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Forum Section renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { board_id: 3 } };
    const component = (
      <ForumSection match={match}>
        <Post />
      </ForumSection>
    );
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Post Page renders without crashing", () => {
    const div = document.createElement("div");
    const match = { params: { postId: 3 } };
    const component = (
      <PostPage match={match}>
        <Post />
      </PostPage>
    );
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
