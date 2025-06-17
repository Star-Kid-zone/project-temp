import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from "../Contexts/theme.context";

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return children
        ? React.cloneElement(children, {
            elevation: trigger ? 4 : 0,
        })
        : null;
}

ElevationScroll.propTypes = {
    children: PropTypes.element,
    window: PropTypes.func,
};

export default function Header({ setSidebarOpen }) {

    const { toggleTheme, mode } = useThemeContext();

    return (
        <React.Fragment>

            <ElevationScroll>
                <AppBar position="sticky" color='transparent'>
                    <Toolbar sx={{
                        display: 'flex', justifyContent: 'space-between',
                        bgcolor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "#fff" : "#000"
                    }}>
                        {/* <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(prev => !prev)}>
                            <MenuIcon />
                        </IconButton> */}
                        <Typography variant="h6">Dashboard</Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={toggleTheme}
                        >
                            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}