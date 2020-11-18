import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

// Styles
import { styles } from './styles';


class Activities extends Component {
    state = {
        options: [],
        activityType: undefined,
        service: undefined
    };

    componentDidMount(){
        const { activityOptions, activityType, activitiesDay, service } = this.props; 

        let options = [...activityOptions];
        for(let i = 0; i < options.length; i++){
            options[i].checked = activitiesDay.filter(a => { return a === options[i].activity_number; }).length === 1 ? true : false;
        }

        this.setState({ options, activityType, service });
    }

    componentDidUpdate(prevProps,prevState){
        const { options, service, activityType } = this.state;

        if(options !== prevState.options){
            const checked = options.filter(o => { return o.checked === true ; }).map(a => { return a.activity_number; });
            this.props.selectActivitiesDay(checked, service);
            if(checked.length > 0){
                this.props.selectInsideActivityType(activityType, service);
            } else {
                this.props.selectInsideActivityType(undefined, service);
            }
        }
    }

    handleOnChange = (event) => {
        const { options } = this.state;
        let optionSelected = [...options];
        const checked = event.target.checked;
        const value = parseInt(event.target.value,10);
        const index = optionSelected.findIndex(obj => obj.activity_number === value);
        optionSelected[index].checked = checked;
        
        this.setState({ options: optionSelected });    
    };


    render() {
        const { classes, isDisabled } = this.props;
        const { options } = this.state;
        
        return(
            <Fragment>
            {
                options.length > 0 &&
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    {
                        options.map(o => {
                            return (
                                <FormControlLabel
                                    className={classes.formRow}
                                    label={o.activity_name}
                                    key={o.activity_number}
                                    control={
                                        <Fragment>
                                        <Checkbox 
                                            className={classes.checkBox}
                                            key={`chbox${o.activity_number}`}
                                            name={o.activity_name}
                                            checked={o.checked} 
                                            onChange={this.handleOnChange}
                                            value={`${o.activity_number}`} 
                                            disabled={isDisabled}
                                        />
                                        <Tooltip title={o.description}>
                                            <InfoIcon className={classes.iconInfo}/>
                                        </Tooltip>
                                        </Fragment>
                                    }
                                />
                            )
                        })
                    }
                    </FormGroup>
                </FormControl>
            }
            {
                options.length === 0 &&
                    <div>
                        <h1>Loading...</h1>
                    </div>
            }
            </Fragment>
        )
       
    }
}

Activities.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    activityType: PropTypes.number,
    activitiesDay: PropTypes.array.isRequired,
    selectActivitiesDay: PropTypes.func.isRequired,
    service: PropTypes.number.isRequired,
    selectInsideActivityType: PropTypes.func,
    isDisabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(Activities);