import {UPDATE, DELETE} from 'redux-saga-mate';
import {concat, difference, identity} from 'ramda';
import * as ActionTypes from '../actions/types';

export default {
    sprint: {
        [ActionTypes.REST_GET_ONE_SPRINT]: UPDATE,
    },
    goals: {},
    story: {
        [ActionTypes.REST_GET_MANY_STORY]: UPDATE,
    },
    tasks: {
        [ActionTypes.ASYNC_GET_MANY_TODO]: UPDATE,
        [ActionTypes.ASYNC_GET_ONE_USER_BY_TODO_ID]: UPDATE,
    },
    members: {}
};
