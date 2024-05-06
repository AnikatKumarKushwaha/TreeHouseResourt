import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Checkbox, FormControlLabel, Paper } from "@mui/material";

import { changeBooking, fetchBooking } from "../redux/Slices/bookingSlice";
import { FaHotel } from "react-icons/fa";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../utils/helpers";

import LoadingSpinner from "../ui/LoadingSpinner";
import { Flag } from "../ui/Flag";
import { fetchSettings } from "../redux/Slices/settingSlice";

////////////////////////////////////////////Function Start////////////////////////////////////////////////////
export default function Booking() {
  const { id } = useParams();
  const { singleData, isLoading } = useSelector((state) => state.booking);
  const { data: setting, isLoading: loading } = useSelector(
    (state) => state.setting
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakFast, setAddBreakFast] = useState(false);

  /////////////////////////////////////// Use Effect///////////////////////////////////////////////////////
  useEffect(() => {
    setConfirmedPaid(singleData?.isPaid ?? false);
  }, [singleData.isPaid]);

  useEffect(() => {
    dispatch(fetchBooking(id));
    dispatch(fetchSettings());
  }, [
    dispatch,
    id,
    singleData.isPaid,
    singleData.hasBreakfast,
    singleData.status,
  ]);

  const optionalBreakfastPrice = setting.breakfastPrice * singleData.numNights;
  /////////////////////////////////////// Function ///////////////////////////////////////////////////////
  function checkIn() {
    const obj1 = {
      status: "checked-in",
      isPaid: true,
    };
    const obj2 = {
      status: "checked-in",
      isPaid: true,
      hasBreakfast: true,
      extrasPrice: optionalBreakfastPrice,
      totalPrice: singleData.totalPrice + optionalBreakfastPrice,
    };

    if (!confirmPaid) return;
    if (!addBreakFast) {
      dispatch(changeBooking({ id: singleData.id, newData: obj1 }));
    } else {
      dispatch(changeBooking({ id: singleData.id, newData: obj2 }));
    }
  }

  function checkOut() {
    dispatch(
      changeBooking({ id: singleData.id, newData: { status: "checked-out" } })
    );
  }

  /////////////////////////////////////// Loading Spinner///////////////////////////////////////////////////////
  if (isLoading && loading) {
    return <LoadingSpinner />;
  } else if (singleData.cabins) {
    /////////////////////////////////////// Main Contain///////////////////////////////////////////////////////
    return (
      <div>
        {/* *************heading********************* */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className=" text-3xl font-semibold text-slate-700 ">
              Booking #{singleData.id}
            </div>
            <div
              className={`${
                singleData.status === "unconfirmed"
                  ? " bg-cyan-400"
                  : singleData.status === "checked-in"
                  ? " bg-green-300"
                  : "bg-red-300"
              } rounded-3xl px-2 py-1 text-sm`}
            >
              {singleData.status}
            </div>
          </div>
          <Button onClick={() => navigate("/bookings")}>&larr;Back</Button>
        </div>

        {/* **********body************* */}
        <Paper className="mt-5">
          {/* **********bodyHeader************* */}
          <div
            className=" bg-violet-500 text-blue-50 px-10 py-2 font-semibold"
            style={{ borderRadius: "inherit" }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <FaHotel />
                <p>
                  {singleData.numNights} nights in Cabin{"  "}
                  <span>{singleData.cabins.name}</span>
                </p>
              </div>
              <div>
                <p>
                  {format(new Date(singleData.startDate), "EEE, MMM dd yyyy")} (
                  {isToday(new Date(singleData.startDate))
                    ? "Today"
                    : formatDistanceFromNow(singleData.startDate)}
                  ) &mdash;{" "}
                  {format(new Date(singleData.endDate), "EEE, MMM dd yyyy")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 py-5 px-5">
            {/* 1st Paragraph */}
            <div className="flex gap-2 text-sm text-slate-500">
              {singleData.guests.countryFlag && (
                <Flag
                  src={singleData.guests.countryFlag}
                  alt={`Flag of ${singleData.country}`}
                />
              )}

              <p className=" text-slate-800 font-semibold">
                {singleData.guests.fullName}{" "}
                {singleData.numGuests > 1
                  ? `+ ${singleData.numGuests - 1} guests`
                  : ""}
              </p>
              <span>&bull;</span>
              <p>{singleData.guests.email}</p>
              <span>&bull;</span>
              <p>National ID {singleData.guests.nationalID}</p>
            </div>

            {/* second paragraph*/}
            <div>
              <div className=" text-slate-800 font-semibold text-sm">
                Breakfast included?{" "}
                <span>{singleData.hasBreakfast ? "Yes" : "No"}</span>
              </div>
            </div>

            {/* third paragraph*/}
            <div className=" bg-yellow-100 text-yellow-800 px-6 py-4 flex justify-between items-center rounded-sm text-sm">
              <div>
                Total Price {formatCurrency(singleData.totalPrice)}{" "}
                {singleData.hasBreakfast &&
                  ` (${formatCurrency(
                    singleData.cabinPrice
                  )} cabin + ${formatCurrency(
                    singleData.extrasPrice
                  )} breakfast)`}
              </div>
              <div className=" text-yellow-800 font-semibold">
                {singleData.isPaid ? "Paid" : "Will pay at property"}
              </div>
            </div>
            {/* forth paragraph*/}
            <div className=" text-sm text-slate-500 text-end">
              Booked{" "}
              {format(new Date(singleData.created_at), "EEE, MMM dd yyyy, p")}
            </div>
          </div>
        </Paper>

        {/* /////////////////////check box//////////////////// */}
        {singleData.status !== "checked-out" && !singleData.hasBreakfast && (
          <Paper className="mt-8 px-4 py-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={addBreakFast}
                  onChange={() => {
                    setAddBreakFast(!addBreakFast);
                    setConfirmedPaid(false);
                  }}
                  id="breakfast"
                />
              }
              label={`Want to Add breakfast for ${optionalBreakfastPrice}?`}
            />
          </Paper>
        )}

        {singleData.status !== "checked-out" && (
          <Paper className="mt-8 px-4 py-2">
            <FormControlLabel
              control={
                <Checkbox
                  disabled={confirmPaid}
                  checked={confirmPaid}
                  onChange={() => setConfirmedPaid(!confirmPaid)}
                  id="confirm"
                />
              }
              label={`I confirm that ${
                singleData.guests.fullName
              } has paid the total amount of${" "}
          ${
            !addBreakFast
              ? formatCurrency(singleData.totalPrice)
              : `${formatCurrency(
                  singleData.totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(singleData.totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`
          }`}
            />
          </Paper>
        )}
        {/* ************************** Submit Button ****************************************/}

        <div className="flex justify-end mt-8">
          <div className="flex gap-2">
            {singleData.status !== "checked-out" && (
              <div>
                {singleData.status !== "checked-in" ? (
                  <Button
                    variant="contained"
                    disabled={!confirmPaid}
                    onClick={checkIn}
                  >
                    check in
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disabled={!confirmPaid}
                    onClick={checkOut}
                  >
                    check out
                  </Button>
                )}
              </div>
            )}
            <Button variant="outlined" onClick={() => navigate("/bookings")}>
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
