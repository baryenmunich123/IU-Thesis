const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.getFormList = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = "SELECT * FROM form";
    let getFormList = await sqlQuery(connection, sql);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}

exports.getFormDataField = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `SELECT * FROM data_field WHERE form_no = ${req.params.id}`;
    let getDataField = await sqlQuery(connection, sql);
    connection.end();
    res.send(getDataField);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}

exports.postFormData = async (req, res) => {
  try {
    let dataForm = req.body;
    let connection = await dbConnection();
    let sql = `INSERT INTO ticket (date_created, ticket_form_no, ticket_data,account_id) VALUES (?,?,?,?)`;
    let values = [dataForm.staticFormData.dateCreated, dataForm.formId, JSON.stringify(dataForm.dynamicFormData), dataForm.userID]
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully submit"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}
