var app = require('express')();
var bodyParser = require('body-parser');

// To get rid of CORS restrictions
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});

// To use URL params and JSON posted data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Use the router created in router.js file
app.use('/api', require('./router'));

app.listen(port);
console.log('Magic happens on port ' + port);