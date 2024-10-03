'use client'
import { CartContext } from "../api/store/context";
import CarbonNeutral from "../SVGS/carbonNeutral";
import RemoveItem from "../SVGS/removeItem";
import { useContext, useEffect, useState } from "react";

const Cart : React.FC = () => {
    const context = useContext(CartContext)
    const total = context.cart.reduce((total, item) =>total + (item.price * item.qty), 0)

    return <div className="flex flex-col font-bold">
        {context.cart.map((val, i) => {
            return <div className="flex justify-between items-center mb-2" key={val.name}>
                <div>
                    <p className="text-black">{val.name}</p>
                    <p className="text-black"><span className="text-rd">{val.qty}x</span> <span className="font-light text-rd ml-2">@{val.price.toFixed(2)}</span> <span className="font-light text-rd ml-2">${val.qty * val.price}</span></p>
                </div>
                <div><RemoveItem /></div>
            </div>
        })}
        {/* add border top */}
        <div className="flex items-center justify-between py-5"> 
            <p className="font-light text-dk">Order Total</p>
            <p className="font-bold text-7 text-dk">${total.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-center text-dk py-5 bg-lrd gap-2">
            <CarbonNeutral />
            <p className="font-light">This is a <span className="font-bold">carbon-neutral</span> delivery</p>
        </div>
        <button className="flex text-white bg-rd mt-4 p-3 text-center rounded-70">Confirm Order</button>
    </div>
    
}

export default Cart