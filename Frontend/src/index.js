import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './index.css';
import App from './App';
import { theme } from './theme';

ReactDOM.render(
<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));