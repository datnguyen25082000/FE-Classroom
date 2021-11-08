import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const ModalCenter: React.FC<IModalCenter> = ({ show, onHide, message, handleClose }) => {
  return (
    <div className="modal-center">
      <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Thông báo từ My Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Thông báo</h4> */}
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Tắt</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
