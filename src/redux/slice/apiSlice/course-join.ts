import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
    doGetAllMembers
} from "../../asyncActions";

const initialState = {
    allMembers: [],
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
    },
});
const { reducer: courseJoinReducer, actions } = slice;
export default courseJoinReducer;
