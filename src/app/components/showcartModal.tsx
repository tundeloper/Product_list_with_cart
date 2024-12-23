import React, { useContext } from "react";
import { CartContext } from "../store/context";
import Cart from "./cart";
import NoCart from "./noCart";

const CartModal: React.FC = () => {
  const context = useContext(CartContext);

  // Calculate the total quantity of items in the cart
  const totalQty = context.cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="w-full bg-white h-auto sm:w-2/5 p-5 mr-8 mb-4">
      <h1 className="text-ds font-bold text-rd">Your cart ({totalQty})</h1>

      {/* Conditionally render the Cart or NoCart component */}
      {context.cart.length > 0 ? <Cart /> : <NoCart />}
    </div>
  );
};

export default CartModal;