import {normalize, schema} from 'normalizr';
import HttpClient from '../../../../utils/HttpClient';
import interceptors from '../../../../utils/interceptors';
import {RestService} from '../../../../config';

const sprint = new schema.Entity('sprint');

export const getOne = ({id}) => (
    (new HttpClient(RestService.DEFAULT, interceptors))
        .path(`/rest/v1/sprint/${id}`)
        .get()
        .then(response => response.json())
        .then(json => ({
            request: {params: {id}},
            response: normalize(json, sprint),
        }))
);
