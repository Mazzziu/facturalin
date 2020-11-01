import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import themeJSON from './theme.json';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
const tema = createMuiTheme(themeJSON);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={tema}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

