const store = {
	comments: [
		{
			id: 9283023,
			postId: 123078923,
			userId: 1,
			userName: 'Sam Smith',
			date: '2019-09-23',
			content: 'This is a amazing post!'
		},
		{
			id: 678567856,
			postId: 23908723490,
			userId: 2,
			userName: 'Anna Duncan',
			date: '2019-08-13',
			content: 'I wish I could post contnet as good as you'
		},
		{
			id: 343478,
			postId: 20893723,
			userId: 1,
			userName: 'Sam Smith',
			date: '2019-09-20',
			content: 'Really cool photos!'
		},
		{
			id: 9064534,
			postId: 20893723,
			userId: 2,
			userName: 'Anna Duncan',
			date: '2019-08-13',
			content: 'I agree.  Beautiful!'
		}
	],
	posts: [
		{
			id: 23908723490,
			forumId: 20,
			userId: 1,
			date: '2019-09-24',
			title: 'I am a new post!',
			author: 'Sam Smith',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			id: 123078923,
			forumId: 1,
			userId: 1,
			date: '2019-09-24',
			title: 'I am another new post!',
			author: 'Sam Smith',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			id: 20893723,
			forumId: 1,
			userId: 10982,
			date: '2019-08-12',
			title: 'Some cool underwater photos',
			author: 'Jessica Dun',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 6
		},
		{
			id: 23902387,
			forumId: 2,
			userId: 10982,
			date: '2019-06-15',
			title: 'Easter Reggata',
			author: 'Rachel Mathis',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 7
		},
		{
			id: 2309872340,
			saleId: 109230,
			forumId: 27,
			userId: 10982,
			date: '2019-06-15',
			title: 'Boat for sale',
			content: '38 foot Catamaran.  1 owner.  Blue with white racing stripes',
			likes: 31,
			price: '$22,039',
			catagory: 'marine',
			contact: {
				name: 'Sam the sailor',
				email: 'samS@hoee.com',
				phone: '1(708)232-4532'
			}
		},
		{
			id: 3978230,
			saleId: 1093450,
			forumId: 27,
			userId: 10982,
			date: '2019-06-15',
			title: 'Swimsuit',
			content: 'ladies binkis',
			likes: 9,
			price: '$22',
			catagory: 'apparel',
			contact: {
				name: 'Dani Colesion',
				email: 'dani@bequia.com',
				phone: '1(708)232-4302'
			}
		}
	],
	events: [
		{
			eventId: 29032,
			userId: 1,
			title: 'Fish Fry',
			location: 'Kegans',
			date: '2019-10-26',
			time: '20:00 - until late',
			description:
				'Come join us on the full moon by the ocean for freash fish and cold beers.  Kids under 5 free!'
		},
		{
			eventId: 2921232,
			userId: 1,
			title: 'Hairoun Beer Night',
			location: 'Papas',
			date: '2019-10-17',
			time: '16:00 - 00:00',
			description: '1/2 price Hairouns all night!'
		},
		{
			eventId: 28032,
			userId: 2,
			title: 'Almond Tree Sing-a-Long',
			location: 'Under The Almond Tree',
			date: '2019-10-24',
			time: '16:00 - until late',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
		},
		{
			eventId: 292122902,
			userId: 1,
			title: 'Hairoun Beer Night',
			location: 'Papas',
			date: '2019-11-10',
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

	forum: [
		[
			{ sectionTitle: 'Life on Bequia' },
			{
				forumId: 1,
				path: 'daily-life',
				title: 'Daily Life',
				description: `Got somethign to say about life on Bequia? If it doesn't fit in any other area, then maybe it will fit here.  No ads in this section please.`
			},
			{
				forumId: 2,
				path: 'politics',
				title: 'Politics',
				description: `What's happening on Bequia? No ads in this section please.`
			},
			{
				forumId: 3,
				path: 'bequia-news',
				title: 'Bequia News',
				description: `Local current news. No ads in this section please.`
			},
			{
				forumId: 4,
				path: 'business-and-entreprenuer',
				title: 'Busines and Entrepreneur',
				description: `Information excahnge for self-employedd and business oriented users.  No ads in this section please.`
			},
			{
				forumId: 5,
				path: 'complaints',
				title: 'Complaints Corner',
				description: `Something really annoying you lately? Get it off your chest here.  If you are really offended, please look elsewhere,  o ads in this section please.`
			},
			{
				forumId: 6,
				path: 'intoduction',
				title: 'Introduction',
				description:
					'Are you new to Bequia, or maybe just new to this forum.  Drop in here and introduce yourself.  No ads in this section please.'
			}
		],
		[
			{ sectionTitle: 'Help & Tips' },
			{
				forumId: 7,
				path: 'permits-visas-government',
				title: 'Permits/Visa/Governemnt',
				description: `Work permits, residence permit and visa issues, dealing with governemnt. No ads in this section please.`
			},
			{
				forumId: 8,
				path: 'general-housing',
				title: 'General Housing',
				description: `NO ADS IN HERE! Movers? Cleaners? You're buying and have questions?  What are your rights?  Basically anything housing related that isn't a advert.`
			},
			{
				forumId: 9,
				path: 'food-and-drink',
				title: 'Food and Drink',
				description: `Looking for some food and drink from home?  Or looking to make some Bequian dish you've seen or tried womewhere else? No ads in this section please.`
			},
			{
				forumId: 10,
				path: 'insurance',
				title: 'Insurance',
				description: `Health insurance, car insurance, any insurance related issues. No ads in this section please.`
			},
			{
				forumId: 11,
				path: 'banking-finance-taxation',
				title: 'Banking/Finance/Taxation',
				description: `Banking issues, tas issues, investments, etc. No ads in this section please.`
			},
			{
				forumId: 12,
				path: 'tv-internet-phone',
				title: 'TV/Internet/Telephone',
				description: `Satellite TV discussions, internet acess, cable, telephone issues, Bequia related technology chat. No ads in this section please.`
			},
			{
				forumId: 13,
				path: 'education',
				title: 'Education',
				description: `From nursery school to university. No ads in this section please.`
			},
			{
				forumId: 14,
				path: 'family-matters-health',
				title: 'Family Matters/Health',
				description: `Birth, death, marriage, divorce, doctors and medical advice, dentist etc. No ads in this section please.`
			},
			{
				forumId: 15,
				path: 'pet-corner',
				title: 'Pet Corner',
				description: `NO ADS IN HERE! Advice on importing, caring, homing, boarding and loving your pets.`
			},
			{
				forumId: 16,
				path: 'transportation-driving',
				title: 'Transportation/Driving',
				description: `Driver's license issues, buying cars, getting around the island.  Anythign Bequia transport related. No ads in this section please.`
			},
			{
				forumId: 17,
				path: 'language-corner',
				title: 'Langaue Corner',
				description: `Questions and answers for any and all language related issues. No ads in this section please.`
			},
			{
				forumId: 18,
				path: 'employment',
				title: 'Emploment',
				description: `Rights at work, legal problems, employment conditions, contract etc. No ads in this section please.`
			},
			{
				forumId: 19,
				path: 'leaving-bequia',
				title: 'Leaving Bequia',
				description: `Info and advice on moving permanently away from the island. No ads in this section please.`
			},
			{
				forumId: 20,
				path: 'other-general',
				title: 'Other/General',
				description: `Question or tips about living on Bequia that don't seem to fit elsewhere. No ads in this section please.`
			}
		],
		[
			{ sectionTitle: 'Activites' },
			{
				forumId: 21,
				path: 'social-events',
				title: 'Social Events',
				description: `Events organized by the Bequai Forum community for the Bequia Forum Community.`
			},
			{
				forumId: 22,
				path: 'commercial-events',
				title: 'Commercial Events',
				description:
					'Public events which are of direct interest and relevance to the island life.'
			},
			{
				forumId: 23,
				path: 'concerts',
				title: 'Concerts',
				description: `Concerts and similar mass events that are open to the public. No sales, wanted or commercial ads in this section please.`
			},
			{
				forumId: 24,
				path: 'sports-fitness-beauty-wellness',
				title: 'Sports/Fitness/Beauty/Wellness',
				description: `Life on Bequia for the more active among us. No ads in this section please.`
			},
			{
				forumId: 25,
				path: 'travel-day-trips-free-time',
				title: 'Travel/ Day Trips/ Free Time',
				description: `SVG only. Ideas, tips, questions. No ads in this section please.`
			},
			{
				forumId: 26,
				path: 'entertainment-and-dinning',
				title: 'Entertainment and Dinning',
				description: `Concerts, bars, restaurants, cafes.  Questions and reviews. No ads in this section please.`
			}
		],
		[
			{ sectionTitle: 'Market Place' },
			{
				forumId: 27,
				path: 'market-place',
				title: 'Market Place',
				description: `Advertisment Area`
			}
		],
		[
			{ sectionTitle: 'Jobs' },
			{
				forumId: 28,
				path: 'jobs',
				title: 'Jobs',
				description: `Advertisment/Wanted Area`
			}
		],
		[
			{ sectionTitle: 'Rentals' },
			{
				forumId: 29,
				path: 'rentals',
				title: 'Rentals',
				description: `Advertisment/Wanted Area`
			}
		],
		[
			{ sectionTitle: 'Off-Topic' },
			{
				forumId: 30,
				path: 'off-topic',
				title: `Off-Topic`,
				description: `Topics not directly related to Bequia`
			}
		],
		[
			{ sectionTitle: 'Support' },
			{
				forumId: 31,
				path: 'suport',
				title: 'Support',
				description: `Questions and information relating to the use of the forum`
			}
		]
	],
	jobs: [
		{
			id: 1,
			title: 'Hospitality',
			description: 'Jobs in Hotel, Resturant, Bar, Cartering services.'
		},
		{
			id: 2,
			title: 'Marine',
			description: 'Jobs in anything sea/sailing related.'
		},
		{
			id: 3,
			title: 'Wellness/Beauty',
			description: 'Jobs related to the body thearpies, beauty and/or health.'
		},
		{
			id: 4,
			title: 'Professional Services',
			description:
				'Jobs that require a high level of skill.  i.e. Architech, Finacial Services, Property Manager, etc.'
		},
		{
			id: 5,
			title: 'Construction',
			description:
				'Jobs in commercial and/or residential building. Labor skills only.'
		},
		{
			id: 6,
			title: 'Special Skills',
			description: 'Jobs that do not fall under any other catagory.'
		}
	],
	rentals: [
		{
			id: 1,
			title: 'Apartment'
		},
		{
			id: 2,
			title: 'House'
		},
		{
			id: 3,
			title: 'Boat'
		},
		{
			id: 4,
			title: 'Car'
		},
		{
			id: 5,
			title: 'Event Space'
		},
		{
			id: 6,
			title: 'Tools'
		},
		{
			id: 7,
			title: 'Sporting/Beach Equipment'
		}
	],
	jobPost: [
		{
			id: 208923,
			jobForumId: 1,
			userId: 10982,
			date: '2019-10-17',
			title: 'Looking for a great bartender',
			description:
				'At the Fig Tree we are all about a good time and we want you to join that vibe! If you have no experierence or have served up on the high seas you are welc oem to apply.  Hours are from 6pm - 12am',
			likes: 2,
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
			id: 433423,
			jobForumId: 1,
			userId: 24231,
			date: '2019-10-20',
			title: 'Executive Chef Needed',
			description: 'In home chef needed for Calabash Villa.',
			likes: 9,
			position: 'chef',
			location: 'Calabash Villa',
			catagory: 'food',
			contact: {
				name: 'Zeenath Khan',
				phone: '+1(708)938-2892',
				email: 'zkhan@gmail.com'
			}
		},
		{
			id: 2308972,
			jobForumId: 5,
			userId: 10982,
			date: '2019-07-30',
			title: 'Need a good Handy Man',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
			likes: 7,
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
			id: 9283723,
			jobForumId: 2,
			userId: 10982,
			date: '2019-03-23',
			title: 'Ey Ey Capitian!',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna',
			likes: 4,
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
	rentalPosts: [
		{
			id: 2349834923,
			rentalTypeId: 2,
			userId: 10982,
			title: 'Beautiful Ocean views Home',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem.',
			likes: 2,
			contact: {
				name: 'Susan Lutz',
				email: 'sLutz@gmail.com',
				phone: '+1(708)453-3495'
			},
			date: '2019-07-17',
			bookingSites: [
				{ title: 'Airbnb', site: 'https://www.airbnb.com' },
				{ title: 'Homeaway', site: null },
				{ title: 'Other', site: 'https://www.google.com' }
			]
		},
		{
			id: 234920014923,
			rentalTypeId: 2,
			userId: 102922,
			title: 'Small Bungaloo Overlook Lower bay',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem.',
			likes: 2,
			contact: {
				name: 'Susan Lutz',
				email: 'sLutz@gmail.com',
				phone: '+1(708)453-3495'
			},
			date: '2019-07-17',
			bookingSites: [
				{ title: 'Airbnb', site: 'https://www.airbnb.com' },
				{ title: 'Homeaway', site: null },
				{ title: 'Other', site: 'https://www.google.com' }
			]
		},
		{
			id: 223,
			rentalTypeId: 3,
			userId: 10982,
			title: 'Power boat',
			description: 'Lorem ipsum dolor sit amet, tempor incididunt ut Lorem.',
			likes: 0,
			contact: {
				name: 'Ron James',
				email: 'capitianRon@hotmail.com',
				phone: '+1(708)564-5669'
			},
			date: '2019-04-25',
			bookingSites: [
				{ title: 'Airbnb', site: 'https://www.airbnb.com' },
				{ title: 'Homeaway', site: null },
				{ title: 'Other', site: 'https://www.google.com' }
			]
		},
		{
			id: 29873,
			rentalTypeId: 7,
			userId: 121982,
			title: 'SUP Board',
			description: 'Lorem ipsum dolor sit amet, tempor incididunt ut Lorem.',
			likes: 0,
			contact: {
				name: 'Ron James',
				email: 'capitianRon@hotmail.com',
				phone: '+1(708)564-5669'
			},
			date: '2019-08-25',
			bookingSites: [
				{ title: 'Airbnb', site: 'https://www.airbnb.com' },
				{ title: 'Homeaway', site: null },
				{ title: 'Other', site: 'https://www.google.com' }
			]
		}
	]
};
export default store;
