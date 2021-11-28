import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAssignCate } from "../../services/aixos";

export const doGetAllAssignByCourse = createAsyncThunk(
  "assign-cate@get/getAllAssignByCourse",
  async (params: IParamsGetAllAssignByCourse) => {
    const result = await apiAssignCate.getAllAssignByCourse(params);
    return result.data;
  }
);

export const doAddAssignmentCategory = createAsyncThunk(
  "assign-cate@post/addAssignmentCategory",
  async (params: IParamsAddAssignmentCategory) => {
    const result = await apiAssignCate.addAssignmentCategory(params);
    return result.data;
  }
);

export const doUpdateAssignmentCategory = createAsyncThunk(
  "assign-cate@post/updateAssignmentCategory",
  async (params: IParamsUpdateAssignmentCategory) => {
    const result = await apiAssignCate.updateAssignmentCategory(params);
    return result.data;
  }
);

export const doDeleteAssignmentCategory = createAsyncThunk(
  "assign-cate@post/deleteAssignmentCategory",
  async (params: IParamsDeleteAssignmentCategory) => {
    const result = await apiAssignCate.deleteAssignmentCategory(params);
    return result.data;
  }
);

export const doUpdatePositionAssignCate = createAsyncThunk(
  "assign-cate@post/updatePositionAssignCate",
  async (params: IParamsUpdatePositionAssignCate) => {
    const result = await apiAssignCate.updatePositionAssignCate(params);
    return result.data;
  }
);
