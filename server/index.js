const express = require ("express");
const cors = require ("cors");
const mysql = require ("mysql");
// const routes = require ("./src/routers/index.js");
// const db = require ("./src/database/db_connection");

const app = express();
const PORT = 8080;
// routes(app);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Phong18092001",
  database: "request_portal",
});

db.connect((err)=>{
  if (err) throw err;
  console.log("Mysql connected")
});

app.get("/getFormList",(req, res) => {
  let sql = "SELECT * FROM form";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Form list:\n", results);
    res.send(results);
  });
})

app.get("/getFormDataField/:id", (req, res) => {
  let sql = `SELECT * FROM data_field WHERE form_no = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Form data field:\n", result);
    res.send(result);
  });
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
