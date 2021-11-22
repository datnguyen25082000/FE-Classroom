import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EToken } from "../../constants";
const token = localStorage.getItem(EToken.loginToken);
const accessToken = localStorage.getItem(EToken.loginToken);

export const courseApi = createApi({
  reducerPath: "course",
  baseQuery: fetchBaseQuery({
    baseUrl: String(process.env.REACT_APP_URL_API) + "api/Courses/",
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("content-type", `application/json`);
        headers.set("access_token", `${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchAllCourse: builder.query<IResCourse[], any>({
        query: ({ limit = 10, page = 0 }: any) =>
          `/search/?limit=${limit}&page=${page}`,
        transformResponse: (response: any) => {
          const course = response.content.course;
          const parseCountries: IResCourse[] = [...[], ...course];

          return parseCountries;
        },
      }),

      fetchOneCourse: builder.query<IResCourse, any>({
        query: ({ courseId }: IParamsGetOneCourse) =>
          `GetOneCourse?courseId=${courseId}`,
        transformResponse: (response: any) => {
          if (response.content) {
            const course = response.content.course;
            return course;
          } else return {};
        },
      }),
    };
  },
});

export const { useFetchAllCourseQuery, useFetchOneCourseQuery } = courseApi;
