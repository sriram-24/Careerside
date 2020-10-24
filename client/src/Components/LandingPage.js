import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
const style=makeStyles({
    title:{
        textAlign:"center",
        marginTop:"20px"
    }
});
const LandingPage=()=>{
    const classes=style();
    return(
        <div>
            <Typography variant="h4" component="h4" className={classes.title} >
                Welcome to CareerSide
            </Typography>
        </div>
    );
}
export default LandingPage;