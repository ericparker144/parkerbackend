var router = require('express').Router();
var bcrypt = require('bcryptjs');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'letspark',
    password: 'letspark1234',
    database: 'parkerdb'
});
connection.connect();

router.get('/', function (req, res) {
	res.json({ message: 'Parker API.' });
});

router.route('/users').
	get(function (req, res) {
		var query = connection.query('SELECT * FROM users', function (err, rows, fields) {
			if (!err) {
				res.json({error:'', success: true, result: rows});
			}
			else {
				res.json({error: err, success: false, result: []});
			}
		});
	})

	.post(function (req, res) {
	    
	    bcrypt.genSalt(10, function(err, salt) {
		    
		    bcrypt.hash(req.body.password, salt, function(err, hash) {

			    var query = connection.query("INSERT INTO users (FirstName, LastName, Email, Phone, Username, Password) VALUES (?, ?, ?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.username, hash], function (error, rows, fields) {
			        if (!error) {
			            res.json({error:'', success: true, result: []});
			        }
			        else {
			           	res.json({error: err, success: false, result: []})
			        }
			    });
		    });
		});
	})

module.exports = router;