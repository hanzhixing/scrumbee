import {FixedSizeList, VariableSizeList, FixedSizeGrid, VariableSizeGrid} from 'react-window';
import {sum, map, prop, compose, path} from 'ramda';
import cx from './RowHeader.m.scss';

const getCellStyle = (data = {}) => {
    const AlignJustifyContentMap = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
    };

    const ValignAlignItemsMap = {
        top: 'flex-start',
        center: 'center',
        bottom: 'flex-end',
    };

    return {
        justifyContent: AlignJustifyContentMap[data.align],
        alignItems: ValignAlignItemsMap[data.valign],
        background: data.bgcolor,
    };
};

const Row = ({columnIndex, rowIndex, style, data}) => (
    <div style={{...style, ...getCellStyle(path([rowIndex, columnIndex])(data))}} className={cx('cell')}>
        <span>{path([rowIndex, columnIndex, 'text'])(data)}</span>
    </div>
);

export default ({width, height, rowCount, columnCount, getRowHeight, getColumnWidth, data}) => (
    <VariableSizeGrid
        width={width}
        height={height}
        rowCount={rowCount}
        columnCount={columnCount}
        rowHeight={getRowHeight}
        columnWidth={getColumnWidth}
        itemData={data}
        className={cx('grid')}
    >
        {Row}
    </VariableSizeGrid>
);
