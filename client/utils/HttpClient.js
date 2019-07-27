import qs from 'qs';
import {merge} from 'ramda';

class HttpClient {
    $path = '';

    $query = {};

    $headers = {};

    $method = '';

    $body = undefined;

    $interceptors = {};

    constructor(str, obj) {
        this.$path = str;
        this.$interceptors = obj;
    }

    path = str => {
        this.$path = `${this.$path}${str}`;
        return this;
    };

    query = obj => {
        this.$query = obj;
        return this;
    }

    head = obj => {
        this.$query = merge(this.$query, obj);
        this.$method = 'HEAD';
        this.send();
    };

    get = obj => {
        this.$query = merge(this.$query, obj);
        this.$method = 'GET';
        return this.send();
    };

    post = obj => {
        this.$body = obj;
        this.$method = 'POST';
        this.send();
    }

    put = obj => {
        this.$body = obj;
        this.$method = 'PUT';
        this.send();
    }

    delete = obj => {
        this.$body = obj;
        this.$method = 'DELETE';
        this.send();
    }

    send = () => {
        const qsopt = {arrayFormat: 'comma', skipNulls: true, addQueryPrefix: true};

        let resource = `${this.$path}${qs.stringify(this.$query, qsopt)}`

        let init = {
            method: this.$method,
            body: this.$body,
        };

        if (this.$interceptors.request) {
            resource = this.$interceptors.request(resource, init).resource;
            init = this.$interceptors.request(resource, init).init;
        }

        console.log(init);

        return fetch(resource, init)
            .then(response => (
                response.ok ? Promise.resolve(response) : Promise.reject(response)
            ))
            .catch(e => {
                if (e instanceof Error) {
                    console.log(1);
                    throw e;
                }
                if (this.$interceptors.response) {
                    this.$interceptors.response(e);
                }
            });
    }
}

export default HttpClient;
