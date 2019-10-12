import React from 'react';
import './DeletePopUp.css';

export default function DeletePopUp(props) {
	return (
		<div className='post-delete-pop-up'>
			{props.postTitle ? (
				<h3>Are you sure you want to delete post '{props.postTitle}'?</h3>
			) : null}
			{props.directoryListing ? (
				<h3>Are you sure you want to delete your listing?</h3>
			) : null}
			{props.eventTitle ? (
				<h3>Are you sure you want to delete post '{props.eventTitle}'?</h3>
			) : null}
			{props.jobTitle ? (
				<h3>
					Are you sure you want to delete the job listing '{props.jobTitle}'?
				</h3>
			) : null}
			{props.rentalTitle ? (
				<h3>
					Are you sure you want to delete the rental listing '
					{props.rentalTitle}'?
				</h3>
			) : null}
			{props.marketPlaceTitle ? (
				<h3>
					Are you sure you want to delete the market place listing '
					{props.marketPlaceTitle}'?
				</h3>
			) : null}
			{props.comment ? (
				<h3>Are you sure you want to delete your comment?</h3>
			) : null}
			<span>
				<button type='button' onClick={props.handleDelete}>
					Yes
				</button>
				<button type='button' onClick={props.showDeletePopUp}>
					No
				</button>
			</span>
		</div>
	);
}
