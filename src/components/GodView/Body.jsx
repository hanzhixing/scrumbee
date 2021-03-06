import React, {forwardRef} from 'react';
import {VariableSizeGrid} from 'react-window';
import path from 'ramda/src/path';
import cx from './Body.module.scss';

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

const Body = ({
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

export default forwardRef(Body);
