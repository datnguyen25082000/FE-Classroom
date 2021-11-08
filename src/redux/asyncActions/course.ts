import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiCourses } from '../../services/aixos';

export const doGetAllCourse = createAsyncThunk('class@get/getAllCourse', async (params: any) => {
  const result = await apiCourses.getAllClass(params);
  return result.data;
});

export const doAddCourse = createAsyncThunk('class@post/addCourse', async (params: any) => {
  const result = await apiCourses.addClass(params);
  return result.data;
});
