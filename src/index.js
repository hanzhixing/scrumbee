import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
