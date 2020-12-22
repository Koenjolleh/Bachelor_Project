import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { styles } from './styles';

import {withRouter} from "react-router-dom";
import { getDashboard } from "../../../redux/actions/dashboard.action";
import DashboardMain from "./DashboardMain";
import DashboardDetail from "./DashboardDetail";
import CenterPanel from "../../Commons/CenterPanel";
import Spinner from "../../Commons/Spinner";
// Material UI
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Error from '@material-ui/icons/Error';

class Dashboard extends Component {

    constructor(probs){
        super(probs);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.state = {
            detailActive: false,
            dataSelected: []
        };
    }

    componentDidMount() {
        const { userInfo, isAuthenticated, getDashboard } = this.props;
        if(isAuthenticated){
            getDashboard(userInfo.id_user);
        };
    }

    handleOnClick(e, id_location){
        // I have no idea how but apparantly it clears the true state when the site is reloaded. Does it call constructor each time?
        const dataSelected = this.props.dashboardData.filter( d => d.id_location === id_location);
        this.setState({
            dataSelected,
            detailActive: true
        })
    }

    handleClearClick(e){
        this.setState({
            dataSelected: [],
            detailActive: false
        })
    }


    // Get all the dashboard data when using get dashboard not just for the first 4 topic.
    // Should be better to just do a conditional rendering and switch between spefic or overall dashboard based on a boolean state
    // in dashboard item send the selected id_location to a state which then determines which information will be rendered 
    // in the specific dashboard componenet
    render() {

        if (this.props.dashboardData.length === 0  && this.props.errorInfo.status === null) {
            return (
                <CenterPanel spinner={true}>
                    <Spinner size={80}/>
                </CenterPanel>
            )
        } else if(this.props.errorInfo.status === 404 && this.props.dashboardData.length === 0){
            return (
              <CenterPanel spinner={true}>
                <div className={this.props.classes.paperContainer}>
                    <div className={this.props.classes.paperError}>
                        <Icon className={this.props.classes.iconContainer}>
                            <Error className={this.props.classes.icon} />
                        </Icon>
                    </div>
                </div>
                <Typography className={this.props.classes.typographyError}>{this.props.errorInfo.msg}</Typography>
              </CenterPanel>
            );
          } 
        else {
            return(
                this.state.detailActive ? 
                    <DashboardDetail data={this.state.dataSelected} handleClearClick={this.handleClearClick}/>
                    :
                    <DashboardMain
                        data={this.props.dashboardData}
                        handleShowDetails={this.handleShowDetails}
                        handleOnClick={this.handleOnClick}
                    />
            )
        }
    }
}

const mapStateToProps = state => ({
    dashboardData: state.dashboard.dashboardData,
    isAuthenticated: state.auth.isAuthenticated,
    errorInfo: state.error,
    userInfo: state.auth.user
});


export default connect(mapStateToProps, { getDashboard })(withStyles(styles, { withTheme: true })(withRouter(Dashboard)));