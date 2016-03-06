#Sequelize
[Sequelize](https://github.com/sequelize/sequelize)是一个基于Promise的ORM框架，支持PostgreSQL，MySQL，MariaDB，SQLite以及MSSQL，支持事务，关系映射，读复制等。

## 设置

### 安装
```sh
npm install --save sequelize

# 任选其一:
$ npm install --save pg pg-hstore //PostgreSQL
$ npm install --save mysql // mysql和mariaDB都用这个
$ npm install --save sqlite3
$ npm install --save tedious // MSSQL
```


### 初始化
```javascript
var  Sequelize = require("sequelize");

var sequelize = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 1,
        min: 0,
        idle: 10000
    },

});

// 或者直接通过uri创建连接
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

[所有参数](http://sequelize.readthedocs.org/en/latest/api/sequelize/)

### 定义模型
`define(modelName, attributes, [options])`

- modelName 模型名，不是数据库表名
- attributes 属性定义，
- 选项

```javascript
var Author = sequelize.define('author', {
    authorId: {
        type: Sequelize.BIGINT,
        field: 'author_id',
        primaryKey:true //定义为主键
    },
    authorName: {
        type: Sequelize.STRING,
        field:'author_name'
    }
}, {
    tableName:'tbl_author',
    timestamps:false
    
    //sequelize会在模型定义的时候自动添加createdAt和updatedAt属性，这样我们可以知道每行记录的变更时间
  //如果不想要这个特性，可以把timestamps置为false
 // timestamps: false,

  //不要删除记录，而是添加一个deletedAt属性，只有在timestamps启用的情况下才有效。
  //paranoid: true,


  //不对自动添加的属性使用驼峰命名法，而是用下划线风格。
  //因此updatedAt变成udpated_at
  //underscored: true,

  //禁止修改表名，sequelize默认会把所有模型的名字（define方法的第一个参数）转成复数
  //不需要的话就设成true，这样模型名就是表名
  //freezeTableName: true,

  //自定义表名
  //tableName: 'my_very_custom_table_name'
    
});

var Book = sequelize.define('book',{
    bookId:{
        type:Sequelize.BIGINT,
        field:'book_id',
        primaryKey:true
    },
    authorId:{
        type:Sequelize.BIGINT,
        field:'author_id',
        foreignKey:true
    },
    title:{
        type:Sequelize.STRING,
        field:'book_title'
    }
},{
    tableName: 'tbl_book',
    timestamps: false
});

```
[详细文档](http://sequelize.readthedocs.org/en/latest/docs/models-definition/)



## 查询
查询返回的是model实例而不是普通对象。

`Model.findXXX(params)`

params是查询条件，如`{where : { authorName : 'joe'} , attributes :['id',['name','title']]}`,`attributes`表示返回指定的列，上例表示返回id和name这2列，但是name返回的时候转成title，也就是`select id , name as title from table_name`。

- `findById(1)`  

	根据主键查找，需要在模型中设置primaryKey，默认主键名为“id”.

- `findByPrimary(1)`

	同`findById`
	
- `findOne`

	`findOne`返回模型实例

- `findAll` 

	`findAll`返回数组，也可以用`all()`
	
- `findOrCreate`	

	查询指定的1个元素，如果找不到就插入一个新的。
- `findAndCountAll`

  查询指定的对象，并且返回符合条件的数量，这个在分页的时候比较有用。
  
```javascript
function exec(Model, Func, Params ,spread) {
    var future = Model[Func](Params);
    if(spread){
        future.spread(
            (user , created) => {
                console.log(JSON.stringify(user , null , 4));
                console.log(created);
            }
        );
    }else{
        future.then(
            (user) => {
                console.log(JSON.stringify(user , null , 4));
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
```
  
### Raw查询
返回原始数据，不对返回的记录生成增，删，改等方法。这在大数据集的时候很有用。方法是在查询时设置`{raw:true}`
  

###饥渴加载
使用`include`在查询时顺便获取关联的数据，比如：


```javascript
定义模型
var User = sequelize.define('user', { name: Sequelize.STRING })
  , Task = sequelize.define('task', { name: Sequelize.STRING })
  , Tool = sequelize.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })

//User对应多个Task，Tool

//同步表结构
sequelize.sync().then(function() {
  // this is where we continue ...
})
```
让我们在加载task时加载User：

```javascript
Task.findAll({ include: [ User ] }).then(function(tasks) {
  console.log(JSON.stringify(tasks))

  /*
    [{
      "name": "A Task",
      "id": 1,
      "createdAt": "2013-03-20T20:31:40.000Z",
      "updatedAt": "2013-03-20T20:31:40.000Z",
      "userId": 1,
      "user": {
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z"
      }
    }]
  */
})
```
注意返回的`user`是单数的，因为是Task和User是1:1的。

下面来个多关联的：

```javascript
User.findAll({ include: [ Task ] }).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "tasks": [{ //这里是复数，因为多个关联
        "name": "A Task",
        "id": 1,
        "createdAt": "2013-03-20T20:31:40.000Z",
        "updatedAt": "2013-03-20T20:31:40.000Z",
        "userId": 1
      }]
    }]
  */
})
```

可以用`as`指定关联的别名：

```javascript
User.findAll({ include: [{ model: Tool, as: 'Instruments' }] }).then(function(users) {
  console.log(JSON.stringify(users))

  /*
    [{
      "name": "John Doe",
      "id": 1,
      "createdAt": "2013-03-20T20:31:45.000Z",
      "updatedAt": "2013-03-20T20:31:45.000Z",
      "Instruments": [{ // 使用了as指定的别名
        "name": "Toothpick",
        "id": 1,
        "createdAt": null,
        "updatedAt": null,
        "userId": 1
      }]
    }]
  */
})
```

在饥渴加载的时候也可以用`where`对关联的模型进行过滤，下面会返回用户的符合`where`条件的Tool：

```javascript
User.findAll({
    include: [{
        model: Tool,
        as: 'Instruments',
        where: { name: { $like: '%ooth%' } } //Tool名字模糊匹配ooth
    }]
}).then(function(users) {
    console.log(JSON.stringify(users))

    /*
      [{
        "name": "John Doe",
        "id": 1,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z",
        "Instruments": [{
          "name": "Toothpick",
          "id": 1,
          "createdAt": null,
          "updatedAt": null,
          "userId": 1
        }]
      }],

      [{
        "name": "John Smith",
        "id": 2,
        "createdAt": "2013-03-20T20:31:45.000Z",
        "updatedAt": "2013-03-20T20:31:45.000Z",
        "Instruments": [{
          "name": "Toothpick",
          "id": 1,
          "createdAt": null,
          "updatedAt": null,
          "userId": 1
        }]
      }],
    */
  })
```


##关联
- hasOne - 在目标模型上添加一个外键来进行单关联
- belongsTo - 在当前模型上添加一个外键来进行单关联
- hasMany - 在目标模型上添加一个外键来进行多关联
- belongsToMany - 用join表的方式来创建N:M的关联，连接表是通过sourceId和targetId来创建的。

```javascript
//Author有多个Book
Author.hasMany(Book,{
    foreignKey:{
        name:'authorId',
        allowNull:false
    }
});

Book.belongsTo(Author,{
    foreignKey:{
        name:'authorId',//每个Book对应一个Author
        allowNull:false
    }
});

exec(Author, 'findAll', {where: {authorName: 'jbl'}, include: [{model: Book}]});//获取作者的所有书
```

##事务
Sequelize支持2种事务：

- 自动对Promise链的结果进行提交或回滚，并且把事务传递给所有的回调。
- 把事务的提交，回滚和传递交给使用者自己来处理。


### 托管事务
托管的事务会自动提交或回滚事务，通过传一个回调给`sequelize.transaction`来开始一个托管的事务。

```javascript
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
  // 此处事务已经提交
  // result是promise链最后返回的值
}).catch(function (err) {
  // 此处事务以及回滚
  // err是promise链抛出的异常
});
```
当使用自动管理的事务时，我们绝不可以手动提交或回滚事务，如果一定要回滚的话，就抛出异常来拒绝promise。

```javascript
return sequelize.transaction(function (t) {
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(function (user) {
    // Woops, the query was successful but we still want to roll back!
    throw new Error();
  });
});
```

之前的例子中，事务还是通过`{ transaction: t }`作为第二个参数传递的。如果想自动把事务传给所有的查询，需要安装[continuation local storage](https://github.com/othiym23/node-continuation-local-storage)模块，并在代码中初始化一个namespace。

```javascript
var cls = require('continuation-local-storage'),
    namespace = cls.createNamespace('my-very-own-namespace');
```
启用CLS：

```javascript
var Sequelize = require('sequelize');
Sequelize.cls = namespace;

new Sequelize(....);
```
注意`cls`必须设置给Sequelize构造函数，而不是sequelize实例，这样所有的实例都会共用相同的namespace。

CLS就像java中的ThreadLocale一样，这样不同的回调链都可以通过CLS名字空间来访问本地变量。在CLS启用时，当有新的事务创建时，sequelize会把`transaction`属性设置在名字空间上。因为同一个回调链中的变量都是私有的，其他回调链中访问不到，因此同一时刻会存在多个并非事务。

```javascript
sequelize.transaction(function (t1) {
  namespace.get('transaction') === t1; // true
});

sequelize.transaction(function (t2) {
  namespace.get('transaction') === t2; // true
});
```

当然大多数情况下我们不需要直接访问`namespace.get('transaction')`，因为所有的查询会自动在名字空间中查找事务，代码中可以省略事务的显示传递：

```javascript
sequelize.transaction(function (t1) {
  // With CLS enabled, the user will be created inside the transaction
  return User.create({ name: 'Alice' });
});
```

###事务隔离级别

```javascript
Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
Sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ" 这是默认级别
Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
```

手动设置隔离级别：

```javascript
return sequelize.transaction({
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
  }, function (t) {

  // your transactions

  });
```

###非托管事务
非托管事务不会自动提交和回滚，它会自动挂起直到超时。

```javascript
//不传递回调给transaction()方法来开启一个非托管事务
return sequelize.transaction().then(function (t) {
  return User.create({
    firstName: 'Homer',
    lastName: 'Simpson'
  }, {transaction: t}).then(function (user) {
    return user.addSibling({
      firstName: 'Lisa',
      lastName: 'Simpson'
    }, {transaction: t});
  }).then(function () {
    return t.commit();//手动提交
  }).catch(function (err) {
    return t.rollback();//手动回滚
  });
});
```

###事务参数
`transaction `调用时可以传一个options对象作为第一个参数。

```javascript
return sequelize.transaction({ /* options */ });
```
可用选项：

```javascript
{
  autocommit: true,
  isolationLevel: 'REPEATABLE_READ',
  deferrable: 'NOT DEFERRABLE' // implicit default of postgres
}
```
