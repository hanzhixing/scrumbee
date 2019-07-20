import {PureComponent, createRef} from 'react';
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend';
import {compose, identity, pick, prop, path, always} from 'ramda';
import cx from './Card.m.scss';

class Card extends PureComponent {
    theRef = createRef();

    componentDidMount() {
        const {connectDragPreview} = this.props;

        connectDragPreview(getEmptyImage(), {captureDraggingState: true});
    }

    render() {
        const {title, isDragging, connectDragSource, onClick, ...rest} = this.props;

        return connectDragSource(
            <div ref={this.theRef} className={cx('root', {dragging: isDragging})}>
                {title}
                {isDragging && ' (and I am being dragged now)'}
            </div>
        );
    }
}

const spec = {
    canDrag: always(true),
    isDragging: ({id}, monitor) => (monitor.getItem().id === id),
    beginDrag: (props, monitor, component) => {
        const {clientWidth, clientHeight} = component.theRef.current;

        return {
            id: props.id,
            storyId: props.storyId,
            status: props.status,
            title: props.title,
            clientWidth,
            clientHeight,
        };
    },
    endDrag: (props, monitor, component) => {
        if (!monitor.didDrop()) {
            return;
        }

        const item = monitor.getItem();

        const dropResult = monitor.getDropResult();

        props.onDragToStatus(item, dropResult);
    },
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
});


export default DragSource('TASK_CARD', spec, collect)(Card);
