import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, CardPost, InputPost } from "../../components";
import { IDefaultClass } from "../../constants/images";
import { Row, Col } from "react-bootstrap";
import {
    useAppDispatch,
    useAppSelector,
    doGetOneCourse,
    useFetchOneCourseQuery,
    doJoinCourseViaInvitationCode,
} from "../../redux";
import "./RoomJoin.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscCopy } from "react-icons/vsc";
import { transformDateFormat } from "../../helpers/time";

export const RoomJoin = () => {
    const dispatch = useAppDispatch();
    const { invitationCode } = useParams<{ invitationCode: string }>();
    const [showCanvas, setShowCanvas] = useState(false);
    const oneCourse = useFetchOneCourseQuery({ courseId: invitationCode }).data;
    const { courseId } = useAppSelector((state) => state.courseJoinSlice)

    useEffect(() => {
        dispatch(doJoinCourseViaInvitationCode({ code: invitationCode }))
    }, [invitationCode])
    console.log("courseId: ", courseId);
    

    if (!oneCourse || !oneCourse.course_id) {
        return <Page404 />;
    }

    return (
        <div></div>
    );
};
