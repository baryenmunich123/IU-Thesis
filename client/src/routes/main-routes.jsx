import React from "react";
import { Routes, Route } from "react-router-dom";
import ApprovalList from "../pages/approval-list/approval-list";
import HomePage from "../pages/home-page/home-page";
import RequestList from "../pages/request-list/request-list";
import NotFound from "../pages/not-found/not-found";
import TicketPage from "../pages/ticket/ticket-page";
import LandingPage from "../pages/login-page/LoginPage";
import StaffRoute from "./staff-routes";
import AdminRoute from "./admin-routes";
import FormCreation from "../pages/form-creation/form-creation";
import RequestDynamicForm from "../pages/request-page/request-dynamic-page";
import UpdatePage from "../pages/update-ticket/UpdatePage";
function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/request-dynamic" element={<RequestDynamicForm />} />
        <Route path="/request-list" element={<RequestList />} />
        <Route
          path="/approval-list"
          element={
            <StaffRoute>
              <ApprovalList />
            </StaffRoute>
          }
        />
        <Route
          path="/form-creation"
          element={
            <AdminRoute>
              <FormCreation />
            </AdminRoute>
          }
        />
        <Route path="/ticket-page/:id" element={<TicketPage />} />
        <Route path="/update-ticket/:id" element={<UpdatePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
