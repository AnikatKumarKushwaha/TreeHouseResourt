import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsWithoutFliter } from "../redux/Slices/bookingSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import Stats from "../features/DashBoard/Stats";
import { fetchRooms } from "../redux/Slices/roomSlice";
import SalesChart from "../features/DashBoard/SalesChart";

export default function Dashboard() {
  const { data2, isLoading } = useSelector((state) => state.booking);
  const { data: room, isLoading: isLoading2 } = useSelector(
    (state) => state.room
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookingsWithoutFliter());
    dispatch(fetchRooms());
  }, [dispatch]);

  if (isLoading && isLoading2) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="h-screen text-slate-800 ">
        <div className="text-3xl font-bold">Dashboard</div>
        <Stats booking={data2} cabin={room} />
        <SalesChart bookings={data2} />
      </div>
    );
  }
}
