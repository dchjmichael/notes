/**
 * Created by Joey on 2016/3/4.
 */

"use strict"
var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        port:5432,
        user     : 'joeytai',
        password : 'joeytai',
        database : 'play',
        charset  : 'utf8'
    }
});

module.exports = require('bookshelf')(knex);
