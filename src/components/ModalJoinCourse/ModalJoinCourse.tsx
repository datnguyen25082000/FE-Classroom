import React from "react";
import "./ModalJoinCourse.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  doAddCourse,
  doFakeAddCourse,
} from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const ModalJoinCourse: React.FC<IModalAddCourse> = ({
  show,
  setShow,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.courseSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    // dispatch(doAddCourse({ hostclass: 'Nguyễn Tấn Đạt', nameclass: data.nameclass }))
    //   .then(unwrapResult)
    //   .then((res: any) => {
    //     dispatch(doFakeAddCourse(res.result));
    //     setShow(false);
    //   });
  });

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      contentClassName="modal-add-course"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <p className="modal-add-course__title">Tham gia lớp học</p>
      <div className="modal-add-course__form">
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Mã lớp học (bắt buộc)"
            {...register("idclass", { required: true, maxLength: 45 })}
          />
          <label htmlFor="floatingInputCustom">Mã lớp học (bắt buộc)</label>
        </Form.Floating>
      </div>

      <div className="modal-add-course__group-btn">
        <Button
          variant="outline-secondary"
          className="modal-add-course__btn"
          onClick={handleCloseModal}
        >
          Hủy
        </Button>
        <Button
          variant="outline-primary"
          className="modal-add-course__btn"
          disabled={isLoading}
          onClick={() => {}}
        >
          {isLoading ? "Đang thêm..." : "Tham gia"}
        </Button>
      </div>
    </Modal>
  );
};
