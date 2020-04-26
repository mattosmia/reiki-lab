const express = require("express");

const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require("cors");
const { check, validationResult } = require('express-validator');
const mysql = require('mysql');
const path = require("path");
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv').config();
}
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const bcrypt_salt = 12;

app.use(cors());
app.use(express.static(path.join('client', 'build')));

// DB connection
const dbConnection = mysql.createConnection(process.env.JAWSDB_URL);

dbConnection.connect((error) => {
	if (error) {
		return console.error('Error connection to database: ' + error.message);
	}
	console.log('Database connection started');
});

app.get('/therapies', (request, response) => {
	dbConnection.query(`SELECT therapy_id, therapy_name FROM Therapies ORDER BY therapy_name ASC`,
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			let therapiesList = [];
			rows.forEach(row => therapiesList.push({ value: row.therapy_id, name: row.therapy_name }));
			return response.status(200).json(therapiesList);
		}
	);
});

app.get('/distance-healing-report', (request, response) => {
	dbConnection.query(`SELECT first_name, last_name, DATE_FORMAT(dob,"%d/%m/%Y") as dob, residence, DATE_FORMAT(date,"%d/%m/%Y %T") as date FROM Distance_healing ORDER BY date ASC`,
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			let distanceHealingReport = [];
			rows.forEach(row => distanceHealingReport.push(row));
			return response.status(200).json(distanceHealingReport);
		}
	);
});

app.get('/users-report', (request, response) => {
	dbConnection.query(`SELECT user_id, email, first_name, last_name, DATE_FORMAT(dob,"%d/%m/%Y") as dob, nationality, residence, volunteer, facebook_url, instagram_url, DATE_FORMAT(approved_date,"%d/%m/%Y %T") as approved_date, DATE_FORMAT(registration_date,"%d/%m/%Y %T") as registration_date FROM users ORDER BY user_id ASC`,
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			let usersReport = [];
			rows.forEach(row => usersReport.push(row));
			return response.status(200).json(usersReport);
		}
	);
});

app.get('/volunteers', (request, response) => {
	dbConnection.query(`SELECT u.user_id, u.email, u.first_name, u.last_name, u.image, u.facebook_url, u.instagram_url, t.therapy_name FROM Users u, Vol_therapies vt, Therapies t WHERE u.volunteer = 'Y' AND vt.vol_id = u.user_id AND vt.therapy_id = t.therapy_id AND u.approved_date IS NOT NULL`,
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			let volunteersList = {};
			rows.forEach(row => {
				if (! volunteersList[row.user_id]) {
					volunteersList[row.user_id] = {
						email: row.email,
						first_name: row.first_name,
						last_name: row.last_name,
						image: row.image,
						facebook_url: row.facebook_url,
						instagram_url: row.instagram_url,
						therapies: []
					}
				}
				volunteersList[row.user_id]['therapies'].push(row.therapy_name);
			});	
			return response.status(200).json(volunteersList);
		}
	);
});

app.post('/register', [
	check('rfFirstName').trim().escape(),
	check('rfLastName').trim().escape(),
	check('rfEmail').trim().normalizeEmail(),
	check('rfDOB').trim().toDate(),
	check('rfNationality').escape(),
	check('rfCountryRes').escape(),
	check('rfFacebook').trim().escape(),
	check('rfInstagram').trim().escape()
], (request, response) => {
	const rfFirstName = request.body.formData.rfFirstName;
	const rfLastName = request.body.formData.rfLastName;
	const rfNationality = request.body.formData.rfNationality;
	const rfCountryRes = request.body.formData.rfCountryRes;
	const rfEmail = request.body.formData.rfEmail;
	const rfFacebook = request.body.formData.rfFacebook || null;
	const rfInstagram = request.body.formData.rfInstagram || null;
	const rfPassword = request.body.formData.rfPassword;
	const rfDOB = request.body.formData.rfDOB;
	const rfTherapies = request.body.formData.rfTherapies;

	const isVolunteer = request.body.formData.rfVolunteer === true? 'Y' : 'N';
	const formattedDOB = rfDOB.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1');

	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		return response.status(422).json({ errors: errors.array() });
	}

	bcrypt.hash(rfPassword, bcrypt_salt).then(function(encryptedPassword) {
		dbConnection.query(`INSERT INTO Users (email, first_name, last_name, dob, nationality, residence, pword, image, volunteer, facebook_url, instagram_url, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, null, ?, ?, ?, NOW())`,
			[rfEmail, rfFirstName, rfLastName, formattedDOB, rfNationality, rfCountryRes, encryptedPassword, isVolunteer, rfFacebook, rfInstagram],
			function(error, result) {
				if (error) {
					return response.status(500).send(error);
				}
				if (rfTherapies.length > 0) {
					const userId = result.insertId;
					let queryValues = [];
					for (var i = 0; i < rfTherapies.length; i++) {
						queryValues.push([userId,rfTherapies[i]])
					}
					dbConnection.query(`INSERT INTO vol_therapies (vol_id, therapy_id) VALUES ?`,
						[queryValues],
						function(error, result) {
							if (error) {
								return response.status(500).send(error);
							}
							return response.status(200).json({msg: 'Success'});
						}
					);
				}
			}
		);
	});
});

app.post('/login', [
	check('lfEmail').trim().normalizeEmail()
], (request, response) => {
	const lfEmail = request.body.formData.lfEmail;
	const lfPassword = request.body.formData.lfPassword;
	bcrypt.hash(lfPassword, bcrypt_salt).then(function(encryptedPassword) {
		dbConnection.query(`SELECT user_id FROM Users WHERE email = ? AND pword = ?`,
			[lfEmail, encryptedPassword],
			function(error, result) {
				if (error) {
					return response.status(500).send(error);
				}
				return response.status(200).json({msg: 'Success'});;
			}
		);
	});
});

app.post('/distance-healing', [
	check('dhfFirstName').trim().escape(),
	check('dhfLastName').trim().escape(),
	check('dhfDOB').trim().toDate(),
	check('dhfCountryRes').escape()
], (request, response) => {
	const dhfFirstName = request.body.formData.dhfFirstName;
	const dhfLastName = request.body.formData.dhfLastName;
	const dhfDOB = request.body.formData.dhfDOB;
	const dhfCountryRes = request.body.formData.dhfCountryRes;

	const formattedDOB = dhfDOB.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1');
	
	dbConnection.query(`INSERT INTO Distance_healing (first_name, last_name, dob, residence, date) VALUES (?, ?, ?, ?, NOW())`,
		[dhfFirstName, dhfLastName, formattedDOB, dhfCountryRes],
		function(error, result) {
			if (error) {
				return response.status(500).send(error);
			}
			return response.status(200).json({msg: 'Success'});
		}
	);
});

app.get('/*', (request, response) => {
	response.sendFile('index.html', { root: './client/build' });
});

app.listen(port, () => console.log("Server started on port " + port));