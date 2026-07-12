import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
    {title: 'Home', path: '/'},
    {title: 'Store', path: '/store'},
    {title: 'Contact', path: '/contact'}
]
const accountLinks = [
    {title: 'Login', path:'/login'},
    {title: 'Register', path:'/register'}
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
                        My sport shop
                    </Typography>
                </Box>
                <List sx={{display:'flex'}}>
                    {navLinks.map(({title, path}) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{mr:2}}>
                        <Badge badgeContent="4" color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    <List sx={{display:'flex'}}>
                        {accountLinks.map(({title, path})=>(
                            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                                {title}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}