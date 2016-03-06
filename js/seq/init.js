/**
 * Created by joeytai on 16/3/5.
 */

var Sequelize = require("sequelize");

var sequelize = new Sequelize('play', 'joeytai', 'joeytai', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 1,
        min: 0,
        idle: 10000
    },

});

var Author = sequelize.define('author', {
    authorId: {
        type: Sequelize.BIGINT,
        field: 'author_id',
        primaryKey: true
    },
    authorName: {
        type: Sequelize.STRING,
        field: 'author_name'
    }
}, {
    tableName: 'tbl_author',
    timestamps: false
});

var Book = sequelize.define('book', {
    bookId: {
        type: Sequelize.BIGINT,
        field: 'book_id',
        primaryKey: true
    },
    authorId: {
        type: Sequelize.BIGINT,
        field: 'author_id',
        foreignKey: true
    },
    title: {
        type: Sequelize.STRING,
        field: 'book_title'
    }
}, {
    tableName: 'tbl_book',
    timestamps: false
});


Author.hasMany(Book, {
    foreignKey: {
        name: 'authorId',
        allowNull: false
    }
});

Book.belongsTo(Author, {
    foreignKey: {
        name: 'authorId',
        allowNull: false
    }
});

// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

//Author.findOne().then(function (user) {
//    console.log(user.authorName);
//});
//Author.findByPrimary(2).then(user => {
//
//    console.log(user.authorName);
//});


function exec(Model, Func, Params, spread) {
    var future = Model[Func](Params);
    if (spread) {
        future.spread(
            (user, created) => {
                console.log(JSON.stringify(user, null, 4));
                console.log(created);
            }
        );
    } else {
        future.then(
            (user) => {
                console.log(JSON.stringify(user, null, 4));
            }
        );
    }
}

//exec(Author,'findByPrimary',1);
//exec(Author, 'findOne', {where: {authorName: 'jbl'}});
//exec(Author, 'findAll', {where: {authorName: 'jb'}});
//exec(Author, 'all', {where: {authorName: 'jbl'}});

//Author.findOrCreate({where:{}})
//exec(Author, 'findOrCreate', {where: {authorName: 'newAUthor'} , defaults:{authorId:4,authorName:'newAUthor'}}  , true);
//exec(Author,'findAndCountAll',{where:{authorName:'jbl'},limit:1,offset:0});

//exec(Author, 'findAll', {where: {authorName: 'jbl'}, include: [{model: Book}]});

return sequelize.transaction(function (t) {

    // chain all your queries here. make sure you return them.
    return User.create({
        firstName: 'Abraham',
        lastName: 'Lincoln'
    }, {transaction: t}).then(function (user) {
        return user.setShooter({
            firstName: 'John',
            lastName: 'Boothe'
        }, {transaction: t});
    });

}).then(function (result) {
    // Transaction has been committed
    // result is whatever the result of the promise chain returned to the transaction callback
}).catch(function (err) {
    // Transaction has been rolled back
    // err is whatever rejected the promise chain returned to the transaction callback
});