import React, { useEffect, useState } from "react";
import "./update-page.css";
import MainLayout from "../../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { sendEmailtoStaffs } from "../../services/Mails/Mail";
import Notification from "../../components/Snackbar/snackbar";
export default function UpdatePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [unChanged, setUnChanged] = useState(false);
  const [sendmailSuccess, setSendmailSuccess] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [ticketID, setTicketID] = useState(params.id);
  const [inputs, setInputs] = useState();
  const [formData, setFormData] = useState();
  const [formName, setFormName] = useState();
  const [activeStep, setActiveStep] = useState(-1);
  const currentDate = dayjs().format("DD/MM/YYYY");
  useEffect(() => {
    async function fetchFormLayout() {
      const rs = await axios.get(
        `http://localhost:8080/getDynamicFormInputsByID/${ticketID}`
      );
      setInputs(JSON.parse(rs.data[0].form_data));
      setFormName(rs.data[0].form_name);
      setFormData(JSON.parse(rs.data[0].ticket_data));
      setActiveStep(rs.data[0].active_step);
    }
    fetchFormLayout();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function getStaffEmailList() {
    let staffRole = "";
    switch (activeStep) {
      case 1:
        staffRole = "verifier";
        break;
      case 2:
        staffRole = "approver";
        break;
      case 3:
        staffRole = "executor";
        break;
    }
    const res = await axios.get(`http://localhost:8080/getStaffEmailList`, {
      params: { staffRole },
    });
    return res.data;
  }
  const onSubmit = (data) => {
    data["Ngày lập yêu cầu"] = formData["Ngày lập yêu cầu"];
    console.log("DATA", data);
    console.log("FORMDATA", formData);

    const comparisonProps = Object.keys(data);
    let unChangedFlag = false;
    comparisonProps.forEach((propName) => {
      const dataValue = data[propName];
      const formDataValue = formData[propName];
      if (dataValue !== formDataValue) unChangedFlag = true;
    });
    if (unChangedFlag) {
      const ticket_data = JSON.stringify(data);
      const new_data = { ticket_data, ticketID };
      async function handleUpdateTicketData() {
        await axios
          .post(`http://localhost:8080/updateTicketData`, new_data)
          .then((res) => {
            console.log(res);
            setIsUpdated(true);
            async function HandleSuccess() {
              const StaffEmailsList = await getStaffEmailList();
              const StaffEmails = StaffEmailsList.map(
                (staffEmail) => staffEmail.email
              ).join(",");
              const emailParams = {
                to_email: StaffEmails,
                from_name: "ĐHQG",
                to_name: "NHÂN VIÊN",
                message: `CÓ ĐƠN SỐ ${ticketID} VỪA ĐƯỢC CẬP NHẬT`,
                subject: "ĐƠN CẬP NHẬT",
                reply_to: StaffEmails,
              };
              console.log(emailParams);
              async function handleSendingMail() {
                const resultSendingMail = await sendEmailtoStaffs(emailParams);
                if (resultSendingMail) setSendmailSuccess(true);
              }
              await handleSendingMail();
            }
            HandleSuccess();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      handleUpdateTicketData();
    } else {
      setUnChanged(true);
      setTimeout(() => {
        setUnChanged(false);
      }, 2000);
    }
  };
  return (
    <MainLayout>
      <div className="requestPage-container">
        {formName && <h1 style={{ paddingLeft: "30px" }}>Form: {formName}</h1>}
        {isUpdated && <Notification message="Updated successfully" />}
        {unChanged && <Notification message="You did not change any input" />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            padding="20px"
            width={"80%"}
            display="flex"
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            {inputs &&
              inputs.map((item, index) => {
                return (
                  <Box
                    key={item.id}
                    width={"45%"}
                    display={"flex"}
                    paddingY={"10px"}
                  >
                    <Box width={"30%"}>
                      <label htmlFor={`items[${index}].name`}>
                        {item.label}
                      </label>
                    </Box>
                    <Box>
                      {item.type === "textarea" ? (
                        <>
                          {" "}
                          <textarea
                            rows="5"
                            cols="40"
                            defaultValue={formData[item.label]}
                            name={`items[${index}].name`}
                            {...register(`${item.label}`, { required: true })}
                          ></textarea>
                          {errors[`${item.label}`] && (
                            <span>This field is required</span>
                          )}
                        </>
                      ) : (
                        <>
                          {" "}
                          <input
                            style={{ marginLeft: "10px" }}
                            type={
                              item.type === "text"
                                ? "text"
                                : item.type === "date"
                                ? "date"
                                : "text"
                            }
                            disabled={item.hasOwnProperty("date")}
                            name={`items[${index}].name`}
                            defaultValue={
                              item.id === "date"
                                ? currentDate
                                : formData[item.label]
                            }
                            {...register(`${item.label}`, {
                              required: item.label !== "Ngày lập yêu cầu",
                            })}
                          />
                          {item.label !== "Ngày lập yêu cầu" &&
                            errors[`${item.label}`] && (
                              <span
                                style={{ marginLeft: "10px", color: "tomato" }}
                              >
                                This field is required
                              </span>
                            )}
                        </>
                      )}
                    </Box>
                  </Box>
                );
              })}
          </Box>
          <Box padding="20px">
            {inputs && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/home-page")}
                >
                  Cancel{" "}
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        </form>
      </div>
    </MainLayout>
  );
}