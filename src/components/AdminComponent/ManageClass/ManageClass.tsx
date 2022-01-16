import React, { useState, useEffect } from "react";
import { TableAdmin, ModalConfirm } from "../..";
import "./ManageClass.scss";
import { useHistory } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearchengin } from "react-icons/fa";
import {
  useAppSelector,
  useAppDispatch,
  doGetAllCourseSystem,
} from "../../../redux";
import { transformDateFormat } from "../../../helpers/time";

const columns = [
  {
    Header: "Tên lớp học",
    accessor: "classname",
    collapse: false,
  },
  {
    Header: "HostId",
    accessor: "host",
    collapse: false,
  },
  {
    Header: "Mã vào lớp",
    accessor: "codejoin",
    collapse: false,
  },
  {
    Header: "Mã học phần",
    accessor: "code",
    collapse: false,
  },
  {
    Header: "Ngày tạo",
    accessor: "createdate",
    collapse: false,
  },
];

const makeData = (data: Array<IAdminCourse>) => {
  if (data) {
    return data.map((item) => {
      return {
        classname: item.course_name,
        host: item.course_hostid,
        codejoin: item.course_id,
        code: item.course_code,
        createdate: transformDateFormat(item.course_createdate),
      };
    });
  } else return [];
};

export const ManageClass = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const { listCourse } = useAppSelector((state) => state.adminSlice);

  const [data, setData] = useState(makeData(listCourse));

  const handleDetail = (id: any) => {
    setShowConfirm(true);
  };

  useEffect(() => {
    dispatch(doGetAllCourseSystem());
  }, []);

  useEffect(() => {
    setData(makeData(listCourse));
  }, [listCourse]);

  return (
    <div className="manage-class">
      {" "}
      <div className="manage-class__header">
        <h3 style={{ fontSize: "30px", fontWeight: "500" }}>
          Quản lý danh sách lớp học
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
