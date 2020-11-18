import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    diffCircle: {
        height: '75px',
        width: '75px',
        backgroundColor: '#00b8d4',
        borderRadius: '50%',
        display: "inline-block"
    }
});

function createData(name, last, current, calcValRaw, calcValPercent) {
    return { name, last, current, calcValRaw, calcValPercent };
}

const rows = [
    createData('Street Activity', 159, 6.0, 24, 4.0),
    createData('Street Engagement', 237, 9.0, 37, 4.3),
    createData('Store Activity', 262, 16.0, 24, 6.0),
    createData('In-store Engagement', 305, 3.7, 67, 4.3)
];

export default function Difference() {
    const classes = useStyles();

    return (
        <div>
            <Grid item sx={6} md={6} lg={6}>
            <p color={'#000000'}>
                Street Engagement
            </p>
            <span className={classes.diffCircle}>

            </span>
        </Grid>

            <Grid item sx={6} md={6} lg={6}>
        <p color={'#000000'}>
            Street Activity
        </p>
        <span className={classes.diffCircle}>

            </span>
    </Grid>

            <Grid item sx={6} md={6} lg={6}>
        <p color={'#000000'}>
            Store Activity
        </p>
        <span className={classes.diffCircle}>

            </span>
    </Grid>

            <Grid item sx={6} md={6} lg={6}>
        <p color={'#000000'}>
            In-store Engagement
        </p>
        <span className={classes.diffCircle}>

            </span>
    </Grid>
        </div>
    );
}