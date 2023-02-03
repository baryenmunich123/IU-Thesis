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
  console.log(location.state.id);
  // useEffect(() => {
  //   const _getDataFields = async () => {
  //     const response = await _getFormFields();
  //     console.log("response11 ", response);
  //     setDataFields(response?.data);
  //   };
  //   _getDataFields();
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getFormDataField/${location.state.id}`)
      .then((res) => {
        setDataFields(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MainLayout>
        <div className="requestPage-container">
          <h1 style={{ paddingLeft: "30px" }}>Form: {location.state?.name}</h1>
          <RequestForm dataFields={dataFields} />
        </div>
      </MainLayout>
    </>
  );
}

// const formValue = [
//   {
//     type: "text",
//     isDisabled: true,
//     inputName: "Tên sinh viên",
//     inputValue: "Nguyễn Thanh Phong",
//     selectName: "",
//     selectValue: [],
//   },
//   {
//     type: "text",
//     isDisabled: true,
//     inputName: "Mã số sinh viên",
//     inputValue: "ITITIU19040",
//     selectName: "",
//     selectValue: [],
//   },
//   {
//     type: "text",
//     isDisabled: true,
//     inputName: "Ngày sinh",
//     selectName: "",
//     inputValue: "18/09/2001",
//     selectValue: [],
//   },
//   {
//     type: "date",
//     isDisabled: false,
//     inputName: "Năm nhập học",
//     selectName: "",
//     selectValue: [],
//   },
//   {
//     type: "date",
//     isDisabled: false,
//     inputName: "Năm kết thúc (dự kiến)",
//     selectName: "",
//     selectValue: [],
//   },
//   {
//     type: "date",
//     isDisabled: false,
//     inputName: "Thời gian đào tạo tối đa",
//     selectName: "",
//     selectValue: [],
//   },
//   {
//     type: "select",
//     isDisabled: false,
//     inputName: "Test",
//     selectName: "test",
//     selectValue: [1, 2, 3],
//   },
// ];
