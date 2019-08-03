const sqlite3 = require('sqlite3').verbose();

const statement = {
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
};

const database = {
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

                        return resolve(new Proxy(sth, statement));
                    })
                );
            }
            default: {
                return undefined;
            }
        }
    },
};

module.exports = path => new Proxy(new sqlite3.Database(path), database);
