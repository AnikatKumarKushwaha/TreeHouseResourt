import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, removeBooking } from "../redux/Slices/bookingSlice";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { formatDate } from "../utils/helpers";
import FilterBooking from "../features/bookings/FilterBooking";
import SortByBookings from "../features/bookings/SortByBookings";
import { useNavigate, useSearchParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";

const columns = [
  { id: "cabinName", label: "Cabin", minWidth: 100, align: "center" },
  { id: "guestName", label: "Guest", minWidth: 170, align: "center" },
  { id: "dates", label: "Dates", minWidth: 100, align: "center" },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

function createData(cabinName, guestName, dates, status, amount, action) {
  return { cabinName, guestName, dates, status, amount, action };
}

function Bookings() {
  const { data = {}, isLoading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [pageParams, setPageParams] = useSearchParams();
  let rows = [];
  const activeButton = searchParams.get("status") || "all";
  let sortValue = searchParams.get("sort") || "startDate-desc";
  const pageValue = pageParams.get("page") || "0";
  const rowPageValue = pageParams.get("rowPage") || "10";
  const [page, setPage] = useState(Number(pageValue));
  const [rowsPerPage, setRowsPerPage] = useState(Number(rowPageValue));
  const navigate = useNavigate();

  const handelDelete = (id) => {
    dispatch(removeBooking(id));
    toast.success("Item deleted sucesfully");
  };

  if (data && data.bookings) {
    rows = data.bookings.map((item) =>
      createData(
        item.cabins.name,
        <div>
          <div>{item.guests.fullName}</div>
          <div>{item.guests.email}</div>
        </div>,
        <div className="flex justify-center items-center">
          <div>{formatDate(item.startDate)}</div>
          <div>-----</div>
          <div>{formatDate(item.endDate)}</div>
        </div>,
        <span
          className={` py-1 px-2 rounded-2xl ${
            item.status === "unconfirmed"
              ? " bg-cyan-400"
              : item.status === "checked-in"
              ? "bg-green-400"
              : "bg-rose-300"
          }`}
        >
          {item.status}
        </span>,
        item.totalPrice,
        <div className="flex gap-2 justify-center items-center">
          <IconButton
            sx={{ color: "#94a3b8" }}
            variant="contained"
            onClick={() => navigate(`/bookings/${item.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => handelDelete(item.id)}
            variant="contained"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )
    );
  }

  useEffect(() => {
    let from = Number(pageValue) * Number(rowPageValue);
    let to = from + Number(rowPageValue) - 1;

    dispatch(fetchBookings({ sortValue, activeButton, from, to }));
  }, [dispatch, activeButton, sortValue, pageValue, rowPageValue]);

  /////pagination/////

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const newFrom = newPage * rowsPerPage;
    const newTo = newFrom + rowsPerPage - 1;
    dispatch(
      fetchBookings({ sortValue, activeButton, from: newFrom, to: newTo })
    );
    pageParams.set("page", newPage);
    setPageParams(pageParams);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    pageParams.set("rowPage", +event.target.value);
    setPageParams(pageParams);
  };

  if (!isLoading && data && data.bookings && data.count) {
    return (
      <>
        <div className="flex mb-4 justify-between items-center">
          <div className="font-bold text-3xl ">All Bookings</div>
          <FilterBooking />
          <SortByBookings />
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.count || 0} // Ensure count is truthy
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  } else {
    return <LoadingSpinner />;
  }
}

export default Bookings;
