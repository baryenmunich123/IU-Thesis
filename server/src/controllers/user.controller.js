const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.checkAccountInfo = async (req, res) => {
  try {
    const { account_id, password, type } = req.body;
    let connection = await dbConnection();
    let getUserNameQuery = `SELECT account_id FROM account WHERE account_id = ? `;
    let getPasswordQuery = `SELECT password FROM account WHERE password = ? `;
    let getTypeQuery = `SELECT role FROM account WHERE account_id = '${account_id}'`;
    let getUserName = await sqlQuery(connection, getUserNameQuery, [
      account_id,
    ]);
    let getPassword = await sqlQuery(connection, getPasswordQuery, [password]);
    let getType = await sqlQuery(connection, getTypeQuery, [type]);
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
        role: getType[0].role,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getStaffEmailList = async (req, res) => {
  try {
    let connection = await dbConnection();
    const { staffRole } = req.query;
    let sql =
      "select email from account join profile on account.account_id = profile.userId where role = ?";
    let values = [staffRole];
    let getFormList = await sqlQuery(connection, sql, values);

    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
exports.getStudentEmail = async (req, res) => {
  try {
    let connection = await dbConnection();
    const { requestor } = req.query; // Retrieve requestor value from query parameters
    let sql =
      "SELECT email FROM account JOIN profile ON account.account_id = profile.userId WHERE account_id = ?";
    let values = [requestor];
    let getFormList = await sqlQuery(connection, sql, values);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
