import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ForumCatSections.css";
import apiServices from "../../services/apiServices";
//forum section
export default class ForumCatSections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forumTitle: "",
      threadCounts: [],
      boards: [],
      error: null
    };
  }
  //get number of threads for a board
  getCount = id => {
    const num = this.state.threadCounts.filter(count => count.board_id === id);
    return num[0].count;
  };
  //make all the boards for the section
  makeBoards = () => {
    return this.state.boards.map(item => {
      return (
        <li key={item.id} className="section-cat-item">
          <Link to={`/messageBoard/${item.messageboard_section}/${item.id}`}>
            <div className="section-text">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <span className="thread-count">
              <h5>Threads</h5>

              <p id={`thread-count-${item.id}`}>
                <i className="far fa-file-alt"></i>{" "}
                {this.state.threadCounts.length === this.state.boards.length ? (
                  this.getCount(item.id)
                ) : (
                  <img
                    src="/images/loader/wave-loader.svg"
                    alt="wave-loader"
                    id="wave-loader-gif"
                  />
                )}
              </p>
            </span>
          </Link>
        </li>
      );
    });
  };
  componentDidMount() {
    window.scroll(0, 0);
    const { forum_cat } = this.props.match.params;
    apiServices
      .getForumSectionTitles()
      .then(forumTitles => {
        const title = forumTitles.filter(
          title => title.id.toString() === forum_cat
        );
        this.setState({
          forumTitle: title[0].name
        });
      })
      .then(() => {
        apiServices
          .getForumBoards(forum_cat)
          .then(boards => {
            this.setState({
              boards: boards
            });
          })
          .then(() => {
            var counts = [];
            this.state.boards.forEach(board => {
              apiServices
                .getNumOfThreads(board.id)
                .then(numOfThreads => {
                  counts.push({
                    board_id: board.id,
                    count: numOfThreads[0].count
                  });
                })
                .then(() => {
                  this.setState({
                    threadCounts: counts
                  });
                });
            });
          });
      });
  }

  render() {
    return (
      <section className="forum-cat-sections-container">
        <div className="forum-cat-sections-content">
          <header>
            <p>{this.state.forumTitle}</p>
          </header>
          {this.state.boards ? <ul>{this.makeBoards()}</ul> : <p>Loading...</p>}
        </div>
      </section>
    );
  }
}
