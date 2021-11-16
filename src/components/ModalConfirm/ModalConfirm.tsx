import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalConfirm: React.FC<IModalAddStudent> = ({
  show,
  handleAction,
  handleClose,
  children,
  title,
  buttonAction,
}) => {
  return (
    <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="danger" onClick={handleClose}>
          {buttonAction ? buttonAction : "Xóa"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
