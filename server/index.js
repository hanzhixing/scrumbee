const path = require('path');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const {omit, keys, merge, concat, uniq, head, last, dropLast, reverse} = require('ramda');
const util = require('util');

const {createSqlite3DatabaseProxiedHandler} = require('./lib/proxiedDbHandlers');

const {
    buildSelectQuery,
    buildSelectQueryParam,
    buildInsertQuery,
    buildInsertQueryParam,
    buildInsertAffectedQuery,
} = require('./lib/queryBuilders');

const app = new Koa();

// app.use(cors());
app.use(koaBodyParser());

const dbh = new Proxy(
    new sqlite3.Database(path.resolve(__dirname, './db/default.db')),
    createSqlite3DatabaseProxiedHandler(),
);

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');

    if (ctx.request.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Headers', 'Accept, Content-Type');
        ctx.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
        // ctx.set('Access-Control-Allow-Credentials', 'true');
        // ctx.set('Access-Control-Max-Age', options.maxAge);

        ctx.set('Content-Length', '0');

        ctx.status = 204;
    } else {
        await next();
    }
});

app.use(async (ctx, next) => {
    await next();

    const res = [];

    const tables = await dbh.all("SELECT name FROM sqlite_master WHERE type = 'table'");

    const pathtokens = ctx.request.path.split('/').slice(3);

    const resource = pathtokens.reduce((acc, cur, idx, arr) => {
        if (idx % 2) {
            acc[acc.length - 1].id = cur;
            return acc;
        }
        return [...acc, {type: cur}];
    }, []);

    let data;

    const {method, header, body} = ctx.request;

    const setType = resource.length % 2 ? 'ONE' : 'MANY';

    switch (method) {
        case 'GET': {
            try {
                const isGetOne = (pathtokens.length % 2 === 0);

                const sql = buildSelectQuery(resource, isGetOne);

                const param = buildSelectQueryParam(resource, isGetOne);

                console.log(sql, param);
                const rows = await dbh.all(sql, param);

                const body = isGetOne ? head(rows) : rows;

                ctx.body = JSON.stringify(body);
            } catch (err) {
                console.log(err);
            }
            break;
        }
        // case 'POST': {
        //     try {
        //         sql = buildInsertQuery(resource, body);

        //         const param = buildInsertQueryParam(resource, body);

        //         await dbh.run(sql, param);

        //         data = await dbh.get(buildInsertAffectedQuery(resource));
        //     } catch (err) {
        //         if (err.errno === 19 && err.code === 'SQLITE_CONSTRAINT') {
        //             const regex = /SQLITE_CONSTRAINT: UNIQUE constraint failed: (.*)/;
        //             const found = err.message.match(regex);
        //             ctx.response.status = 400;
        //             data = {code: err.errno, msg: `${found[1]}不能重复`};
        //         }
        //     }
        //     break;
        // }
        // case 'PUT': {}
        // case 'DELETE': {}
        // case 'PATCH': {}
        // case 'HEAD': {}
        // case 'OPTIONS': {}
        default: {
            break;
        }
    }
});

app.listen(3001);

console.log('running at 3001');
