/* eslint-disable */
import React, {createRef} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {NavLink} from 'react-router-dom';
import {ReactComponent as GithubCat} from '../assets/github_cat.svg';
import {ReactComponent as IconProject} from 'open-iconic/svg/project.svg';
import {ReactComponent as IconVerticalAlignTop} from 'open-iconic/svg/vertical-align-top.svg';
import {ReactComponent as IconPerson} from 'open-iconic/svg/person.svg';
import {ReactComponent as IconPieChart} from 'open-iconic/svg/pie-chart.svg';
import {ReactComponent as IconPeople} from 'open-iconic/svg/people.svg';
import {ReactComponent as IconFlag} from 'open-iconic/svg/flag.svg';
import cx from './index.module.scss';

const Menu = () => {
    const $ref = createRef();

    const handleClickMenu = () => {
        $ref.current.checked = false;
    };

    return (
        <OutsideClickHandler onOutsideClick={handleClickMenu}>
            <nav className={cx('root')}>
                <input
                    type="checkbox"
                    className={cx('menu-open')}
                    id="menu-open"
                    ref={$ref}
                />
                <label className={cx('menu-open-button')} htmlFor="menu-open">
                    <span className={cx('lines', 'line-1')} />
                    <span className={cx('lines', 'line-2')} />
                    <span className={cx('lines', 'line-3')} />
                </label>
                <NavLink to="/god-view" className={cx('menu-item', 'item-1')} onClick={handleClickMenu}>
                    <IconProject className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/standup-meeting" className={cx('menu-item', 'item-2')} onClick={handleClickMenu}>
                    <IconVerticalAlignTop className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-5')} onClick={handleClickMenu}>
                    <IconFlag className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-3')} onClick={handleClickMenu}>
                    <IconPerson className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-4')} onClick={handleClickMenu}>
                    <GithubCat className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-6')} onClick={handleClickMenu}>
                    <IconPieChart className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-7')} onClick={handleClickMenu}>
                    <IconPeople className={cx('menu-icon')} />
                </NavLink>
            </nav>
        </OutsideClickHandler>
    )
};

export default Menu;
