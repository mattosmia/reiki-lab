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
	dbConnection.query(`SELECT therapy_id, therapy_name FROM Therapies`, function(error, rows) {
		if (error) {
			return response.status(500).send(error);
		}
		let therapiesList = [];
		rows.forEach(row => therapiesList.push({ value: row.therapy_id, name: row.therapy_name }));
		return response.status(200).json(therapiesList);
	});
});

app.get('/volunteers', (request, response) => {
	dbConnection.query(`SELECT u.user_id, u.email, u.first_name, u.last_name, u.image, u.facebook_url, u.instagram_url, t.therapy_name FROM Users u, Vol_therapies vt, Therapies t WHERE u.volunteer = 1 AND vt.vol_id = u.user_id AND vt.therapy_id = t.therapy_id;`, function(error, rows) {
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
			volunteersList[row.user_id][therapies].push(row.therapy_name);
		});	
		return response.status(200).json(volunteersList);
	});
});

app.get('/*', (req, res) => {
	res.sendFile('index.html', { root: './client/build' });
});


// app.post('/register', [
// 	check('rfFirstName').trim().escape(),
// 	check('rfLastName').trim().escape(),
// 	check('rfEmail').trim().isEmail().normalizeEmail(),
// 	check('rfDOB').trim().toDate(),
// 	check('rfNationality').isLength(3).escape(),
// 	check('rfCountryRes').isLength(3).escape(),
// 	check('rfFacebook').trim().escape(),
// 	check('rfInstagram').trim().escape()
// ], (request, response) => {
// 	const rfFirstName = req.body.formData.rfFirstName;
// 	const rfLastName = req.body.formData.rfLastName;
// 	const rfNationality = req.body.formData.rfNationality;
// 	const rfCountryRes = req.body.formData.rfCountryRes;
// 	const rfEmail = req.body.formData.rfEmail;
// 	const rfFacebook = req.body.formData.rfFacebook;
// 	const rfInstagram = req.body.formData.rfInstagram;
// 	const rfTherapies = req.body.formData.rfTherapies;

// 	const errors = validationResult(req);

// 	if (!errors.isEmpty()) {
// 		return res.status(422).json({ errors: errors.array() });
// 	}

// 	const rfDOB = req.body.formData.rfDOB.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1');

// 	const isVolunteer = req.body.formData.rfVolunteer === true? 1 : 0;

// 	let rfPassword = '';

// 	bcrypt.hash(req.body.formData.rfPassword, bcrypt_salt, (err, encrypted) => {
// 		rfPassword = encrypted
// 	});


// 	// db.query
// 	console.log(`INSERT INTO Users VALUES (email, first_name, last_name, dob, nationality, residence, pword, image, volunteer, registration_date) VALUES (${rfEmail}, ${rfFirstName}, ${rfLastName}, ${rfDOB}, ${rfNationality}, ${rfCountryRes}, ${rfPassword}, null, ${isVolunteer}, NOW())`)
// 		//, (error, result)=>{
// 	//    if (error) {
// 	// 		console.log(error);
// 	// 		return resp.sendStatus(500).send(error);
// 	//    }
// 	//    console.log('SUCCESS!!!');
// 	// });
// 	return resp.sendStatus(200);
// });

app.listen(port, () => console.log("Server started on port " + port));