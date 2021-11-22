import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRole } from "../../constants/user-role";
import { apiCourseJoin } from "../../services/aixos";

export const doGetAllCourse = createAsyncThunk(
  "course-join@get/getAllCourse",
  async (params: any) => {
    const result = await apiCourseJoin.getAllCourses(params);
    return result.data;
  }
);

export const doGetAllMembers = createAsyncThunk(
  "course-join@get/getAllMembers",
  async (params: any) => {
    const result = await apiCourseJoin.getAllMembersOfCourse(params);
    return result.data;
  }
);

export const doJoinCourse = createAsyncThunk(
  "course-join@post/joinCourse",
  async (params: any) => {
    const result = await apiCourseJoin.joinCourse(params);
    return result.data;
  }
);

export const doInviteViaEmail = createAsyncThunk(
  "course-join@post/postInviteViaEmail",
  async (params: IParamsInviteViaEmail) => {
    const result = await apiCourseJoin.inviteViaEmail(params);
    return result.data;
  }
);

export const doGetStudentInvitationCode = createAsyncThunk(
  "course-join@get/getStudentInvitationCode",
  async (params: any) => {
    const result = await apiCourseJoin.getInvitationCode(params);
    return result.data;
  }
);

export const doGetTeacherInvitationCode = createAsyncThunk(
  "course-join@get/getTeacherInvitationCode",
  async (params: any) => {
    const result = await apiCourseJoin.getInvitationCode({
      ...params,
      role: UserRole.Teacher,
    });
    return result.data;
  }
);

export const doJoinCourseViaInvitationCode = createAsyncThunk(
  "course-join@get/joinCourseViaInvitationCode",
  async (params: any) => {
    const result = await apiCourseJoin.joinCourseViaInvitationCode(params);
    return result.data;
  }
);

export const doLeaveCourse = createAsyncThunk(
  "course-join@post/doLeaveCourse",
  async (params: IParamsLeaveCourse) => {
    const result = await apiCourseJoin.leaveCourse(params);
    return result.data;
  }
);
