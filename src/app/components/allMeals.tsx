'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import CartSvg from "../SVGS/cart";
import DecrementSvg from "../SVGS/decrement";
import IncrementSvg from "../SVGS/increment";

type dataType = {
  image: {thumbnail: string, mobile: string, tablet: string, desktop: string},
  name: string,
  price: number,
  category: string,
  qty: number,
}

interface MealsProps {
  sendCartToParent: (data: dataType[]) => void
}

const Meals : React.FC<MealsProps> = ({sendCartToParent}) => {
    const [data, setData] = useState<{image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}[]>([]);
    const [cart, setCart] = useState<dataType[]>([])
    const [select, setSelect] = useState<string[]>(['notSelect', 'notSelect', 'notSelect','notSelect','notSelect','notSelect','notSelect' ,'notSelect', 'notSelect'])
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

      useEffect(() => {
        sendCartToParent(cart)
      }, [cart])

      const addToCartHandler = (data: {image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}, i: number) => {
        setSelect((prev) => {
          const newSelect = [...prev]; // Create a copy of the previous state
          newSelect[i] = 'select'; // Modify the copied array
          return newSelect; // Return the new array to update the state
        });

        const index = cart.findIndex((val) => val.name === data.name)
        setCart((prev) => {
        const allCarts = [...prev]
        if(index === -1 ) {
          allCarts.push({...data, qty: 1})
        } 
        else {
          const cart = allCarts[index]
          const modify = {
            ...cart,
            qty: 1
          }
          allCarts[index] = modify
        }  
        return allCarts
        })        
      }

      // add cart
      const addCart = (data: {image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}, i: number) => {
        const index = cart.findIndex(cart => cart.name === data.name)
        setCart((prev) => {
          const allcarts = [...prev]
          if(index > -1) {
            const modify = {
              ...allcarts[index],
              qty: allcarts[index].qty + 1
            }
            allcarts[index] = modify
          }
          return allcarts
        })

      }

      // minus cart
      const minusCart = (data: {image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}, i: number) => {
        console.log('minus')
        const index = cart.findIndex(cart => cart.name === data.name)
        setCart((prev) => {
          const allcarts = [...prev]
          if(index > -1) {
            const modify = {
              ...allcarts[index],
              qty: allcarts[index].qty - 1
            }
            allcarts[index] = modify
          }
          //check if qty === 0
          if(allcarts[index].qty === 0) {
            allcarts.splice(index, 1);  // Remove 1 item at position `index`
            setSelect((prev) => {
              const newSelect = [...prev]
              newSelect[i] = 'notSelect'
              return newSelect
            })
          }

          return allcarts
        })
      }

      if (loading) return <h1 className="text-dk">Loading</h1>;
      if (error) return <p>Error: {error}</p>;



    return <div className="grid grid-cols-3 gap-4">
      {data.map((data, i) => <div className="w-full text-white flex flex-col font-bold" key={i}>
        <div className="relative w-full">
        <div className="w-full height-64 bg-black overflow-hidden border-2 border-rd rounded-lg" style={{border: (select[i] === 'select') ? '.2rem solid #ca3c18' : 'none'}}>
          <Image alt='image' src={data.image.desktop} width={200} height={200} style={{height: 'auto', width: '100%'}}/>
        </div>
        {select[i] === 'select' ? <button className="flex items-center justify-center justify-between w-[9rem] absolute bottom-[-1rem] right-1/2 translate-x-1/2 z-[10]  p-3 border border-rd rounded-full bg-rd">
      <DecrementSvg handleClick={() => {minusCart(data, i)}}/>
      <p className="font-light">{cart[cart.findIndex(cart => cart.name === data.name)].qty}</p>
      <IncrementSvg handleClick={() => {addCart(data, i)}}/>
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