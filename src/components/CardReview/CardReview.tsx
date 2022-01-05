import React, { useState } from "react";
import "./CardReview.scss";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Avatar } from "../common";
import {
  useAppDispatch,
  useAppSelector,
  doGetCurrentUser,
  doUpdateInfo,
  doUpdateAvatar,
  doFakeUpdateAvatar,
} from "../../redux";
import { AiOutlineSend } from "react-icons/ai";

export const CardReview = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
  };
  const { dataUser } = useAppSelector((state) => state.userSlice);

  return (
    <div className="card-review">
      <div className="card-review__form">
        <FloatingLabel controlId="floatingInputGrid" label="Tên cột điểm">
          <Form.Control
            type="text"
            placeholder=""
            {...register("name", {
              required: "Vui lòng nhập cột điểm",
              maxLength: 40,
            })}
            isInvalid={!!errors.name}
          />
        </FloatingLabel>

        <div className="card-review__point">
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Số điểm hiện tại"
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Form.Control
              type="number"
              placeholder=""
              {...register("point", {
                required: "Vui lòng nhập số điểm",
                maxLength: 40,
              })}
              isInvalid={!!errors.point}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputGrid"
            label="Số điểm mong muốn"
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Form.Control
              type="number"
              placeholder=""
              {...register("point", {
                required: "Vui lòng nhập số điểm",
                maxLength: 40,
              })}
              isInvalid={!!errors.point}
            />
          </FloatingLabel>
        </div>

        <FloatingLabel controlId="floatingInputGrid" label="Lý do">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            defaultValue={""}
            style={{ height: "100px" }}
            {...register("course_des")}
          />
        </FloatingLabel>
      </div>
      <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
        Cập nhật
      </Button>

      <div className="card-review__comments">
        <p className="card-review__header">Bình luận</p>
        {[1, 2, 3].map((item, i) => {
          return (
            <div className="card-review__comment">
              <Avatar image={dataUser.user_avatar} />
              <div className="card-review__comment__right">
                <span className="card-review__comment__top">
                  <span className="card-review__comment__name">
                    Nguyễn Tấn Đạt
                  </span>
                  <span className="card-review__comment__time">20/11/2022</span>
                </span>
                <span className="card-review__comment__content">
                  Thầy ơi cho em hỏi cái này với
                </span>
              </div>
            </div>
          );
        })}

        <div className="card-review__input">
          <FloatingLabel
            controlId="floatingInputGrid"
            className="card-review__input--form"
            label="Nhập bình luận"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              defaultValue={""}
              style={{ height: "70px" }}
              {...register("course_des")}
            />
          </FloatingLabel>

          <AiOutlineSend
            className="card-review__input--icon"
            size={28}
            color="green"
          />
        </div>
      </div>
    </div>
  );
};
