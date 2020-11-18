import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    pieChartText: {
        textAlign: "center",
        color: "#000"
    },
    diffCircle: {
        height: '135px',
        width: '135px',
        backgroundColor: '#00b8d4',
        borderRadius: '50%',
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        opacity: 1,
        transition: '0.3s',
        /* '&:hover': {
            opacity: 0.75,
            cursor: 'pointer'
        } */
    },
    diffCircleHover: {
        height: '125px',
        width: '125px',
        backgroundColor: '#00b8d4',
        borderRadius: '50%',
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        opacity: 1
    },
    diff: {
        height: '400px',
        width: '400px'
    },
    arrow: {
        fill: '#000000',
        height: '50px',
        width: '50px',
        display: 'flex',
        textAlign: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        justifyContent: "center",
        borderStyle: '1px, solid'

    },
    arrowText: {
        color: '#000000',
        width: '50px',
        display: 'flex',
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        justifyContent: "center",
        top: '50%',
        left: '50%'
    },
    paperGrid: {
        margin: '20px 0 20px 10px',
        padding: '0 0 20px 10px',
    }

})


export default function DashboardDetailItems(props) {
    const {data} = props
    const classes = useStyles();
    return (
        <React.Fragment>
            {
                data.map(d => {
                    return (
                        <React.Fragment>
                            <Paper className={classes.paperGrid}>
                                <Grid container spacing={4}
                                      justify="center"
                                      alignItems="center">
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Street Engagement
                                            </p>
                                            <div>
                                                {d.street_engagement.length === 0 ? "" : d.street_engagement.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>
                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Percentage of people outside entering the store: {d2.value}%</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Street Activity
                                            </p>
                                            <div>
                                                {d.street_activity.length === 0 ? "" : d.street_activity.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Total number of people on the street: {d2.value}</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Store Activity
                                            </p>
                                            <div>
                                                {d.store_activity.length === 0 ? "" : d.store_activity.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Total number of people entering the store: {d2.value}</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                In-store Engagement
                                            </p>
                                            <div>
                                                {d.store_engagement.length === 0 ? "" : d.store_engagement.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Average time spent in the store: {(d2.value/60).toFixed(0)} minutes</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container justify="center" alignItems="center">
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Returning customers
                                            </p>
                                            <div>
                                                {d.returning_customers.length === 0 ? "" : d.returning_customers.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Total number of returning customers: {d2.value}</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Take-away customers
                                            </p>
                                            <div>
                                                {d.take_away_customers.length === 0 ? "" : d.take_away_customers.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Percentage take-away customers: {d2.value}%</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item sx={3} md={3} lg={3}>
                                            <p className={classes.pieChartText}>
                                                Sit-down customers
                                            </p>
                                            <div>
                                                {d.sit_down_customers.length === 0 ? "" : d.sit_down_customers.map(d2 =>
                                                    <React.Fragment>
                                                        <span className={classes.diffCircle}>
                                                            <React.Fragment>
                                                                {
                                                                    d2.comparison.charAt(0) === '-' ?
                                                                        <React.Fragment>
                                                                            <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>
                                                                            <h1 className={classes.arrowText}
                                                                                style={{color: '#910000'}}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                        :
                                                                        <React.Fragment>
                                                                            <ArrowUpwardIcon className={classes.arrow}/>

                                                                            <h1 className={classes.arrowText}>
                                                                                {parseFloat(d2.comparison).toFixed(1)}%
                                                                            </h1>
                                                                        </React.Fragment>
                                                                }
                                                            </React.Fragment>
                                                        </span>
                                                        <span>
                                                            <h4 className={classes.pieChartText}>Percentage sit-down customers: {d2.value}%</h4>
                                                        </span>
                                                    </React.Fragment>
                                                )}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </React.Fragment>
                    )
                })}
        </React.Fragment>
    )
}