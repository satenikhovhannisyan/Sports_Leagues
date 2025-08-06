export function saveToCache(key, data, ttl) {
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
      ttl,
    })
  );
}

export function loadFromCache(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const { data, timestamp, ttl } = JSON.parse(raw);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}