import { useState, useEffect } from "react";
import { User, NewUserPayload } from "../types/userTypes";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addNewUser = async (user: User): Promise<User | null> => {
    try {
      const payload: NewUserPayload = {
        username: user.username,
        email: user.email,
        password: user.password || "", // Provide a default empty string if undefined
        fullName: user.fullName || undefined,
        gender: user.gender || undefined,
        roleId: user.roleId || null,
        isApproved: user.isApproved || false,
        verified: user.verified || false,
        hasAcceptedAgreement: user.hasAcceptedAgreement || false,
        agreementId: user.agreementId || null,
      };
  
      const newUser = await addUser(payload); // Ensure it returns the created user
      setUsers((prev) => [...prev, newUser]);
      return newUser; // Return the new user with `id`
    } catch {
      setError("Failed to add user");
      return null;
    }
  };
  

  const editUser = async (id: number, updatedUser: User) => {
    try {
      const updated = await updateUser(id, updatedUser);
      setUsers((prev) => prev.map((user) => (user.id === id ? updated : user)));
    } catch {
      setError("Failed to update user");
    }
  };

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      setError("Failed to delete user");
    }
  };

  return { users, loading, error, addNewUser, editUser, removeUser };
};
