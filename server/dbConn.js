var mysql = require('mysql')
var config = require('./config.js')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.user,
  password : config.password,
  database : 'supermarche', //change this back!!!!!!!!!!!!!!!!!!!!!!!!!!
  insecureAuth: true
});


module.exports = {
	query: function(query, callback){
		//connection.connect()

		connection.query(query, callback)

		//connection.end()
	}
}





/*
function queryToDB(query, callback){
	connection.connect(function(err){
		console.log('You are connected')
	})

	connection.query(query, callback)

	connection.end()
}

dbConn = {};

dbConn.query = function(query){
	return 
	queryToDB(query, function(err, result){
		if (err){
			console.log('err is: ' + err)
		}
		console.log('solution is: ' + JSON.stringify(result))
		}
	)
}*/


