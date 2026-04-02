import API from "./axios";

export const createOrder = (data) => {
  return API.post("/api/orders", data);
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