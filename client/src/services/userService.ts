import axiosInstance from "./axiosInstance";
import { User } from "../types/userTypes";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>("/User");
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axiosInstance.get<User>(`/User/${id}`);
  return response.data;
};

export const addUser = async (user: User): Promise<User> => {
  const response = await axiosInstance.post<User>("/User", user);
  return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const response = await axiosInstance.put<User>(`/User/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/User/${id}`);
};
