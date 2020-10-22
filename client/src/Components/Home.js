import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Box, Icon} from "@material-ui/core";
import {MenuOutlined, AccountCircleOutlined} from "@material-ui/icons";
const Appbar=()=>{
    const classes=useStyles();
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <MenuOutlined />
                </IconButton>
                <Typography variant="h6" component="h6" className={classes.title}><Box letterSpacing={2}>CareerSide</Box></Typography>
                <Icon color="inherit">
                    <AccountCircleOutlined />
                </Icon>
            </Toolbar>
        </AppBar>
    );
}

class Home extends Component{
    render(){
        return(
            <Appbar />
        );
    }
}

const useStyles=makeStyles((theme)=>({
    title:{
        flexGrow:1
    }
}));

export default Home;