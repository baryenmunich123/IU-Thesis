import React, { useEffect, useState } from "react";
import "./request-page.css";
import MainLayout from "../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import axios from "axios";
import {
  sendEmailtoStaffs,
  sendEmailtoStudents,
} from "../../services/Mails/Mail";
import Notification from "../../components/Snackbar/snackbar";
export default function RequestDynamicForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sendmailSuccess, setSendmailSuccess] = useState(false);
  const [inputs, setInputs] = useState();
  const [form_no, setForm_no] = useState(location.state.form_no);
  const currentDate = dayjs().format("DD/MM/YYYY");
  const [isPostedSuccessfully, setIsPostedSuccessfully] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [userID, setUserID] = useState();
  useEffect(() => {
    setUserID(localStorage.getItem("Name"));
    setInputs(JSON.parse(location.state.data));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function getStaffEmailList() {
    const staffRole = "verifier";
    const res = await axios.get(`http://localhost:8080/getStaffEmailList`, {
      params: { staffRole },
    });
    return res.data;
  }
  const onSubmit = (data) => {
    data["Ngày lập yêu cầu"] = currentDate;
    const stringifyData = JSON.stringify(data);

    const formData = { currentDate, form_no, userID, stringifyData };
    async function handlePostDynamicFormData() {
      await axios
        .post(`http://localhost:8080/postDynamicFormData`, formData)
        .then((res) => {
          async function HandleSuccess() {
            setSuccessText(res.data.message);
            setIsPostedSuccessfully(true);
            const StaffEmailsList = await getStaffEmailList();
            const StaffEmails = StaffEmailsList.map(
              (staffEmail) => staffEmail.email
            ).join(",");

            const emailParams = {
              to_email: StaffEmails,
              from_name: "ĐHQG",
              to_name: "NHÂN VIÊN",
              message: "CÓ ĐƠN MỚI CẦN XÉT DUYỆT",
              subject: "CÓ ĐƠN MỚI",
              reply_to: StaffEmails,
            };
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
    handlePostDynamicFormData();
  };
  return (
    <MainLayout>
      <div className="requestPage-container" key={form_no}>
        {sendmailSuccess && <Notification message="Sent mail successfully" />}
        <h1 style={{ paddingLeft: "30px" }}>Form: {location.state.name}</h1>
        {isPostedSuccessfully && <Notification message={successText} />}
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
                              item.id === "date" ? currentDate : null
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
