import {connect} from 'react-redux';
import {compose, prop, filter, map, path} from 'ramda';
import {createSelector} from 'reselect';
import Column from '../../components/StandupMeeting/Column';

const makeMapStateToProps = () => createSelector(
    path(['entities', 'stories']),
    path(['entities', 'tasks']),
    (_, props) => props.storyId,
    (_, props) => props.status,
    (stories, tasks, storyId, status) => ({
        title: status,
        tasks: compose(
            map(prop('id')),
            filter(o => o.status === status),
            map(id => prop(id, tasks)),
            path([storyId, '$tasks']),
        )(stories)
    }),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(
    withRedux,
)(Column);
