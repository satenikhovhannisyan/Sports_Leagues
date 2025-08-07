import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from "@emotion/styled";

const ToolBar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    boxShadow: 20
}));

function Header() {
    return (
        <AppBar position="static" >
            <ToolBar>
                <img src="/logo.svg" alt="Logo" style={{ height: 80 }} />
                <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    sx={{ color: theme => theme.palette.secondary.contrastText }}
                >
                    Sports Leagues
                </Typography>
            </ToolBar>
        </AppBar>
    );
}

export default Header;