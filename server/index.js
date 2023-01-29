import express from "express";
import cors from "cors";
import routes from "./src/routers/index";

const app = express();
const PORT = 8080;
routes(app);

// app.get("/getFormDataField/:id", (req, res) => {
//   let sql = `SELECT * FROM data_field where form_no = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Form data field:\n", result);
//     res.send(result);
//   });
// });

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
