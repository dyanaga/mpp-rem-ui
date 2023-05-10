import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ReactComponent as Ufo} from "../Ufo.svg"
import {Paper} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: localStorage.getItem("theme") === "dark" ? "burlywood" : "white",
    },
    space: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }
}));

export default function EmptyPage() {
    const classes = styles();


    return (
        <Paper className={classes.paper}>
            <Ufo width="50%" className={classes.space}/>
        </Paper>
    );
}
