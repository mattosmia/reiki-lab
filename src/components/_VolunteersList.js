import React, { Component } from 'react';

import VolunteersListItem from './_VolunteersListItem';

class VolunteersList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentVolunteerPage: 1,
			volunteersPerPage: 6,
			volunteerList: []
		}
	}

    componentDidMount() {
        this.setState({
			volunteerList: [
				{firstName: 'Andreia', lastName: 'Auozani', therapies: 'Reiki Practioner, Access Bars, Theta Healer', startDate: '', email: 'andreia@gmail.com', facebook: 'https://facebook.com/profile1', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Dani', lastName: 'Pinheiro', therapies: 'Reiki Practioner, Access Bars, Theta Healer, Yoga Teacher', startDate: '', email: 'dani@gmail.com', facebook: 'https://facebook.com/1232', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Danieli', lastName: 'Rangel', therapies: 'Reiki Practioner, Access Bars', startDate: '', email: 'danieli@gmail.com', facebook: 'https://facebook.com/profil4546e1', instagram: '', image: ''},
				{firstName: 'Eva', lastName: 'Soares', therapies: 'Reiki Practioner, Access Bars, Theta Healer', startDate: '', email: 'eva@gmail.com', facebook: '', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Leo', lastName: 'Harte', therapies: 'Reiki Practioner, Access Bars, Yoga Teacher', startDate: '', email: 'leo@gmail.com', facebook: 'https://facebook.com/prfdsdgofile1', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Renato', lastName: 'Figueiredo', therapies: 'Reiki Practioner, Access Bars', startDate: '', email: 'renato@gmail.com', facebook: '', instagram: '', image: ''},
				{firstName: 'Another', lastName: 'Person', therapies: 'Reiki Practioner, Access Bars', startDate: '', email: '', facebook: 'https://facebook.com/sdffsdf', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Yet', lastName: 'Another', therapies: 'Reiki Practioner, Theta Healer', startDate: '', email: 'dsfdsf@gmail.com', facebook: 'https://facebook.com/45fsdf', instagram: 'https://instagram.com/djasd', image: ''},
				{firstName: 'Last', lastName: 'One', therapies: 'Access Bars, Theta Healer', startDate: '', email: 'sdnajd@gmail.com', facebook: 'https://facebook.com/erfsgr', instagram: 'https://instagram.com/djasd', image: ''}
			]
		})
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
		<section className="volunteers-list wrapper wrapper--narrow">
			<h1 className="module-heading module-heading--pink">Volunteers</h1>
			<p>Check out the amazing people we have on our team</p>
			<div className="volunteers-list__columns">
				{this.state.currentVolunteerPage && this.state.volunteerList.length && this.loadVolunteerPage()}
			</div>
			<div className="volunteers-list__pagination">
				{this.state.currentVolunteerPage && this.state.volunteerList.length && this.volunteerPagination()}
			</div>
		</section>
		)
	};
}

export default VolunteersList;
