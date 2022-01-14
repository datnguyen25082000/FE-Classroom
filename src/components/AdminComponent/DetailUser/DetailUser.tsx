import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import "./DetailUser.scss";

export const DetailUser = () => {
  const history = useHistory();

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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Mã số sinh viên</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Trạng thái người dùng</Form.Label>
            <Form.Select defaultValue="Đang hoạt động">
              <option>Đang hoạt động</option>
              <option>Đang bị khóa</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <div style={{ marginTop: 30 }}>
          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>

          <Button variant="danger" style={{ marginLeft: "15px" }}>
            Khóa tài khoản
          </Button>
        </div>
      </Form>
    </div>
  );
};
