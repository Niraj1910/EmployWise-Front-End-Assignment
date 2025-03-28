import axios from "axios";
import { LoginResponse, UsersResponse, User } from "./types";

const BASE_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const getUsers = async (page: number): Promise<UsersResponse> => {
  const response = await api.get(`/users?page=${page}`);
  return response.data;
};

export const getUserById = async (userId: number): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  console.log("response -> ", response);
  return response.data.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  console.log("response -> ", response);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
