'use client'
import { useContext, useEffect } from "react";
import Meals from "./components/allMeals";
import Cart from './components/cart';
import NoCart from "./components/noCart";
import CartContextProvider, { CartContext } from "./api/store/context";

export default function Home() {
 
  return (
    <CartContextProvider>
    <div className="flex items-start bg-background p-8 pb-20 gap-10 sm:p-10 font-[family-name:var(--font-geist-sans)]">
     <div className="bg-red h-full w-4/5">
     <h1 className="text-ds font-bold text-dk">Desserts</h1>
     <Meals />
     </div>

     <div className="bg-white h-auto w-2/5 p-5 mr-8 mb-4">
     <h1 className="text-ds font-bold text-rd">Your cart ({contex.cart.length})</h1>
     {contex.cart.length > 0 ? <Cart /> : <NoCart />}
     </div>
    </div>
    </CartContextProvider>
  );
}
