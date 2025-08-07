import { useState, useEffect, useRef } from "react";
import {
  BADGES_CACHE_KEY,
  LEAGUES_CACHE_KEY,
  LEAGUES_TTL,
} from "../utils/enums";
import { fetchFromApi } from "../api/requests";
import { LEAGUES } from "../api/endpoints";
import { loadFromCache, saveToCache } from "../utils/cache";
import { LeaguesContext } from "./export";

export function LeaguesProvider({ children }) {
  const [leagues, setLeagues] = useState([]);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [leaguesError, setLeaguesError] = useState(null);
  const [badgeCache, setBadgeCache] = useState({});
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("all");

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
      fetchFromApi(LEAGUES)
        .then((data) => {
          const leaguesData = data.leagues || [];
          setLeagues(leaguesData);
          saveToCache(LEAGUES_CACHE_KEY, leaguesData, LEAGUES_TTL);
        })
        .catch((err) => setLeaguesError(err.message))
        .finally(() => setLoadingLeagues(false));
      hasFetched.current = true;
    }
  }, []);

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
        sportsList,
        setBadgeCache
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
}