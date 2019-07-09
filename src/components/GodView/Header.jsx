import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import cx from './Header.m.scss';

const Row = ({index, style, data}) => (
    <div style={style} className={cx('cell', data[index].classes)}>
        <span>{data[index].text}</span>
    </div>
);

export default ({width, height, count, getSize, data}) => (
    <VariableSizeList
        layout="horizontal"
        width={width}
        height={height}
        itemCount={count}
        itemSize={getSize}
        itemData={data}
        className={cx('root')}
    >
        {Row}
    </VariableSizeList>
);
