import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { columnsRequestList } from "../../constants/data-test";
import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";
import TicketContext from "../../context/TicketContext";
import UserContext from "../../context/UserContext";

function RequestList() {
  const [ticketInfo, setTicketInfo] = useState([]);
  const { user } = useContext(UserContext);
  const { getTicketInfo } = useContext(TicketContext);
  let rowsRequestList = [];

  useEffect(() => {
    axios
      .get("http://localhost:8080/getTicketInfo")
      .then((res) => {
        setTicketInfo(res.data);
        getTicketInfo(res.data); // Pass info to context
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  ticketInfo.map((item, index) => {
    if (user.role === "student") {
      if (item.account_id === user.accountId) rowsRequestList[index] = item;
    } else {
      rowsRequestList[index] = item;
    }
  });

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
