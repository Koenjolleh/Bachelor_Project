import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


// Components
import Spinner from '../../Commons/Spinner';

// Styles
import { styles } from './styles';

class MetricsMatrix2 extends Component { 
    state = {
        data: [],
        header: [
            { id: 1, name: 'Insights' }
        ]
    };

    componentDidMount(){
        const { data } = this.props;
        this.setState({
            data: data
        });
    }

    render(){
        const { classes } = this.props;
        const { data, header } = this.state;
        
        if(data.length === 0){
            return (
                <Spinner size={80} />
            );
        }
        return (
            <Fragment>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                        {
                            header.map((th) => {
                                return( <TableCell className={classes.tableCell} key={th.id} align="left">{th.name}</TableCell>)
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        data.map(row => (
                            <TableRow key={row.id} className={classes.tableRow}>
                                <TableCell className={classes.tableCell} align="left">{row.insight}</TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
                </Paper>
            </Fragment>
        );
    }
}

MetricsMatrix2.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(withRouter(MetricsMatrix2));