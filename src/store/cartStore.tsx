import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  carts: CartItem[];
}

interface CartAction {
  getTotalItem: () => number;
  getTotalPrice: () => number;
  addItem: (item: CartItem) => void;
  updateItem: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  carts: [],
};

export const useCartStore = create<CartState & CartAction>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      getTotalItem: () => {
        const { carts } = get();
        return carts.reduce((total, product) => total + product.quantity, 0);
      },
      getTotalPrice: () => {
        const { carts } = get();
        return carts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
      },
      addItem: (item) =>
        set((state) => {
          const existingItem = state.carts.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.quantity = item.quantity || 1;
          } else state.carts.push({ ...item, quantity: item.quantity || 1 }); //...item=id,name,quantity,price,image
          //state.carts.push(item)
        }),
      updateItem: (id, quantity) =>
        set((state) => {
          const item = state.carts.find((item) => item.id === id);
          if (item) {
            item.quantity = quantity;
          }
        }),
      removeItem: (id) =>
        set((state) => {
          state.carts = state.carts.filter((item) => item.id !== id);
        }),
      clearCart: () => set(initialState),
    })),
    {
      name: "cartStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
