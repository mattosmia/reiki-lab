import React from 'react';
import axios from "axios";
import cookie from 'react-cookies';

import CountriesObj from '../json/countries.json';

export const returnCountriesObject = () => {
	let array = [];
	CountriesObj.map(entry => array.push({'name': entry.country_name, 'value': entry.alpha_3}));
	return array;
}

export const createDropdownOptions = (list, sel) => {
	return list.map((entry,k) => <option key={k} value={entry.value? entry.value : entry.name} selected={sel? sel.includes(entry.value): false}>{entry.name}</option>)
}

export const fetchList = (endpoint, options) => {
	options = options || {};
	return new Promise((resolve, reject) => {
		axios.get(endpoint, options)
		.then(response => resolve(response))
		.catch(error => { console.error('Error fetching ' + endpoint, error); reject(error)});
	});
}

export const countryAlpha3ToName = (str) => {
	const country = returnCountriesObject().filter(country => country.value === str);
	return country[0] ? country[0]['name'] : '';
}

export const logOut = () => {
	axios.get('/logout')
	.then(response => {
		cookie.remove('rljwt', { path: '/' })
	})
	.catch(error => { console.error('Error logging out', error);});
}

export const isAuthenticated = () => {
	console.log(cookie.load('rljwt'));
}