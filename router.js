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
		var query = connection.query('SELECT * FROM users', function (mysqlErr, rows, fields) {
			if (!mysqlErr) {
				res.json({error:'', success: true, result: rows});
			}
			else {
				res.json({error: 'Query Error.', success: false, result: []});
			}
		});
	})

	.post(function (req, res) {
	    
	    bcrypt.genSalt(10, function(gensaltErr, salt) {
		    
		    bcrypt.hash(req.body.password, salt, function(hashErr, hash) {

			    var query = connection.query("INSERT INTO users (FirstName, LastName, Email, Phone, Username, Password) VALUES (?, ?, ?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.username, hash], function (mysqlErr, rows, fields) {
			        if (!mysqlErr) {
			            res.json({error:'', success: true, result: []});
			        }
			        else {
			           	res.json({error: 'Query Error.', success: false, result: []});
			        }
			    });
		    });
		});
	});

router.post('/Login', function (req, res) {

	connection.query('SELECT * FROM users WHERE Username = ?', [req.body.username], function (mysqlErr, rows, fields) {

		if (!mysqlErr) {
			if (rows.length < 1) {
				res.json({error: 'User has not registered with Parker. Please sign up and try again.', success: false, result: []});
			}
			else {
	    		bcrypt.compare(req.body.password, rows[0].Password.toString(), function(bcryptErr, match) {

	    			if (bcryptErr) {
						res.json({error: 'Bcrypt Error.', success: false, result: []});
	    			}
	    			else if (match) {
						res.json({error: '', success: true, result: []});
	    			}
	    			else {
	    				res.json({error: 'Incorrect password.', success: false, result: []});
	    			}
	    		});
			}
		}
		else {
			res.json({error: 'Query Error.', success: false, result: []});
		}
	});

});

module.exports = router;