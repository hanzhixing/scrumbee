/* eslint-disable */
import {createRef} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {NavLink} from 'react-router-dom';
import IconProject from 'open-iconic/svg/project.svg';
import IconVerticalAlignTop from 'open-iconic/svg/vertical-align-top.svg';
import IconPerson from 'open-iconic/svg/person.svg';
import IconPieChart from 'open-iconic/svg/pie-chart.svg';
import IconPeople from 'open-iconic/svg/people.svg';
import IconFlag from 'open-iconic/svg/flag.svg';
import cx from './index.m.scss';

const Menu = () => {
    const $ref = createRef();

    const handleClickMenu = () => {
        $ref.current.checked = false;
    };

    return (
        <OutsideClickHandler onOutsideClick={handleClickMenu}>
            <nav className={cx('menu')}>
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
                <NavLink to="/god-view" className={cx('menu-item', 'item-2')} onClick={handleClickMenu}>
                    <IconVerticalAlignTop className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-3')} onClick={handleClickMenu}>
                    <IconPerson className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-4')} onClick={handleClickMenu}>
                    <IconPeople className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-5')} onClick={handleClickMenu}>
                    <IconFlag className={cx('menu-icon')} />
                </NavLink>
                <NavLink to="/god-view" className={cx('menu-item', 'item-6')} onClick={handleClickMenu}>
                    <IconPieChart className={cx('menu-icon')} />
                </NavLink>
            </nav>
        </OutsideClickHandler>
    )
};

export default Menu;
