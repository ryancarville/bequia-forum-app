import React from 'react';
import DeleteButton from '../Buttons/deleteButton';
import { formatPhoneNumberIntl } from 'react-phone-number-input/commonjs/formatPhoneNumberDefaultMetadata';
export default function Listings(props) {
	return props.directory.map(d => {
		const name = [d.first_name, d.last_name];
		const fullName = name.join(' ');
		return (
			<li key={d.id} className='directory-listing'>
				<h4>{fullName}</h4>
				{d.address ? <p>Address: {d.address}</p> : null}
				{d.city ? <p>City: {d.city}</p> : null}
				{d.country ? <p>Country: {d.country}</p> : null}
				{d.email ? (
					<p>
						Email: <a href={`mailto:${d.email}`}>{d.email}</a>
					</p>
				) : null}

				{d.phone ? <p>Telephone: {formatPhoneNumberIntl(d.phone)}</p> : null}
				{d.website ? (
					<p>
						Website:{' '}
						<a href={d.website} target='_blank' rel='noopener noreferrer'>
							{d.website}
						</a>
					</p>
				) : null}
				{props.user_id === d.user_id ? (
					<DeleteButton showDeletePopUp={props.showDeletePopUp} id={d.id} />
				) : null}
			</li>
		);
	});
}
