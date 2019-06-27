import {connect} from 'react-redux';
import {compose, identity, map, pick, path, values} from 'ramda';
import {lifecycle, withState, withProps} from 'recompose';
import {createSelector} from 'reselect';
import Goals from '../../components/GodView/Goals';

const makeSelectGoals = () => createSelector(
    path(['entities', 'goals']),
    compose(map(pick(['id', 'title'])), values),
);

const makeMapStateToProps = () => createSelector(
    makeSelectGoals(),
    items => ({items}),
);

const mapDispatchToProps = undefined;

const withRedux = connect(makeMapStateToProps, mapDispatchToProps);

export default compose(withRedux)(Goals);
