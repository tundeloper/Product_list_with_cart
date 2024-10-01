'use client'
import { CartContext } from "../api/store/context";
import RemoveItem from "../SVGS/removeItem";
import NoCart from "./noCart"
import { useContext, useEffect, useState } from "react";

type dataType = {
    image: {thumbnail: string, mobile: string, tablet: string, desktop: string},
    name: string,
    price: number,
    category: string,
    qty: number,
  }
  

const Cart : React.FC = () => {
    const context = useContext(CartContext)

    return <div className="flex flex-col font-bold">
        {context.cart.map((val, i) => {
            return <div className="flex justify-between items-center mb-2" key={val.name}>
                <div>
                    <p className="text-black">{val.name}</p>
                    <p className="text-black"><span className="text-rd">{val.qty}x</span> <span className="font-light text-rd ml-2">@{val.price.toFixed(2)}</span> <span className="font-light text-rd ml-2">${val.qty * val.price}</span></p>
                </div>
                <div><RemoveItem handleClick={() =>{context.cart.splice(i, 1)}}/></div>
            </div>
        })}
    </div>
    
}

export default Cart