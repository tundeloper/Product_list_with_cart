import React from "react";
import EmptyCart from "../SVGS/empty";

const NoCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      {/* Empty cart illustration */}
      <EmptyCart aria-label="Empty cart illustration" />

      {/* Informative message */}
      <p className="text-sm font-light text-lightdk">
        Your added items will appear here
      </p>
    </div>
  );
};

export default NoCart;