import config from '../config';

const apiServices = {
	signUp(newUser) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/signUp', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newUser),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	login(creds) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/login', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(creds),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	verifyToken(token) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/login/verifyToken/${token}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},

				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getUserData(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/users/${id}`, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getFourmSectionTitles() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getFourm() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/messageBoards', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getPosts() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/posts', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getNewestPosts() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/newestPosts', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	searchPosts(search) {
		if (search.board_id !== null) {
			return new Promise(resolve => {
				fetch(
					config.API_ENDPOINT +
						`/forum/search/posts/${search.board_id}/${search.term}`,
					{
						method: 'GET',
						headers: {
							'content-type': 'application/json'
						},

						mode: 'cors'
					}
				)
					.then(res => {
						!res.ok
							? res.json().then(err => Promise.reject(resolve(err)))
							: res.json().then(data => resolve(data));
					})
					.catch(err => {
						return err;
					});
			});
		} else {
			return new Promise(resolve => {
				fetch(config.API_ENDPOINT + `/forum/search/posts/${search.term}`, {
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},

					mode: 'cors'
				})
					.then(res => {
						!res.ok
							? res.json().then(err => Promise.reject(resolve(err)))
							: res.json().then(data => resolve(data));
					})
					.catch(err => {
						return err;
					});
			});
		}
	},

	getLikesTracker() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/likesTracker', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getComments() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/comments', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getEvents() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/events', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getJobCatagories() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/jobs/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getJobPosts() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/jobs/listings', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getRentalCatagories() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/rentals/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getRentalListings() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/rentals/listings', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getMarketPlaceCatagories() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/marketPlace/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getMarketPlacePosts() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/marketPlace/listings', {
				methoid: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	getDriectory() {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/directory', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addDirectoryListing(newListing) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/directory/addListing', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newListing),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteDirectoryListing(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/directory/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	sortDirectory(sort) {
		return new Promise(resolve => {
			fetch(
				config.API_ENDPOINT + `/directory/sort/${sort.column}/${sort.sortType}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors'
				}
			)
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	sortJobs(sort) {
		return new Promise(resolve => {
			fetch(
				config.API_ENDPOINT + `/jobs/sort/${sort.column}/${sort.sortType}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors'
				}
			)
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	sortRentals(sort) {
		return new Promise(resolve => {
			fetch(
				config.API_ENDPOINT + `/rentals/sort/${sort.column}/${sort.sortType}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors'
				}
			)
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	sortMarketPlace(sort) {
		return new Promise(resolve => {
			fetch(
				config.API_ENDPOINT +
					`/marketPlace/sort/${sort.column}/${sort.sortType}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors'
				}
			)
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	sortForumPosts(sort) {
		return new Promise(resolve => {
			fetch(
				config.API_ENDPOINT + `/forum/sort/${sort.column}/${sort.sortType}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					},
					mode: 'cors'
				}
			)
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addLike(post_id) {
		console.log(post_id);
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/forum/post/addLike/${post_id}`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	minusLike(post_id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/forum/post/minusLike/${post_id}`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addToLikesTracker(info) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/forum/post/addToTracker`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(info),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteFromLikesTracker(info) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/forum/post/deleteFromTracker`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(info),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	createPost(newPost) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/addPost', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newPost),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	editPost(postToUpdate) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/forum/edit', {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(postToUpdate),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deletePost(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/forum/posts/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addComment(newComment) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/comments/addComment', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newComment),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteComment(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/comments/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addEvent(newEvent) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/events/addEvent', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newEvent),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	editEvent(eventToUpdate) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/events/edit', {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(eventToUpdate),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteEvent(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/events/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addJobListing(newEvent) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/jobs/addJob', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newEvent),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	editJobListing(listingToUpdate) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/jobs/edit', {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(listingToUpdate),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteJobListing(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/jobs/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addRentalListing(newRental) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/rentals/addListing', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newRental),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	editRentalListing(listingToUpdate) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/rentals/edit', {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(listingToUpdate),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteRentalListing(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/rentals/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	addMarketPlaceListing(newListing) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/marketPlace/addListing', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(newListing),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	editMarketPlaceListing(listingToUpdate) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + '/marketPlace/edit', {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(listingToUpdate),
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	},
	deleteMarketPlaceListing(id) {
		return new Promise(resolve => {
			fetch(config.API_ENDPOINT + `/marketPlace/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => Promise.reject(resolve(err)))
						: res.json().then(data => resolve(data));
				})
				.catch(err => {
					return err;
				});
		});
	}
};

export default apiServices;
