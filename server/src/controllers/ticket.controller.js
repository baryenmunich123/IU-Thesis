const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.getTicketInfo = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `SELECT ticket_id,  form_name , date_created, date_approved, status, previous_note, account_id, active_step
    FROM ticket JOIN dynamic_form_data ON dynamic_form_data.form_no = ticket.ticket_form_no
    ORDER BY ticket.ticket_id DESC`;
    let getTicketInfo = await sqlQuery(connection, sql);
    connection.end();
    res.send(getTicketInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.getDataByTicketID = async (req, res) => {
  try {
    let connection = await dbConnection();
    const paramId = req.params.id;
    let sql = `SELECT ticket_data ,previous_note,account_id,status, active_step FROM ticket WHERE ticket_id = ? `;
    const value = [paramId];
    let getDataByTicketID = await sqlQuery(connection, sql, value);
    connection.end();
    res.send(getDataByTicketID);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateStepTicket = async (req, res) => {
  try {
    let connection = await dbConnection();
    let ticketId = req.body.ticketID;
    let sql = `UPDATE ticket SET active_step = active_step + 1 WHERE ticket_id = ? `;
    const values = [ticketId];
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    let connection = await dbConnection();
    let currentDate = req.body.currentDate;
    let ticketId = req.body.ticketID;
    let sql = `UPDATE ticket SET status = "Done", date_approved = ? WHERE ticket_id = ? `;
    const values = [currentDate, ticketId];
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update status successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.updatePreviousNote = async (req, res) => {
  try {
    let connection = await dbConnection();
    const values = [req.body.note, req.body.ticketID];
    let sql = `UPDATE ticket SET previous_note = ? WHERE ticket_id = ? `;
    let updateTicket = await sqlQuery(connection, sql, values);
    connection.end();
    res.status(200).json({
      message: "Update Note successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

exports.disapproveTicket = async (req, res) => {
  try {
    let ticketData = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE ticket
    SET status = 'Update'
    WHERE ticket_id = ?`;
    let values = [ticketData.ticketID];
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

exports.updateTicketData = async (req, res) => {
  try {
    let new_data = req.body;
    let connection = await dbConnection();
    let sql = `UPDATE ticket
    SET   ticket_data = ?,
     status = 'Waiting'
    WHERE ticket_id = ?`;
    let values = [new_data.ticket_data, new_data.ticketID];
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
