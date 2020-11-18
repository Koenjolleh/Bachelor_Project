import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import streetEngagementJPG from './static/images/cards/street_engagement.jpg'
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


export default function DashboardItems(props) {
    const {data} = props
    const classes = useStyles();
return(

    <Grid container spacing={3}>
        <Grid item sx={3} md={3} lg={3}>

            <Card className={classes.root}>

                    <CardMedia
                        className={classes.media}
                        image={streetEngagementJPG}
                        title="Street Engagement"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Street Engagement
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            The street engagement section displays the amount of people there is outside of your store, and the amount of people entering your store.
                        </Typography>
                    </CardContent>


            </Card>
        </Grid>
        <Grid item sx={3} md={3} lg={3}>
            <Card className={classes.root}>

                <CardMedia
                    className={classes.media}
                    image={streetEngagementJPG}
                    title="Street Engagement"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Street Engagement
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        The street engagement section displays the amount of people there is outside of your store, and the amount of people entering your store.
                    </Typography>
                </CardContent>


            </Card>
        </Grid>
        <Grid item sx={3} md={3} lg={3}>
            <Card className={classes.root}>

                <CardMedia
                    className={classes.media}
                    image={streetEngagementJPG}
                    title="Street Engagement"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Street Engagement
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        The street engagement section displays the amount of people there is outside of your store, and the amount of people entering your store.
                    </Typography>
                </CardContent>


            </Card>

        </Grid>
        <Grid item sx={3} md={3} lg={3}>
            <Card className={classes.root}>

                <CardMedia
                    className={classes.media}
                    image={streetEngagementJPG}
                    title="Street Engagement"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Street Engagement
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        The street engagement section displays the amount of people there is outside of your store, and the amount of people entering your store.
                    </Typography>
                </CardContent>


            </Card>
        </Grid>
    </Grid>
);

}