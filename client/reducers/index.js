import {combineReducers} from 'redux';
import {concat, difference, identity} from 'ramda';
import {
    createActionsReducer,
    createEntitiesReducer,
    groupByComposeByEntityType,
} from 'redux-saga-mate';
import * as ActionTypes from '../actions/types';
import EntityActionMap from './EntityActionMap';
import session from './session';
import ui from './ui';

export default combineReducers({
    session,
    actions: createActionsReducer([ActionTypes.CLEANUP, /^(ASYNC|REST)_/]),
    entities: combineReducers(groupByComposeByEntityType(createEntitiesReducer(EntityActionMap), {
    })),
    ui,
});
