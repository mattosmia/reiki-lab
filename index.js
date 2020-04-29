const express = require("express");

const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const cors = require("cors");
const jwt = require('jsonwebtoken');
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

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
let refreshTokens = [];
const tokenExpiry = '30m';

// DB connection
const dbConnection = mysql.createConnection(process.env.JAWSDB_URL);

dbConnection.connect((error) => {
	if (error) {
		return console.error('Error connection to database: ' + error.message);
	}
	console.log('Database connection started');
});

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

const randomUUIDGenerator = () => {
	// http://stackoverflow.com/a/8809472
	let d = new Date().getTime();
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c==='x' ? r : (r&0x3|0x8)).toString(16);
	});
}

const authJWT = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (error, user) => {
            if (error) {
                return response.clearCookie('rljwt').sendStatus(403);
            }
            request.user = user;
            next();
        });
    } else {
        response.sendStatus(401);
    }
};

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

app.get('/account-details', authJWT, (request, response) => {
	if (! request) return response.status(500).send({msg: 'Failed to retrieve user'});
	if (! request.user) return response.status(500).send({msg: 'Failed to retrieve user'});
	dbConnection.query(`SELECT u.user_id, u.email, u.first_name, u.last_name, DATE_FORMAT(u.dob,"%d/%m/%Y") as dob, u.nationality, u.residence, u.volunteer, u.image, u.facebook_url, u.instagram_url, vt.therapy_id FROM Users u LEFT JOIN Vol_therapies vt ON vt.vol_id = u.user_id WHERE u.user_id = ?`,
	[ request.user.uid ],
	function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			let accountDetails = {};
				rows.forEach(row => {
				accountDetails['mafUserId'] = row.user_id;
				accountDetails['mafEmail'] = row.email;
				accountDetails['mafFirstName'] = row.first_name;
				accountDetails['mafLastName'] = row.last_name;
				accountDetails['mafDOB'] = row.dob;
				accountDetails['mafNationality'] = row.nationality;
				accountDetails['mafCountryRes'] = row.residence;
				accountDetails['mafFacebook'] = row.facebook_url;
				accountDetails['mafInstagram'] = row.instagram_url;
				accountDetails['mafVolunteer'] = row.volunteer === 'Y' ? true : false;
				if (! accountDetails['mafTherapies']) accountDetails['mafTherapies'] = [];
				accountDetails['mafTherapies'].push(row.therapy_id)
			});	
			return response.status(200).json(accountDetails);
		}
	);
});

// 
app.get('/users-report', authJWT, (request, response) => {
	dbConnection.query(`SELECT user_id, email, first_name, last_name, DATE_FORMAT(dob,"%d/%m/%Y") as dob, nationality, residence, volunteer, facebook_url, instagram_url, DATE_FORMAT(approved_date,"%d/%m/%Y %T") as approved_date, DATE_FORMAT(registration_date,"%d/%m/%Y %T") as registration_date FROM users ORDER BY registration_date DESC`,
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


app.post('/approve-volunteer', authJWT, (request, response) => {
	const { role } = request.user;
	if (role !== 'admin') {
		return response.status(403).send(error);
	}
	const { user_id } = request.body;
	console.log('>>>',user_id)
	dbConnection.query(`UPDATE Users SET approved_date = NOW() WHERE user_id = ?`,
	[ user_id ],
		function(error, rows) {
		if (error) {
			return response.status(500).send(error);
		}
		return response.status(200).json({msg: 'Success'});
		}
	);
});


app.post('/delete-user', authJWT, (request, response) => {
	const { role } = request.user;
	if (role !== 'admin') {
		return response.status(403).send(error);
	}
	const { user_id } = request.body;
	dbConnection.query(`DELETE FROM Users WHERE user_id = ?`,
	[ user_id ],
		function(error, rows) {
		if (error) {
			return response.status(500).send(error);
		}
		return response.status(200).json({msg: 'Success'});
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
	check('rfDOB').trim(),
	check('rfNationality').escape(),
	check('rfCountryRes').escape(),
	check('rfFacebook').trim(),
	check('rfInstagram').trim()
], (request, response) => {
	const { rfFirstName, rfLastName, rfNationality, rfCountryRes, rfEmail, rfPassword, rfDOB, rfTherapies } = request.body;

	const isVolunteer = request.body.rfVolunteer === true? 'Y' : 'N';
	const rfFacebook = request.body.rfFacebook || null;
	const rfInstagram = request.body.rfInstagram || null;

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
	const { lfEmail, lfPassword } = request.body;

	dbConnection.query(`SELECT user_id, email, admin, pword FROM Users WHERE email = ?`,
		[lfEmail],
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			if (rows.length) {
				bcrypt.compare(lfPassword, rows[0].pword, function (pwError, pwResult) {
					if (pwResult === true) {
						const tokenUserObj = { uid: rows[0].user_id, email: rows[0].email, role: (rows[0].admin ? 'admin' : 'user') };
						const accessToken = jwt.sign(tokenUserObj, accessTokenSecret, { expiresIn: tokenExpiry });
						const refreshToken = jwt.sign(tokenUserObj, refreshTokenSecret);
						refreshTokens.push(refreshToken);

						return response.status(200).json({ accessToken, refreshToken });
					} else {
						return response.status(403).json({ msg: 'Cannot authenticate user' });
					}
				});
			} else {
				return response.status(403).json({ msg: 'Cannot authenticate user' });
			}
		}
	);
});

app.post('/token', (request, response) => {
    const { token } = request.body;
console.log('TOKEN',request.body, token)
    if (!token) return response.sendStatus(401);
	if (!refreshTokens.includes(token)) return response.sendStatus(403);
	
    jwt.verify(token, refreshTokenSecret, (error, user) => {
        if (error) {
            return response.sendStatus(403);
        }
        const accessToken = jwt.sign({ uid: user.uid, email: user.email, role: user.role }, accessTokenSecret, { expiresIn: tokenExpiry });
        return response.status(200).json({
            accessToken
        });
    });
});

app.get('/checkToken',authJWT, (request, response) => {
	return response.status(200).json(request.user);
});

app.post('/logout', (request, response) => {
    const { token } = request.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    response.clearCookie('rljwt').status(200).send({ msg: "Success" });
});


app.post('/delete-account', authJWT, (request, response) => {
	if (! request) return response.status(500).send({msg: 'Failed to retrieve user'});
	if (! request.user) return response.status(500).send({msg: 'Failed to retrieve user'});

	dbConnection.query(`DELETE FROM Users WHERE user_id = ?`,
		[ request.user.uid ],
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			refreshTokens = [];
			return response.clearCookie('rljwt').status(200).send({ msg: "Success" });
		}
	)
});

app.post('/update-account', authJWT, [
	check('mafFirstName').trim().escape(),
	check('mafLastName').trim().escape(),
	check('mafEmail').trim().normalizeEmail(),
	check('mafDOB').trim(),
	check('mafNationality').escape(),
	check('mafCountryRes').escape(),
	check('mafFacebook').trim(),
	check('mafInstagram').trim()
], (request, response) => {
	const { mafFirstName, mafLastName, mafNationality, mafCountryRes, mafEmail, mafPassword, mafDOB, mafTherapies } = request.body;

	const isVolunteer = request.body.mafVolunteer === true? 'Y' : 'N';
	const mafFacebook = request.body.mafFacebook || null;
	const mafInstagram = request.body.mafInstagram || null;
	const formattedDOB = mafDOB.replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$3-$2-$1');

    const errors = validationResult(request);
	if (!errors.isEmpty()) {
		return response.status(422).json({ errors: errors.array() });
	}

	const userId = request.user.uid;
	dbConnection.query(`UPDATE Users SET email = ?, first_name = ?, last_name = ?, dob = ?, nationality = ?, residence = ?, volunteer = ?, facebook_url = ?, instagram_url = ? WHERE user_id = ?`,
		[mafEmail, mafFirstName, mafLastName, formattedDOB, mafNationality, mafCountryRes, isVolunteer, mafFacebook, mafInstagram, userId],
		function(error, result) {
			if (error) {
				return response.status(500).send(error);
			}
			if (mafTherapies.length > 0) {
				let queryValues = [];
				for (var i = 0; i < mafTherapies.length; i++) {
					queryValues.push([userId,mafTherapies[i]])
				}
				dbConnection.query(`DELETE FROM vol_therapies WHERE vol_id = ?`,
					[userId],
					function(error, result) {
						if (error) {
							return response.status(500).send(error);
						}
						dbConnection.query(`INSERT INTO vol_therapies (vol_id, therapy_id) VALUES ?`,
							[queryValues],
							function(error, result) {
								if (error) {
									return response.status(500).send(error);
								}

								if (mafPassword) {
									bcrypt.hash(mafPassword, bcrypt_salt).then(function(encryptedPassword) {
										dbConnection.query(`UPDATE Users SET pword = ? WHERE user_id = ?`,
											[encryptedPassword, userId],
											function(error, result) {
												if (error) {
													return response.status(500).send(error);
												}
												return response.status(200).json({msg: 'Success'});
											})
									});
								} else {
									return response.status(200).json({msg: 'Success'});
								}
							}
						);
					}
				);
			}
		}
	);
});

app.post('/distance-healing', [
	check('dhfFirstName').trim().escape(),
	check('dhfLastName').trim().escape(),
	check('dhfDOB').trim(),
	check('dhfCountryRes').escape()
], (request, response) => {
	const { dhfFirstName, dhfLastName, dhfDOB, dhfCountryRes } = request.body;

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

app.post('/forgot-password', (request, response) => {
	const { fpfEmail } = request.body;

	dbConnection.query(`SELECT user_id FROM Users WHERE email = ?`,
		[fpfEmail],
		function(error, rows) {
			if (error) {
				return response.status(500).send(error);
			}
			if (rows.length) {
				const email_key = randomUUIDGenerator();
				dbConnection.query(`INSERT INTO forgot_pw_key (user_id, email_key, valid_until) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 DAY)) ON DUPLICATE KEY UPDATE email_key = ?, valid_until = DATE_ADD(NOW(), INTERVAL 2 DAY)`,
				[rows[0].user_id, email_key, email_key],
				function(error) {
					if (error) {
						return response.status(500).send(error);
					}
					const sgRequest = sg.emptyRequest({
						method: 'POST',
						path: '/v3/mail/send',
						body: {
							personalizations: [{
								to: [{ email: fpfEmail }],
								subject: 'Reiki Lab - Reset your Password',
							}],
							from: {
								email: 'reikilab@reikilabdublin.com',
							},
							content: [{
								type: 'text/plain',
								value: `Hello!\n\nTo reset your Reiki Lab password, please visit the following link: https://reikilab.herokuapp.com/reset-password/${email_key}\n\n Thank you!\n\nReiki Lab`,
							}]
						}
					});
					sg.API(sgRequest)
					.then(resp => {
						return response.status(200).json({msg: 'Success'});
					}).catch(error => {
						return response.status(500).send(error);
					});
				});
			} else {
				return response.status(200).json({msg: 'Success'});
			}
		}
	)
})


app.get('/check-reset-key',[
	check('rpfKey').trim().escape()
], (request, response) => {
	const { rpfKey } = request.query;

	dbConnection.query(`SELECT u.user_id, u.email FROM Users u, forgot_pw_key fpk WHERE fpk.email_key = ? AND TIMEDIFF(fpk.valid_until, NOW()) > 0 AND u.user_id = fpk.user_id`,
	[ rpfKey ],
	function(error, rows) {
		if (error) {
			return response.status(500).send(error);
		}
		if (rows.length) {
			return response.status(200).json({msg: 'Success'});
		}
		return response.status(200).json({msg: 'Invalid key', error: true});
	})
})

app.post('/reset-password',[
	check('rpfKey').trim().escape()
], (request, response) => {
	const { rpfKey, rpfPassword } = request.body;

	dbConnection.query(`SELECT u.user_id, u.email FROM Users u, forgot_pw_key fpk WHERE fpk.email_key = ? AND TIMEDIFF(fpk.valid_until, NOW()) > 0 AND u.user_id = fpk.user_id`,
	[ rpfKey ],
	function(error, rows) {
		if (error) {
			return response.status(500).send(error);
		}
		if (rows.length) {
			const userId = rows[0].user_id;
			bcrypt.hash(rpfPassword, bcrypt_salt).then(function(encryptedPassword) {
				dbConnection.query(`UPDATE Users SET pword = ? WHERE user_id = ?`,
					[encryptedPassword, userId],
					function(error, result) {
						if (error) {
							return response.status(500).send(error);
						}
						dbConnection.query(`DELETE FROM forgot_pw_key WHERE user_id = ?`,
						[userId],
						function(error, result) {
							if (error) {
								return response.status(500).send(error);
							}
							return response.status(200).json({msg: 'Success'});
						})
					})
			});
		} else {
			return response.status(200).json({msg: 'Invalid key', error: true});
		}
	})
});

app.post('/contact', (request, response) => {
	const { cfName, cfEmail, cfSubject, cfMessage } = request.body;

	const sgRequest = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: {
			personalizations: [{
				to: [{ email: 'mattosmia@gmail.com' }],
				subject: `Reiki Lab Contact Form - ${cfSubject}`,
			}],
			from: {
				email: 'reikilab@reikilabdublin.com',
			},
			content: [{
				type: 'text/plain',
				value: `
Reiki Lab Contact Form - this was posted from the website\n\n
-------------------------------------------------------------\n\n
Name: ${cfName}\n
Email: ${cfEmail}\n\n
Subject: ${cfSubject}\n
Message: ${cfMessage}\n
				`,
			}]
		}
	});
	sg.API(sgRequest)
	.then(resp => {
		return response.status(200).json({msg: 'Success'});
	}).catch(error => {
		return response.status(500).send(error);
	});
});

app.get('/*', (request, response) => {
	response.sendFile('index.html', { root: './client/build' });
});

app.listen(port, () => console.log("Server started on port " + port));
