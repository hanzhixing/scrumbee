import {forwardRef} from 'react';
import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import cx from './Header.m.scss';

const Row = ({index, style, data}) => (
    <div style={style} className={cx('cell', data[index].classes)}>
        <span>{data[index].text}</span>
    </div>
);

const Header = ({width, height, count, getSize, data, outerRef, innerRef, onScroll}, ref) => (
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
);

export default forwardRef(Header);
