import React from 'react';
import Card from './Card';

const CardDragPreview = ({title, clientWidth, clientHeight}) => {
    const style = {
        display: 'inline-block',
        transform: 'rotate(-7deg)',
        width: `${clientWidth}px`,
        height: `${clientHeight}px`,
    };

    return (
        <div style={style}>
            <Card title={title} />
        </div>
    );
};

export default CardDragPreview;
