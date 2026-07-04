import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'Store', path: '/store'},
    {title: 'Contact', path: '/contact'}
]

const navStyles = {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
        color: "secondary.main"
    },
    "&:active": {
        color: "text.secondary"
    }
};

export default function Header() {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Typography variant="h6">
                        Sport shop
                    </Typography>
                </Box>
                <List sx={{display:'flex'}}>
                    {navLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    )
}