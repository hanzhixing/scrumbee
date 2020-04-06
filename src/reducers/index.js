import {combineReducers} from 'redux';
import {
    createActionsReducer,
    createEntitiesReducer,
    groupByComposeByEntityType,
} from 'redux-saga-mate';
import * as ActionTypes from '../actions/types';
import EntityActionMap from './EntityActionMap';
import session from './session';
import ui from './ui';

const locators = {
    UPDATE: [
        ['response', 'entities'],
        ['entities'],
    ],
    DELETE: [
        ['request', 'params', 'id'],
    ],
};

export default combineReducers({
    session,
    actions: createActionsReducer([ActionTypes.CLEANUP, /^(ASYNC|REST)_/]),
    entities: combineReducers(
        groupByComposeByEntityType(
            createEntitiesReducer(locators, EntityActionMap),
            {},
        ),
    ),
    ui,
});
