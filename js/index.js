/**
 * Created by Joey on 2016/3/4.
 */


"use strict"

var bookshelf = require("./shelf");

var Author, Book;

Author = bookshelf.Model.extend({
    tableName: 'tbl_author',
    idAttribute:'author_id'

});

Book = bookshelf.Model.extend({
    tableName: 'tbl_book',
    idAttribute:'book_id'
});

//bookshelf.knex.select(bookshelf.knex.raw("nextval('author_seq') as id")).first().then(row=>{
//
//    return new Author().save({author_id:row['id'],author_name:'jbl'},{method:'insert'});
//
//}).then(st=>{
//
//    console.log(st)
//
//});

//new Author()
//    .query({where: {author_name: 'jbl'}})
//    .fetchAll()
//    .then(model => {
//       model.map(m=>{
//           console.log(m.toJSON())
//       })
//    });

Author.collection({author_name: 'jbl'}).fetch().then(model
=>{
    model.map(m=>{
           console.log(m.toJSON())
       })
});


//bookshelf.knex.destroy(()=>{
//    console.log("connection closed.");
//});

