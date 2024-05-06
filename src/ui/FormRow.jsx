import React from "react";

export default function FormRow({ children, label, error, classname }) {
  return (
    <div
      className={`grid grid-cols-[20rem_1fr_1.2fr] items-center gap-3 border-b border-stone-300   last:border-b-0 px-10 py-5 hover:bg-stone-100`}
    >
      {label && (
        <label
          className=" font-medium text-stone-700"
          htmlFor={children.props.id}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="text-sm font-medium text-red-700">{error}</span>
      )}
    </div>
  );
}
