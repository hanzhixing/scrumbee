import React from 'react';
import StatusColumn from '../../connects/StandupMeeting/StatusColumn';
import cx from './Panel.module.scss';

const Panel = ({id, title, status}) => (
    <div className={cx('root')}>
        <div className={cx('header', status.toLowerCase())}>{title}</div>
        <div className={cx('body')}>
            <StatusColumn storyId={id} status="TODO" />
            <StatusColumn storyId={id} status="DOING" />
            <StatusColumn storyId={id} status="DONE" />
            <StatusColumn storyId={id} status="CANCEL" />
        </div>
    </div>
);

export default Panel;
