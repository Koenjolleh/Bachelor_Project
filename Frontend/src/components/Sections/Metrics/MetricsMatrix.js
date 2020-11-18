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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Cancel } from '@material-ui/icons';
import ForwardIcon from '@material-ui/icons/Forward';

// Components
import Spinner from '../../Commons/Spinner';

// Styles
import { styles } from './styles';

class MetricsMatrix extends Component { 
    state = {
        data: [],
        openModal: false,
        potentialGain: [
            'On an average week 412 customers wait more than 5 minutes. From experience this leads to walk-outs, appr. 5/hour. With an average transaction of 60kr/customer monthly potential increase in revenue is 98.880DKK. We target a 50% reduction in number of customers waiting more than 5 minutes.', 
            'if we target 10 pct. of the commuters, it represents 337 new weekly customers.  With an average transaction of 60kr/customer monthly potential increase in revenue is DKK 80.880.', 
            'From hour 18 til 22 1055 people pass the store. If we target 10%, we have an hourly extra revenue of DKK 1500 , assuming average transaction price of DKK60. Monthly potential increase in revenue is DKK 24.000.', 
            '', '', '', '', '', '', '', ''],
        potentialGainDisable: [true, true, true, true, true, true, true, true, true, true, true],
        youraction: [
            { checked: false, value: 0 }, 
            { checked: false, value: 1 }, 
            { checked: false, value: 2 }, 
            { checked: false, value: 3 },
            { checked: false, value: 4 },
            { checked: false, value: 5 },
            { checked: false, value: 6 },
            { checked: false, value: 7 },
            { checked: false, value: 8 },
            { checked: false, value: 9 },
            { checked: false, value: 10 },
        ],
        myaction: [
            { checked: false, value: 0 }, 
            { checked: false, value: 1 }, 
            { checked: false, value: 2 }, 
            { checked: false, value: 3 },
            { checked: false, value: 4 },
            { checked: false, value: 5 },
            { checked: false, value: 6 },
            { checked: false, value: 7 },
            { checked: false, value: 8 },
            { checked: false, value: 9 },
            { checked: false, value: 10 },
        ],
        isDisableYourAction: [false, false, false, false, false, false, false, false, false, false, false],
        isDisableMyAction: [false, false, false, false, false, false, false, false, false, false, false],
        myNewAction: ['', '', '', '', '', '', '', '', '', '', ''],
        myNewActionDisable: [false, false, false, false, false, false, false, false, false, false, false],
        timeSelected: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        listTime: [
            { id: 0, textValue: 'Select Time' },
            { id: 1, textValue: '1 month trial' },
            { id: 2, textValue: '2 months trial' },
            { id: 3, textValue: '3 months trial' },
            { id: 4, textValue: '4 months trial' },
        ],
        header: [
            { id: 1, name: 'Insights' },
            { id: 2, name: 'Potential Gain' },
            { id: 3, name: 'Actions' },
            { id: 4, name: 'Your Actions' },
            { id: 5, name: 'Time' },
            { id: 6, name: 'Results' },
            { id: 7, name: 'Learnings' }
        ],
        isSuccess: [null, null, null, null, null, null, null, null, null, null, null],
        learnings: ['', '', '', '', '', '', '', '', '', '', ''],
        learningsDisable: [false, false, false, false, false, false, false, false, false, false, false],
        newInsight: '',
        incompleteInsights: [
            // { id: 0, id_insight: 0, action: '', timeSelected: 0, result: 'xcv', learnings: '', actionDisable: false, isSuccess: null, learningsDisable: false },
            // { id: 1, id_insight: 0, action: '', timeSelected: 0, result: 'xcv', learnings: '', actionDisable: false, isSuccess: null, learningsDisable: false },
            // { id: 0, id_insight: 2, action: 'asd', timeSelected: 0, result: 'xcv', learnings: '', actionDisable: false, isSuccess: null, learningsDisable: false },
            // { id: 1, id_insight: 2, action: 'asd', timeSelected: 0, result: 'xcv', learnings: '', actionDisable: false, isSuccess: null, learningsDisable: false },
        ]
    };

    componentDidMount(){
        const { data } = this.props;
        this.setState({
            data: data
        });
    }

    handlePotentialGain = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        const potentialGain = [...this.state.potentialGain];
        potentialGain[id] = value
        this.setState({
            potentialGain: potentialGain
        });
    }

    savePotentialGain = (id, event) => {
        event.preventDefault();
        const potentialGainDisable = [...this.state.potentialGainDisable];
        potentialGainDisable[id] = true;

        this.setState({
            potentialGainDisable: potentialGainDisable
        });
    }

    editPotentialGain = (id, event) => {
        event.preventDefault();
        const potentialGainDisable = [...this.state.potentialGainDisable];
        potentialGainDisable[id] = false;
        this.setState({
            potentialGainDisable: potentialGainDisable
        });
    }

    handleChangeYourAction = (event) => {
        // const name = event.target.name;
        const checked = event.target.checked;
        const value = parseInt(event.target.value,10);
        const newYourAction = [...this.state.youraction];
        const newIsDisableMyAction = [...this.state.isDisableMyAction];
        newYourAction[value].checked = checked;
        newYourAction[value].value = value;
        newIsDisableMyAction[value] = !newIsDisableMyAction[value];

        this.setState({ 
            youraction: newYourAction,
            isDisableMyAction: newIsDisableMyAction
        });
    }

    handleChangeMyAction = (event) => {
        // const name = event.target.name;
        const checked = event.target.checked;
        const value = parseInt(event.target.value,10);
        const newMyAction = [...this.state.youraction];
        const newIsDisableYourAction = [...this.state.isDisableYourAction];
        newMyAction[value].checked = checked;
        newMyAction[value].value = value;
        newIsDisableYourAction[value] = !newIsDisableYourAction[value];
        
        this.setState({ 
            myaction: newMyAction,
            isDisableYourAction: newIsDisableYourAction
        });
    }

    handleMyNewAction = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        const myNewAction = [...this.state.myNewAction];
        myNewAction[id] = value
        this.setState({
            myNewAction: myNewAction,
        })
    }

    saveMyAction = (id, event) => {
        event.preventDefault();
        const myNewActionDisable = [...this.state.myNewActionDisable];
        myNewActionDisable[id] = true;

        this.setState({
            myNewActionDisable: myNewActionDisable
        });
    }

    editMyAction = (id, event) => {
        event.preventDefault();
        const myNewActionDisable = [...this.state.myNewActionDisable];
        myNewActionDisable[id] = false;
        this.setState({
            myNewActionDisable: myNewActionDisable
        });
    }

    handleExecutionTime = (event) => {
        const value = event.target.value;
        const id = event.target.name;
        const timeSelected = [...this.state.timeSelected];
        timeSelected[id] = value;

        this.setState({ timeSelected: timeSelected });
    };

    handleResultSuccess = (id, event) => {
        event.preventDefault();
        const isSuccess = [...this.state.isSuccess];
        isSuccess[id] = true;
        this.setState({ isSuccess: isSuccess });
    }

    handleResultFailure = (id, event) => {
        event.preventDefault();
        const isSuccess = [...this.state.isSuccess];
        isSuccess[id] = false;
        this.setState({ isSuccess: isSuccess });
    }

    handleModal = () => {
        this.setState((prevState) => ({
            openModal: !prevState.openModal
        }));
    }

    handleChangeNewInsight = name => event => {
        this.setState({ [name]: event.target.value });
    };

    addNewInsight = (event) => {
        event.preventDefault();
        const { newInsight, data } = this.state;
        const id = data.length;
        const newObject = {
            id,
            insight: newInsight, 
            actionTitle: '',
            actionResult: [],
            result: `example result ${id}`,
            learnings: ''
        }
        this.setState({ 
            data: [...data, newObject], 
            openModal: false, 
            newInsight: '' 
        });
    }

    handleLearnings = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        const learnings = [...this.state.learnings];
        learnings[id] = value
        this.setState({ learnings: learnings });
    }

    saveLearnings = (id, event) => {
        event.preventDefault();
        const learningsDisable = [...this.state.learningsDisable];
        learningsDisable[id] = true;
        let incompleteInsightsLength = this.state.incompleteInsights.filter(f => { return f.id_insight === id; }).length;
        let newIncompletedInsight = {};

        if(incompleteInsightsLength > 0){
            this.setState({ learningsDisable: learningsDisable });
        } else{
            if(this.state.isSuccess[id] === false){
                newIncompletedInsight = { 
                    id: 0, id_insight: id, action: '', timeSelected: 0, result: 'example result 0', learnings: '', 
                    actionDisable: false, isSuccess: null, learningsDisable: false 
                };
                this.setState({ 
                    learningsDisable: learningsDisable, 
                    incompleteInsights: [...this.state.incompleteInsights, newIncompletedInsight] 
                });
            } else{
                this.setState({ learningsDisable: learningsDisable });
            }
        }
                
    }

    editLearnings = (id, event) => {
        event.preventDefault();
        const learningsDisable = [...this.state.learningsDisable];
        learningsDisable[id] = false;
        this.setState({ learningsDisable: learningsDisable });
    }
    /*********************************************/
    /*** START FUNCTIONS INCOMPLETED INSIGHTS ***/
    /*******************************************/
// { id: 0, id_insight: 2, action: 'asd', timeSelected: 0, result: 'xcv', learnings: '', actionDisable: false, 
//   isSuccess: null, learningsDisable: false },
    handleIncompletedAction = (id_insight, event) => {
        const id = parseInt(event.target.id,10);
        const value = event.target.value;
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].action = value;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    saveIncompletedAction = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].actionDisable = true;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    editIncompletedAction = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].actionDisable = false;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    handleIncompletedTime = (id_insight, event) => {
        const value = event.target.value;
        const id = parseInt(event.target.name,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].timeSelected = value;
        this.setState({ incompleteInsights: incompleteInsights });
    };

    handleIncompletedResultSuccess = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].isSuccess = true;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    handleIncompletedResultFailure = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].isSuccess = false;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    handleIncompletedLearnings = (id_insight, event) => {
        const id = parseInt(event.target.id,10);
        const value = event.target.value;
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].learnings = value;
        this.setState({ incompleteInsights: incompleteInsights });
    }

    saveIncompletedLearnings = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        let incompleteInsightsLength = incompleteInsights.filter(f => { return f.id_insight === id_insight }).length;
        incompleteInsights[index].learningsDisable = true;
        let newIncompletedInsight = {};
        const newId = id + 1;

        if(incompleteInsights[index].isSuccess === false){
            if(id === incompleteInsightsLength - 1){
                newIncompletedInsight = { 
                    id: newId, id_insight: id_insight, action: '', timeSelected: 0, result: `example result ${id+1}`, learnings: '', 
                    actionDisable: false, isSuccess: null, learningsDisable: false 
                };
                this.setState({ incompleteInsights: [...this.state.incompleteInsights, newIncompletedInsight] });
            } else {
                this.setState({ incompleteInsights: incompleteInsights });
            }
        } else{
            this.setState({ incompleteInsights: incompleteInsights });
        }
    }

    editIncompletedLearnings = (id_insight, event) => {
        event.preventDefault();
        const id = parseInt(event.currentTarget.id,10);
        const incompleteInsights = [...this.state.incompleteInsights];
        const index = incompleteInsights.findIndex(f => f.id_insight === id_insight && f.id === id );
        incompleteInsights[index].learningsDisable = false;
        this.setState({ incompleteInsights: incompleteInsights });
    }
    /*********************************************/
    /*** END FUNCTIONS INCOMPLETED INSIGHTS ***/
    /*******************************************/

    render(){
        const { classes } = this.props;
        const { data, youraction, myaction, isDisableYourAction, isDisableMyAction, myNewAction, myNewActionDisable, 
                listTime, timeSelected, header, isSuccess, openModal, newInsight, potentialGain, potentialGainDisable,
                learnings, learningsDisable, incompleteInsights } = this.state;
        
        if(data.length === 0){
            return (
                <Spinner size={80} />
            );
        }
        return (
            <Fragment>

                {/* START MODAL */}
                <Fragment>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openModal}
                        onClose={this.handleModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                            className: classes.backdrop
                        }}
                    >
                        <Fade in={openModal}>
                            <div className={classes.modalPaper}>
                                <Cancel className={classes.modalIcon} onClick={this.handleModal} />
                                <Typography variant="h4" component="h2">
                                    Add new Insight
                                </Typography>
                                <br />
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={this.addNewInsight}>
                                    <TextField 
                                        id="newInsight"
                                        label="Insight"
                                        placeholder="Insight"
                                        fullWidth
                                        multiline={true}
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                            className: classes.input,
                                            classes: { 
                                                disabled: classes.input ,
                                                notchedOutline: classes.notchedOutline
                                            }
                                        }}
                                        variant="filled"
                                        value={newInsight}
                                        onChange={this.handleChangeNewInsight('newInsight')}
                                    />
                                    <Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>
                                </form>
                            </div>
                        </Fade>
                    </Modal>
                </Fragment>
                {/* END MODAL */}

                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                        {
                            header.map((th) => {
                                return( th.id === 1 ? 
                                        <TableCell className={classes.tableCell} key={th.id} align="left" style={{ width: '14%' }}>
                                            {th.name} 
                                            <Tooltip title="Add new Insight">
                                                <IconButton aria-label="add" onClick={this.handleModal}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        : 
                                        <TableCell className={classes.tableCell} key={th.id} align="left" style={{ width: '14%' }}>{th.name}</TableCell>
                                )
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        data.map(row => (
                            <Fragment>
                            <TableRow key={row.id} className={classes.tableRow}>
                                <TableCell className={classes.tableCell} align="left" rowSpan={ incompleteInsights.filter(f => { return f.id_insight === row.id; }).length + 1 }>{row.insight}</TableCell>
                                <TableCell className={classes.tableCell} align="left" rowSpan={ incompleteInsights.filter(f => { return f.id_insight === row.id; }).length + 1 }>
                                    <form className={classes.form} noValidate autoComplete="off">
                                        <TextField 
                                            id={`${row.id}`}
                                            name={`potentialGain${row.id}`}
                                            label="Potential Gain" 
                                            variant="outlined" 
                                            multiline={true} 
                                            value={potentialGain[row.id]} 
                                            onChange={this.handlePotentialGain} 
                                            disabled={potentialGainDisable[row.id]}
                                            className={classes.textField}
                                            InputProps={{
                                                className: classes.input,
                                                classes: { 
                                                    disabled: classes.input ,
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {
                                            potentialGainDisable[row.id] === false ?
                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.savePotentialGain(row.id, event)}>
                                                Save
                                            </Button> : null
                                        }
                                        {
                                            potentialGainDisable[row.id] === true ?
                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.editPotentialGain(row.id, event)}>
                                                Edit
                                            </Button> : null
                                        }
                                    </form>
                                </TableCell>
                                <TableCell className={classes.tableCell} align="left" style={{ textAlign: row.actionResult.length === 0 ? 'center' : 'left' }}>
                                {
                                    row.actionResult.length === 0 && <ForwardIcon style={{ fontSize: 30 }} /> 
                                }
                                {
                                    row.actionResult.length > 0 &&
                                    <Fragment>
                                        {row.actionTitle}
                                        <List className={classes.list}>
                                        {
                                            row.actionResult.map((r, index) => { 
                                                return (
                                                    <ListItem key={index} className={classes.list}>
                                                        {r}
                                                    </ListItem>
                                                )
                                            })
                                        }
                                        </List>
                                    </Fragment>
                                }

                                </TableCell>
                                <TableCell className={classes.tableCell} align="left">
                                    {
                                        isDisableYourAction[row.id] === false && row.actionResult.length > 0 ?
                                            <FormControlLabel
                                                className={classes.formRow}
                                                label="Follow suggestion"
                                                control={
                                                    <Checkbox name={`youraction${row.id}`} checked={youraction[row.id].checked} onChange={this.handleChangeYourAction} value={`${row.id}`} className={classes.checkBox} />
                                                }
                                            /> : null
                                    }
                                    {
                                        isDisableMyAction[row.id] === false && row.actionResult.length > 0?
                                            <FormControlLabel
                                                className={classes.formRow}
                                                label="Do something else?"
                                                control={
                                                    <Checkbox name={`myaction${row.id}`} checked={myaction[row.id].checked} onChange={this.handleChangeMyAction} value={`${row.id}`} className={classes.checkBox} />
                                                }
                                            /> : null
                                    }
                                    {
                                        isDisableYourAction[row.id] === true && row.actionResult.length > 0 ?
                                            <form className={classes.form} noValidate autoComplete="off">
                                                <TextField 
                                                    id={`${row.id}`}
                                                    name={`myNewAction${row.id}`}
                                                    label="Action" 
                                                    variant="outlined" 
                                                    multiline={true} 
                                                    value={myNewAction[row.id]} 
                                                    onChange={this.handleMyNewAction} 
                                                    disabled={myNewActionDisable[row.id]}
                                                    className={classes.textField}
                                                    InputProps={{
                                                        className: classes.input,
                                                        classes: { 
                                                            disabled: classes.input ,
                                                            notchedOutline: classes.notchedOutline
                                                        }
                                                    }}
                                                />
                                                {
                                                    myNewActionDisable[row.id] === false ?
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.saveMyAction(row.id, event)}>
                                                        Save
                                                    </Button> : null
                                                }
                                                {
                                                    myNewActionDisable[row.id] === true ?
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.editMyAction(row.id, event)}>
                                                        Edit
                                                    </Button> : null
                                                }
                                            </form>
                                            : null

                                    }
                                    {
                                        row.actionResult.length === 0 ?
                                            <form className={classes.form} noValidate autoComplete="off">
                                            <TextField 
                                                id={`${row.id}`}
                                                name={`myNewAction${row.id}`}
                                                label="Action" 
                                                variant="outlined" 
                                                multiline={true} 
                                                value={myNewAction[row.id]} 
                                                onChange={this.handleMyNewAction} 
                                                disabled={myNewActionDisable[row.id]}
                                                className={classes.textField}
                                                InputProps={{
                                                    className: classes.input,
                                                    classes: { 
                                                        disabled: classes.input ,
                                                        notchedOutline: classes.notchedOutline
                                                    }
                                                }}
                                            />
                                            {
                                                myNewActionDisable[row.id] === false ?
                                                <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.saveMyAction(row.id, event)}>
                                                    Save
                                                </Button> : null
                                            }
                                            {
                                                myNewActionDisable[row.id] === true ?
                                                <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.editMyAction(row.id, event)}>
                                                    Edit
                                                </Button> : null
                                            }
                                        </form>
                                        : null
                                    }
                                </TableCell>
                                <TableCell className={classes.tableCell} align="left">
                                    <Select
                                        labelid="executionTime"
                                        id="executionTime"
                                        name={`${row.id}`}
                                        value={timeSelected[row.id]}
                                        onChange={this.handleExecutionTime}
                                        className={classes.select}
                                    >    
                                        { 
                                            listTime.map(d => {
                                                return <MenuItem key={d.id} value={d.id}>{d.textValue}</MenuItem>;
                                            }) 
                                        }
                                    </Select>
                                </TableCell>
                                <TableCell className={classes.tableCell} align="left">
                                {
                                    row.result !== '' ?
                                    <Fragment>
                                        {row.result}
                                        <form className={classes.formResult} noValidate autoComplete="off">
                                        {
                                            isSuccess[row.id] === null ?
                                                <Fragment>
                                                    <Button  variant="contained" color="primary" className={classes.buttonResultFailure} onClick={(event) => this.handleResultFailure(row.id, event)}>
                                                        No
                                                    </Button>
                                                    <Button  variant="contained" color="secondary" className={classes.buttonResultSuccess} onClick={(event) => this.handleResultSuccess(row.id, event)}>
                                                        Yes
                                                    </Button>
                                                </Fragment> : null
                                        }                                 
                                        </form>
                                        {
                                            isSuccess[row.id] === true ?
                                            <div className={classes.iconContainer}><ThumbUpIcon className={classes.iconSuccess}/></div> : null
                                        }   
                                        {
                                            isSuccess[row.id] === false ?
                                            <div className={classes.iconContainer}><ThumbDownIcon className={classes.iconFailure}/></div> : null
                                        } 
                                    </Fragment> : null
                                }
                                </TableCell>
                                <TableCell className={classes.tableCell} align="left">
                                {
                                    isSuccess[row.id] !== null ?
                                    <form className={classes.form} noValidate autoComplete="off">
                                        <TextField 
                                            id={`${row.id}`}
                                            name={`learnings${row.id}`}
                                            label="Learnings" 
                                            variant="outlined" 
                                            multiline={true} 
                                            value={learnings[row.id]} 
                                            onChange={this.handleLearnings} 
                                            disabled={learningsDisable[row.id]}
                                            className={classes.textField}
                                            InputProps={{
                                                className: classes.input,
                                                classes: { 
                                                    disabled: classes.input ,
                                                    notchedOutline: classes.notchedOutline
                                                }
                                            }}
                                        />
                                        {
                                            learningsDisable[row.id] === false ?
                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.saveLearnings(row.id, event)}>
                                                {
                                                    learnings[row.id].length === 0 && 'Add learnings'
                                                }
                                                {
                                                    learnings[row.id].length > 0 && isSuccess[row.id] === true && 'Save'
                                                }
                                                {
                                                    learnings[row.id].length > 0 && isSuccess[row.id] === false && 'Save & new action'
                                                }
                                            </Button> : null
                                        }
                                        {
                                            learningsDisable[row.id] === true ?
                                            <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.editLearnings(row.id, event)}>
                                                Edit
                                            </Button> : null
                                        }
                                    </form>
                                    : null
                                }
                                </TableCell> 
                            
                            {/* START INCOMPLETED INSIGHTS  */}
                            </TableRow>
                            {
                                incompleteInsights.length > 0 &&
                                    <Fragment>
                                    {
                                        incompleteInsights.filter(f => { return f.id_insight === row.id; }).map(i => {
                                            return(
                                                <TableRow key={i.id}>
                                                    <TableCell className={classes.tableCell} align="left">
                                                        <form className={classes.form} noValidate autoComplete="off">
                                                            <TextField 
                                                                id={`${i.id}`}
                                                                name={`action${i.id}`}
                                                                label="Action" 
                                                                variant="outlined" 
                                                                multiline={true} 
                                                                value={i.action} 
                                                                onChange={(event) => this.handleIncompletedAction(i.id_insight, event)} 
                                                                disabled={i.actionDisable}
                                                                className={classes.textField}
                                                                InputProps={{
                                                                    className: classes.input,
                                                                    classes: { 
                                                                        disabled: classes.input ,
                                                                        notchedOutline: classes.notchedOutline
                                                                    }
                                                                }}
                                                            />
                                                            {
                                                                i.actionDisable === false ?
                                                                <Button variant="contained" color="primary" id={i.id} className={classes.button} onClick={(event) => this.saveIncompletedAction(i.id_insight, event)}>
                                                                    Save
                                                                </Button> : null
                                                            }
                                                            {
                                                                i.actionDisable === true ?
                                                                <Button variant="contained" color="primary" id={i.id} className={classes.button} onClick={(event) => this.editIncompletedAction(i.id_insight, event)}>
                                                                    Edit
                                                                </Button> : null
                                                            }
                                                        </form>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} align="left" style={{ textAlign: 'center' }}>
                                                        <ForwardIcon style={{ fontSize: 30 }} />
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} align="left">
                                                        <Select
                                                            labelid="executionTime"
                                                            id="executionTime"
                                                            name={`${i.id}`}
                                                            value={i.timeSelected}
                                                            onChange={(event) => this.handleIncompletedTime(i.id_insight, event)}
                                                            className={classes.select}
                                                        >    
                                                            { 
                                                                listTime.map(d => {
                                                                    return <MenuItem key={d.id} value={d.id}>{d.textValue}</MenuItem>;
                                                                }) 
                                                            }
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} align="left">
                                                    {
                                                        i.result !== '' ?
                                                        <Fragment>
                                                            {i.result}
                                                            <form className={classes.formResult} noValidate autoComplete="off">
                                                            {
                                                                i.isSuccess === null ?
                                                                    <Fragment>
                                                                        <Button  variant="contained" color="primary" id={i.id} className={classes.buttonResultFailure} onClick={(event) => this.handleIncompletedResultFailure(i.id_insight, event)}>
                                                                            No
                                                                        </Button>
                                                                        <Button  variant="contained" color="secondary" id={i.id} className={classes.buttonResultSuccess} onClick={(event) => this.handleIncompletedResultSuccess(i.id_insight, event)}>
                                                                            Yes
                                                                        </Button>
                                                                    </Fragment> : null
                                                            }                                 
                                                            </form>
                                                            {
                                                                i.isSuccess === true ?
                                                                <div className={classes.iconContainer}><ThumbUpIcon className={classes.iconSuccess}/></div> : null
                                                            }   
                                                            {
                                                                i.isSuccess === false ?
                                                                <div className={classes.iconContainer}><ThumbDownIcon className={classes.iconFailure}/></div> : null
                                                            } 
                                                        </Fragment> : null
                                                    }
                                                    </TableCell>
                                                    <TableCell className={classes.tableCell} align="left">
                                                    {
                                                        i.isSuccess !== null ?
                                                        <form className={classes.form} noValidate autoComplete="off">
                                                            <TextField 
                                                                id={`${i.id}`}
                                                                name={`learnings${i.id}`}
                                                                label="Learnings" 
                                                                variant="outlined" 
                                                                multiline={true} 
                                                                value={i.learnings} 
                                                                onChange={(event) => this.handleIncompletedLearnings(i.id_insight, event)} 
                                                                disabled={i.learningsDisable}
                                                                className={classes.textField}
                                                                InputProps={{
                                                                    className: classes.input,
                                                                    classes: { 
                                                                        disabled: classes.input ,
                                                                        notchedOutline: classes.notchedOutline
                                                                    }
                                                                }}
                                                            />
                                                            {
                                                                i.learningsDisable === false ?
                                                                <Button variant="contained" color="primary" id={i.id} className={classes.button} onClick={(event) => this.saveIncompletedLearnings(i.id_insight, event)}>
                                                                    {
                                                                        i.learnings.length === 0 && 'Add learnings'
                                                                    }
                                                                    {
                                                                        i.learnings.length > 0 && i.isSuccess === true && 'Save'
                                                                    }
                                                                    {
                                                                        i.learnings.length > 0 && i.isSuccess === false && 'Save & new action'
                                                                    }
                                                                </Button> : null
                                                            }
                                                            {
                                                                i.learningsDisable === true ?
                                                                <Button variant="contained" color="primary" id={i.id} className={classes.button} onClick={(event) => this.editIncompletedLearnings(i.id_insight, event)}>
                                                                    Edit
                                                                </Button> : null
                                                            }
                                                        </form>
                                                        : null
                                                    }
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                    </Fragment>
                            }
                         </Fragment>
                        ))
                    }
                    </TableBody>
                </Table>
                </Paper>
            </Fragment>
        );
    }
}

MetricsMatrix.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(withRouter(MetricsMatrix));