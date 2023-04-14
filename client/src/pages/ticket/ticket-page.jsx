import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MainLayout from '../../components/layout';
import "./ticket-page.css";
import PDFFile from '../../components/PDF/PDFFile';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const steps = [
  {
    label: 'Student submit form'
  },
  {
    label: 'Verify information',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Approve the form',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Download and sign',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  }
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {

  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#FFD700',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7CFC00',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    borderWidth: 5,
    marginLeft: -3,
  },
}));


export default function TicketPage() {
  const navigate = useNavigate();
  const params = useParams();
  const ticketID = params.id

  const [activeStep, setActiveStep] = React.useState(1);
  const [buttonType, setButtonType] = React.useState();
  const [ticketData, setTicketData] = React.useState();

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    e.preventDefault();
  };

  const handleBack = () => {

  };

  console.log(ticketID)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getDataByTicketID/${ticketID}`)
      .then((res) => {
        setTicketData(JSON.parse(res.data[0].ticket_data));
        console.log("Result:", JSON.parse(res.data[0].ticket_data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainLayout>
      <div className="ticket-container">
        <div className="ticket-process">
          Ticket Id: {ticketID}
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} connector={<QontoConnector />} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
              </Paper>
            )}
          </Box>
        </div>
        <div className="ticket-right-container">
          <div className="ticket-form-box">
            Form Information:
            {/* {ticketData && <PDFViewer>
              <PDFFile dataReplaced={ticketData} />
            </PDFViewer>} */}
          </div>
          <div className="ticket-input-box">
            Input from previous step:
          </div>
          <div className="ticket-output-box">
            Output:
            <form onSubmit={handleNext}>
              Note*
              <textarea required></textarea>
              {activeStep === 3 ? <p><PDFDownloadLink
                document={<PDFFile />}
                fileName={"XacNhanSinhVien.pdf"}
              >
                {({ blob, loading, url }) => {
                  return loading
                    ? <Button variant='contained'>Loading...</Button>
                    : <Button variant='contained'>Download File</Button>
                }}
              </PDFDownloadLink></p> : ''}
              {activeStep === steps.length ? null :
                <div>
                  <Button
                    type='submit'
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    // type='submit'
                    sx={{ mt: 1, mr: 1 }}
                  >
                    DisApprove
                  </Button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}