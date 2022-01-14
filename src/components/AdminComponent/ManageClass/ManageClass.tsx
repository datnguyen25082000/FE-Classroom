import React, { useState } from "react";
import { TableAdmin } from "../..";
import "./ManageClass.scss";
import { useHistory } from "react-router-dom";

const columns = [
  {
    Header: "Tên lớp học",
    accessor: "fullname",
    collapse: false,
  },
  {
    Header: "Host",
    accessor: "email",
    collapse: false,
  },
  {
    Header: "Số lượng học viên",
    accessor: "studentid",
    collapse: false,
  },
  {
    Header: "Ngày tạo",
    accessor: "status",
    collapse: false,
  },
  {
    Header: "Khóa lớp học",
    accessor: "block",
    collapse: false,
  },
];

export const ManageClass = () => {
  const history = useHistory();

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

  const handleDetail = (id: any) => {};

  return (
    <div className="manage-class">
      {" "}
      <h3 style={{ fontSize: "30px", fontWeight: "500", marginBottom: "30px" }}>
        Quản lý danh sách lớp học
      </h3>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
    </div>
  );
};
