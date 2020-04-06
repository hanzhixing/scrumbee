import React from 'react';
import Color from 'color';
import cx from './index.module.scss';

const getStyle = ({color}) => ({
    background: color,
    borderBottom: `5px solid ${Color(color).darken(0.7)}`
});

export default ({members}) => (
    <div>
        <ul className={cx('row')}>
            {
                members.map(({id, realname, color}) => (
                    <li key={id} className={cx('box')} style={getStyle({color})}>
                        {realname}
                    </li>
                ))
            }
        </ul>
    </div>
);
