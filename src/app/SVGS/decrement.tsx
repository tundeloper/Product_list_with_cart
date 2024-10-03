import React from "react";

const DecrementSvg : React.FC<{handleClick: () => void}> = ({handleClick}) => {
    return <div className="flex items-center justify-between border px-2 border-white rounded-full h-[26px] w-[26px]" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
        </div>
}

export default DecrementSvg