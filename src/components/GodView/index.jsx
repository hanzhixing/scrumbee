import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import {ScrollSync, ScrollSyncPane} from 'react-scroll-sync';
import MemberList from '../../connects/MemberList';
import Goals from '../../connects/GodView/Goals';
import StoriesHeader from '../../connects/GodView/StoriesHeader';
import StoriesBody from '../../connects/GodView/StoriesBody';
import TasksHeader from '../../connects/GodView/TasksHeader';
import TasksBody from '../../connects/GodView/TasksBody';
import DaysHeader from '../../connects/GodView/DaysHeader';
import DaysBody from '../../connects/GodView/DaysBody';
import cx from './index.m.scss';

export default () => (
    <div>
        <MemberList />
        <Goals />
        <ScrollSync>
            <div className={cx('root')}>
                <div>
                    <div className={cx('fixed-header')}>
                        <StoriesHeader />
                        <TasksHeader />
                    </div>
                    <ScrollSyncPane group="vertical">
                        <div className={cx('fixed-body')}>
                            <StoriesBody />
                            <TasksBody />
                        </div>
                    </ScrollSyncPane>
                </div>
                <div>
                    <ScrollSyncPane group="horizontal">
                        <DaysHeader />
                    </ScrollSyncPane>
                    <ScrollSyncPane group={["horizontal", "vertical"]}>
                        <DaysBody />
                    </ScrollSyncPane>
                </div>
            </div>
        </ScrollSync>
    </div>
);
