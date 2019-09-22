const store = {
	posts: [
		{
			postId: 1,
			forumId: 20,
			date: '2019-01-31',
			title: 'I am a new post!',
			author: 'Test User',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			postId: 2,
			forumId: 1,
			date: '2019-01-31',
			title: 'I am another new post!',
			author: 'Test User4',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 9
		},
		{
			postId: 3,
			forumId: 1,
			date: '2019-08-12',
			title: 'Some cool underwater photos',
			author: 'Test User6',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 6
		},
		{
			postId: 4,
			forumId: 2,
			date: '2019-06-15',
			title: 'Easter Reggata',
			author: 'Test User8',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			likes: 7
		},
		{
			saleId: 109230,
			forumId: 27,
			date: '2019-06-15',
			title: 'Boat for sale',
			content: '38 foot Catamaran.  1 owner.  Blue with white racing stripes',
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
			forumId: 27,
			date: '2019-06-15',
			title: 'Swimsuit',
			content: 'ladies binkis',
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
			forumId: 27,
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
			forumId: 27,
			title: 'Swimsuit',
			description: 'ladies binkis',
			price: '$22',
			catagory: 'apparel',
			contact: {
				name: 'Dani Colesion',
				email: 'dani@bequia.com',
				phone: '1(708)232-4302'
			}
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
			{ sectionTitle: 'Off-Topic' },
			{
				forumId: 28,
				path: 'off-topic',
				title: `Off-Topic`,
				description: `Topics not directly related to Bequia`
			}
		],
		[
			{ sectionTitle: 'Support' },
			{
				forumId: 29,
				path: 'suport',
				title: 'Support',
				description: `Questions and information relating to the use of the forum`
			}
		]
	]
};
export default store;
