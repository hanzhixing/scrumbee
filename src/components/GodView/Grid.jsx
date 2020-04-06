import React, {forwardRef} from 'react';
import {VariableSizeGrid} from 'react-window';
import path from 'ramda/src/path';
import cx from './Grid.module.scss';

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

const getFgColor = (data = {}) => ({
    background: data.fgcolor,
});

const Row = ({columnIndex, rowIndex, style, data}) => (
    <div
        style={{...style, ...getCellStyle(path([rowIndex, columnIndex])(data))}}
        className={cx('cell', path([rowIndex, columnIndex, 'classes'])(data))}
    >
        <span style={getFgColor(path([rowIndex, columnIndex])(data))}>
            {path([rowIndex, columnIndex, 'text'])(data)}
        </span>
    </div>
);

const Grid = ({
    width,
    height,
    rowCount,
    columnCount,
    getRowHeight,
    getColumnWidth,
    data,
    outerRef,
    innerRef,
    onScroll,
}, ref) => (
    <div style={{width, height}} className={cx('wrapper')}>
        <VariableSizeGrid
            ref={ref}
            width={width}
            height={height}
            rowCount={rowCount}
            columnCount={columnCount}
            rowHeight={getRowHeight}
            columnWidth={getColumnWidth}
            itemData={data}
            outerRef={outerRef}
            innerRef={innerRef}
            onScroll={onScroll}
            className={cx('root')}
        >
            {Row}
        </VariableSizeGrid>
    </div>
);

export default forwardRef(Grid);
