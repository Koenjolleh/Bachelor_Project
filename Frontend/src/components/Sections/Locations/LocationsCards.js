import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// Components
import Map from '../../Commons/Map/Map2';

// Styles
import { styles } from './styles';


const LocationsCards = (props) => {

    const { classes, data, handleShowDetails } = props;

    return (
        <Paper className={classes.root}>
        {
            data.map(d => {
                return(
                    <Fragment>
                        <Card key={d.id_location} id={d.id_location} className={classes.card} onClick={() => handleShowDetails(this, d.id_location)}>
                            <CardActionArea id={d.id} className={classes.cardActionArea}>
                                <div className={classes.cardMedia}>
                                    <Map
                                        selectedLocation={d.coordinates}
                                    />
                                </div>
                                <CardContent id={d.id_location} className={classes.cardContent}>
                                    <Typography id={d.id_location} gutterBottom variant="h4" component="h2" className={classes.typography}>
                                        Address
                                    </Typography>
                                    <Typography id={d.id_location} variant="body2" component="p" className={classes.typography}>
                                        {d.address}
                                    </Typography>
                                    <br />
                                    <Typography id={d.id_location} gutterBottom variant="h4" component="h2" className={classes.typography}>
                                        Property type
                                    </Typography>
                                    <Typography id={d.id_location} variant="body2" component="p" className={classes.typography}>
                                        {d.typeProperty}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>    
                    </Fragment>
                )
            })
        }             
        </Paper>
    );
}

LocationsCards.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    handleShowDetails: PropTypes.func.isRequired
};

export default withStyles(styles)(LocationsCards);