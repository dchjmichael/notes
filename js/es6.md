## let
let用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。作用域为块级作用域。
```
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

## Promise


## 箭头函数
箭头`=>`语法类似于java8中的lambda表达式，箭头函数就是个简写形式的函数表达式。

基本语法：

```
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
         // 等价于:  => { return expression; }
		//function(param1,param2,...paramN){ expression;}

// 如果只有一个参数，圆括号是可选的:
(singleParam) => { statements }
singleParam => { statements }

// 无参数的函数需要使用圆括号:
() => { statements }
```

箭头函数则会捕获其所在上下文的  this 值，作为自己的 this 值，因此下面的代码输出1。

```
function Person(){
    this.age = 0;

    ()=>{this.age++}();
}

var p = new Person();
console.log(p.age);
```

## Class
用class声明一个类，使用方式很接近传统的oo语言(如java，c++)，但本质上还是个function。
```
class Person {
    constructor(age) {
        this.age = age;
    }

    say(){
        console.log("hi , i am "+this.age+" years old.");
    }
}

console.log(typeof Person);//function
console.log(Person === Person.prototype.constructor);//true
```

类中的所有方法都定义在类的prototype属性上。
class中不存在类型提升。
```
new Foo(); // ReferenceError
class Foo {}
```
### 继承
可以通过`extends`关键字继承。
```
class Student extends Person{

    constructor(age,school){
        super(age);//调用父类构造函数
        this.school = school;
    }

    say(){
        super.say();//父类的say方法
        console.log("I am from "+this.school);
    }
}
```

### 静态方法
如果在一个方法前，加上static关键字，就表示该方法不能通过实例来调用，而是直接通过类来调用，这就称为“静态方法”。
```
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod();//TypeError: foo.classMethod is not a function
```

##对象字面量扩展
ES6允许直接写入变量和函数，作为对象的属性名和方法名。这样的书写更加简洁。
```
var foo = 'bar';
var baz = {foo}; // 等价于{foo:"bar"}
```
方法也可以简写：
```
var o = {
  method() {
    return "Hello!";
  }
};

// 等同于

var o = {
  method: function() {
    return "Hello!";
  }
};
```