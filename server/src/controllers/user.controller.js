const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.checkAccountInfo = async (req,res) => {
  try {
    const {account_id, password} = req.body;
    let connection = await dbConnection();
    let getUserNameQuery = `SELECT account_id FROM account WHERE account_id = ? `;
    let getPasswordQuery = `SELECT password FROM account WHERE password = ? `;
    let getUserName = await sqlQuery(connection, getUserNameQuery, [account_id]);
    let getPassword = await sqlQuery(connection, getPasswordQuery, [password]);

    console.log("getUserName",getUserName);
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
