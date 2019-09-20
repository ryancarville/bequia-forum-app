import STORE from '../STORE/store'
const sortFunc = (e) => {
	if (e.target.value === 'newest-posts') {
		let sortedPosts = this.state.posts.sort((a, b) =>
			a.date > b.date ? -1 : 1
		);
		this.setState({
			posts: sortedPosts
		});
	}
	if (e.target.value === 'oldest-posts') {
		let sortedPosts = this.state.posts.sort((a, b) =>
			a.date < b.date ? -1 : 1
		);
		this.setState({
			posts: sortedPosts
		});
	}
	if (e.target.value === 'likes-asc-posts') {
		let sortedPosts = this.state.posts.sort((a, b) =>
			a.likes > b.likes ? -1 : 1
		);
		this.setState({
			posts: sortedPosts
		});
	}
	if (e.target.value === 'likes-dec-posts') {
		let sortedPosts = this.state.posts.sort((a, b) =>
			a.likes < b.likes ? -1 : 1
		);
		this.setState({
			posts: sortedPosts
		});
	}
	if (e.target.value === 'all-posts') {
		this.setState({
			posts: STORE.posts
		});
	}
	if (e.target.value === 'asc-dir') {
		let sortedDir = this.state.directory.sort((a, b) =>
			a.userLName < b.userLName ? -1 : 1
		);
		this.setState({
			directory: sortedDir
		});
	}
	if (e.target.value === 'dec-dir') {
		let sortedDir = this.state.directory.sort((a, b) =>
			a.userLName > b.userLName ? -1 : 1
		);
		this.setState({
			directory: sortedDir
		});
	}
	if (e.target.value === 'all-dir') {
		this.setState({
			directory: STORE.directory
		});
	}
	if (e.target.value === 'newest-rent') {
		let sortedRentals = this.state.rentals.sort((a, b) =>
			a.datePosted < b.datePosted ? -1 : 1
		);
		this.setState({
			rentals: sortedRentals
		});
	}
	if (e.target.value === 'oldest-rent') {
		let sortedRentals = this.state.rentals.sort((a, b) =>
			a.datePosted > b.datePosted ? -1 : 1
		);
		this.setState({
			rentals: sortedRentals
		});
	}
	if (e.target.value === 'housing-rent') {
		let sortedRentals = this.state.rentals.filter(
			a => a.catagory === 'housing'
		);
		this.setState({
			rentals: sortedRentals
		});
	}
	if (e.target.value === 'marine-rent') {
		let sortedRentals = this.state.rentals.filter(a => a.catagory === 'marine');
		this.setState({
			rentals: sortedRentals
		});
	}
	if (e.target.value === 'all-rent') {
		this.setState({
			rentals: STORE.rentals
		});
	}
	if (e.target.value === 'newest-jobs') {
		let sortedJobs = this.state.jobs.sort((a, b) =>
			a.datePosted < b.datePosted ? -1 : 1
		);
		this.setState({
			jobs: sortedJobs
		});
	}
	if (e.target.value === 'oldest-jobs') {
		let sortedJobs = this.state.jobs.sort((a, b) =>
			a.datePosted > b.datePosted ? -1 : 1
		);
		this.setState({
			jobs: sortedJobs
		});
	}
	if (e.target.value === 'service-jobs') {
		let sortedJobs = this.state.jobs.filter(a => a.catagory === 'service');
		this.setState({
			jobs: sortedJobs
		});
	}
	if (e.target.value === 'marine-jobs') {
		let sortedJobs = this.state.jobs.filter(a => a.catagory === 'marine');
		this.setState({
			jobs: sortedJobs
		});
	}
	if (e.target.value === 'all-jobs') {
		this.setState({
			jobs: STORE.jobs
		});
	}
};
export default sortFunc;
