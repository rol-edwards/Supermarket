var express = require ('express');
var router = new express.Router();
var dbConn = require('./dbConn.js');
var bodyParser = require('body-parser');

router.route('/weekly')
.get(function(req, res, next){
	console.log('request received')
	dbConn.query('select * from weekly', function (err, result) {
	 if (err){console.log(err) };
	  console.log('The solution is: ', JSON.stringify(result))
	  res.json(result)
	});	
})

router.route('/topline')
.get(function(req, res, next){
	console.log('request received')
	dbConn.query('select * from top', function (err, result) {
	 if (err){console.log(err) };
	  console.log('The solution is: ', JSON.stringify(result))
	  res.json(result)
	});	
})

module.exports = router;