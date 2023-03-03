const db = require("../database/db_connection")

exports.getTicketInfo = async (req, res) => {
    let sql = "SELECT ticket_id, form_name, date_created, date_approved, status, note FROM ticket, form WHERE form.form_no = ticket.ticket_form_no ORDER BY ticket_id DESC";
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log("Ticket Info:\n", results);
      res.send(results);
    });
  }
  