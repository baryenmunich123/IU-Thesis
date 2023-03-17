import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { columnsRequestList } from "../../constants/data-test";
import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";
import TicketContext from "../../context/TicketContext";

function RequestList() {
  const [ticketInfo, setTicketInfo] = useState([]);
  const { getTicketInfo } = useContext(TicketContext);
  let rowsRequestList = []

  useEffect(() => {
    axios
      .get("http://localhost:8080/getTicketInfo")
      .then((res) => {
        setTicketInfo(res.data);
        getTicketInfo(res.data) // Pass info to context
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
