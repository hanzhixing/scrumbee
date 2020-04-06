import React, {PureComponent, createRef} from 'react';
import {DropTarget} from 'react-dnd';
import TaskCard from '../../connects/StandupMeeting/TaskCard';
import cx from './Column.module.scss';

class Column extends PureComponent {
    theRef = createRef();

    state = {
        placeholderIndex: undefined,
    };

    render() {
        const {title, tasks, isOver, canDrop, connectDropTarget} = this.props;
        const {placeholderIndex} = this.state;

        console.log(placeholderIndex);

        return (
            <div ref={this.theRef} className={cx('root')}>
                <div className={cx('header', title.toLowerCase())}>{title}</div>
                {
                    connectDropTarget(
                        <div className={cx('body')}>
                            {
                                isOver && canDrop && placeholderIndex === -1 && (
                                    <div className={cx('placeholder')} />
                                )
                            }
                            {
                                tasks.map((id, index) => (
                                    <>
                                        {
                                            isOver && canDrop && placeholderIndex === index && (
                                                <div className={cx('placeholder')} />
                                            )
                                        }
                                        <TaskCard key={id} id={id} />
                                    </>
                                ))
                            }
                            {
                                isOver && canDrop && placeholderIndex >= tasks.length && (
                                    <div className={cx('placeholder')} />
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

const spec = {
    canDrop: (props, monitor) => {
        const item = monitor.getItem();

        return props.storyId === item.storyId && props.status !== item.status;
    },
    hover: (props, monitor, component) => {
        const {x, y} = monitor.getClientOffset();
        const isOver = monitor.isOver({shallow: true});
        const canDrop = monitor.canDrop();

        console.log(x, y, isOver, canDrop);

        const CARD_HEIGHT = 180; // height of a single card(excluding marginBottom/paddingBottom)
        const CARD_MARGIN = 10; // height of a marginBottom+paddingBottom
        const OFFSET_HEIGHT = 84; // height offset from the top of the page

        const scrollY = component.theRef.current.scrollTop;

        // shift placeholder if y position more than card height / 2
        const yPos = y - OFFSET_HEIGHT + scrollY;

        let placeholderIndex;

        if (yPos < CARD_HEIGHT / 2) {
            placeholderIndex = -1; // place at the start
        } else {
            placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
        }

        // horizontal scroll
        if (!props.isScrolling) {
            if (window.innerWidth - monitor.getClientOffset().x < 200) {
                props.startScrolling('toRight');
            } else if (monitor.getClientOffset().x < 200) {
                props.startScrolling('toLeft');
            }
        } else if (window.innerWidth - monitor.getClientOffset().x > 200
            && monitor.getClientOffset().x > 200
        ) {
            props.stopScrolling();
        }

        // IMPORTANT!
        // HACK! Since there is an open bug in react-dnd, making it impossible
        // to get the current client offset through the collect function as the
        // user moves the mouse, we do this awful hack and set the state (!!)
        // on the component from here outside the component.
        // https://github.com/gaearon/react-dnd/issues/179
        component.setState({placeholderIndex});

        // when drag begins, we hide the card and only display cardDragPreview
        // const item = monitor.getItem();
        // document.getElementById(item.id).style.display = 'none';
    },
    drop: (props, monitor, component) => {
    },
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
});

export default DropTarget('TASK_CARD', spec, collect)(Column);
