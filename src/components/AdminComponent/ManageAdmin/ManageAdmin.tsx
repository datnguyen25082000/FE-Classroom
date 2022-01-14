import React, { useState } from "react";
import { TableAdmin } from "../..";
import "./ManageAdmin.scss";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalAddUser } from "../../";

const columns = [
  {
    Header: "Tên hiển thị",
    accessor: "fullname",
    collapse: false,
  },
  {
    Header: "Username",
    accessor: "email",
    collapse: false,
  },
  {
    Header: "Chi tiết",
    accessor: "detail",
    collapse: false,
  },
];

export const ManageAdmin = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);

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
      detail: "2",
    },
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "3",
    },
    {
      studentid: "18120308",
      fullname: "Nguyen Tan Dat",
      email: "datnguyen25082000@gmail.com",
      status: "Active",
      detail: "4",
    },
  ]);

  const handleDetail = (id: any) => {
    if (id) {
      history.push(`/admin/detail-user/${id}`);
    }
  };

  return (
    <div className="manage-admin">
      <div className="manage-admin__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý quản trị viên
        </h3>

        <Button variant="outline-primary" onClick={() => setShow(true)}>
          Thêm mới
        </Button>
      </div>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
      <ModalAddUser show={show} setShow={setShow} />
    </div>
  );
};
