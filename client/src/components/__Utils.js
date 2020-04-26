import React from 'react';
import axios from "axios";

import CountriesObj from '../json/countries.json';

export const returnCountriesObject = () => {
	let array = [];
	CountriesObj.map(entry => array.push({'name': entry.country_name, 'value': entry.alpha_3}));
	return array;
}

export const createDropdownOptions = (list) => {
	return list.map((entry,k) => <option key={k} value={entry.value? entry.value : entry.name}>{entry.name}</option>)
}

export const fetchList = (endpoint) => {
	return new Promise((resolve, reject) => {
		axios.get(endpoint)
		.then(response => resolve(response))
		.catch(error => { console.error('Error fetching ' + endpoint, error); reject(error)});
	});
}

export const countryAlpha3ToName = (str) => {
	const country = returnCountriesObject().filter(country => country.value === str);
	return country[0] ? country[0]['name'] : '';
}