import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, removeRoom } from "../redux/Slices/roomSlice";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import toast from "react-hot-toast";
import CreateRoomForm from "../features/rooms/CreateRoomForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import UpdateRoomForm from "../features/rooms/UpdateRoomForm";
import Filter from "../features/settings/Filter";
import { useSearchParams } from "react-router-dom";
import SortBySettings from "../features/settings/SortBySettings";
import LoadingSpinner from "../ui/LoadingSpinner";

const columns = [
  { id: "name", label: "Room", minWidth: 100, align: "center" },
  { id: "image", label: "Image", minWidth: 170, align: "center" },
  { id: "maxCapacity", label: "Capacity", minWidth: 100, align: "center" },
  {
    id: "regularPrice",
    label: "Price",
    minWidth: 170,
    align: "center",
  },
  {
    id: "discount",
    label: "Discount",
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

function createData(image, name, maxCapacity, regularPrice, discount, action) {
  return { image, name, maxCapacity, regularPrice, discount, action };
}

function Rooms() {
  const [isOpenAddRoom, setIsOpenAddRoom] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  let rows = [];

  const handelDelete = (id) => {
    dispatch(removeRoom(id));
    toast.success("Item deleted sucesfully");
  };

  ///////filter
  let filteredValue = searchParams.get("discount") || "all";
  let filterCabins;
  if (filteredValue === "all") filterCabins = data;
  if (filteredValue === "no-discount")
    filterCabins = data.filter((ele) => ele.discount === 0);
  if (filteredValue === "with-discount")
    filterCabins = data.filter((ele) => ele.discount > 0);

  //sort
  let sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filterCabins].sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (data) {
    rows = sortedCabins.map((item) =>
      createData(
        <div className="flex justify-center">
          <img src={item.image} alt={item.name} style={{ maxWidth: "100px" }} />
        </div>, // Render image
        item.name,
        item.maxCapacity,
        item.regularPrice,
        item.discount,
        <div className="flex gap-2 justify-center items-center">
          {/* <button>add</button> */}
          <IconButton
            onClick={() => handelDelete(item.id)}
            variant="contained"
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            sx={{ color: "blue" }}
            variant="contained"
            onClick={() => {
              setRoomToEdit(item);
              setEditForm(!editForm);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
      )
    );
  }

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <>
        <div className="flex mb-4 justify-between items-center">
          <div className="font-bold text-3xl ">Rooms</div>
          <Filter />
          <SortBySettings />
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
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
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
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <div className="mt-5 px-32">
          <Button
            className="w-full"
            variant="contained"
            onClick={() => setIsOpenAddRoom(!isOpenAddRoom)}
          >
            {!isOpenAddRoom ? "Add New Place" : "Close"}
          </Button>
        </div>
        <Modal
          open={isOpenAddRoom}
          onClose={() => setIsOpenAddRoom(!isOpenAddRoom)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div>
            <CreateRoomForm close={setIsOpenAddRoom} />
          </div>
        </Modal>

        <Modal
          open={editForm}
          onClose={() => setEditForm(!editForm)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
          <div>
            <UpdateRoomForm roomToEdit={roomToEdit} close={setEditForm} />
          </div>
        </Modal>
      </>
    );
  }
}

export default Rooms;
