import { useState, useMemo } from "react";
import { useLeaguesContext } from "./context/export";
import LeagueCard from "./league_card";
import Loader from "./loader";
import ErrorMessage from "./error";
import { Box, Grid } from "@mui/material";

export default function LeaguesGrid() {
    const {
        leagues,
        loadingLeagues,
        leaguesError,
        search,
        sport,
        getBadge,
        loadingBadge
    } = useLeaguesContext();
    
    const [selected, setSelected] = useState(null);
    const [badgeUrl, setBadgeUrl] = useState("");

    const filteredLeagues = useMemo(() => {
        return leagues
            .filter((league) =>
                league.strLeague.toLowerCase().includes(search.trim().toLowerCase())
            )
            .filter((league) => sport === "all" || !sport || league.strSport === sport);
    }, [leagues, search, sport]);

    const handleLeagueClick = async (league) => {
        setSelected(league.idLeague);
        setBadgeUrl("");
        if (!loadingBadge) {
            const url = await getBadge(league.idLeague);
            setBadgeUrl(url);
        }

    };

    if (loadingLeagues) return <Loader />;
    if (leaguesError) return <ErrorMessage message={leaguesError} />;
    if (filteredLeagues.length === 0) {
        return <ErrorMessage message="No leagues found" />;
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {filteredLeagues.map((league) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        key={league.idLeague}
                    >
                        <LeagueCard
                            key={league.idLeague}
                            league={league}
                            handleLeagueClick={handleLeagueClick}
                            selected={selected}
                            badgeUrl={badgeUrl}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
