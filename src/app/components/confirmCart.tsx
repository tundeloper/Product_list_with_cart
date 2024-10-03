'use client'
import { useContext } from "react"
import { CartContext } from "../api/store/context"
import IconConfirm from "../SVGS/iconConfirmed"
import Image from "next/image"

const ConfirmCart : React.FC = ()  => {
    const contex = useContext(CartContext)
    const total = contex.cart.reduce((total, item) => total + (item.price * item.qty), 0)
    const w = window.innerWidth

    if(contex.isSubmit){
    return <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-80 z-[999] text-black">
        <div className="bg-white w-[25rem]">
            <div className="p-3">
                <IconConfirm />
                <h1 className="text-[2rem] text-dk font-bold mt-2">Order Confirm</h1>
                <p className="text-grey">we hope you enjoy your food</p>
            </div>
            <div className="bg-lrd text-black p-8">
            {contex.cart.map((cart, i) => {
                return <div className="flex justify-between items-center mb-5 mt-[1rem]" key={i}>
                    <div className="flex justify-between gap-[.5rem]">
                        <Image alt='image' src={w > 640 ? cart.image.desktop: cart.image.mobile} width={200} height={200} style={{height: 'auto', width: '3rem'}}/>
                        <div>
                            <div>{cart.name}</div>
                            <div className="flex gap-2">
                                <div className="text-rd font-bold">{cart.qty}x</div>
                                <div className="font-light text-rd">@{cart.price}</div>
                            </div>
                        </div>
                    </div>
                    <div>{cart.qty * +cart.price.toFixed(2)}</div>
                </div>
            })}
            <div className="flex justify-between">
                <p>Order Total</p><p className="font-bold text-[1.5rem]">{total.toFixed(2)}</p>
            </div>
            </div>
            <div className="m-3">
                <button className="bg-rd text-white flex w-full p-3">Start New Order</button>
            </div>
        </div>
    </div>
    } else {
        return <></>
    }
}

export default ConfirmCart
