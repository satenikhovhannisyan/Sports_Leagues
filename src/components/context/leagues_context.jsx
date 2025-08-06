import { useState, useEffect, useRef } from "react";
import {
  BADGES_CACHE_KEY,
  BADGES_TTL,
  LEAGUES_CACHE_KEY,
  LEAGUES_TTL,
} from "../../utils/enums";
import { fetchSeasonBadge, fetchLeagues } from "../../api/requests";
import { loadFromCache, saveToCache } from "../../utils/cache";
import { LeaguesContext } from "./export";

export function LeaguesProvider({ children }) {
  const [leagues, setLeagues] = useState([]);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [leaguesError, setLeaguesError] = useState(null);
  const [badgeCache, setBadgeCache] = useState({});
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("all");
  const [loadingBadge, setLoadingBadge] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    const cachedBadges = loadFromCache(BADGES_CACHE_KEY);
    if (cachedBadges) setBadgeCache(cachedBadges);
  }, []);

  useEffect(() => {
    const cached = loadFromCache(LEAGUES_CACHE_KEY);
    if (cached) {
      setLeagues(cached);
    } else if (!hasFetched.current) {
      setLoadingLeagues(true);
      fetchLeagues()
        .then((data) => {
          setLeagues(data);
          saveToCache(LEAGUES_CACHE_KEY, data, LEAGUES_TTL);
        })
        .catch((err) => setLeaguesError(err.message))
        .finally(() => setLoadingLeagues(false));
      hasFetched.current = true;
    }
  }, []);

  const getBadge = async (leagueId) => {
  if (leagueId in badgeCache) return badgeCache[leagueId];
  
  setLoadingBadge(true);
  const badge = await fetchSeasonBadge(leagueId);
  const updatedCache = { ...badgeCache, [leagueId]: badge };
  setBadgeCache(updatedCache);
  saveToCache(BADGES_CACHE_KEY, updatedCache, BADGES_TTL);
  setLoadingBadge(false);
  return badge;
};

  const sportsList = [...new Set(leagues.map((league) => league.strSport))].sort();

  return (
    <LeaguesContext.Provider
      value={{
        leagues,
        loadingLeagues,
        leaguesError,
        badgeCache,
        search,
        setSearch,
        sport,
        setSport,
        getBadge,
        sportsList,
        loadingBadge,
        setLoadingBadge
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
}