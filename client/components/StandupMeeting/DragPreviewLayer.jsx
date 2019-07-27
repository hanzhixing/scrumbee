import PropTypes from 'prop-types';
import {DragLayer} from 'react-dnd';
import CardPreview from './CardPreview';
import cx from './DragPreviewLayer.m.scss';

const getStyle = ({currentOffset}) => {
    if (!currentOffset) {
        return {
            display: 'none',
        };
    }

    const {x, y} = currentOffset;

    return {
        transform: `translate(${x}px, ${y}px)`,
    };
};

const DragPreviewLayer = ({
    item,
    itemType,
    isDragging,
    currentOffset,
}) => {
    if (!isDragging) {
        return null;
    }

    return (
        <div className={cx('root')}>
            <div style={getStyle({currentOffset})}>
                <CardPreview {...item} />
            </div>
        </div>
    );
};

const collect = monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
});

export default DragLayer(collect)(DragPreviewLayer);
