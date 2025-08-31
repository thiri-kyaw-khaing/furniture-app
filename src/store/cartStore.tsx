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

const initialState:CartState{
    carts:[]
}

export const useCartStore =create<CartState & CartAction> () (
    persist(
        immer((set,get)=>({
...initialState,
            getTotalItem:()=>{
                const {carts} = get();
                return carts.reduce((total,product)=> total+ product.quantity,0);
            },
            getTotalPrice:()=>{
                const {carts} =get();
                return carts.reduce((total,product)=>total + product.price * product.quantity,0);
            }
        })),
        {
            name:"cartStorage",
            storage:createJSONStorage(()=>localStorage)
        }
    )
)