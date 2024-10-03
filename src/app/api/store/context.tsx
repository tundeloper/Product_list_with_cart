
import React, { ReactNode, useState } from "react";
type dataType = {
    image: {thumbnail: string, mobile: string, tablet: string, desktop: string},
    name: string,
    price: number,
    category: string,
    qty: number,
  }

  type dataObject = {
    cart: dataType[],
    select: string[],
    isSubmit: boolean,
    addToCart: Function,
    removeFromCart: Function,
    minusCartQty: Function,
    addCartQty: Function,
    submitHnadler: Function,
    completeOrder: Function,
  }

const initialState: dataObject = {
    cart: [],
    select: ['notSelect', 'notSelect', 'notSelect','notSelect','notSelect','notSelect','notSelect' ,'notSelect', 'notSelect'],
    isSubmit: false,
    addToCart: (val: dataType[], i: number) => {},
    removeFromCart: () => {},
    minusCartQty: (val:dataType, i:number) => {},
    addCartQty: (val:dataType, i:number) => {},
    submitHnadler: (prev: boolean) => {},
    completeOrder: () => {}
}

export const CartContext = React.createContext(initialState); // default value 

const CartContextProvider : React.FC<{children: ReactNode}> = ({children}) => {


  const [cart, setCart] = useState<dataType[]>([]);
  const [isSubmit, setisSubmit] = useState<boolean>(false);
  const [select, setSelect] = useState(['notSelect', 'notSelect', 'notSelect','notSelect','notSelect','notSelect','notSelect' ,'notSelect', 'notSelect']);

  const addToCart = (val: dataType, i: number) => {
    setSelect((prev) => {
      const newSelect = [...prev]; // Create a copy of the previous state
      newSelect[i] = 'select'; // Modify the copied array
      return newSelect; // Return the new array to update the state
    });
    
    const index = cart.findIndex((cart : dataType) => cart.name === val.name)
    setCart((prev) => {
    const allCarts = [...prev]
    if(index === -1 ) {
      cart.push({...val, qty: 1})
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
  };

  const removeFromCart = (val: dataType, i: number) => {
    setCart((prev) => {
      const allCarts = [...prev]
      allCarts.splice(i, 1)
      return allCarts
    })
  }

  const addCartQty = (val: dataType, i: number) => {
    const index = cart.findIndex(cart => cart.name === val.name)
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

  const minusCartQty = (val: {image: {thumbnail: string, mobile: string, tablet: '', desktop: ''}, name: string, price: number, category: string}, i: number) => {
    const index = cart.findIndex(cart => cart.name === val.name)
    setCart((prev) => {
      const allcarts = [...prev]
      if(index > -1) {
        const modify = {
          ...allcarts[index],
          qty: allcarts[index].qty - 1
        }
        allcarts[index] = modify
      }

      //check if qty is 0
      if(allcarts[index].qty === 0) {
        allcarts.splice(index, 1);  // Remove 1 item at position `index`
        setSelect((prev) => {
          const notSelect = [...prev]
          notSelect[i] = 'notSelect' //remove select class 
          return notSelect
        })
      }

      return allcarts
    })
  }

  const submitHnadler = (val : boolean) => {
    setisSubmit(val)
  }

  const completeOrder = () => {
    setCart([])
    setSelect(['notSelect', 'notSelect', 'notSelect','notSelect','notSelect','notSelect','notSelect' ,'notSelect', 'notSelect'])
  }

  const cartValue = {
    cart,
    select: select,
    isSubmit,
    addToCart: addToCart,
    removeFromCart,
    minusCartQty,
    addCartQty,
    submitHnadler,
    completeOrder,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
