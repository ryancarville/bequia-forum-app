import React from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input/commonjs/formatPhoneNumberDefaultMetadata';
export default function Listings(props) {
	return props.directory.map(d => {
		const name = [d.first_name, d.last_name];
		const fullName = name.join(' ');
		return (
			<div className='directory-listing' key={d.user_id}>
				<ul>
					<h4>{fullName}</h4>
					{d.address ? <li>Address: {d.address}</li> : null}
					{d.city ? <li>City: {d.city}</li> : null}
					{d.country ? <li>Country: {d.country}</li> : null}
					{d.email ? (
						<li>
							Email: <a href={`mailto:${d.email}`}>{d.email}</a>
						</li>
					) : null}

					{d.phone ? (
						<li>Telephone: {formatPhoneNumberIntl(d.phone)}</li>
					) : null}
					{d.website ? (
						<li>
							Website:{' '}
							<a href={d.website} target='_blank' rel='noopener noreferrer'>
								{d.website}
							</a>
						</li>
					) : null}
				</ul>
			</div>
		);
	});
}
