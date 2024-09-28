'use client'
import RemoveItem from "../SVGS/removeItem";
import NoCart from "./noCart"
import { useEffect, useState } from "react";

interface CartProps {
    cart: {image: {thumbnail: string, mobile: string, tablet: string, desktop: string}, qty: number, name: string, price: number, category: string}[]
  }

const Cart : React.FC<CartProps> = ({cart}) => {
    

    return <div className="flex flex-col font-bold">
        {cart.map(cart => {
            return <div className="flex justify-between items-center mb-2" key={cart.name}>
                <div>
                    <p className="text-black">{cart.name}</p>
                    <p className="text-black"><span className="text-rd">{cart.qty}x</span> <span className="font-light text-rd ml-2">@{cart.price.toFixed(2)}</span> <span className="font-light text-rd ml-2">${cart.qty * cart.price}</span></p>
                </div>
                <div><RemoveItem /></div>
            </div>
        })}
    </div>
    
}

export default Cart