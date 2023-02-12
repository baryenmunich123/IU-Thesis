const db = require("../database/db_connection.js")

exports.getFormList = async (req, res) => {
  let sql = "SELECT * FROM form";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Form list:\n", results);
    res.send(results);
  });
}

exports.getFormDataField = async (req, res) => {
  let sql = `SELECT * FROM data_field WHERE form_no = ${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Form list:\n", results);
    res.send(results);
  });
}

exports.postFormData = async (req, res) => {
  let dataForm = req.body;
  console.log("Data received from FE:", dataForm)
  let sql = `INSERT INTO ticket (date_created, ticket_form_no, ticket_data) VALUES (?,?,?)`;
  let values = [dataForm.staticFormData.dateCreated, dataForm.formId, JSON.stringify(dataForm.dynamicFormData)]
  await db.query(sql, values, (err) => {
    if (err) throw err;
  });
  res.status(200).json({
    message: "Successfully submit"
  })
}
