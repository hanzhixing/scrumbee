import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import {ScrollSync, ScrollSyncPane} from 'react-scroll-sync';
import MemberList from '../../connects/MemberList';
import Goals from '../../connects/GodView/Goals';
import StoriesHeader from '../../connects/GodView/StoriesHeader';
import TasksHeader from '../../connects/GodView/TasksHeader';
import DaysHeader from '../../connects/GodView/DaysHeader';
import Stories from '../../connects/GodView/Stories';
import Tasks from '../../connects/GodView/Tasks';
import DaysGrid from '../../connects/GodView/DaysGrid';
import cx from './index.m.scss';

export default () => (
    <div>
        <MemberList />
        <Goals />
        <ScrollSync>
            <div className={cx('root')}>
                <div className={cx('header')}>
                    <div className={cx('fixed-horizontal')}>
                        <StoriesHeader />
                        <TasksHeader />
                    </div>
                    <ScrollSyncPane group="horizontal">
                        <DaysHeader />
                    </ScrollSyncPane>
                </div>
                <div className={cx('body')}>
                    <ScrollSyncPane group="horizontal">
                        <div className={cx('fixed-horizontal')}>
                            <Stories />
                            <Tasks />
                        </div>
                    </ScrollSyncPane>
                    <ScrollSyncPane group={["horizontal", "vertical"]}>
                        <DaysGrid />
                    </ScrollSyncPane>
                </div>
            </div>
        </ScrollSync>
    </div>
);
