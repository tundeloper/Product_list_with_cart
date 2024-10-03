import { useContext, useEffect } from "react"
import { CartContext } from "../api/store/context"
import Cart from "./cart"
import NoCart from "./noCart"

const CartModal = () => {
    const contex = useContext(CartContext)
    const totalQty = contex.cart.reduce((total, item) => total + item.qty, 0 )
    
    return <div className="w-full bg-white h-auto sm:w-2/5 p-5 mr-8 mb-4">
    <h1 className="text-ds font-bold text-rd">Your cart ({totalQty})</h1>
    {contex.cart.length > 0 ? <Cart /> : <NoCart />}
    </div>
}

export default CartModal