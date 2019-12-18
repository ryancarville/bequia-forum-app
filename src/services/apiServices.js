import config from "../config";
const apiServices = {
  //sign up fetch
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
  //login fetch
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
  //verify JWT
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
  //extend JWT if valid
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
  //get logged in user data
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
  //get any user name by user id
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
  //get the high level forum catagories
  getForumSectionTitles() {
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
  //get a specific message board name by id
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
  //get all the forum sub sections for a category
  getForumBoards(forum_cat) {
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
  //get all message boards
  getForum() {
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
  //get a message board by id
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
  //get all forum posts by board id
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
  //get a message board post by id
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
  //get the number of comments for a single post
  getNumOfCommentsByPostId(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/comments/count-comments/${id}`, {
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
  //get the number of posts on a specific message board
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
  //get newest forum posts
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
  //get all posts for a users
  getAllUserPosts(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/forum/get-user-posts/${id}`, {
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
  //search fetch for entire site and specific boards
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
  //get all the comments for a specific post by post id
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
  //get all the events
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
  //get the upcoming weeks events
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
  //get all the job catagories
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
  //get all the job listings by catagory id
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
  //get job listings by id
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
  //get all the rental catagories
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
  //get rental category name by id
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
  //get all the rental listings by category
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
  //get a rental listing by id
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
  //get all the market place catagories
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
  //get all the market place post by category id
  getMarketPlacePostsByCat(id) {
    return new Promise((resolve, reject) => {
      fetch(config.API_ENDPOINT + `/marketPlace/listings-by-cat/${id}`, {
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
  //get market place listing by id
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
  //get entire directory
  getDirectory() {
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
  //POST to directory
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
  //DELETE from directory
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
  //add like to post
  addLike(post_id) {
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
  //subtract like from post
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
  //get likes tracker
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
        !res.ok
          ? res.json().then(err => reject(err))
          : res.json().then(data => resolve(data));
      });
    }).catch(err => {
      return err;
    });
  },
  //add to likes tracker
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
  //delete from likes tracker
  deleteFromLikesTracker(info) {
    console.log(info);
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
  //create new forum post
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
  //edit forum post
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
  //delete forum post
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
  //add new comment
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
  //delete comment
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
  //get event by event id
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
  //add new event
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
  //edit event
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
  //delete event
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
  //add new job listing
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
  //edit job listing
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
  //delete job listing
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
  //create new rental listing
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
  //edit rental listing
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
  //delete rental listing
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
  //create new market place listing
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
  //edit market place listing
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
  //delete market place listing
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
