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
        '"N", ',
        `"${(new Date()).toISOString()}", `,
        `"${(new Date()).toISOString()}"`,
        ')',
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

const buildSelectQuery = (resource, isGetOne) => {
    const primary = last(resource);
    const others = dropLast(1, resource);

    const sql = [`SELECT ${primary.type}.* FROM ${primary.type}`];

    reverse(others).forEach(right => {
        let left = primary;
        sql.push(`LEFT JOIN ${right.type}`);
        sql.push(`ON ${left.type}.${right.type}_id = ${right.type}.id`);
        left = right;
    });

    console.log(others);

    sql.push('WHERE 1');

    if (isGetOne) {
        sql.push(`AND ${primary.type}.id = $id`);
    } else {
        others.forEach(o => {
            sql.push(`AND ${o.type}.id = $${o.type}_id`);
        });
    }

    return sql.join(' ');
};

const buildSelectQueryParam = (resource, isGetOne) => {
    const primary = last(resource);
    const others = dropLast(1, resource);

    const params = {};

    console.log(resource, others);

    if (isGetOne) {
        params.$id = primary.id;
    }

    others.forEach(o => {
        params[`$${o.type}_id`] = o.id;
    });

    return params;
};

module.exports = {
    buildSelectQuery,
    buildSelectQueryParam,
    buildInsertQuery,
    buildInsertQueryParam,
    buildInsertAffectedQuery,
};
