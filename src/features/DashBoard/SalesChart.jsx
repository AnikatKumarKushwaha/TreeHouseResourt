import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OLDdata = [
  { label: "Jan 09", totalSales: 480, extrasSales: 320 - 300 },
  { label: "Jan 10", totalSales: 580, extrasSales: 400 - 300 },
  { label: "Jan 11", totalSales: 550, extrasSales: 450 - 300 },
  { label: "Jan 12", totalSales: 600, extrasSales: 350 - 300 },
  { label: "Jan 13", totalSales: 700, extrasSales: 550 - 300 },
  { label: "Jan 14", totalSales: 800, extrasSales: 650 - 500 },
  { label: "Jan 15", totalSales: 700, extrasSales: 700 - 500 },
  { label: "Jan 16", totalSales: 650, extrasSales: 500 - 300 },
  { label: "Jan 17", totalSales: 600, extrasSales: 600 - 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 400 - 300 },
  { label: "Jan 19", totalSales: 700, extrasSales: 600 - 500 },
  { label: "Jan 20", totalSales: 800, extrasSales: 700 - 500 },
  { label: "Jan 21", totalSales: 700, extrasSales: 600 - 500 },
  { label: "Jan 22", totalSales: 810, extrasSales: 550 - 500 },
  { label: "Jan 23", totalSales: 950, extrasSales: 750 - 500 },
  { label: "Jan 24", totalSales: 970, extrasSales: 600 - 500 },
  { label: "Jan 25", totalSales: 900, extrasSales: 700 - 500 },
  { label: "Jan 26", totalSales: 950, extrasSales: 800 - 500 },
  { label: "Jan 27", totalSales: 850, extrasSales: 700 - 500 },
  { label: "Jan 28", totalSales: 900, extrasSales: 600 - 500 },
  { label: "Jan 29", totalSales: 800, extrasSales: 800 - 500 },
  { label: "Jan 30", totalSales: 950, extrasSales: 700 - 500 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 800 - 500 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 900 - 500 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 800 - 500 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 950 - 500 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 1000 - 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 1100 - 500 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 900 - 500 },
];

export default function SalesChart({ bookings }) {
  const numDays = bookings.reduce(
    (acc, cur) => cur.status === "checked-in" && acc + cur.numNights,
    0
  );

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((item) => isSameDay(date, new Date(item.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((item) => isSameDay(date, new Date(item.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="my-10">
      <div className="font-semibold text-xl">Sales</div>
      <div>
        <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data}>
            <XAxis dataKey="label" />
            <YAxis unit="$" />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke="#1e40af"
              fill="#bfdbfe"
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
            <Area
              dataKey="extrasSales"
              type="monotone"
              stroke="#115e59"
              fill="#99f6e4"
              strokeWidth={2}
              name="Extra sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
