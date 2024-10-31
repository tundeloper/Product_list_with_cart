'use client'
import React from "react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CartSvg from "../SVGS/cart";
import DecrementSvg from "../SVGS/decrement";
import IncrementSvg from "../SVGS/increment";
import { CartContext } from "../store/context";
import Loading from "./loading";

const Meals : React.FC = () => {
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);
    const context = useContext(CartContext);
    const cart = context.cart;
    const w: number = typeof window !== "undefined" ? window.innerWidth : 1024; // Ensure window is defined for server-side rendering

    useEffect(() => {
        // Make the GET request to your Next.js API route
        axios.get('/api')
          .then((response) => {
            // console.log(response.data.data)
            context.fetchData(response.data.data);  // Set the response data
            setLoading(false);       // Stop loading state
          })
          .catch((err) => {
            setError(err.message);   // Handle errors
            setLoading(false);       // Stop loading state
          });
      }, []);

      if (loading) return <Loading />;
      if (error) return <p>Error: {error}</p>;

    return <div className="grid-cols-1 sm:grid sm:grid-cols-3 sm:gap-4">
      {context.data.map((meals, i) => {
        const cartItemIndex = cart.findIndex((cartItem) => cartItem.name === meals.name);
        const quantity = cartItemIndex > -1 ? cart[cartItemIndex].qty : 0;
        
        return <div className="mb-4 w-full sm:mb-0 text-white flex flex-col font-bold" key={i}>
        <div className="relative w-full">
        <div className="w-full height-64 bg-black overflow-hidden border-2 border-rd rounded-lg" style={{border: (context.select[i] === 'select') ? '.2rem solid #ca3c18' : 'none'}}>
          <Image alt='image' src={w > 640 ? meals.image.desktop: meals.image.mobile} width={200} height={200} style={{height: 'auto', width: '100%'}}/>
        </div>
        {context.select[i] === 'select' ? <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 border border-rd rounded-full bg-rd">
      <DecrementSvg handleClick={() => {context.minusCartQty({...meals, qty: 0}, i)}}/>
      <p className="font-light">{quantity}</p>
      <IncrementSvg handleClick={() => {context.addCartQty({...meals, qty: 0}, i)}}/>
      </button> :
      <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 bg-white text-rd border border-rd rounded-full" onClick={() => {context.addToCart({...meals, qty:0}, i)}}>
      <CartSvg />
      <p>Add to cart</p>
      </button>
      }
        
        </div>

        <div className="mt-5">
          <p className="text-lightdk font-light">{meals.category}</p>
          <p className="text-black">{meals.name}</p>
          <p className="text-rd">${meals.price.toFixed(2)}</p>
        </div>
        </div>
      } )}
    </div>

}

export default Meals 