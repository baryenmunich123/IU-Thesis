const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.createNewDynamicForm = async (req, res) => {
  try {
    let dynamic_form_data = req.body;
    let connection = await dbConnection();
    let sql = `INSERT INTO dynamic_form_data (form_name,form_file,form_data, created_date,form_title) VALUES (?, ?, ?, ?,?)`;
    const values = [
      dynamic_form_data.form_name,
      dynamic_form_data.form_file,
      dynamic_form_data.form_data,
      dynamic_form_data.formattedDate,
      dynamic_form_data.formTitle,
    ];
    await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Created New Form",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Error occurred while creating a new form",
    });
  }
};

exports.postDynamicFormData = async (req, res) => {
  try {
    let dynamic_form_data = req.body;
    let connection = await dbConnection();
    let sql = `INSERT INTO ticket (date_created, ticket_form_no, ticket_data,account_id,active_step) VALUES (?,?,?,?,1)`;
    let values = [
      dynamic_form_data.currentDate,
      dynamic_form_data.form_no,
      dynamic_form_data.stringifyData,
      dynamic_form_data.userID,
    ];
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully submit",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormList = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = "SELECT * FROM dynamic_form_data";
    let getFormList = await sqlQuery(connection, sql);

    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormByID = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `
    select form_name,form_file,form_data from dynamic_form_data join ticket on ticket_form_no = form_no where ticket_id = ${req.params.ticketID}`;
    let getFormList = await sqlQuery(connection, sql);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDynamicFormInputsByID = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `
    select form_name,form_data,ticket_data,active_step from dynamic_form_data join ticket on ticket_form_no = form_no where ticket_id = ${req.params.ticketID}`;
    let getFormList = await sqlQuery(connection, sql);
    connection.end();
    res.send(getFormList);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
exports.updateDynamicForm = async (req, res) => {
  try {
    let dynamic_form_data = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE dynamic_form_data
    SET form_name = ?, form_file = ?, form_data = ?, created_date = ?, form_title = ?
    WHERE form_no = ?;
    `;
    const values = [
      dynamic_form_data.form_name,
      dynamic_form_data.form_file,
      dynamic_form_data.form_data,
      dynamic_form_data.formattedDate,
      dynamic_form_data.form_title,
      dynamic_form_data.form_no,
    ];
    await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Modified Form",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Error occurred while creating a new form",
    });
  }
};
exports.deleteDynamicFormById = async (req, res) => {
  try {
    let formData = req.body;
    let connection = await dbConnection();
    let sql = `DELETE FROM dynamic_form_data WHERE form_no = ?`;
    let values = [formData.form_no];
    let postFormData = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};
