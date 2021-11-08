import React from "react";
import "./ModalAddCourse.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  doAddCourse,
  doFakeAddCourse,
} from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const ModalAddCourse: React.FC<IModalAddCourse> = ({
  show,
  setShow,
}) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.courseSlice);
  const { dataUser } = useAppSelector((state) => state.userSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    dispatch(
      doAddCourse({
        hostclass: dataUser.user_displayname,
        nameclass: data.nameclass,
      })
    )
      .then(unwrapResult)
      .then((res: any) => {
        if (res.content) dispatch(doFakeAddCourse(res.content.course));
        setShow(false);
      });
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
      <p className="modal-add-course__title">Tạo lớp học</p>
      <div className="modal-add-course__form">
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Tên lớp học (bắt buộc)"
            {...register("nameclass", { required: true, maxLength: 45 })}
          />
          <label htmlFor="floatingInputCustom">Tên lớp học (bắt buộc)</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="text"
            placeholder="Chủ đề"
            {...register("dat")}
          />
          <label htmlFor="floatingPasswordCustom">Chủ đề</label>
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
          onClick={!isLoading ? () => onSubmit() : () => {}}
        >
          {isLoading ? "Đang thêm..." : "Tạo mới"}
        </Button>
      </div>
    </Modal>
  );
};
