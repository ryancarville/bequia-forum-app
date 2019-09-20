export default function CalendarEventLink(events) {
	const calendar = document.getElementById('days');
	console.log(`${calendar}`.length);

	// for (let i = 0; i < events.length; i++) {
	// 	const link = (
	// 		<Link to={`/events/${events[i].eventId}`}>{events[i].title}</Link>
	// 	);

	// }
	return;
}

// for (let i = 0; i < events.length; i++) {
// 	console.log('ran');
// 	const eventDate = events[i].date.split('-');
// 	const eventYear = eventDate[0];
// 	const eventMonth = eventDate[1];
// 	const eventDay = eventDate[2];
// 	if (
// 		eventDay === day.toString() &&
// 		eventMonth === (month + 1).toString() &&
// 		eventYear === year.toString()
// 	) {
// 		const link = (
// 			<ForumContext.Consumer>
// 				{context => context.eventsLink(events[i])}
// 			</ForumContext.Consumer>
// 		);

// 		const test = document.createTextNode(link);
// 		cell.appendChild(link);
// 	}
// }
