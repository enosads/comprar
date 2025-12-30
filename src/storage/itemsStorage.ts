import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemsStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemsStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);

    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    throw new Error(`ITEMS_GET: ${error}`);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
  const items = await get();
  return items.filter((item) => item.status === status);
}

async function save(items: ItemsStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error(`ITEMS_SAVE: ${error}`);
  }
}

async function add(newItem: ItemsStorage): Promise<ItemsStorage[]> {
  const items = await get();
  const updatedItems = [...items, newItem];
  await save(updatedItems);
  return updatedItems;
}

async function remove(itemId: string): Promise<ItemsStorage[]> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== itemId);
  await save(updatedItems);
  return updatedItems;
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error(`ITEMS_CLEAR: ${error}`);
  }
}

async function toggleStatus(itemId: string): Promise<ItemsStorage[]> {
  const items = await get();
  const updatedItems = items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        status:
          item.status === FilterStatus.PENDING
            ? FilterStatus.DONE
            : FilterStatus.PENDING,
      };
    }
    return item;
  });
  await save(updatedItems);
  return updatedItems;
}

export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toggleStatus,
};
