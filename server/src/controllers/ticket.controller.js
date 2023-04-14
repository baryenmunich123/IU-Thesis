const dbConnection = require("../database/db_connection");
const sqlQuery = require("../database/my_sql_query");

exports.getTicketInfo = async (req, res) => {
    try {
      let connection = await dbConnection();
      let sql = "SELECT ticket_id, form_name, date_created, date_approved, status, note, account_id FROM ticket, form WHERE form.form_no = ticket.ticket_form_no ORDER BY ticket_id DESC";
      let getTicketInfo = await sqlQuery(connection, sql);
      connection.end();
      res.send(getTicketInfo);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
}

exports.getDataByTicketID = async (req, res) => {
  try {
    let connection = await dbConnection();
    let sql = `SELECT ticket_data FROM ticket WHERE ticket_id = ${req.params.id}`;
    let getDataByTicketID = await sqlQuery(connection, sql);
    connection.end();
    res.send(getDataByTicketID);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}
  