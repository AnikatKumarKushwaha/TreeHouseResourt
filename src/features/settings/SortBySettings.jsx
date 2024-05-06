import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSearchParams } from "react-router-dom";

export default function SortBySettings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };
  let sortValue = searchParams.get("sortBy") || "";

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
        <MenuItem value="name-asc">Sort by name(A-Z)</MenuItem>
        <MenuItem value="name-desc">Sort by Name (Z-A)</MenuItem>
        <MenuItem value="regularPrice-asc">Sort by price(low first)</MenuItem>
        <MenuItem value="regularPrice-desc">Sort by price(high first)</MenuItem>
        <MenuItem value="maxCapacity-asc">Sort by capacity(low first)</MenuItem>
        <MenuItem value="maxCapacity-desc">
          Sort by capacity(high first)
        </MenuItem>
      </Select>
    </FormControl>
  );
}
