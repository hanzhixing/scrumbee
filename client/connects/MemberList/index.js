import {connect} from 'react-redux';
import {compose, identity, map, pick, path, values} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import MemberList from '../../components/MemberList';

const makeSelectMembers = () => createSelector(
    path(['entities', 'members']),
    compose(map(pick(['id', 'realname', 'color'])), values),
);

const makeMapStateToProps = () => createSelector(
    makeSelectMembers(),
    members => ({members}),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps);

export default compose(
    withRedux,
)(MemberList);
