'use client'
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CartSvg from "../SVGS/cart";
import DecrementSvg from "../SVGS/decrement";
import IncrementSvg from "../SVGS/increment";
import { CartContext } from "../api/store/context";

// Define a type for the data being fetched
type dataType = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  price: number;
  category: string;
};

const Meals: React.FC = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Improved error typing
  const context = useContext(CartContext);
  const cart = context.cart;
  const w: number = typeof window !== "undefined" ? window.innerWidth : 1024; // Ensure window is defined for server-side rendering

  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1 className="text-dk">Loading...</h1>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid-cols-1 sm:grid sm:grid-cols-3 sm:gap-4">
      {data.map((meal, i) => {
        const isSelected = context.select[i] === "select";
        const cartItemIndex = cart.findIndex((cartItem) => cartItem.name === meal.name);
        const quantity = cartItemIndex > -1 ? cart[cartItemIndex].qty : 0;

        return (
          <div className="mb-4 w-full sm:mb-0 text-white flex flex-col font-bold" key={i}>
            <div className="relative w-full">
              <div
                className={`w-full h-64 bg-black overflow-hidden border-rd rounded-lg ${
                  isSelected ? "border-[.2rem] border-rd" : ""
                }`}
              >
                <Image
                  alt="meal image"
                  src={w > 640 ? meal.image.desktop : meal.image.mobile}
                  width={200}
                  height={200}
                  style={{ height: "auto", width: "100%" }}
                />
              </div>

              {isSelected ? (
                <button
                  className="flex items-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10] p-3 border border-rd rounded-full bg-rd"
                >
                  <DecrementSvg handleClick={() => context.minusCartQty({ ...meal, qty: 0 }, i)} />
                  <p className="font-light">{quantity}</p>
                  <IncrementSvg handleClick={() => context.addCartQty({ ...meal, qty: 0 }, i)} />
                </button>
              ) : (
                <button
                  className="flex items-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10] p-3 bg-white text-rd border border-rd rounded-full"
                  onClick={() => context.addToCart({ ...meal, qty: 0 }, i)}
                >
                  <CartSvg />
                  <p>Add to cart</p>
                </button>
              )}
            </div>

            <div className="mt-5">
              <p className="text-lightdk font-light">{meal.category}</p>
              <p className="text-black">{meal.name}</p>
              <p className="text-rd">${meal.price.toFixed(2)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Meals;