import React from "react";
import "./request-form.css";
import { Button } from "@mui/material";

function RequestForm({ dataFields }) {
  const getCurrentDate = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${`/`}${month < 10 ? `0${month}` : `${month}`}${`/`}${year}`;
  };

  return (
    <form>
      <div className="requestForm-container">
        <div className="requestForm-input-wrapper">
          <p className="requestForm-input-info">Ngày lập yêu cầu</p>
          <input
            type="text"
            className="requestForm-input"
            placeholder={getCurrentDate()}
            disabled
          ></input>
        </div>
        <div className="requestForm-input-wrapper">
          <p className="requestForm-input-info">Số điện thoại</p>
          <input type="text" className="requestForm-input"></input>
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
              />
            </div>
          );
          // <div className="requestForm-input-wrapper">
          //   {/* <label className="requestForm-input-info">{item.label}</label>
          //   <select name={item.label} id={item.label} className="requestForm-input">
          //     {item.selectValue.map((value) =>
          //       <option value={value}>{value}</option>)}
          //   </select> */}
          // </div>
        })}
      </div>
      <div className="requestForm-btn-container">
        <Button variant="outlined">Cancel</Button>
        <Button variant="outlined">Submit</Button>
      </div>
    </form>
  );
}

export default RequestForm;
