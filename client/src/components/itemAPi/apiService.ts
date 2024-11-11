
import axios from "axios";
import { InventoryItem } from '../../types/InventoryTypes'; 

// const baseURL = '/api/items';
// const baseURL='http://localhost:7070/api'
const baseURL=import.meta.env.VITE_API_URL
if (!baseURL) {
    throw new Error('VITE_API_URL is not defined');
}
else{
    console.log('VITE_API_URL:', baseURL);
}

export const getAllItems = async (): Promise<InventoryItem[]> => {
    const response = await axios.get(baseURL);
    return response.data;
};

export const createItem = async (newItem: InventoryItem): Promise<InventoryItem> => {
    const response = await axios.post(baseURL, newItem);
    return response.data;
};
export const deleteItem = async (id: number): Promise<void> => {
    await axios.delete(`${baseURL}/${id}`);
};
export const updateItem = async (id: number, updatedItem: InventoryItem): Promise<InventoryItem> => {
    const response = await axios.put(`${baseURL}/${id}`, updatedItem);
    return response.data;
};
export const getItemById = async (id: number): Promise<InventoryItem> => {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
};


