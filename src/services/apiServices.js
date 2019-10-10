import config from '../config';
const apiServices = {
	getFourmSectionTitles() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/forum/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res =>
					!res.ok
						? res.json().then(err => rej(err))
						: res.json().then(data => resolve(data))
				)
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getFourm() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/forum/messageBoards', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res =>
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  })
				)
				.catch(err => {
					return err;
				});
		});
	},
	getPosts() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/forum/posts', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res =>
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  })
				)
				.catch(err => {
					return err;
				});
		});
	},
	getNewestPosts() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/forum/newestPosts', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					return err;
				});
		});
	},
	getComments() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/comments', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								console.log(data);
								return resolve(data);
						  });
				})
				.catch(err => {
					return err;
				});
		});
	},
	getEvents() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/events', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					return err;
				});
		});
	},
	getJobCatagories() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/jobs/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getJobPosts() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/jobs/listings', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getRentalCatagories() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/rentals/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getRentalListings() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/rentals/listings', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getMarketPlaceCatagories() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/marketPlace/catagories', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getMarketPlacePosts() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/marketPlace/listings', {
				methoid: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	getDriectory() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/directory', {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								console.log(data);
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	handleLike(id, like) {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + `/forum/post-like/${id}/${like}`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	createPost(newPost) {
		return new Promise((resolve, rej) => {
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
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	deletePost(id) {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + `/forum/posts/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			})
				.then(res => {
					!res.ok
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								console.log(data);
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	addComment(newComment) {
		return new Promise((resolve, rej) => {
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
						? res.json().then(err => {
								return rej(err);
						  })
						: res.json().then(data => {
								console.log(data);
								return resolve(data);
						  });
				})
				.catch(err => {
					console.log(err);
					return err;
				});
		});
	},
	deleteComment(id) {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + `/comments/delete/${id}`, {
				method: 'DELETE',
				headers: {
					'content-type': 'application/json'
				},
				mode: 'cors'
			}).then(res => {
				!res.ok
					? res.json().then(err => rej(err))
					: res.json().then(data => resolve(data));
			});
		}).catch(err => {
			console.log(err);
			return err;
		});
	}
};

export default apiServices;
