import React, { ReactNode, useState } from "react";

// Define a type for the product data
type DataType = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  price: number;
  category: string;
  qty: number;
};

// Define a type for the context data
type DataObject = {
  cart: DataType[];
  select: string[];
  isSubmit: boolean;
  addToCart: (val: DataType, i: number) => void; // Specify the type of parameters
  removeFromCart: (val: DataType, i: number) => void; // Specify the type of parameters
  minusCartQty: (val: DataType, i: number) => void; // Specify the type of parameters
  addCartQty: (val: DataType, i: number) => void; // Specify the type of parameters
  submitHandler: (val: boolean) => void; // Specify the type of parameters
  completeOrder: () => void; // Specify return type as void
};

// Define the initial state
const initialState: DataObject = {
  cart: [],
  select: Array(9).fill("notSelect"),
  isSubmit: false,
  addToCart: () => {},
  removeFromCart: () => {},
  minusCartQty: () => {},
  addCartQty: () => {},
  submitHandler: () => {},
  completeOrder: () => {},
};

// Create the CartContext with the initial state
export const CartContext = React.createContext<DataObject>(initialState);

const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<DataType[]>([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [select, setSelect] = useState<string[]>(Array(9).fill("notSelect"));

  const addToCart = (val: DataType, i: number) => {
    setSelect((prev) => {
      const newSelect = [...prev];
      newSelect[i] = "select";
      return newSelect;
    });

    setCart((prev) => {
      const index = prev.findIndex((cartItem) => cartItem.name === val.name);
      const allCarts = [...prev];

      if (index === -1) {
        // If the item is not in the cart, add it
        allCarts.push({ ...val, qty: 1 });
      } else {
        // If the item is already in the cart, increase the quantity
        const modify = {
          ...allCarts[index],
          qty: allCarts[index].qty + 1, // Increment qty
        };
        allCarts[index] = modify;
      }

      return allCarts;
    });
  };

  const removeFromCart = (val: DataType, i: number) => {
    setCart((prev) => {
      const allCarts = [...prev];
      const index = allCarts.findIndex((cartItem) => cartItem.name === val.name);
      if (index > -1) {
        allCarts.splice(index, 1); // Remove the item from the cart
      }
      return allCarts;
    });
    setSelect((prev) => {
      const newSelect = [...prev];
      newSelect[i] = "notSelect"; // Update select state
      return newSelect;
    });
  };

  const addCartQty = (val: DataType, i: number) => {
    setCart((prev) => {
      const index = prev.findIndex((cartItem) => cartItem.name === val.name);
      const allCarts = [...prev];

      if (index > -1) {
        const modify = {
          ...allCarts[index],
          qty: allCarts[index].qty + 1,
        };
        allCarts[index] = modify;
      }

      return allCarts;
    });
  };

  const minusCartQty = (val: DataType, i: number) => {
    setCart((prev) => {
      const index = prev.findIndex((cartItem) => cartItem.name === val.name);
      const allCarts = [...prev];

      if (index > -1) {
        const modify = {
          ...allCarts[index],
          qty: allCarts[index].qty - 1,
        };
        allCarts[index] = modify;

        // Check if qty is 0
        if (allCarts[index].qty === 0) {
          allCarts.splice(index, 1); // Remove the item from the cart
          setSelect((prev) => {
            const newSelect = [...prev];
            newSelect[i] = "notSelect"; // Remove select class
            return newSelect;
          });
        }
      }

      return allCarts;
    });
  };

  const submitHandler = (val: boolean) => {
    setIsSubmit(val);
  };

  const completeOrder = () => {
    setCart([]);
    setSelect(Array(9).fill("notSelect")); // Reset selections
  };

  const cartValue: DataObject = {
    cart,
    select,
    isSubmit,
    addToCart,
    removeFromCart,
    minusCartQty,
    addCartQty,
    submitHandler,
    completeOrder,
  };

  return <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;