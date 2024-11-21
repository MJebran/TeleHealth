import axiosInstance from "./axiosInstance";
import { Agreement } from "../types/agreement";

export const getAgreements = async (): Promise<Agreement[]> => {
  const response = await axiosInstance.get("/Agreement");
  return response.data;
};

export const getAgreementById = async (id: number): Promise<Agreement> => {
  const response = await axiosInstance.get(`/Agreement/${id}`);
  return response.data;
};

export const addAgreement = async (
  agreement: Omit<Agreement, "id">
): Promise<Agreement> => {
  const response = await axiosInstance.post("/Agreement/add", agreement);
  return response.data;
};

export const editAgreement = async (
  id: number,
  agreement: Partial<Agreement>
): Promise<Agreement> => {
  const response = await axiosInstance.put(`/Agreement/edit/${id}`, agreement);
  return response.data;
};

export const deleteAgreement = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/Agreement/delete/${id}`);
};
