import API from "./axios";

export const loginUser = (data) => {
  return API.post("/api/auth/login", data);
};

export const registerUser = (data) => {
  return API.post("/api/auth/register", data);
};

export const sendOtp = (data) => {
  return API.post("/api/auth/send-otp", data);
};