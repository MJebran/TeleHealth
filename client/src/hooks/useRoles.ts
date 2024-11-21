import { useState, useEffect } from "react";
import {
  getRoles,
  addRole,
  updateRole,
  deleteRole,
} from "../services/roleService";

export const useRoles = () => {
  const [roles, setRoles] = useState<{ id: number; roleName: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch {
      setError("Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const addNewRole = async (roleName: string) => {
    try {
      const newRole = await addRole({ roleName });
      setRoles((prevRoles) => [...prevRoles, newRole]);
    } catch {
      setError("Failed to add role");
    }
  };

  const editRole = async (id: number, roleName: string) => {
    try {
      const updatedRole = await updateRole(id, { roleName });
      setRoles((prevRoles) =>
        prevRoles.map((role) => (role.id === id ? updatedRole : role))
      );
    } catch {
      setError("Failed to update role");
    }
  };

  const removeRole = async (id: number) => {
    try {
      await deleteRole(id);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch {
      setError("Failed to delete role");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, error, addNewRole, editRole, removeRole };
};
