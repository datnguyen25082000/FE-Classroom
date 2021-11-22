import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas } from "../../components";
import {
  useAppSelector,
  useFetchOneCourseQuery,
  useAppDispatch,
} from "../../redux";
export const RoomPractice = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="room-practice">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse.course_name}
      />

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};
