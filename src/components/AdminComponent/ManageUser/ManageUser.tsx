import React, { useState } from "react";
import { TableAdmin } from "../..";

const makeData = (data: any) => {};

export const ManageUser = () => {
  const columns = [
    {
      Header: "Họ và tên",
      accessor: "fullname",
      collapse: false,
    },
    {
      Header: "Mã số sinh viên",
      accessor: "studentid",
      collapse: false,
    },
  ];

  const [data, setData] = useState([
    { studentid: "1", fullname: "Nguyen Tan Dat" },
  ]);

  return (
    <div>
      <TableAdmin
        columns={columns}
        data={data}
        // skipPageReset={skipPageReset}
        // updateStatusStudent={updateStatusStudent}
        // handleImportColumn={handleScoreListImportClicked}
        // handleFinalizeColumn={handleFinalizeColumn}
        // handleSaveData={handleSaveData}
      />
    </div>
  );
};
