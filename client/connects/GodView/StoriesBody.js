import {connect} from 'react-redux';
import {compose, values, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import moment from 'moment';
import {StatusColors} from '../../config';
import Body from '../../components/GodView/Body';

const makeSelectSprints = () => path(['entities', 'sprints']);

const makeSelectStories = () => path(['entities', 'stories']);

const makeSelectSettings = () => path(['ui', 'GodView']);

const makeSelectStorySettings = () => path(['ui', 'GodView', 'columns', 'stories']);

const makeSelectStoryColumnWidths = () => createSelector(
    makeSelectStorySettings(),
    map(prop('width')),
);

const makeSelectTotalColumnWidth = () => createSelector(
    makeSelectStoryColumnWidths(),
    sum,
);

const makeSelectCurrentSprint = () => createSelector(
    makeSelectSprints(),
    compose(path([0]), values),
);

const makeSelectStoryCount = () => createSelector(
    makeSelectStories(),
    compose(length, values),
);

const makeSelectStoryRowHeights = () => createSelector(
    makeSelectSettings(),
    makeSelectStories(),
    (settings, stories) => compose(
        map(n => n * settings.gridRowHeight),
        map(o => length(o.$tasks) || 1),
        values,
    )(stories),
);

const makeSelectTotalRowHeights = () => createSelector(
    makeSelectStoryRowHeights(),
    sum,
);

const makeSelectStoryColumnCount = () => createSelector(
    makeSelectStorySettings(),
    length,
);

const makeSelectGetRowHeight = () => createSelector(
    makeSelectStoryRowHeights(),
    heights => index => heights[index],
);

const makeSelectGetColumnWidth = () => createSelector(
    makeSelectStoryColumnWidths(),
    widths => index => widths[index],
);

const makeSelectGridData = () => createSelector(
    makeSelectStorySettings(),
    makeSelectStories(),
    (settings, stories) => {
        const getText = (key, data) => prop(key, data);

        const getColor = (key, data) => {
            if (key === 'status') {
                return prop(prop(key, data))(StatusColors);
            }

            return undefined;
        };

        return values(stories).map(o => (
            settings.map(({key, align, valign}) => ({
                text: getText(key, o),
                align,
                valign,
                bgcolor: getColor(key, o),
            }))
        ));
    },
);

const makeMapStateToProps = () => createSelector(
    makeSelectTotalColumnWidth(),
    makeSelectTotalRowHeights(),
    makeSelectStoryCount(),
    makeSelectStoryColumnCount(),
    makeSelectGetRowHeight(),
    makeSelectGetColumnWidth(),
    makeSelectGridData(),
    (width, height, rowCount, columnCount, getRowHeight, getColumnWidth, data) => ({
        width,
        height: 300,
        rowCount,
        columnCount,
        getRowHeight,
        getColumnWidth,
        data
    }),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(withRedux)(Body);
