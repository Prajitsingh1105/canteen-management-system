import API from "./axios";

export const getMenu = () => {
  return API.get("/menu");
};

export const addMenuItem = (data) => {
  return API.post("/menu", data);
};

export const deleteMenuItem = (id) => {
  return API.delete(`/menu/${id}`);
};