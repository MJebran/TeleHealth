import { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import { useFormControls } from "./useFormControls";
import {
  useItems,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} from "../hooks/useItemsHooks"; // Adjust the import path
import { InventoryItem } from "../types/InventoryTypes";

const MainPage: React.FC = () => {
  const { data: items = [], isLoading } = useItems(); // Fetching items using hook
  const createItemMutation = useCreateItemMutation();
  const deleteItemMutation = useDeleteItemMutation();
  const updateItemMutation = useUpdateItemMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const nameControl = useFormControls("");
  const descriptionControl = useFormControls("");

  const generateId = () => Math.floor(Math.random() * 1000000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";

    // Handle image upload if an image is selected
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/items/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        imageUrl = data.ImageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const newItem: InventoryItem = {
      id: editingId !== null ? editingId : generateId(),
      name: nameControl.value,
      description: descriptionControl.value,
      imageUrl: imageUrl || `/images/${imageFile?.name}`,
    };

    if (editingId !== null) {
      updateItemMutation.mutate(newItem); // Update item using the mutation
      setEditingId(null);
    } else {
      createItemMutation.mutate(newItem); // Create item using the mutation
    }

    // Clear form after submission
    nameControl.setValue("");
    descriptionControl.setValue("");
    setImageFile(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItemMutation.mutate(id); // Delete item using the mutation
    }
  };

  const handleEdit = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      nameControl.setValue(itemToEdit.name);
      descriptionControl.setValue(itemToEdit.description);
      setEditingId(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    nameControl.setValue("");
    descriptionControl.setValue("");
    setImageFile(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Items List</h2>
      <ul className="list-group mb-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center"
          >
            <span className="mb-2 mb-md-0">
              <Link to={`/item/${item.id}`}>
                <strong>{item.name}</strong>
              </Link>
            </span>
            <div className="d-flex">
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEdit(item.id)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>{editingId ? "Edit Item" : "Add New Item"}</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          value={nameControl.value}
          onChange={nameControl.setValue}
        />
        <TextInput
          label="Description"
          value={descriptionControl.value}
          onChange={descriptionControl.setValue}
        />
        <div className="mb-3">
          <label htmlFor="itemImage" className="form-label">
            Add Item Image
          </label>
          <input
            type="file"
            className="form-control"
            id="itemImage"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="mt-3 d-flex flex-column flex-md-row">
          <button type="submit" className="btn btn-primary me-md-2 mb-2 mb-md-0">
            {editingId ? "Update Item" : "Add Item"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MainPage;
