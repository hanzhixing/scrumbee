import {connect} from 'react-redux';
import {compose, prop, sum, map, path, length, flatten} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import ColumnHeader from '../../components/GodView/ColumnHeader';

const ColumnTexts = {
    importance: '重要性',
    title: '任务',
    status: '状态',
    $member: '成员',
    estimate: '预估',
    cost: '实际',
    unplanned: '计划外',
};

const makeSelectColumns = () => path(['ui', 'GodView', 'columns', 'tasks']);

const makeSelectHeight = () => path(['ui', 'GodView', 'headerHeight']);

const makeSelectCount = () => createSelector(
    makeSelectColumns(),
    length,
);

const makeSelectWidths = () => createSelector(
    makeSelectColumns(),
    map(o => o.width || 0),
);

const makeSelectWidth = () => createSelector(
    makeSelectWidths(),
    sum,
);

const makeSelectData = () => createSelector(
    makeSelectColumns(),
    map(o => ({
        width: o.width,
        text: ColumnTexts[o.key],
    })),
);

const makeSelectGetSize = () => createSelector(
    makeSelectWidths(),
    widths => index => widths[index],
);

const makeMapStateToProps = () => createSelector(
    makeSelectWidth(),
    makeSelectHeight(),
    makeSelectCount(),
    makeSelectGetSize(),
    makeSelectData(),
    (width, height, count, getSize, data) => ({
        width,
        height,
        count,
        getSize,
        data,
    }),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps);

export default compose(withRedux)(ColumnHeader);
