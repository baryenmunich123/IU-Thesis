import React from "react";
import "./request-form.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
function RequestForm({ dataFields, formId }) {
  const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [userID, setUserID] = useState()
  useEffect(() => {
    if (user) {
      setUserID(user);
    };
  }, [user]);
  console.log(userID)

  //Get current date
  const getCurrentDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${`/`}${month < 10 ? `0${month}` : `${month}`}${`/`}${year}`;
  };

  const [dynamicFormData, setDynamicFormData] = useState({})
  const [staticFormData, setStaticFormData] = useState({
    dateCreated: getCurrentDate(),
    phoneNum: ""
  })
  const [alertMessage, setAlertMessage] = useState("");

  let formData = { formId, dynamicFormData, staticFormData, userID }
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("run....")
    try {
      //Check empty form
      if (dynamicFormData
        && Object.keys(dynamicFormData).length === 0
        && Object.getPrototypeOf(dynamicFormData) === Object.prototype) {
        alert('Please fill out the form')
      } else {
        axios
          .post("http://localhost:8080/postFormData", formData)
          .then((res) => {
            alert(res.data.message)
            setAlertMessage(res.data.message)
          })
      }
    } catch (e) {
      console.log("Error", e)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="requestForm-container">
        <div className="requestForm-input-wrapper">
          <p className="requestForm-input-info">Ngày lập yêu cầu</p>
          <input
            type="text"
            className="requestForm-input"
            placeholder={getCurrentDate()}
            value={staticFormData.dateCreated}
            disabled
          />
        </div>
        <div className="requestForm-input-wrapper">
          <p className="requestForm-input-info">Số điện thoại</p>
          <input
            type="text"
            className="requestForm-input"
            onChange={(e) => setStaticFormData({ ...staticFormData, phoneNum: e.target.value })}
            value={staticFormData.phoneNum}
          />
        </div>
        <br></br>
        <br></br>
        <hr></hr>
        {dataFields.map((item) => {
          return (
            <div className="requestForm-input-wrapper">
              <label className="requestForm-input-info">{item.label}</label>
              <input
                type={item.type}
                disabled={item.is_disabled}
                className="requestForm-input"
                placeholder=""
                onChange={(e) => {
                  setDynamicFormData({ ...dynamicFormData, [item.label]: e.target.value })
                }}
                value={dynamicFormData[item.label]}
              />
            </div>
          );
        })}
        <div className="requestForm-btn-container">
          <Button variant="outlined" onClick={() => navigate("/home-page")}>Cancel</Button>
          <Button variant="outlined" type="submit">Submit</Button>
        </div>
        {alertMessage == 'Successfully submit' ? navigate("/request-list") : ''}
      </div>

    </form>
  );
}

export default RequestForm;
