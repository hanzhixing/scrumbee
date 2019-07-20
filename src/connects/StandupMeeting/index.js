import {connect} from 'react-redux';
import {compose, tap, pick, values, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import moment from 'moment';
import {StatusColors} from '../../config';
import StandupMeeting from '../../components/StandupMeeting';

const makeSelectStories = () => createSelector(
    path(['entities', 'stories']),
    compose(
        map(pick(['id', 'title', 'status'])),
        values,
    ),
);


const makeMapStateToProps = () => createSelector(
    makeSelectStories(),
    stories => ({stories}),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(withRedux)(StandupMeeting);
