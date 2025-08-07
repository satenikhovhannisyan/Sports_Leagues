import SearchBar from "./search_bar";
import SportsDropdown from "./sport_dropdown";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function Filters() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { xs: 'column', sm: 'row' },
                padding: '20px',
            }}>
                <SearchBar />
                <SportsDropdown />
            </Toolbar>
        </Box>
    );
}