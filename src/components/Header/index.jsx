import React from 'react';
import Menu from '../Menu';
import Logo from '../Logo';
import cx from './index.module.scss';

const Index = () => (
    <div className={cx('root')}>
        <Logo />
        <Menu />
    </div>
);

export default Index;
