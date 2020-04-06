import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import values from 'ramda/src/values';
import multiply from 'ramda/src/multiply';
import path from 'ramda/src/path';
import last from 'ramda/src/last';
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
        if (!sprint) {
            return 0;
        }

        const startDate = moment(sprint.startDate);
        const endDate = moment(sprint.endDate);

        return endDate.diff(startDate, 'days') + 1;
    },
);

const makeSelectColumnWidth = () => createSelector(
    makeSelectCurrentSprint(),
    makeSelectSettings(),
    (sprint, settings) => {
        if (!sprint) {
            return 0;
        }

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
        if (!sprint) {
            return [];
        }

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
        width: 960,
        height,
        count,
        getSize: index => size,
        data
    }),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(withRedux)(Header);
