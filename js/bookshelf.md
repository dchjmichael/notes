#Bookshelf
Bookshelf是一个基于[Knex](http://knexjs.org/)的ORM框架，提供了一对一，一对多，多对多的关联映射。

##安装
```sh
$ npm install knex --save
$ npm install bookshelf --save

# 选择下列之一数据库驱动:
$ npm install pg
$ npm install mysql
$ npm install mariasql
$ npm install sqlite3
```

初始化：
```
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
	port	 : 5432,
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);
```

表结构定义：
![](http://i.imgur.com/Ry18XMG.png)

定义模型：
```javascript
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
```

## 插入

```
bookshelf.knex
	.select(bookshelf.knex.raw("nextval('author_seq') as id"))	//用PG的sequence生成id
	.first().then(row=>{
    	return new Author().save({author_id:row['id'],author_name:'jbl'},{method:'insert'});
}).then(st=>{
    console.log(st)
});
```