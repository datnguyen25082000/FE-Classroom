import React from "react";
import "./ModalAddUser.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  doAddCourse,
  doFakeAddCourse,
} from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const ModalAddUser: React.FC<IModalAddCourse> = ({ show, setShow }) => {
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
        codeclass: data?.codeclass,
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
      <p className="modal-add-course__title">Thêm quản trị viên</p>
      <div className="modal-add-course__form">
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Tên đăng nhập"
            {...register("nameclass", { required: true, maxLength: 45 })}
          />
          <label htmlFor="floatingInputCustom">Tên đăng nhập</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingPasswordCustom"
            type="text"
            placeholder="Mật khẩu"
            {...register("codeclass")}
          />
          <label htmlFor="floatingPasswordCustom">Mật khẩu</label>
        </Form.Floating>

        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="text"
            placeholder="Tên hiển thị"
            {...register("codeclass")}
          />
          <label htmlFor="floatingPasswordCustom">Tên hiển thị</label>
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
          {isLoading ? "Đang thêm..." : "Thêm mới"}
        </Button>
      </div>
    </Modal>
  );
};
