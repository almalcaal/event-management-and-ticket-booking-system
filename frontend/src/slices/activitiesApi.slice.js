import { ACTIVITIES_URL } from "../constants.js";
import { apiSlice } from "./api.slice.js";

export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: ({ pageNumber }) => ({
        url: ACTIVITIES_URL,
        params: { pageNumber },
      }),
      providesTags: ["Activity"],
      keepUnusedDataFor: 5,
    }),
    getActivityDetails: builder.query({
      query: (activityId) => ({
        url: `${ACTIVITIES_URL}/${activityId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createActivity: builder.mutation({
      query: () => ({
        url: `${ACTIVITIES_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Activity"],
    }),
    updateActivity: builder.mutation({
      query: (data) => ({
        url: `${ACTIVITIES_URL}/${data.activityId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Activity"],
    }),
    uploadActivityImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteActivity: builder.mutation({
      query: (activityId) => ({
        url: `${ACTIVITIES_URL}/${activityId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${ACTIVITIES_URL}/${data.activityId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityDetailsQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useUploadActivityImageMutation,
  useDeleteActivityMutation,
  useCreateReviewMutation,
} = activitiesApiSlice;
