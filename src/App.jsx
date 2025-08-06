import { Box } from "@mui/material";
import { LeaguesProvider } from "./components/context/leagues_context";
import { ErrorBoundary } from "./components/error_boundary";
import Filters from "./components/filters";
import LeaguesGrid from "./components/leagues_grid";
import "./App.css";

export default function App() {
  return (
    <ErrorBoundary>
      <LeaguesProvider>
        <Box sx={{ flexGrow: 1 }}>
          <Filters />
          <LeaguesGrid />
        </Box>
      </LeaguesProvider>
    </ErrorBoundary>
  );
}