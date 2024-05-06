import React from "react";
import Stat from "./Stat";
import { FaBriefcase } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({ booking, cabin }) {
  //1.
  const numBookings = booking.length;
  //2.
  const sales = booking.reduce((acc, cur) => acc + cur.totalPrice, 0);
  //3.
  const stays = booking.filter((item) => item.status === "checked-in");
  const confirmStays = stays.length;
  //4.
  const numDays = booking.reduce(
    (acc, cur) => cur.status === "checked-in" && acc + cur.numNights,
    0
  );

  const occupation =
    stays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabin.length);

  return (
    <div className="mt-5 flex justify-around items-center gap-2">
      <Stat
        title="Booking"
        color="#7dd3fc"
        icon={<FaBriefcase color="#155e75" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="#86efac"
        icon={<MdOutlineAttachMoney color="#166534" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="#a5b4fc"
        icon={<HiOutlineCalendarDays color="#5b21b6" />}
        value={confirmStays}
      />
      <Stat
        title="Ocupation rate"
        color="#fef08a"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </div>
  );
}
