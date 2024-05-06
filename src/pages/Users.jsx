import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/Slices/userSlice";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";

const columns = [
  { id: "id", label: "Id", minWidth: 100, align: "center" },
  { id: "fullName", label: "Name", minWidth: 170, align: "center" },
  { id: "email", label: "Email", minWidth: 100, align: "center" },
  {
    id: "nationality",
    label: "Nationality",
    minWidth: 170,
    align: "center",
  },
  {
    id: "nationalID",
    label: "National Id",
    minWidth: 170,
    align: "center",
  },
];

function createData(id, fullName, email, nationality, nationalID) {
  return { id, fullName, email, nationality, nationalID };
}

///////component///////////

function Users() {
  const { data, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  let rows = [];

  if (data) {
    rows = data.map((item) =>
      createData(
        item.id,
        item.fullName,
        item.email,
        item.nationality,
        item.nationalID
      )
    );
  }

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
          <div className="font-bold text-3xl ">Users</div>
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
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
      </>
    );
  }
}

export default Users;
