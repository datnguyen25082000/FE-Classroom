import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, ReviewItem } from "../../components";
import {
  useAppSelector,
  useFetchOneCourseQuery,
  useAppDispatch,
} from "../../redux";
import "./ReviewList.scss";

export const ReviewList = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="review-list">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse.course_name}
      />

      <div>
        {[1, 2, 3, 4, 5].map((item, i) => {
          return <ReviewItem />;
        })}
      </div>

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};
