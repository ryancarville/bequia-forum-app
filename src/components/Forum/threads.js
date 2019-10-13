import React from 'react';
import apiServices from '../../services/apiServices';
export default function ThreadCount(props) {
	apiServices.getNumOfThreads(props.id).then(numOfThreads => {
		console.log(numOfThreads[0].count);
		document
			.getElementById(`thread-count-${props.id}`)
			.innerText(numOfThreads[0].count);

		return true;
	});
}
