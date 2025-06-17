import { Box, Typography } from "@mui/material";
import { useThemeContext } from "../Contexts/theme.context";

export default function Footer() {
    const { mode } = useThemeContext();
    return (
        <Box textAlign="center" py={2} sx={{ color: mode === "dark" ? "#fff" : "#000", backgroundColor: mode === "dark" ? "#333" : "#fff" }}>
            <Typography variant="body2">&copy; 2025 My Dashboard</Typography>
        </Box>
    );
}