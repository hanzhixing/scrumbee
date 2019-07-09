import {connect} from 'react-redux';
import {compose, values, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import moment from 'moment';
import Header from '../../components/GodView/Header';

const makeSelectSprints = () => path(['entities', 'sprints']);

const makeSelectCurrentSprint = () => createSelector(
    makeSelectSprints(),
    compose(path([0]), values),
);

const makeSelectSettings = () => path(['ui', 'GodView']);

const makeSelectHeaderHeight = () => path(['ui', 'GodView', 'headerHeight']);

const makeSelectColumnNumber = () => createSelector(
    makeSelectCurrentSprint(),
    (sprint, settings) => {
        const startDate = moment(sprint.startDate);
        const endDate = moment(sprint.endDate);

        return endDate.diff(startDate, 'days') + 1;
    },
);

const makeSelectColumnWidth = () => createSelector(
    makeSelectCurrentSprint(),
    makeSelectSettings(),
    (sprint, settings) => {
        const storyPointsPerDay = Math.ceil(sprint.hoursPerDay / sprint.hoursPerStoryPoint);

        return storyPointsPerDay * settings.gridColumnWidth;
    }
);

const makeSelectTotalColumnWidth = () => createSelector(
    makeSelectColumnNumber(),
    makeSelectColumnWidth(),
    multiply,
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

const makeMapStateToProps = () => createSelector(
    makeSelectTotalColumnWidth(),
    makeSelectHeaderHeight(),
    makeSelectColumnNumber(),
    makeSelectColumnWidth(),
    makeSelectColumnTexts(),
    (width, height, count, size, data) => ({
        width,
        height,
        count,
        getSize: index => size,
        data
    }),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps);

export default compose(withRedux)(Header);
