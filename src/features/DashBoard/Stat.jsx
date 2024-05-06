import { Paper } from "@mui/material";
import React from "react";

export default function Stat({ icon, title, color, value }) {
  return (
    <Paper className="bg-red-200 p-3 flex justify-between gap-2 items-center">
      <div style={{ backgroundColor: color }} className="p-5 rounded-full">
        {icon}
      </div>
      <div>
        <div className="text-sm">{title}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </Paper>
  );
}
