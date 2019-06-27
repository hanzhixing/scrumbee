import {combineReducers} from 'redux';
import {concat, difference, identity} from 'ramda';
import {
    createActionsReducer,
    createEntitiesReducer,
    groupByComposeByEntityType,
    UPDATE,
    DELETE,
} from 'redux-saga-mate';
import * as ActionTypes from '../actions/types';
import ui from './ui';

const EntityActionMap = {
    sprints: {},
    goals: {},
    stories: {
        [ActionTypes.ASYNC_GET_MANY_TODO]: [
            UPDATE,
            (k, l, r) => (k === 'commenters' ? concat(l, difference(r, l)) : r),
        ],
        [ActionTypes.ASYNC_DELETE_ONE_TODO]: DELETE,
        [ActionTypes.ASYNC_PATCH_ONE_TODO]: UPDATE,
    },
    tasks: {
        [ActionTypes.ASYNC_GET_MANY_TODO]: UPDATE,
        [ActionTypes.ASYNC_GET_ONE_USER_BY_TODO_ID]: UPDATE,
    },
    members: {}
};

export default combineReducers({
    actions: createActionsReducer([ActionTypes.CLEANUP, /^ASYNC_/]),
    session: (state = {}, action) => state,
    entities: combineReducers(
        groupByComposeByEntityType(
            createEntitiesReducer(EntityActionMap),
            {},
        ),
    ),
    ui: (state = {}, action) => state,
});
