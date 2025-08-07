import { useState } from "react";
import { useLeaguesContext } from "../../context/export";

import Badge from "./badge";

import { fetchFromApi } from "../../api/requests";
import { SEASON_BADGE } from "../../api/endpoints";
import { BADGES_CACHE_KEY, BADGES_TTL } from "../../utils/enums";
import { saveToCache } from "../../utils/cache";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const Content = styled(CardContent)`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function LeagueCard(props = {}) {
    const { league = {} } = props;
    const { idLeague, strLeague, strSport, strLeagueAlternate } = league;
    const { setBadgeCache, badgeCache } = useLeaguesContext();

    const [flipped, setFlipped] = useState(false);
    const [badgeUrl, setBadgeUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const getBadge = async (leagueId) => {
        if (leagueId in badgeCache) {
            setLoading(false);
            return badgeCache[leagueId];
        }

        const badgeData = await fetchFromApi(SEASON_BADGE, { id: leagueId });
        const badge = badgeData?.seasons?.[0]?.strBadge || "";
        const updatedCache = { ...badgeCache, [leagueId]: badge };

        setBadgeCache(updatedCache);
        saveToCache(BADGES_CACHE_KEY, updatedCache, BADGES_TTL);
        setLoading(false);
        return badge;
    };

    const handleCardClick = async () => {
        setBadgeUrl("");
        setFlipped((f) => !f);
        if (!loading) {
            setLoading(true);
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
                <Content>
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strLeague}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strSport}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" align="center">
                        {strLeagueAlternate}
                    </Typography>
                </Content>

                <Content style={{ transform:  "rotateY(180deg)" }}>
                    {badgeUrl ? (
                        <Badge selectedBadgeUrl={badgeUrl} />
                    ) : !loading ? (
                        <Typography variant="body2" color="textSecondary">
                            No Season Badge
                        </Typography>
                    ) : null}
                </Content>
            </div>
        </Card>
    );
}