/**
 * Created by Joey on 2016/3/4.
 */


"use strict"

var bookshelf = require("./shelf");

var Author, Book;

Author = bookshelf.Model.extend({
    tableName: 'tbl_author',
    idAttribute: 'author_id',
    books:function() {
        return this.hasMany(Book);
    }

});

Book = bookshelf.Model.extend({
    tableName: 'tbl_book',
    idAttribute: 'book_id'
});

//bookshelf.knex.select(bookshelf.knex.raw("nextval('author_seq') as id")).first().then(row=>{
//
//    return new Author().save({author_id:row['id'],author_name:'jb'},{method:'insert'});
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


//Author.where({author_name: 'jbl'}).fetchAll({withRelated:"books"}).then(
//    model => {
//        model.map(m => {
//            console.log(m.toJSON());
//        });
//    }
//);

Author.where({author_name: 'jbl'}).fetch({withRelated: ['books']}).then(function(book) {
    console.log(JSON.stringify(book.related('author')));
});


//bookshelf.knex.destroy(()=>{
//    console.log("connection closed.");
//});

