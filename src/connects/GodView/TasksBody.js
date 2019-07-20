import {connect} from 'react-redux';
import {compose, values, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import moment from 'moment';
import {StatusColors} from '../../config';
import Body from '../../components/GodView/Body';

const makeSelectSprints = () => path(['entities', 'sprints']);

const makeSelectStories = () => path(['entities', 'stories']);

const makeSelectMembers = () => path(['entities', 'members']);

const makeSelectTasks = () => path(['entities', 'tasks']);

const makeSelectSettings = () => path(['ui', 'GodView']);

const makeSelectTaskSettings = () => path(['ui', 'GodView', 'columns', 'tasks']);

const makeSelectCurrentSprint = () => createSelector(
    makeSelectSprints(),
    compose(path([0]), values),
);

const makeSelectWidths = () => createSelector(
    makeSelectTaskSettings(),
    map(prop('width')),
);

const makeSelectWidth = () => createSelector(
    makeSelectWidths(),
    sum,
);

const makeSelectRowCount = () => createSelector(
    makeSelectStories(),
    compose(sum, map(o => length(o.$tasks) || 1), values),
);

const makeSelectHeights = () => createSelector(
    makeSelectRowCount(),
    makeSelectSettings(),
    (rowCount, settings) => (new Array(rowCount)).fill(settings.gridRowHeight),
);

const makeSelectHeight = () => createSelector(
    makeSelectHeights(),
    sum,
);

const makeSelectColumnCount = () => createSelector(
    makeSelectTaskSettings(),
    length,
);

const makeSelectGetRowHeight = () => createSelector(
    makeSelectHeights(),
    heights => index => heights[index],
);

const makeSelectGetColumnWidth = () => createSelector(
    makeSelectWidths(),
    widths => index => widths[index],
);

const makeSelectData = () => createSelector(
    makeSelectTaskSettings(),
    makeSelectTasks(),
    makeSelectMembers(),
    (settings, tasks, members) => {
        const getText = (key, data) => {
            if (key === '$member') {
                return path([prop(key, data), 'realname'])(members);
            }

            return prop(key, data);
        };

        const getColor = (key, data) => {
            if (key === '$member') {
                return path([prop(key, data), 'color'])(members);
            }

            if (key === 'status') {
                return prop(prop(key, data))(StatusColors);
            }

            return undefined;
        };

        return values(tasks).map(o => (
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
    makeSelectWidth(),
    makeSelectHeight(),
    makeSelectRowCount(),
    makeSelectColumnCount(),
    makeSelectGetRowHeight(),
    makeSelectGetColumnWidth(),
    makeSelectData(),
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
