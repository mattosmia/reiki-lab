import React, { Component } from 'react';

import VolunteersListItem from './_VolunteersListItem';
import { fetchList } from './__Utils';
import Loading from './__Loading';

class VolunteersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			currentVolunteerPage: 1,
			volunteersPerPage: 6,
			volunteerList: {}
		}
	}

    componentDidMount() {
		fetchList('/volunteers').then(response => {
			this.setState({
				volunteerList: Object.values(response.data),
				loading: false
			});
		});
	}

	loadVolunteerPage = () => {
		const initialIdx = (this.state.currentVolunteerPage - 1) * this.state.volunteersPerPage;
		return this.state.volunteerList.slice(initialIdx, initialIdx + this.state.volunteersPerPage).map((data, idx) => <VolunteersListItem key={idx} data={data} />)
	}

	volunteerPagination = () => {
		let pagination = [];
		for (let i = 0; i < (this.state.volunteerList.length / this.state.volunteersPerPage); i++) {
			pagination.push(<div key={i} onClick={() => this.setState({currentVolunteerPage: i+1})} className={(i+1) === this.state.currentVolunteerPage? 'active' : ''}>{i+1}</div>);
		}
		return pagination;
	}

	render () {
		return (
		<section className="volunteers-list wrapper wrapper--narrower">
			<h1 className="module-heading module-heading--pink">Volunteers</h1>
			{ this.state.loading && <Loading />}
			{ ! this.state.loading && this.state.volunteerList.length > 0 && <>
			<p>Check out the amazing people we have on our team</p>
			<div className="volunteers-list__columns">
				{this.state.currentVolunteerPage && this.loadVolunteerPage()}
			</div>
			<div className="volunteers-list__pagination pagination">
				{this.state.currentVolunteerPage && this.volunteerPagination()}
			</div>
			</>}
			{ ! this.state.loading && ! this.state.volunteerList.length && <p>There are no volunteers available at the moment.<br/>Please check back later.</p>}
		</section>
		)
	};
}

export default VolunteersList;
