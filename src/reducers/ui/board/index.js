import * as ActionTypes from '../../../actions/types';

export default (state = {}, action) => {
    switch (action) {
        case ActionTypes.REST_GET_ONE_SPRINT: {
            return state;
        }
        default: {
            return state;
        }
    }
};
