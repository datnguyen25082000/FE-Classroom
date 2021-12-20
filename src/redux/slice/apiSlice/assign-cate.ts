import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doGetAllAssignByCourse,
  doAddAssignmentCategory,
  doUpdateAssignmentCategory,
  doFinalizeAssignment,
} from "../../asyncActions";

const initialState = {
  isLoading: false,
  error: {},
  listAssign: [],
} as ISliceAssignCate;

const slice = createSlice({
  name: "assign-cate@",
  initialState: initialState,
  reducers: {
    doFakeDeleteAssign(state, action) {
      const { id } = action.payload;

      const index = state.listAssign.findIndex((item) => item.id === id);

      if (index >= 0) {
        state.listAssign.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetAllAssignByCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      doGetAllAssignByCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listAssign = action.payload.content;
        state.isLoading = false;
      }
    );
    builder.addCase(doGetAllAssignByCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // add
    builder.addCase(doAddAssignmentCategory.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      doAddAssignmentCategory.fulfilled,
      (state, action: PayloadAction<IResAddAssignCate>) => {
        const newAssign = action.payload.content;

        if (newAssign) {
          state.listAssign = [...state.listAssign, newAssign];
        }

        state.isLoading = false;
      }
    );
    builder.addCase(doAddAssignmentCategory.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // update
    builder.addCase(doUpdateAssignmentCategory.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      doUpdateAssignmentCategory.fulfilled,
      (state, action: PayloadAction<IResAddAssignCate>) => {
        const assign = action.payload.content;

        const index = state.listAssign.findIndex(
          (item) => item.id === assign.id
        );

        if (index >= 0) {
          state.listAssign[index] = assign;
        }

        state.isLoading = false;
      }
    );
    builder.addCase(doUpdateAssignmentCategory.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    //
    // update
    builder.addCase(doFinalizeAssignment.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(
      doFinalizeAssignment.fulfilled,
      (state, action: PayloadAction<IResAddAssignCate>) => {
        const newAssign = action.payload.content;

        if (newAssign) {
          const isFinalized = newAssign.isFinalized;
          const id = newAssign.id;

          const index = state.listAssign.findIndex((item) => item.id === id);

          if (index >= 0) {
            state.listAssign[index].isFinalized = isFinalized;
          }
        }

        state.isLoading = false;
      }
    );
    builder.addCase(doFinalizeAssignment.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: assignCateReducer, actions } = slice;
export const { doFakeDeleteAssign } = actions;
export default assignCateReducer;
