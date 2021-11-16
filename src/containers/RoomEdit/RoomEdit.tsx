import React, { useEffect } from "react";
import "./RoomEdit.scss";
import { FloatingLabel, Form, Row, Col, Button } from "react-bootstrap";
import { MdOutlineBackspace } from "react-icons/md";
import { VscCopy } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector, doGetOneCourse } from "../../redux";
import { useParams } from "react-router";

export const RoomEdit = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const { oneCourse } = useAppSelector((state) => state.courseSlice);

  useEffect(() => {
    dispatch(doGetOneCourse({ courseId: classId }));
  }, []);

  const notify = () => {
    handleCopyClipBoard();
    toast("Sao chép thành công", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const handleReturn = () => {
    history.goBack();
  };

  const handleCopyClipBoard = () => {
    const el = document.createElement("input");
    el.value = "https://classroom.google.com/c/NDA1MTc3NzczMTM5?cjc=acciwyd";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleSaveChange = () => {
    handleReturn();
  };

  return (
    <div className="room-edit">
      <div className="room-edit__header">
        <div className="room-edit__left">
          <MdOutlineBackspace
            className="room-edit__icon"
            onClick={handleReturn}
            size={28}
          />
          <span>Cài đặt lớp học</span>
        </div>
        <Button variant="success" onClick={handleSaveChange}>
          Lưu thông tin
        </Button>
      </div>

      <Row>
        <Col md={8} className="room-edit__container">
          <div className="room-edit__block">
            <h2 className="room-edit__title">Thông tin chi tiết về lớp học</h2>
            <div className="room-edit__input">
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Tên lớp học(bắt buộc)"
              >
                <Form.Control
                  type="text"
                  defaultValue={oneCourse.course_name}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
            </div>

            <div className="room-edit__input">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Mô tả lớp học"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </div>
            <div className="room-edit__input">
              <FloatingLabel controlId="floatingInputGrid" label="Phần">
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
            <div className="room-edit__input">
              <FloatingLabel controlId="floatingInputGrid" label="Phòng">
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
            <div className="room-edit__input">
              <FloatingLabel controlId="floatingInputGrid" label="Chủ đề">
                <Form.Control type="text" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
          </div>

          <div className="room-edit__block">
            <h2 className="room-edit__title">Thông tin chung</h2>
            <div className="room-edit__item">
              <span className="room-edit__item-title">Đường liên kết mời</span>
              <div className="room-edit__item-right">
                <span>
                  https://classroom.google.com/c/NDA1MTc3NzczMTM5?cjc=acciwyd
                </span>
                <VscCopy
                  className="room-edit__icon"
                  onClick={notify}
                  size={25}
                />
              </div>
            </div>

            <div className="room-edit__item">
              <span className="room-edit__item-title">Mã lớp học</span>
              <div className="room-edit__item-right">
                <span>acciwyd</span>
              </div>
            </div>

            <div className="room-edit__item">
              <span className="room-edit__item-title">Bảng tin</span>
              <div className="room-edit__item-right">
                <FloatingLabel controlId="floatingSelectGrid" label="Tùy chỉnh">
                  <Form.Select aria-label="Tùy chỉnh" defaultValue="1">
                    <option value="1">
                      Sinh viên có thể đăng bài và nhận xet
                    </option>
                    <option value="2">Sinh viên chỉ có thể nhận xét</option>
                    <option value="3">
                      Chỉ có giáo viên được phép đăng bài và nhận xét
                    </option>
                  </Form.Select>
                </FloatingLabel>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer autoClose={1500} />
    </div>
  );
};
