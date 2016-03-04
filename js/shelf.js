/**
 * Created by Joey on 2016/3/4.
 */

"use strict"
var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        port:1921,
        user     : 'postgres',
        password : 'postgres',
        database : 'jj',
        charset  : 'utf8'
    }
});

module.exports = require('bookshelf')(knex);
