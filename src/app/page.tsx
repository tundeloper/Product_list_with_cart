'use client'
import { useState } from "react";
import Meals from "./components/allMeals";
import Cart from './components/cart';
import NoCart from "./components/noCart";

export default function Home() {
  type dataType = {
    image: {thumbnail: string, mobile: string, tablet: string, desktop: string},
    name: string,
    price: number,
    category: string,
    qty: number,
  }

  const [cart, setCart] = useState<dataType[]>([])

  const receiveCartFromParen = (data: dataType[]) => {
    setCart([...data])
  }

  return (
    <div className="flex items-start bg-background p-8 pb-20 gap-10 sm:p-10 font-[family-name:var(--font-geist-sans)]">
     <div className="bg-red h-full w-4/5">
     <h1 className="text-ds font-bold text-dk">Desserts</h1>
     <Meals sendCartToParent={receiveCartFromParen} />

     </div>
     <div className="bg-white h-auto w-2/5 p-5 mr-8 mb-4">
    <h1 className="text-ds font-bold text-rd">Your cart ({cart.length})</h1>
    {cart.length > 0 ? <Cart cart={cart} /> : <NoCart />}
    </div>
    </div>
  );
}
