import React from 'react';
import axios from "axios";

export const processCountriesObject = (obj) => {
	let array = [];
	obj.map(entry => array.push({'name': entry.country_name, 'value': entry.alpha_3}));
	return array;
}

export const createDropdownOptions = (list) => {
	return list.map((entry,k) => <option key={k} value={entry.value? entry.value : entry.name}>{entry.name}</option>)
}

export const fetchTherapiesList = () => {
	return new Promise((resolve, reject) => {
		axios.get('/therapies')
		.then(response => resolve(response))
		.catch(error => { console.error('Error fetching therapies', error); reject(error)});
	});
}