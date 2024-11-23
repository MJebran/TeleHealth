import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/userTypes";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";

interface UserContextProps {
  users: User[];
  getUserById: (id: number) => Promise<User>;
  addUser: (user: User) => Promise<void>;
  updateUser: (id: number, updatedUser: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/User");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUserById = async (id: number): Promise<User> => {
    try {
      const response = await axiosInstance.get(`/User/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch user details.");
      console.error(error);
      throw error;
    }
  };

  const addUser = async (user: User) => {
    try {
      const response = await axiosInstance.post("/User", user);
      setUsers((prev) => [...prev, response.data]);
      toast.success("User added successfully!");
    } catch (error) {
      toast.error("Failed to add user.");
      console.error(error);
    }
  };

  const updateUser = async (id: number, updatedUser: User) => {
    try {
      const response = await axiosInstance.put(`/User/${id}`, updatedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user))
      );
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("Failed to update user.");
      console.error(error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axiosInstance.delete(`/User/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user.");
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, getUserById, addUser, updateUser, deleteUser }}
    >
      {loading ? <p>Loading...</p> : children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
