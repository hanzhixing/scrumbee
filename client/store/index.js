import {LOCAL_STORAGE_REDUX_STORE_KEY} from '../config';
import configureStore from './configureStore';
import mock from './mock';

export default configureStore(mock, 'SCRUMBEE', LOCAL_STORAGE_REDUX_STORE_KEY);
