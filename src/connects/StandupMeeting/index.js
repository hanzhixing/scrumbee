import {connect} from 'react-redux';
import {createAsyncAction} from 'redux-saga-mate';
import {compose, pick, values, map, path} from 'ramda';
import {lifecycle} from 'recompose';
import {createSelector} from 'reselect';
import {REST_GET_ONE_SPRINT, REST_GET_MANY_STORY} from '../../actions/types';
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
