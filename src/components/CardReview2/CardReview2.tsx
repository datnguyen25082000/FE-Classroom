import React, { useState, useEffect } from "react";
import "./CardReview2.scss";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Avatar } from "../common";
import {
  useAppDispatch,
  useAppSelector,
  doCreateScoreReview,
  doAddCommentReview,
  doGetReviewByAssignment,
  doGetAllByCommentByScoreReview,
  doFinalizeReviewScore,
  doFakeDisplayName,
} from "../../redux";
import { AiOutlineSend } from "react-icons/ai";
import { transformDatetimeFormat } from "../../helpers/time";
import { ToastContainer, toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";

export const CardReview2: React.FC<ICardReview2> = ({
  column,
  isTeacherView,
  isShow = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();
  const { dataUser } = useAppSelector((state) => state.userSlice);

  const { listComment } = useAppSelector((state) => state.reviewCommentSlice);

  const onSubmit = (data: any) => {
    if (column) {
      dispatch(
        doFinalizeReviewScore({
          scoreReviewId: column.id,
          updatedPoint: data.new_point,
        })
      );
      toast("Cập nhật điểm thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: "foo-bar",
      });
    }
  };

  const handleAddComment = () => {
    if (watch("comment")) {
      dispatch(
        doAddCommentReview({
          score_review_id: column?.id,
          content: watch("comment"),
        })
      )
        .then(unwrapResult)
        .then((res: any) => {
          if (res.content) {
            dispatch(doFakeDisplayName(dataUser.user_displayname));
          }
        });
    }

    setValue("comment", "");
  };

  useEffect(() => {
    if (column && column?.id && isShow) {
      dispatch(doGetAllByCommentByScoreReview({ scoreReviewId: column.id }));
    }
  }, [column, isShow]);

  // const notify = () => {
  //   toast("Cập nhật điểm thành công", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //     className: "foo-bar",
  //   });
  // };

  return (
    <div className="card-review">
      {" "}
      <ToastContainer autoClose={1500} />
      <div className="card-review__form">
        <FloatingLabel controlId="floatingInputGrid" label="Tên cột điểm">
          <Form.Control
            type="text"
            value={column?.assignment_name}
            disabled
            placeholder=""
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
              disabled
              value={column?.current_point}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInputGrid"
            label="Số điểm mong muốn"
            style={{ marginTop: 15, marginBottom: 20 }}
          >
            <Form.Control
              type="number"
              disabled
              value={column?.expected_point}
              placeholder=""
              // {...register("new_point", {
              //   required: "Vui lòng nhập số điểm",
              //   maxLength: 40,
              // })}
              // isInvalid={!!errors.new_point}
            />
          </FloatingLabel>
        </div>

        <FloatingLabel controlId="floatingInputGrid" label="Lý do">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            value={column?.reason}
            defaultValue={""}
            disabled
            style={{ height: "100px" }}
            // {...register("reason", {
            //   required: "Vui lòng nhập lý do phúc khảo",
            //   maxLength: 40,
            // })}
            isInvalid={!!errors.reason}
          />
        </FloatingLabel>
      </div>
      <FloatingLabel
        controlId="floatingInputGrid"
        label="Điểm số sau phúc khảo"
        style={{ marginTop: 15, marginBottom: 20 }}
      >
        <Form.Control
          type="number"
          disabled={column.isFinalized ? true : false}
          defaultValue={column.isFinalized ? column?.current_point : ""}
          placeholder=""
          {...register("new_point", {
            required: "Vui lòng nhập số điểm",
            maxLength: 40,
          })}
          isInvalid={!!errors.new_point}
        />
      </FloatingLabel>
      {!column.isFinalized && (
        <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
          Xác nhận điểm cuối cùng
        </Button>
      )}
      <div className="card-review__comments">
        <p className="card-review__header">Bình luận</p>
        {listComment &&
          listComment.length &&
          listComment.map((item, i) => {
            return (
              <div key={i} className="card-review__comment">
                <Avatar image={dataUser.user_avatar} />
                <div className="card-review__comment__right">
                  <span className="card-review__comment__top">
                    <span className="card-review__comment__name">
                      {item.displayName}
                    </span>
                    <span className="card-review__comment__time">
                      {transformDatetimeFormat(item.created_at)}
                    </span>
                  </span>
                  <span className="card-review__comment__content">
                    {item.content}
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
              // onChange={(e: any) => setComment(e.target.value)}
              {...register("comment")}
              style={{ height: "70px" }}
            />
          </FloatingLabel>

          <AiOutlineSend
            className="card-review__input--icon"
            size={28}
            color="green"
            onClick={() => handleAddComment()}
          />
        </div>
      </div>
    </div>
  );
};
