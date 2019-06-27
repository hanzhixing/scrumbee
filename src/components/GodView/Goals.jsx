import {always} from 'ramda';
import cx from './Goals.m.scss';

export default ({items}) => (
    <div className={cx('root')}>
        <h1 className={cx('header')}>Sprint目标</h1>
        <ol className={cx('list')}>
            {
                items.map(({id, title}) => (
                    <li key={id}>{title}</li>
                ))
            }
        </ol>
    </div>
);
