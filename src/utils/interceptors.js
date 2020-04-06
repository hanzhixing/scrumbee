import {mergeDeepRight} from 'ramda';
import HttpError from './HttpError';

const request = (resource, init) => ({
    resource,
    init: mergeDeepRight(init, {
        mode: 'cors',
        // redirect: 'manual',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }),
});

const response = response => (
    Promise.resolve(response)
        .then(res => res.text())
        .then(text => {
            let body;

            try {
                body = JSON.parse(test);
            } catch (e) {
                body = text;
            }

            throw new HttpError(JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                body,
            }))
        })
);

export default {request, response};
