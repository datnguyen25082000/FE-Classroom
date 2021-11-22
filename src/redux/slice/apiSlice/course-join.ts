import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
    doGetAllMembers, doGetStudentInvitationCode, doGetTeacherInvitationCode, doJoinCourseViaInvitationCode
} from "../../asyncActions";

const initialState = {
    allMembers: [],
    studentInvitationCode: '',
    teacherInvitationCode: '',
    courseId: 0,
    isLoading: false,
    error: {},
} as ISliceCourseJoin;

const slice = createSlice({
    name: "course-join@",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(doGetAllMembers.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addCase(
            doGetAllMembers.fulfilled,
            (state, action: PayloadAction<Array<IResMember>>) => {
                state.allMembers = action.payload;
                state.isLoading = false;
            }
        );

        builder.addCase(doGetAllMembers.rejected, (state, action) => {
            const error = action.error;
            state.error = error;
            state.isLoading = false;
        });


        builder.addCase(doGetStudentInvitationCode.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addCase(
            doGetStudentInvitationCode.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.studentInvitationCode = action.payload.content;
                state.isLoading = false;
            }
        );

        builder.addCase(doGetStudentInvitationCode.rejected, (state, action) => {
            const error = action.error;
            state.error = error;
            state.isLoading = false;
        });


        builder.addCase(doGetTeacherInvitationCode.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addCase(
            doGetTeacherInvitationCode.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.teacherInvitationCode = action.payload.content;
                state.isLoading = false;
            }
        );

        builder.addCase(doGetTeacherInvitationCode.rejected, (state, action) => {
            const error = action.error;
            state.error = error;
            state.isLoading = false;
        });

        builder.addCase(doJoinCourseViaInvitationCode.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        });

        builder.addCase(
            doJoinCourseViaInvitationCode.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.courseId = +action.payload.content;
                state.isLoading = false;
            }
        );

        builder.addCase(doJoinCourseViaInvitationCode.rejected, (state, action) => {
            const error = action.error;
            state.error = error;
            state.isLoading = false;
        });
    },
});
const { reducer: courseJoinReducer, actions } = slice;
export default courseJoinReducer;
