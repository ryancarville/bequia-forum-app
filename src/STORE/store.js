const store = {
	posts: [
		{
			postId: 1,
			date: '2019-01-31',
			title: 'I am a new post!',
			author: 'Test User',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			postId: 2,
			date: '2019-01-31',
			title: 'I am another new post!',
			author: 'Test User4',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			postId: 3,
			date: '2019-08-12',
			title: 'Some cool underwater photos',
			author: 'Test User6',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 6
		},
		{
			postId: 4,
			date: '2019-06-15',
			title: 'Easter Reggata',
			author: 'Test User8',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 7
		}
	],
	events: [
		{
			eventId: 29032,
			title: 'Fish Fry',
			location: 'Kegans',
			date: '2019-9-19',
			time: '20:00 - until late',
			description:
				'Come join us on the full moon by the ocean for freash fish and cold beers.  Kids under 5 free!'
		},
		{
			eventId: 2921232,
			title: 'Hairoun Beer Night',
			location: 'Papas',
			date: '2019-9-21',
			time: '16:00 - 00:00',
			description: '1/2 price Hairouns all night!'
		},
		{
			eventId: 28032,
			title: 'Almond Tree Sing-a-Long',
			location: 'Under The Almond Tree',
			date: '2019-9-22',
			time: '16:00 - until late',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
		},
		{
			eventId: 292122902,
			title: 'Hairoun Beer Night',
			location: 'Papas',
			date: '2019-9-30',
			time: '16:00 - 00:00',
			description: '1/2 price Hairouns all night!'
		},
		{
			eventId: 22321232,
			title: 'Hairoun Beer Night',
			location: 'Papas',
			date: '2019-10-30',
			time: '16:00 - 00:00',
			description: '1/2 price Hairouns all night!'
		}
	],
	directory: [
		{
			userId: 23820,
			userLName: 'Smith',
			userFName: 'Sarah',
			email: 'sSmith@gmail.com',
			phone: '+1(708) 234-2434',
			website: 'https://www.smithandsons.com'
		},
		{
			userId: 223820,
			userLName: 'Smith',
			userFName: 'Tom',
			email: 'tSmith@gmail.com',
			phone: '+1(708) 234-0934',
			website: 'https://www.smithandsons.com'
		},
		{
			userId: 239020,
			userLName: 'Duncan',
			userFName: 'Billy',
			email: 'sSmith@gmail.com',
			phone: '+1(708) 234-2434',
			website: 'https://www.smithandsons.com'
		}
	],
	jobs: [
		{
			jobId: 1234,
			datePosted: '2019-10-17',
			title: 'Looking for a great bartender',
			description:
				'At the Fig Tree we are all about a good time and we want you to join that vibe! If you have no experierence or have served up on the high seas you are welc oem to apply.  Hours are from 6pm - 12am',
			position: 'bartender',
			location: 'Fig Tree',
			catagory: 'service',
			contact: {
				name: 'Wendy Leighton',
				phone: '+1(708)345-3346',
				email: 'wendyL@aol.com'
			}
		},
		{
			jobId: 13434,
			datePosted: '2019-7-3',
			title: 'Need a good Handy Man',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
			position: 'handy man',
			location: 'The Sugar Reef',
			catagory: 'service',
			contact: {
				name: 'James Mitchel',
				phone: '+1(708)895-3326',
				email: 'JamesTheMan@hotmail.com'
			}
		},
		{
			jobId: 2309823,
			datePosted: '2019-3-23',
			title: 'Ey Ey Capitian!',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna',
			position: 'Second Mate',
			location: 'Freindship Rose',
			catagory: 'marine',
			contact: {
				name: 'Sarah Smith',
				phone: '+1(708)655-9278',
				email: 'sSmith@hotmail.com'
			}
		}
	],
	rentals: [
		{
			rentalId: 3078954,
			title: 'Beautiful Ocean views Home',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem.',
			contact: {
				name: 'Susan Lutz',
				email: 'sLutz@gmail.com',
				phone: '+1(708)453-3495'
			},
			datePosted: '2019-7-17',
			catagory: 'housing'
		},
		{
			rentalId: 303434,
			title: 'Power boat',
			description: 'Lorem ipsum dolor sit amet, tempor incididunt ut Lorem.',
			contact: {
				name: 'Ron James',
				email: 'capitianRon@hotmail.com',
				phone: '+1(708)564-5669'
			},
			datePosted: '2019-4-25',
			catagory: 'marine'
		}
	],
	marketPlace: [
		{
			saleId: 109230,
			title: 'Boat for sale',
			description:
				'38 foot Catamaran.  1 owner.  Blue with white racing stripes',
			price: '$22,039',
			catagory: 'marine',
			contact: {
				name: 'Sam the sailor',
				email: 'samS@hoee.com',
				phone: '1(708)232-4532'
			}
		},
		{
			saleId: 1093450,
			title: 'Swimsuit',
			description:
				'ladies binkis',
			price: '$22',
			catagory: 'apparel',
			contact: {
				name: 'Dani Collsion',
				email: 'dani@bequia.com',
				phone: '1(708)232-4302'
			}
		}
	]
};

export default store;
