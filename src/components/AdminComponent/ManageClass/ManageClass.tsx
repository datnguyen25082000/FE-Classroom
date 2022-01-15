import React, { useState } from "react";
import { TableAdmin, ModalConfirm } from "../..";
import "./ManageClass.scss";
import { useHistory } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearchengin } from "react-icons/fa";

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
    Header: "Mã lớp học",
    accessor: "studentid",
    collapse: false,
  },
  {
    Header: "Số lượng học viên",
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
  const [showConfirm, setShowConfirm] = useState(false);

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
    setShowConfirm(true);
  };

  return (
    <div className="manage-class">
      {" "}
      <div className="manage-class__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý danh sách lớp học
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
      <ModalConfirm
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Khóa lớp học"
        buttonAction="Khóa lớp học"
      >
        <p>
          Khóa lớp học
          <span style={{ fontWeight: 500 }}> {"ABC"}</span> ?
        </p>
        <p>
          Học viên và giảng viên của lớp học sẽ tạm thời không vào được lớp.
        </p>
      </ModalConfirm>
    </div>
  );
};
