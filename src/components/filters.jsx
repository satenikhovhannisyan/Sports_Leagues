import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import SearchBar from "./search_bar";
import SportsDropdown from "./sport_dropdown";

export default function Filters() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img src="/public/logo.svg" alt="Logo" style={{ height: 80 }} />
                    <Typography
                        variant="h2"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Sports Leagues
                    </Typography>
                    <SearchBar />
                    <SportsDropdown />
                </Toolbar>
            </AppBar>
        </Box>
    );
}