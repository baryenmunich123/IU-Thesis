import React from "react";
import { Routes, Route } from "react-router-dom";
import RequestPage from "../pages/request-page/request-page";
import ApprovalList from "../pages/approval-list/approval-list";
import HomePage from "../pages/home-page/home-page";
import RequestList from "../pages/request-list/request-list";
import NotFound from "../pages/not-found/not-found";

function MainRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/request-page" element={<RequestPage />} />
        <Route path="/request-list" element={<RequestList />} />
        <Route path="/approval-list" element={<ApprovalList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
