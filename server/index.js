const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const {omit, keys, merge, concat, uniq, last, dropLast} = require('ramda');
const util = require('util');

const app = new Koa();
app.use(koaBodyParser());

const createSqlite3StatementProxiedHandler = () => ({
    get: (target, property, receiver) => {
        switch (property) {
            case 'bind':
            case 'run':
            case 'get':
            case 'all': {
                return (...param) => {
                    return new Promise((resolve, reject) => {
                        target[property](...param, (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(rows);
                        });
                    })
                };
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
                return (sql, ...param) => {
                    return new Promise((resolve, reject) => {
                        target[property](sql, ...param, (err, rows) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(rows);
                        });
                    })
                };
            }
            case 'prepare': {
                return (sql, ...param) => {
                    return new Promise((resolve, reject) => {
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
                };
            }
            default: {
                return undefined;
            }
        }
    },
});

const dbh = new Proxy(
    new sqlite3.Database(path.resolve(__dirname, './db/default.db')),
    createSqlite3DatabaseProxiedHandler(),
);

const buildInsertQuery = (resource, entity) => {
    if (resource.length % 2 === 0) {
        throw new Error('You can not post data to an specific resource!');
    }

    const stack = resource.slice();
    const target = stack.pop();
    const data = omit(['id', 'deleted', 'ctime', 'utime'], entity);
    const fieldsFromEntity = keys(data);
    const fieldsFromPath = stack.filter(o => o.id).map(o => `${o.type}_id`);
    const fields = uniq(concat(fieldsFromEntity, fieldsFromPath));

    const sql = [
        `INSERT INTO ${target.type} (`,
        `id, ${fields.join(', ')}, deleted, ctime, utime`,
        ') VALUES (',
        `'${uuidv4()}', `,
        ...fields.map(v => `$${v}, `),
        `'N', `,
        `'${(new Date()).toISOString()}', `,
        `'${(new Date()).toISOString()}'`,
        `)`,
    ];

    return sql.join('');
};

const buildInsertAffectedQuery = resource => {
    return `SELECT * FROM ${last(resource).type} WHERE rowid=last_insert_rowid()`;
};

const buildInsertQueryParam = (resource, body) => {
    let data = dropLast(1, resource).filter(o => o.id).reduce((acc, cur) => ({
        ...acc,
        [`${cur.type}_id`]: cur.id,
    }), {});

    data = merge(body, data);

    return keys(data).reduce((acc, cur) => ({
        ...acc,
        [`$${cur}`]: data[cur],
    }), {});
};

const buildSelectQuery = resource => {
    const stack = resource.slice();
    let left = stack.pop();
    const sql = [`SELECT ${left.type}.* FROM ${left.type}`];

    const where = stack.map(o => `AND ${o.type}.id = $${o.type}_id`)
    while (stack.length) {
        const right = stack.pop();
        sql.push(`LEFT JOIN ${right.type} ON ${left.type}.${right.type}_id = ${right.type}.id`);
        sql.push(`WHERE 1`)
        sql.push(where);
        left = right;
    }

    return sql.join(' ');
};

const buildSelectQueryParam = resource => {
    return resource.filter(o => o.id).reduce((acc, cur) => ({
        ...acc,
        [`$${cur.type}_id`]: cur.id,
    }), {});
};

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));

app.use(async (ctx, next) => {
    await next();

    const res = [];

    const tables = await dbh.all("SELECT name FROM sqlite_master WHERE type = 'table'");

    const pathtokens = ctx.request.path.split('/').slice(1);

    const resource = pathtokens.reduce((acc, cur, idx, arr) => {
        if (idx % 2) {
            acc[acc.length - 1].id = cur;
            return acc;
        }
        return [...acc, {type: cur}];
    }, []);

    let sql;
    let data;

    const {method, header, body} = ctx.request;

    const setType = resource.length % 2 ? 'ONE' : 'MANY';

    switch (method) {
        case 'GET': {
            try {
                sql = buildSelectQuery(resource);

                const param = buildSelectQueryParam(resource);

                data = await dbh.all(sql, param);
            } catch (err) {
                console.log(err);
            }
            break;
        }
        case 'POST': {
            try {
                sql = buildInsertQuery(resource, body);

                const param = buildInsertQueryParam(resource, body);

                await dbh.run(sql, param);

                data = await dbh.get(buildInsertAffectedQuery(resource));
            } catch (err) {
                if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
                    const regex = /SQLITE_CONSTRAINT: UNIQUE constraint failed: (.*)/;
                    const found = err.message.match(regex);
                    ctx.response.status = 400;
                    data = {code: err.errno, msg: `${found[1]}不能重复`};
                }
            }
            break;
        }
        // case 'PUT': {}
        // case 'DELETE': {}
        // case 'PATCH': {}
        // case 'HEAD': {}
        // case 'OPTIONS': {}
        default: {
            break;
        }
    }

    res.push({tables});
    res.push({pathtokens});
    res.push({resource});
    res.push({method});
    res.push({header});
    res.push({sql});
    res.push({data});

    ctx.body = JSON.stringify(res);
});

app.listen(3001);
