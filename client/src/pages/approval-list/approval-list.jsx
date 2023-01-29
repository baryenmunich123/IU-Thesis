import * as React from "react";
import TableList from "../../components/table-list";
import MainLayout from "../../components/layout";
import {
  columnsApprovalList,
  rowsApprovalList,
} from "../../constants/data-test";



function ApprovalList() {
  return (
    <div>
      <MainLayout>
        <TableList rows={rowsApprovalList} columns={columnsApprovalList} name="Approval List" />
      </MainLayout>
    </div>
  );
}

export default ApprovalList;
