'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import CartSvg from "../SVGS/cart";
import DecrementSvg from "../SVGS/decrement";
import IncrementSvg from "../SVGS/increment";

const Meals = () => {
    const [data, setData] = useState<{image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}[]>([]);
    const [cart, setCart] = useState<{}[]>([])
    const [select, setSelect] = useState<string[]>(['notSelect', '', 'notSelect','notSelect','notSelect','notSelect','notSelect' ,'notSelect', 'notSelect'])
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
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

      const addToCartHandler = (data: any, i: number) => {
        setSelect((prev) => {
          prev[i] = 'select'
          return prev
        })
        console.log(select)
        // let arr: string[] = [...select]
        // select.forEach((str, j, arr) => {
        //   if(i === j)
        //    arr[j] = 'select'
        //   setSelect(arr)
        //   console.log(select)
        // });
      }

      // const initial = <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 bg-white text-rd border border-rd rounded-full" onClick={() => {addToCartHandler(data)}}>
      // <CartSvg />
      // <p>Add to cart</p>
      // </button>

      // const addCart = <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 border border-rd rounded-full bg-rd" onClick={() => {addToCartHandler(data)}}>
      // <DecrementSvg />
      // <p className="font-light">1</p>
      // <IncrementSvg />
      // </button>
    
      if (loading) return <h1 className="text-dk">Loading</h1>;
      if (error) return <p>Error: {error}</p>;
  
    return <div className="grid grid-cols-3 gap-4">
      {data.map((data, i) => <div className="w-full text-white flex flex-col font-bold" key={i}>
        <div className="relative w-full">
        <div className="w-full height-64 bg-black overflow-hidden border-2 border-rd rounded-lg">
          <Image alt='image' src={data.image.desktop} width={200} height={200} style={{height: 'auto', width: '100%'}}/>
        </div>
        {select[i] === 'select' ? <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 border border-rd rounded-full bg-rd" onClick={() => {addToCartHandler(data, i)}}>
      <DecrementSvg />
      <p className="font-light">1</p>
      <IncrementSvg />
      </button> :
      <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 bg-white text-rd border border-rd rounded-full" onClick={() => {addToCartHandler(data, i)}}>
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