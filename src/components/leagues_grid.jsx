import { useMemo } from "react";
import { useLeaguesContext } from "./context/export";
import LeagueCard from "./league_card";
import Loader from "./loader";
import ErrorMessage from "./error";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function LeaguesGrid() {
    const {
        leagues,
        loadingLeagues,
        leaguesError,
        search,
        sport
    } = useLeaguesContext();

    const filteredLeagues = useMemo(() => {
        return leagues
            .filter((league) =>
                league.strLeague.toLowerCase().includes(search.trim().toLowerCase())
            )
            .filter((league) => sport === "all" || !sport || league.strSport === sport);
    }, [leagues, search, sport]);

    if (loadingLeagues) return <Loader />;

    if (leaguesError) return <ErrorMessage message={leaguesError} />;

    if (filteredLeagues.length === 0) {
        return (
            <Typography variant="h6">
                No leagues found
            </Typography>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2, }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {filteredLeagues?.map((league) => (
                    <Grid
                        size={{ xs: 8, sm: 4, lg: 3 }}
                        key={league.idLeague}
                    >
                        <LeagueCard key={league.idLeague} league={league} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
