import TextField from "@mui/material/TextField";
import { useLeaguesContext } from "./context/export";
import MenuItem from "@mui/material/MenuItem";

function SportsDropdown() {
    const { sportsList, sport, setSport } = useLeaguesContext();

    return (

        <TextField
            id="select-sport"
            select
            size="small"
            value={sport}
            defaultValue="all"
            onChange={(e) => setSport(e.target.value)}
        >
            <MenuItem value="all" key="all-sports">
                All Sports
            </MenuItem>
            {sportsList.map((sport) =>
                <MenuItem key={sport} value={sport}>
                    {sport}
                </MenuItem>
            )}
        </TextField>
    );
}

export default SportsDropdown;