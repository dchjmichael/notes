## Knex
[Knex.js](http://knexjs.org/)是一个支持Postgres，MySQL，MariaDB，SQLite3和Oracle的数据库查询框架。

### 连接
```
var knex = require('knex')({
    client: 'pg',
    connection: {
        host     : '127.0.0.1',
        port    : 5432,
        user     : 'postgres',
        password : 'postgres',
        database : 'user'
    }
});
```

##查询
```
knex.select("icon","llt").from("olala_user_info").where("uid","<=", 1000022)
```

###回调方式获取结果
```
knex.select("icon", "name")
    .from("tbl_user")
    .where("uid", "<=", 1000000)
    .asCallback(
        (err, rows) => {
            rows.map(row => {
                console.log(row);
            });
});
```

### Promise方式获取结果
```
knex.select("icon", "name")
    .from("tbl_user")
    .where("uid", "<=", 1000000)
    .then(rows => {
            rows.map(row => {
                console.log(row);
            });
});

```

## 插入
```
//批量插入2跳
knex("tbl_user").insert([{name:"john",age:14},{name:"michael",age:22}]).then(stats => {
    console.log(stats);
});
//等于insert into tbl_user(name,age) values('john',14),('michael',22)
```

## 删除
```
knex("tbl_user").where({"name":"john"}).del().then(
    stats => {
        console.log(stats);
    }
);
//delete from tbl_user where name='john'
```

##更新
```
knex('tbl_user')
    .where('age', '=', 22)
    .update({
        age: 23,
        name:'tom'
    }).then(stat=>{
    console.log(stat);
});
```

##连接池
MySQL和PG的默认连接池为`min: 2, max: 10`，SQLite只有1个连接。可以通过如下方式设置连接池大小。
```
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  },
  pool: {
    min: 0,
    max: 7
  }
});
```
详细参数参考[Pool2](https://github.com/myndzi/pool2)

## 事务



