import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MainLayout from '../../components/layout';
import "./ticket-page.css";

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

export default function TicketPage() {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    e.preventDefault();
  };

  const handleBack = () => {
    navigate("/request-page");
  };

  return (
    <MainLayout>
      <div className="ticket-container">
        <div className="ticket-process">
          Ticket Id: 
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    {step.label}
                  </StepLabel>
                  <StepContent>
                  </StepContent>
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
          </div>
          <div className="ticket-input-box">
            Input from previous step:
          </div>
          <div className="ticket-output-box">
            Output:
            <form onSubmit={handleNext}>
            Note*
            <input type="text" required></input>
            <div>
              <Button
                type='submit'
                variant="contained"
                sx={{ mt: 1, mr: 1 }}
                >
                Approve
              </Button>
              <Button
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
                >
                DisApprove
              </Button>
            </div>
                </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}