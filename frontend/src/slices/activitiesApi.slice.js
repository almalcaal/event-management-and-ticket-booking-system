import { ACTIVITIES_URL } from "../constants.js";
import { apiSlice } from "./api.slice.js";

export const activitiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => ({
        url: ACTIVITIES_URL,
      }),
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
        url: `${PRODUCTS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityDetailsQuery,
  useCreateActivityMutation,
} = activitiesApiSlice;
