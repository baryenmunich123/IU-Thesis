import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MainLayout from "../../components/layout";
import "./ticket-page.css";
import UserContext from "../../context/UserContext";
import GenDocx from "../../components/PDF/GenerateDocx";
import dayjs from "dayjs";
import {
  sendEmailtoStaffs,
  sendEmailtoStudents,
} from "../../services/Mails/Mail";
import Notification from "../../components/Snackbar/snackbar";

const steps = [
  {
    label: "Student submit form",
  },
  {
    label: "Verify information",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Approve the form",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Download and sign",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {},
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#FFD700",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#7CFC00",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    borderWidth: 5,
    marginLeft: -3,
  },
}));
const user_permission = {
  1: "verifier",
  2: "approver",
  3: "executor",
  4: "admin",
};
export default function TicketPage() {
  const { user } = useContext(UserContext);
  const params = useParams();
  const [sendmailSuccess, setSendmailSuccess] = useState(false);
  const [requestor, setRequestor] = useState("");
  const [ticketID, setTicketID] = useState(params.id);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isNext, setIsNext] = React.useState(false);
  const [isDisapproved, setIsDisapproved] = React.useState(false);
  const [userDenied, setUserDenied] = React.useState(true);
  const [ticketData, setTicketData] = React.useState();
  const [previousNote, setPreviousNote] = React.useState(null);
  const [note, setNote] = React.useState("");
  const [noteRequired, setNoteRequired] = useState(false);
  const [formData, setFormData] = useState(null);
  const [dynamicFormData, setDynamicFormData] = useState(null);
  const [isCommitted, setIsCommitted] = useState(false);
  useEffect(() => {
    if (!isNext) {
      return;
    }
    handleUpdateStep();
    return () => {};
  }, [isNext]);
  useEffect(() => {
    {
      if (user.role == "executor" && activeStep == 4) {
        const resp = handleUpdateStatus();
        return;
      }
      if (user.role !== "admin" && user.role === user_permission[activeStep]) {
        setUserDenied(false);
        return;
      }
    }
  }, [activeStep]);
  const fechDynamicFormById = useCallback(async () => {
    const rs = await axios.get(
      `http://localhost:8080/getDynamicFormByID/${ticketID}`
    );

    return rs;
  }, [ticketID]);
  const fetchDataByTicketId = useCallback(async () => {
    const rs = await axios.get(
      `http://localhost:8080/getDataByTicketID/${ticketID}`
    );
    setTicketData(JSON.parse(rs.data[0].ticket_data));
    setRequestor(rs.data[0].account_id);
    setPreviousNote(rs.data[0].previous_note);
    setActiveStep(rs.data[0].active_step);
    if (rs.data[0].status == "Update") {
      setIsDisapproved(true);
    }
    return rs;
  }, [ticketID]);
  useEffect(() => {
    Promise.allSettled([fetchDataByTicketId(), fechDynamicFormById()]).then(
      (res) => {
        const formData = JSON.parse(res[0]?.value?.data[0].ticket_data);
        const Data = {
          approved_date: dayjs().date(),
          approved_month: dayjs().month() + 1,
          approved_year: dayjs().year(),
        };
        const merged = { ...formData, ...Data };
        setFormData(merged);
        setDynamicFormData(res[1]?.value?.data[0]);
      }
    );
  }, [ticketID]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleNext = (e) => {
    e.preventDefault();
    if (note !== "") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsNext(user.role !== "admin");
      handleUpdateNote();
    }
  };

  async function handleUpdateStatus() {
    const currentDate = dayjs().format("DD/MM/YYYY");
    await axios
      .post(`http://localhost:8080/updateStatus`, { ticketID, currentDate })
      .then((res) => {});
  }
  async function HandlegetStudentEmail() {
    const res = await axios.get(`http://localhost:8080/getStudentEmail`, {
      params: { requestor },
    });
    return res.data[0].email;
  }
  async function HandleGetNextStaffEmailList() {
    let staffRole = "";
    switch (activeStep) {
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
    console.log(res.data);
    return res.data;
  }
  async function handleUpdateStep() {
    await axios
      .post(`http://localhost:8080/updateStepTicket`, { ticketID })
      .then((res) => {
        async function handleSuccess() {
          const studentEmail = await HandlegetStudentEmail();
          const nextStaffEmailList = await HandleGetNextStaffEmailList();
          const StaffEmails = nextStaffEmailList
            .map((staffEmail) => staffEmail.email)
            .join(",");

          const studentMessage =
            activeStep === 4
              ? `ĐƠN CỦA BẠN ĐÃ XÉT DUYỆT XONG`
              : `ĐƠN CỦA BẠN ĐÃ XÉT DUYỆT ĐẾN BƯỚC ${activeStep}/4`;
          const staffMessage = `ĐƠN SỐ ${ticketID} ĐÃ XÉT DUYỆT ĐẾN BƯỚC ${activeStep}/4`;
          const studentEmailParams = {
            to_name: user.accountId,
            from_name: "ĐHQG",
            message: studentMessage,
            reply_to: studentEmail,
            subject: "Xét duyệt đơn",
            to_email: studentEmail,
          };
          const nextStaffEmailParams = {
            to_name: "NHÂN VIÊN",
            from_name: "ĐHQG",
            message: staffMessage,
            reply_to: StaffEmails,
            subject: "Có đơn cần duyệt mới",
            to_email: StaffEmails,
          };
          async function handleSendingMail() {
            const resultSendingMailToStudent = await sendEmailtoStudents(
              studentEmailParams
            );
            const resultSendingMailToStaff = await sendEmailtoStaffs(
              nextStaffEmailParams
            );
            if (resultSendingMailToStudent && resultSendingMailToStaff) {
              console.log("SUCCESS");
              setSendmailSuccess(true);
            }
          }
          handleSendingMail();
        }
        handleSuccess();
      })
      .catch((error) => console.log(error));
  }
  async function handleUpdateNote() {
    if (note !== "") {
      await axios
        .post(`http://localhost:8080/updatePreviousNote`, { note, ticketID })
        .then((res) => {});
    }
  }
  function handleNoteChange(event) {
    setNote(event.target.value);
  }
  async function handleDisapprove() {
    if (note !== "") {
      await axios
        .post(`http://localhost:8080/disapproveTicket`, { ticketID })
        .then(() => {
          if (note !== "") {
            axios.post(`http://localhost:8080/updatePreviousNote`, {
              note,
              ticketID,
            });
          }
        })
        .then((res) => {
          setIsDisapproved(true);
          setIsCommitted(true);
        })
        .then(() => {
          async function handleSendDisapprove() {
            const studentEmail = await HandlegetStudentEmail();
            const studentMessage =
              "ĐƠN CỦA BẠN ĐÃ BỊ TỪ CHỐI, XIN HÃY ĐỌC NOTE TẠI TRANG WEB";
            const studentEmailParams = {
              to_name: user.accountId,
              from_name: "ĐHQG",
              message: studentMessage,
              reply_to: studentEmail,
              subject: "Xét duyệt đơn",
              to_email: studentEmail,
            };
            async function handleSendingMail() {
              const resultSendingMailToStudent = await sendEmailtoStudents(
                studentEmailParams
              );
              if (resultSendingMailToStudent) {
                console.log("SUCCESS");
                setSendmailSuccess(true);
              }
            }
            handleSendingMail();
          }
          handleSendDisapprove();
        });
    } else {
      setNoteRequired(true);
      setTimeout(() => {
        setNoteRequired(false);
      }, 2000);
    }
  }
  return (
    <MainLayout>
      <div className="ticket-container">
        <div className="ticket-process">
          {sendmailSuccess && <Notification message="Sent mail successfully" />}
          {noteRequired && <Notification message="Please fill out Note" />}
          {isCommitted && isDisapproved && (
            <Notification message="Disapproved Successfully" />
          )}
          Ticket Id: {ticketID}
          <Box sx={{ maxWidth: 400 }}>
            <Stepper
              activeStep={activeStep}
              connector={<QontoConnector />}
              orientation="vertical"
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
              </Paper>
            )}
          </Box>
        </div>
        <div className="ticket-right-container">
          <div className="ticket-form-box">
            <h3> Form Information:</h3>
            {ticketData &&
              Object.entries(ticketData).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
          </div>
          <div className="ticket-input-box">
            {isDisapproved && (
              <>
                <h3>Disapproved Reason:</h3>
                <p>{previousNote}</p>
              </>
            )}
            {!isDisapproved && (
              <>
                <h3>Input from previous step:</h3>
                {previousNote && user.role === user_permission[activeStep] && (
                  <p>{previousNote}</p>
                )}
              </>
            )}
          </div>
          <div className="ticket-output-box">
            Output:
            <form onSubmit={handleNext}>
              Note*
              <textarea
                disabled={userDenied || isNext || isDisapproved}
                required
                onChange={handleNoteChange}
              ></textarea>
              {formData &&
                dynamicFormData &&
                activeStep === 3 &&
                !userDenied &&
                !isNext &&
                !isDisapproved && (
                  <GenDocx
                    formData={{ ...formData }}
                    dynamicFormData={{ ...dynamicFormData }}
                  />
                )}
              {activeStep === steps.length ? null : (
                <div>
                  <Button
                    disabled={userDenied || isNext || isDisapproved}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    // type='submit'
                    disabled={userDenied || isNext || isDisapproved}
                    sx={{ mt: 1, mr: 1 }}
                    onClick={handleDisapprove}
                  >
                    DisApprove
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
