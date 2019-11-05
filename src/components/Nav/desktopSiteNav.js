import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import CreateContentButton from '../CreateContentButton/CreateContentButton';
import TokenServices from '../../services/TokenServices';
export default class DesktopSiteNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSearchForm: false
		};
	}
	showSearchForm = () => {
		this.setState({
			showSearchForm: !this.state.showSearchForm
		});
	};
	render() {
		return (
			<div className='siteNav'>
				<ul>
					<li>
						<Link to='/messageBoard'>
							<p>Forum</p>
						</Link>
					</li>
					<li>
						<Link to='/new-post'>
							<p>New Posts</p>
						</Link>
					</li>
					<li>
						<Link to='/events'>
							<p>Events</p>
						</Link>
					</li>
					<li>
						<Link to='/directory'>
							<p>Directory</p>
						</Link>
					</li>

					<li>
						{TokenServices.getAuthToken() ? (
							<CreateContentButton page='forum' />
						) : null}
					</li>
					<li>
						{!this.state.showSearchForm ? (
							<i
								class='fas fa-search'
								onClick={() => this.showSearchForm()}></i>
						) : null}
						{this.state.showSearchForm ? (
							<SearchInput closeNavSearch={this.showSearchForm} />
						) : null}
					</li>
				</ul>
			</div>
		);
	}
}
