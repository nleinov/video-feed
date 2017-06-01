import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';

// A configuration for fixing react-youtube plugin http vs https warnings.
window.YTConfig = {
	host: 'https://www.youtube.com' 
} 

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
