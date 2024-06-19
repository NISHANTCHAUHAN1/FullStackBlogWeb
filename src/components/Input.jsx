import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full text-textColor text-sm">
      {label && (
        <label
          className="inline-block mb-2 text-md ml-1 font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        className={`px-3 py-2 rounded-lg outline-none duration-200 border bg-transparent w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
