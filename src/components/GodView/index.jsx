import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import {PureComponent, createRef} from 'react';
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

class GodView extends PureComponent {
    // 故事头
    refOfStoriesHeader = createRef();

    outerRefOfStoriesHeader = createRef();

    innerRefOfStoriesHeader = createRef();

    // 故事体
    refOfStoriesBody = createRef();

    outerRefOfStoriesBody = createRef();

    innerRefOfStoriesBody = createRef();

    // 任务头
    refOfTasksHeader = createRef();

    outerRefOfTasksHeader = createRef();

    innerRefOfTasksHeader = createRef();

    // 任务体
    refOfTasksBody = createRef();

    outerRefOfTasksBody = createRef();

    innerRefOfTasksBody = createRef();

    // 日期头
    refOfDaysHeader = createRef();

    outerRefOfDaysHeader = createRef();

    innerRefOfDaysHeader = createRef();

    // 日期体
    refOfDaysBody = createRef();

    outerRefOfDaysBody = createRef();

    innerRefOfDaysBody = createRef();

    state = {
        mouseIn: undefined, // 'storiesHeader|storiesBody'
    };

    componentDidMount() {
        if (this.outerRefOfStoriesHeader.current) {
            this.outerRefOfStoriesHeader.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterStoriesHeader,
            );
        }

        if (this.outerRefOfStoriesBody.current) {
            this.outerRefOfStoriesBody.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterStoriesBody,
            );
        }

        if (this.outerRefOfTasksHeader.current) {
            this.outerRefOfTasksHeader.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterTasksHeader,
            );
        }

        if (this.outerRefOfTasksBody.current) {
            this.outerRefOfTasksBody.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterTasksBody,
            );
        }

        if (this.outerRefOfDaysHeader.current) {
            this.outerRefOfDaysHeader.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterDaysHeader,
            );
        }

        if (this.outerRefOfDaysBody.current) {
            this.outerRefOfDaysBody.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterDaysBody,
            );
        }
    }

    handleMouseEnterStoriesHeader = e => {
        this.setState({mouseIn: 'storiesHeader'});
    };

    handleMouseEnterStoriesBody = e => {
        this.setState({mouseIn: 'storiesBody'});
    };

    handleMouseEnterTasksHeader = e => {
        this.setState({mouseIn: 'tasksHeader'});
    };

    handleMouseEnterTasksBody = e => {
        this.setState({mouseIn: 'tasksBody'});
    };

    handleMouseEnterDaysHeader = e => {
        this.setState({mouseIn: 'daysHeader'});
    };

    handleMouseEnterDaysBody = e => {
        this.setState({mouseIn: 'daysBody'});
    };

    handleScrollStoriesHeader = ({
        scrollDirection,
        scrollOffset,
        scrollUpdateWasRequested,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfStoriesBody.current) {
            if (mouseIn !== 'storiesBody') {
                console.log(mouseIn);
                this.refOfStoriesBody.current.scrollTo({
                    scrollLeft: scrollOffset,
                });
            }
        }
    };

    handleScrollStoriesBody = ({
        horizontalScrollDirection,
        scrollLeft,
        scrollTop,
        scrollUpdateWasRequested,
        verticalScrollDirection,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfStoriesHeader.current) {
            if (mouseIn !== 'storiesHeader') {
                console.log(mouseIn);
                this.refOfStoriesHeader.current.scrollTo(scrollLeft);
            }
        }
        if (this.refOfTasksBody.current) {
            if (mouseIn !== 'tasksBody') {
                console.log(mouseIn);
                this.refOfTasksBody.current.scrollTo({scrollTop});
            }
        }
        if (this.refOfDaysBody.current) {
            if (mouseIn !== 'daysBody') {
                console.log(mouseIn);
                this.refOfDaysBody.current.scrollTo({scrollTop});
            }
        }
    };

    handleScrollTasksHeader = ({
        scrollDirection,
        scrollOffset,
        scrollUpdateWasRequested,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfTasksBody.current) {
            if (mouseIn !== 'tasksBody') {
                console.log(mouseIn);
                this.refOfTasksBody.current.scrollTo({
                    scrollLeft: scrollOffset,
                });
            }
        }
    };

    handleScrollTasksBody = ({
        horizontalScrollDirection,
        scrollLeft,
        scrollTop,
        scrollUpdateWasRequested,
        verticalScrollDirection,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfTasksHeader.current) {
            if (mouseIn !== 'tasksHeader') {
                console.log(mouseIn);
                this.refOfTasksHeader.current.scrollTo(scrollLeft);
            }
        }
        if (this.refOfStoriesBody.current) {
            if (mouseIn !== 'storiesBody') {
                console.log(mouseIn);
                this.refOfStoriesBody.current.scrollTo({scrollTop});
            }
        }
        if (this.refOfDaysBody.current) {
            if (mouseIn !== 'daysBody') {
                console.log(mouseIn);
                this.refOfDaysBody.current.scrollTo({scrollTop});
            }
        }
    };

    handleScrollDaysHeader = ({
        scrollDirection,
        scrollOffset,
        scrollUpdateWasRequested,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfDaysBody.current) {
            if (mouseIn !== 'daysBody') {
                console.log(mouseIn);
                this.refOfDaysBody.current.scrollTo({
                    scrollLeft: scrollOffset,
                });
            }
        }
    };

    handleScrollDaysBody = ({
        horizontalScrollDirection,
        scrollLeft,
        scrollTop,
        scrollUpdateWasRequested,
        verticalScrollDirection,
    }) => {
        const {mouseIn} = this.state;

        if (this.refOfDaysHeader.current) {
            if (mouseIn !== 'daysHeader') {
                console.log(mouseIn);
                this.refOfDaysHeader.current.scrollTo(scrollLeft);
            }
        }
        if (this.refOfStoriesBody.current) {
            if (mouseIn !== 'storiesBody') {
                console.log(mouseIn);
                this.refOfStoriesBody.current.scrollTo({scrollTop});
            }
        }
        if (this.refOfTasksBody.current) {
            if (mouseIn !== 'tasksBody') {
                console.log(mouseIn);
                this.refOfTasksBody.current.scrollTo({scrollTop});
            }
        }
    };

    render() {
        return (
            <div>
                <MemberList />
                <Goals />
                <div className={cx('table')}>
                    <div className={cx('section')}>
                        <StoriesHeader
                            ref={this.refOfStoriesHeader}
                            outerRef={this.outerRefOfStoriesHeader}
                            innerRef={this.innerRefOfStoriesHeader}
                            onScroll={this.handleScrollStoriesHeader}
                        />
                        <div>
                            <StoriesBody
                                ref={this.refOfStoriesBody}
                                outerRef={this.outerRefOfStoriesBody}
                                innerRef={this.innerRefOfStoriesBody}
                                onScroll={this.handleScrollStoriesBody}
                            />
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <TasksHeader
                            ref={this.refOfTasksHeader}
                            outerRef={this.outerRefOfTasksHeader}
                            innerRef={this.innerRefOfTasksHeader}
                            onScroll={this.handleScrollTasksHeader}
                        />
                        <div>
                            <TasksBody
                                ref={this.refOfTasksBody}
                                outerRef={this.outerRefOfTasksBody}
                                innerRef={this.innerRefOfTasksBody}
                                onScroll={this.handleScrollTasksBody}
                            />
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <DaysHeader
                            ref={this.refOfDaysHeader}
                            outerRef={this.outerRefOfDaysHeader}
                            innerRef={this.innerRefOfDaysHeader}
                            onScroll={this.handleScrollDaysHeader}
                        />
                        <DaysBody
                            ref={this.refOfDaysBody}
                            outerRef={this.outerRefOfDaysBody}
                            innerRef={this.innerRefOfDaysBody}
                            onScroll={this.handleScrollDaysBody}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GodView;
