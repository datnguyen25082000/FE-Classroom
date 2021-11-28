import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DDContainer } from "../../components";
import { HeaderRoom, Page404 } from "../../components/common";
import {
  useAppSelector,
  useAppDispatch,
  useFetchOneCourseQuery,
  doGetAllAssignByCourse,
  doAddAssignmentCategory,
} from "../../redux";
import { useParams } from "react-router";
import "./GradingStructure.scss";
import { OffCanvas } from "../../components";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ITEMS = [
  {
    id: 1,
    text: "Kiểm tra giữa kì",
    value: 40,
  },
  {
    id: 2,
    text: "Kiểm tra cuối kì",
    value: 20,
  },
  {
    id: 3,
    text: "Đồ án",
    value: 20,
  },
  {
    id: 4,
    text: "Thực hành",
    value: 40,
  },
];

export const GradingStructure = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listAssign } = useAppSelector((state) => state.assignCateSlice);

  const [showCanvas, setShowCanvas] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });

    dispatch(doGetAllAssignByCourse({ course_id: classId }));
  }, []);

  const onSubmit = (data: any) => {
    const { name, point } = data;

    dispatch(
      doAddAssignmentCategory({
        name,
        point: parseInt(point),
        course_id: parseInt(classId),
      })
    );
    setShowAddCard(false);
    notify();
    reset({ name: "", point: null });
  };

  const notify = () => {
    toast("Thêm thành công", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="grading-structure">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse.course_name}
      />
      <div className="grading-structure__header">
        <h1>Cơ cấu tính điểm</h1>
        <p>Chỉnh sửa cơ cấu tính điểm của khóa học:</p>
        <Button
          variant={showAddCard ? "danger" : "primary"}
          className="grading-structure__button"
          onClick={() => setShowAddCard(!showAddCard)}
        >
          {showAddCard ? "Hủy tác vụ" : "Thêm cột điểm"}
        </Button>
      </div>

      <div
        className={`grading-structure__add-card ${
          showAddCard ? "grading-structure__add-card--show dd-card" : ""
        }`}
      >
        <p className="grading-structure__add-title">Thêm cột điểm</p>
        <FloatingLabel controlId="floatingInputGrid" label="Tên cột điểm">
          <Form.Control
            type="text"
            placeholder=""
            style={{ marginTop: 15 }}
            {...register("name", {
              required: "Vui lòng nhập cột điểm",
              maxLength: 40,
            })}
            isInvalid={!!errors.name}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInputGrid"
          label="Số điểm"
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
        <Button
          variant="outline-dark"
          style={{ marginRight: 10 }}
          onClick={() => setShowAddCard(false)}
        >
          Hủy
        </Button>
        <Button variant="outline-primary" onClick={handleSubmit(onSubmit)}>
          Thêm mới
        </Button>
      </div>

      {listAssign && listAssign.length ? (
        <DndProvider backend={HTML5Backend}>
          <DDContainer
            ITEMS={listAssign.map((item) => {
              return {
                id: item.id,
                text: item.name,
                value: item.point,
              };
            })}
          />
        </DndProvider>
      ) : (
        <p
          style={{
            fontSize: 30,
            fontWeight: "400",
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          Chưa có cột điểm. Vui lòng thêm mới
        </p>
      )}

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />

      <ToastContainer autoClose={1500} />
    </div>
  );
};
