import { useState } from "react";
import { useLeaguesContext } from "./context/export";

import Badge from "./badge";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function LeagueCard(props = {}) {
    const { league = {} } = props;
    const { idLeague, strLeague, strSport, strLeagueAlternate } = league;
    const { getBadge, loadingBadge } = useLeaguesContext();
    const [flipped, setFlipped] = useState(false);

    const [badgeUrl, setBadgeUrl] = useState("");

    const handleCardClick = async () => {
        setBadgeUrl("");
        setFlipped((f) => !f);
        if (!loadingBadge) {
            const url = await getBadge(idLeague);
            setBadgeUrl(url);
        }
    };

    return (
        <Card
            key={idLeague}
            sx={{
                maxWidth: 400,
                mx: "auto",
                cursor: "pointer",
                minHeight: 220,
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.05)',
                    zIndex: 2,
                },
            }}
            onClick={handleCardClick}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "220px",
                    transition: "transform 0.6s",
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",

                }}
            >
                <CardContent
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strLeague}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strSport}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strLeagueAlternate}
                    </Typography>
                </CardContent>

                {!loadingBadge &&<CardContent
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {badgeUrl ?
                        <Badge selectedBadgeUrl={badgeUrl} /> :
                        <Typography variant="body2" color="textSecondary">
                            No Season Badge
                        </Typography>
                    }
                </CardContent>}
            </div>
        </Card>
    );
}