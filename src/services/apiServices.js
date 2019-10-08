import config from '../config';
const apiServices = {
	getFourmSectionTitles() {
		return new Promise((resolve, rej) => {
			fetch(config.API_ENDPOINT + '/forum/messageBoard-sections', {
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
								console.log(data);
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
								console.log(data);
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
	}
};

export default apiServices;
