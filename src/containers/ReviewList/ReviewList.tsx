import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, ReviewItem } from "../../components";
import {
  useAppSelector,
  useFetchOneCourseQuery,
  useAppDispatch,
  doGetScoreReviewByCourse,
} from "../../redux";
import "./ReviewList.scss";
import { SvgEmpty } from "../../constants/images";

export const ReviewList = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listReviewOfCourse } = useAppSelector(
    (state) => state.scoreReviewSlice
  );

  useEffect(() => {
    if (classId) {
      dispatch(doGetScoreReviewByCourse({ course_id: parseInt(classId) }));
    }
  }, [classId]);

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
        {listReviewOfCourse && listReviewOfCourse.length ? (
          listReviewOfCourse.map((item, i) => {
            return <ReviewItem reviewItem={item} />;
          })
        ) : (
          <>
            <div className="home__empty">
              <p>Bạn không có yêu cầu phúc khảo nào.</p>
              <img src={SvgEmpty} alt="" />
            </div>
          </>
        )}
      </div>

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};
