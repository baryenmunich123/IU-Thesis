import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import RequestForm from "../../components/request-form";
import "./request-page.css";
import MainLayout from "../../components/layout";
import { _getFormFields } from "../../services/form-service";

export default function RequestPage() {
  const [dataFields, setDataFields] = useState([]);
  const location = useLocation();


  useEffect(() => {
   {location.state && axios
      .get(`http://localhost:8080/getFormDataField/${location.state.id}`)
      .then((res) => {
        setDataFields(res.data);
      })
      .catch((err) => {
        console.log(err);
      });}
  }, []);

  return dataFields ?
      <MainLayout>
        <div className="requestPage-container">
          <h1 style={{ paddingLeft: "30px" }}>Form: {location.state?.name}</h1>
        {location.state && <RequestForm dataFields={dataFields} formId = {location.state.id}/>}
        </div>
      </MainLayout>
    
  : <p>Loading....</p>
}
