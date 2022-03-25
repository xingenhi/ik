# 01-【了解】什么是CSS\_

       CSS是层叠样式表（Cascading Style Sheets）的缩写，它用于定义HTML元素的显示形式，是一种格式化网页内容的技术。CSS现在已经被大多数浏览器所支持，成为网页设计者必须掌握的技术之一。

---

       W3C自1996年12月发布第一个CSS正式推荐版CSS 1.0以来，一直在对CSS标准进行修订、升级。1999年1月，CSS 2.0 正式推荐版发布，增加了对其它媒体（打印机、视觉设备）、可下载字体、元素定位和表格的支持。最新版本的CSS标准CSS 3.0已经发部，就是HTML5里面的主要东西。

# 02-【了解】CSS的主要优势及学习要点

**一，优势**

1.专注于显示。**使显示和数据本身分离。**

2.优势：

1. CSS将从基础开始建设直到全面替代传统Web设计方法。W3C组织创建的CSS技术将替代HTML中用于表现的HTML元素。  
2. 提高页面浏览速度。使用CSS，比传统的Web设计方法至少节约50%以上的文件尺寸。  
3. 缩短改版时间，降低维护费用。只要简单修改几个CSS文件就可以重新设计一个有成百上千页面的站点。  
4. 强大的字体控制和排版能力。有了CSS，我们不再需要用font标记或者透明的1 px GIF图片来控制标题，改变字体颜色、字体样式等等。  
5. CSS非常容易编写。我们可以象写HTML代码一样轻松地编写CSS。  
6. 可以一次设计，随处发布。你的设计不仅仅用于Web浏览器，也可以发布在其他设备上。  
7. 更好的控制页面布局。结合CSS和div元素，可以比传统的使用table元素更好地控制页面布局。  
8. 实现表现和结构、内容相分离。将网页的表现形式部分剥离出来放在一个独立样式文件中，可以减少未来网页无效的可能。  

更方便搜索引擎的搜索。用只包含结构化内容的HTML代替嵌套的标签，搜索引擎将更有效地搜索到网页的内容，并可能给网页一个较高的评价。

---

**二，学习要点**

1，Css是什么？有什么优势？（css：cascade style sheet）

2，怎么样引用css文件、css样式？

3， Css选择器（如果对ajax感兴趣的话，可以了解）

4，和美工有沟通

# 03-【掌握】样式规则及引入方式

**一，样式规则**

CSS与字处理程序中的样式的工作方式相似，我们可以先定义一个包含格式选项的“样式”，然后将其应用于文档元素。CSS样式由样式规则组成，所有的样式规则的语法遵循如下



相同的基本格式：

选择器 { 属性1: 值1; 属性2: 值2; ... 属性N: 值N; }

一条样式规则由一个选择器和一个或者多个声明组成；

选择器指定规则可作用于HTML文档中哪个或者哪些元素；

声明要用大括号（{}）括起来。每个声明要用分号（;）结束。

一个属性/值对组成一个声明，属性和值之间用冒号（:）分隔；

如果属性值中包含了空格，那么该值就必须用双引号（""）括起来。例如：font-family: "Times New Roman"; 

我们还可以指定多个选择器使用相同的样式定义，选择器之间用逗号分隔开。例如，如果我们想要把所有标题列标记（从1到6）的文本字体颜色都定义为红色，可以使用如下定义：

h1, h2, h3, h4, h5, h6 { color: red; }

```Plain Text
h1 {color:red; font-size:14px;}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradf60a167-5249-486e-bd6c-09f22310c073.png)

---

**二，引入方式**

1. 外部样式表 不需要style标签   
2. 嵌入式样式表  

内联样式
属性名为style举例:  

---

**三，样式就近原则**

误解：外部文件<内部样式块对象<style属性

一句话：**谁离得近，谁优先级高！**



---

# 04-【掌握】选择器

   **一，元素选择器**

HTML元素是最典型的选择器类型，任何一个HTML元素都可以做为选择器。元素选择器的有效范围为页面中所有的、名称相同的HTML元素。

**格式：**  **元素 {** **属性:** **值; }**

**例如：h1 { color: red; }  h2 { color: #FF0000; }**    **或者：h1, h2 { color: #ff0000; }**

---

**二，类选择器【重点】**

如果想要把某一个样式应用到不同的HTML元素上，可以采用类选择器来定义，然后在不同标签中应用它们。

格式1： \*\*.\*\***类名 {** **属性:** **值; }** 

\**格式2\*\*\**：元素.\*\***类名 {** **属性:** **值; }**

1. \*\*

```Plain Text
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
```

\*\*2. \*\*

```Plain Text
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

\*\*3. \*\*

```Plain Text
<html xmlns="http://www.w3.org/1999/xhtml">
```

\*\*4. \*\*

```Plain Text
<head>
```

\*\*5. \*\*

```Plain Text
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
```

\*\*6. \*\*

```Plain Text
<title>类选择器示例1</title>
```

\*\*7. \*\*

```Plain Text
<style type="text/css">
```

\*\*8. \*\*

```Plain Text
.tt{ font-size:10pt; font-family:黑体; color:#800080; font-weight:bold; }
```

\*\*9. \*\*

```Plain Text
</style>
```

\*\*10. \*\*

```Plain Text
</head>
```

\*\*11. \*\*

```Plain Text
<body>
```

\*\*12. \*\*

```Plain Text
<p class="tt">示例一</p> /*p标签应用名字为tt的类层叠样式表*/
```

\*\*13. \*\*

```Plain Text
<h1 class="tt">示例二</h1> /*h1标签也应用名字为tt的类层叠样式表*/
```

\*\*14. \*\*

```Plain Text
</body>
```

\*\*15. \*\*

```Plain Text
</html>
```

\*\*

---

**三，ID选择器**

除了使用类选择器的方式定义一个样式以外，还可以使用ID定义样式。ID与类选择器的概念相似，只是ID选择器只能被引用一次，而类选择器可以被多次引用。

           格式：\*\*#id\*\***名 {** **属性:** **值;  }**

           示例：\*\*#red { color: red; }\*\*

\*\***欢迎使用id**选择器\*\*

---

**四，后代选择器**

如果需要为位于某个标记符内的元素设置特定的样式规则，则应将选择器指定为具有上下文关系的HTML标记

\**h1 b{ color:blue; } /\*****注意h1****和b\*\*\**之间以空格分隔\*/\*\*

---

**五，属性和值选择器**

下面的例子为带有 title 属性的所有元素设置样式：

```Plain Text
[title]
{
color:red;
}
```

下面的例子为 title="bjsxt" 的所有元素设置样式：

```Plain Text
[title=bjsxt]
{
border:5px solid blue;
}
```

设置表单的样式  

```Plain Text
input[type="text"]
{
  width:150px;
  display:block;
  margin-bottom:10px;
  background-color:yellow;
  font-family: Verdana, Arial;
}

input[type="button"]
{
  width:120px;
  margin-left:35px;
  display:block;
  font-family: Verdana, Arial;
}
```

---

**六，通配符选择器**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html lang="en">
```

```Plain Text
<head>
```

4. 

```Plain Text
    <meta charset="UTF-8">
```

5. 

```Plain Text
    <title>通配置符选择器</title>
```

6. 

```Plain Text
    <style type="text/css">
```

7. 

```Plain Text
        /*
```

8. 

```Plain Text
        通配符选择器
```

9. 

```Plain Text
        语法格式：
```

10. 

```Plain Text
            *{
```

11. 

```Plain Text
                属性:值;
```

12. 

```Plain Text
            }
```

13. 

```Plain Text
        语法说明:
```

14. 

```Plain Text
            *表示任意标签
```

15. 

```Plain Text
        注意:
```

16. 

```Plain Text
            1.在实际开发中，*因为通配任意标，而且不同浏览器，body存在间距，所以一般使用*处理间隙
```

17. 

```Plain Text
        */
```

18. 

```Plain Text
        *{
```

19. 

```Plain Text
            margin: 0px;
```

20. 

```Plain Text
            padding: 0px;
```

21. 

```Plain Text
            background-color: brown;
```

22. 

```Plain Text
        }
```

23. 

```Plain Text
    </style>
```

```Plain Text
</head>
```

```Plain Text
<body>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

---

**七，交集选择器**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html lang="en">
```

```Plain Text
<head>
```

4. 

```Plain Text
    <meta charset="UTF-8">
```

5. 

```Plain Text
    <title>交集选择器</title>
```

6. 

```Plain Text
    <style type="text/css">
```

7. 

```Plain Text
        /*
```

8. 

```Plain Text
        交集选择器
```

9. 

```Plain Text
        语法格式：
```

10. 

```Plain Text
            元素名.类名{
```

11. 

```Plain Text
                属性:值;
```

12. 

```Plain Text
            }
```

13. 

```Plain Text
            或者
```

14. 

```Plain Text
            元素名#ID值{
```

15. 

```Plain Text
                属性:值;
```

16. 

```Plain Text
            }
```

17. 

```Plain Text
         语法解释:
```

18. 

```Plain Text
            1.交集符合选择器是由两个选择器直接构成的，其结果是二者元素范围的交集。
```

19. 

```Plain Text
            2.其中第一个选择器必须是元素选择器，第二个选择器是ID选择器或者类选择器
```

20. 

```Plain Text
            3.两个选择器中间不能有空格
```

21. 

```Plain Text
        */
```

22. 

```Plain Text
        p.classvalue{
```

23. 

```Plain Text
            color:red; text-align:center;
```

24. 

```Plain Text
        }
```

25. 

```Plain Text
    </style>
```

```Plain Text
</head>
```

```Plain Text
<body>
```

28. 

```Plain Text
    <div>
```

29. 

```Plain Text
        <p class="classvalue">我是DIV中的P标签,class值为p1</p>
```

30. 

```Plain Text
        <p>我是DIV中的P标签,没有class</p>
```

31. 

```Plain Text
    </div>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

---

**八，并级选择器**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html lang="en">
```

```Plain Text
<head>
```

4. 

```Plain Text
    <meta charset="UTF-8">
```

5. 

```Plain Text
    <title>并集选择器</title>
```

6. 

```Plain Text
    <style type="text/css">
```

7. 

```Plain Text
        /*
```

8. 

```Plain Text
        并集选择器
```

9. 

```Plain Text
        语法格式:
```

10. 

```Plain Text
            选择器1,选择器2,...,选择器n{
```

11. 

```Plain Text
                属性:值;
```

12. 

```Plain Text
            }
```

13. 

```Plain Text
        语法说明:
```

14. 

```Plain Text
            1.并集选择器是由多个选择器组成,各个选择器之间使用英文的逗号(,)分隔。
```

15. 

```Plain Text
            2.这多个选择器都会有这些CSS样式
```

16. 

```Plain Text
        注意：
```

17. 

```Plain Text
            1.在实际开发中并集选择器使用频率比较高。
```

18. 

```Plain Text
            2.公共样式可以使用并集选择器抽离出来,这样精简CSS样式代码
```

19. 

```Plain Text
        */
```

20. 

```Plain Text
        div,p{
```

21. 

```Plain Text
            width: 200px;
```

22. 

```Plain Text
            height: 100px;
```

23. 

```Plain Text
            border: 2px solid rebeccapurple;
```

24. 

```Plain Text
        }
```

25. 

```Plain Text
    </style>
```

```Plain Text
</head>
```

```Plain Text
<body>
```

28. 

```Plain Text
    <div>
```

29. 

```Plain Text
        我是div
```

30. 

```Plain Text
    </div>
```

31. 

```Plain Text
    <p>我是P标签</p>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

---

**九，子选择器**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html lang="en">
```

```Plain Text
<head>
```

4. 

```Plain Text
    <meta charset="UTF-8">
```

5. 

```Plain Text
    <title>子类选择器</title>
```

6. 

```Plain Text
    <style type="text/css">
```

7. 

```Plain Text
        /*
```

8. 

```Plain Text
        子类选择器
```

9. 

```Plain Text
        语法格式:
```

10. 

```Plain Text
            选择器1>选择器2{
```

11. 

```Plain Text
                属性:值;
```

12. 

```Plain Text
            }
```

13. 

```Plain Text
        语法说明:
```

14. 

```Plain Text
            1.子类选择器也是由多个选择器组成,各个选择器之间使用">"连接，其效果类似于后代选择器
```

15. 

```Plain Text
        注意:
```

16. 

```Plain Text
            子类选择器其作用类似于后代选择器,但是子类选择器其效率高于后代选择器,推荐使用
```

17. 

```Plain Text
        */
```

18. 

```Plain Text
        body>div{
```

19. 

```Plain Text
            border: #ff858f 2px solid;
```

20. 

```Plain Text
            height: 300px;
```

21. 

```Plain Text
            width: 400px;
```

22. 

```Plain Text
            background-color: #c7ffaf;
```

23. 

```Plain Text
        }
```

24. 

```Plain Text
    </style>
```

```Plain Text
</head>
```

```Plain Text
<body>
```

27. 

```Plain Text
    <div>我是body中的div</div>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

---

**十，伪类选择器**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html lang="en">
```

```Plain Text
<head>
```

4. 

```Plain Text
    <meta charset="UTF-8">
```

5. 

```Plain Text
    <title>伪类选择器</title>
```

6. 

```Plain Text
    <style type="text/css">
```

7. 

```Plain Text
        /*
```

8. 

```Plain Text
        伪类选择器
```

9. 

```Plain Text
        语法格式:
```

10. 

```Plain Text
            初始化的样式
```

11. 

```Plain Text
            a:link{
```

12. 

```Plain Text
                属性:值;
```

13. 

```Plain Text
            }
```

14. 

```Plain Text
            鼠标点击过后的样式
```

15. 

```Plain Text
            a:visited{
```

16. 

```Plain Text
                属性:值;
```

17. 

```Plain Text
            }
```

18. 

```Plain Text
            鼠标放在上面的样式
```

19. 

```Plain Text
            a:hover{
```

20. 

```Plain Text
                属性:值;
```

21. 

```Plain Text
            }
```

22. 

```Plain Text
            鼠标按下时的样式
```

23. 

```Plain Text
            a:active{
```

24. 

```Plain Text
                属性:值;
```

25. 

```Plain Text
            }
```

26. 

```Plain Text
            注意：
```

27. 

```Plain Text
                1.在CSS样式的定义中,a:hover 必须被置于 a:link 和 a:visited 之后，
```

28. 

```Plain Text
                    顺序不对，有时样式会失效
```

29. 

```Plain Text
                2.:hover属性适用于任何元素
```

30. 

```Plain Text
                3.应当将相同的属性抽离出来,放在a标签选择器中
```

31. 

```Plain Text
        */
```

32. 

```Plain Text
        div{
```

33. 

```Plain Text
            margin: 30% auto;
```

34. 

```Plain Text
            height: 200px;
```

35. 

```Plain Text
            width: 700px;
```

36. 

```Plain Text
        }
```

37. 

```Plain Text
        a:link{
```

38. 

```Plain Text
            color: #ff858f;
```

39. 

```Plain Text
            font-size: 20px;
```

40. 

```Plain Text
            font-family: "Microsoft YaHei UI";
```

41. 

```Plain Text
            text-decoration: none;
```

42. 

```Plain Text
            margin: 20px;
```

43. 

```Plain Text
        }
```

44. 

```Plain Text
        a:hover{
```

45. 

```Plain Text
            text-decoration: underline;
```

46. 

```Plain Text
            color: #1bff4c;
```

47. 

```Plain Text
            font-size: 25px;
```

48. 

```Plain Text
            font-weight: bold;
```

49. 

```Plain Text
        }
```

50. 

```Plain Text
        a:active{
```

51. 

```Plain Text
            color: red;
```

52. 

```Plain Text
            text-decoration: none;
```

53. 

```Plain Text
        }
```

54. 

```Plain Text
        a:visited{
```

55. 

```Plain Text
            color: aqua;
```

56. 

```Plain Text
        }
```

57. 

```Plain Text
        div.div2:link{
```

58. 

```Plain Text
            background-color: #1bff4c;
```

59. 

```Plain Text
            height: 200px;
```

60. 

```Plain Text
            width: 200px;
```

61. 

```Plain Text
        }
```

62. 

```Plain Text
        div.div2:hover{
```

63. 

```Plain Text
            background-color: #ff858f;
```

64. 

```Plain Text
        }
```

65. 

```Plain Text
    </style>
```

```Plain Text
</head>
```

```Plain Text
<body>
```

68. 

```Plain Text
    <div>
```

69. 

```Plain Text
        <a href="http://www.baidu.com">我是A标签1</a>
```

70. 

```Plain Text
        <a href="#">我是A标签2</a>
```

71. 

```Plain Text
        <a href="#">我是A标签3</a>
```

72. 

```Plain Text
        <a href="#">我是A标签4</a>
```

73. 

```Plain Text
    </div>
```

74. 

```Plain Text
    <div class="div2">
```

75. 

```Plain Text
        我是个DIV
```

76. 

```Plain Text
    </div>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

# 05-【掌握】CSS属性单位

**一，css属性单位**

1， 长度单位

1，绝对长度值包括cm、mm、in、pt、pc等，绝对长度值最好用于打印输出设备，而在仅仅作为屏幕显示用时，绝对长度值并无多大意义。

2，相对长度值包括px、em、ex等。相对长度是指元素尺寸相对于浏览器的系统默认值来相应的缩放。

2，颜色单位

> 1，用百分比值来表示，如color:rgb(50%,0,50%) ；

> 2，使用0-255之间的整数值来设置，如color:rgb(128,0,128) ；

> 3，使用十六进制数组定义颜色，如#fc0eab；

> 4，使用简化的十六进制数定义颜色，如#080；

> 5，为颜色取名：aqua,black,blue,fuchsia,gray,green等。

3，URL单位

     URL单位的具体格式是：在“url”后面紧跟一个括号，括号中是url的地址。如果在地址中使用了括号、逗号、空格、单引号和双引号，那么就必须在整个地址的外面加上一对单引号或者双引号。地址可以是相对地址或绝对地址。 

    例如：

p{ background-image : url(img/logo.gif) ; }

---

# 06-【掌握】文本属性

| **属性名**      | **说明**     | **参数说明**                                      |
| --------------- | ------------ | ------------------------------------------------- |
| font-family     | 字体名称     |                                                   |
| font-size       | 字体大小     | 例：24px                                          |
| font-style      | 字体风格     | normal(缺省)，italic, oblique                     |
| font-weight     | 字体粗细     | normal(缺省)，bold或数值。                        |
| color           | 字体颜色     |                                                   |
| line-height     | 行高         | normal                                            |
| letter-spacing  | 字符间距     | normal                                            |
| text-decoration | 字体装饰     | none                                              |
| text-overflow   | 文本溢出处理 | clip                                              |
| text-align      | 文本对齐属性 | left (居左，缺省值)<br>right (居右) center (居中) |

Blink属性：ie不支持，火狐支持。（浏览器差异的问题）

实现溢出文本eclipsis的解决：

overflow:hidden;text-overflow:ellipsis; white-space:nowrap;

这三个属性必须一起使用。并且，这种方式只有ie支持。

# 07-【掌握】背景属性

| **属性名**            | **说明**     | **参数**                                                     |
| --------------------- | ------------ | ------------------------------------------------------------ |
| background-color      | **背景颜色** | 颜色单词或数值                                               |
| background-image      | **背景图片** |                                                              |
| background-repeat     | **背景重复** | 默认：同时向x, y方向重复<br>repeat-x 背景图片横向重复<br>repeat-y 背景图片竖向重复<br>no-repeat 背景图片不重复 |
| background-attachment | **背景附着** | scroll（缺省），fixed                                        |

background-attachment:fixed:属性：火狐支持，ie6不支持；ie7支持。

设置背景图片是否随着滚动而动

# 08-【掌握】列表属性

   主要是对ul和ol用  

| list-style-type     | 列表样式<br>类型属性 | \*\*disc (\*\***缺省值，黑圆点)**<br>\*\*circle (\*\*\*\*空心圆点)   square (\*\***小黑方块)**<br>\*\*decimal (\*\***数字排序)**<br>**lower-roman  upper-roman** **罗马数字**<br>**lower-alpha upper-alpha**  **英文字母**<br>\*\*none (\*\***无列表项标记)** |
| ------------------- | -------------------- | ------------------------------------------------------------ |
| list-style-position | **列表样式位置属性** | outside (以列表项内容为准对齐)<br>inside (以列表项标记为准对齐) |
| list-style-image    | **列表样式图片属性** |                                                              |

# 09-【掌握】定位属性

**一，position: relative | absolute | static | fixed**

1. static 没有特别的设定，遵循基本的定位规定，不能通过z-index进行层次分级。  
2. relative 不脱离文档流，参考自身静态位置,通过top,bottom,left,right 定位，并且可以通过z-index进行层次分级。  
3. absolute 脱离文档流，通过top,bottom,left,right 定位。选取其最近的父级定位元素，当父级 position 为 static 时，absolute元素将以body坐标原点进行定位，可以通过z-index进行层次分级。  
4. fixed 固定定位，这里他所固定的对象是可视窗口而并非是body或是父级元素。可通过z-index进行层次分级。  

**二，CSS中定位的层叠分级：z-index: auto | number ;**

auto 遵从其父对象的定位

number  无单位的整数值。可为负数。z-index使用整数表示元素的前后位置，数值越大，就会显示在相对靠前的位置，并且CSS同意在z-index中使用负数

# 10-【掌握】布局属性-浮动

| **属性名** | **说明**         | **常用参数** |
| ---------- | ---------------- | ------------ |
| float      | **漂浮**         | **none       |
| clear      | **是否允许漂浮** | **none       |
| display    | **能否显示**     | **none       |
| visibility | **可见性**       | **inherit    |

Display:为None时，其他元素可以占据该元素的位置。

Visibility: 为hidden时，其他元素不能占据该元素的位置。

浮动之后脱离文件流，不占位

# 11-【掌握】元素的分类

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
```

2. 

```Plain Text
    <head>
```

3. 

```Plain Text
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

4. 

```Plain Text
        <title>尚学堂JavaScript初级</title>
```

5. 

```Plain Text
        <script>
```

6. 

```Plain Text
            function test(){
```

7. 

```Plain Text
                var a = test2;  //把test2指向的函数对象引用赋值给了a
```

8. 

```Plain Text
                a();   //执行的仍然是test2函数    
```

```Plain Text
9.             
```

```Plain Text
            }
```

10. 

```Plain Text
            var test2 = function(){    //更能体现函数也是对象的含义！
```

```Plain Text
//根据此种定义方式，我们可以发现test2是一个全局变量，
```

```Plain Text
//他只想了匿名的函数对象！
```

13. 

```Plain Text
                alert("test2");
```

14. 

```Plain Text
            }
```

17. 

```Plain Text
            function test3(){
```

18. 

```Plain Text
                test4(234,test2);
```

19. 

```Plain Text
            }
```

21. 

```Plain Text
            function test4(a,b){
```

22. 

```Plain Text
                alert(a);
```

23. 

```Plain Text
                alert(b);
```

24. 

```Plain Text
                b();   //执行b指向的函数对象！
```

25. 

```Plain Text
            }
```

27. 

```Plain Text
        </script>
```

28. 

```Plain Text
    </head>
```

29. 

```Plain Text
    <body>
```

30. 

```Plain Text
        <input type=button value=测试  onclick="test();"  />
```

31. 

```Plain Text
        <input type=button value=测试2   onclick="test3();"  />
```

32. 

```Plain Text
    </body>
```

```Plain Text
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
```

2. 

```Plain Text
    <head>
```

3. 

```Plain Text
        <title>Untitled Document</title>
```

4. 

```Plain Text
        <script>
```

5. 

```Plain Text
            function testEval() {
```

6. 

```Plain Text
                var a="alert('你们好')";
```

7. 

```Plain Text
                var b="var c=0;";
```

9. 

```Plain Text
                eval(b);  //var c=0;
```

11. 

```Plain Text
                alert(c);
```

```Plain Text
//                var a1 = 'alert("你们好！")';
```

```Plain Text
//                var b="var c=11;";
```

```Plain Text
////                alert(a);
```

```Plain Text
//                alert("你们好");
```

```Plain Text
//                eval("var c=11;");   
```

```Plain Text
//                var c=11;
```

```Plain Text
//                var c=11;
```

```Plain Text
//                alert(c);
```

20. 

```Plain Text
            }
```

22. 

```Plain Text
            function testParse() {
```

23. 

```Plain Text
                var d="3.555";
```

24. 

```Plain Text
                var e1="abd";
```

26. 

```Plain Text
                var d1= parseFloat(d);
```

27. 

```Plain Text
                var d2=parseInt(d);
```

28. 

```Plain Text
                var e2=parseInt(e1);
```

```Plain Text
//                alert(1+d);
```

```Plain Text
//                alert(1+d1);
```

32. 

```Plain Text
                alert(d2);
```

```Plain Text
//                alert(1+d2);
```

```Plain Text
//                alert(e2);
```

35. 

```Plain Text
                if(isNaN(e2)) {
```

37. 

```Plain Text
                    alert("I'm a NaN");
```

38. 

```Plain Text
                }
```

40. 

```Plain Text
                if(e2!=e2) {
```

41. 

```Plain Text
                    alert("我不是我");
```

42. 

```Plain Text
                }
```

44. 

```Plain Text
                if(isFinite(e2)) {
```

45. 

```Plain Text
                    alert("我是一个正常的number");
```

46. 

```Plain Text
                }
```

48. 

```Plain Text
            }
```

50. 

```Plain Text
            function testEscape() {
```

51. 

```Plain Text
                var  str="中国";
```

52. 

```Plain Text
                var str1 = escape(str);
```

53. 

```Plain Text
                var str2 = unescape(str1);
```

54. 

```Plain Text
                alert(str1);
```

55. 

```Plain Text
                alert(str2);
```

56. 

```Plain Text
            }
```

58. 

```Plain Text
            function testDecode(){
```

59. 

```Plain Text
                var myurl='http://www.baidu.com/中国';
```

60. 

```Plain Text
                var u1=encodeURI(myurl);
```

61. 

```Plain Text
                var u2=decodeURI(u1);
```

62. 

```Plain Text
                alert(u1);
```

63. 

```Plain Text
                alert(u2);
```

64. 

```Plain Text
            }
```

66. 

```Plain Text
        </script>
```

67. 

```Plain Text
    </head>
```

68. 

```Plain Text
    <body>
```

69. 

```Plain Text
    <a href="javascript:void(0);" onclick="testEval();">测试eval方法</a>
```

70. 

```Plain Text
    <a href="javascript:void(0);" onclick="testParse();">测试parse方法</a>
```

71. 

```Plain Text
    <a href="javascript:void(0);" onclick="testEscape();">测试escape方法</a>
```

72. 

```Plain Text
    <a href="javascript:void(0);" onclick="testDecode();">测试Decode方法</a>
```

73. 

```Plain Text
    </body>
```

```Plain Text
</html>
```

在 JavaScript 核心语言中，全局对象的预定义属性都是不可枚举的，所有可以用 for/in 循环列出所有隐式或显式声明的全局变量，如下所示：  

```Plain Text
<html>
```

```Plain Text
<body>
```

```Plain Text
<script type="text/javascript">
```

```Plain Text
var variables = "";
```

```Plain Text
for (var name in this) 
```

```Plain Text
{
```

```Plain Text
variables += name + "<br />";
```

```Plain Text
}
```

```Plain Text
document.write(variables);
```

```Plain Text
</script>
```

```Plain Text
</body>
```

```Plain Text
</html>
```

# 12-【掌握】CSS盒子模型（box model）

**一，盒子模型的内容**

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa61b5aba-72bd-4128-9f50-bf3615885f77.jpg)

 

margin属性:  margin-top, margin-bottom, margin-left, margin-right

border属性:   border-color,  border-style, border-width, border-top…

padding属性: padding-top, padding-bottom, padding-left, padding-right

content属性: 

---

---

**二，属性说明**

1，margin:

围绕在内容边框的区域就是外边距，外边距默认为透明区域

外边距接任何长度单位，百分数

* margin:设置所有的外边距  
* margin-top 设置上边的外边距  
* margin-bottom, 设置下边的外边距  
* margin-left, 设置左边的外边距  
* margin-right 设置右边的外边距  
* 注意外边距合并的问题

2，border  复合属性   

* border-width 边框宽度  
* border-style 边框样式  
* border-color 边框颜色  
* border-radius 设置圆角边框  
* border-shadow 设置对象阴影  
* border-image 边框的背景图片  

3，padding

内边距在content外，边框内

* padding 设置所有的内边距  
* padding-top  设置上边的内边距  
* padding-bottom, 设置下边的内边距  
* padding-left, 设置左边的内边距  
* padding-right 设置右边的内边距  

---

**三，盒子模型的分类**

1，标准盒子：正常盒子模型、怪异盒子模型

2，伸缩盒：新、旧

---

**四，正常盒子模型**

```Plain Text
<html>
```

2. 

```Plain Text
    <head>
```

3. 

```Plain Text
        <meta charset="UTF-8">
```

4. 

```Plain Text
        <title></title>
```

5. 

```Plain Text
        <style type="text/css">
```

6. 

```Plain Text
            .outerbox{
```

7. 

```Plain Text
                width: 200px;
```

8. 

```Plain Text
                height: 200px;
```

9. 

```Plain Text
                background-color: rosybrown;
```

10. 

```Plain Text
            }
```

11. 

```Plain Text
            .innerbox{
```

12. 

```Plain Text
                width: 200px;
```

13. 

```Plain Text
                height: 200px;
```

14. 

```Plain Text
                background-color: royalblue;
```

15. 

```Plain Text
            }
```

16. 

```Plain Text
        </style>
```

17. 

```Plain Text
    </head>
```

18. 

```Plain Text
    <body>
```

19. 

```Plain Text
        <div class="outerbox">
```

20. 

```Plain Text
            <div class="innerbox">
```

21. 

```Plain Text
                haha
```

22. 

```Plain Text
            </div>
```

23. 

```Plain Text
        </div>
```

24. 

```Plain Text
    </body>
```

```Plain Text
</html>
```

注意点：

1，padding内边距会在以前的基础上扩大，也就是会自动撑开，不用改原来的宽度

2，margin-top  margin-bottom  会取它大的那一个值 

---

**五，怪异盒子模型**

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html>
```

3. 

```Plain Text
    <head>
```

4. 

```Plain Text
        <meta charset="UTF-8">
```

5. 

```Plain Text
        <title></title>
```

6. 

```Plain Text
        <style type="text/css">
```

7. 

```Plain Text
            .outerbox{
```

8. 

```Plain Text
                width: 200px;
```

9. 

```Plain Text
                height: 200px;
```

10. 

```Plain Text
                background-color: rosybrown;
```

11. 

```Plain Text
                padding: 20px;
```

12. 

```Plain Text
                box-sizing: border-box;
```

13. 

```Plain Text
            }
```

14. 

```Plain Text
            .innerbox{
```

15. 

```Plain Text
                width: 200px;
```

16. 

```Plain Text
                height: 200px;
```

17. 

```Plain Text
                background-color: royalblue;
```

18. 

```Plain Text
            }
```

19. 

```Plain Text
        </style>
```

20. 

```Plain Text
    </head>
```

21. 

```Plain Text
    <body>
```

22. 

```Plain Text
        <div class="outerbox">
```

23. 

```Plain Text
            <div class="innerbox">
```

24. 

```Plain Text
                haha
```

25. 

```Plain Text
            </div>
```

26. 

```Plain Text
        </div>
```

27. 

```Plain Text
    </body>
```

```Plain Text
</html>
```

注意点：

使用怪异的特点是固定了盒子的大小，无论怎么加边距，盒子的大小是不会改变的

---

**六，旧伸缩盒ccs3**

1，css3引入一个种新的布局模式---flexbox布局，就是伸缩盒模型(flexible box)  用来提供一个更加有效的方式制定，调整和分布一个容器项目布局，即使它们的大小是未知或者动态的

2，FlexBox可以轻松的实现屏幕和浏览器窗口大小发生变化时，保持元素的相对位置和大小不变

属性说明

* 1，box-orient  伸缩盒对象的子元素的排列方式  
* 2，box-pack  设置盒子里的内容垂直居中  
* 2，box-align  设置盒子里的内容水平居中  
* 4，box-flex   设置盒子内的对象按比例分配空间  
* 5，box-direction  盒子里面的对象排列顺序是否反转  

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html>
```

3. 

```Plain Text
    <head>
```

5. 

```Plain Text
        <meta charset="UTF-8">
```

6. 

```Plain Text
        <title></title>
```

7. 

```Plain Text
        <style type="text/css">
```

8. 

```Plain Text
            .container{
```

9. 

```Plain Text
                width: 500px;
```

10. 

```Plain Text
                height: 500px;
```

11. 

```Plain Text
                background-color: darkgray;
```

12. 

```Plain Text
                display: -webkit-box;  
```

13. 

```Plain Text
                /*变成盒子*/
```

14. 

```Plain Text
                /*-webkit-box-pack: center;*/
```

15. 

```Plain Text
                /*-webkit-box-orient: vertical;*/   
```

16. 

```Plain Text
                /*-webkit-box-align: center;*/
```

17. 

```Plain Text
                /*-webkit-box-direction: reverse;*/
```

18. 

```Plain Text
            }
```

19. 

```Plain Text
            /*div{
```

20. 

```Plain Text
                display: inline-block;
```

21. 

```Plain Text
            }*/
```

23. 

```Plain Text
            .one{
```

24. 

```Plain Text
                width: 100px;
```

25. 

```Plain Text
                height: 100px;
```

26. 

```Plain Text
                background-color: antiquewhite;
```

27. 

```Plain Text
                -webkit-box-flex: 1;
```

28. 

```Plain Text
            }
```

29. 

```Plain Text
            .two{
```

30. 

```Plain Text
                width: 100px;
```

31. 

```Plain Text
                height: 100px;
```

32. 

```Plain Text
                background-color: pink;
```

33. 

```Plain Text
                -webkit-box-flex: 1;
```

35. 

```Plain Text
            }
```

36. 

```Plain Text
            .three{
```

37. 

```Plain Text
                width: 100px;
```

38. 

```Plain Text
                height: 100px;
```

39. 

```Plain Text
                background-color: palegreen;
```

40. 

```Plain Text
                -webkit-box-flex: 1;
```

42. 

```Plain Text
            }
```

43. 

```Plain Text
        </style>
```

44. 

```Plain Text
    </head>
```

46. 

```Plain Text
    <body>
```

47. 

```Plain Text
        <div class="container">
```

48. 

```Plain Text
            <div class="one">
```

49. 

```Plain Text
                d1
```

50. 

```Plain Text
            </div>
```

51. 

```Plain Text
            <div class="two">
```

52. 

```Plain Text
                d2
```

53. 

```Plain Text
            </div>
```

54. 

```Plain Text
            <div class="three">
```

55. 

```Plain Text
                d3
```

56. 

```Plain Text
            </div>
```

57. 

```Plain Text
        </div>
```

58. 

```Plain Text
    </body>
```

```Plain Text
</html>
```

---

**七，新伸缩盒css3**

相关属性

1，flex  复合属性，设置伸缩盒子对象的子元素如何分配空间

2，flex-grow   弹性盒子扩展比率，按比例平均分配 

3，flex-flow   复合属性  设置伸缩盒子对象子元素排列方式

4，flex-direction   伸缩盒子对象的子元素在父容器中的位置

5，flex-wrap   设置伸缩盒对象的子元素超出父容器时是否换行

6，order    设置伸缩盒对象的子元素出现的顺序

```Plain Text
<!DOCTYPE html>
```

```Plain Text
<html>
```

3. 

```Plain Text
    <head>
```

5. 

```Plain Text
        <meta charset="UTF-8">
```

6. 

```Plain Text
        <title></title>
```

7. 

```Plain Text
        <style type="text/css">
```

8. 

```Plain Text
            .container{
```

9. 

```Plain Text
                width: 500px;
```

10. 

```Plain Text
                height: 500px;
```

11. 

```Plain Text
                background-color: darkgray;
```

12. 

```Plain Text
                /*变成盒子*/
```

13. 

```Plain Text
                display: -webkit-flex;  
```

14. 

```Plain Text
                /*-webkit-flex-direction: column-reverse;*/
```

15. 

```Plain Text
                /*-webkit-flex-wrap: wrap;*/
```

16. 

```Plain Text
            }
```

17. 

```Plain Text
            .one{
```

18. 

```Plain Text
                width: 300px;
```

19. 

```Plain Text
                height: 100px;
```

20. 

```Plain Text
                background-color: antiquewhite;
```

21. 

```Plain Text
            }
```

22. 

```Plain Text
            .two{
```

23. 

```Plain Text
                width: 200px;
```

24. 

```Plain Text
                height: 100px;
```

25. 

```Plain Text
                background-color: pink;
```

26. 

```Plain Text
                /*-webkit-order: 3;*/
```

27. 

```Plain Text
            }
```

28. 

```Plain Text
            .three{
```

29. 

```Plain Text
                width: 100px;
```

30. 

```Plain Text
                height: 100px;
```

31. 

```Plain Text
                background-color: palegreen;
```

32. 

```Plain Text
            }
```

33. 

```Plain Text
        </style>
```

34. 

```Plain Text
    </head>
```

36. 

```Plain Text
    <body>
```

37. 

```Plain Text
        <div class="container">
```

38. 

```Plain Text
            <div class="one">
```

39. 

```Plain Text
                d1
```

40. 

```Plain Text
            </div>
```

41. 

```Plain Text
            <div class="two">
```

42. 

```Plain Text
                d2
```

43. 

```Plain Text
            </div>
```

44. 

```Plain Text
            <div class="three">
```

45. 

```Plain Text
                d3
```

46. 

```Plain Text
            </div>
```

47. 

```Plain Text
        </div>
```

48. 

```Plain Text
    </body>
```

```Plain Text
</html>
```

---