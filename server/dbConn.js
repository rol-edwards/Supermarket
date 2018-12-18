var mysql = require('mysql')
var config = require('./config.js')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : config.user,
  password : config.password,
  database : 'supermarket', 
  insecureAuth: true
});


module.exports = {
	query: function(query, callback){

		connection.query(query, callback)

	}
}


