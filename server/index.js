const path = require('path');
const url = require('url');
const sqlite = require('sqlite');
const Koa = require('koa');
const favicon = require('koa-favicon');

const dbPromise = sqlite.open(path.resolve(__dirname, './db/default.db'), {Promise});
const app = new Koa();

const buildQuery = resource => {
    const stack = resource.slice();
    let left = stack.pop();
    const sql = [`SELECT ${left.type}.* FROM ${left.type}`];

    while (stack.length) {
        const right = stack.pop();
        sql.push(`LEFT JOIN ${right.type} ON ${left.type}.${right.type}_id = ${right.type}.id`);
        left = right;
    }

    return sql.join(' ');
};

app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));

app.use(async (ctx, next) => {
    await next();
    const db = await dbPromise;
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type = 'table'");
    const pathtokens = ctx.request.path.split('/').slice(1);
    const resource = pathtokens.reduce((acc, cur, idx, arr) => {
        if (idx % 2) {
            acc[acc.length - 1].id = cur;
            return acc;
        }
        return [
            ...acc,
            {type: cur},
        ];
    }, []);
    console.log(tables);
    console.log(buildQuery(resource));
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3001);
