import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  onclick,
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} hover:bg-blue-700 transition duration-200 font-medium`}
      {...props}
      // onClick={onclick}
    >
      {children}
    </button>
  );
}

export default Button;
