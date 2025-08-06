import { createContext, useContext } from "react";

export const LeaguesContext = createContext();

export function useLeaguesContext() {
  const context = useContext(LeaguesContext);
  if (!context) throw new Error("useLeaguesContext must be used within LeaguesProvider");
  return context;
}