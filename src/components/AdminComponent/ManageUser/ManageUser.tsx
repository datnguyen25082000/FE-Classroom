import React, { useState, useEffect } from "react";
import { TableAdmin } from "../..";
import "./ManageUser.scss";
import { useHistory } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearchengin } from "react-icons/fa";
import { useAppSelector, useAppDispatch, doGetAllUser } from "../../../redux";

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

const makeData = (data: Array<IAdminUser>) => {
  if (data) {
    return data.map((item) => {
      return {
        studentid: item.user_studentid,
        fullname: item.user_displayname,
        email: item.user_email,
        status: item.user_is_active,
        detail: item.user_username,
      };
    });
  } else return [];
};

export const ManageUser = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { listUser } = useAppSelector((state) => state.adminSlice);

  const [data, setData] = useState(makeData(listUser));

  const handleDetail = (id: any) => {
    if (id) {
      history.push(`/admin/detail-user/${id}`);
    }
  };

  useEffect(() => {
    dispatch(doGetAllUser());
  }, []);

  useEffect(() => {
    setData(makeData(listUser));
  }, [listUser]);

  return (
    <div className="manage-user">
      {" "}
      <div className="manage-class__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý danh sách người dùng
        </h3>
        {/* <InputGroup className="manage-class__input">
          <FormControl
            aria-label="Text input with dropdown button"
            placeholder="Nhập từ khóa tìm kiếm"
          />

          <FaSearchengin size={30} className="manage-class__search" />
        </InputGroup> */}
      </div>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
    </div>
  );
};
