var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Phong18092001',
    database : 'request_portal'
});

module.exports = connection;

