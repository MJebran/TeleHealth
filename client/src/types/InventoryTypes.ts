export interface InventoryItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export type InventoryContextType = {
  items: InventoryItem[];
  loadItems: () => void;
  addItem: (item: InventoryItem) => void;
  removeItem: (id: number) => void;
  modifyItem: (
    id: number,
    name: string,
    detail: string,
    imageUrl: string
  ) => void;
  isLoading: boolean;
}
