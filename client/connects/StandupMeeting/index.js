import {createElement} from 'react';
import {connect} from 'react-redux';
import {createAsyncAction} from 'redux-saga-mate';
import {compose, tap, pick, values, prop, sum, multiply, map, path, length, flatten, last} from 'ramda';
import {lifecycle, withState, withProps, branch, renderComponent, renderNothing} from 'recompose';
import {createSelector} from 'reselect';
import moment from 'moment';
import {REST_GET_ONE_SPRINT, REST_GET_MANY_STORY} from '../../actions/types';
import {StatusColors} from '../../config';
import StandupMeeting from '../../components/StandupMeeting';

const makeSelectStories = () => createSelector(
    path(['entities', 'story']),
    compose(
        map(pick(['id', 'title', 'status'])),
        values,
    ),
);


const makeMapStateToProps = () => createSelector(
    makeSelectStories(),
    stories => ({stories}),
);

const mapDispatchToProps = (dispatch, {sprintId}) => ({
    init: () => {
        dispatch(createAsyncAction(REST_GET_ONE_SPRINT)({id: sprintId}));
        dispatch(createAsyncAction(REST_GET_MANY_STORY)({sprintId}));
    },
});

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

const withInit = lifecycle({
    componentDidMount() {
        this.props.init();
    },
});

export default compose(withRedux, withInit)(StandupMeeting);
