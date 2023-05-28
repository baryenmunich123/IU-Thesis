import React, { useEffect, useState } from "react";
import "./form-creation.css";
import MainLayout from "../../components/layout";
import { Button } from "@mui/material";
import { columnsFormManagement } from "../../constants/data-test";
import FormManagement from "../../components/table-list/FormManagement";
import BasicModal from "./components/FormCreatePopup";
import axios from "axios";

function FormCreation() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getDynamicFormList")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [newForm, setNewForm] = useState(false);
  function handleCloseForm() {
    setNewForm(false);
  }
  return (
    <div>
      <MainLayout>
        <div className="form-container">
          <div className="form-title">
            <h1 className="form-name">Form Management</h1>
            <Button
              variant="contained"
              className="form-service-link"
              onClick={() => setNewForm(true)}
            >
              ADD
            </Button>
            {newForm && <BasicModal handleCloseForm={handleCloseForm} />}
          </div>
          <div>
            {rows && (
              <FormManagement
                rows={rows}
                columns={columnsFormManagement}
                name="Form Manament"
              />
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

export default FormCreation;
