import API from "./axios";

export const getMenu = () => {
  return API.get("/api/menu");
};

export const addMenuItem = (data) => {
  return API.post("/api/menu", data);
};

export const deleteMenuItem = (id) => {
  return API.delete(`/api/menu/${id}`);
};