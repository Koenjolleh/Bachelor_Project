import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import Container from "@material-ui/core/Container";
import React, {useState} from "react";
// import Difference from "./Difference";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";

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
        // '&:hover': {
        //     opacity: 0.75,
        //     cursor: 'pointer'
        // }
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
    },
    clickable: {
        color: '#000000',
        '&:hover': {
            opacity: 0.85,
            cursor: 'pointer'
        }
    }

})


export default function DashboardItems(props) {
    const {data, handleOnClick} = props
    const classes = useStyles();
    const [isShown, setIsShown] = useState(false);
    return (
        <React.Fragment>
            {
                data.map(d => {
                    return (
                        <React.Fragment>
                            {/* Checks if there is any values in all of the needed data */}
                            {d.street_engagement.length === 0 || d.street_activity.length === 0 || d.store_activity.length ===0 || d.store_engagement.length ===0 ? "" :
                            <Paper className={classes.paperGrid}>
                                <h1>
                                    {d.address}
                                </h1>
                                <Grid container spacing={4}
                                      justify="center"
                                      alignItems="center" 
                                      className={classes.clickable} 
                                      onClick={(e) => handleOnClick(e, d.id_location)}>

                                    <Grid item sx={3} md={3} lg={3}>
                                        <Tooltip title = "People outside entering the store">
                                            <p className={classes.pieChartText}>
                                                Street Engagement
                                            </p>    
                                        </Tooltip>
                                        <span className={classes.diffCircle}>
                                        {d.street_engagement.length === 0 ? "" : d.street_engagement.map(d2 =>
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
                                        )}
                                    </span>
                                    </Grid>
                                    <Grid item sx={3} md={3} lg={3}>
                                        <Tooltip title="Number of people on the street">
                                            <p className={classes.pieChartText}>
                                                Street Activity
                                            </p>
                                        </Tooltip>
                                        <span className={classes.diffCircle}>
                                        {d.street_activity.length === 0 ? "" : d.street_activity.map(d2 =>
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
                                        )}
                                        </span>
                                    </Grid>
                                    <Grid item sx={3} md={3} lg={3}>
                                        <Tooltip title="Number of people entering the store">
                                            <p className={classes.pieChartText}>
                                                Store Activity
                                            </p>
                                        </Tooltip>
                                        <span className={classes.diffCircle}>
                                        {d.store_activity.length === 0 ? "" : d.store_activity.map(d2 =>
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
                                        )}
                                        </span>

                                    </Grid>
                                    <Grid item sx={3} md={3} lg={3}>
                                        <Tooltip title="Time spent in the store">
                                            <p className={classes.pieChartText}>
                                                In-store Engagement
                                            </p>
                                        </Tooltip>
                                        <span className={classes.diffCircle} onMouseEnter={() => setIsShown(true)}
                                              onMouseLeave={() => setIsShown(false)}
                                        >
                          {d.store_engagement.length === 0 ? "" : d.store_engagement.map(d2 =>
                              <React.Fragment>
                                  {
                                      d2.comparison.charAt(0) === '-' ?
                                          <React.Fragment>
                                              <ArrowDownwardIcon className={classes.arrow} style={{fill: '#910000'}}/>

                                              <h1 className={classes.arrowText} style={{color: '#910000'}}>
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
                          )}
                                    </span>
                                    </Grid>
                                </Grid>
                            </Paper>
                        }
                        </React.Fragment>
                    )
                })}

        </React.Fragment>
    )

}