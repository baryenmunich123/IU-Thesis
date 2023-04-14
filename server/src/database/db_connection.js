
const mysql = require("mysql");
const dbConfig = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Phong18092001',
    database : 'request_portal'
};
module.exports = () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((error) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(connection);
    });
  });



