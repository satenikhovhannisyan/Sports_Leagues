import { LeaguesProvider } from "./components/context/leagues_context";
import { ErrorBoundary } from "./components/error_boundary";
import Filters from "./components/filters";
import LeaguesGrid from "./components/leagues_grid";
import Header from "./components/header";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#414141',
      main: '#32333aff',
      dark: '#242323ff',
      contrastText: '#fff',
    },
    secondary: {
      light: 'cornsilk',
      main: '#a79d73e0',
      dark: '#5a5a3fff',
      contrastText: '#000',
    },
    error: {
      light: '#c50909ff',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <LeaguesProvider>
          <Box sx={{ flexGrow: 1, height: "100vh" }}>
            <Header />
            <Filters />
            <LeaguesGrid />
          </Box>
        </LeaguesProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}