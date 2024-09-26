import EmptyCart from "../SVGS/empty";

const NoCart = () => {
    return <div className="flex flex-col items-center justify-center p-5">
        <EmptyCart />
        <p className="text-sm font-light text-lightdk">your added items will apear here</p>
   </div>
}

export default NoCart