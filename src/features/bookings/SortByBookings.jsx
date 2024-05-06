import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSearchParams } from "react-router-dom";

export default function SortByBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    searchParams.set("sort", event.target.value);
    setSearchParams(searchParams);
  };
  let sortValue = searchParams.get("sort") || "";

  return (
    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
      <InputLabel id="demo-select-small-label">Sort</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        label="Sort"
        value={sortValue}
        onChange={handleChange}
      >
        <MenuItem value="startDate-desc">Sort by date (recent first)</MenuItem>
        <MenuItem value="startDate-asc">Sort by date (earlier first)</MenuItem>
        <MenuItem value="totalPrice-desc">Sort by amount (high first)</MenuItem>
        <MenuItem value="totalPrice-asc">Sort by amount (low first)</MenuItem>
      </Select>
    </FormControl>
  );
}
