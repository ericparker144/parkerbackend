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
				res.json({error: err, success: true, result: []});
			}
		});
	})

	.post(function (req, res) {
	    
	    bcrypt.genSalt(10, function(err, salt) {
		    
		    bcrypt.hash(req.body.password, salt, function(err, hash) {

		    var post = {
		        user_name: req.body.user_name,
		        first_name: req.body.first_name,
		        last_name: req.body.last_name,
		        password: hash
		    };

		    var query = connection.query("INSERT INTO users (FirstName, LastName, Email, Phone, Password, Username) VALUES (?, ?, ?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.password, req.body.username], function (error, rows, fields) {
		        if (!error)
		            res.json("Success");
		        else {
		            res.json("No Good");
		        }
		    });

		    console.log(query.sql);

		    });
		});
	})

module.exports = router;