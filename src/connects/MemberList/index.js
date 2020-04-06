import {connect} from 'react-redux';
import compose from 'ramda/src/compose';
import map from 'ramda/src/map';
import pick from 'ramda/src/pick';
import path from 'ramda/src/path';
import values from 'ramda/src/values';
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
