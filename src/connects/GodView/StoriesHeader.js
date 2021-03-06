import {connect} from 'react-redux';
import {compose, sum, map, path, length} from 'ramda';
import {createSelector} from 'reselect';
import Header from '../../components/GodView/Header';

const ColumnTexts = {
    importance: '重要性',
    title: '故事',
    status: '状态',
};

const makeSelectColumns = () => path(['ui', 'GodView', 'columns', 'stories']);

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

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(withRedux)(Header);
