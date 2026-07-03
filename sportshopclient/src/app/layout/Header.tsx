import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="fixed" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">
                    Sport shop
                </Typography>
            </Toolbar>
        </AppBar>
    )
}