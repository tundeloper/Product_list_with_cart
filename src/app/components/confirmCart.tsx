"use client";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../store/context";
import IconConfirm from "../SVGS/iconConfirmed";
import Image from "next/image";

const ConfirmCart: React.FC = () => {
  const context = useContext(CartContext);

  // Calculate the total price of items in the cart
  const total = context.cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // State to track window width
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Effect to update window width on resize
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Function to calculate price * quantity
  const priceQty = (data: { price: number; qty: number }): number => {
    return data.price * data.qty;
  };

  // Only render the modal if `isSubmit` is true
  if (context.isSubmit) {
    return (
      <div
        className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-80 z-[999] text-black"
        onClick={() => {
          context.submitHandler(false);
        }}
      >
        <div className="bg-white w-[25rem] rounded-[2%]">
          <div className="p-3">
            <IconConfirm />
            <h1 className="text-[2rem] text-dk font-bold mt-2">Order Confirmed</h1>
            <p className="text-grey">We hope you enjoy your food!</p>
          </div>
          <div className="bg-lrd text-black p-8 pb-0">
            {/* Render cart items */}
            {context.cart.map((cart, i) => (
              <div className="flex justify-between items-center mb-5 mt-[1rem]" key={i}>
                <div className="flex justify-between gap-[.5rem]">
                  <Image
                    alt="product image"
                    src={windowWidth > 640 ? cart.image.desktop : cart.image.mobile}
                    width={200}
                    height={200}
                    style={{ height: "auto", width: "3rem" }}
                  />
                  <div>
                    <div>{cart.name}</div>
                    <div className="flex gap-2">
                      <div className="text-rd font-bold">{cart.qty}x</div>
                      <div className="font-light text-rd">@{cart.price}</div>
                    </div>
                  </div>
                </div>
                <div>{priceQty(cart).toFixed(2)}</div>
              </div>
            ))}
            {/* Total price */}
            <div className="flex justify-between py-4 border-t border-white">
              <p>Order Total</p>
              <p className="font-bold text-[1.3rem]">{total.toFixed(2)}</p>
            </div>
          </div>
          <div className="m-3">
            {/* Button to start a new order */}
            <button
              className="bg-red-500 text-white flex justify-center items-center w-full p-3 rounded-full text-center mt-4"
              onClick={() => {
                context.completeOrder();
              }}
            >
              Start New Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Return an empty fragment when the modal is not needed
  return <></>;
};

export default ConfirmCart;