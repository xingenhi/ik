# 01-【熟悉】jQuery 简介与安装

**一，jQuery 简介**

jQuery 库可以通过一行简单的标记被添加到网页中。

1，您需要具备的基础知识

在您开始学习 jQuery 之前，您应该对以下知识有基本的了解：

1. HTML  
2. CSS  
3. JavaScript  

2，什么是 jQuery ？  

* jQuery是一个JavaScript函数库。  
* jQuery是一个轻量级的"写的少，做的多"的JavaScript库。  
* jQuery库包含以下功能：
  * HTML 元素选取
  * HTML 元素操作
  * CSS 操作
  * HTML 事件函数
  * JavaScript 特效和动画
  * HTML DOM 遍历和修改
  * AJAX  

提示： 除此之外，Jquery还提供了大量的插件。

3，为什么使用 jQuery ？

目前网络上有大量开源的 JS 框架, 但是 jQuery 是目前最流行的 JS 框架，而且提供了大量的扩展。

很多大公司都在使用 jQuery， 例如:

1. Google  
2. Microsoft  
3. IBM  
4. Netflix  

---

**二，jQuery 安装**

1，下载 jQuery

> 有两个版本的 jQuery 可供下载：

> Production version - 用于实际的网站中，已被精简和压缩。

> Development version - 用于测试和开发（未压缩，是可读的代码）

> 以上两个版本都可以从[www.jquery.com](http://www.jquery.com/)中下载。

2，下载后的使用

         jQuery 库是一个 JavaScript 文件，您可以使用 HTML 的  标签引用它：

```Plain Text
<head>
<script src="jquery-1.10.2.min.js"></script>
</head>
```

3，其它方案使用

如果您不希望下载并存放 jQuery，那么也可以通过 CDN（内容分发网络） 引用它。

百度、又拍云、新浪、谷歌和微软的服务器都存有 jQuery 。

如果你的站点用户是国内的，建议使用百度、又拍云、新浪等国内CDN地址，如果你站点用户是国外的可以使用谷歌和微软。

菜鸟教程 CDN：

```Plain Text
<head>
<script src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
</script>
</head>
```

百度 CDN:

```Plain Text
<head>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
</script>
</head>
```

又拍云 CDN:

```Plain Text
<head>
<script src="http://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.2.min.js">
</script>
</head>
```

新浪 CDN:

```Plain Text
<head>
<script src="http://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js">
</script>
</head>
```

# 02-【掌握】JQuery 简单语法

**JQuery作用：**

通过 jQuery，您可以选取（查询，query） HTML 元素，并对它们执行"操作"（actions）。

---

一，jQuery 语法

jQuery 语法是通过选取 HTML 元素，并对选取的元素执行某些操作。

基础语法： \$(selector).action()

美元符号定义 jQuery

选择符（selector）"查询"和"查找" HTML 元素

jQuery 的 action() 执行对元素的操作

实例:

* \$(this).hide() - 隐藏当前元素  
* \$("p").hide() - 隐藏所有  元素  
* \$("p.test").hide() - 隐藏所有 class="test" 的  元素  
* \$("#test").hide() - 隐藏所有 id="test" 的元素    

---

**二，文档就绪事件**  

这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码。

如果在文档没有完全加载之前就运行函数，操作可能失败。

方法一

```Plain Text
$(document).ready(function(){
// 开始写 jQuery 代码...
});
```

方法二

```Plain Text
$(function(){
// 开始写 jQuery 代码...
});
```

# 03-【掌握】jQuery 选择器

**jQuery 选择器**

jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。

jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。

jQuery 中所有选择器都以美元符号开头：\$()。

---

**一，元素选择器**

jQuery 元素选择器基于元素名选取元素。

在页面中选取所有  元素:

\$("p")

实例

用户点击按钮后，所有  元素都隐藏：

实例

```Plain Text
$(document).ready(function(){
$("button").click(function(){
    $("p").hide();
});
});
```

---

**二，#id 选择器**

jQuery #id 选择器通过 HTML 元素的 id 属性选取指定的元素。

页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。

通过 id 选取元素语法如下：

\$("#test")

实例

当用户点击按钮后，有 id="test" 属性的元素将被隐藏：

实例

```Plain Text
$(document).ready(function(){
$("button").click(function(){
    $("#test").hide();
});
});
```

---

**三，.class 选择器**

jQuery 类选择器可以通过指定的 class 查找元素。

语法如下：

\$(".test")

实例

用户点击按钮后所有带有 class="test" 属性的元素都隐藏：

实例

```Plain Text
$(document).ready(function(){
$("button").click(function(){
    $(".test").hide();
});
});
```

---

**四，更多选择器说明**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab2bd7257-af9b-4890-9feb-693ad81d17be.png)

# 04-【掌握】jQuery 事件

**什么是事件？**

页面对不同访问者的响应叫做事件。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。

实例：

1. 在元素上移动鼠标。  
2. 选取单选按钮  
3. 点击元素  

在事件中经常使用术语"触发"（或"激发"）例如： "当您按下按键时触发 keypress 事件"。

常见 DOM 事件：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafe0a559a-9ce8-4ab1-b55e-06ccd98273d1.jpg)

---

**一，简单用法**

在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法。

页面中指定一个点击事件：

```javascript
$("p").click();
```

下一步是定义什么时间触发事件。您可以通过一个事件函数实现：

```javascript
$("p").click(function(){
    // 动作触发后执行的代码!!
});
```

---

**二，常用的 jQuery 事件方法**

 要想使用事件是必须使用文档就绪的方法的

\$(document).ready()

\$(document).ready() 方法允许我们在文档完全加载完后执行函数。该事件方法在 jQuery 语法 章节中已经提到过。

1，单击事件 click()

click() 方法是当按钮点击事件被触发时会调用一个函数。

该函数在用户点击 HTML 元素时执行。

在下面的实例中，当点击事件在某个  元素上触发时，隐藏当前的  元素：

实例

```javascript
$("p").click(function(){
  $(this).hide();
});
```

2，双击事件 dblclick()

当双击元素时，会发生 dblclick 事件。

dblclick() 方法触发 dblclick 事件，或规定当发生 dblclick 事件时运行的函数：

实例

```javascript
$("p").dblclick(function(){
  $(this).hide();
});
```

3，鼠标进入事件mouseenter()

当鼠标指针穿过元素时，会发生 mouseenter 事件。

mouseenter() 方法触发 mouseenter 事件，或规定当发生 mouseenter 事件时运行的函数：

实例

```javascript
$("#p1").mouseenter(function(){
    alert('您的鼠标移到了 id="p1" 的元素上!');
});
```

4，鼠标移出事件 mouseleave()

当鼠标指针离开元素时，会发生 mouseleave 事件。

mouseleave() 方法触发 mouseleave 事件，或规定当发生 mouseleave 事件时运行的函数：

实例

```javascript
$("#p1").mouseleave(function(){
    alert("再见，您的鼠标离开了该段落。");
});
```

5，鼠标按下事件 mousedown() 

当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。

mousedown() 方法触发 mousedown 事件，或规定当发生 mousedown 事件时运行的函数：

实例

```javascript
$("#p1").mousedown(function(){
    alert("鼠标在该段落上按下！");
});
```

6，鼠标松开事件 mouseup()

当在元素上松开鼠标按钮时，会发生 mouseup 事件。

mouseup() 方法触发 mouseup 事件，或规定当发生 mouseup 事件时运行的函数：

实例

```javascript
$("#p1").mouseup(function(){
    alert("鼠标在段落上松开。");
});
```

7，鼠标悬停事件hover()

hover()方法用于模拟光标悬停事件。

当鼠标移动到元素上时，会触发指定的第一个函数(mouseenter);当鼠标移出这个元素时，会触发指定的第二个函数(mouseleave)。

实例

```javascript
$("#p1").hover(
    function(){
        alert("你进入了 p1!");
    },
    function(){
        alert("拜拜! 现在你离开了 p1!");
    }
);
```

8，元素得到焦点事件 focus()

当元素获得焦点时，发生 focus 事件。

当通过鼠标点击选中元素或通过 tab 键定位到元素时，该元素就会获得焦点。

focus() 方法触发 focus 事件，或规定当发生 focus 事件时运行的函数：

实例

```javascript
$("input").focus(function(){
  $(this).css("background-color","#cccccc");
});
```

9，元素失去焦点事件blur()

当元素失去焦点时，发生 blur 事件。

blur() 方法触发 blur 事件，或规定当发生 blur 事件时运行的函数：

实例

```javascript
$("input").blur(function(){
  $(this).css("background-color","#ffffff");
});
```

---

**三，事件的绑定与解绑**

在开发中，有时候需要动态绑定一些事件，不用之后要解绑事件，如何做呢？

1，绑定

```javascript
function test() {
    var btn = $("#btn");
    btn.bind("click", function() {
        alert("点我干什么" + Math.random());
    })
    //  btn.one("click", function() {
    //  alert("我只被触发一次" + Math.random());;
    //              
    });
}
```

2，解绑

```javascript
function testUn() {
    var btn = $("#btn");
    btn.unbind("click");
}
```

3，触发

```javascript
function testCf() {
    var btn = $("#btn");
    btn.click();
}
```

4，JQ绑定

```javascript
function testBd() {
    $("#btn").click(function() {
        alert(":哈哈哈哈哈");
    });
}
```

实例

```html
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <title></title>
        <script src="js/jquery-1.9.1.js" type="text/javascript" charset="utf-8"></script>
        <script type="text/javascript">
            function test() {
                var btn = $("#btn");
                btn.bind("click", function() {
                    alert("点我干什么" + Math.random());
                });
                //              btn.one("click", function() {
                //                  alert("我只被触发一次" + Math.random());;
                //              });
            }

            function testUn() {
                var btn = $("#btn");
                btn.unbind("click");
            }

            function testCf() {
                var btn = $("#btn");
                btn.click();
            }

            function testBd() {
                $("#btn").click(function() {
                    alert(":哈哈哈哈哈");
                });
            }
        </script>
    </head>

    <body>

        <h1>操作事件</h1>
        <input type="button" value="测试事件(添加)" onclick="test();" />
        <input type="button" value="测试事件(解绑)" onclick="testUn();" />
        <input type="button" value="测试事件(触发)" onclick="testCf();" />
        <input type="button" value="测试事件(绑定)" onclick="testBd();" />
        <hr />
        <input type="button" value="点我啊" id="btn" />
    </body>

</html>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9766583194618725.png)

# 05-【了解】jQuery 动画效果

**一，jQuery 隐藏/显示**

**1，jQuery hide() 和 show()**  

通过 jQuery，您可以使用 hide() 和 show() 方法来隐藏和显示 HTML 元素：

实例

```Plain Text
$("#hide").click(function(){
  $("p").hide();
});
 
$("#show").click(function(){
  $("p").show();
});
```

语法:

\$(selector).hide(speed,callback);

\$(selector).show(speed,callback);

可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

下面的例子演示了带有 speed 参数的 hide() 方法：

实例

```Plain Text
$("button").click(function(){
  $("p").hide(1000);
});
```

**2，jQuery toggle()**

通过 jQuery，您可以使用 toggle() 方法来切换 hide() 和 show() 方法。

显示被隐藏的元素，并隐藏已显示的元素：

实例

```Plain Text
$("button").click(function(){
  $("p").toggle();
});
```

语法:

\$(selector).toggle(speed,callback);

可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是隐藏或显示完成后所执行的函数名称。

---

**二，jQuery 淡入淡出**

通过 jQuery，您可以实现元素的淡入淡出效果。

jQuery 拥有下面四种 fade 方法：

1. fadeIn()  
2. fadeOut()  
3. fadeToggle()  
4. fadeTo()  

1，jQuery fadeIn() 方法

jQuery fadeIn() 用于淡入已隐藏的元素。

语法:

```Plain Text
$(selector).fadeIn(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。.

可选的 callback 参数是 fading 完成后所执行的函数名称。

下面的例子演示了带有不同参数的 fadeIn() 方法：

实例

```Plain Text
$("button").click(function(){
  $("#div1").fadeIn();
  $("#div2").fadeIn("slow");
  $("#div3").fadeIn(3000);
});
```

**2，jQuery fadeOut() 方法**

jQuery fadeOut() 方法用于淡出可见元素。

语法:

```Plain Text
$(selector).fadeOut(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是 fading 完成后所执行的函数名称。

下面的例子演示了带有不同参数的 fadeOut() 方法：

实例

```Plain Text
$("button").click(function(){
  $("#div1").fadeOut();
  $("#div2").fadeOut("slow");
  $("#div3").fadeOut(3000);
});
```

**3，jQuery fadeToggle() 方法**

jQuery fadeToggle() 方法可以在 fadeIn() 与 fadeOut() 方法之间进行切换。

如果元素已淡出，则 fadeToggle() 会向元素添加淡入效果。

如果元素已淡入，则 fadeToggle() 会向元素添加淡出效果。

语法:

```Plain Text
$(selector).fadeToggle(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是 fading 完成后所执行的函数名称。

下面的例子演示了带有不同参数的 fadeToggle() 方法：

实例

```Plain Text
$("button").click(function(){
  $("#div1").fadeToggle();
  $("#div2").fadeToggle("slow");
  $("#div3").fadeToggle(3000);
});
```

**4，jQuery fadeTo() 方法**

jQuery fadeTo() 方法允许渐变为给定的不透明度（值介于 0 与 1 之间）。

语法:

```Plain Text
$(selector).fadeTo(speed,opacity,callback);
```

必需的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

fadeTo() 方法中必需的 opacity 参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）。

可选的 callback 参数是该函数完成后所执行的函数名称。

下面的例子演示了带有不同参数的 fadeTo() 方法：

实例

```Plain Text
$("button").click(function(){
  $("#div1").fadeTo("slow",0.15);
  $("#div2").fadeTo("slow",0.4);
  $("#div3").fadeTo("slow",0.7);
});
```

---

**三，jQuery 滑动**

通过 jQuery，您可以在元素上创建滑动效果。

jQuery 拥有以下滑动方法：

1. slideDown()  
2. slideUp()  
3. slideToggle()

---

**1，jQuery slideDown() 方法**

jQuery slideDown() 方法用于向下滑动元素。语法:

```Plain Text
$(selector).slideDown(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值：\*\*"slow"、"fast" 或毫秒\*\*。

可选的 callback 参数是滑动完成后所执行的函数名称。

下面的例子演示了 slideDown() 方法：

```Plain Text
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideDown(1000,function(){
		alert('加载完成');
	});
  });
});
```

---

**2，jQuery slideUp() 方法**

jQuery slideUp() 方法用于向上滑动元素。语法:

```Plain Text
$(selector).slideUp(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值：\*\*"slow"、"fast" 或毫秒。\*\*

可选的 callback 参数是滑动完成后所执行的函数名称。

下面的例子演示了 slideUp() 方法：

```Plain Text
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideUp(1000,function(){
		alert('加载完成');
	});
  });
});
```

---

**3，jQuery slideToggle() 方法**

jQuery slideToggle() 方法可以在 slideDown() 与 slideUp() 方法之间进行切换。

如果元素向下滑动，则 slideToggle() 可向上滑动它们。

如果元素向上滑动，则 slideToggle() 可向下滑动它们。

```Plain Text
$(selector).slideToggle(speed,callback);
```

可选的 speed 参数规定效果的时长。它可以取以下值：\*\*"slow"、"fast" 或毫秒。\*\*

可选的 callback 参数是滑动完成后所执行的函数名称。

下面的例子演示了 slideToggle() 方法：

```Plain Text
$(document).ready(function(){
  $("#flip").click(function(){
    $("#panel").slideToggle(1000,function(){
		alert('加载完成');
	});
  });
});
```

---

**四，jQuery 动画**

1，jQuery animate() 方法用于创建自定义动画。语法：  

```Plain Text
$(selector).animate({params},speed,callback);
```

必需的 params 参数定义形成动画的 CSS 属性。

可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。

可选的 callback 参数是动画完成后所执行的函数名称。

下面的例子演示 animate() 方法的简单应用。它把  元素往右边移动了 250 像素：

```Plain Text
<script> 
$(document).ready(function(){
  $("button").click(function(){
    $("div").animate({left:'250px'});
  });
});
</script> 
</head>
<body>
<button>开始动画</button>
<div style="background:#98bf21;height:100px;width:100px;position:absolute;">
</div>
</body>
```

**默认情况下，所有 HTML 元素都有一个静态位置，且无法移动。**

**如需对位置进行操作，要记得首先把元素的 CSS position 属性设置为 relative、fixed 或 absolute！**

---

2，jQuery animate() - 操作多个属性

请注意，生成动画的过程中可同时使用多个属性：

```Plain Text
$("button").click(function(){
  $("div").animate({
    left:'250px',
    opacity:'0.5',  透明度
    height:'150px',
    width:'150px'
  });
});
```

可以用 animate() 方法来操作所有 CSS 属性吗？

是的，几乎可以！不过，需要记住一件重要的事情：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。

同时，色彩动画并不包含在核心 jQuery 库中。

如果需要生成颜色动画，您需要从 jquery.com 下载 颜色动画 插件。

---

3，jQuery animate() - 使用相对值

也可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 += 或 -=：

实例

```Plain Text
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});
```

4，jQuery animate() - 使用预定义的值

您甚至可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：

实例

```Plain Text
$("button").click(function(){
  $("div").animate({
    height:'toggle'
  });
});
```

5，jQuery animate() - 使用队列功能

默认地，jQuery 提供针对动画的队列功能。

这意味着如果您在彼此之后编写多个 animate() 调用，jQuery 会创建包含这些方法调用的"内部"队列。然后逐一运行这些 animate 调用。

实例 1

```Plain Text
$("button").click(function(){
  var div=$("div");
  div.animate({height:'300px',opacity:'0.4'},"slow");
  div.animate({width:'300px',opacity:'0.8'},"slow");
  div.animate({height:'100px',opacity:'0.4'},"slow");
  div.animate({width:'100px',opacity:'0.8'},"slow");
});
```

下面的例子把  元素往右边移动了 100 像素，然后增加文本的字号：

实例 2

```Plain Text
$("button").click(function(){
  var div=$("div");
  div.animate({left:'100px'},"slow");
  div.animate({fontSize:'3em'},"slow");
});
```

**五，jQuery 停止动画**

jQuery stop() 方法

jQuery stop() 方法用于停止动画或效果，在它们完成之前。

stop() 方法适用于所有 jQuery 效果函数，包括滑动、淡入淡出和自定义动画。

语法:

```Plain Text
$(selector).stop(stopAll,goToEnd);
```

可选的 stopAll 参数规定是否应该清除动画队列。默认是 false，即仅停止活动的动画，允许任何排入队列的动画向后执行。

可选的 goToEnd 参数规定是否立即完成当前动画。默认是 false。

因此，默认地，stop() 会清除在被选元素上指定的当前动画。

实例

```Plain Text
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
</script>
<script> 
$(document).ready(function(){
  $("#start").click(function(){
    $("div").animate({left:'100px'},5000);
    $("div").animate({fontSize:'3em'},5000);
  });
  
  $("#stop").click(function(){
    $("div").stop();
  });


  $("#stop2").click(function(){
    $("div").stop(true);
  });


  $("#stop3").click(function(){
    $("div").stop(true,true);
  });
});
</script> 
</head>
<body><button id="start">开始</button>
<button id="stop">停止</button>
<button id="stop2">停止所有</button>
<button id="stop3">停止动画，但完成动作</button>
<p>点击 "开始" 按钮开始动画。</p>
<p>点击 "停止" 按钮停止当前激活的动画，但之后我们能再动画队列中再次激活。</p>
<p>点击 "停止所有" 按钮停止当前动画，并清除动画队列，所以元素的所有动画都会停止。</p>
<p>点击 "停止动画，但完成动作" 快速完成动作，并停止它。</p> 
<div style="background:#98bf21;height:100px;width:200px;position:absolute;">HELLO</div>
</body>
</html>
```

---

**六，jQuery Callback回调**

Callback 函数在当前动画 100% 完成之后执行。

jQuery 动画的问题

许多 jQuery 函数涉及动画。这些函数也许会将 speed 或 duration 作为可选参数。

例子：\$("p").hide("slow")

speed 或 duration 参数可以设置许多不同的值，比如 "slow", "fast", "normal" 或毫秒。

实例

以下实例在隐藏效果完全实现后回调函数:

使用 callback 实例

```Plain Text
$("button").click(function(){
  $("p").hide("slow",function(){
    alert("段落现在被隐藏了");
  });
});
```

**七，jQuery 方法链**

通过 jQuery，可以把动作/方法链接在一起。

Chaining 允许我们在一条语句中运行多个 jQuery 方法（在相同的元素上）。

jQuery 方法链接

直到现在，我们都是一次写一条 jQuery 语句（一条接着另一条）。

不过，有一种名为链接（chaining）的技术，允许我们在相同的元素上运行多条 jQuery 命令，一条接着另一条。

提示： 这样的话，浏览器就不必多次查找相同的元素。

如需链接一个动作，您只需简单地把该动作追加到之前的动作上。

下面的例子把 css()、slideUp() 和 slideDown() 链接在一起。"p1" 元素首先会变为红色，然后向上滑动，再然后向下滑动：

实例

```Plain Text
$("#p1").css("color","red").slideUp(2000).slideDown(2000);
```

如果需要，我们也可以添加多个方法调用。

提示：当进行链接时，代码行会变得很差。不过，jQuery 语法不是很严格；您可以按照希望的格式来写，包含换行和缩进。

如下书写也可以很好地运行：

```Plain Text
$("#p1").css("color","red")
  .slideUp(2000)
  .slideDown(2000);
```

# 06-【掌握】jQuery DOM操作

一，jQuery 捕获

jQuery DOM 操作

jQuery 中非常重要的部分，就是操作 DOM 的能力。

jQuery 提供一系列与 DOM 相关的方法，这使访问和操作元素和属性变得很容易。

DOM = Document Object Model（文档对象模型）

DOM 定义访问 HTML 和 XML 文档的标准：

"W3C 文档对象模型独立于平台和语言的界面，允许程序和脚本动态访问和更新文档的内容、结构以及样式。

---

**1，获得内容 - text()、html() 以及 val()**

三个简单实用的用于 DOM 操作的 jQuery 方法：

1. text() - 设置或返回所选元素的文本内容  
2. html() - 设置或返回所选元素的内容（包括 HTML 标记）  
3. val() - 设置或返回表单字段的值  

下面的例子演示如何通过 jQuery text() 和 html() 方法来获得内容：

实例

```Plain Text
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    alert("Text: " + $("#test").text());
  });
  $("#btn2").click(function(){
    alert("HTML: " + $("#test").html());
  });
});
</script>
</head>
<body>
<p id="test">这是段落中的 <b>粗体</b> 文本。</p>
<button id="btn1">显示文本</button>
<button id="btn2">显示 HTML</button>
</body>
</html>
```

下面的例子演示如何通过 jQuery val() 方法获得输入字段的值：

```Plain Text
<script>
$(document).ready(function(){
  $("button").click(function(){
    alert("值为: " + $("#test").val());
  });
});
</script>
</head>
<body>
<p>名称: <input type="text" id="test" value="jQuery教程"></p>
<button>显示值</button>
</body>
</html>
```

**2，获取属性 - attr()**

jQuery attr() 方法用于获取属性值。

下面的例子演示如何获得链接中 href 属性的值：

实例

```Plain Text
<script>
$(document).ready(function(){
  $("button").click(function(){
    alert($("#sxt").attr("href"));
  });
});
</script>
</head>


<body>
<p><a href="http://www.runoob.com" id="sxt">jQuery教程</a></p>
<button>显示 href 属性的值</button>
</body>
</html>
```

---

**二，jQuery 设置**

**1，设置内容 - text()、html() 以及 val()【重点】**

我们将使用前一章中的三个相同的方法来设置内容：

text() - 设置或返回所选元素的文本内容

html() - 设置或返回所选元素的内容（包括 HTML 标记）

val() - 设置或返回表单字段的值

下面的例子演示如何通过 text()、html() 以及 val() 方法来设置内容：

实例

```Plain Text
$("#btn1").click(function(){
    $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
    $("#test3").val("SXT");
});
```

**2，text()、html() 以及 val() 的回调函数**

上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

下面的例子演示带有回调函数的 text() 和 html()：

```Plain Text
$("#btn1").click(function(){
    $("#test1").text(function(i,origText){
        return "旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")"; 
    });
});
$("#btn2").click(function(){
    $("#test2").html(function(i,origText){
        return "旧 html: " + origText + " 新 html: Hello <b>world!</b> (index: " + i + ")"; 
    });
});
```

【注意】：html(function(index, html)) index为元素在集合中的索引位置，html为原先的HTML值

**3，设置属性 - attr()**

jQuery attr() 方法也用于设置/改变属性值。

下面的例子演示如何改变（设置）链接中 href 属性的值：

```Plain Text
$("button").click(function(){
  $("#sxt").attr("href","http://www.whsxt.com");
});
```

attr() 方法也允许您同时设置多个属性。

下面的例子演示如何同时设置 href 和 title 属性：

实例

```Plain Text
$("button").click(function(){
    $("#sxt").attr({
        "href" : "http://www.whsxt.com",
        "title" : "武汉尚学堂"
    });
});
```

**4，attr() 的回调函数**

jQuery 方法 attr()，也提供回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

下面的例子演示带有回调函数的 attr() 方法：

```Plain Text
$("button").click(function(){
  $("#sxt").attr("href", function(i,origValue){
    return origValue + "/java"; 
  });
});
```

---

**三，jQuery 添加元素**

添加新的 HTML 内容

我们将学习用于添加新内容的四个 jQuery 方法：

1. append() - 在被选元素的结尾插入内容  
2. prepend() - 在被选元素的开头插入内容  
3. after() - 在被选元素之后插入内容  
4. before() - 在被选元素之前插入内容  

1，jQuery append() 方法

jQuery append() 方法在被选元素的结尾插入内容。

实例

\$("p").append("追加文本");

2，jQuery prepend() 方法

jQuery prepend() 方法在被选元素的开头插入内容。

实例\$("p").prepend("在开头追加文本");



通过 append() 和 prepend() 方法添加若干新元素

在上面的例子中，我们只在被选元素的开头/结尾插入文本/HTML。

不过，append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。

在下面的例子中，我们创建若干个新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 append() 方法把这些新元素追加到文本中（对 prepend() 同样有效）：

实例

```Plain Text
function appendText()
{
    var txt1="<p>文本。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}
```

jQuery after() 和 before() 方法

jQuery after() 方法在被选元素之后插入内容。

jQuery before() 方法在被选元素之前插入内容。

实例

\$("img").after("在后面添加文本");

\$("img").before("在前面添加文本");

通过 after() 和 before() 方法添加若干新元素

after() 和 before() 方法能够通过参数接收无限数量的新元素。可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建新元素。

在下面的例子中，我们创建若干新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 after() 方法把这些新元素插到文本中（对 before() 同样有效）：

```Plain Text
function afterText()
{
    var txt1="<b>I </b>";                    // 使用 HTML 创建元素
    var txt2=$("<i></i>").text("love ");     // 使用 jQuery 创建元素
    var txt3=document.createElement("big");  // 使用 DOM 创建元素
    txt3.innerHTML="jQuery!";
    $("img").after(txt1,txt2,txt3);          // 在图片后添加文本
}
```

---

**四，jQuery 删除元素**

通过 jQuery，可以很容易地删除已有的 HTML 元素。

删除元素/内容

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

1. remove() - 删除被选元素（及其子元素）  
2. empty() - 从被选元素中删除子元素  

1，jQuery remove() 方法

jQuery remove() 方法删除被选元素及其子元素。

实例     \$("#div1").remove();

2，jQuery empty() 方法

jQuery empty() 方法删除被选元素的子元素。

实例     \$("#div1").empty();

3，过滤被删除的元素

jQuery remove() 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

下面的例子删除 class="italic" 的所有  元素：

实例

\$("p").remove(".italic");

---

**五，jQuery CSS 类**

jQuery 操作 CSS

jQuery 拥有若干进行 CSS 操作的方法。我们将学习下面这些：

1. addClass() - 向被选元素添加一个或多个类  
2. removeClass() - 从被选元素删除一个或多个类  
3. toggleClass() - 对被选元素进行添加/删除类的切换操作  
4. css() - 设置或返回样式属性  

实例样式表

下面的样式表将用于本页的所有例子：

```Plain Text
.important
{
      font-weight:bold;
      font-size:xx-large;
}
.blue
{
      color:blue;
}
```

1，jQuery addClass() 方法

下面的例子展示如何向不同的元素添加 class 属性。当然，在添加类时，您也可以选取多个元素：

实例

```Plain Text
$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
```

您也可以在 addClass() 方法中规定多个类：实例

```Plain Text
$("button").click(function(){
  $("#div1").addClass("important blue");
});
```

2，jQuery removeClass() 方法

下面的例子演示如何在不同的元素中删除指定的 class 属性：

```Plain Text
$("button").click(function(){
  $("h1,h2,p").removeClass("blue");
});
```

3，jQuery toggleClass() 方法

下面的例子将展示如何使用 jQuery toggleClass() 方法。该方法对被选元素进行添加/删除类的切换操作：

```Plain Text
$("button").click(function(){
  $("h1,h2,p").toggleClass("blue");
});
```

---

**六，jQuery css() 方法**

css() 方法设置或返回被选元素的一个或多个样式属性。

1，返回 CSS 属性

如需返回指定的 CSS 属性的值，请使用如下语法：

css("propertyname");

下面的例子将返回首个匹配元素的 background-color 值：

实例

\$("p").css("background-color");

2，设置 CSS 属性

如需设置指定的 CSS 属性，请使用如下语法：

css("propertyname","value");

下面的例子将为所有匹配元素设置 background-color 值：

实例

\$("p").css("background-color","yellow");

3，设置多个 CSS 属性

如需设置多个 CSS 属性，请使用如下语法：

css({"propertyname":"value","propertyname":"value",...});

下面的例子将为所有匹配元素设置 background-color 和 font-size：

实例

\$("p").css({"background-color":"yellow","font-size":"200%"});

---

**七，jQuery 尺寸**

jQuery 提供多个处理尺寸的重要方法：

1. width()  
2. height()  
3. innerWidth()  
4. innerHeight()  
5. outerWidth()  
6. outerHeight()  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradb59097e-b7dd-40bf-b196-a9409344154f.jpg)

 1，jQuery width() 和 height() 方法

width() 方法设置或返回元素的宽度（不包括内边距、边框或外边距）。

height() 方法设置或返回元素的高度（不包括内边距、边框或外边距）。

2，jQuery innerWidth() 和 innerHeight() 方法

innerWidth() 方法返回元素的宽度（包括内边距）。

innerHeight() 方法返回元素的高度（包括内边距）。

3，jQuery outerWidth() 和 outerHeight() 方法

outerWidth() 方法返回元素的宽度（包括内边距和边框）。

outerHeight() 方法返回元素的高度（包括内边距和边框）。

# 07-【掌握】jQuery和DOM对象互转

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5c113825-7baf-457e-861f-7151c8bcb064.png)

**一，jQuery对象转成DOM对象：** 

两种转换方式将一个jQuery对象转换成DOM对象：\[index\]和.get(index); 

(1)jQuery对象是一个数据对象，可以通过\[index\]的方法，来得到相应的DOM对象。 

如：var \$v =\$("#v") ; //jQuery对象 

var v=\$v\[0\]; //DOM对象 

alert(v.checked) //检测这个checkbox是否被选中 

(2)jQuery本身提供，通过.get(index)方法，得到相应的DOM对象 

如：var \$v=\$("#v"); //jQuery对象 

var v=\$v.get(0); //DOM对象 

alert(v.checked) //检测这个checkbox是否被选中 

---

**二，DOM对象转成jQuery对象:** 

对于已经是一个DOM对象，只需要用\$()把DOM对象包装起来，就可以获得一个jQuery对象了。\$(DOM对象) 

如：var v=document.getElementById("v"); //DOM对象 

var \$v=\$(v); //jQuery对象 

转换后，就可以任意使用jQuery的方法了。 

通过以上方法，可以任意的相互转换jQuery对象和DOM对象。需要再强调注意的是：DOM对象才能使用DOM中的方法，jQuery对象是不可以用DOM中的方法。

# 08-【掌握】jQuery 元素遍历

**一，jQuery 祖先**  

祖先是父、祖父或曾祖父等等。

通过 jQuery，您能够向上遍历 DOM 树，以查找元素的祖先。

向上遍历 DOM 树

这些 jQuery 方法很有用，它们用于向上遍历 DOM 树：

1. parent()  
2. parents()  
3. parentsUntil()  

**1，jQuery parent() 方法**

parent() 方法返回被选元素的直接父元素。

该方法只会向上一级对 DOM 树进行遍历。

下面的例子返回每个  元素的的直接父元素：

```Plain Text
$(document).ready(function(){
  $("span").parent();
});
```

**2，jQuery parents() 方法**

parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 ()。

下面的例子返回所有  元素的所有祖先：

实例

```Plain Text
$(document).ready(function(){
  $("span").parents();
});
```

您也可以使用可选参数来过滤对祖先元素的搜索。

下面的例子返回所有  元素的所有祖先，并且它是  元素：

实例

```Plain Text
$(document).ready(function(){
  $("span").parents("ul");
});
```

**3，jQuery parentsUntil() 方法 ----了解**

parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。

下面的例子返回介于  与  元素之间的所有祖先元素

```Plain Text
$(document).ready(function(){
  $("span").parentsUntil("div");
});
```

---

**二，jQuery 后代**

**向下遍历 DOM 树**

下面是两个用于向下遍历 DOM 树的 jQuery 方法：

1. children()  
2. find()  

1，jQuery children() 方法

children() 方法返回被选元素的所有直接子元素。

该方法只会向下一级对 DOM 树进行遍历。

下面的例子返回每个  元素的所有直接子元素：

```Plain Text
$(document).ready(function(){
  $("div").children();
});
```

您也可以使用可选参数来过滤对子元素的搜索。

下面的例子返回类名为 "1" 的所有  元素，并且它们是  的直接子元素：

```Plain Text
$(document).ready(function(){
  $("div").children("p.1");
});
```

2，jQuery find() 方法

find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。

下面的例子返回属于  后代的所有  元素：

```Plain Text
$(document).ready(function(){
  $("div").find("span");
});
```

下面的例子返回  的所有后代：

```Plain Text
$(document).ready(function(){
  $("div").find("*");
});
```

---

**三，jQuery 同胞**

在 DOM 树中**水平遍历**

有许多有用的方法让我们在 DOM 树进行水平遍历：

1. siblings()  
2. next()  
3. nextAll()  
4. nextUntil()  

**1，jQuery siblings() 方法**

siblings() 方法返回被选元素的所有同胞元素。

下面的例子返回  的所有同胞元素：

```Plain Text
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
	$("h2").siblings().css({"color":"red","border":"2px solid red"});
});
</script>
</head>
<body class="siblings">
  <div>div (父元素)
  <p>p</p>
  <span>span</span>
  <h2>h2</h2>
  <h3>h3</h3>
  <p>p</p>
</div>
</body>
</html>
```

您也可以使用可选参数来过滤对同胞元素的搜索。

下面的例子返回属于  的同胞元素的所有  元素：

```Plain Text
$(document).ready(function(){
$("h2").siblings("p");
});
```

**2，jQuery next() 方法**

next() 方法返回被选元素的下一个同胞元素。

该方法只返回一个元素。

下面的例子返回  的下一个同胞元素：

```Plain Text
$(document).ready(function(){
$("h2").next();
});
```

**3，jQuery nextAll() 方法**

nextAll() 方法返回被选元素的所有跟随的同胞元素。

下面的例子返回  的所有跟随的同胞元素：

实例

```Plain Text
$(document).ready(function(){
$("h2").nextAll();
});
```

**4，jQuery nextUntil() 方法**

nextUntil() 方法返回介于两个给定参数之间的所有跟随的同胞元素。

下面的例子返回介于  与  元素之间的所有同胞元素：

```Plain Text
$(document).ready(function(){
$("h2").nextUntil("h6");
});
```

# 09-【掌握】jQuery 过滤

**一，jQuery 过滤**

缩小搜索元素的范围

三个最基本的过滤方法是：

first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。

其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。



**1，jQuery first() 方法**

first() 方法返回被选元素的首个元素。

下面的例子选取首个  元素内部的第一个  元素：

```Plain Text
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
  $("div p").first().css("background-color","yellow");
});
</script>
</head>
<body>
<h1>欢迎访问我的主页</h1>
<div>
	<p>这是 div 中的一个段落。</p>
</div>
<div>
	<p>这是另外一个 div 中的一个段落。</p>
</div>
<p>这是一个段落。</p>
</body>
</html>
```

**2，jQuery last() 方法**

last() 方法返回被选元素的最后一个元素。

下面的例子选择最后一个  元素中的最后一个  元素：

实例

```Plain Text
$(document).ready(function(){
  $("div p").last();
});
```

**3，jQuery eq() 方法**

eq() 方法返回被选元素中带有指定索引号的元素。

索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个  元素（索引号 1）：

实例

```Plain Text
$(document).ready(function(){
  $("p").eq(1);
});
```

**4，jQuery filter() 方法**

filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。

下面的例子返回带有类名 "url" 的所有  元素：

实例

```Plain Text
$(document).ready(function(){
  $("p").filter(".url");
});
```

**5，jQuery not() 方法**

not() 方法返回不匹配标准的所有元素。

提示：not() 方法与 filter() 相反。

下面的例子返回不带有类名 "url" 的所有  元素：

```Plain Text
$(document).ready(function(){
  $("p").not(".url");
});
```

# 10-【掌握】jQuery each方法

**一，jQuery \$.each**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa2224380-4f5b-47b1-8a35-5e0943ae451b.png)

```html
<input type="checkbox" name="music" value="1" />爱你一万年<br />
<input type="checkbox" name="music" value="2" />忘情水<br />
<input type="checkbox" name="music" value="3" />天意<br />
<input type="checkbox" name="music" value="4" />冰雨<br />
<input type="checkbox" name="music" value="5" />成都<br />
<input type="checkbox" name="music" value="6" />武汉<br />
<input type="checkbox" name="music" value="7" />北京北京<br />
<input type="checkbox" name="music" value="8" />海阔天空<br />
<input type="checkbox" name="music" value="9" />真的爱你<br />
<input type="checkbox" name="music" value="10" />光辉岁月<br />
<input type="checkbox" name="music" value="11" />红日<br />
<input type="checkbox" name="music" value="12" />小苹果<br />
```

# 11-【掌握】jQuery Ajax

**一，jQuery load() 方法**  

jQuery load() 方法是简单但强大的 AJAX 方法。

load() 方法从服务器加载数据，并把返回的数据放入被选元素中。

语法:

```Plain Text
$(selector).load(URL,data,callback);
```

必需的 URL 参数规定您希望加载的 URL。

可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。

可选的 callback 参数是 load() 方法完成后所执行的函数名称。

这是示例文件（"demo\_test.txt"）的内容：

## jQuery AJAX 是个非常棒的功能！

这是段落的一些文本。

下面的例子会把文件 "demo\_test.txt" 的内容加载到指定的  元素中：

\$("#div1").load("demo\_test.txt");

也可以把 jQuery 选择器添加到 URL 参数。

下面的例子把 "demo\_test.txt" 文件中 id="p1" 的元素的内容，加载到指定的  元素中：

```Plain Text
$("#div1").load("demo_test.txt #p1");
```

可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：

1. responseTxt - 包含调用成功时的结果内容  
2. statusTXT - 包含调用的状态  
3. xhr - 包含 XMLHttpRequest 对象  

下面的例子会在 load() 方法完成后显示一个提示框。如果 load() 方法已成功，则显示"外部内容加载成功！"，而如果失败，则显示错误消息：

实例

```Plain Text
$("button").click(function(){
  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
});
```

---

**二，jQuery get()/post() 方法**

HTTP 请求：GET vs. POST

两种在客户端和服务器端进行请求-响应的常用方法是：GET 和 POST。

GET - 从指定的资源请求数据

POST - 向指定的资源提交要处理的数据

GET 基本上用于从服务器获得（取回）数据。注释：GET 方法可能返回缓存数据。

POST 也可用于从服务器获取数据。不过，POST 方法不会缓存数据，并且常用于连同请求一起发送数据。

如需学习更多有关 GET 和 POST 以及两方法差异的知识，请阅读我们的 HTTP 方法 - GET 对比 POST。

**1，jQuery \$.get() 方法**

\$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

语法：

\$.get(URL,callback);

必需的 URL 参数规定您希望请求的 URL。

可选的 callback 参数是请求成功后所执行的函数名。

下面的例子使用 \$.get() 方法从服务器上的一个文件中取回数据：

```Plain Text
$("button").click(function(){
  $.get("demo_test.php",function(data,status){
    alert("数据: " + data + "\n状态: " + status);
  });
});
```

\$.get() 的第一个参数是我们希望请求的 URL（"demo\_test.php"）。

第二个参数是回调函数。第一个回调参数存有被请求页面的内容，第二个回调参数存有请求的状态。

提示： 这个 PHP 文件 ("demo\_test.php") 类似这样：

demo\_test.php 文件代码:

```Plain Text
<?php
echo '这是个从PHP文件中读取的数据。';
?>
```

**2，jQuery \$.post() 方法**

\$.post() 方法通过 HTTP POST 请求从服务器上请求数据。

语法:

\$.post(URL,data,callback);

必需的 URL 参数规定您希望请求的 URL。

可选的 data 参数规定连同请求发送的数据。

可选的 callback 参数是请求成功后所执行的函数名。

下面的例子使用 \$.post() 连同请求一起发送数据

```Plain Text
$("button").click(function(){
    $.post("/try/ajax/demo_test_post.php",
    {
        name:"中国武汉",
        url:"http://www.whsxt.com"
    },
        function(data,status){
        alert("数据: \n" + data + "\n状态: " + status);
    });
});
```

\$.post() 的第一个参数是我们希望请求的 URL ("demo\_test\_post.php")。

然后我们连同请求（name 和 url）一起发送数据。

"demo\_test\_post.php" 中的 PHP 脚本读取这些参数，对它们进行处理，然后返回结果。

第三个参数是回调函数。第一个回调参数存有被请求页面的内容，而第二个参数存有请求的状态。

提示： 这个 PHP 文件 ("demo\_test\_post.php") 类似这样：

demo\_test\_post.php 文件代码:

```Plain Text
<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
$url = isset($_POST['url']) ? htmlspecialchars($_POST['url']) : '';
echo '网站名: ' . $name;
echo "\n";
echo 'URL 地址: ' .$url;
?>
```

---

**三，jQuery ajax方法**

```Plain Text
$.ajax({
    url:'/comm/test1.php',
    type:'POST', //GET
    async:true,    //或false,是否异步
    data:{
        name:'yang',age:25
    },
    timeout:5000,    //超时时间
    dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
    beforeSend:function(xhr){
        console.log(xhr)
        console.log('发送前')
    },
    success:function(data,textStatus,jqXHR){
        console.log(data)
        console.log(textStatus)
        console.log(jqXHR)
    },
    error:function(xhr,textStatus){
        console.log('错误')
        console.log(xhr)
        console.log(textStatus)
    },
    complete:function(){
        console.log('结束')
    }
})
```

---

**四，原生的js ajax方法**

```Plain Text
$('#send').click(function(){
    //请求的5个阶段，对应readyState的值
        //0: 未初始化，send方法未调用；
        //1: 正在发送请求，send方法已调用；
        //2: 请求发送完毕，send方法执行完毕；
        //3: 正在解析响应内容；
        //4: 响应内容解析完毕；
    var data = 'name=yang';
    var xhr = new XMLHttpRequest();        //创建一个ajax对象
    xhr.onreadystatechange = function(event){    //对ajax对象进行监听
        if(xhr.readyState == 4){    //4表示解析完毕
            if(xhr.status == 200){    //200为正常返回
                console.log(xhr.responseText)
            }
        }
    };
    xhr.open('POST','url',true);    //建立连接，参数一：发送方式，
二：请求地址，三：是否异步，true为异步
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');  
 //可有可无
    xhr.send(data);  //发送
});
```

# 12-【熟悉】jQuery 插件

jQuery Validate

jQuery Accordion

jQuery Autocomplete

jQuery Message

jQuery 密码验证

jQuery Prettydate

jQuery Tooltip

jQuery Treeview