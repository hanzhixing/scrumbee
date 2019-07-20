import {hot} from 'react-hot-loader/root';
import {Switch, Route, Redirect, NavLink} from 'react-router-dom';
import loadable from '@loadable/component';
import Menu from '../Menu';
import Logo from '../Logo';
import cx from './index.m.scss';

const Index = () => (
    <div className={cx('root')}>
        <Logo />
        <Menu />
    </div>
);

export default hot(Index);
