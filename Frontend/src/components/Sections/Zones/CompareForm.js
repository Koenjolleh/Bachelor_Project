import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Styles
import { styles } from './styles';

class CompareForm extends Component {
    state = {
        datasets: [],
        datasetSelectedDefault: 0,
        datasetSelectedCompare: 0,
        checked: false
    }

    componentDidMount(){
        const { selectedLocation, compareOption, selectedDefaultDatasetZones } = this.props;

        if(selectedDefaultDatasetZones.length === 0){
            const datasetsLocation = selectedLocation[0].datasets.map(ds => { return ds.id_dataset; });
            const lastDataset = Math.max(...datasetsLocation);     
            
            this.setState({
                datasets:  selectedLocation[0].datasets,
                datasetSelectedDefault: lastDataset,
                checked: compareOption
            });
        } else if(selectedDefaultDatasetZones.length > 0){
            this.setState({
                datasets:  selectedLocation[0].datasets,
                datasetSelectedDefault: selectedDefaultDatasetZones[0],
                checked: compareOption
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { checked, datasets, datasetSelectedDefault, datasetSelectedCompare } = this.state;
        const { selectedDefaultDatasetCompareZones } = this.props;
        let datasetSelected = [];

        if(checked !== prevState.checked){
            this.props.compareIsActive(checked);
            if(checked === true){
                if(selectedDefaultDatasetCompareZones === 0){
                    let compareDataset = datasets.filter(f => { return f.id_dataset !== datasetSelectedDefault; }).map(d => { return d.id_dataset; });
                    compareDataset = Math.max(...compareDataset);
                    this.props.selectDatasetCompareZones(compareDataset);
                    this.setState({
                        datasetSelectedCompare: compareDataset
                    });
                } else if(selectedDefaultDatasetCompareZones > 0){
                    this.setState({
                        datasetSelectedCompare: selectedDefaultDatasetCompareZones
                    });
                }
            } else if(checked === false){
                datasetSelected = [datasetSelectedDefault];
                this.props.selectDefaultDataset(datasetSelected);
                this.props.selectDatasetCompareZones(0);
                this.setState({
                    datasetSelectedCompare: 0
                });
            }
        } else if(datasetSelectedDefault !== prevState.datasetSelectedDefault || datasetSelectedCompare !== prevState.datasetSelectedCompare){
            if(checked === true){
                datasetSelected = [datasetSelectedDefault, datasetSelectedCompare];
                this.props.selectDefaultDataset(datasetSelected);
                this.props.selectDatasetCompareZones(datasetSelectedCompare);
            } else {
                datasetSelected = [datasetSelectedDefault];
                this.props.selectDefaultDataset(datasetSelected);
                this.props.selectDatasetCompareZones(0);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedLocation, compareOption } = this.props;
        const { datasets, datasetSelectedDefault, datasetSelectedCompare, checked } = this.state;
        if (selectedLocation !== nextProps.selectedLocation) {
          return true;
        }
        if (compareOption !== nextProps.compareOption) {
            return true;
        }
        if (datasets !== nextState.datasets) {
          return true;
        }
        if (datasetSelectedDefault !== nextState.datasetSelectedDefault) {
            return true;
        }
        if (datasetSelectedCompare !== nextState.datasetSelectedCompare) {
            return true;
        }
        if (checked !== nextState.checked) {
            return true;
        }

        return false;
      }
    
    handleChangeSelectDefault = (event) => {
        this.setState({ datasetSelectedDefault: event.target.value });
    };

    handleChangeSelectCompare = (event) => {
        this.setState({ datasetSelectedCompare: event.target.value });
    };

    handleCheckbox = () => {
        const { checked } = this.state;        
        this.setState({ checked: !checked });
    };

    render(){
        const { datasets, datasetSelectedDefault, datasetSelectedCompare, checked } = this.state;
        const { classes, } = this.props;

        return (          
            <Grid className={classes.containerCompareForm}>
                <Paper className={classes.paperCompareForm}>
                    {
                        datasets.length > 1 &&
                            <FormControlLabel
                                className={classes.formRow}
                                control={
                                    <Checkbox 
                                        name="compare" 
                                        checked={checked} 
                                        onChange={this.handleCheckbox} 
                                        value="1" 
                                        className={classes.checkBox} 
                                    />
                                }
                                label="Compare?"
                            />
                    }
                    <FormControl className={classes.formControl}>                        
                        <InputLabel id="selectDefault">Select dataset</InputLabel>
                        <Select
                            labelid="selectDefault"
                            id="selectDefaultDataset"
                            value={datasetSelectedDefault}
                            onChange={this.handleChangeSelectDefault}
                            className={classes.select}
                        >    
                            { 
                                datasets.length > 0 && checked === false &&
                                    datasets.map(ds => {
                                        return <MenuItem key={ds.id_dataset} value={ds.id_dataset}>{ds.description}</MenuItem>;
                                    }) 
                            }

                            { 
                                datasets.length > 0 && checked === true &&
                                    datasets.filter(d => { return d.id_dataset !== datasetSelectedCompare; }).map(ds => {
                                        return <MenuItem key={ds.id_dataset} value={ds.id_dataset}>{ds.description}</MenuItem>;
                                    }) 
                            }
                        </Select>
                    </FormControl>
                    {
                        checked === true ?
                        (    
                            <FormControl className={classes.formControl}>                        
                                <InputLabel id="selectDefault">Select dataset</InputLabel>
                                <Select
                                    labelid="selectDefault"
                                    id="selectDefaultDataset"
                                    value={datasetSelectedCompare}
                                    onChange={this.handleChangeSelectCompare}
                                    className={classes.select}
                                >    

                            { 
                                datasets.length > 0 && checked === true &&
                                    datasets.filter(d => { return d.id_dataset !== datasetSelectedDefault; }).map(ds => {
                                        return <MenuItem key={ds.id_dataset} value={ds.id_dataset}>{ds.description}</MenuItem>;
                                    })
                            }
                                </Select>
                            </FormControl>
                        ) : null
                    }
                </Paper>
            </Grid>
        );
    }
}

CompareForm.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectDefaultDataset: PropTypes.func.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    compareOption: PropTypes.bool.isRequired,
    selectedDefaultDatasetZones: PropTypes.array.isRequired,
    selectedDefaultDatasetCompareZones: PropTypes.number.isRequired,
    selectDatasetCompareZones: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(CompareForm);