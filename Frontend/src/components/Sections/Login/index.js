import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Actions
import { login } from '../../../redux/actions/auth.action';
import { clearErrors } from '../../../redux/actions/error.action';

// Styles
import { styles } from './styles';

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: {}
    }

    componentDidMount(){
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            this.props.history.push('/dashboard');
            this.props.clearErrors();
        }
    }

    componentDidUpdate(prevProps, prevState){
        const { isAuthenticated, error } = this.props;

        if (prevProps.isAuthenticated !== isAuthenticated) {
            if(isAuthenticated){
                this.props.history.push('/dashboard');
                this.props.clearErrors();
            }
        } else if(prevProps.error !== error){
            this.setState({ error: error });
        }
    }
    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        const user = {
            username,
            password
        };
    
        // Attempt to login
        this.props.login(user);
    };
  

    errorMessages = (errorMessage, classes) => {
        if(errorMessage === 'No auth token'){
            return null;
        } else if(errorMessage === 'jwt expired'){
            return (
                <Typography component="h1" variant="h4" className={classes.errorMsg}>
                    Session has expired
                </Typography>)
        } else {
            return (
                <Typography component="h1" variant="h4" className={classes.errorMsg}>
                    {errorMessage}
                </Typography>);
        }
    }
    

    render(){

        const { username, password, error } = this.state;
        const { classes } = this.props;

        return (
            <Grid className={classes.container}>
                <img className={classes.logo} alt="logo" src={require('../../../assets/logo.jpg')} />                
                <Paper className={classes.paperLogin}>
                    { 
                        this.errorMessages(error.msg, classes)
                    }
                    <form className={classes.form} autoComplete="off" onSubmit={this.onSubmit}>
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange('username')}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            value={password}
                            type="password"
                            autoComplete="off"
                            placeholder="Password"
                            onChange={this.handleChange('password')}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className={classes.containerButton}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Login
                            </Button>
                        </div>
                    </form>
                    <Fragment>
                        <Link to="/forgotpassword" className={classes.link}>
                            <Typography variant="h4" component="p" className={classes.forgotPassword}>
                                Forgot password?
                            </Typography>
                        </Link>
                    </Fragment>
                </Paper>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth, error }) => ({
    isAuthenticated: auth.isAuthenticated,
    error: error
});

export default connect(mapStateToProps, { login, clearErrors })(withStyles(styles, { withTheme: true })(withRouter(Login)));