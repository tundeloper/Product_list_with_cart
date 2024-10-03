'use client'
import { useContext } from "react"
import { CartContext } from "../api/store/context"
import IconConfirm from "../SVGS/iconConfirmed"

const ConfirmCart : React.FC = ()  => {
    const contex = useContext(CartContext)
    const total = contex.cart.reduce((total, item) => total + (item.price * item.qty), 0)

    return <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-80 z-[999] text-black">
        <div className="bg-white w-[25rem]">
            <div className="p-3">
                <IconConfirm />
                <h1 className="text-[2rem] text-dk font-bold mt-2">Order Confirm</h1>
                <p className="text-grey">we hope you enjoy your food</p>
            </div>
            <div className="bg-black text-white p-8">
            {['','','',].map((cart, i) => {
                return <div className="flex justify-between items-center mb-5 mt-[1rem]" key={i}>
                    <div className="flex justify-between gap-[.5rem]">
                        <div>image</div>
                        <div>
                            <div>qty</div>
                            <div>@price</div>
                        </div>
                    </div>
                    <div>price*qty</div>
                </div>
            })}
            <div className="flex justify-between">
                <p>Order Total</p><p>{total}</p>
            </div>
            </div>
        </div>
    </div>
}

export default ConfirmCart
