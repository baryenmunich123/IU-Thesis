import React, { useState, useEffect } from "react";
import axios from "axios";
import { columnsRequestList } from "../../constants/data-test";
import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";

function RequestList() {
  const [ticketInfo, setTicketInfo] = useState([]);
  let rowsRequestList = []

  useEffect(() => {
    axios
      .get("http://localhost:8080/getTicketInfo")
      .then((res) => {
        setTicketInfo(res.data);
        console.log("Ticket Info:", res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ticketInfo.map((item, index) => {
    rowsRequestList[index] = item
  })

  return (
    <MainLayout>
      <TableList
        rows={rowsRequestList}
        columns={columnsRequestList}
        name="Request List"
      />
    </MainLayout>
  );
}
export default RequestList;
