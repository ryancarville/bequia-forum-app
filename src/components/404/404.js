import React from 'react';
import './404.css';
export default function NoPath() {
	return (
		<section className='not-found'>
			<img
				src='https://media.giphy.com/media/fGOAbNrp0WtctLULQV/source.gif'
				alt='plam-tree'
			/>
			<h1>
				<p>
					Path not Found. <br />
					You must have had to many pina coladas and mistyped or this path is
					still under construction. <br />
					Check back later.
				</p>
			</h1>
		</section>
	);
}
