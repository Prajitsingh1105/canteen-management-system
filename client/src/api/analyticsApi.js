import API from "./axios";

export const getSummary = () => {
  return API.get("/api/analytics/summary");
};

export const getWeeklyAnalytics = () => {
  return API.get("/api/analytics/weekly");
};

export const getTopItems = () => {
  return API.get("/api/analytics/top-items");
};