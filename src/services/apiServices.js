import config from "../config";


const apiServices = {
  signUp(newUser) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/signUp", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newUser),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  login(creds) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(creds),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/login/verifyToken/${token}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },

        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  extendToken(token) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/login/token/extended/${token}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getUserData(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/users/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getUserName(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/users/userName/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getFourmSectionTitles() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/catagories", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getBoardById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/messageboards/get-board/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getForumNameById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/messageboards/get-board-name/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getFourmBoards(forum_cat) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/messageboards/${forum_cat}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getPostsByBoardId(id) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT + `/forum/messageboards/get-board-posts/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getPostById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/messageboards/get-post-by-id/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getNumOfCommentsByPostId(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/comments/count-coumments/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getFourm() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/messageBoards", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getNumOfThreads(board_id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/numOfThreads/${board_id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getPosts() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/posts", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getNewestPosts() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/newestPosts", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  searchPosts(search) {
    if (search.board_id !== "null") {
      return new Promise((resolve, reject) => {
        fetch(
          config.API_ENDPOINT +
            `/forum/search/posts/${search.board_id}/${search.term}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json"
            },

            mode: "cors"
          }
        ).then(res => {
          !res.ok
            ? res.json().then(err => reject(err))
            : res.json().then(data => resolve(data));
        });
      }).catch(err => {
        return err;
      });
    } else {
      return new Promise((resolve, reject) => {
        fetch(config.API_ENDPOINT + `/forum/search/posts/${search.term}`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },

          mode: "cors"
        }).then(res => {
          !res.ok
            ? res.json().then(err => reject(err))
            : res.json().then(data => resolve(data));
        });
      }).catch(err => {
        return err;
      });
    }
  },

  getCommentsByPostId(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/comments/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getEvents() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/events", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getThisWeeksEvents() {
    let today = new Date();
    let nextWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    today = today.toISOString().slice(0, 10);
    nextWeek = nextWeek.toISOString().slice(0, 10);
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/events/thisWeek/${today}/${nextWeek}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getJobCatagories() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/jobs/catagories", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getJobListingsByCat(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/jobs/listings-by-cat/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getJobListingById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/jobs/listings/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getRentalCatagories() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/rentals/catagories", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getRentalCatName(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/catagories/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getRentalListings(rental_cat) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/rentals/listings-by-cat/${rental_cat}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getRentalListing(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/rentals/listing/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getMarketPlaceCatagories() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/marketPlace/catagories", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getMarketPlacePostsByCat(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/marketPlace/listings-by-cat/${id}`, {
        methoid: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getMarketPlacePosts() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/marketPlace/listings", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getMarketPlacePostsById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/marketPlace/listings/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getDriectory() {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/directory", {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addDirectoryListing(newListing) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/directory/addListing", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newListing),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteDirectoryListing(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/directory/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  sortDirectory(sort) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT + `/directory/sort/${sort.column}/${sort.sortType}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  sortJobs(sort) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT + `/jobs/sort/${sort.column}/${sort.sortType}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  sortRentals(sort) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT + `/rentals/sort/${sort.column}/${sort.sortType}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  sortMarketPlace(sort) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT +
          `/marketPlace/sort/${sort.column}/${sort.sortType}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  sortForumPosts(sort) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT + `/forum/sort/${sort.column}/${sort.sortType}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addLike(post_id) {
    console.log(post_id);
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/post/addLike/${post_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  minusLike(post_id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/post/minusLike/${post_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getLikesTracker(info) {
    return new Promise((resolve, reject) => {
      fetch(
        config.API_ENDPOINT +
          `/forum/likesTracker/${info.user_id}/${info.post_id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          mode: "cors"
        }
      ).then(res => {
        console.log(res);
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addToLikesTracker(info) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/post/addToTracker`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(info),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteFromLikesTracker(info) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/post/deleteFromTracker`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(info),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  createPost(newPost) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/addPost", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newPost),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  editPost(postToUpdate) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/forum/edit", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(postToUpdate),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deletePost(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/posts/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addComment(newComment) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/comments/addComment", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newComment),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteComment(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/comments/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  getEventById(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/events/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addEvent(newEvent) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/events/addEvent", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newEvent),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  editEvent(eventToUpdate) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/events/edit", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(eventToUpdate),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteEvent(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/events/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addJobListing(newEvent) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/jobs/addJob", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newEvent),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  editJobListing(listingToUpdate) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/jobs/edit", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(listingToUpdate),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteJobListing(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/jobs/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addRentalListing(newRental) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/rentals/addListing", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newRental),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  editRentalListing(listingToUpdate) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/rentals/edit", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(listingToUpdate),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteRentalListing(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/rentals/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  addMarketPlaceListing(newListing) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/marketPlace/addListing", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newListing),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  editMarketPlaceListing(listingToUpdate) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + "/marketPlace/edit", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(listingToUpdate),
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  deleteMarketPlaceListing(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/marketPlace/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        mode: "cors"
      }).then(res => {
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  }
};

export default apiServices;
