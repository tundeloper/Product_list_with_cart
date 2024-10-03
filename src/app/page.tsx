'use client';

import React from "react";
import Meals from "./components/allMeals";
import CartContextProvider from "./api/store/context";
import CartModal from "./components/showcartModal";
import ConfirmCart from "./components/confirmCart";

export default function Home() {
  return (
    <CartContextProvider>
      <div className="bg-background p-8 sm:p-10 gap-10 sm:pb-20 sm:flex items-start font-[var(--font-geist-sans)]">
        <div className="w-full sm:w-4/5 mb-10 sm:mb-0">
          <h1 className="text-ds font-bold text-dk">Desserts</h1>
          <Meals />
        </div>

        <CartModal />
      </div>
      <ConfirmCart />
    </CartContextProvider>
  );
}