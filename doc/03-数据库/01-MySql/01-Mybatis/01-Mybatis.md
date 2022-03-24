# 01【熟悉】mybatis概述

## 一，什么是mybatis

            MyBatis是支持普通SQL查询，存储过程和高级映射的优秀持久层框架。MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及结果集的检索。MyBatis使用简单的XML或注解用于配置和原始映射，将接口和Java的POJOs（Plan Old Java Objects，普通的Java对象）映射成数据库中的记录。

            每个MyBatis应用程序主要都是使用SqlSessionFactory实例的，一个SqlSessionFactory实例可以通过SqlSessionFactoryBuilder获得。SqlSessionFactoryBuilder可以从一个xml配置文件或者一个预定义的配置类的实例获得。

        用xml文件构建SqlSessionFactory实例是非常简单的事情。推荐在这个配置中使用类路径资源（classpath resource)，但你可以使用任何Reader实例，包括用文件路径或file://开头的url创建的实例。MyBatis有一个实用类----Resources，它有很多方法，可以方便地从类路径及其它位置加载资源。

---

## 二，orm工具的基本思想

无论是用过的hibernate,mybatis,你都可以法相他们有一个共同点：

1\. 从配置文件(通常是XML配置文件中)得到 sessionfactory.

2\. 由sessionfactory  产生 session

3\. 在session 中完成对数据的增删改查和事务提交等.

4\. 在用完之后关闭session 。

5\. 在Java 对象和 数据库之间有做mapping 的配置文件，也通常是xml 文件。

---

## 三，mybatis和JDBC的比较

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab9a77728-9f96-4533-b33a-6df4b0ece04f.png)

# 02【掌握】mybatis入门配置

## 一，下载相关jar包

[http://download.csdn.net/detail/eson\_15/9542081](http://download.csdn.net/detail/eson_15/9542081)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora89884fe0-2eb4-4f6e-9a80-44217285614b.png)

## 二，引入数据库驱动包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeb921ab4-e40d-42ea-8e29-22ca840a9d6d.png)

## 三，编写mybatis的核心配置文件mybatis.cfg.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!-- 引入头文件 -->
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

    <!-- 配置的顺序：properties、settings、typeAliases、plugins、environments、mappers -->

    <!-- 配置当前数据库环境（信息），default用来指定当前默认的数据库环境 -->
    <environments default="development">
        <!-- environments可以配置多个数据库环境 -->

        <!-- 具体的数据库执行环境 -->
        <environment id="development">
            <!-- 使用jdbc控制操作数据的事务（JDBC特点：自动提交事务） -->
            <transactionManager type="JDBC" />
            <!-- 配置数据库连接池 -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/dbuser"/>
                <property name="username" value="root" />
                <property name="password" value="123456" />
            </dataSource>
        </environment>

    </environments>
    <!-- 加载mybait数据库操作的映射文件 -->
    <mappers>
        <mapper resource="com/sxt/mapper/User.xml"/>
    </mappers>
</configuration>
```

## 四，创建数据库

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora80341951-10df-4a7e-ba58-1cd7004a7d16.png)

## 五，创建实体类User

```java
package com.sxt.pojo;

public class User {

    private int uid;
    private String uname;
    private int uage;
    private String upsw;

    public User() {
        // TODO Auto-generated constructor stub
    }

    @Override
    public String toString() {
        return "User [uid=" + uid + ", uname=" + uname + ", uage=" + uage
                + ", upsw=" + upsw + "]";
    }

    public User(int uid, String uname, int uage, String upsw) {
        super();
        this.uid = uid;
        this.uname = uname;
        this.uage = uage;
        this.upsw = upsw;
    }
    //get seter方法

}
```

## 六，创建UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 配置头文件 -->
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.sxt.mapper.UserMapper">
    <select id="addUser" parameterType="com.sxt.pojo.User">
        insert into user values(null,#{uname},#{uage},#{upsw})
    </select>
</mapper>
```

## 七，创建UserDAO

```java
public interface ProductDao {
    /***
     * 添加用户信息
     * **/
    public void addUser(User user);
}
```

## 八，建立UserDaoImpl实现类

```java
public class UserDAOImpl implements UserDao {

    @Override
    public void addUser(User user) {
        //1 创建SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder ssfb = new SqlSessionFactoryBuilder();
        //2 通过ssfb对象，构造SqlSessionFactory对象
        SqlSessionFactory ssf = ssfb.build(this.getClass().getClassLoader().getResourceAsStream("mybatis.cfg.xml"));
        //3 通过ssf创建SqlSession对象
        SqlSession sqlSession = ssf.openSession();
        //4 数据库crud操作
        /***
         * arg0: namespace.id ,获得mapper.xml中的sql语句
         * arg1:
         * **/
        sqlSession.insert("com.sxt.mapper.UserMapper.addUser", user);
        //5 提交事务
        sqlSession.commit();
    }
}
```

## 九，测试

```java
    @Test
    public void testMybatis(){
        UserDAO dao=new UserDAOImpl();
        User user = new User("张三",22,"123456");
        dao.addUser(user);
    }
```

## 十，Log4j的配置log4j.properties

```Plain Text
# Global logging configuration
log4j.rootLogger=DEBUG, stdout
# MyBatis logging configuration...
log4j.logger.org.mybatis.example.BlogMapper=TRACE
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```

在mybatis.cfg.xml中配置日志的输出方式

```xml
    <settings>
        <setting name="logImpl" value="LOG4J" />
    </settings>
```

注意：需要注意mybatis.cfg.xml的配置顺序：

# 03【掌握】基本的CRUD操作

## 1、搭建mybatis框架

a)导入相关jar包

b)编写核心配置文件（配置数据库连接的相关信息以及配置了mapper映射文件）

c)编写dao操作

d)编写mapper映射文件

e)编写实体类

## 2，核心配置文件Mybatis.cfg.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC" />
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/test" />
                <property name="username" value="root" />
                <property name="password" value="root" />
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="cn/sxt/entity/user.mapper.xml"/>
    </mappers> 
</configuration>
```

## 3，User.mapper.xml文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.sxt.entity.UserMapper">
    <!-- 查询单个用户 -->
    <select id="selectUser" resultType="cn.sxt.entity.User">
        select * from user where id = #{id}
    </select>
    <!-- 查询所有用户 -->
    <select id="selectAll" resultType="cn.sxt.entity.User">
        select * from user
    </select>
    <!-- 添加用户 -->
    <insert id="addUser" parameterType="cn.sxt.entity.User" 
                                         useGeneratedKeys="true">
        insert into user(name,pwd) values(#{name},#{pwd})
    </insert>
    <!-- 更新用户信息 -->
    <update id="updateUser" parameterType="cn.sxt.entity.User">
        update user set name=#{name},pwd=#{pwd} where id=#{id}
    </update>
    <!-- 删除用户 -->
    <delete id="deleteUser">
        delete from user where id=#{id}
    </delete>
</mapper>
```

---

## 4，User.java

```java
public class User {
    private int id;
    private String name;
    private String pwd;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPwd() {
        return pwd;
    }
    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", pwd=" + pwd + "]";
    }
}
```

---

## 5，UserDAO

```java
public class UserDAO {
    public List<User> getAll() throws IOException{
        SqlSession session=MyBatisUtil.getSession();
        List<User> list = session.selectList("cn.sxt.entity.UserMapper.selectAll");
        session.close();
        return list;
    }
    public User getById(int id) throws IOException{
        SqlSession session=MyBatisUtil.getSession();
        User user = session.selectOne("cn.sxt.entity.UserMapper.selectUser", id);
        session.close();
        return user;
    }
    public int add(User user) throws IOException{
        SqlSession session=MyBatisUtil.getSession();
        int result = session.insert("cn.sxt.entity.UserMapper.addUser", user);
        session.commit();
        session.close();
        return result;
    }
    public int update(User user) throws IOException{
        SqlSession session=MyBatisUtil.getSession();
        int result = session.update("cn.sxt.entity.UserMapper.updateUser", user);
        session.commit();
        session.close();
        return result;
    }
    public int delete(int id) throws IOException{
        SqlSession session=MyBatisUtil.getSession();
        int result = session.delete("cn.sxt.entity.UserMapper.deleteUser", id);
        session.commit();
        session.close();
        return result;
    }
}
```

# 04【掌握】核心配置文件详解

## 1，mybatis.cfg.xml

```xml
<configuration>
    <!--environments 指mybatis可以配置多个环境   default指向默认的环境
        每个SqlSessionFactory对应一个环境environment
    -->
    <environments default="development">
        <environment id="development">
            <!-- JDBC – 这个配置直接使用JDBC 的提交和回滚功能。它依赖于从数据源获得连接来管理
                    事务的生命周期。
                ? MANAGED – 这个配置基本上什么都不做。它从不提交或者回滚一个连接的事务。而是让
                    容器（例如：Spring 或者J2EE 应用服务器）来管理事务的生命周期
             -->
            <transactionManager type="JDBC"/>
            <!-- 
                数据源类型：
                    UNPOOLED – 这个类型的数据源实现只是在每次需要的时候简单地打开和关闭连接。
                    POOLED – 这个数据源的实现缓存了JDBC 连接对象，用于避免每次创建新的数据库连接时都初始
                    化和进行认证，加快程序响应。并发WEB 应用通常通过这种做法来获得快速响应。
                    JNDI – 这个数据源的配置是为了准备与像Spring 或应用服务器能够在外部或者内部配置数据
                    源的容器一起使用，然后在JNDI 上下文中引用它
             -->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/test" />
                <property name="username" value="root" />
                <property name="password" value="123456" />
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!-- 定义映射SQL语句文件。 -->
        <mapper resource="cn/sxt/entity/UserMapper.xml"/>
    </mappers> 
</configuration>
```

## 2、优化配置文件

导入properties配置文件

a）在src下加入db.properties配置文件

```xml
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/test
username=root
password=123456
```

b)在mybatis.cfg.xml中添加 properties标签

```xml
<configuration>
    <properties resource="db.properties"/>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${driver}" />
                <property name="url" value="${url}" />
                <property name="username" value="${username}" />
                <property name="password" value="${password}" />
            </dataSource>
        </environment>
    </environments>
```

## 3，别名的优化

```xml
<typeAliases>
    <!-- 为指定类型指名 别名  使得在mapper映射文件中可以简化引用 
    <typeAlias type="cn.sxt.entity.User" alias="User"/>
    -->
    <!-- 为某个包下的所有类指定别名  默认别名是对应的类名 -->
    <package name="cn.sxt.entity"/>
</typeAliases>
```

注意，这个代码只能放到enviroment之前

# 05【掌握】XyzMapper.xml详解

## 一，相关节点和属性说明

Mapper :定义了对应的数据库操作的语句，完成对数据库的不同操作进隔离（区分）

        Namespace属性=“自定义” 

DML操作标签：isnert，update，delete 定义了数据库的具体dml操作。

      id属性=”自定义”，用来namespace.id 获得对应的Statement对象（sql）

      parameterType=“Mapper接口中方法形参的完全限定名”

DQL操作标签：select 定义具体的DQL操作

resultType属性=“Mapper接口中方法的返回值的完全限定名，集合指定集合中元素的类型”

## 二，案例说明

添加：配置字段别名

```xml
方式一：一个一个配置
    <typeAliases>
        <typeAlias type="com.xingen.domain.User" alias="User"/>
    </typeAliases>
方式二：批量整个包配置
    <typeAliases>
        <package type="com.xingen.domain.User"/>
    </typeAliases>

<!--配置完成后下面的查询或其他操作时resultType就可以使用简写。
<select id="selectUser" resultType="User">
    select * from user where id = #{id}
</select>
-->
```

## 三，mybatis占位符的处理  

1，占位符一：#{xxx}

* PreparedStatement预编译sql语句     **推荐**
* xxx表达式的写法
  * 参数类型为javabean类，xxx表达式必须和javabean中属性对应的get方法名字一样
  * 参数类型为简单类型，xxx表达式随表写，保持和参数的名字一致

2，占位符二：\${xxx}

* Statement拼接sql语句        **会出现sql注入的危险，不推荐**
* xxx表达式的写法
  * 参数类型为javabean类，xxx表达式必须和javabean中属性对应的get方法名字一样
  * 参数类型为简单类型，xxx表达式执行能写\${value}

# 06【掌握】模糊查询

## 1，第一方法，。在查询参数有前后加%%\[不推荐\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora25526f50-891b-4516-b692-10c59552869b.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora01f9cdec-9dca-4d5a-a1b4-1b7a8371014b.jpg)

## 2,  使用\$

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora09c25273-679d-4b8b-b9c5-cd999eb99ff0.jpg)

## 3，使用数据库方法 concat 连接字符串的方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8aad88d4-531b-4b04-93e0-7efde3de271c.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora54bfb7d2-2ccd-404c-a54c-5d78429f3aaf.jpg)

## 4，更改别名

Bind

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora27ab3593-7c74-46cb-a6cb-1883082b4e43.jpg)

# 07【掌握】分页的实现

## 1、分析mysql的分页语句:limit startIndex,pageNum

mapper映射文件

DAO中的写法

```Plain Text
//分页查询
public List<User> getAll(int currentPage,int pageSize) throws IOException{
    SqlSession session=MyBatisUtil.getSession();
    Map<String,Integer> map = new HashMap<String,Integer>();
    map.put("startIndex", (currentPage-1)*pageSize);
    map.put("pageSize", pageSize);
    List<User> list = session.selectList("cn.sxt.entity.UserMapper.selectAll",map);
    session.close();
    return list;
}
```

注意：不用为参数设置类，可以采用map结构来解决这个问题。

## 2、通过RowBounds来实现分页

Mapper文件不用做任何改变

```Plain Text
<select id="getAll" resultType="User">
    select * from user
</select>
```

Dao中需要新建RowBounds对象

RowBounds rowBounds=new RowBounds(index,size);index是下标，size数据

```Plain Text
//分页查询
public List<User> getAll(int currentPage,int pageSize) throws IOException{
    SqlSession session=MyBatisUtil.getSession();
    RowBounds rowBounds = new RowBounds((currentPage-1)*pageSize,pageSize);
    List<User> list = session.selectList("cn.sxt.entity.UserMapper.getAll",null,rowBounds);
    session.close();
    return list;
}
```

# 08【掌握】阿里的分页插件

## 一，分页插件的原理

分页查询原理：当使用Mapper接口的代理对象调用方法的时候，该方法会被拦截，拦截后改变sql语句

\---本质为动态代理（aop）

## 二，下载

[http://www.oschina.net/news/80614/pagehelper-5-0-0](http://www.oschina.net/news/80614/pagehelper-5-0-0)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae7f2f9df-6482-4916-a2bc-2f341de53a00.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8ac090d9-4bc8-47f3-bc27-fae68d5eeec8.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4a896601-f269-44f9-a1b9-018614dc7bd3.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5f279cb7-2652-4e2a-a70d-c4ccef439972.png)

## 三，配置使用

 3.1导入jar包  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5f279cb7-2652-4e2a-a70d-c4ccef439972.png)

3.2配置插件

```xml
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageHelper">
            <!-- 分页插件形参的是mysql分页的sql语句 -->
            <property name="dialect" value="mysql"/>
        </plugin>
    </plugins>

```

```xml
<plugins>              
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
            <!-- 4.0.0以后版本可以不设置该参数 -->
            <!--<property name="dialect" value="mysql"/>-->
            <!-- 该参数默认为false -->
            <!-- 设置为true时，会将RowBounds第一个参数offset当成pageNum页码使用 -->
            <!-- 和startPage中的pageNum效果一样-->
            <property name="offsetAsPageNum" value="true"/>
            <!-- 该参数默认为false -->
            <!-- 设置为true时，使用RowBounds分页会进行count查询 -->
            <property name="rowBoundsWithCount" value="true"/>
            <!-- 设置为true时，如果pageSize=0或者RowBounds.limit = 0就会查询出全部的结果 -->
            <!-- （相当于没有执行分页查询，但是返回结果仍然是Page类型）-->
            <property name="pageSizeZero" value="true"/>
            <!-- 3.3.0版本可用 - 分页参数合理化，默认false禁用 -->
            <!-- 启用合理化时，如果pageNum<1会查询第一页，如果pageNum>pages会查询最后一页 -->
            <!-- 禁用合理化时，如果pageNum<1或pageNum>pages会返回空数据 -->
            <property name="reasonable" value="true"/>
            <!-- 3.5.0版本可用 - 为了支持startPage(Object params)方法 -->
            <!-- 增加了一个`params`参数来配置参数映射，用于从Map或ServletRequest中取值 -->
            <!-- 可以配置pageNum,pageSize,count,pageSizeZero,reasonable,orderBy,不配置映射的用默认值 -->
            <!-- 不理解该含义的前提下，不要随便复制该配置 -->
            <!--<property name="params" value="pageNum=start;pageSize=limit;"/>-->
            <!-- 支持通过Mapper接口参数来传递分页参数 -->
            <!--<property name="supportMethodsArguments" value="true"/>-->
            <!-- always总是返回PageInfo类型,check检查返回类型是否为PageInfo,none返回Page -->
            <!--<property name="returnPageInfo" value="check"/>-->
        </plugin>
    </plugins>
```

注意以上各个版本的说明

3.3测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3e6584ee-a567-4dbc-9c9e-08872759ffd4.png)

# 09【掌握】属性名和字段名不一致

1、数据库中表的设计  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1eaf0223-461e-4d3a-8759-bf7d4ba0336c.jpg)

2、实体类  

```java
public class User {
    private int id;
    private String name;
    private String password;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "User [id=" + id + ", name=" + name + ", password=" 
             + password+ "]";
    }
}
```

3、mapper映射文件

```xml
    <select id="selectUser" resultType="User">
        select * from user where id = #{id}
    </select>
```

4、问题：密码没有获取到

原因：mybatis会根据查询的列名（会将列名转为小写） 去进行设值(列名setter方法)

5、解决列名和属性名不一致的办法

a)为列名指定别名 别名和java实体类的属性名一致

```xml
    <select id="selectUser" resultType="User">
        select id,Name,pwd password from user where id = #{id}
    </select>
```

b)设置结果映射类型

```xml
        <select id="selectUser" resultMap="UserMap">
            select id,name,pwd from user where id = #{id}
        </select>
        <resultMap type="User" id="UserMap">
            <!-- id为主键 -->
            <id column="id" property="id"/>
            <!-- column是数据库中表的列名  property是对应实体类的属性名 -->
            <result column="name" property="name"/>
            <result column="pwd" property="password"/>
        </resultMap>
```

# 10【掌握】SQL片段

**目地：提高sql的复用性**

```Plain Text
	<!-- 定义sql片段 -->
	 <sql id="selectUser">
	 	select * from User 
	 </sql>
	<!-- 查询某个商品的详细信息 -->
	<select id="loadUserById" parameterType="java.lang.Integer" 
		resultType="com.bjsxt.pojo.User">
		<!-- select * from user where uid=${value}
		 -->
		 <!-- 引用sql片段 -->
		 <include refid="selectUser"></include>
		where pid=${value} 	
 	</select>
```

# 11【掌握】动态sql

## 一，概述

        MyBatis 的强大特性之一便是它的动态 SQL。如果你有使用 JDBC 或其他类似框架的经验，你就能体会到根据不同条件拼接 SQL 语句有多么痛苦。拼接的时候要确保不能忘了必要的空格，还要注意省掉列名列表最后的逗号。利用动态 SQL 这一特性可以彻底摆脱这种痛苦。

        通常使用动态 SQL 不可能是独立的一部分,MyBatis 当然使用一种强大的动态 SQL 语言来改进这种情形,这种语言可以被用在任意的 SQL 映射语句中。

        动态 SQL 元素和使用 JSTL 或其他类似基于 XML 的文本处理器相似。在 MyBatis 之前的版本中,有很多的元素需要来了解。MyBatis 3 大大提升了它们,现在用不到原先一半的元素就可以了。MyBatis 采用功能强大的基于 OGNL 的表达式来消除其他元素。

* **if**
* **choose (when, otherwise)**
* **where, set**
* **foreach**

---

## 二，if

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8c4a8d0d-7c7f-45b2-a0f0-41dadcc8924a.png)

## 三，choose

有些时候，我们不想用到所有的条件语句，而只想从中择其一二。针对这种情况，MyBatis 提供了 choose 元素，它有点像 Java 中的 switch 语句。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora65fcb85e-4a68-4b5d-bd4f-6498ec27e94c.png)

以上的是如果用户提供了ename就按Ename查，提交sex就按sex查，否则就走otherwise【不是不和jstl很像呀】

## 四，where  set

where就相就是sql后台拼接一个where关键字

        **如果where后面紧接着有and或者or等连接符会自动去掉第一个。**  

set多用于更新中

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraea4827c2-6ee3-4569-b993-d3433abea66e.png)

## 五，foreach

foreach 元素的功能是非常强大的，它允许你指定一个集合，声明可以用在元素体内的集合项和索引变量。它也允许你指定开闭匹配的字符串以及在迭代中间放置分隔符。这个元素是很智能的，因此它不会偶然地附加多余的分隔符。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracd8c9aed-0c4e-4d5d-bda1-78ec97d8a09e.png)

# 12【掌握】关联表的处理

## 一，准备工作

1，数据库表的设计

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7eed1de0-97d2-424c-918f-4053a397047c.png)

 2，创造数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae6216a44-e923-46d7-807c-eb751bf4bdc9.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8b8a8940-3e78-40aa-969f-688c2c19d0ae.png)

 3，实体类的创建Dept.java

```java
package com.sxt.pojo;
public class Dept {
    private int did;
    private String dname;
    private String dremark;

    public Dept() {
    }
    public Dept(int did, String dname, String dremark) {
        super();
        this.did = did;
        this.dname = dname;
        this.dremark = dremark;
    }
    //get set方法省略
}
```

4，Emp.java的创建

```java
public class Emp {
    private Integer eid;
    private String ename;
    private Integer esex;
    private Integer eage;
    private Timestamp ehiredate;
    private Double esal;
    //一个部门下面可以有多少员工
    private Dept dept;
    public Emp() {
    }
    public Emp(Integer eid, String ename, Integer esex, Integer eage,
            Timestamp ehiredate, Double esal, Dept dept) {
        super();
        this.eid = eid;
        this.ename = ename;
        this.esex = esex;
        this.eage = eage;
        this.ehiredate = ehiredate;
        this.esal = esal;
        this.dept = dept;
    }
```

## 二，处理多对一的关系

部门和员工的关系是一对多

员工和部门的关系是多对一

1，员工类的修改

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora51d021e0-5d1b-40cf-a62d-4657cba98101.png)

2，实现方法一：使用resultType处理【不推荐】

    解决办法就是把两个实体里面的字段组合起来  

    2.1创建EmpVo把dept的字段加入  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab3f8cb2a-cd21-4ea5-99fe-94215c324a2e.png)

    2.2EmpMapper.xml的配置

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="empMapper">
    <!-- 查询所有员工 -->
    <select id="selectEmp" resultType="com.sxt.vo.EmpVo">
        select * from emp join dept using(did)
    </select>
</mapper>
```

---

3，实现方法二：使用resultMap的结果嵌套处理

    3.1EmpMapper.xml的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1653d1b9-bbb3-48b9-a491-06b6f9485711.png)

---

4，实现方法三：使用resultMap的查询嵌套处理

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora96fd6319-8c7a-4501-842a-fe6f5c82b532.png)

---

## 三，处理一对多的关系

部门和员工是一对多的关系

1，使用resultType来实现【同上面的多对一】

2，使用resultMap来实现

    2.1修改Dept.java  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8faefbed-0e35-424f-9393-fc72bacc12fb.png)

    2.2修改DeptMapper.xml  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabae83e6b-c3a6-4a58-bb8a-192354e8a4d6.png)

# 13【掌握】使用注解实现mybatis

## 一、面向接口编程

好处：扩展性好，分层开发中，上层不用管具体的实现，大家都遵循共同的标准，使得开发变得容易。规范性更好

---

## 二、注解的实现

1，编写DAO接口

```java
public interface UserDao {
    @Select("select * from user")
    public List<User> getList();
    @Insert("insert into user(name,pwd) values(#{name},#{pwd})")
    public int insert(User user);
}
```

2，在核心配置文件中 导入

```xml
<mappers>
    <mapper class="cn.sxt.dao.UserDao"/>
</mappers> 
```

3，使用

```java
public static void main(String[] args) throws IOException {
    SqlSession session = MyBatisUtil.getSession();
    UserDao userDao = session.getMapper(UserDao.class);
    List<User> list = userDao.getList();
    for(User u:list){
        System.out.println(u);
    }
}
```

---

## 三，注解方式实现ResultMap

1，方法一

①，创建UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 代表一个映射 -->
<mapper namespace="com.sxt.dao">
    <!-- 创建自定义结果集 -->
    <resultMap type="User" id="myUser">
        <result property="id" column="uid" javaType="Integer" />
        <result property="name" column="uname" />
        <result property="address" column="uaddress"/>
        <result property="sex" column="usex"/>
    </resultMap>
</mapper>
```

②，在mybatis.cfg.xml里面配置UserMapper.xml

③，修改UserDAO

```java
/**
     * 全查询
     */
    @Select("select id as uid,name as uname ,address as uaddress,sex as usex from user ")
    @ResultMap("com.sxt.dao.myUser")
    public List<User> queryAll();
```

④，测试

```java
        SqlSession session=MyBatisUtils.getSession();
        UserDAO userDAO = session.getMapper(UserDAO.class);
        List<User> list = userDAO.queryAll();
        for (User user : list) {
            System.out.println(user);
        }
        session.commit();
        session.close();
```

---

2，方法二【推荐】

①，修改UserDAO

```java
/**
     * 全查询
     */
    @Select("select id as uid,name as uname ,address as uaddress,sex as usex from user ")
    @Results({
        @Result(column="uid",property="id"),
        @Result(column="uname",property="name"),
        @Result(column="uaddress",property="address"),
        @Result(column="usex",property="sex")
        })
    public List<User> queryAll();
```

②，测试

```java
        SqlSession session=MyBatisUtils.getSession();
        UserDAO userDAO = session.getMapper(UserDAO.class);
        List<User> list = userDAO.queryAll();
        for (User user : list) {
            System.out.println(user);
        }
        session.commit();
        session.close();
```

---

## 四，注解方式实现一对多多对一【了解】

1，创建Dept  

```java
public class Dept {
    private Integer deptno;
    private String dname;
    private String loc;

    private Set<Emp> emps=new HashSet<>();

}
```

2，创建Emp  

```java
public class Emp {
    private Integer empno;
    private String ename;
    private String job;
    private Integer mgr;
    private Timestamp hiredate;
    private Double sal;
    private Double comm;

    // 建立员工和部门的多多对一的关系
    private Dept dept;
}
```

3，创建DeptDAO

```java

public interface DeptDAO {

    @Select("select * from dept")
    @Results({@Result(column="deptno",property="deptno"),
            @Result(column="dname",property="dname"),
            @Result(column="loc",property="loc"),
            @Result(column="deptno",property="emps",javaType=Set.class,
            many=@Many(select="com.sxt.dao.EmpDAO.queryEmpByEmpno"))})
    public List<Dept> queryAllDept();

    @Select("select * from dept where deptno=#{value}")
    public Dept queryDeptByDeptNo(Integer deptno);
}


```

4，创建EmpDAO

```java
@Select("select * from emp ")
    @Results({
        @Result(column="empno",property="empno"),
        @Result(column="ename",property="ename"),
        @Result(column="job",property="job"),
        @Result(column="mgr",property="mgr"),
        @Result(column="hiredate",property="hiredate",javaType=Timestamp.class),
        @Result(column="sal",property="sal",javaType=Double.class),
        @Result(column="comm",property="comm",javaType=Double.class),
        @Result(column="deptno",property="dept",javaType=Dept.class,
        one=@One(select="com.sxt.dao.DeptDAO.queryDeptByDeptNo"))
        })
    public List<Emp> queryAll();

    @Select("select * from emp  where deptno=#{value}")
    @Results({
        @Result(column="empno",property="empno"),
        @Result(column="ename",property="ename"),
        @Result(column="job",property="job"),
        @Result(column="mgr",property="mgr"),
        @Result(column="hiredate",property="hiredate",javaType=Timestamp.class),
        @Result(column="sal",property="sal",javaType=Double.class),
        @Result(column="comm",property="comm",javaType=Double.class),
        @Result(column="deptno",property="dept",javaType=Dept.class,
        one=@One(select="com.sxt.dao.DeptDAO.queryDeptByDeptNo"))
        })
    public List<Emp> queryEmpByEmpno(Integer empno);
```

5，在mybtais.cfg.xml里面配置DAO

6，测试

```java
public static void main(String[] args) {
        SqlSession session=MyBatisUtils.getSession();
        /*EmpDAO empDAO=session.getMapper(EmpDAO.class);

        List<Emp> all = empDAO.queryAll();
        for (Emp emp : all) {
            System.out.println(emp);
        }*/

        DeptDAO deptDAO=session.getMapper(DeptDAO.class);
        List<Dept> allDept = deptDAO.queryAllDept();
        for (Dept dept : allDept) {
            System.out.println(dept);
        }

    }
```

# 14【掌握】缓存

## 一，一级缓存

在SqlSession范围内。当查询相同对象时，会使用缓存中的数据，而不会再次查询。  

1、Mybatis默认开启了一级缓存 

2、代码

```java
public static void main(String[] args) throws IOException {
    SqlSession session=MyBatisUtil.getSession();
    User user = session.selectOne("cn.sxt.entity.UserMapper.selectUser", 1);
    User user1 = session.selectOne("cn.sxt.entity.UserMapper.selectUser", 1);
    System.out.println(user==user1);
    session.close();
}
```

3、结果为true

---

## 二、二级缓存

（SqlSessionFactory范围内）

1、开启二级缓存

在核心配置文件中

修改mybatis.cfg.xml

```java
<settings>
    <setting name="cacheEnabled" value="true"/>   
</settings>  
```

Mapper配置中加：

```xml
<cache/>
<mapper namespace="cn.sxt.entity.UserMapper">
    <cache/>
    <select id="selectUser" resultType="cn.sxt.entity.User">
        select * from user where id = #{id}
    </select>
</mapper>
```

**实体类要序列化**

# 15【熟悉】mybatis和Hibernate的比较

1、Mybatis 半自动化模式操作数据，hibenate完全面向对象操作数据；

2、Mybatis运行的性能高于hibernate的性能；

3、Mybatis开发速度低于hibernate的开发速度；

4、Mybatis应用在互联网项目的开发，Hibernate用在传统的MIS系统开发。



本质区别：

1、mybatis时映射的查询的结果集；

2、hibernate映射的是表结构。





Hibernate里面的一级缓存时默认开启的，缓存到session

                耳机环迅需要手动开启   sessionFactory

# 16【掌握】mybatis逆向工程

## 一，什么是逆向工程

MyBatis的一个主要的特点就是需要程序员自己编写sql，那么如果表太多的话，难免会很麻烦，所以mybatis官方提供了一个逆向工程，可以针对单表自动生成mybatis执行所需要的代码（包括mapper.xml、mapper.java、po..）。一般在开发中，常用的逆向工程方式是通过数据库的表生成代码。

---

## 二，使用逆向工程

使用MyBatis的逆向工程，需要导入逆向工程的jar包，我用的是mybatis-generator-core-1.3.2.jar，下面开始总结一下MyBatis逆向工程的使用步骤。

---

## 三，创建项目

1，下载工程jar包

[http://download.csdn.net/download/monkey\_wen/10020047](http://download.csdn.net/download/monkey_wen/10020047)

我们要新建一个java工程，这个工程专门用来使用逆向工程生成代码的。有些人可能会问，为什么要新建一个工程呢？直接在原来工程中你想生成不就可以了么？确实是这样，可以在原来的工程中生成，但是有风险，因为MyBatis是根据配置文件来生成的（下面会说到），如果生成的路径中有相同的文件，那么就会覆盖原来的文件，这样会有风险。所以开发中一般都会新建一个java工程来生成，然后将生成的文件拷贝到自己的工程中，这也不麻烦，而且很安全。如下  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac55db48a-db90-47a8-a524-b9b7a64575e1.png)

---

## 四，配置逆向工程的配置文件

MyBatis逆向工程生成代码需要一个配置文件，名字随便起。然后MyBatis会根据这 个配置文件中的配置，生成相应的代码。mybatis-generator-core-1.3.2.jar这个jar包里面有帮助文档，打开后里面有配置文件的模板，这里就不再赘述了，下面先把配置文件写好：

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE generatorConfiguration  
  PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"  
  "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- 数据库驱动 -->
    <classPathEntry location="lib/mysql-connector-java-5.1.20-bin.jar" />
    <context id="testTables" targetRuntime="MyBatis3">
        <commentGenerator>
            <property name="suppressDate" value="true" />
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="true" />
        </commentGenerator>
        <!--数据库链接URL，用户名、密码 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
            connectionURL="jdbc:mysql://localhost/ine" userId="root" password="123456">
        </jdbcConnection>

        <!-- 默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer，为 true时把JDBC DECIMAL 和 
            NUMERIC 类型解析为java.math.BigDecimal 主要是针对oracle数据库-->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>
        <!-- 生成模型的包名和位置 -->
        <javaModelGenerator targetPackage="com.sxt.domain"
            targetProject="src">
            <property name="enableSubPackages" value="true" />
             <!-- 从数据库返回的值被清理前后的空格 -->
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- 生成映射文件的包名和位置 -->
        <sqlMapGenerator targetPackage="com.sxt.mapping"
            targetProject="src">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- 生成DAO的包名和位置 -->
        <javaClientGenerator type="XMLMAPPER"
            targetPackage="com.sxt.dao" targetProject="src">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 要生成的表 tableName是数据库中的表名或视图名 domainObjectName是实体类名 -->
        <table tableName="dept" domainObjectName="Dept"
            enableCountByExample="false" enableUpdateByExample="false"
            enableDeleteByExample="false" enableSelectByExample="false"
            selectByExampleQueryId="false"></table>
        <table tableName="emp" domainObjectName="Emp"
            enableCountByExample="false" enableUpdateByExample="false"
            enableDeleteByExample="false" enableSelectByExample="false"
            selectByExampleQueryId="false"></table>
    </context>
</generatorConfiguration>  
```

从上面的配置文件中可以看出，配置文件主要做的几件事是：

    1，连接数据库，这是必须的，要不然怎么根据数据库的表生成代码呢？

    2，指定要生成代码的位置，要生成的代码包括po类，mapper.xml和mapper.java

    3，指定数据库中想要生成哪些表

---

## 五，执行逆向工程生成代码

配置文件搞好了，然后就执行以下程序即可生成代码了，生成的java程序，下载的逆向工程文档中都有示例，如下：

```java
public class GeneratorSqlmap {
    public void generator() throws Exception{
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        //指定 逆向工程配置文件
        File configFile = new File("generatorConfig.xml"); 
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config,
                callback, warnings);
        myBatisGenerator.generate(null);
    } 
    public static void main(String[] args) throws Exception {
        try {
            GeneratorSqlmap generatorSqlmap = new GeneratorSqlmap();
            generatorSqlmap.generator();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

运行一下即可，运行完了后刷新一下工程，就可以看到最新生成的代码了。

这里写图片描述

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8d2c62f7-b3bd-408e-93c7-1c74c835c3eb.png)

这里可以看出有个细节，每个po类多了一个东西，就是xxxExample.java，这个类是给用户自定义sql使用的，后面我会提到。到这里就生成好了，下面我们就把生成的代码拷贝到自己的工程使用了。