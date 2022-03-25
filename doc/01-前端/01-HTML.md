# 01-【了解】HTML简介

HTML（HyperText Mark-up Language）即超文本标记语言，是目前网络上应用最为广泛的语言，也是构成网页文档的主要语言。HTML文本是由HTML命令组成的描述性文本，HTML命令可以说明文字、图 形、动画、声音、表格、链接等。HTML的结构包括头部（Head）、主体（Body）两大部分，其中头部描述浏览器所需的信息，而主体则包含所要说明的 具体内容。

         HTML语言被称为**互联网的三大基石**之一(其余两大基石分别为：HTTP协议、URL)。它解决了如何以丰富的效果展示数据内容的问题。互联网中，数据是在服务器和浏览器之间互相传送和执行。三大基石分别解决了如下问题：

?  HTTP协议：解决了服务器和浏览器之间数据如何传送、传送格式的问题！实现了分布式的信息共享。

?  URL协议：解决了众多服务器中资源定位问题。从而让浏览器可以访问不同的服务器资源，实现了全球信息的精确定位。

?  HTML语言：解决了数据在浏览器中如何丰富多彩的展示，及如何合理标示信息的问题。

我们访问一个互联网资源：[http://www.baidu.com](http://www.baidu.com/)，流程如下：

第一步：地址栏输入：

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.49468682119390395.png)

 

第二步：服务器收到请求，将HTML源代码传给客户端：

|百度一下，你就知道<br>[搜索设置](/gaoji/preferences.html) | [登录](http://passport.baidu.com/?login&tpl=mn)<br>![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabaidu_logo.gif)<br>[新 闻](http://news.baidu.com)　**网 页**　[贴 吧](http://tieba.baidu.com)　[知 道](http://zhidao.baidu.com)　[MP3](http://mp3.baidu.com)　[图 片](http://image.baidu.com)　[视 频](http://video.baidu.com)　[地 图](http://map.baidu.com)<br>输入法<br><br>* [手写](#)<br>* [拼音](#)<br>* [关闭](#)<br>[空间](http://hi.baidu.com)　[百科](http://baike.baidu.com)　[hao123](http://www.hao123.com) | [更多>>](/more/)<br>[把百度设为主页](http://utility.baidu.com/traf/click.php?id=215&url=http://www.baidu.com)<br>[加入百度推广](http://e.baidu.com/?refer=888) | [搜索风云榜](http://top.baidu.com) | [关于百度](http://home.baidu.com) | [About Baidu](http://ir.baidu.com)<br>©2011 Baidu [使用百度前必读](/duty/) [京ICP证030173号](http://www.miibeian.gov.cn) <br>![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorags.gif)|
| ----- |

         注：限于篇幅原因，部分源代码被删减!

第三步：浏览器解释执行上面的代码，出现如下丰富多彩的效果：

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac2029bbf-b4c5-4024-8acf-26b2d88067fa.jpg)

 

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf44fb507-afda-476f-8f21-5d315831cc08.jpg)

# 02-【了解】HTML起源和历史

HTML作为定义万维网的基本规则之一，最初由蒂姆·本尼斯李（Tim Berners-Lee）于1989年在CERN（Conseil Europeen pour la Recherche Nucleaire）研制出来。HTML的设计者是这样考虑的：HTML格式将允许科学家们透明地共享网络上的信息，即使这些科学家使用的计算机差别很大。因此，这种格式必须具备如下几个特点：

?  独立于平台，即独立于计算机硬件和操作系统。这个特性对各种受从是至关重要的，因为在这个特性中，文档可以在具有不同性能（即字体、图形和颜色差异）的计算机上以相似的形式显示文档内容。

?  超文本。允许文档中的任何文字或词组参照另一文档，这个特性将允许用户在不同计算机中的文档之间及文档内部漫游。

?  ·精确的结构化文档。该特性将允许某些高级应用，如HTML文档和其他格式文档间互相转换以及搜索文本数据库。

经过二十多年的发展，HTML已经成为IT时代最重要的技术！HTML标准经历了如下版本更换：

1.超文本置标语言(第一版)——在1993年6月发为[互联网](http://baike.baidu.com/view/6825.htm)工程工作小组 (IETF)工作草案发布（并非标准）.

2.HTML 2.0——1995年11月作为RFC 1866发布，在RFC 2854于2000年6月发布之后被宣布已经过时

3.HTML 3.2——1996年1月14日，W3C推荐标准

4.HTML 4.0——1997年12月18日，W3C推荐标准

5.HTML 4.01（微小改进）——1999年12月24日，W3C推荐标准

6.HTML5草案的前身名为Web Applications 1.0。於2004年被WHATWG提出，於2007年被W3C接纳，并成立了新的HTML工作团队。在2008年1月22日，第一份正式草案已公布,预计将在2010年9月正式向公众推荐。WHATWG表示该规范是目前正在进行的工作，仍须多年的努力。

# 03-【了解】为什么需要学习HTML\_

目前软件的形式分两种一种是C/S架构 另一种是B/S架构

C/S架构,此处的C为Client

B/S架构，此处的B即为Browser浏览器。

那么，要想在浏览器中展示数据，必然涉及到HTML。因此，HTML也成为目前软件工程师必须要掌握的基本技能！



         对于我们JAVA工程师来讲，我们将更加关注HTML中的一些常用标签的使用，尤其是表单标签是我们需要掌握的重点。



         我们并不需要特别关注，HTML标签显示效果，页面的美观度。术业有专攻，这些将会由公司美工来负责。



移动端也有BS和CS之分

# 04-【掌握】第一个HTML程序

## **一，说明**

HTML文件是普通的文本文件，只是文件扩展名为：.html或者.html。下面我们开始创建我们的第一个HTML程序。

## **二，创建HTML程序**

    1，新建文本文件   1.html  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3b0145a4-2e76-4900-861f-37d0891867fe.jpg)

  2，使用记事本打开写入如下代码

```Plain Text
<html>
   <head>
           <title>my first page</title>
   </head>
      <body bgcolor=blue>
       This is my first homepage!
      </body>
</html>
```

  3，使用浏览器打开该文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab6680ecd-a6d8-4d7a-b730-ad0ad9cd33a4.png)

# 05-【掌握】HTML基本标签

基本示例：<o:p><o:p>  <o:p>    Month<o:p>    Savings<o:p>  <o:p>  <o:p>    January<o:p>    \$100<o:p>  <o:p><o:p> 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6604022916633683.png)

 <o:p>跨行(rowspan)、跨列(colspan)操作：<o:p><o:p>  <o:p>    Month<o:p>    Savings<o:p>  <o:p>  <o:p>    January<o:p>    \$100.00<o:p>    $50</td><o:p></o:p></span></u></span></p><p class="MsoNormal"><span style="mso-bidi-font-size:10.5pt"><span style="mso-spacerun:yes">&nbsp; </span></tr><o:p></o:p></span></p><p class="MsoNormal"><span style="mso-bidi-font-size:10.5pt"><span style="mso-spacerun:yes">&nbsp; </span><tr><o:p></o:p></span></p><p class="MsoNormal"><span style="mso-bidi-font-size:10.5pt"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span><td>February</td><o:p></o:p></span></p><p class="MsoNormal"><span style="mso-bidi-font-size:10.5pt"><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp; </span><td>$10.00<o:p>  <o:p><o:p> 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7467717719346747.png)

 <o:p><o:p>  <o:p>MonthSavings<o:p>  <o:p>  <o:p>    January<o:p>  <o:p>  <o:p>    February<o:p>  <o:p><o:p> 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.11006245944832327.png)

 <o:p>单线表格的实现：<o:p><table
  width=400  border=1
  bordercolor="#FF0000" style="border-collapse:collapse"><o:p>         <o:p>                   <o:p>                            cell1<o:p>                   <o:p>                   <o:p>                            cell2<o:p>                   <o:p>                   <o:p>                            cell4<o:p>                   <o:p>         <o:p>         <o:p>                   <o:p>                   cell3<o:p>                           <o:p>         <o:p><o:p> 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22769080738284386.png)

 <o:p>注：表格标签以前经常用于网页的布局排版，不过现在已经基本上被CSS布局替代！十四，块元素   CSS中会讲
可定义文档中的分区或节（division/section）。<o:p>
标签可以把文档分割为独立的、不同的部分。它可以用作严格的组织工具，并且不使用任何格式与其关联。<o:p> 是一个块级元素。这意味着它的内容自动地开始一个新行。<o:p>在CSS的学习中，我们会详细讲述的用法。<o:p>十五，行内元素  CSS中会讲 标签被用来组合文档中的行内元素。在CSS的学习中，我们会详细讲述它的用法。<o:p>十六，框架标签frameset 元素可定义一个框架集。它被用来组织多个窗口（框架）。每个框架存有独立的文档。在其最简单的应用中，frameset 元素仅仅会规定在框架集中存在多少列或多少行。您必须使用 cols 或 rows 属性。 标签定义 frameset 中的一个特定的窗口（框架）。frameset 中的每个框架都可以设置不同的属性，比如 border、scrolling、noresize 等等。内嵌框架：的作用：可为那些不支持框架的浏览器显示文本。frameset<o:p><frameset rows="100,*" border="5"frameborder="yes"><o:p>    <frame src="frame/top.jsp" name="top"><o:p>    <frameset cols="200,*" border="5"frameborder="yes"><o:p>       <frame src="frame/left.jsp" name="left"><o:p>       <frame src="frame/main.jsp" name="main"><o:p>    </frameset><o:p></frameset><o:p>frame<o:p><frame src="frame/top.jsp" name="top"><o:p>十七，多媒体标签 <embed src="http://player.youku.com/player.php/Type/Folder/Fid/23705555/Ob/1/sid/XOTM3OTQ5NTg4/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" mode="transparent" type="application/x-shockwave-flash">

# 06-【掌握】HTML表单标签

   **一，表单标签集合**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora57091e0b-2d89-4ad5-a216-9e460655ae7b.png)

**作用：收集用户填写的数据，然后提交到服务器上。**

\*\*要提交数据的表单域必须加name属性。不然，该表单域的数据不会提交到服务器上。
\*\*

---

1. 文本框

2. 密码框
   跟文本框的用法基本一致，除了页面上以星号显示   
3. 单选按钮
   用于多选一的情况  
   性别：男
              女  
4. 复选框
   于多选多的情况：喜欢编程语言：
     JAVA
     C++
     RUBY
     C
   注意：
   复选框是分组的， name相同即为一组。 可同时多个复选框
   value：如果不增加value属性，选中该按钮提交时默认为：on，而不是空字符串。5. 隐藏域

5. 下拉列表
   实现多选一 或多选多的效果。国籍：

            China
            America
            France
        当没有指定value属性。如果被选中，则提交中的提示文本，而不是On或空字符串。注：单选按钮、复选框默认选中用：checked属性。  下拉列表使用：selected属性。7. 文本域
    

6. 文件上传  
7. 提交按钮  
8. 普通按钮

9. 重置按钮  

# 07-【掌握】HTML字符实体

n  有些字符，比如说“<”字符，在HTML中有特殊的含义，因此不能在文本中使用。想要在HTML中显示一个小于号“<”，需要用到字符实体：<或者&#60;

n  **实体名是大小写敏感的**。

n  字符实体拥有三个部分：一个and符号（\*\*&**），一个**实体名**或者一个**实体号**，最后是一个分号（**;\*\*）

| **显示结果** | **描述**       | **实体名** | **实体号** |
| ------------ | -------------- | ---------- | ---------- |
|              | 不可拆分的空格 |            | &#160;     |
| **<**        | 小于           | <          | &#60;      |
| **\>**       | 大于           | \>         | &#62;      |
| **&**        | and符号        | &          | &#38;      |
| **"**        | 引号           | "          | &#34;      |
| **￡**       | 英镑           | £s;        | &#163;     |