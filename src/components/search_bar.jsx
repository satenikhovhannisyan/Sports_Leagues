import { TextField } from "@mui/material";
import { useLeaguesContext } from "./context/export";

function SearchBar() {
    const { search, setSearch } = useLeaguesContext();
    return (
        <TextField
            id="outlined-search"
            label="Search leagues"
            type="search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SearchBar;