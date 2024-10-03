'use client'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CartSvg from "../SVGS/cart";
import DecrementSvg from "../SVGS/decrement";
import IncrementSvg from "../SVGS/increment";
import { CartContext } from "../api/store/context";

type dataType = {
  image: {thumbnail: string, mobile: string, tablet: string, desktop: string},
  name: string,
  price: number,
  category: string,
}

const Meals : React.FC = () => {
    const [data, setData] = useState<dataType[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const context = useContext(CartContext);
    const cart = context.cart;
    let w : number = window.innerWidth

    useEffect(() => {
        // Make the GET request to your Next.js API route
        axios.get('/api')
          .then((response) => {
            setData(response.data.data);  // Set the response data
            setLoading(false);       // Stop loading state
          })
          .catch((err) => {
            setError(err.message);   // Handle errors
            setLoading(false);       // Stop loading state
          });
      }, []);

      if (loading) return <h1 className="text-dk">Loading</h1>;
      if (error) return <p>Error: {error}</p>;

    return <div className="grid-cols-1 sm:grid sm:grid-cols-3 sm:gap-4">
      {data.map((data, i) => <div className="mb-4 w-full sm:mb-0 text-white flex flex-col font-bold" key={i}>
        <div className="relative w-full">
        <div className="w-full height-64 bg-black overflow-hidden border-2 border-rd rounded-lg" style={{border: (context.select[i] === 'select') ? '.2rem solid #ca3c18' : 'none'}}>
          <Image alt='image' src={w > 640 ? data.image.desktop: data.image.mobile} width={200} height={200} style={{height: 'auto', width: '100%'}}/>
        </div>
        {context.select[i] === 'select' ? <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 border border-rd rounded-full bg-rd">
      <DecrementSvg handleClick={() => {context.minusCartQty(data, i)}}/>
      <p className="font-light">
        {cart.length > 0 && cart[cart.findIndex(cart => cart.name === data.name)]?.qty}
      </p>
      <IncrementSvg handleClick={() => {context.addCartQty(data, i)}}/>
      </button> :
      <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 bg-white text-rd border border-rd rounded-full" onClick={() => {context.addToCart(data, i)}}>
      <CartSvg />
      <p>Add to cart</p>
      </button>
      }
        
        </div>

        <div className="mt-5">
          <p className="text-lightdk font-light">{data.category}</p>
          <p className="text-black">{data.name}</p>
          <p className="text-rd">${data.price.toFixed(2)}</p>
        </div>
        </div>)}
    </div>

}

export default Meals 