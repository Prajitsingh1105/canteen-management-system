import axios from "axios";
import API from "./axios";

export const createOrder = async (data) => {

  const user = JSON.parse(localStorage.getItem("user"));

  return axios.post(
    "http://localhost:5000/api/orders",
    data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );

};

export const getMyOrders = () => {
  return API.get("/api/orders/my-orders");
};

export const getAllOrders = () => {
  return API.get("/api/orders");
};

export const updateOrderStatus = (id, status) => {
  return API.patch(`/api/orders/${id}`, { status });
};