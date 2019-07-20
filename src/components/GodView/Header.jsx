import {forwardRef} from 'react';
import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import cx from './Header.m.scss';

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
