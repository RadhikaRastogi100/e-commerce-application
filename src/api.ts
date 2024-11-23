import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const fetchProductList = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data.products;
};

export const fetchProductById = async (productId: string) => {
  const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
  return response.data;
};

export const pagination = async (limit: number, skip: number) => {
  const response = await axios.get(`${API_BASE_URL}/products`, {
    params: { limit, skip },
  });
  return response.data;
};
