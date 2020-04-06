import React, {forwardRef} from 'react';
import {VariableSizeList} from 'react-window';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import cx from './Header.module.scss';

const Row = ({index, style, data}) => (
    <div style={style} className={cx('cell', data[index].classes)}>
        <span>{data[index].text}</span>
    </div>
);

console.log(scrollbarSize());
const Header = ({width, height, count, getSize, data, outerRef, innerRef, onScroll}, ref) => (
    <div style={{width, height}} className={cx('wrapper')}>
        <VariableSizeList
            ref={ref}
            layout="horizontal"
            width={width}
            height={height}
            itemCount={count}
            itemSize={getSize}
            itemData={data}
            className={cx('root')}
            outerRef={outerRef}
            innerRef={innerRef}
            onScroll={onScroll}
        >
            {Row}
        </VariableSizeList>
    </div>
);

export default forwardRef(Header);
