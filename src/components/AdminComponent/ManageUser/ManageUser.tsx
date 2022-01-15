import React, { useState } from "react";
import { TableAdmin } from "../..";
import "./ManageUser.scss";
import { useHistory } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearchengin } from "react-icons/fa";

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
      <div className="manage-class__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý danh sách người dùng
        </h3>
        <InputGroup className="manage-class__input">
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder="Nhập từ khóa tìm kiếm"
          />

          <FaSearchengin size={30} className="manage-class__search" />
        </InputGroup>
      </div>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
    </div>
  );
};
