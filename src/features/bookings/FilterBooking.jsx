import { Paper } from "@mui/material";
import React from "react";
import { useSearchParams } from "react-router-dom";

const buttonData = [
  { label: "All", value: "all" },
  { label: "Checked Out", value: "checked-out" },
  { label: "Checked In", value: "checked-in" },
  { label: "Unconfirmed", value: "unconfirmed" },
];

export default function FilterBooking() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value) {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  }
  const activeButton = searchParams.get("status");
  return (
    <Paper className="flex rounded-md items-center text-sm text-slate-700">
      {buttonData.map((button, index) => (
        <button
          key={index}
          className={`px-3 py-2 rounded-md transition-all duration-300 ${
            button.value === activeButton
              ? "bg-blue-800 text-blue-50"
              : "hover:bg-blue-800 hover:text-blue-50"
          }`}
          onClick={() => handleClick(button.value)}
        >
          {button.label}
        </button>
      ))}
    </Paper>
  );
}
