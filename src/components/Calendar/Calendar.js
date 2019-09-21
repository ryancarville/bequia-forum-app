import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Calendar.css';
import { withRouter, Link, Router } from 'react-router-dom';
import CalendarLink from '../../helpers/CalendarLink';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: this.props.events
		};
	}

	renderCalendar = () => {
		let today = new Date();
		let dayInt = today.getDate();
		let month = today.getMonth();
		let year = today.getFullYear();
		let events = this.props.events;

		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		//body of the calendar
		let calendarBody = document.getElementById('days');

		// next and previous functionality
		let nextbtn = document.getElementById('next');
		let prevBtn = document.getElementById('prev');

		nextbtn.onclick = function() {
			next();
		};
		prevBtn.onclick = function() {
			previous();
		};

		// on select of date
		let selectDay = document.getElementsByClassName('singleDay');
		selectDay.onclick = function() {
			let cell = document.createElement('li');
			cell.classList.add('active');
		};
		// init calendar
		showCalendar(month, year);

		function showCalendar(month, year) {
			// gets the day of the week for this date
			let firstDay = new Date(year, month).getDay();
			// clearing all previous cells
			calendarBody.innerHTML = '';
			// checking the mount of days in this month to control the loop
			let totalDays = daysInMonth(month, year);
			// adding the blank boxes so that date start on correct day of the week
			blankDates(firstDay);
			// adding the dates to the calendar
			for (let day = 1; day <= totalDays; day++) {
				// create li node with text content & apend to body
				let cell = document.createElement('li');
				let cellText = document.createTextNode(day);
				// adding active class if day matches today
				if (
					dayInt === day &&
					month === today.getMonth() &&
					year === today.getFullYear()
				) {
					cell.classList.add('active');
				}

				// appending date attributes to single date li element
				cell.setAttribute('data-day', day);
				cell.setAttribute('data-month', month);
				cell.setAttribute('data-year', year);

				//appending li to body of calendar
				cell.classList.add('singleDay');
				cell.appendChild(cellText);

				calendarBody.appendChild(cell);
				for (let i = 0; i < events.length; i++) {
					const eventDate = events[i].date.split('-');
					const eventDay = eventDate[2];
					const eventMonth = eventDate[1];
					const eventYear = eventDate[0];
					const cellDay = cell.getAttribute('data-day');
					const cellMonth = parseInt(cell.getAttribute('data-month'));
					const cellYear = cell.getAttribute('data-year');

					if (
						cellDay === eventDay &&
						(cellMonth + 1).toString() === eventMonth &&
						cellYear === eventYear
					) {
						let visibleEvent = events[i];
						ReactDOM.hydrate(
							<CalendarLink event={visibleEvent} cell={cell} />,
							cell
						);
					}
				}
			}

			// set month string value
			document.getElementById('month').innerHTML = months[month];
			// set year string value
			document.getElementById('year').innerHTML = year;
		}

		function daysInMonth(month, year) {
			// day 0 here returns the last day of the PREVIOUS month
			return new Date(year, month + 1, 0).getDate();
		}

		function blankDates(count) {
			// looping to add the correct amount of blank days to the calendar
			for (let x = 0; x < count; x++) {
				let cell = document.createElement('li');
				let cellText = document.createTextNode('');
				cell.appendChild(cellText);
				calendarBody.appendChild(cell);
			}
		}

		function next() {
			year = month === 11 ? year + 1 : year;
			month = (month + 1) % 12;
			showCalendar(month, year);
		}

		function previous() {
			year = month === 0 ? year - 1 : year;
			month = month === 0 ? 11 : month - 1;
			showCalendar(month, year);
		}
	};
	componentDidMount() {
		this.renderCalendar();
	}

	render() {
		return (
			<div className='events-calendar-container'>
				<div className='calendar-content'>
					<h2>Events Calendar</h2>
					<div id='calendar'>
						<div className='month'>
							<ul>
								<li id='prev'>&#10094;</li>
								<li id='month'></li>
								<li id='year'></li>
								<li id='next'>&#10095;</li>
							</ul>
						</div>

						<ul id='weekdays'>
							<li>Su</li>
							<li>Mo</li>
							<li>Tu</li>
							<li>We</li>
							<li>Th</li>
							<li>Fr</li>
							<li>Sa</li>
						</ul>

						<ul id='days'></ul>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Calendar);
