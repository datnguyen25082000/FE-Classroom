import React, { useState, useEffect } from "react";
import { TableAdmin } from "../..";
import "./ManageAdmin.scss";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ModalAddUser } from "../../";
import { useAppSelector, useAppDispatch, doGetAllAdmin } from "../../../redux";

const columns = [
  {
    Header: "Tên hiển thị",
    accessor: "fullname",
    collapse: false,
  },
  {
    Header: "Username",
    accessor: "username",
    collapse: false,
  },

  // {
  //   Header: "Email",
  //   accessor: "email",
  //   collapse: false,
  // },
  {
    Header: "Loại admin",
    accessor: "super_admin",
    collapse: false,
  },
  {
    Header: "Chi tiết",
    accessor: "detail",
    collapse: false,
  },
];

const makeData = (data: Array<IAdminAdmin>) => {
  if (data) {
    return data.map((item) => {
      return {
        fullname: item.display_name,
        email: item.email,
        username: item.username,
        super_admin: item.super_admin ? "Super admin" : "Admin",
        detail: item.username,
      };
    });
  } else return [];
};

export const ManageAdmin = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const { listAdmin } = useAppSelector((state) => state.adminSlice);

  const [data, setData] = useState(makeData(listAdmin));

  const handleDetail = (id: any) => {
    if (id) {
      history.push(`/admin/detail-admin/${id}`);
    }
  };

  useEffect(() => {
    dispatch(doGetAllAdmin());
  }, []);

  useEffect(() => {
    setData(makeData(listAdmin));
  }, [listAdmin]);

  return (
    <div className="manage-admin">
      <div className="manage-admin__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý quản trị viên
        </h3>

        {listAdmin && listAdmin.length ? (
          <Button variant="outline-primary" onClick={() => setShow(true)}>
            Thêm mới
          </Button>
        ) : (
          <></>
        )}
      </div>
      <TableAdmin columns={columns} data={data} handleDetail={handleDetail} />
      <ModalAddUser show={show} setShow={setShow} />
    </div>
  );
};
