import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "./DetailUser.scss";
import { ModalConfirm } from "../../";
import {
  useAppDispatch,
  useAppSelector,
  doGetAllUser,
  doLockUser,
  doUpdateStudentId,
} from "../../../redux";
import { useParams } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";

export const DetailUser = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { listUser } = useAppSelector((state) => state.adminSlice);
  const [data, setData] = useState<any>({});
  const [studentId, setStudentId] = useState<any>("");
  const handleReturn = () => {
    history.goBack();
  };

  const handleLockUser = () => {
    dispatch(doLockUser({ user_id: data.user_id }))
      .then(unwrapResult)
      .then((res: any) => {
        if (res.content) {
          setData(res.content);
        }
      });
  };

  const handleUpdateStudentId = () => {
    dispatch(
      doUpdateStudentId({ user_id: data.user_id, new_student_id: studentId })
    );
  };

  useEffect(() => {
    dispatch(doGetAllUser());
  }, [id]);

  useEffect(() => {
    if (listUser && listUser.length) {
      const index = listUser.findIndex((item) => item.user_username === id);

      if (index >= 0) {
        setData(listUser[index]);
      }
    }
  }, [listUser]);

  useEffect(() => {
    if (data) {
      setStudentId(data.user_studentid);
    }
  }, [data]);

  return (
    <div className="detail-user">
      <div className="detail-user__header">
        <IoArrowBackCircleOutline
          size={35}
          onClick={() => handleReturn()}
          className="detail-user__back"
        />
        <h3>Thông tin người dùng</h3>
      </div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              disabled
              type="text"
              value={data?.user_displayname}
              placeholder=""
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Mã số sinh viên</Form.Label>
            <Form.Control
              defaultValue={data?.user_studentid}
              onChange={(e: any) => setStudentId(e.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control value={data?.user_email} disabled placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control value={data?.user_address} disabled placeholder="" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control value={data?.user_phone} disabled />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Trạng thái người dùng</Form.Label>
            <Form.Control
              value={
                data?.user_is_active === 1 ? "Đang hoạt động" : "Đang bị khóa"
              }
              disabled
            />
          </Form.Group>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Button
            variant="primary"
            type="button"
            onClick={() => handleUpdateStudentId()}
          >
            Lưu thay đổi
          </Button>

          <Button
            variant="danger"
            onClick={() => setShowConfirm(true)}
            style={{ marginLeft: "15px" }}
          >
            {data?.user_is_active === 1
              ? "Khóa tài khoản"
              : "Mở khóa tài khoản"}
          </Button>
        </div>
      </Form>

      <ModalConfirm
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title={
          data?.user_is_active === 1 ? "Khóa người dùng" : "Mở khóa người dùng"
        }
        buttonAction={
          data?.user_is_active === 1 ? "Khóa người dùng" : "Mở khóa người dùng"
        }
        handleAction={() => {
          handleLockUser();
          setShowConfirm(false);
        }}
      >
        {data?.user_is_active === 1 ? (
          <>
            <p>
              Khóa người dùng
              <span style={{ fontWeight: 500 }}>
                {" "}
                {data.user_displayname}
              </span>{" "}
              ?
            </p>
            <p>
              Người dùng này sẽ tạm thời không thể sử dụng tài khoản để truy cập
              vào hệ thống My Classroom
            </p>
          </>
        ) : (
          <>
            {" "}
            <p>
              Mở khóa người dùng
              <span style={{ fontWeight: 500 }}>
                {" "}
                {data.user_displayname}
              </span>{" "}
              ?
            </p>
          </>
        )}
      </ModalConfirm>
    </div>
  );
};
