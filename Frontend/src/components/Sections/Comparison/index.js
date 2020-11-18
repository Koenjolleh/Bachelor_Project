import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';

//Components
import ComparisonForm from './comparisonForm';
import ComparisonVisualization from './comparisonVisualization';

//Actions
import { visualizeComparisonActive } from '../../../redux/actions/comparison_options.action';

// Styles
import { styles } from './styles';


const ComparisonContainer = (props) => {

    const { classes, visualizeComparison, formData, visualizeComparisonActive } = props;
    
    return (
        <Fragment>
        {
            visualizeComparison ?
                <Fragment>
                    <Button variant="contained" color="primary" className={classes.buttonBack} onClick={visualizeComparisonActive}>
                        Back
                    </Button>
                    <div className={classes.visualizationContainer}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#212121' }}>
                            <div className={classes.chartsContainer}>
                            {
                                formData.map(data => 
                                    <ComparisonVisualization
                                        data={data}
                                    />
                                )
                            }
                            </div>
                        </div>
                    </div>
                </Fragment>
                :
                <ComparisonForm />  
        }          
        </Fragment>
    );
}

ComparisonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    visualizeComparison: PropTypes.bool.isRequired,
    formData: PropTypes.array.isRequired,
    visualizeComparisonActive: PropTypes.func.isRequired
};

function mapStateToProps({ comparison, app }) {
    return {
        visualizeComparison: comparison.visualizeComparison,
        formData: comparison.formData
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { 
    visualizeComparisonActive
})(ComparisonContainer));