# 01【熟悉】简介

**一，说明**

Mybatis-Plus（简称MP）是一个 Mybatis 的增强工具，在 Mybatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

官方文档说的愿景是成为 Mybatis 最好的搭档，就像 魂斗罗 中的1P、2P，基友搭配，效率翻倍。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.013184607502119805.png)

**二，特性**

1. 无侵入：Mybatis-Plus 在 Mybatis 的基础上进行扩展，只做增强不做改变，引入 Mybatis-Plus 不会对您现有的 Mybatis 构架产生任何影响，而且 MP 支持所有   
2. Mybatis 原生的特性  
3. 依赖少：仅仅依赖 Mybatis 以及 Mybatis-Spring  
4. 损耗小：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作  
5. 预防Sql注入：内置 Sql 注入剥离器，有效预防Sql注入攻击  
6. 通用CRUD操作：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求  
7. 多种主键策略：支持多达4种主键策略（内含分布式唯一ID生成器），可自由配置，完美解决主键问题  
8. 支持热加载：Mapper 对应的 XML 支持热加载，对于简单的 CRUD 操作，甚至可以无 XML 启动  
9. 支持ActiveRecord：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可实现基本 CRUD 操作  
10. 支持代码生成：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用（P.S. 比 Mybatis 官方的 Generator 更加强大！）  
11. 支持自定义全局通用操作：支持全局通用方法注入（ Write once, use anywhere ）  
12. 支持关键词自动转义：支持数据库关键词（order、key......）自动转义，还可自定义关键词  
13. 内置分页插件：基于 Mybatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通List查询  
14. 内置性能分析插件：可输出 Sql 语句以及其执行时间，建议开发测试时启用该功能，能有效解决慢查询  
15. 内置全局拦截插件：提供全表 delete 、 update 操作智能分析阻断，预防误操作  

---

**三，架构原理**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8740792607245704.png)

# 02【掌握】MP和spring的集成配置

**1，创建项目和包**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafeec6861-c453-4e2b-8790-eec8c8c131f7.png)

**2，配置依赖**

```Plain Text
	<!-- 配置版本属性 -->
	<properties>
		<mybatisplus.version>2.3</mybatisplus.version>
		<spring.version>4.3.17.RELEASE</spring.version>
		<mysql.version>5.1.39</mysql.version>
		<!-- 注意只能使用2.0以下的版本 -->
		<log4j.version>1.2.17</log4j.version>
	</properties>

	<dependencies>
		<!-- mybatis-plus -->
		<dependency>
			<groupId>com.baomidou</groupId>
			<artifactId>mybatis-plus</artifactId>
			<version>${mybatisplus.version}</version>
		</dependency>
		<!-- 导入spring -->
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aspects</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aop</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-expression</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<!-- mysql数据库驱动 -->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>${mysql.version}</version>
		</dependency>
		<!-- log4j -->
		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>${log4j.version}</version>
		</dependency>
	</dependencies>
```

**3，配置db.properties**  

```xml
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/dbuser
username=root
password=123456
```

4，配置log4j.properties

```xml
# Global logging configuration
log4j.rootLogger=DEBUG, stdout
# MyBatis logging configuration...
log4j.logger.org.mybatis.example.BlogMapper=TRACE
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```

**5，配置application-dao.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">


    <!-- 解析db.properties 因为 db.properties里面有username=root 如果在下面的数据源中使用${username}它取到的是当前系统的登陆名 
        如果要使用db.properties里面的username必须加system-properties-mode="FALLBACK"这个属性 -->
    <context:property-placeholder
        location="classpath:db.properties" system-properties-mode="FALLBACK" />

    <!-- 配置数据源 -->
    <bean id="dataSource"
        class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="${driver}" />
        <property name="url" value="${url}" />
        <property name="username" value="${username}" />
        <property name="password" value="${password}" />
    </bean>

    <!-- 配置sqlSessinoFactory -->
    <bean id="sqlSessionFactory"
        class="com.baomidou.mybatisplus.spring.MybatisSqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource" />
        <!-- 配置实体扫描路径，多个package可以用分号; 逗号, 分隔， 支持通配符* -->
        <!-- com.a.b.entity;com.a.c.entity;com.d.*.entity -->
        <property name="typeAliasesPackage" value="com.sxt.domain" />
        <property name="configuration" ref="mybatisConfig" />
        <!-- 自定义mapper映射的位置 -->
        <property name="mapperLocations" value="classpath:com/sxt/mapping/*.xml"/>
        <!-- MP 全局配置注入 -->
        <property name="globalConfig" ref="globalConfig" />
        <property name="plugins">
            <array>
                <!-- 分页插件配置 -->
                <bean id="paginationInterceptor"
                    class="com.baomidou.mybatisplus.plugins.PaginationInterceptor" />
                <!-- 乐观锁插件 -->
                <bean id="optimisticLockerInterceptor"
                    class="com.baomidou.mybatisplus.plugins.OptimisticLockerInterceptor">
                </bean>
                <!-- 性能拦截器，兼打印sql，不建议生产环境配置 -->
                <bean id="performanceInterceptor"
                    class="com.baomidou.mybatisplus.plugins.PerformanceInterceptor" />
            </array>
        </property>
    </bean>

    <bean id="mybatisConfig"
        class="com.baomidou.mybatisplus.MybatisConfiguration">
        <property name="mapUnderscoreToCamelCase" value="true" />
    </bean>

    <!-- 定义 MP 全局策略 -->
    <bean id="globalConfig"
        class="com.baomidou.mybatisplus.entity.GlobalConfiguration">
        <!-- 逻辑删除 定义下面3个参数 -->
        <!-- <property name="sqlInjector" ref="logicSqlInjector" /> -->
        <property name="logicDeleteValue" value="-1" />
        <property name="logicNotDeleteValue" value="1" />
        <!-- 全局ID类型： 0, "数据库ID自增"， 1, "用户输入ID", 2, "全局唯一ID", 3, "全局唯一ID" -->
        <property name="idType" value="0" />
        <!-- 2.1-gamma+ 数据库自动识别，无需配置数据库类型 <property name="dbType" value="mysql" 
            /> -->
        <!-- 2.3+ 全局表前缀 mp_ <property name="tablePrefix" value="mp_" /> -->
        <!--主键Sequence -->
        <!-- <property name="keyGenerator" ref="keyGenerator" /> -->
        <!-- 公共字段填充处理器 -->
        <!-- <property name="metaObjectHandler" ref="myMetaObjectHandler" /> -->
        <!--数据库关键字转义符，'desc', "desc" 2.1-gamma+不需要制定 -->
        <!--<property name="identifierQuote" value="'" /> -->
    </bean>

    <!-- 配置oracle主键Sequence， 其他类型数据库，请配置相应的类型 -->
    <!-- <bean id="keyGenerator" class="com.baomidou.mybatisplus.incrementer.OracleKeyGenerator" 
        /> -->

    <!-- 自定义处理器 -->
    <!-- <bean id="myMetaObjectHandler" class="com.baomidou.test.MyMetaObjectHandler" 
        /> -->
    <!-- 逻辑删除Sql注入器 -->
    <!-- <bean id="logicSqlInjector" class="com.baomidou.mybatisplus.mapper.LogicSqlInjector" 
        /> -->

    <!-- 配置mybatis 扫描mapper接口的路径, 相当于注解@MapperScan，@MapperScan("com.baomidou.mybatisplus.test.h2.entity.mapper") -->
    <bean id="mapperScannerConfigurer"
        class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.sxt.mapper" />
        <property name="sqlSessionFactoryBeanName"
            value="sqlSessionFactory"></property>
    </bean>

</beans>
```

**6，配置application-service.xml\[事务配置\]**  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd">


    <!-- 扫描service -->
    <context:component-scan
        base-package="com.sxt.service.impl"></context:component-scan>

    <!-- 1,配置事务 -->
    <bean id="transactionManager"
        class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"></property>
    </bean>

    <!-- 2 声明事务切面 -->
    <tx:advice id="txAdvice"
        transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="add*" propagation="REQUIRED" />
            <tx:method name="insert*" propagation="REQUIRED" />
            <tx:method name="save*" propagation="REQUIRED" />
            <tx:method name="delete*" propagation="REQUIRED" />
            <tx:method name="update*" propagation="REQUIRED" />
            <tx:method name="reset*" propagation="REQUIRED" />
            <tx:method name="start*" propagation="REQUIRED" />
            <tx:method name="load*" propagation="REQUIRED"
                read-only="true" />
            <tx:method name="get*" propagation="REQUIRED"
                read-only="true" />
            <tx:method name="*" propagation="REQUIRED" read-only="true" />
        </tx:attributes>
    </tx:advice>

    <!-- 进行aop的配置 -->
    <aop:config>
        <!-- 声明切入点 -->
        <aop:pointcut
            expression="execution(* com.sxt.service.impl.*.*(..))" id="pc1" />
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pc1" />
    </aop:config>

</beans>
```

**7，配置applicationContext**.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">
    <!-- 引入application-dao.xml application-service.xml -->
    <import resource="classpath:application-dao.xml"/>
    <import resource="classpath:application-service.xml"/>

</beans>
```

# 03【掌握】MP和spring完成基本的CRUD

**1，前言**

    接上一个知识点的配置，来完成用户表的增删改查  

**2，创建数据表**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora71ec7f7a-173a-48c3-91ca-bdb20bcc5d02.png)

**3，创建User**

```java
@TableName("sys_user")
public class User {
    private Integer id;
    private String name;
    private String address;
    public User() {
    }
    get/set方法
}
```

**4，创建UserMapper**

```java
public interface UserMapper extends BaseMapper<User>{
}
```

**5，创建UserMapper**.xml\[如果不要扩展方法可以不写\]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.sxt.mapper.UserMapper">
</mapper>
```

**6，创建TestUser**

```java
public class TestUser {
    ApplicationContext context = new ClassPathXmlApplicationContext("/applicationContext.xml");
    UserMapper userMapper = context.getBean(UserMapper.class);
    /**
     * 添加
     */
    @Test
    public void addUser() {
        //选择性的插入  如果字段为空，则生成sql的时候没有相应的字段
        User user = new User("小明", "武汉");
        userMapper.insert(user);
        //不管字段是否为生，生成sql时都在该字段
        //userMapper.insertAllColumn(new User(id, name, address))
    }

    /**
     * 修改
     */
    @Test
    public void updateUser() {
        //根据ID修改
        User user = new User(1, "李四", "深圳");
        userMapper.updateAllColumnById(user);
        //根据其它条件修改
        Wrapper<User> wrapper=new EntityWrapper<>();
        wrapper.eq("id", 1);
        //userMapper.update(user, wrapper);
    }

    /**
     * 删除
     */
    @Test
    public void deleteUser() {
        //根据ID删除
        //userMapper.deleteById(1);
        //根据其它条件删除
        Wrapper<User> wrapper=new EntityWrapper<>();
        wrapper.eq("id", 1);//设置id=1的可以删除
        userMapper.delete(wrapper);
    }

    /**
     * 查询一个
     */
    @Test
    public void queryUserById() {
        //根据ID查询一条记录
        //User user = userMapper.selectById(2);
        //System.out.println(user);
        //根据参数里面的条件返回一条数据[了解]
        User user = new User(1, "李四", "深圳");
        User selectOne = userMapper.selectOne(user);
        System.out.println(selectOne);
    }
    /**
     * 全查询
     */
    @Test
    public void queryAllUser() {
        //条件设置--没有条件
        Wrapper<User> wrapper=new EntityWrapper<>();
        List<User> list = userMapper.selectList(wrapper);
        for (User user : list) {
            System.out.println(user);
        }
    }

    /**
     * 带条件查询
     */
    @Test
    public void queryUserWrapper() {
        //条件设置--没有条件
        Wrapper<User> wrapper=new EntityWrapper<>();
        wrapper.ge("id", 3);//查询出id>=3的数据
        List<User> list = userMapper.selectList(wrapper);
        for (User user : list) {
            System.out.println(user);
        }
    }
    /**
     * 分页查询
     */
    @Test
    public void queryUserPage()
    {
        Wrapper<User> wrapper=new EntityWrapper<>();
        //查询条数
        Integer count = userMapper.selectCount(wrapper);
        System.out.println("总条数:"+count);
        RowBounds rowBounds=new RowBounds(0, 10);
        List<User> list = userMapper.selectPage(rowBounds, wrapper);
        for (User user : list) {
            System.out.println(user);
        }
    }
}
```

# 04【熟悉】MP-AR模式开发

**1，前言-什么是AR**

AR==(ActiveRecord)

ActiveRecord 一直广受动态语言（ PHP 、 Ruby 等）的喜爱，而 Java 作为准静态语言，对于 ActiveRecord 往往只能感叹其优雅，然后MP提供了一套API可以把静态变成动态

---

**2，如何使用呢【修改User】**

在开发中让domain实做类实现一个Model的接口

```java
@TableName("sys_user")//指定表名
public class User extends Model<User>{
    private Integer id;
    private String name;
    private String address;

    /**
     * 设置主键
     */
    @Override
    protected Serializable pkVal() {
        return this.id;
    }
    //get set方法
}

```

---

**3，创建TestUserAr**

```java
public class TestUserAr {
    ApplicationContext context = new ClassPathXmlApplicationContext("/applicationContext.xml");
    UserMapper userMapper = context.getBean(UserMapper.class);
    /**
     * 添加
     */
    @Test
    public void addUser() {
        User user = new User("小明", "武汉");
        user.insert();
    }

    /**
     * 修改
     */
    @Test
    public void updateUser() {
        //根据ID修改
        User user = new User(1, "李四", "深圳");
        //根据其它条件修改
        Wrapper<User> wrapper=new EntityWrapper<>();
        user.update( wrapper);
    }

    /**
     * 删除
     */
    @Test
    public void deleteUser() {
        User user = new User(1);
        //根据其它条件删除
        Wrapper<User> wrapper=new EntityWrapper<>();
        user.delete(wrapper);
    }

    /**
     * 查询一个
     */
    @Test
    public void queryUserById() {
        User user = new User(1);
        User user2 = user.selectById();
        System.out.println(user2);
    }
    /**
     * 全查询
     */
    @Test
    public void queryAllUser() {
        User user=new User();
        List<User> list = user.selectAll();
        for (User user2 : list) {
            System.out.println(user2);
        }
    }

    /**
     * 带条件查询
     */
    @Test
    public void queryUserWrapper() {
        User user=new User();
        //条件设置--没有条件
        Wrapper<User> wrapper=new EntityWrapper<>();
        List<User> list = user.selectList(wrapper);//设置条件
        for (User user2 : list) {
            System.out.println(user2);
        }
    }
    /**
     * 分页查询
     */
    @Test
    public void queryUserPage()
    {
        User user=new User();
        Wrapper<User> wrapper=new EntityWrapper<>();
        //查询条数
        Integer count = user.selectCount(wrapper);
        System.out.println("总条数:"+count);
        Page<User> page=new Page<>(1, 3);//第一页   每页显示三条
        Page<User> page2 = user.selectPage(page, wrapper);
        List<User> records = page2.getRecords();
        for (User u : records) {
            System.out.println(u);
        }
    }

}
```

# 05【掌握】MP的分页插件

**1，application-dao.xml配置修改**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7bc15bcf-34b0-4141-a93f-0422c1ef5228.png)

---

**2，修改UserMapper**

```java
public interface UserMapper extends BaseMapper<User>{
      /**
     * <p>
     * 查询 : 根据state状态查询用户列表，分页显示
     * </p>
     * @param page
     *            翻页对象，可以作为 xml 参数直接使用，传递参数 Page 即自动分页
     * @param user 查询条件
     * @return
     */
//  @Select("select * from sys_user")
    List<User> selectUserList(Pagination page, User user);
}

```

---

**3，修改UserMapper.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.sxt.mapper.UserMapper">

    <select id="selectUserList" parameterType="com.sxt.domain.User"
        resultType="com.sxt.domain.User">
        select * from sys_user
    </select>
</mapper>
```

---

**4，测试**  

```java
public class TestUserPage {
    ApplicationContext context = new ClassPathXmlApplicationContext("/applicationContext.xml");
    UserMapper userMapper = context.getBean(UserMapper.class);
    /**
     * 分页查询
     */
    @Test
    public void queryUserPage()
    {
        Pagination page=new Pagination(1, 5);
        List<User> userList = this.userMapper.selectUserList(page, new User());
        System.out.println("总条数:"+page.getTotal());
        for (User u : userList) {
            System.out.println(u);
        }
    }

}

```

**5，其它说明**  

当然在插件里面可以配置其它属性值

如果不想使用mp的分页，也可以开户PageHelper的分页

```xml
<plugins>
    <!--
     | 分页插件配置
     | 插件提供二种方言选择：1、默认方言 2、自定义方言实现类，两者均未配置则抛出异常！
     | overflowCurrent 溢出总页数，设置第一页 默认false
     | optimizeType Count优化方式 （ 版本 2.0.9 改为使用 jsqlparser 不需要配置 ）
     | -->
    <!-- 注意!! 如果要支持二级缓存分页使用类 CachePaginationInterceptor 默认、建议如下！！ -->
    <plugin interceptor="com.baomidou.mybatisplus.plugins.PaginationInterceptor">
        <property name="sqlParser" ref="自定义解析类、可以没有" />
        <property name="localPage" value="默认 false 改为 true 开启了 pageHeper 支持、可以没有" />
        <property name="dialectClazz" value="自定义方言类、可以没有" />
    </plugin>
</plugins>
```

# 06【掌握】条件构造器

**一，作用**

动态拼接SQL

---

**二，使用方法一**

```java
@Test
public void testTSQL11() {
    /*
     * 实体带查询使用方法  输出看结果
     */
    EntityWrapper<User> ew = new EntityWrapper<User>();
    ew.setEntity(new User(1));
    ew.where("user_name={0}", "'zhangsan'").and("id=1")
            .orNew("user_status={0}", "0").or("status=1")
            .notLike("user_nickname", "notvalue")
            .andNew("new=xx").like("hhh", "ddd")
            .andNew("pwd=11").isNotNull("n1,n2").isNull("n3")
            .groupBy("x1").groupBy("x2,x3")
            .having("x1=11").having("x3=433")
            .orderBy("dd").orderBy("d1,d2");
    System.out.println(ew.getSqlSegment());
}


```

---

**三，使用方法二**

```java
int buyCount = selectCount(Condition.create()
                .setSqlSelect("sum(quantity)")
                .isNull("order_id")
                .eq("user_id", 1)
                .eq("type", 1)
                .in("status", new Integer[]{0, 1})
                .eq("product_id", 1)
                .between("created_time", startDate, currentDate)
                .eq("weal", 1));
```

---

**四，相关条件参数配置说明**

| 查询方式     | 说明                              |
| ------------ | --------------------------------- |
| setSqlSelect | 设置 SELECT 查询字段              |
| where        | WHERE 语句，拼接 + `WHERE 条件`   |
| and          | AND 语句，拼接 + `AND 字段=值`    |
| andNew       | AND 语句，拼接 + `AND (字段=值)`  |
| or           | OR 语句，拼接 + `OR 字段=值`      |
| orNew        | OR 语句，拼接 + `OR (字段=值)`    |
| eq           | 等于=                             |
| allEq        | 基于 map 内容等于=                |
| ne           | 不等于<>                          |
| gt           | 大于>                             |
| ge           | 大于等于>=                        |
| lt           | 小于<                             |
| le           | 小于等于<=                        |
| like         | 模糊查询 LIKE                     |
| notLike      | 模糊查询 NOT LIKE                 |
| in           | IN 查询                           |
| notIn        | NOT IN 查询                       |
| isNull       | NULL 值查询                       |
| isNotNull    | IS NOT NULL                       |
| groupBy      | 分组 GROUP BY                     |
| having       | HAVING 关键词                     |
| orderBy      | 排序 ORDER BY                     |
| orderAsc     | ASC 排序 ORDER BY                 |
| orderDesc    | DESC 排序 ORDER BY                |
| exists       | EXISTS 条件语句                   |
| notExists    | NOT EXISTS 条件语句               |
| between      | BETWEEN 条件语句                  |
| notBetween   | NOT BETWEEN 条件语句              |
| addFilter    | 自由拼接 SQL                      |
| last         | 拼接在最后，例如：last("LIMIT 1") |

# 07【掌握】代码生成器

**1，前言**

使用MP的代码生成器之前我们知道在mybatis中也在逆向工程的生成，但是只能生成实体，Mapper，Mapper.xml  而MP的生成提供了更强大的生成方式，可以把三层开发中的所有东西全部生成

在代码生成之前，首先进行配置，MP提供了大量的自定义设置，生成的代码完全能够满足各类型的需求，如果你发现配置不能满足你的需求

---

**2，生成类的配置**

注意，关于具体的属性配置大家可以参见[http://mp.baomidou.com/#/generate-code](http://mp.baomidou.com/#/generate-code%E5%AE%98%E7%BD%91%E4%B8%8A%E7%9A%84%E8%AF%B4%E6%98%8E)

官网上的说明

```java
public class MyGenerator {

    /**
       * <p>
       * MySQL 生成演示
       * </p>
       */
      public static void main(String[] args) {
        //1. 全局配置
            GlobalConfig config = new GlobalConfig();
            config.setActiveRecord(true) // 是否支持AR模式
                  .setAuthor("老雷") // 作者
                  //.setOutputDir("D:\\workspace_mp\\mp03\\src\\main\\java") // 生成路径
                  .setOutputDir("D:\\stsworkspaces\\mybatis_g\\src\\main\\java") // 生成路径
                  .setFileOverride(true)  // 文件覆盖
                  .setIdType(IdType.AUTO) // 主键策略
                  .setServiceName("%sService")  // 设置生成的service接口的名字的首字母是否为I
                                       // IEmployeeService
                  .setBaseResultMap(true)//生成基本的resultMap
                  .setBaseColumnList(true);//生成基本的SQL片段 

            //2. 数据源配置
            DataSourceConfig  dsConfig  = new DataSourceConfig();
            dsConfig.setDbType(DbType.MYSQL)  // 设置数据库类型
                    .setDriverName("com.mysql.jdbc.Driver")
                    .setUrl("jdbc:mysql://localhost:3306/carrent")
                    .setUsername("root")
                    .setPassword("123456");

            //3. 策略配置globalConfiguration中
            StrategyConfig stConfig = new StrategyConfig();
            stConfig.setCapitalMode(true) //全局大写命名
                    .setDbColumnUnderline(true)  // 指定表名 字段名是否使用下划线
                    .setNaming(NamingStrategy.underline_to_camel) // 数据库表映射到实体的命名策略
                    .setTablePrefix("sys_")//生成表的前缀[配置它在生成实体的时候前缀会被去掉]
                    .setInclude("sys_users");  // 生成的表

            //4. 包名策略配置 
            PackageConfig pkConfig = new PackageConfig();
            pkConfig.setParent("com.sxt")
                    .setMapper("mapper")//dao
                    .setService("service")//servcie
                    .setController("controller")//controller
                    .setEntity("entity")
                    .setXml("mapping");//mapper.xml

            //5. 整合配置
            AutoGenerator  ag = new AutoGenerator();
            ag.setGlobalConfig(config)
              .setDataSource(dsConfig)
              .setStrategy(stConfig)
              .setPackageInfo(pkConfig);

            //6. 执行
            ag.execute();
      }

}
```

# Mybatis-plus在springboot中的使用

pom.xml添加依赖：

```java
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.21</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.3.0</version>
        </dependency>
```

yml配置：

```java
# mybatisplus的配置
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  mapper-locations: classpath:mapper/*/*Mapper.xml
```