import {normalize, schema} from 'normalizr';
import HttpClient from '../../../../../utils/HttpClient';
import interceptors from '../../../../../utils/interceptors';
import {RestService} from '../../../../../config';

const story = new schema.Entity('story');

export const getMany = ({sprintId}) => (
    (new HttpClient(RestService.DEFAULT, interceptors))
        .path(`/rest/v1/sprint/${sprintId}/story`)
        .get()
        .then(response => response.json())
        .then(json => ({
            request: {params: {sprintId}},
            response: normalize(json, [story]),
        }))
);
