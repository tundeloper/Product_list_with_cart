import { useContext } from "react"
import { CartContext } from "../store/context"
import Cart from "./cart"
import NoCart from "./noCart"

const CartModal = () => {
    const contex = useContext(CartContext)

    return <div className="bg-white h-auto w-2/5 p-5 mr-8 mb-4">
    <h1 className="text-ds font-bold text-rd">Your cart ({contex.cart.length})</h1>
    {contex.cart.length > 0 ? <Cart /> : <NoCart />}
    </div>
}

export default CartModal