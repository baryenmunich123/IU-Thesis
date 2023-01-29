import * as React from "react";
import { columnsRequestList, rowsRequestList } from "../../constants/data-test";
import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";

function RequestList() {
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
