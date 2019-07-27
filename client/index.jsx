import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import history from './history';
import fixpath from './fixpath';
import store from './store';
import Index from './components';

import './index.m.scss';

fixpath();

const root = document.createElement('div');

root.setAttribute('id', 'react-root');

document.body.appendChild(root);

render(
    <Provider store={store}>
        <Router history={history}>
            <Index />
        </Router>
    </Provider>,
    root
);