import {combineReducers} from 'redux';

export default combineReducers({
    GodView: () => ({
        headerHeight: 0,
        gridRowHeight: 0,
        gridColumnWidth: 0,
        columns: {
            stories: [],
            tasks: [],
        },
    }),
});
