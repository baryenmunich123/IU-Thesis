const sqlQuery = require("../database/my_sql_query");
const dbConnection = require("../database/db_connection");
// const USER_ATTRIBUTE = require("./userAttribute");
module.exports = {
  _getFormList: async (req, res) => {
    let sql = "SELECT * FROM form";
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Form list:\n", results);
      res.send(results);
    });
  },
  _login : async (req, res) => {
    try {
      const {userName, password} = req.body;
      let connection = await dbConnection();
      let getUserNameQuery = `SELECT userName FROM users WHERE userName = ? `;
      let getPasswordQuery = `SELECT password FROM users WHERE password = ? `;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [userName]); // param 1: connection, param 2: query, param 3: value
      let getPassword = await sqlQuery(connection, getPasswordQuery, [password]);
      connection.end();
      if (getUserName.length === 0) {
        return res.json({
          message: "Invalid userName or password",
        });
      } else if (getPassword.length === 0) {
        return res.json({
          message: "Invalid userName or password",
        });
      } else {
        return res.status(200).json({
          message: "Login Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
};
