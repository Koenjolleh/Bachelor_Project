import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider } from 'material-ui-slider';
import _range from 'lodash/range';

// Material UI
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';

// Styles
import { styles } from './styles';


class CustomPeriod extends Component {
  state = {
    defaultPeriod: [0, 23],
    minValue: 0,
    maxValue: 23,
    minSelected: 0,
    maxSelected: 23,
    periodSelected: undefined,
    customPeriodEnabled: false
  };

  componentDidMount(){
    const { periodsDay, customPeriodEnabled } = this.props;

    if(periodsDay.length > 0){
      const minSelected = Math.min(...periodsDay);
      const maxSelected = Math.max(...periodsDay);
      this.setState({ minSelected, maxSelected, customPeriodEnabled: customPeriodEnabled });
    }else {
      this.setState({ customPeriodEnabled: customPeriodEnabled });
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { service } = this.props;
    const { periodSelected, customPeriodEnabled } = this.state;
    if(periodSelected !== prevState.periodSelected){
      this.props.selectPeriodsDay(periodSelected, service);
    } else if(customPeriodEnabled !== prevState.customPeriodEnabled){
      this.props.customPeriosIsEnabled( customPeriodEnabled, service)
      if(customPeriodEnabled === false){
        this.props.selectPeriodsDay([], service);
      }
    }
  }

  handleChange = (period, dataSlider) => {
    const minSelected = period[0];
    const maxSelected = period[1];
    const periodSelected = _range(minSelected, maxSelected + 1);
    this.setState({
      minSelected: minSelected,
      maxSelected: maxSelected,
      periodSelected
    })
  };

  handleChangeCheckBox = (event) => {
    const checked = event.target.checked;
    this.setState({ customPeriodEnabled: checked });
  }

  render() {
    const { classes } = this.props;
    const { defaultPeriod, minValue, maxValue, minSelected, maxSelected, customPeriodEnabled } = this.state;
    
    return (
      <div className={classes.root}>
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                className={classes.formRow}
                label="Custom Period?"
                control={
                    <Fragment>
                    <Checkbox 
                        className={classes.checkBox}
                        name="customPeriodEnabled"
                        checked={customPeriodEnabled} 
                        onChange={this.handleChangeCheckBox}
                        value="1" 
                        disabled={false}
                    />
                    <Tooltip title="Choose a custom period">
                        <InfoIcon className={classes.iconInfo}/>
                    </Tooltip>
                    </Fragment>
                }
              />
            </FormGroup>
          </FormControl>
        </div>
        {
          customPeriodEnabled === true &&
            <div>
              <Typography variant="subtitle1" component="h3" className={classes.typography}>
                Custom Period from {minSelected} to {maxSelected}
              </Typography>
              <Slider 
                style={{ width: '90%', height: 40 }}
                min={minValue}
                max={maxValue}
                color="#00b8d4" 
                defaultValue={defaultPeriod} 
                value={[minSelected,maxSelected]}
                onChange={this.handleChange}
                range
              />
            </div>
        }
      </div>
    );
  }
}

CustomPeriod.propTypes = {
  classes: PropTypes.object.isRequired,
  selectPeriodsDay: PropTypes.func.isRequired,
  periodsDay: PropTypes.array.isRequired,
  service: PropTypes.number.isRequired,
  customPeriosIsEnabled: PropTypes.func.isRequired,
  customPeriodEnabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(CustomPeriod);