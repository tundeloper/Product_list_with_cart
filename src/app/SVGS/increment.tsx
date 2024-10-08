import React from "react";

const IncrementSvg: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <button
      className="flex items-center justify-between border px-2 border-white rounded-full h-[26px] w-[26px]"
      onClick={handleClick}
      aria-label="Increment quantity" // Accessibility improvement
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="none"
        viewBox="0 0 10 10"
        aria-hidden="true" // Screen readers can ignore the SVG
      >
        <path
          fill="#fff"
          d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
        />
      </svg>
    </button>
  );
};

export default IncrementSvg;