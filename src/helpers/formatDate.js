const formatDate = postDate => {
	const date = new Date(postDate);
	const formatted_date = new Intl.DateTimeFormat('en-US').format(date);
	return formatted_date;
};

export default formatDate;
