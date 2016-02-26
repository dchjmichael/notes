## 变量

变量不言自明:

```less
@nice-blue: #5B83AD;//创建变量
@light-blue: @nice-blue + #111;

#header {
  color: @light-blue;
}
```

输出:
```
#header {
  color: #6c94be;
}
```
注意变量是常量所以只能定义一次

## 混合（Mixin）
混合就是把一串属性从一个规则集中包含到另一个规则集中。假如我们有以下的类：

```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```
我们想在其他规则集中使用这些属性，我们只需把这个类名放到我们需要的地方，就像这样：
```
#menu a {
  color: #111;
  .bordered;
}

.post a {
  color: red;
  .bordered;
}
```

`.bordered`类的属性就会出行在`#menu a`和`.post a`中。
输出结果：
```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```


注：我们也可以使用id选择器(#ids)来进行混合

更多参考：
- [More about mixins](http://lesscss.org/features/#mixins-feature)
- [Parametric Mixins](http://lesscss.org/features/#mixins-parametric-feature)

## 嵌套规则

我们可以使用嵌套代替级联或者与级联组合。假如我们有如下的css：
```
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

less中可以这样写：
```
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```
结果是一样的。

我们可以在嵌套中将伪选择器和混合一起使用。如下（`&`表示当前选择器的父亲）：
```
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```
结果:
```
.clearfix {
  display: block;
  zoom: 1;
}
.clearfix:after {
  content: " ";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
  visibility: hidden;
}
```

## 指令嵌套和冒泡
`media`和`keyframe`指令也可以像选择器一样进行嵌套。指令放在顶部而且在同一个规则集中和其他元素的相对顺序保持不变，这就做冒泡。

条件指令比如`@media`，`@supports`和`@document`会把选择器复制到它们的结构体中。
```
.screen-color {
  @media screen {
    color: green;
    @media (min-width: 768px) {
      color: red;
    }
  }
  @media tv {
    color: black;
  }
}
```
输出：
```
@media screen {
  .screen-color {
    color: green;
  }
}
@media screen and (min-width: 768px) {
  .screen-color {
    color: red;
  }
}
@media tv {
  .screen-color {
    color: black;
  }
}
```
剩下的非条件指令，比如`font-face`或`keyframes`，也会冒泡，它们的结构体不会变：
```
#a {
  color: blue;
  @font-face {
    src: made-up-url;
  }
  padding: 2 2 2 2;
}
```
输出：
```
#a {
  color: blue;
}
@font-face {
  src: made-up-url;
}
#a {
  padding: 2 2 2 2;
}
```
## 运算

算数运算`+`，`-`，`*`，`/`可以对任意数字，颜色和变量进行运算。如果可能的话，数学运算会把单位考虑进行，并在加，减，比较前进行换算。最左边操作数的单位作为运算结果的单位。如果无法进行转换或者毫无意义，单位会被忽略，比如： px 转成 cm or rad(弧度) to %（百分比）.
```
// 数字会被转成相同的单位
@conversion-1: 5cm + 10mm; //结果为6cm
@conversion-2: 2 - 3cm - 5mm; //结果为-1.5cm

// 无效转换
@incompatible-units: 2 + 5px - 3cm; // 结果是4px(2+5-3=4，单位用最左边的px)

@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```

乘法和除法不会进行转换，因为大部分情况下都是没有意义的-虽然长度相乘表示面积，但是css不支持面积。less把指定的单单位作为结果：
```
@base: 2cm * 3mm; // 结果为6cm
```

颜色被分割为红，绿，蓝和透明通道（RGBA）。运算操作独立地作用于每个通道上。如果对2个颜色相加，那么最终的绿色值等于2个绿色值的和。如果颜色和一个数字相乘，那么每个颜色通道都会被乘。

注：alpha通道的运算未被定义，因为颜色的算数运算没有统一的标准，不要依赖当前的实现，后续版本可能会改。

颜色操作总是产生一个有效的颜色。如果某个通道的运算结果超过`ff`或者小于`00`，会就近选择`ff`或`00`，如果alpha结果大于`1.0`或小于`0.0`，就近选择`1.0`或`0.0`。
```
@color: #224488 / 2; //结果为#112244
background-color: #112244 + #111; //结果为#223355
```

## 转义

转义可以使我们把任意字符串作为属性或变量的值。~"内容"或~\`内容\` 中的内容会被原封不动地输出除了变量改写。
```
.weird-element {
  content: ~"^//* some horrible but needed css hack";
}
```
结果：
```
.weird-element {
  content: ^//* some horrible but needed css hack;
}
```

## 函数
Less提供了很多函数用于颜色转换，字符串操作以及数学运算。
```
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // percentage函数把0.5转成50%
  color: saturate(@base, 5%);//饱和度增加5%， #f6430f
  background-color: spin(lighten(@base, 25%), 8);//降低25%后旋转8度， #f8b38d;
}
```

## 名字空间和访问器
(不要和CSS @namespace 搞混).
有时我们想把混合分组已更好的组织代码或为了封装。比如把代码放到`#bundle`下面用于重用：
```
#bundle {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white
    }
  }
  .tab { ... }
  .citation { ... }
}
```
现在我们想把`.button`类混入到`#header a`：
```
#header a {
  color: orange;
  #bundle > .button;
}
```


## 作用域
类似于其他编程语言中的作用域。首先在当前作用域中查找变量和混合，再在父作用域查找。
```
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```
变量和混合不需要在使用前进行声明，所以下面的代码和之前完全相同。
```
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```


## 注释
```
/* 多行
注释 */
@var: red;

//单行注释
@var: white;
```

## 引入
引入另一个`.less`文件，文件中的所有变量都能访问。默认扩展名为`.less`文件
```
@import "library"; // library.less
@import "typo.css";
```