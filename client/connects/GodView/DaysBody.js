import {connect} from 'react-redux';
import {compose, values, keys, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import Color from 'color';
import moment from 'moment';
import {StatusColors} from '../../config';
import Grid from '../../components/GodView/Grid';

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

const makeSelectDaysNumber = () => createSelector(
    makeSelectCurrentSprint(),
    (sprint, settings) => {
        const startDate = moment(sprint.startDate);
        const endDate = moment(sprint.endDate);

        return endDate.diff(startDate, 'days') + 1;
    },
);

const makeSelectColumnCount = () => createSelector(
    makeSelectSettings(),
    makeSelectCurrentSprint(),
    makeSelectDaysNumber(),
    (settings, sprint, daysNumber) => {
        const storyPointsPerDay = Math.ceil(sprint.hoursPerDay / sprint.hoursPerStoryPoint);
        return daysNumber * storyPointsPerDay;
    }
);

const makeSelectWidths = () => createSelector(
    makeSelectSettings(),
    makeSelectColumnCount(),
    (settings, columnNumber) => (new Array(columnNumber)).fill(settings.gridColumnWidth),
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

const makeSelectGetRowHeight = () => createSelector(
    makeSelectHeights(),
    heights => index => heights[index],
);

const makeSelectGetColumnWidth = () => createSelector(
    makeSelectWidths(),
    widths => index => widths[index],
);

const makeSelectColumnTexts = () => createSelector(
    makeSelectCurrentSprint(),
    sprint => {
        const dates = [];

        const startDate = moment(sprint.startDate);
        const endDate = moment(sprint.endDate);

        dates.push(startDate.clone());

        while (endDate.diff(last(dates)) >= 0) {
            dates.push(last(dates).clone().add(1, 'days'));
        }

        return dates.map(o => ({
            classes: [0, 6].includes(o.day()) ? ['restday'] : undefined,
            text: o.format('MM-DD'),
        }));
    },
);

const makeSelectStoryPoints = () => createSelector(
    makeSelectCurrentSprint(),
    makeSelectColumnTexts(),
    (sprint, dates) => {
        const storyPointsPerDay = Math.ceil(sprint.hoursPerDay / sprint.hoursPerStoryPoint);

        const pointsEachDay = Array.from(
            new Array(storyPointsPerDay),
            (_, i) => String(i + 1).padStart(2, '0'),
        );

        return flatten(dates.map(date => pointsEachDay.map(point => ({
            ...date,
            date: date.text,
            point: `${date.text}.${point}`
        }))));
    },
);

const makeSelectData = () => createSelector(
    makeSelectTaskSettings(),
    makeSelectTasks(),
    makeSelectMembers(),
    makeSelectStoryPoints(),
    (settings, tasks, members, points) => {
        const getBgColor = task => path([prop('$member', task), 'color'])(members);

        const getFgColor = task => Color(getBgColor(task)).darken(0.7);

        return values(tasks).map(t => points.map(p => ({
            fgcolor: path(['points', p.point, 'cost'])(t) ? getFgColor(t) : undefined,
            bgcolor: path(['points', p.point, 'estimate'])(t) ? getBgColor(t) : undefined,
            classes: p.classes,
        })));
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
        width: 960,
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

export default compose(withRedux)(Grid);
