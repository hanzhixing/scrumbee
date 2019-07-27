import {all, takeEvery} from 'redux-saga/effects';
import {makeCreateDefaultWorker} from 'redux-saga-mate';
import HttpError from '../utils/HttpError';
import * as ActionTypes from '../actions/types';
import * as Api from '../api';
import * as Sprint from '../remotes/rest/v1/sprint';
import * as Story from '../remotes/rest/v1/sprint/story';

const createDefaultWorker = makeCreateDefaultWorker(
    [HttpError, ActionTypes.CLEANUP],
    {autoclear: true},
);

// Notice!
// If you need more complicated logic controls then the default worker saga,
// you need to implement your own worker sagas.
export default function* () {
    yield all([
        takeEvery(ActionTypes.ASYNC_NOOP, createDefaultWorker(Api.noop)),
        takeEvery(ActionTypes.ASYNC_GET_MANY_TODO, createDefaultWorker(Api.getManyTodo)),
        takeEvery(ActionTypes.ASYNC_PATCH_ONE_TODO, createDefaultWorker(Api.patchOneTodo)),
        takeEvery(ActionTypes.ASYNC_GET_ONE_USER_BY_TODO_ID, createDefaultWorker(
            Api.getOneUser,
            (state, action) => {
                const {todoId} = action.payload;
                const {author} = state.entities.todos[todoId];
                return {id: author};
            },
            // {autoclear: false},
        )),

        takeEvery(ActionTypes.REST_GET_ONE_SPRINT, createDefaultWorker(Sprint.getOne)),
        takeEvery(ActionTypes.REST_GET_MANY_STORY, createDefaultWorker(Story.getMany)),
    ]);
}
