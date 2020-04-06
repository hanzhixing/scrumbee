import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import prop from 'ramda/src/prop';
import path from 'ramda/src/path';
import {createSelector} from 'reselect';
import Card from '../../components/StandupMeeting/Card';

const makeMapStateToProps = () => createSelector(
    path(['entities', 'tasks']),
    (_, props) => props.id,
    (tasks, id) => {
        const task = prop(id, tasks);
        return {
            id: task.id,
            storyId: task.$story,
            title: task.title,
            status: task.status,
        };
    },
);

const mapDispatchToProps = (dispatch, props) => ({
    onDragToStatus: (...args) => {
        console.log('onDragToStatus', args);
    },
});

const withRedux = connect(makeMapStateToProps, mapDispatchToProps, undefined, {forwardRef: true});

export default compose(
    withRedux,
)(Card);
