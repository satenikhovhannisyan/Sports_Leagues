import { BASE_URL } from "./endpoints";

export async function fetchFromApi(endpoint, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${query ? `&${query}` : ''}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  
  const data = await res.json();
  return data;
}
