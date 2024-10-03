'use client'
import React from "react";
import Meals from "./components/allMeals";
import CartContextProvider from "./api/store/context";
import CartModal from "./components/showcartModal";
import ConfirmCart from "./components/confirmCart";

export default function Home() {
 
  return (
    <CartContextProvider>
    <div className="pb:5 items-start bg-background p-8 sm:pb-20 gap-10 sm:p-10 font-[family-name:var(--font-geist-sans)] sm:flex ">
     <div className="mb-10 w-full bg-red h-full sm:w-4/5 sm:mb-0">
     <h1 className="text-ds font-bold text-dk">Desserts</h1>
     <Meals />
     </div>

     <CartModal />
    </div>
    <ConfirmCart />
    </CartContextProvider>
  );
}
