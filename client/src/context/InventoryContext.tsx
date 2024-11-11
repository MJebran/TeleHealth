import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import * as apiService from '../components/itemAPi/apiService'; 
import { InventoryItem } from '../types/InventoryTypes';

interface InventoryContextData {
  items: InventoryItem[];
  loading: boolean;
  getItems: () => Promise<void>;
  createItem: (newItem: InventoryItem) => Promise<void>;
  updateItem: (id: number, updatedItem: InventoryItem) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  getItemById: (id: number) => Promise<InventoryItem | null>;
}

const InventoryContext = createContext<InventoryContextData | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getItems = async () => {
    setLoading(true);
    try {
      const fetchedItems = await apiService.getAllItems();
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (newItem: InventoryItem) => {
    try {
      await apiService.createItem(newItem);
      await getItems(); 
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const updateItem = async (id: number, updatedItem: InventoryItem) => {
    try {
      await apiService.updateItem(id, updatedItem);
      await getItems();
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await apiService.deleteItem(id);
      await getItems(); 
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
    }
  };
  const getItemById = async (id: number): Promise<InventoryItem | null> => {
    try {
      return await apiService.getItemById(id);
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      return null;
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <InventoryContext.Provider value={{ items, loading, getItems, createItem, updateItem, deleteItem, getItemById }}>
      {children}
    </InventoryContext.Provider>
  );
  
};

export const useInventory = (): InventoryContextData => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};




