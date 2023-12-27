import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchItems = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching items: ${error.message}`);
  }
};


export const createItem = async (data) => {
  const response = await api.post("/items", data);
  return response.data;
};

export const updateItem = async (id, data) => {
  try {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


