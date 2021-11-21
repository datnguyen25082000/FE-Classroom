import React from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";

export const ModalAddStudent: React.FC<IModalAddStudent> = ({
  show,
  setShow,
  handleClose,
  handleAction,
  isTeacherModal = false,
}) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (handleAction && e.target.email.value) handleAction(e.target.email.value);
  };

  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>
            {isTeacherModal ? "Mời giáo viên" : "Mời học viên"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Nhập địa chỉ email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Mời
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
