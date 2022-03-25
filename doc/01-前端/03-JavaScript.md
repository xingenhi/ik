# 01-【熟悉】JavaScript 简介

**一，JavaScript是什么?**

javaScript是弱类型语言,是一种基于对象和事件驱动并具有安全性能的脚本语言

弱类型语言特征:数据类型可以忽略,一个变量可以赋予不同的数据类型

标签放入css中使用就是选择器,放入到js中使用就是对象

事件驱动:鼠标点击、键盘输入等启动预先设置的相应动作

脚本语言：不需要通过服务器来执行的属于前台的语言。

---

**二，JavaScript特点**

简单性：它是基于Java基本语句和控制流之上的简单而紧凑的设计，是学习Java的好过渡，而且，它的变量类型是采用弱类型，未采用严格的数据类型。

安全性：JS不允许访问本地硬盘，不能将数据存入到服务器上，不允许对网络文档进行修改和删除，只能通过浏览器实现信息浏览或动态交互，从而有效的防止数据的丢失。

动态性：JS可以直接对用户或客户输入做出响应，无须经过Web程序。它对用户的响应采用以事件驱动的方式进行，即由某种操作动作引起相应的事件响应，如：点击鼠标、移动窗口、选择菜单等。

跨平台性：JS依赖于浏览器本身，与操作环境无关。只要能运行浏览器的计算机，并安装了支持JS的浏览器就可以正确执行，从而实现了“编写一次，走遍天下”的梦想。

---

**三，JavaScript作用**

1.实现网页特效

2.读写页面元素

3.表单验证

4.响应事件

5.控制浏览器中的cookies

6.制作游戏,动画

...

---

四，JavaScript组成

1.ECMAScript

由ECMA-262定义的ECMASctipt与Web浏览器没有依赖关系.实际上,这门语言本身并不包含输入和输出定义.ECMA-262定义的只是这门语言的基础,而在此基础之上可以构建更完善的脚步语言.它主要规定了这个语言的下列组成部分:语法,类型,语句,关键字,保留字，操作符,对象



2.文档对象模型DOM

DOM(Document Object Model)是针对XML但经过扩展用于HTML的应用程序编程接口。DOM把整个页面映射为一个多层节点结构.借助DOM提供的API,开发人员可以轻松自如的删除，添加，替换或者修改任何节点.

DOM并不只是针对于javaScript的,很多别的语言也都实现了DOM。



3.浏览器对象模型BOM(可以访问和操作浏览器窗口)

BOM真正与众不同的地方(也是经常会导致问题的地方)是它作为javaScript实现的一部分但却没有相关的标准,这个问题在HTML5中得到了解决,HTML5致力于把很多BOM功能写入正式规范。

---

**五，Javascript历史和版本**

ECMAScript是一种由欧洲计算机制造商协会（ECMA）通过ECMA-262标准化的脚本程序设计语言。这种语言在万维网上应用广泛，它往往被称为JavaScript或JScript，但实际上后两者是ECMA-262标准的扩展。

详解：

http://baike.baidu.com/view/810176.htm 

JavaScript/jscript / ECMAScript 关系？

javaScript是由Netscape公司开发 .它的前身是Live Script 

Microsoft发行jscript用于internet explorer 

最初的jscript和javascript差异过大，web程序员不得不痛苦的为两种浏览器编写两种脚本。于是诞生了ECMAScript,是一种国际标准化的javascript版本。现在的主流浏览器都支持这种版本。 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5f6234de-a0b4-4ad8-bb70-07ea5b3d6a92.jpg)

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae3630fde-7edd-4ce4-b0c5-8cb03e4a3721.png)

---

**六，Javascript和java的区别联系**

Javascript和java除了名字和语法有点像，其他没有任何的关系。主要做:富客户端开发.

做个比较是为了让大家更好地理解javascript，事实上，两个语言根本没有可比性，是完全不同的。

|            | Javascript                                                   | Java       |
| ---------- | ------------------------------------------------------------ | ---------- |
| 对象       | **基于对象**，不能说是面向对象。比如：javascript不支持直接继承，<br>而要通过一个原型对象来间接实现。多态就更不支持了。它们使用一些封装好的对象，<br>调用对象的方法，设置对象的属性，但是它们无法让程序员派生新对象类型，<br>他们只能使用现有对象的方法和属性，所以当你判断一个新技术是否是面向对象的时候，<br>通常可以使用后两个特性加以判断，“面向对象”和“基于对象”都实现了“封装”<br>的概念，但“面向对象”实现了“继承”和“多态”，而“基于对象”可以不实现这些。 | 面向对象   |
| 解释和编译 | 解释                                                         | 编译、解释 |
| 变量类型   | 弱变量类型。<br>js的弱类型是变量的弱类型                     | 强变量类型 |

# 02-【掌握】如何在网页中使用脚本语言

   **一，JS的引用方式**

1，在HTML文档中插入脚本语言可以使用标记   

```Plain Text
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>JavaScript初级</title>
		<script>
			function test(){
				alert("我的第一个js程序！");
			}
		</script>
	</head>
	<body>
		<input type=button value=测试  onclick="test();"  />
	</body>
</html>
```

2，在实际应用中考虑到脚本语言书写的代码可能会比较长，可以将脚本语言单独写在扩展明为.js的脚本文件中，然后在标记中设置src属性的值为脚本文件的位置和名称 

HTML中

```Plain Text
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>JavaScript初级</title>
		<script src="2.js" type="text/javascript"></script>
	</head>
	<body>
		<input type=button value=测试  onclick="test();"  />
	</body>
</html>
```

2.js中

```Plain Text
function test(){
     alert("我的第一个js程序！");
}
//不能再js文件中写：<script>标记，这个标记是html标记!	
```

---

**二，标记的使用要点**

标记可以置于页面任意位置！  定义函数一般置于中  可以直接写js语句。  注意事项: 1. 此语法不符合html规范. 2.如果script 中存在加载外部js文件,而且又在标签中含有ja代码块,则只会下载并执行外部脚本文件,嵌入的代码会被忽略. 3.浏览器按照元素在页面中出现的先后顺序对它们依次进行解析 4.如果将js放入元素中引用,当js代码很多的时候,会导致浏览器在呈现页面时，出现明显的延迟,而延迟期间浏览器窗口是一片空白,为了避免这个问题,一般将全部的js放在元素中页面的内容后面引用 

```Plain Text
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>JavaScript初级</title>
        <script>
            function test(){
                alert("我的第一个js程序！");
            }
        </script>
    </head>
    <body>
        <input type=button value=测试 onclick="test();"/>
        <script>
            alert("script标记可以置于页面任意部分！甚至可以直接执行js语句！");
        </script>
    </body>
</html>
```

# 03-【掌握】变量和数据类型

**一，基本数据类型**

1. undefined未定义 (声明了变量但从未赋值 )  
2. null空  (赋值为null)   
3. boolean布尔型 (true,false)   
4. 字符串string (单引号、双引号均可)   
5. 数值number 包括整数和小数，NaN（Not a Number），Infinity, -Infinity   
6. 对象object   

---

**二，变量的声明**

JavaScript 是一种弱类型的脚本语言。 

变量的声明(变量使用之前必须加var声明，编程规范)

可以通过var关键字来声明一个变量 

典型声明方式：

var a=1;       var a, b=2, c;      var date = new Date(); 

var array = new Array();   //声明数组 

不能使用未经声明的变量。 

全局变量 

* 在方法外部声明的变量   
* 方法内部，没有加var关键字声明的变量   

局部变量 

* 方法内部，使用var声明的变量   

补充：

Javascript:void(0); 用于超链接 

Javascript伪协议 

```Plain Text
<script>
	var a = 1;   //全局变量，页面被加载时就执行！
	function test1(){
		var b = 3;   //局部变量!
		c = 4;    //执行完方法test1后就被解释成全局变量！
	}
	function test2(){
		alert(a);
		alert(c);   //先执行test1，再执行test2才能看到c的值！
		alert(b);
	}
</script>
```

```Plain Text
<input type=button value=测试javascript伪协议  
onclick="javascript:var a=3;alert(a);alert('a+3='+(a+3));" />
```

变量的命名规则

1.变量命名必须以英文字母或是下标符号”\_”或者”\$”为开头。

2.变量名长度不能超过15个字符。

3.变量名中不允许使用空格。

4.不能使用脚本语言中保留的关键字及保留符号作为变量名。例如：var、\*等。

5.变量名区分大小写。(javascript是区分大小写的语言)

**三，相关数据类型说明**

1.Undefined类型

Undefined类型只有一个值,即特殊的undefined.

在使用var声明变量但未对其加以初始化时,这个变量的值就是undefined。

undefined 表示一个未声明的变量，或已声明但没有赋值的变量，或一个并不存在的对象属性.

当试图访问一个不存在的变量时,就会得到一个特殊值:undefined。

使用一个未初始化的变量也会如此。因为js会自动将变量在初始化之前的值设定为undefined.



var userName； //这个变量声明之后默认取得了undefined值

alert(typeof userName); // undefined;

alert(typeof passWord);//undefined;



2.Null类型

只有一个值null,使用typeof检测时会返回object

如果定义的变量准备在将来用于保存对象,那么最好将该变量初始化为null而不是其他值。

实际上,undefined值是派生自null值 即 null==undefined;

尽管null和undefined有这样的关系,但它们的用途完全不同.无论在什么情况下,都没有必要把一个变量的值显式地设置为undefined,在可以设置成null,只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存null值。



3.Boolean类型

该类型只有两个值true和false

Boolean()函数 将任何数据类型的值都转换成Boolean值

String类型  任何非空字符串返回true，" "空字符串返回false

Number类型  任何非零数字值返回true,0和NaN返回false

Undefined 返回false



案例:

var str ="字符串自动在if中转Boolean";//当字符串不为空Boolean(str)返回true

  if(str){

       alert("可以进入语句块");

 }  

字符串自动转成对应的Boolean值,由于存在这种自动执行的Boolean转换,因此要清楚的知道在流程控制语句中使用的是什么变量很重要



4.Number类型

用来表示整数和浮点数值(指的是双精度数值).

数据格式可以是:十进制,八进制,十六进制 整数



数值的范围

Number.MAX\_VALUE  获取数值类型的最大值

Number.MIN\_VALUE  获取数值类型的最小值

如果超出数值范围则显示Infinity 无穷大或者-Infinity 负无穷大

Infinity 是一个特殊值,它表示的是超出了js处理范围的数值,但Infinity依然是一个数字。

console.log(Infinity-Infinity); //NaN    这个是控制器的日志输出

console.log(-Infinity+Infinity);//NaN  

正负Infinity相加不是0而是一个NaN，Infinity与其他的任何操作数执行任何算术运算的结果都是Infinity或者-Infinity



isNaN()函数,可以接受一个参数,该参数可以是任何类型，而函数会帮我们确定这个参数是否“不是数值”。

isNaN()在接收到一个值之后，会尝试将这个值转换为数值.



浮点数值:该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字。

由于保存浮点数值需要的内存空间是保存整数值的两倍,js会不留余地的将浮点数值转换为整数值。当小数点后面没有跟任何数字，那么这个数值就可以整数值.

案例:

var a = 10.;

var b = 10.00;

document.write(a+"");//10

document.write(b+"");  //10



var a = 0.1;

var b = 0.2;

document.write(a+b);//0.30000000000000004  

浮点数值的最高精度是17位小数，但在进行算术计算时其精确度远远不如整数.测试特定的浮点数值时会存在误差,即永远不要测试某个特定的浮点数值



数值转换

1.Number() 用于任何数据类型

如果是Boolean值,则转换成1和0

如果是数值,只是简单的传入和返回

如果是null值，返回0

如果是undefined，返回NaN

如果是字符串

(1)如果字符串中只包含数字和正负号,则将其转换为十进制数值(忽略前导的零)

(2)如果字符串中包含有效的浮点格式,则将其转换为对应的浮点数值(忽略前导的零)

(3)如果字符串是空,则将其转换为0

(4)如果字符串包含有效的16进制格式,则将其转换为相同大小的十进制数值

(5)如果字符串包含除以上格式的字符,则将其转换为NaN

(6)如果是对象则调用方法转换



5.String类型

字符串可以由双引号或者单引号表示

1.字符字面量

String数据类型包含一些特殊的字符字面量,也叫转义序列

可以在 JavaScript 中使用反斜杠来向文本字符串添加特殊字符

\\' 单引号，\\"双引号，\\\\反斜杠

\\t制表符，\\& 和号，\\b退格符，\\f换页符

\\r 回车 作用:使光标到行首

\\n换行 作用:使光标下移一行

\\r\\n 回车换行

2.字符串的特点

字符串一旦创建,它们的值就不能改变,要改变某个变量保存的字符串,首先要销毁原来的字符串，然后再将一个包含新值得字符串填充该变量.

3.字符串转换

(1)toString()方法,返回相应的字符串表现，数值,布尔值,对象和字符串都有toString()方法,但null和undefined没有

(2)String() 能够将任何类型的值转换为字符串,如果值有toString()方法,则调用该方法并返回相应的结果，如果值是null,则返回"null";如果值是undefined,则返回"undefined"

(3)当将一个数字字符串用于算术运算中的操作数时,该字符串会在运算中被当做数字类型来使用。

var str01 = "3";

var str02 = str01\*3;

console.log(typeof str02);//number  

(4)其他类型转换为字符串,只需要将其与空字符串拼接即可

```Plain Text
<html>


	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>JavaScript初级</title>
		<script>
			function testNullUndefined() { 
				var a;
				var b = null;
				document.write("a的数据类型：" + a + "<br>");
				document.write("b的数据类型：" + b + "<br>");
			}
			function testBoolean() {
				var a = true;
				var b = false;
				if(a) {
					alert("a的数据类型是boolean！");
				}
			}
			function testString() {
				var a = "aaa";
				var b = 'bbbb';
				var c = new String("cccc");
				document.write(a + "<br/>" + b + "<br>" + c);
				//外面用单引号，里面双引号。或者外面双引号，里面单引号。
                 //假如子字符串包含引号的常见的处理技巧！
				var e = '"eeeee"';   
				var f = "U're right!";   //var f = 'U're right!';  //这么写会出错！
				alert(e + "\n" + f);
			}
			function testNumber() {
				var a = 123;
				var b = 12.345;
				var c = NaN;
				var d = 1 / 0;
				document.write(a + "<br>" + b + "<br>" + c + "<br>" + d);
				if(c == c) {
					alert("c==c");
				} else {
					alert("c是NaN值，他是js中唯一一个跟自己不相等的值！
                     我们可以利用这个特点判断某个值是不是NaN！");
				}
				if(isNaN(parseInt("sss"))) {
					alert("刚刚运算的结果是：NaN！");
				}
			}
			function testObject() {
				var d = new Date();
				alert(d);   //其他对象，以及js基于对象编程，以后会讲！今天先了解下！
			}
		</script>
	</head>


	<body>
		<input type=button value=测试null和undefinedonclick="testNullUndefined();" />
		<input type=button value=测试booleanonclick="testBoolean();" />
		<input type=button value=测试Stringonclick="testString();" />
		<input type=button value=测试Numberonclick="testNumber();" />
		<input type=button value=测试Objectonclick="testObject();" />
	</body>
</html>
```

# 04-【掌握】表达式与运算符

**一，运算符的分类**

1，算术运算符(+ - \*  /   %   ++    --)

2，赋值运算符(=  +=  \*=   /=   %=)

3，条件运算符(===   ==   >   >=   <   <=  !=  )

4，字符串运算符(+   +=)

5，逻辑运算符(&&  ||  !)

6，三元运算符(   （条件表达式1）？表达式2：表达式3     )

7，运算符优先级

---

**二，运算符的分类说明**

1，算术运算符(+ - \*  /   %   ++    --)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorace3a912c-780a-4d33-80a1-f1e6c12f19e7.png)

2，赋值运算符(=  +=  \*=   /=   %=)

基本的赋值运算符为“=”，用于将右侧的操作数或表达式的值赋给“=”左侧的变量。 

在程序中还经常使用到扩展赋值运算符，如：+=，-=，\*=，/=，%=等。

3，条件运算符(===   ==   >   >=   <   <=  !=  )

\===  等同符：不会发生类型的自动转化！ 

\==   等值符：会发生类型自动转化、自动匹配！

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabaebc441-5e67-4b79-acf4-a2842af710c2.png)

4，字符串运算符(+   +=)

字符串运算符主要是字符串运算符“+”和它的变形形式：“+=” 

数字类型和字符串进行“＋”操作时，实际是进行了字符串的连接操作。

> var a=1; var b="3";  alert(a+b);//显示的是13,而不是4.

> var b=true; var c="ddd";  alert(b+c);  //显示的是trueddd；

“我爱”+“北京”+“天安门”产生的结果是一个新的字符串“我爱北京天安门”

5，逻辑运算符(&&  ||  !)

&&两边都为true时则返回true

||两边有一边为true就返回true

！取反

6，三元运算符(   （条件表达式1）？表达式2：表达式3     )

执行此表达式时，先判断条件即:逻辑表达式1的值，若为true，则整个三目运算的结果为表达式2的值，否则整个运算结果为表达式3的值 

---

**三，操作符优先级**

等级1:()

等级2:！ ++  --

等级3:\* /  %

等级4:+  -

等级5:>  >=  <    <=  !=    ==

等级6:&& 

等级7:||

等级8:=  += -= \*= /=  %=

# 05-【掌握】分支语句

**一，if语句**

if…else语句完成了程序流程中的分支功能，如果其中的条件成立，则程序执行相应的语句。

if…else语句的语法如下：

```Plain Text
if(条件){
执行语句
}else{
执行语句
}
```

---

**二，switch语句**

分支语句switch可以根据一个变量的不同取值而采取不同的处理方法，在程序设计中提供不同的分支，这样的语句叫做分支语句。

Switch语句的语法如下：

```Plain Text
switch (expression){
case const1:
语句块1
case  const1:
语句块2
…… 
default:
语句块N
}
```

在同时可以使用switch和if时推荐使用switch以获得更好的效率

# 06-【掌握】循环语句

for语句的基本语法如下：

for (初始化部分；条件部分；更新部分){

    语句块… 

}

```Plain Text
			for (var i=0;i<=10;i++) {
				alert(i);
			}
```

---

while循环

while(条件) {

语句块；

 }

```Plain Text
			var i=0;
			while(i<=10){
				alert(i);
				i++;
			}
```

do-While

do{

语句块；

 }while(条件)

```Plain Text
			var i=0;
			do{
				alert(i);
				i++;
			}while(i<=20);
```

break语句是结束当前的循环，并把程序的控制权交给循环的下一条语句。

这里是结束循环，循环到此为止 

continue语句是结束当前的某一次循环，但是并没有跳出整个的循环。

这里是结束一次循环，整个循环还在进行

07-【掌握】数组.mhtml

# 08-【掌握】函数及深化

   **一，自定义函数**

一个典型的JavaScript函数定义如下：

function 函数名称（参数表）

{

函数执行部分：

}

注意：参数列表直接写形参名即可，不用写var! 

return语句：

return返回函数的返回值并结束函数运行 

return语句的语法如下：

return 表达式

当使用return语句的时候，要得到函数的返回值，只要利用函数名对一个变量赋值就可以了。

函数也是对象！ 

函数的另一个定义方式！ 

```Plain Text
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>尚学堂JavaScript初级</title>
		<script>
			function test(){
				var a = test2;  //把test2指向的函数对象引用赋值给了a
				a();   //执行的仍然是test2函数	
			}
			var test2 = function(){    //更能体现函数也是对象的含义！
//根据此种定义方式，我们可以发现test2是一个全局变量，
//他只想了匿名的函数对象！
				alert("test2");
			}
			
			
			function test3(){
				test4(234,test2);
			}
			
			function test4(a,b){
				alert(a);
				alert(b);
				b();   //执行b指向的函数对象！
			}
			
		</script>
	</head>
	<body>
		<input type=button value=测试  onclick="test();"  />
		<input type=button value=测试2   onclick="test3();"  />
	</body>
</html>
```

---

**二，内置函数**

| 函数                                                         | 描述                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| [decodeURI()](http://www.w3school.com.cn/jsref/jsref_decodeURI.asp) | 解码某个编码的 URI。                               |
| [encodeURI()](http://www.w3school.com.cn/jsref/jsref_encodeuri.asp) | 把字符串编码为 URI。                               |
| [escape()](http://www.w3school.com.cn/jsref/jsref_escape.asp) | 对字符串进行编码。                                 |
| [eval()](http://www.w3school.com.cn/jsref/jsref_eval.asp)    | 计算 JavaScript 字符串，并把它作为脚本代码来执行。 |
| [isFinite()](http://www.w3school.com.cn/jsref/jsref_isFinite.asp) | 检查某个值是否为有穷大的数。                       |
| [isNaN()](http://www.w3school.com.cn/jsref/jsref_isNaN.asp)  | 检查某个值是否不是数字。                           |
| [Number()](http://www.w3school.com.cn/jsref/jsref_number.asp) | 把对象的值转换为数字。                             |
| [parseFloat()](http://www.w3school.com.cn/jsref/jsref_parseFloat.asp) | 解析一个字符串并返回一个浮点数。                   |
| [parseInt()](http://www.w3school.com.cn/jsref/jsref_parseInt.asp) | 解析一个字符串并返回一个整数。                     |
| [String()](http://www.w3school.com.cn/jsref/jsref_string.asp) | 把对象的值转换为字符串。                           |
| [unescape()](http://www.w3school.com.cn/jsref/jsref_unescape.asp) | 对由 escape() 编码的字符串进行解码。               |

```Plain Text
<html>
	<head>
		<title>Untitled Document</title>
		<script>
			function testEval() {
				var a="alert('你们好')";
				var b="var c=0;";
				
				eval(b);  //var c=0;
				
				alert(c);
//				var a1 = 'alert("你们好！")';
//				var b="var c=11;";
////				alert(a);
//				alert("你们好");
//				eval("var c=11;");   
//				var c=11;
//				var c=11;
//				alert(c);
			}
			
			function testParse() {
				var d="3.555";
				var e1="abd";
				
				var d1= parseFloat(d);
				var d2=parseInt(d);
				var e2=parseInt(e1);
				
//				alert(1+d);
//				alert(1+d1);
				alert(d2);
//				alert(1+d2);
//				alert(e2);
				
				if(isNaN(e2)) {
					alert("I'm a NaN");
				}
				
				if(e2!=e2) {
					alert("我不是我");
				}


				if(isFinite(e2)) {
					alert("我是一个正常的number");
				}


			}
			
			function testEscape() {
				var  str="中国";
				var str1 = escape(str);
				var str2 = unescape(str1);
				alert(str1);
				alert(str2);
			}
			
			function testDecode(){
				var myurl='http://www.baidu.com/中国';
				var u1=encodeURI(myurl);
				var u2=decodeURI(u1);
				alert(u1);
				alert(u2);
			}
			
		</script>
	</head>
	<body>
	<a href="javascript:void(0);" onclick="testEval();">测试eval方法</a>
	<a href="javascript:void(0);" onclick="testParse();">测试parse方法</a>
	<a href="javascript:void(0);" onclick="testEscape();">测试escape方法</a>
	<a href="javascript:void(0);" onclick="testDecode();">测试Decode方法</a>
	</body>
</html>
```

在 JavaScript 核心语言中，全局对象的预定义属性都是不可枚举的，所有可以用 for/in 循环列出所有隐式或显式声明的全局变量，如下所示：

```Plain Text
<html>
<body>
<script type="text/javascript">
var variables = "";
for (var name in this) 
{
variables += name + "<br />";
}
document.write(variables);
</script>
</body>
</html>
```

# 09-【掌握】对话框

   **一，对话框的分类**

1. 警告框     alert, 常用。  
2. 询问框     返回提示框中的值。  
3. 确认框     返回true/false.  

---

**1，警告框**

```Plain Text
alert('警告的内容');
```

**2，询问框**

```Plain Text
var name = prompt("您没有登录，请输入用户名：");
alert("your name: " + name);
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4f99b330-2eea-4eee-8247-aadedd231794.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora252da03a-dfa5-45ad-8f23-babb1a50b9b8.png)

**3，确认框**

```Plain Text
               var isLogin = confirm("您确认登录吗？");
                if (isLogin) {
                    alert("您同意登录");
                }
                else {
                    alert("您不同意登录");
                   // alert("您不同意登录2");
                }
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac2c7ea56-f635-4bf4-8f8d-8cf9a10057ce.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa18b29ae-8f29-4007-bbc1-bfd87b646d1b.png)

# 10-【掌握】DOM 对象

HTML DOM 树

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora42062940-d4a4-4230-becc-6ab44a7b5d49.png)

 

 通过可编程的对象模型，JavaScript 获得了足够的能力来创建动态的 HTML。

简单的说，就是文档内部的一些”对话“

1. JavaScript 能够改变页面中的所有 HTML 元素  
2. JavaScript 能够改变页面中的所有 HTML 属性  
3. JavaScript 能够改变页面中的所有 CSS 样式  
4. JavaScript 能够对页面中的所有事件做出反应  

---

**一，DOM Event 对象**

Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。

事件通常与函数结合使用，函数不会在事件发生前被执行！

1，事件句柄　(Event Handlers)  也就是事件触发源

       HTML 4.0 的新特性之一是能够使 HTML 事件触发浏览器中的行为，比如当用户点击某个 HTML 元素时启动一段 JavaScript。下面是一个属性列表，可将之插入 HTML 标签以定义事件的行为。

| 属性                                                         | 此事件发生在何时...                  |
| ------------------------------------------------------------ | ------------------------------------ |
| [onblur](http://www.w3school.com.cn/jsref/event_onblur.asp)  | 元素失去焦点。                       |
| [onchange](http://www.w3school.com.cn/jsref/event_onchange.asp) | 域的内容被改变。                     |
| [onclick](http://www.w3school.com.cn/jsref/event_onclick.asp) | 当用户点击某个对象时调用的事件句柄。 |
| [ondblclick](http://www.w3school.com.cn/jsref/event_ondblclick.asp) | 当用户双击某个对象时调用的事件句柄。 |
| [onfocus](http://www.w3school.com.cn/jsref/event_onfocus.asp) | 元素获得焦点。                       |
| [onkeydown](http://www.w3school.com.cn/jsref/event_onkeydown.asp) | 某个键盘按键被按下。                 |
| [onkeypress](http://www.w3school.com.cn/jsref/event_onkeypress.asp) | 某个键盘按键被按下并松开。           |
| [onkeyup](http://www.w3school.com.cn/jsref/event_onkeyup.asp) | 某个键盘按键被松开。                 |
| [onload](http://www.w3school.com.cn/jsref/event_onload.asp)  | 一张页面或一幅图像完成加载。         |
| [onmousedown](http://www.w3school.com.cn/jsref/event_onmousedown.asp) | 鼠标按钮被按下。                     |
| [onmousemove](http://www.w3school.com.cn/jsref/event_onmousemove.asp) | 鼠标被移动。                         |
| [onmouseout](http://www.w3school.com.cn/jsref/event_onmouseout.asp) | 鼠标从某元素移开。                   |
| [onmouseover](http://www.w3school.com.cn/jsref/event_onmouseover.asp) | 鼠标移到某元素之上。                 |
| [onmouseup](http://www.w3school.com.cn/jsref/event_onmouseup.asp) | 鼠标按键被松开。                     |
| [onreset](http://www.w3school.com.cn/jsref/event_onreset.asp) | 重置按钮被点击。                     |
| [onselect](http://www.w3school.com.cn/jsref/event_onselect.asp) | 文本被选中。                         |
| [onsubmit](http://www.w3school.com.cn/jsref/event_onsubmit.asp) | 确认按钮被点击。                     |
| [onunload](http://www.w3school.com.cn/jsref/event_onunload.asp) | 用户退出页面。                       |

2，鼠标 / 键盘属性

| 属性                                                         | 描述                                         |
| ------------------------------------------------------------ | -------------------------------------------- |
| [altKey](http://www.w3school.com.cn/jsref/event_altkey.asp)  | 返回当事件被触发时，"ALT" 是否被按下。       |
| [button](http://www.w3school.com.cn/jsref/event_button.asp)  | 返回当事件被触发时，哪个鼠标按钮被点击。     |
| [clientX](http://www.w3school.com.cn/jsref/event_clientx.asp) | 返回当事件被触发时，鼠标指针的水平坐标。     |
| [clientY](http://www.w3school.com.cn/jsref/event_clienty.asp) | 返回当事件被触发时，鼠标指针的垂直坐标。     |
| [ctrlKey](http://www.w3school.com.cn/jsref/event_ctrlkey.asp) | 返回当事件被触发时，"CTRL" 键是否被按下。    |
| [screenX](http://www.w3school.com.cn/jsref/event_screenx.asp) | 返回当某个事件被触发时，鼠标指针的水平坐标。 |
| [screenY](http://www.w3school.com.cn/jsref/event_screeny.asp) | 返回当某个事件被触发时，鼠标指针的垂直坐标。 |
| [shiftKey](http://www.w3school.com.cn/jsref/event_shiftkey.asp) | 返回当事件被触发时，"SHIFT" 键是否被按下。   |

3，IE 属性

除了上面的鼠标/事件属性，IE 浏览器还支持下面的属性：【基本不怎么用，IE是个奇葩】

| 属性            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| fromElement     | 对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。 |
| keyCode         | 对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。 |
| offsetX,offsetY | 发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。   |
| srcElement      | 对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。 |
| toElement       | 对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。  |
| x,y             | 事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。 |

4，相关实例

```html
<html>
<head>
<script type="text/javascript">
function whichButton(event)
{
var btnNum = event.button;
if (btnNum==2)
  {
  alert("您点击了鼠标右键！")
  }
else if(btnNum==0)
  {
  alert("您点击了鼠标左键！")
  }
else if(btnNum==1)
  {
  alert("您点击了鼠标中键！");
  }
else
  {
  alert("您点击了" + btnNum+ "号键，我不能确定它的名称。");
  }
}
</script>
</head>

<body onmousedown="whichButton(event)">
<p>请在文档中点击鼠标。一个消息框会提示出您点击了哪个鼠标按键。</p>
</body>

</html>
```

得到客户端的坐标

```html
<html>
<head>
<script type="text/javascript">
function show_coords(event)
{
x=event.clientX
y=event.clientY
alert("X 坐标: " + x + ", Y 坐标: " + y)
}
</script>
</head>

<body onmousedown="show_coords(event)">

<p>请在文档中点击。一个消息框会提示出鼠标指针的 x 和 y 坐标。</p>

</body>
</html>
```

得到键盘的事件

```html
<html>
<head>
<script type="text/javascript">
function whichButton(event)
{
alert(event.keyCode)
}

</script>
</head>

<body onkeyup="whichButton(event)">
<p><b>注释：</b>在测试这个例子时，要确保右侧的框架获得了焦点。</p>
<p>在键盘上按一个键。消息框会提示出该按键的 unicode。</p>
</body>

</html>
```

得到屏幕的坐标

```html
<html>
<head>

<script type="text/javascript">
function coordinates(event)
{
x=event.screenX
y=event.screenY
alert("X=" + x + " Y=" + y)
}

</script>
</head>
<body onmousedown="coordinates(event)">

<p>
在文档中点击某个位置。消息框会提示出指针相对于屏幕的 x 和 y 坐标。
</p>

</body>
</html>
```

---

**二，DOM Document 对象【window.document.】**

每个载入浏览器的 HTML 文档都会成为 Document 对象。

Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。

提示：Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。

Document 对象集合  

| 集合                                                         | 描述                               |
| ------------------------------------------------------------ | ---------------------------------- |
| [all](http://www.w3school.com.cn/jsref/coll_doc_all.asp)     | 提供对文档中所有 HTML 元素的访问。 |
| [forms\[\]](http://www.w3school.com.cn/jsref/coll_doc_forms.asp) | 返回对文档中所有 Form 对象引用。   |
| [images\[\]](http://www.w3school.com.cn/jsref/coll_doc_images.asp) | 返回对文档中所有 Image 对象引用。  |

Document 对象属性

| 属性                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| body                                                         | 提供对  元素的直接访问。<br>对于定义了框架集的文档，该属性引用最外层的 。 |
| [cookie](http://www.w3school.com.cn/jsref/prop_doc_cookie.asp) | 设置或返回与当前文档有关的所有 cookie。                      |
| [domain](http://www.w3school.com.cn/jsref/prop_doc_domain.asp) | 返回当前文档的域名。                                         |
| [lastModified](http://www.w3school.com.cn/jsref/prop_doc_lastmodified.asp) | 返回文档被最后修改的日期和时间。                             |
| [referrer](http://www.w3school.com.cn/jsref/prop_doc_referrer.asp) | 返回载入当前文档的文档的 URL。                               |
| [title](http://www.w3school.com.cn/jsref/prop_doc_title.asp) | 返回当前文档的标题。                                         |
| [URL](http://www.w3school.com.cn/jsref/prop_doc_url.asp)     | 返回当前文档的 URL。                                         |

Document 对象方法  

| 方法                                                         | 描述                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [getElementById()](http://www.w3school.com.cn/jsref/met_doc_getelementbyid.asp) | 返回对拥有指定 id 的第一个对象的引用。                      |
| [getElementsByName()](http://www.w3school.com.cn/jsref/met_doc_getelementsbyname.asp) | 返回带有指定名称的对象集合。                                |
| [getElementsByTagName()](http://www.w3school.com.cn/jsref/met_doc_getelementsbytagname.asp) | 返回带有指定标签名的对象集合。                              |
| createElement()                                              | 创建一个标签createElement("img")                            |
| createAttribute()                                            | 创建一个属性                                                |
| [write()](http://www.w3school.com.cn/jsref/met_doc_write.asp) | 向文档写 HTML 表达式 或 JavaScript 代码。                   |
| [writeln()](http://www.w3school.com.cn/jsref/met_doc_writeln.asp) | 等同于 write() 方法，不同的是在每个表达式之后写一个换行符。 |

Document 对象描述  

HTMLDocument 接口对 DOM Document 接口进行了扩展，定义 HTML 专用的属性和方法。

很多属性和方法都是 HTMLCollection 对象（实际上是可以用数组或名称索引的只读数组），其中保存了对锚、表单、链接以及其他可脚本元素的引用。

这些集合属性都源自于 0 级 DOM。它们已经被 Document.getElementsByTagName() 所取代，但是仍然常常使用，因为他们很方便。

write() 方法值得注意，在文档载入和解析的时候，它允许一个脚本向文档中插入动态生成的内容。

注意，在 1 级 DOM 中，HTMLDocument 定义了一个名为 getElementById() 的非常有用的方法。在 2 级 DOM 中，该方法已经被转移到了 Document 接口，它现在由 HTMLDocument 继承而不是由它定义了。

以上说明的使用方法是document.xxxx  或者   window.document.xxx

---

**三，DOM Element 对象【元素对象】**

在 HTML DOM 中，Element 对象表示 HTML 元素。

Element 对象可以拥有类型为元素节点、文本节点、注释节点的子节点。

NodeList 对象表示节点列表，比如 HTML 元素的子节点集合。

| 属性 / 方法                                                  | 描述                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| element.parentElement                                        | 得到元素的父元素                                   |
| [element.appendChild()](http://www.w3school.com.cn/jsref/met_node_appendchild.asp) | 向元素添加新的子节点，作为最后一个子节点。         |
| [element.attributes](http://www.w3school.com.cn/jsref/prop_node_attributes.asp) | 返回元素属性的 NamedNodeMap。                      |
| [element.childNodes](http://www.w3school.com.cn/jsref/prop_node_childnodes.asp) | 返回元素子节点的 NodeList。                        |
| [element.className](http://www.w3school.com.cn/jsref/prop_html_classname.asp) | 设置或返回元素的 class 属性。                      |
| element.clientHeight                                         | 返回元素的可见高度。                               |
| element.clientWidth                                          | 返回元素的可见宽度。                               |
| [element.firstChild](http://www.w3school.com.cn/jsref/prop_node_firstchild.asp) | 返回元素的首个子。                                 |
| [element.getAttribute()](http://www.w3school.com.cn/jsref/met_element_getattribute.asp) | 返回元素节点的指定属性值。                         |
| [element.hasAttribute()](http://www.w3school.com.cn/jsref/met_element_hasattribute.asp) | 如果元素拥有指定属性，则返回true，否则返回 false。 |
| [element.hasAttributes()](http://www.w3school.com.cn/jsref/met_node_hasattributes.asp) | 如果元素拥有属性，则返回 true，否则返回 false。    |
| [element.id](http://www.w3school.com.cn/jsref/prop_html_id.asp) | 设置或返回元素的 id。                              |
| [element.innerHTML](http://www.w3school.com.cn/jsref/prop_html_innerhtml.asp) | 设置或返回元素的内容。                             |
| [element.lastChild](http://www.w3school.com.cn/jsref/prop_node_lastchild.asp) | 返回元素的最后一个子元素。                         |
| [element.nodeName](http://www.w3school.com.cn/jsref/prop_node_nodename.asp) | 返回元素的名称。                                   |
| [element.nodeType](http://www.w3school.com.cn/jsref/prop_node_nodetype.asp) | 返回元素的节点类型。                               |
| [element.nodeValue](http://www.w3school.com.cn/jsref/prop_node_nodevalue.asp) | 设置或返回元素值。                                 |
| [element.parentNode](http://www.w3school.com.cn/jsref/prop_node_parentnode.asp) | 返回元素的父节点。                                 |
| [element.removeAttribute()](http://www.w3school.com.cn/jsref/met_element_removeattribute.asp) | 从元素中移除指定属性。                             |
| [element.removeAttributeNode()](http://www.w3school.com.cn/jsref/met_element_removeattributenode.asp) | 移除指定的属性节点，并返回被移除的节点。           |
| [element.removeChild()](http://www.w3school.com.cn/jsref/met_node_removechild.asp) | 从元素中移除子节点。                               |
| [element.replaceChild()](http://www.w3school.com.cn/jsref/met_node_replacechild.asp) | 替换元素中的子节点。                               |
| [element.setAttribute()](http://www.w3school.com.cn/jsref/met_element_setattribute.asp) | 把指定属性设置或更改为指定值。                     |
| [element.setAttributeNode()](http://www.w3school.com.cn/jsref/met_element_setattributenode.asp) | 设置或更改指定属性节点。                           |
| element.style                                                | 设置或返回元素的 style 属性。                      |
| [element.tabIndex](http://www.w3school.com.cn/jsref/prop_html_tabindex.asp) | 设置或返回元素的 tab 键控制次序。                  |
| [element.title](http://www.w3school.com.cn/jsref/prop_html_title.asp) | 设置或返回元素的 title 属性。                      |
| element.toString()                                           | 把元素转换为字符串。                               |

---

**四，DOM Attribute 对象【访问元素中的属性，先得到元素，再根据元素去访问属性】**

在 HTML DOM （文档对象模型）中，每个部分都是节点：

文档本身是文档节点

所有 HTML 元素是元素节点

所有 HTML 属性是属性节点

HTML 元素内的文本是文本节点

注释是注释节点cookie

注意，要访问属性必须是document文档加载完成才能访问，也就是script代码必须写到body之后

属性

| [attr.name](http://www.w3school.com.cn/jsref/prop_attr_name.asp) | 返回属性的名称。                              |
| ------------------------------------------------------------ | --------------------------------------------- |
| [attr.value](http://www.w3school.com.cn/jsref/prop_attr_value.asp) | 设置或返回属性的值。                          |
| [attr.specified](http://www.w3school.com.cn/jsref/prop_attr_specified.asp) | 如果已指定属性，则返回 true，否则返回 false。 |

```javascript
document.getElementsByTagName("button")[0].attributes[0].name;
```

---

# 11-【掌握】checkBox,select的操作

**一，checkbox全选反选全否**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora206e1d46-8d1e-4b20-824a-b5023ce05460.png)

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
        <script type="text/javascript">
            function getCheckBox() {
                var str = "";
                //获取歌曲
                var music = document.getElementsByName("music");
                //遍历歌曲
                for (var i = 0; i < music.length; i++) {
                    //判断歌曲是否选中
                    if (music[i].checked) {
                        str += music[i].value + ",";
                        //如果是radio，直接在这添加一个break
                    }
                }
                alert(str);
            }

            function choose(type) {
                var music = document.getElementsByName("music");
                for (var i = 0; i < music.length; i++) {
                    if (type == 'all') {
                        music[i].checked = true;
                    } else if (type == 'no') {
                        music[i].checked = false;
                    } else if (type == 'fx') {
                        music[i].checked = !music[i].checked;
                    }
                }
            }
        </script>
    </head>

    <body>
        <h1>百度音乐--热门歌曲</h1>
        <input type="checkbox" name="music" value="1" />葫芦娃
        <br />
        <input type="checkbox" name="music" value="2" />小苹果
        <br />
        <input type="checkbox" name="music" value="3" />忐忑
        <br />
        <input type="checkbox" name="music" value="4" />滴答
        <br />
        <input type="checkbox" name="music" value="5" />当
        <br />
        <input type="checkbox" name="music" value="6" />李白
        <br />
        <input type="checkbox" name="music" value="7" />模特
        <br />
        <input type="checkbox" name="music" value="8" />老街
        <br />
        <input type="checkbox" name="music" value="9" />泡沫
        <br />
        <input type="checkbox" name="music" value="0" />上海滩
        <br />
        <input type="button" value="播放" onclick="getCheckBox();" />
        <input type="button" value="全选" onclick="choose('all');" />
        <input type="button" value="反选" onclick="choose('fx');" />
        <input type="button" value="全否" onclick="choose('no');" />
    </body>

</html>
```

---

二，操作下拉列表

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora393f71db-2256-417a-ba11-218e5ddbd4ba.png)

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <script type="text/javascript">
        function  m1(){
            //找到select
            var jg=document.getElementById("jg");
            alert(jg.value);
        }
        function m2(val){
            var jg=document.getElementById("jg");
            jg.value=val;
        }
        function m3(){
            var game=document.getElementById("game");//得到的是HTMLSelectElement
            //从select里面得到option才能判断
            var opts=game.options;
            var str="";
            for (var i=0;i<opts.length;i++) {
                var x=opts[i];//得到的是HTMLOptionElement
//              alert(x.selected);
                if(x.selected){
                    str+=x.value+",";
                }
            }
            alert(str);
        }

        function m4(str){
            var game=document.getElementById("game");//得到的是HTMLSelectElement
            //从select里面得到option才能判断
            var opts=game.options;
            var strs=str.split(",");
            for (var i=0;i<strs.length;i++) {
//              alert(strs[i]);
                var vals=strs[i];
                for (var j=0;j<opts.length;j++) {
                    var opt=opts[j];
                    if(vals==opt.value){
                        opt.selected="true";
                        break;
                    }
                }
            }
        }
    </script>
    <body>
        <select name="jg" id="jg">
            <option>深圳</option>
            <option>武汉</option>
            <option>上海</option>
            <option>大连</option>
            <option>郑州</option>
            <option>重庆</option>
        </select>
        <input type="button" name="btn1" id="btn1" onclick="m1()" value="得到左边的值" />
        <input type="button" name="btn1" id="btn1"  onclick="m2('武汉')" value="设置左边选中武汉" />
        <hr />
        <select name="game" id="game" multiple="multiple" style="width: 100px; height: 200px;">
            <option value="DOTA">DOTA</option>
            <option value="LOL">LOL</option>
            <option value="DNF">DNF</option>
            <option value="CF">CF</option>
            <option value="WOW">WOW</option>
        </select>
        <input type="button" id="btn2" value="得到多选下拉列表的值" onclick="m3()" />
        <input type="button" id="btn2" value="设置选中DOTA LOL下拉列表的值" onclick="m4('DOTA,LOL,WOW')" />
    <hr />
    <select name="left" id="left" multiple="multiple" style="width: 100px; height: 200px;">
            <option value="DOTA">DOTA</option>
            <option value="LOL">LOL</option>
            <option value="DNF">DNF</option>
            <option value="CF">CF</option>
            <option value="WOW">WOW</option>
        </select>
        <div style="display: inline-block;">
            <input type="button" id="btn_toright" onclick="toRight()" value="添加到右边"  />
            <br /><br /><br /><br /><br />
            <input type="button" id="btn_toleft" onclick="toLeft()" value="添加到左边" />

        </div>
        <select name="right" id="right" multiple="multiple" style="width: 100px; height: 200px;">
        </select>
    </body>

    <script type="text/javascript">
        //得到左右的两个select
        var left=document.getElementById("left");
        var right=document.getElementById("right");

        var btn_toright=document.getElementById("btn_toright");
        var btn_toleft=document.getElementById("btn_toleft");

        //把左边的选中的放到右边
        function toRight(){
            var leftOpts=left.options;
            for (var i=leftOpts.length-1;i>=0;i--) {
                if(leftOpts[i].selected){
                    right.appendChild(leftOpts[i]);
                }
            }
            isBtnEnable();
        }

        //把左边选中的放到左边
        function toLeft(){
            var rigthOpts=right.options;
            for (var i=rigthOpts.length-1;i>=0;i--) {
                if(rigthOpts[i].selected){
                    left.appendChild(rigthOpts[i]);
                }
            }
            isBtnEnable();
        }

        function isBtnEnable(){
            var leftLen=left.options.length;
            var rightLen=right.options.length;
            if(leftLen==0){//如果左边没有东西  应该禁用 toRight的按钮
                btn_toright.disabled="disabled";
            }else{
                btn_toright.disabled="";
            }   
            if(rightLen==0){//如果右边没有东西  应该禁用 toLeft的按钮
                btn_toleft.disabled="disabled";
            }else{
                btn_toleft.disabled="";
            }
        }
        isBtnEnable();
    </script>
</html>

```

# 12-【实战】文件上传案例

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora98d9727f-7ac9-44b2-a14d-6b254b396102.png)

```Plain Text
<!DOCTYPE html>
<html>


	<head>
		<meta charset="UTF-8">
		<title>上传文件</title>
		<script type="text/javascript" >
			function addQQFile() {
				var showQQDiv = document.getElementById("showQQDiv");
				showQQDiv.innerHTML += '<div><input type="file" name="photo" /> 
       &nbsp; <input type="button" value="删除" onclick="delQQFile(this)" /></div>';
			}
			function delQQFile(btn){
				btn.parentNode.parentNode.removeChild(btn.parentNode);
			}
			
			
			function addSinaFile(){
				var showSinaDiv=document.getElementById("showSinaDiv");
				//创建一个DIV节点
				var div=document.createElement("div");
				//创建一个表单位file
				var file=document.createElement("input");
				file.type="file";
				file.name="photo";
				//创建一个br
				var br=document.createElement("br");
				//创建一个button
				var btn=document.createElement("input");
				btn.type="button";
				btn.value="删除";
				btn.onclick=function(){
					showSinaDiv.removeChild(div);
				}
				//把创建一三个对象放到syhowSidv里面
				div.appendChild(file);
				div.appendChild(btn);
				div.appendChild(br);
				showSinaDiv.appendChild(div);
			}
		</script>




	</head>


	<body>
		<h1>QQ空间上传图片</h1>


		<input type="button" value="添加一行" onclick="addQQFile();" />
		<hr />
		<div id="showQQDiv">
		</div>
		<h1>新浪空间上传图片</h1>


		<input type="button" value="添加一行" onclick="addSinaFile();" />
		<hr />
		<div id="showSinaDiv">
		</div>
	</body>
</html>
```

# 13-【熟悉】BOM对象

   **前言**

1，定义：浏览器对象模型（Browser Object Model）尚无正式标准。

2，作用：浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。

由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性。

3，以下是所有的BOM对象

* Window【掌握】  
* Screen【掌握】  
* Location【掌握】  
* History【掌握】  
* Navigator  
* PopupAlert  
* Timing  
* Cookies【熟悉】  

---

**一，Window**

注意：Window 和window不是同一个东西

1. window.name=1;  
2. console.log(Window.name);//Window  
3. console.log(window.name);//1  
4. console.log(window instanceof  Window);//true  

从上面的代码可以看出来Window并不等于window   通过instanceof进行判断window是Window的实例

1，所有浏览器都支持 window 对象。它表示浏览器窗口。

* 所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。  
* 全局变量是 window 对象的属性。  
* 全局函数是 window 对象的方法。  
* 甚至 HTML DOM 的 document 也是 window 对象的属性之一：  

```Plain Text
window.document.getElementById("header");
```

与下面的代码相同：

```Plain Text
document.getElementById("header");
```

2，Window 尺寸

有三种方法能够确定浏览器窗口的尺寸（浏览器的视口，不包括工具栏和滚动条）。

对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：

window.innerHeight - 浏览器窗口的内部高度

window.innerWidth - 浏览器窗口的内部宽度

对于 Internet Explorer 8、7、6、5：

document.documentElement.clientHeight

document.documentElement.clientWidth

或者

document.body.clientHeight

document.body.clientWidth

实用的 JavaScript 方案（涵盖所有浏览器）：

```Plain Text
<!DOCTYPE html>
<html>
<body>


<p id="demo"></p>


<script>
var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;


var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


x=document.getElementById("demo");
x.innerHTML="浏览器的内部窗口宽度：" + w + "，高度：" + h + "。"
</script>


</body>
</html>
```

其他 Window 方法

一些其他方法：

window.open(‘http://www.baidu.com’) - 打开新窗口

window.close() - 关闭当前窗口   只能关闭使用window.open的窗口

window.moveTo(x,y) - 移动当前窗口

window.resizeTo(width,height) - 调整当前窗口的尺寸

window.setInterval(code,millisec\[,"lang"\])

```Plain Text
<html>
<body>


<input type="text" id="clock" size="35" />
<script language=javascript>
var int=self.setInterval("clock()",50)
function clock()
  {
  var t=new Date()
  document.getElementById("clock").value=t
  }
</script>
<button onclick="int=window.clearInterval(int)">Stop interval</button>


</body>
</html>
```

window.setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()。  

一个时钟

```Plain Text
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Untitled Document</title>
        <script>
            function showtime(){
                var d=new Date();
                var year=d.getFullYear();
                var month=d.getMonth();
                var day=d.getDay();
                var hours=d.getHours();
                var min=d.getMinutes();
                var sec=d.getSeconds();
                var misec=d.getMilliseconds();
                var str=year+"-"+month+"-"+day+" "+hours+":"+min+":"+sec+":"+misec;
                var mytime=window.document.getElementById("mytime");
                mytime.innerHTML=str;
                window.setTimeout('showtime()',1000);
            }
        </script>
    </head>
    <body onload="showtime()">
       	<div id="mytime" style="border: 2px solid; border-color: green;color: red;">
       	</div>
    </body>


</html>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora68b1bb28-1800-48d7-a0aa-86f290e002aa.png)

---

**二，Screen**

window.screen 对象包含有关用户屏幕的信息。

window.screen 对象在编写时可以不使用 window 这个前缀。

一些属性：

screen.availWidth - 可用的屏幕宽度

screen.availHeight - 可用的屏幕高度



可以宽度 screen.availWidth 属性返回访问者屏幕的宽度，以像素计，减去界面特性，比如窗口任务栏。

可用高度 screen.availHeight 属性返回访问者屏幕的高度，以像素计，减去界面特性，比如窗口任务栏。

```Plain Text
<script>
document.write("可用宽度：" + screen.availWidth);
document.write("可用高度：" + screen.availHeight);
</script>
```

---

**三，Location**

window.location 对象在编写时可不使用 window 这个前缀。

对象属性

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad40d925d-394c-4413-a9d4-c1f18fcd0a3a.png)

 对象方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab9a045fb-3e9c-4b43-b4f9-ce91b429a685.png)

```Plain Text
window.location.replace("http://www.w3school.com.cn")
```

```Plain Text
window.location.assign("http://www.w3school.com.cn")
```

**四，History**

History 对象包含用户（在浏览器窗口中）访问过的 URL。

History 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。

注释：没有应用于 History 对象的公开标准，不过所有浏览器都支持该对象。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora110ac37f-3117-4256-82fa-8bf456d14352.png)

### 例子

下面一行代码执行的操作与单击后退按钮执行的操作一样：

```Plain Text
history.back()
```

下面一行代码执行的操作与单击两次后退按钮执行的操作一样：

```Plain Text
history.go(-2)
```

---

**五，Cookies【熟悉】**

1，创建Cookie

JavaScript 可以使用 document.cookie 属性来创建 、读取、及删除 cookie。

JavaScript 中，创建 cookie 如下所示：

document.cookie="username=Leijh";

您还可以为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除：document.cookie="username=Leijh; expires=Thu, 18 Dec 2017 12:00:00 GMT";

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

document.cookie="username=Leijh; expires=Thu, 18 Dec 2017 12:00:00 GMT; path=/";

2,读取 Cookie

在 JavaScript 中, 可以使用以下代码来读取 cookie：

var x = document.cookie;

注意：document.cookie 将以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;

**3，修改 Cookie**

在 JavaScript 中，修改 cookie 类似于创建 cookie，如下所示：

document.cookie="username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";

旧的 cookie 将被覆盖。

4，删除 Cookie

删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可，如下所示，设置为 Thu, 01 Jan 1970 00:00:00 GMT:

document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

注意，当您删除时不必指定 cookie 的值。

5，完整实例

```Plain Text
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Cookies的使用</title>
</head>
<head>
<script>
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
function checkCookie(){
	var user=getCookie("username");
	if (user!=""){
		alert("Welcome again " + user);
	}
	else {
		user = prompt("Please enter your name:","");
  		if (user!="" && user!=null){
    		setCookie("username",user,30);
    	}
	}
}
</script>
</head>
	
<body onload="checkCookie()"></body>
	
</html>
```

# 14-【熟悉】JavaScript 对象

   一，Date

[http://www.w3school.com.cn/jsref/jsref\_obj\_date.asp](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)

二，Math

[http://www.w3school.com.cn/jsref/jsref\_obj\_math.asp](http://www.w3school.com.cn/jsref/jsref_obj_math.asp)

三，自定义对象

```Plain Text
<script type="text/javascript">  
    function Person(name,age){  
        this.name=name;  
        this.age=age;  
    }  
    Person.prototype.sayHello=function(){  
        alert("使用原型得到Name："+this.name);  
    }  
    var per=new Person("马小倩",21);  
    per.sayHello(); //输出：使用原型得到Name:马小倩  


      
    function Student(){}  
    Student.prototype=new Person("洪如彤",21);  
    var stu=new Student();  
    Student.prototype.grade=5;  
    Student.prototype.intr=function(){  
        alert(this.grade);  
    }  
    stu.sayHello();//输出：使用原型得到Name:洪如彤  
    stu.intr();//输出：5  
</script>
```

# 15-【实战】躲避球

```Plain Text
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<script type="text/javascript">
			function addBall(){
				var mydesk=document.getElementById("mydesk");
				var img=document.createElement("img");
				img.src="img/eg_smile.gif";
				img.style.width="20px";
				img.style.height="20px";
				img.style.position="absolute";
				img.style.left=parseInt(Math.random()*59)*10+"px";
				img.style.top=parseInt(Math.random()*39)*10+"px";
				//添加方向判断
				img.xflag="true";
				img.yflag="true";
				//添加到DIV
				mydesk.appendChild(img); 
			}
			
			function moveBall(){
				window.setInterval(function(){
					//得到所有的球
					var balls=document.getElementsByTagName("img");
					//设置步长
					var step=10;
					//遍历
					for (var i=0;i<balls.length;i++) {
						var ball=balls[i];
						var x=parseInt(ball.style.left);
						var y=parseInt(ball.style.top);
						if(ball.xflag){
							ball.style.left=x+step+"px";
							if(x>=580){
								ball.xflag=false;
							}
						}else{
							ball.style.left=x-step+"px";
							if(x<=20){
								ball.xflag=true;
							}
						}
						if(ball.yflag){
							ball.style.top=y+step+"px";
							if(y>=380){
								ball.yflag=false;
							}
						}else{
							ball.style.top=y-step+"px";
							if(y<=20){
								ball.yflag=true;
							}
						}
//						//开始动
//						ball.style.left=parseInt(ball.style.left)+10+"px";
//						ball.style.top=parseInt(ball.style.top)+10+"px";
					}
				},100);
			}
			
		</script>
	</head>
	<body onload="moveBall()">
			<div id="mydesk" style="border: 2px solid; 
               border-color: red; width: 600px; height: 400px;"></div>
		
		<input type="button" value="添加一个球" onclick="addBall()" />
	</body >
	
</html>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoragif.gif)

# 16-【熟悉】表单操作及验证

   一，表单信息详解

1，根据ID得到Form

```Plain Text
var frm1 = document.getElementById("userFrm");
```

2，根据名字得到Form

```Plain Text
var frm2 = document.testFrm;
```

3，操作Form的属性

```Plain Text
frm1.action + "--" + frm1.method
```

4，操作Form的方法  

```Plain Text
frm1.reset();
frm1.submit();
```


```Plain Text
<!DOCTYPE html>
<html>


	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript">
			function testFrom() {
				//通过ID获取FRM
				var frm1 = document.getElementById("userFrm");
				//通过名字获取FRM
				var frm2 = document.testFrm;
				//alert(frm1 === frm2);
				//操作FRM的属性
				//alert(frm1.action + "--" + frm1.method)
				//alert(frm1.elements.length + "--" + frm1.length); //获取from中所有表单域的数量
				//操作FRM的方法
				//frm1.reset();
				//frm1.submit();
		</script>
	</head>


	<body>
		<h1>操作FORM表单</h1>
		<input type="button" value="测试表单信息" onclick="testFrom();" />
		<hr />
		<form action="#" method="get" id="userFrm" name="testFrm">
			<input type="text" name="uname" value="123456789" />
			<input type="submit" value="提交表单" />
		</form>
	</body>


</html>
```

---

**二，表单域通用属性和个别操作**

\*\*

```Plain Text
//获取表单域 
var uname = document.getElementById("uname");
var pwd = document.frm.pwd;
```

1. disabled：既不可以编辑，也不可以提交  
2. readonly:不可以编辑，但是可以提交  
3. form:获取该表单域所属的表单  uname.form.submit();  
4. 可以通过JS操作Disabled,其中false是取消，true添加  

通用方法

```Plain Text
<body onload="document.getElementById('uname').focus();">
```

```Plain Text
<!DOCTYPE html>
<html>


	<head>
		<meta charset="utf-8">
		<title></title>
		<script type="text/javascript">
			function testField() {
				//获取表单域 
				var uname = document.getElementById("uname");
				var pwd = document.frm.pwd;
				//通用属性
				uname.form.submit();
				//通用方法
				var sub = document.getElementById("sub");
				sub.disabled = false;
			}
		</script>
	</head>


	<body onload="document.getElementById('uname').focus();">
		<h1>表单域的通用属性</h1>
		<input type="button" value="测试表单域通用属性" onclick="testField();" />
		<hr />
		<form action="#" method="get" name="frm">
			<input type="text" id="uname" value="" />
			<input type="text" name="realname" value="胡汉三" readonly />
			<input type="password" name="pwd" value="" disabled />
			<input type="radio" id="gender" value="1" />
			<input type="checkbox" id="fav" value="1" />
			<input type="submit" id="sub" disabled value="提交表单" />
		</form>
	</body>


</html>
```

---

五，文本类型验证  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora03815025-88ac-4fa9-a52d-758897170b1f.png)

```Plain Text
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			table {
				width: 80%;
			}
			th {
				width: 150px;
			}
			.spanred {
				color: red;
			}
			.spangreen {
				color: green;
			}
		</style>
		<script type="text/javascript">
			var globalCode = "";


			function generateCode() {
				//随机生成1000到9999的验证码
				globalCode = parseInt(Math.random() * 9000 + 1000);
				//将验证码显示到span
				document.getElementById("randomCode").innerHTML = globalCode;
			}


			function checkUname() {
				//定义正则表达式对象
				var reg = /^\w{4,12}$/ig;
				return checkField("uname", reg);
			}


			function checkPwd() {
				//定义正则表达式对象
				var reg = /^\w{4,12}$/ig;
				return checkField("pwd", reg) && checkPwd2();
			}


			function checkPwd2() {
				var pwd = document.getElementById("pwd");
				var pwd2 = document.getElementById("pwd2");
				var span = document.getElementById("pwd2Span");
				if (pwd2.value.length == 0) {
					span.className = "spanred";
					span.innerHTML = "数据项[确认密码]不能为空";
					return false;
				} else if (pwd.value == pwd2.value) {
					span.className = "spangreen";
					span.innerHTML = "数据项[确认密码]ok";
					return true;
				} else {
					span.className = "spanred";
					span.innerHTML = "数据项[密码]和[确认密码]不一致";
					return false;
				}
			}


			function checkRealname() {
				//定义正则表达式对象
				var reg = /^[\u4e00-\u9fa5]{2,6}$/ig;
				return checkField("realname", reg);
			}


			function checkEmail() {
				//定义正则表达式对象
				var reg = /^\w{5,12}@\w{2,10}(\.[a-z]{2,3}){1,2}$/ig;
				return checkField("email", reg);
			}


			function checkPhone() {
				//定义正则表达式对象
				var reg = /^1[3458]\d{9}$/ig;
				return checkField("phone", reg);
			}


			function checkIntro() {
				//定义正则表达式对象
				var reg = /^.{0,500}$/ig;
				//获取表单域的
				var obj = document.getElementById("intro");
				//获取表单域的值
				var val = obj.value;
				//获取表单域的文本描述
				var alt = obj.alt;
				//获取span
				var span = document.getElementById("introSpan");
				//对表单域的值进行验证
				if (reg.test(val)) {
					span.className = "spangreen";
					span.innerHTML = "数据项[个人介绍]ok";
					return true;
				} else {
					span.className = "spanred";
					span.innerHTML = "数据项[个人介绍]不符合规则";
					return false;
				}
			}


			function checkField(objId, reg) {
				//获取表单域的
				var obj = document.getElementById(objId);
				//获取表单域的值
				var val = obj.value;
				//获取表单域的文本描述
				var alt = obj.alt;
				//获取span
				var span = document.getElementById(objId + "Span");
				//对表单域的值进行验证
				if (val == null || val.length == 0) {
					span.className = "spanred";
					span.innerHTML = "数据项[" + alt + "]不能为空";
					return false;
				} else if (reg.test(val)) {
					span.className = "spangreen";
					span.innerHTML = "数据项[" + alt + "]ok";
					return true;
				} else {
					span.className = "spanred";
					span.innerHTML = "数据项[" + alt + "]不符合规则";
					return false;
				}
			}


			function checkFav() {
				//获取对象
				var fav = document.getElementsByName("fav");
				var span = document.getElementById("favSpan");
				//遍历并判断
				for (var i = 0; i < fav.length; i++) {
					if (fav[i].checked) {
						span.className = "spangreen";
						span.innerHTML = "数据项[爱好]ok";
						return true;
					}
				}
				span.className = "spanred";
				span.innerHTML = "数据项[爱好]至少选择一项";
				return false;
			}


			function checkAddress() {
				//获取对象
				var address = document.getElementById("address");
				var span = document.getElementById("addressSpan");
				//判断是否为正确选项
				if (address.value == "") {
					span.className = "spanred";
					span.innerHTML = "数据项[户籍地址]不能为请选择";
					return false;
				} else {
					span.className = "spangreen";
					span.innerHTML = "数据项[户籍地址]ok";
					return true;
				}
			}


			function checkCode() {
				//获取CODE
				var code = document.getElementById("code");
				var span = document.getElementById("codeSpan");
				//验证长度
				if (code.value.length == 4 && code.value == globalCode) {
					span.className = "spangreen";
					span.innerHTML = "数据项[验证码]ok";
					return true;
				} else {
					span.className = "spanred";
					span.innerHTML = "数据项[验证码]输入错误";
					return false;
				}
			}


			function checkAgree() {
				//获取是否同意
				var agree = document.getElementById("agree");
				//获取提交按钮
				var sub = document.getElementById("sub");
				sub.disabled = !agree.checked;
			}


			function testReset() {
				var flag = window.confirm("您确定要重置注册信息吗?");
				return flag;
			}


			function testSubmit() {
				var unameFlag = checkUname();
				var pwdFlag = checkPwd();
				var pwd2Flag = checkPwd2();
				var emailFlag = checkEmail();
				var realnameFlag = checkRealname();
				var phoneFlag = checkPhone();
				var favFlag = checkFav();
				var addressFlag = checkAddress();
				var introFlag = checkIntro();
				var codeFlag = checkCode();
				return unameFlag && pwdFlag && pwd2Flag && emailFlag && realnameFlag && phoneFlag && favFlag && addressFlag && introFlag && codeFlag;
			}
		</script>
	</head>


	<body onload="generateCode();">
		<h1>表单数据验证</h1>
		<form action="#" method="get" name='frm' onsubmit="return testSubmit();" onreset="return testReset();">
			<table border="1">
				<tr>
					<th>用户名</th>
					<td>
						<input type="text" id="uname" alt="用户名" name="uname" value="" onblur="checkUname();" />
						<span id="unameSpan"></span>
					</td>
				</tr>
				<tr>
					<th>密码</th>
					<td>
						<input type="password" id="pwd" alt="密码" name="pwd" value="" onblur="checkPwd();" />
						<span id="pwdSpan"></span>
					</td>
				</tr>
				<tr>
					<th>确认密码</th>
					<td>
						<input type="password" id="pwd2" value="" onblur="checkPwd2();" />
						<span id="pwd2Span"></span>
					</td>
				</tr>
				<tr>
					<th>真实姓名</th>
					<td>
						<input type="text" id="realname" name="realname" alt="真实姓名" value="" onblur="checkRealname();" />
						<span id="realnameSpan"></span>
					</td>
				</tr>
				<tr>
					<th>电子邮箱</th>
					<td>
						<input type="text" id="email" name="email" alt="电子邮箱" value="" onblur="checkEmail();" />
						<span id="emailSpan"></span>
					</td>
				</tr>
				<tr>
					<th>手机号码</th>
					<td>
						<input type="text" id="phone" name="phone" alt="手机号码" value="" onblur="checkPhone();" />
						<span id="phoneSpan"></span>
					</td>
				</tr>
				<tr>
					<th>性别</th>
					<td>
						<input type="radio" name="gender" value="1" checked />男
						<input type="radio" name="gender" value="2" />女


					</td>
				</tr>
				<tr>
					<th>爱好</th>
					<td>
						<input type="checkbox" name="fav" value="1" onclick="checkFav();" />足球
						<input type="checkbox" name="fav" value="2" onclick="checkFav();" />篮球
						<input type="checkbox" name="fav" value="3" onclick="checkFav();" />乒乓球
						<input type="checkbox" name="fav" value="4" onclick="checkFav();" />羽毛球
						<span id="favSpan"></span>
					</td>
				</tr>
				<tr>
					<th>户籍地址</th>
					<td>
						<select name="address" id="address" onchange="checkAddress();">
							<option value="">--请选择--</option>
							<option value="1">河南</option>
							<option value="2">河北</option>
							<option value="3">湖南</option>
							<option value="4">湖北</option>
						</select>
						<span id="addressSpan"></span>
					</td>
				</tr>
				<tr>
					<th>个人介绍</th>
					<td>
						<textarea id="intro" name="intro" rows="5" cols="80" alt="个人介绍" onblur="checkIntro();"></textarea>
						<span id="introSpan"></span>
					</td>
				</tr>
				<tr>
					<th>验证码</th>
					<td>
						<input type="text" id="code" size="4" maxlength="4" value="" onblur="checkCode();" />
                        <span id="randomCode" onclick="generateCode();"></span>
						<span id="codeSpan"></span>
					</td>
				</tr>
				<tr>
					<th colspan="2">
						<input type="checkbox" id="agree" checked="checked" onclick="checkAgree();" /> 是否阅读并同意协议
					</th>
				</tr>
				<tr>
					<th colspan="2">
						<input type="submit" id="sub" value="提交" />
						<input type="reset" value="重置" />
					</th>
				</tr>
			</table>
		</form>
	</body>


</html>
```

# 17-【熟悉】Bootstrap的使用

   [http://www.runoob.com/bootstrap/bootstrap-tutorial.html](http://www.runoob.com/bootstrap/bootstrap-tutorial.html)