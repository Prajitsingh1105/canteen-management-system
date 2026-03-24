import API from "./axios";

export const getSummary = () => {
  return API.get("/analytics/summary");
};

export const getWeeklyAnalytics = () => {
  return API.get("/analytics/weekly");
};

export const getTopItems = () => {
  return API.get("/analytics/top-items");
};