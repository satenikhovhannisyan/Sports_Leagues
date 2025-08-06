import Badge from "./badge";

import { Card, CardContent, Typography } from "@mui/material";

export default function LeagueCard(props = {}) {
    const { league = {}, handleLeagueClick, selected, badgeUrl } = props;
    const { idLeague, strLeague, strSport, strLeagueAlternate } = league;

    return (
        <Card
            key={idLeague}
            sx={{ maxWidth: 345, mx: "auto" }}
            onClick={() => handleLeagueClick(league)}
            style={{ cursor: "pointer", border: selected === idLeague ? "2px solid #216b17ff" : "1px solid #ccc" }}
        >
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" align="center">{strLeague}</Typography>
                <Typography gutterBottom variant="h6" component="div" align="center">{strSport}</Typography>
                <Typography gutterBottom variant="h6" component="div" align="center">{strLeagueAlternate}</Typography>
            </CardContent>
            {selected === idLeague && badgeUrl && (
                <Badge selectedBadgeUrl={badgeUrl} />
            )}
        </Card>
    );
}