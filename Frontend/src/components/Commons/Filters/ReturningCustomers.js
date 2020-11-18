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


class ReturningCustomers extends Component {
  state = {
    checked: false, 
    check: []
  };

  componentDidMount(){
    const { returningCustomers } = this.props;
    if(returningCustomers.length === 2){
      this.setState({
        checked: false
      });
    } else if(returningCustomers.length === 1){
      this.setState({
        checked: true
      });
    }
  }


  componentDidUpdate(prevProps,prevState){
    const { returningCustomers } = this.props;
    const { check } = this.state;
    if(check !== prevState.check){
      this.props.isReturningCustomers({ inside: check, outside: [0] });
    } else if(prevProps.returningCustomers !== returningCustomers){
      if(returningCustomers.length === 2){
        this.setState({
          checked: false
        });
      } else if(returningCustomers.length === 1){
        this.setState({
          checked: true
        });
      }
    }
  }
    

  handleChange = (event) => {
    const checked = event.target.checked;   
    this.setState({ 
        checked: checked,
        check: checked ? [2] : [1,2]
      });
  };


  render() {
    const { classes, isDisabled } = this.props;
    const { checked } = this.state;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
                <FormControlLabel
                  className={classes.formRow}
                  control={
                    <Fragment>
                      <Checkbox 
                        name="returningCustomers" 
                        checked={checked} 
                        onChange={this.handleChange} value="1" 
                        className={classes.checkBox} 
                        disabled={isDisabled}
                      />
                      <Tooltip title="Customers returning on separate days">
                        <InfoIcon className={classes.iconInfo}/>
                      </Tooltip>
                    </Fragment>
                  }
                  label="Returning Customers"
                />
            </FormGroup>
        </FormControl>
      </div>
    );
  }
}

ReturningCustomers.propTypes = {
    classes: PropTypes.object.isRequired,
    isReturningCustomers: PropTypes.func.isRequired,
    returningCustomers: PropTypes.array.isRequired,
    isDisabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(ReturningCustomers);