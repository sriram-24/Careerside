import React, { Component, useState  } from "react";
import { makeStyles, AppBar, Toolbar, IconButton, Typography, Button, createMuiTheme, MuiThemeProvider, CssBaseline, Tooltip, Switch,  } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import LandingPage from "./LandingPage";
const styles = makeStyles({
    root: {
        backgroundColor: "#3f51b5",
        height: "50px",
        color: "white"
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        color: grey[50]
    },
});



const Appbar = () => {
   
    const [darkMode, toggleDarkMode]=useState(false);
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light"
        },
        
        
    })
    const classes = styles();
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton color="inherit">
                            <MenuRounded />
                        </IconButton>
                        <Typography className={classes.title} color="inherit">
                            CareerSide
                        </Typography>
                        <Button color="inherit">
                            Signup
                        </Button>
                        <Button color="inherit">
                            Login
                        </Button>
                        <Tooltip title="toggle Light/Dark mode">
                            <Switch checked={darkMode} onChange={()=>{toggleDarkMode(!darkMode)}}  />
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </CssBaseline>
        </MuiThemeProvider>
    );
}
class Home extends Component{
    render(){
        return(   
            <div>
                <Appbar />
                <LandingPage />
            </div>
        );
    }
}

export default Home;