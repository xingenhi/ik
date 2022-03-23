# 01Mongodb简介

# Mongodb

点赞、评论这两块可能操作起来比较频繁，并且，这两块的内容不怎么重要，因此可以用MongoDB

## 什么是MongoDB

MongoDB 是一个跨平台的，面向文档的数据库（solr、Elasticsearch），是当前 NoSQL 数据库产品中最热门的一种。它介于关系数据库和非关系数据库之间，是非关系数据库当中功能最丰富，最像关系数据库的产品。它支持的数据结构非常松散，是类似JSON 的 BSON 格式，因此可以存储比较复杂的数据类型。比如表中表

## MongoDB特点

MongoDB 最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库**单表查询的绝大部分功能**，而且还支持对数据建立索引。它是一个面向集合的,模式自由的文档型数据库。具体特点总结如下：

（1）面向集合存储，易于存储对象类型的数据

（2）模式自由

（3）支持动态查询

（4）支持完全索引，包含内部对象

（5）支持复制和故障恢复

（6）使用高效的二进制数据存储，包括大型对象（如视频等）

（7）自动处理碎片，以支持云计算层次的扩展性

（8）支持Python，PHP，Ruby，Java，C，C#，Javascript，Perl 及 C++语言的驱动程序，社区中也提供了对Erlang 及.NET 等平台的驱动程序

（9）文件存储格式为 BSON（一种 JSON 的扩展）

## MongoDB体系结构

MongoDB 的逻辑结构是一种层次结构。主要由：文档(document)、集合(collection)、数据库(database)这三部分组成的。逻辑结构是面向用户的，用户使用MongoDB 开发应用程序使用的就是逻辑结构。

（1）MongoDB 的文档（document），相当于关系数据库中的一行记录。

（2）多个文档组成一个集合（collection），相当于关系数据库的表。

（3）多个集合（collection），逻辑上组织在一起，就是数据库（database）。

（4）一个MongoDB 实例支持多个数据库（database）

## 数据类型

基本数据类型

null：用于表示空值或者不存在的字段，{“x”:null}

布尔型：布尔类型有两个值true和false，{“x”:true}

数值：mongo默认使用64为浮点型数值。{“x”：3.14}或{“x”：3}。对于整型值，可以使用NumberInt（4字节符号整数）或NumberLong（8字节符号整数），

{“x”:NumberInt(“3”)}{“x”:NumberLong(“3”)}

字符串：UTF-8字符串都可以表示为字符串类型的数据，{“x”：“呵呵”}

日期：日期被存储为自新纪元依赖经过的毫秒数，不存储时区，{“x”:new Date()}

正则表达式：查询时，使用正则表达式作为限定条件，语法与JavaScript的正则表达式相同，{“x”:/\[abc\]/}

数组：数据列表或数据集可以表示为数组，{“x”： \[“a“，“b”,”c”\]}

内嵌文档：文档可以嵌套其他文档，被嵌套的文档作为值来处理，{“x”:{“y”:3 }} ，表中表

对象Id：对象id是一个12字节的字符串，是文档的唯一标识，{“\_id”: objectId() }

二进制数据：二进制数据是一个任意字节的字符串。它不能直接在shell中使用。如果要将非utf-字符保存到数据库中，二进制数据是唯一的方式。

代码：查询和文档中可以包括任何JavaScript代码，{“x”:function(){/…/}}

# 02常用命令

# 常用命令

## 选择和创建数据库

选择和创建数据库的语法格式：

use 数据库名称

如果数据库不存在则自动创建

## 插入与查询文档

插入文档的语法格式：

db.集合名称.insert({BSON格式的数据})

查询集合的语法格式：

db.集合名称.find()

查询用户id是233的数据

db.集合名称.find({userId: ‘233’})

只查询一条

db.集合名称.findOne({userId: ‘233’})

返回指定条数的记录

db.集合名称.find().limit(3)

## 修改与删除文档

修改文档的语法结构：

Db.集合名称.update(条件,修改后的数据)

如果我们想修改\_id为1的记录，名称为张三，输入以下语句：

Db.集合名称.update({\_Id:ObjectId(1)}, {name:’张三’})

执行后，我们会发现，这条文档除了name字段其它字段都不见了，为了解决这个问题，

我们需要使用修改器\$set来实现，命令如下：

Db.集合名称.update({\_Id:1}, {\$set:{name:’张三’}})

删除文档的语法结构：

Db.集合名称.remove(条件)

以下语句可以将数据全部删除，请慎用

Db.集合名称.remove({})

## 统计条数

统计记录条件使用count()方法

Db.集合名称.count()

Db.集合名称.count(条件) 

## 模糊查询

MongoDB的模糊查询是通过正则表达式的方式实现的。格式为：

/字符串/

比如标题中包含java的帖子

Db.集合名称.find(title:/java/)

比如查询以“张”开头的名字

Db.集合名称.find(name: /^张/)

## 大于 小于 不等于 包含 不包含

大于：\$gt，小于\$lt，大于等于\$gte，小于等于\$lte，不等于\$ne，包含\$in，不包含\$nin

查询阅读数大于10的帖子

Db.集合名称.find({readNum:{\$gt:10}})

查询评论集合中userid字段不包含1013和1014的文档

Db.集合名称.find({userId: {\$nin:\[‘1013’, ‘1014’\]}})

## 条件连接

我们如果需要查询同时满足两个以上条件，需要使用\$and操作符将条件进行关联。（相

当于SQL的and）

格式为：

\$and:\[ { },{ },{ } \]

示例：查询帖子集合中readNum大于等于1000 并且小于2000的文档

Db.集合名称.find( {\$and: \[ {readNum:{\$gte:1000}}, {readNum:{\$lte: 2000}} \]} )

如果两个以上条件之间是或者的关系，我们使用\$or 用法和and相同

\$or:\[ { },{ },{ } \]  

列值增长

如果我们想实现对某列值在原有值的基础上进行增加或减少，可以使用\$inc运算符来实现

Db.集合名称.update({\_id:1}, {\$inc:{readNum:NumberInt(2)}})

# 03Java操作MongoDB

# Java操作MongoDB

SpringDataMongoDB：SpringData家族成员之一，使用jpa语法，非常方便的就可以操作MongoDB。

环境搭建：

引入包

| org.springframework.boot<br>spring-boot‐starter‐data‐mongodb |
| ------------------------------------------------------------ |

配置文件：

| Spring:<br>Data:<br>Mongodb:<br>  Host:<br>  Database: |
| ------------------------------------------------------ |

创建实体类，建议加上\_id字段，并且加上@Id注解。

创建Dao

| Public interface XxxDao extends MongoRepository<实体, 主键类型> |
| ------------------------------------------------------------ |

JPA语法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6194545816232591.png)

# 04SpringDataMongoDB提高

# SpringDataMongoDB提高

SpringDataMongoDB在使用Jpa规范的时候，虽然已经很强大，但是依然有不能做的事情

```Plain Text
@Data
  public class Comment implements Serializable {
      /***     ** 评论__id*     */*    @Id
    private String id;
    /***     ** 评价帖子     */    private Blog blog;
```

比如上面这个类，现在我需要通过blog的blogTitle进行模糊查询，怎么操作？

这种场景下，使用jpa规范就显得力不从心。

这里需要使用@Query

@Query注解中，value属性可以让我们像直接写mongo语句那样操作mongodb，fields属性，可以指定要查询的列，格式{列名:1,列名:1}

?数字占位符的作用：使用?0就代表取出参数中第0个位置的参数，同理，使用?1代表取出第1个位置的参数

注意：如果需要模糊查询，不能使用mongodb中的/xxx/形式的正则表达式，语法如下

{列名: {\$regex: 字符串}}

如果需要取出参数中指定字段中的某个字段，需要使用SpEl表达式

格式：#{}，在这里，如果需要根据下标位置取参数，需要用中括号括起来，如下

?#{\[0\]}。在这里，取出来的参数如果是对象的话，可以直接用 . 再继续取出它里面的属性。、

如：?#{\[0\].blog.blogTitle}

通过@Query注解加上SpEL表达式，可以让我们更灵活的操作 MongoDB