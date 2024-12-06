import axiosInstance from "./axiosInstance";
import { Case, NewCasePayload } from "../types/caseTypes";

const API_URL = "/Case";

export const getCases = async (): Promise<Case[]> => {
  try {
    const response = await axiosInstance.get<Case[]>(API_URL);
    console.log("API Response for getCases:", response.data); // Log the API response
    return response.data;
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw error;
  }
};


export const getCaseById = async (id: number): Promise<Case> => {
  const response = await axiosInstance.get<Case>(`${API_URL}/${id}`);
  return response.data;
};

export const createCase = async (newCase: NewCasePayload): Promise<Case> => {
  const response = await axiosInstance.post<Case>(API_URL, newCase);
  return response.data;
};

export const updateCase = async (id: number, updatedCase: NewCasePayload): Promise<Case> => {
  const response = await axiosInstance.put<Case>(`${API_URL}/${id}`, updatedCase);
  return response.data;
};

export const deleteCase = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${API_URL}/${id}`);
};
