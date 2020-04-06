import {combineReducers} from 'redux';
import board from './board';

export default combineReducers({
    board,
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
