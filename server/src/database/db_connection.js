
const mysql = require("mysql");
const dbConfig = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Ititiu19040',
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



