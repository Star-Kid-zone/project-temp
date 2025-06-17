import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useThemeContext } from "../Contexts/theme.context";
// import Logo from '../assets/images/svg/qr-code.svg';
import HowToRegIcon from '@mui/icons-material/HowToReg';

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

export default function HomeHeader() {
    const { mode } = useThemeContext();
    return (
        <Fragment>
            <ElevationScroll>
                <AppBar position="sticky" color='primary'>
                    <Toolbar sx={{
                        bgcolor: mode === "dark" ? "#333" : "#fff",
                        color: mode === "dark" ? "#fff" : "#000"
                    }}>

                        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 40 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* <img src={Logo} alt="Logo" style={{ width: '50px', }} /> */}
                                <Typography variant="h6" sx={{ textDecoration: 'none', color: mode === "dark" ? "#fff" : "#000" }}>QR Scans</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                                <Typography variant="h6">Home</Typography>
                                <Typography variant="h6">Features</Typography>
                                <Typography variant="h6">Our Clients</Typography>
                                <Typography variant="h6">Blog</Typography>
                                <Typography variant="h6">Pricing</Typography>
                                <Typography variant="h6">Contacts</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                                <Typography variant="h6">Login</Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    startIcon={<HowToRegIcon />}
                                >
                                    Register

                                </Button>
                            </Box>
                        </Box>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Fragment>
    )
}
