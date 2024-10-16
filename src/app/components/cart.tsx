'use client'
import React from "react";
import { useContext } from "react";
import { CartContext } from "../store/context";
import CarbonNeutral from "../SVGS/carbonNeutral";
import RemoveItem from "../SVGS/removeItem";

const Cart: React.FC = () => {
  const context = useContext(CartContext);

  // Calculate the total price
  const total = context.cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const removeHandler = () => {
    console.log('clicked')
  }

  return (
    <div className="flex flex-col font-bold">
      {/* Iterate over cart items */}
      {context.cart.map((val, i) => (
        <div
          className="flex justify-between items-center mb-2 border-b border-lrd py-2"
          key={i}
        >
          <div>
            <p className="text-black">{val.name}</p>
            <p className="text-black">
              <span className="text-rd">{val.qty}x</span>{" "}
              <span className="font-light text-rd ml-2">
                @{val.price.toFixed(2)}
              </span>{" "}
              <span className="font-light text-rd ml-2">
                ${val.qty * val.price}
              </span>
            </p>
          </div>
          {/* Add functionality for RemoveItem if needed */}
          <div>
            <RemoveItem removeItem={() => {context.removeFromCart(val, i)}} />
          </div>
        </div>
      ))}

      {/* Order total section */}
      <div className="flex items-center justify-between py-5">
        <p className="font-light text-dk">Order Total</p>
        <p className="font-bold text-7 text-dk">${total.toFixed(2)}</p>
      </div>

      {/* Carbon neutral message */}
      <div className="flex items-center justify-center text-dk py-5 bg-lrd gap-2">
        <CarbonNeutral />
        <p className="font-light">
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </p>
      </div>

      {/* Confirm Order button */}
      <button
        className="bg-red-500 text-white flex justify-center items-center w-full p-3 rounded-full text-center mt-4 font-bold"
        onClick={() => {
          context.submitHandler(true);
        }}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Cart;