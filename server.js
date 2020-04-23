// server.js
// https://medium.com/jeremy-gottfrieds-tech-blog/tutorial-how-to-deploy-a-production-react-app-to-heroku-c4831dfcfa08
const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const favicon = require('express-favicon');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
const port = process.env.PORT || 8080;
const app = express();

const bcrypt_salt = 12;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
	return res.send('pong');
});

router.post('/api/register', function(req,resp) {
	const isVolunteer = req.body.rfVolunteer? 1 : 0;
	bcrypt.hash(req.body.rfPassword, bcrypt_salt, (err, encrypted) => {
		req.body.rfPassword = encrypted
		next()
	});
	db.query(`INSERT INTO Users VALUES (email, first_name, last_name, dob, nationality, residence, pword, image, volunteer, registration_date) VALUES (${req.body.rfEmail},${req.body.rfFirstName},${req.body.rfLastName}, ${req.body.rfDOB}, ${req.body.rfNationality}, ${req.body.rfResidence}, ${req.body.rfPassword}, ${req.body.rfImage}, ${isVolunteer}, NOW())`, (error, result)=>{
	   if (error) {
			console.log(error);
			return resp.sendStatus(500).send(error);
	   }
	   console.log('SUCCESS!!!');
	});
});



app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);