import {hot} from 'react-hot-loader/root';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import loadable from '@loadable/component';
import Menu from '../Menu';
import Logo from '../Logo';
import GithubCat from './GithubCat.svg';
import GodView from '../GodView';
import cx from './index.m.scss';

const App = () => (
    <div className={cx('root')}>
        <header className={cx('header')}>
            <Logo />
            <GithubCat />
        </header>
        <Menu />
        <Switch>
            <Route path="/god-view" component={GodView} />
        </Switch>
    </div>
);

export default hot(App);
