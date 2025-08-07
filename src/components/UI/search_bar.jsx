import { useLeaguesContext } from "../../context/export";
import TextField from "@mui/material/TextField";

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
            sx={{ width: { xs: '100%', sm: 'inherit'}}}
        />
    );
}

export default SearchBar;