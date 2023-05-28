import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";
import { columnsApprovalList } from "../../constants/data-test";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TicketContext from "../../context/TicketContext";
import UserContext from "../../context/UserContext";

function ApprovalList() {
  const [ticketInfo, setTicketInfo] = useState([]);
  let rowsApprovalList = [];

  useEffect(() => {
    axios
      .get("http://localhost:8080/getTicketInfo")
      .then((res) => {
        setTicketInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ticketInfo.map((item, index) => {
    rowsApprovalList[index] = item;
  });
  return (
    <div>
      <MainLayout>
        <TableList
          rows={rowsApprovalList}
          columns={columnsApprovalList}
          name="Approval List"
        />
      </MainLayout>
    </div>
  );
}

export default ApprovalList;
