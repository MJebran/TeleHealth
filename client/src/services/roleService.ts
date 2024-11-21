import axiosInstance from "./axiosInstance";

export const getRoles = async () => {
  const response = await axiosInstance.get("/Role");
  return response.data;
};

export const getRoleById = async (id: number) => {
  const response = await axiosInstance.get(`/Role/${id}`);
  return response.data;
};

export const addRole = async (role: { roleName: string }) => {
  const response = await axiosInstance.post("/Role", role);
  return response.data;
};

export const updateRole = async (id: number, role: { roleName: string }) => {
  const response = await axiosInstance.put(`/Role/${id}`, role);
  return response.data;
};

export const deleteRole = async (id: number) => {
  const response = await axiosInstance.delete(`/Role/${id}`);
  return response.data;
};
