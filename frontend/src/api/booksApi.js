import API from "./axios";

export const fetchBooks = async (params = {}) => {
  const response = await API.get("/books", { params });
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await API.get(`/books/${id}`);
  return response.data;
};

export const fetchBookCategories = async () => {
  const response = await API.get("/books/categories");
  return response.data;
};
