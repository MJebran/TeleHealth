import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAllItems, createItem, deleteItem, updateItem} from "../components/itemAPi/apiService";
import { itemKeys } from "./queryKeys";
import { InventoryItem } from "../types/InventoryTypes";
// Hook to fetch all items with refetch every 30 seconds
export const useItems = () => {
  return useQuery({
    queryKey: itemKeys.all,
    queryFn: getAllItems,
    refetchInterval: 30000, // Auto refetch every 30 seconds
  });
};

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
    onError: (error) => {
      console.error('Error to add an item', error);
    },
  });
};
export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
    onError: (error) => {
      console.error('Error to add an item', error);
    },
  });
};

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedItem: InventoryItem) => updateItem(updatedItem.id, updatedItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.all });
    },
    onError: (error) => {
      console.error('Error to add an item', error);
    },
  });
}
