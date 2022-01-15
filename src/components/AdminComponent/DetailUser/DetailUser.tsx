import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "./DetailUser.scss";
import { ModalConfirm } from "../../";

export const DetailUser = () => {
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReturn = () => {
    history.goBack();
  };

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
            <Form.Control disabled type="text" placeholder="" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Mã số sinh viên</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control disabled placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control disabled placeholder="" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control disabled />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Trạng thái người dùng</Form.Label>
            <Form.Select disabled defaultValue="Đang hoạt động">
              <option>Đang hoạt động</option>
              <option>Đang bị khóa</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>

          <Button
            variant="danger"
            onClick={() => setShowConfirm(true)}
            style={{ marginLeft: "15px" }}
          >
            Khóa tài khoản
          </Button>
        </div>
      </Form>

      <ModalConfirm
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        title="Khóa người dùng"
        buttonAction='Khóa người dùng'
      >
        <p>
          Khóa người dùng
          <span style={{ fontWeight: 500 }}> {"ABC"}</span> ?
        </p>
        <p>
          Người dùng này sẽ tạm thời không thể sử dụng tài khoản để truy cập vào
          hệ thống My Classroom
        </p>
      </ModalConfirm>
    </div>
  );
};
