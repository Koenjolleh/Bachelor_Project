import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Styles
import { styles } from './styles';

class DatasetsForm extends Component {
    state = {
        datasets: [],
        datasetSelectedDefault: 0,
        datasetSelectedCompare: 0,
        checked: false
    }

    componentDidMount(){
        const { selectedLocation, compareOption, selectedDataset } = this.props;

        if(selectedDataset.length === 0){
            const datasetsLocation = selectedLocation[0].datasets.map(ds => { return ds.id_dataset; });
            const lastDataset = Math.max(...datasetsLocation);     
            
            this.setState({
                datasets:  selectedLocation[0].datasets,
                datasetSelectedDefault: lastDataset,
                checked: compareOption
            });
        } else if(selectedDataset.length > 0){
            this.setState({
                datasets:  selectedLocation[0].datasets,
                datasetSelectedDefault: selectedDataset[0],
                checked: compareOption
            });
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { checked, datasets, datasetSelectedDefault, datasetSelectedCompare } = this.state;
        const { idForm, selectedDatasetCompare } = this.props;
        let datasetSelected = [];

        if(checked !== prevState.checked){
            this.props.compareIsActive(checked, idForm);
            if(checked === true){
                if(selectedDatasetCompare === 0){
                    let compareDataset = datasets.filter(f => { return f.id_dataset !== datasetSelectedDefault; }).map(d => { return d.id_dataset; });
                    compareDataset = Math.max(...compareDataset);
                    this.props.selectDatasetCompare(compareDataset, idForm);
                    this.setState({
                        datasetSelectedCompare: compareDataset
                    });
                } else if(selectedDatasetCompare > 0){
                    this.setState({
                        datasetSelectedCompare: selectedDatasetCompare
                    });
                }
            } else if(checked === false){
                datasetSelected = [datasetSelectedDefault];
                this.props.selectDefaultDataset(datasetSelected, idForm);
                this.props.selectDatasetCompare(0, idForm);
                this.setState({
                    datasetSelectedCompare: 0
                });
            }
        } else if(datasetSelectedDefault !== prevState.datasetSelectedDefault || datasetSelectedCompare !== prevState.datasetSelectedCompare){
            if(checked === true){
                datasetSelected = [datasetSelectedDefault, datasetSelectedCompare];
                this.props.selectDefaultDataset(datasetSelected, idForm);
                this.props.selectDatasetCompare(datasetSelectedCompare, idForm);
            } else {
                datasetSelected = [datasetSelectedDefault];
                this.props.selectDefaultDataset(datasetSelected, idForm);
                this.props.selectDatasetCompare(0, idForm);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedLocation, compareOption, selectedService } = this.props;
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
        if(selectedService !== nextProps.selectedService){
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
        const { classes, selectedService } = this.props;

        return (          
            <Fragment>
                {  
                    selectedService !== 3 &&
                    <Fragment>
                    {
                        datasets.length > 1 &&
                        <div className={classes.containerCheckBoxDatasetsForm}>
                            <FormControlLabel
                                className={classes.formRow}
                                control={
                                    <Checkbox 
                                        name="compare" 
                                        checked={checked} 
                                        onChange={this.handleCheckbox} 
                                        value="1" 
                                        className={classes.checkBoxDatasetsForm} 
                                    />
                                }
                                label="Compare?"
                            />
                        </div>
                    }
                    </Fragment>
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
            </Fragment>
        );
    }
}

DatasetsForm.propTypes = {
    classes: PropTypes.object.isRequired,
    selectedLocation: PropTypes.array.isRequired,
    selectDefaultDataset: PropTypes.func.isRequired,
    idForm: PropTypes.number.isRequired,
    compareIsActive: PropTypes.func.isRequired,
    compareOption: PropTypes.bool.isRequired,
    selectedService: PropTypes.number.isRequired,
    selectedDataset: PropTypes.array.isRequired,
    selectDatasetCompare: PropTypes.func.isRequired,
    selectedDatasetCompare: PropTypes.number.isRequired
};

export default withStyles(styles, { withTheme: true })(DatasetsForm);