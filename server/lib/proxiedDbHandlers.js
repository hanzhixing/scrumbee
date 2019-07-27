const {omit, keys, merge, concat, uniq, head, last, dropLast, reverse} = require('ramda');

const createSqlite3StatementProxiedHandler = () => ({
    get: (target, property, receiver) => {
        switch (property) {
            case 'bind':
            case 'run':
            case 'get':
            case 'all': {
                return (...param) => (
                    new Promise((resolve, reject) => {
                        target[property](...param, (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(rows);
                        });
                    })
                );
            }
            default: {
                return undefined;
            }
        }
    },
});

const createSqlite3DatabaseProxiedHandler = () => ({
    get: (target, property, receiver) => {
        switch (property) {
            case 'run':
            case 'get':
            case 'all':
            case 'each':
            case 'exec': {
                return (sql, ...param) => (
                    new Promise((resolve, reject) => {
                        target[property](sql, ...param, (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(rows);
                        });
                    })
                );
            }
            case 'prepare': {
                return (sql, ...param) => (
                    new Promise((resolve, reject) => {
                        const sth = target[property](sql, ...param, err => {
                            if (err) {
                                return reject(err);
                            }
                            return undefined;
                        });

                        return resolve(new Proxy(
                            sth,
                            createSqlite3StatementProxiedHandler(),
                        ));
                    })
                );
            }
            default: {
                return undefined;
            }
        }
    },
});

module.exports = {
    createSqlite3DatabaseProxiedHandler,
};
