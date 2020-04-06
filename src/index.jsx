import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import history from './history';
import fixpath from './fixpath';
import store from './store';
import Index from './components';
import * as serviceWorker from './serviceWorker';
import './index.m.scss';

fixpath();

render(
    <Provider store={store}>
        <Router history={history}>
            <Index />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
