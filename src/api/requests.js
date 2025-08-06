import { BASE_URL, LEAGUES, SEASON_BADGE } from "./endpoints";

export async function fetchLeagues() {
  const res = await fetch(`${BASE_URL}${LEAGUES}`);
  if (!res.ok) throw new Error('Failed to fetch leagues');
  const data = await res.json();
  return data.leagues || [];
}

export async function fetchSeasonBadge(leagueId) {
  const res = await fetch(`${BASE_URL}${SEASON_BADGE}&id=${leagueId}`);
  if (!res.ok) throw new Error('Failed to fetch badge');
  const data = await res.json();
  return data.seasons?.[0]?.strBadge || "";
}