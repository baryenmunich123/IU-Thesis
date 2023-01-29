import mysql from "mysql";
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Phong18092001",
  database: "request_portal",
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
