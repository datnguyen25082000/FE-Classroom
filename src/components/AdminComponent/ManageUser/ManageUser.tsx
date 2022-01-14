import React, { useState } from "react";
import { TableAdmin } from "../..";
import "./ManageUser.scss";
import { useHistory } from "react-router-dom";
export const ManageUser = () => {
  const history = useHistory();
  const columns = [
    {
      Header: "Họ và tên",
      accessor: "fullname",
      collapse: false,
    },
    {
      Header: "Email",
      accessor: "email",
      collapse: false,
    },
    {
      Header: "Mã số sinh viên",
      accessor: "studentid",
      collapse: false,
    },
    {
      Header: "Trạng thái",
      accessor: "status",
      collapse: false,
    },
    {
      Header: "Chi tiết",
      accessor: "detail",
      collapse: false,
    },
  ];

  const [data, setData] = useState([
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "1",
    },
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "1",
    },
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "1",
    },
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "1",
    },
  ]);

  const handleDetail = (id: any) => {
    if (id) {
      history.push(`/admin/detail-user/${id}`);
    }
  };

  return (
    <div className="manage-user">
      {" "}
      <h3 style={{ fontSize: "30px", fontWeight: "500", marginBottom: "30px" }}>
        Quản lý danh sách người dùng
      </h3>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
    </div>
  );
};
