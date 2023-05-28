import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import Notification from "../Snackbar/snackbar";
import FormEditing from "../../pages/form-creation/components/FormEditingPopup";

function FormManagement({ columns, rows }) {
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isEditing, setIsEditing] = React.useState(0);
  function handleCloseForm() {
    setIsEditing(-1);
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleModifyFormById = (id) => {
    setIsEditing(id);
    console.log(id);
  };
  const handleDeleteFormById = (id) => {
    async function handleDelete() {
      const form_no = id;
      await axios
        .post(`http://localhost:8080/deleteDynamicFormById`, { form_no })
        .then(() => {
          setIsDeleted(true);
          setTimeout(() => {
            setIsDeleted(false);
            location.reload();
          }, 1500);
        })
        .catch((error) => console.log(error));
    }
    handleDelete();
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", margin: "30px 0" }}>
      <TableContainer sx={{ minHeight: 550, maxHeight: 550, marginTop: 2 }}>
        {isDeleted && <Notification message="Deleted Successfully" />}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, key) => {
                      const value =
                        column.id === "created_date"
                          ? dayjs(row[column.id]).format("DD/MM/YYYY")
                          : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {isEditing === row.form_no && (
                            <FormEditing
                              handleCloseForm={handleCloseForm}
                              {...row}
                              ExistingFormData={JSON.parse(row.form_data)}
                            />
                          )}
                          {column.id === "action" ? (
                            <>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleModifyFormById(row.form_no)
                                }
                              >
                                Modify
                              </Button>
                              <Button
                                variant="outlined"
                                style={{
                                  color: "red",
                                  borderColor: "red",
                                  marginLeft: "10px",
                                }}
                                onClick={() =>
                                  handleDeleteFormById(row.form_no)
                                }
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default FormManagement;
