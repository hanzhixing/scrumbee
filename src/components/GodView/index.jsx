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

    outerRefOfTasksHeader = createRef();

    innerRefOfTasksHeader = createRef();

    outerRefOfTasksBody = createRef();

    innerRefOfTasksBody = createRef();

    outerRefOfDaysHeader = createRef();

    innerRefOfDaysHeader = createRef();

    outerRefOfDaysHeader = createRef();

    innerRefOfDaysHeader = createRef();

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
            )
        }

        if (this.outerRefOfStoriesBody.current) {
            this.outerRefOfStoriesBody.current.addEventListener(
                'mouseenter',
                this.handleMouseEnterStoriesBody,
            )
        }
    }

    handleMouseEnterStoriesHeader = e => {
        this.setState({mouseIn: 'storiesHeader'});
    };

    handleMouseEnterStoriesBody = e => {
        this.setState({mouseIn: 'storiesBody'});
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
    };

    // mouseenter, mouseleave

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
                        <div ref={this.refOfTasksHeader}>
                            <TasksHeader />
                        </div>
                        <div ref={this.refOfTasksBody}>
                            <TasksBody />
                        </div>
                    </div>
                    <div className={cx('section')}>
                        <div ref={this.refOfDaysHeader}>
                            <DaysHeader />
                        </div>
                        <div ref={this.refOfDaysBody}>
                            <DaysBody />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GodView;
