# 01-【熟悉】Spring框架介绍

### 1 Spring核心

1，AOP：面向切面编程。扩展功能而不修改源代码。

2，IOC：控制反转，降低耦合度。如果调用一个类中的方法，需要new对象然后才可以调用；在spring的IoC种，可以将代码new对象的操作交给spring的配置文件来完成。

| spring的原理解释：当项目启动时，spring会读取applicationContext.xml文件，然后根据内容创建对象并放入IOC容器中，然后每次使用兑现时从IOC容器中取。  <br>IOC容器的原理：存储创建好的对象。<br>       形式：key           value<br>                 user1         new user()<br>                 user2         new user() |
| ------------------------------------------------------------ |

2 一站式框架  

l  Spring在JavaWeb三层结果中，每一层都提供了不同的解决技术。

l  Web层：SpringMVC

l  Service层：Spring ioc

l  Dao层：Spring jdbc Template

### 3 spring框架图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9bcd71ba-0f1c-40f0-b7e3-03e55af43dd7.jpg)



1、数据访问层：

* JDBC：使用JDBC访问数据库（JdbcTemplate）  
* ORM+OXM：提供对mybstis   hibernate等orm框架的集成支持  
* JMS：Java Message Server   消息中间件（ActiveMq）  
* 队列： FIFO   **fisrt in first out**
* Transactions：事务管理

2、Web层

* serlvet==>springmvc
* websocker==>页面的socker的支持

3、使用的思想

* AOP：**面向切面编程**
* IOC：**控制反转、依赖注入**

4、核心容器

* beans：bean工厂
* core：核心包
* context：上下文支持

5、Test

* 单元测试层

# 02-【熟悉】重构javaEE三层结构

## 一，传统的javaEE的三层写法

### 1，包结构

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora60a4e9c9-b5ff-4365-9d59-8e3091cc3d08.png)

### 2，User

```java
public class User {
    private int id;
    private String name;
    private String address;
    public User() {
        // TODO Auto-generated constructor stub
    }
    public User(int id, String name, String address) {
        super();
        this.id = id;
        this.name = name;
        this.address = address;
    }
}
```

### 3，UserDAO

```java
public interface UserDAO {
    User queryById(int id);
}

```

---

### 4，UserDAOImpl

```java
public class UserDAOImpl implements UserDAO {
    @Override
    public User queryById(int id) {
        User user=null;
        switch (id) {
        case 1:
            user=new User(1, "老雷", "武汉");
            break;
        case 2:
            user=new User(2, "老张", "武汉");
            break;
        case 3:
            user=new User(3, "老周", "重庆");
            break;
        }
        return user;
    }
}
```

---

### 5，UserService

```java
public interface UserService {
    User queryById(int id);
}
```

---

### 6，UserServiceImpl

```java
public class UserServiceImpl implements UserService{
    private UserDAO dao=new UserDAOImpl();
    @Override
    public User queryById(int id) {
        return dao.queryById(id);
    }
}
```

---

### 7，action

```java
public class UserAction {
    UserService service=new UserServiceImpl();
    public void queryByid(){
        User user = service.queryById(1);
        System.out.println(user);
    }
}
```

---

### 8，testAction

```java
public class TestAction {
    @Test
    public void testIoc(){
        UserAction action=new UserAction();
        action.queryByid();
    }
}
```

---

## 二，传统的javaEE的三法的总结


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora60a4e9c9-b5ff-4365-9d59-8e3091cc3d08.png)

  

以上的写法当我要去换一个接口的实现类时就要改很多源代码，所以不难看出以上的代码耦合度太高，那有没有更好的方法来解决这个问题呢，【既然这么说，肯定是有的啦，看老雷来撸代码】

---

### 1，面向接口编程

目地，使用者只看接口，不管实现类，实现类交给容器【工厂factory】去创建

① 申明对象工厂解耦UserFactory

```java
public class UserFactory {
    /**
     * UserDAO实现类的工厂
     * @return
     */
    public static UserDAO getUserDAO(){
        try {
            String className="com.sxt.dao.impl.UserDAOImpl";
            Class clazz=Class.forName(className);
            return (UserDAO) clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * UserService实现类的工厂
     */
    public static UserService getUserService(){
        try {
            String className="com.sxt.service.impl.UserServiceImpl";
            Class clazz=Class.forName(className);
            return (UserService) clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

```

②使用UserFactory  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4c0e0452-6439-4f3d-a887-9a2bbd7dc9a8.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae8718eba-9f74-4282-997a-312061e6cda5.png)

---

不难看出以上的代码只要接口的实现发生了变化，只用去改UserFactory，但是我们开发中不可能只有一个DAO和一个Service，所以以上的写法随着项目的越来越大，Factory里面的代码会越来越多，下面我们来进一步封装

```java
public class UserFactory {
    public static <T> T  getNewInstence(String bean){
        try {
            Class clazz=Class.forName(bean);
            return (T) clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

使用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeeec2674-2912-4429-8df6-e03cc802ae3a.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora87c5a5f8-7025-4b94-becc-e341665f4c5b.png)

---

以上的代码我们精减了Factory，但是在调用者端要指定类的全路径，所以要改的时候还要是去修改源代码，那么有没有办法不用去修改源代码呢，【肯定是有的，听老雷慢慢道来】  

接下来我们进一步封装

在java中properties文件和xml文件是不会被编译的，所以我们可以借助properties或者xml文件

下面我们使用properties来说明去修改

创建bean.properties

```java
#dao config 
userDAO=com.sxt.dao.impl.UserDAOImpl
#service config 
userService=com.sxt.service.impl.UserServiceImpl
```

修改Factory

```java
public class UserFactory {
    public static <T> T  getNewInstence(String bean){
        try {
            Properties properties=new Properties();
            properties.load(UserFactory.class.getResourceAsStream("bean.properties"));
            String path=properties.getProperty(bean);
            Class clazz=Class.forName(path);
            return (T) clazz.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

使用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0caad4eb-fc84-41c9-bd45-8746c5c3d880.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7156f4bb-c506-4ba7-8234-764a7c682486.png)

# 03-【掌握】IOC\_DI解耦合及实现原理

## 一，知识拓扑图


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4050850844933469.png)

  

## 二，相关概念说明

**1.控制反转 --> 谁控制谁? 控制什么? 为何叫反转(对应于正向)?哪些方面反转了?为何需要反转?**

　　谁控制谁?  --> IOC/DI容器控制应用程序

　　控制什么? --> IO C/DI容器控制对象本身的创建、实例化; IoC/DI容器控制对象之间的依赖关系

　　为何叫反转(对应于正向)? --> 因为现在应用程序不能主动去获取外部资源了，而是被动等待IoC/DI容器给它注入它所需要的资源，所以称之为反转.

　　哪些方面反转了? --> 1.创建对象 2.程序获取资源的方式反了

　　为何需要反转? --> 1.引入IoC/DI容器过后,体系更为松散，而且管理更有序; 2.类之间真正实现了松散耦合

**2.依赖 --> 什么是依赖(按名称理解、按动词理解)? 谁依赖于谁? 为什么需要依赖? 依赖什么东西?**

　　什么是依赖(按名称理解、按动词理解)? --> 依赖(按名称理解):依赖关系;  依赖(按动词理解):依赖的动作

　　谁依赖于谁?　--> 应用程序依赖于IoC/DI容器

　　为什么需要依赖? --> 因为发生了反转，应用程序依赖的资源都是IoC/DI容器里面

　　依赖什么东西? --> 应用程序依赖于IoC/DI容器,依赖IoC/DI容器为它注入所需要的资源。（比如：依赖关系）

**3.注入:谁注入于谁? 注入什么东西? 为何要注入?**

　　谁注入于谁? --> IoC/DI容器注入于应用程序

　　注入什么东西? --> 注入应用程序需要的外部资源，比如依赖关系

　　为何要注入? --> 因为程序要正常运行需要这些外部资源

**4.依赖注入和控制反转是同一概念吗?**

　　不是同一概念， 其实它们两个描述的是同一件事件，但是是从不同的角度来说:控制反转是从IoC/DI容器的角度；依赖注入是从应用程序的角度

　　控制反转的描述： IoC/DI容器反过来控制应用程序，控制应用程序锁所需要的外部资源（比如：外部资源）
　　依赖注入的描述： 应用程序依赖IoC/DI容器，依赖它注入所需要的外部资源。

**5.参与者都有哪些?**

　　IoC/DI容器、应用程序

**6.IoC/DI是什么?能做什么?怎么做?用在什么地方?**

  IoC/DI是什么?

       IoC(Inversion of Control):就是使用IoC/DI容器反过来控制应用程序所需要的外部资源，是程序开发思想。

　　DI(Dependency Injection)：就是应用程序依赖IoC/DI容器来注入所需要的外部资源，也是程序的开发思想。

　　能做什么? --> 松散耦合对象

　　怎么做? --> 使用Spring框架，里面有实现好了的IoC/DI容器

　　用在什么地方? --> 凡是程序里面需要使用外部资源的情况，都可以考虑使用IoC/DI容器

**7.什么是外部资源**

　　对于一个类来讲，所谓的外部资源，就是指在自己类的内部不能得到或实现的东西，比如说:在类里面需要读取一个配置文件，那么这个配置文件就相当于这个类的外部资源。又比如：A类里面要调用B类，那么对于A类来讲B类就是外部资源。

**8\. IoC容器**

　　简单的理解就是：实现IoC思想，并提供对象创建、对象装配以及对象生命周期管理的软件就是IoC容器。

　　对IoC的理解：

　　　　a. 应用程序无需主动new对象，而是描述对象应该如何被创建

　　　　b. 应用程序不需要主动装配对象之间的依赖关系,而是描述需要哪个服务，IoC容器会帮你装配，被动接受装配

　　　　c. 主动变被动，是一种让服务消费者不直接依赖于服务提供者的组件设计方式，是一种减少类与类之间依赖的设计原则

**9.使用IoC/DI容器开发需要改变思路**

　　a. 应用程序不主动创建对象，但是要描述创建它们的方式

* **以后开发中只要看到有new操作，就应该考虑使用IOC容器**
* **以上的针对成员变量，不是局部变量。**

　　b. 在应用程序代码中不直接进行服务的装配，但是要描述哪一个组件需要哪一项服务，由容器负责将这些装配在一起。也就是说：所有的组件都是被动的，组件初始化和专供都是由容器负责，应用程序只是在获取相应的组件后，实现应用的功能即可。  

---

## 三，IOC和DI使用的底层技术

* Xml配置文件
* dom4j解析xml
* 工厂设计模式
* 反射



---

注解原理：

```java
Class<?> forname = Class.forName(path);
WebServlet annotation = forname.getAnnotation(WebServlet.class);
annotation.value();
```

---

## 四，最终目的

    程序的**高内聚，低耦合**  

        高内聚低耦合，是[软件工程](https://baike.baidu.com/item/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B/25279)中的概念，是判断软件设计好坏的标准，主要用于程序的[面向对象](https://baike.baidu.com/item/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/2262089)的设计，主要看类的内聚性是否高，耦合度是否低。目的是使程序模块的可重用性、移植性大大增强。通常程序结构中各模块的内聚程度越高，模块间的耦合程度就越低。内聚是从功能角度来度量模块内的联系，一个好的内聚模块应当恰好做一件事，它描述的是模块内的功能联系；耦合是软件结构中各模块之间相互连接的一种[度量](https://baike.baidu.com/item/%E5%BA%A6%E9%87%8F/34036)，耦合强弱取决于模块间接口的复杂程度、进入或访问一个模块的点以及通过接口的数据。



## 五，总结

什么是以来注入     谁依赖谁    谁注入谁

什么是控制反转     谁控制谁     反转了什么     控制了什么

# 04-【掌握】spring的入门配置

> 目地是学会让spring容器为我们去创建需要的对象

## 1，创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad7a992a2-e058-43ac-9d99-d35d1e63eec8.png)

## 2，导入spring的基础包

解压下载的zip包，lib文件夹中的特点，都有3个jar包  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora954c2103-54cb-4ab1-9fdc-fb2e9233397d.png)

我们目标只需要spring的基本功能，导入核心容器的6个核心jar包即可  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad877d9a8-3a36-450c-9a6b-a66b8094574e.png)

相关包的解释：

| spring-aop-4.3.7.RELEASE.jar               | spring对aop的支持                                            |
| ------------------------------------------ | ------------------------------------------------------------ |
| spring-aspects-4.3.7.RELEASE.jar           | spring对sapests的继承支持，aspests就是一个aop的开源库        |
| spring-beans-4.3.7.RELEASE.jar             | spring对配置文件的对象的解析与创建                           |
| spring-context-4.3.7.RELEASE.jar           | spring对上下文的支持包                                       |
| spring-context-support-4.3.7.RELEASE.jar   | spring上下文集成的一些第三方的库，如定时器等                 |
| spring-core-4.3.7.RELEASE.jar              | spring的核心包                                               |
| spring-expression-4.3.7.RELEASE.jar        | spring的相关表达式包                                         |
| spring-instrument-4.3.7.RELEASE.jar        | 辅助包（可以不使用）                                         |
| spring-instrument-tomcat-4.3.7.RELEASE.jar | 辅助包（对tomcat的支持）                                     |
| spring-jdbc-4.3.7.RELEASE.jar              | spring对数据访问的支持，类似于dbUtils.java      JdbcTemplete |
| spring-jms-4.3.7.RELEASE.jar               | spring对详细中间件的支持，可以集成MQ    Message Queue        |
| spring-messaging-4.3.7.RELEASE.jar         |                                                              |
| spring-orm-4.3.7.RELEASE.jar               | orm和oxm都是对第三方ORM框架的扩展和集成                      |
| spring-oxm-4.3.7.RELEASE.jar               |                                                              |
| spring-test-4.3.7.RELEASE.jar              | 测试                                                         |
| spring-tx-4.3.7.RELEASE.jar                | spring对所有的ORM框架的事务支持                              |
| spring-web-4.3.7.RELEASE.jar               | spring对所有的控制层的框架的集成，如struts                   |
| spring-webmvc-4.3.7.RELEASE.jar            | springmvc                                                    |
| spring-webmvc-portlet-4.3.7.RELEASE.jar    |                                                              |
| spring-websocket-4.3.7.RELEASE.jar         | spring对网页聊天的支持                                       |

---

### 3，导入日志包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora08a4ac3e-c1e1-4d82-9bdc-20a14598e0dd.png)

---

## 4，创建UserDAO接口

```java
public interface UserDAO {
    User queryById(int id);
}
```

---

## 5，创建UserDAOImpl实现类

```java
public class UserDAOImpl implements UserDAO {
    @Override
    public User queryById(int id) {
        User user=null;
        switch (id) {
        case 1:
            user=new User(1, "老雷", "武汉");
            break;
        case 2:
            user=new User(2, "老张", "武汉");
            break;
        case 3:
            user=new User(3, "老周", "重庆");
            break;
        }
        return user;
    }
}
```

---

## 6，创建appliactionContext.xml配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 导入头文件 -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="userDAO" class="com.sxt.dao.impl.UserDAOImpl"></bean>
</beans>
```

## 7，导入log4j.properties文件

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

---

## 8，测试

```java
@Test
public void testIoc2(){
    ApplicationContext app=new            ClassPathXmlApplicationContext("classpath:applicationContext.xml");
    UserDAO dao=(UserDAO) app.getBean("userDAO");
    System.out.println(dao.queryById(1));
}
```

---

## 9，使用ioc/di的配置service和action

UserServiceI的配置

```java
public class UserServiceImpl implements UserService{
    private UserDAO userDAO;
    public UserDAO getUserDAO() {
        return userDAO;
    }
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public User queryById(int id) {
        return userDAO.queryById(id);
    }
}
```

UserAction的配置

```java
public class UserAction {
    UserService userService;
    public UserService getUserService() {
        return userService;
    }
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
    public void queryByid(){
        User user = userService.queryById(1);
        System.out.println(user);
    }
}
```

---

修改appliactionContext.xml

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd">
        <bean id="userDAO" class="com.sxt.dao.impl.UserDAOImpl"></bean>

        <bean id="userService" class="com.sxt.service.impl.UserServiceImpl">
            <property name="userDAO" ref="userDAO"></property>
        </bean>

        <bean id="userAction" class="com.sxt.action.UserAction">
            <property name="userService" ref="userService"></property>
        </bean>
</beans>

```

测试

```java
    @Test
    public void testIoc3(){
        //让容器去为我们创建对象
        // 加载spring的配置文件，并初始化IOC容器
        ApplicationContext app=new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        // 使用id从IOC容器里面取出生成的对象
        UserAction action=(UserAction) app.getBean("userAction");
        action.queryByid();
    }
```

# 05-【掌握】Spring相关配置详解

## 一，Bean标签  

1，bean标签id属性：为Bean标签自定义名称，但是不能使用特殊符号。在代码中可以根据id值获取到对象  

2，bean标签class属性：代表对应类的全路径  

3，bean标签scope属性：

* singleton：默认值，表示单例
* prototype：多例，用户每次从IOC容器里面调用的时候都会给一个新的对象
* request：WEB项目中，Spring创建一个Bean对象，将Bean对象放入request域中
* session：WEB项目中，Spring创建一个Bean对象，将Bean对象放入session域中

4，bean标签lazy-init属性  

       默认情况下启动程序时对象就直接创建了  

       当加入lazy-init=“true”之后使用者取对象时才会创建  

5，name：在springmvc里面指定controller的请求路径

---

## 二，Spring实例化Bean的三种方式【了解】  

    在spring中，通过配置文件创建对象就叫做Bean实例化，Bean实例化一共3种方式：

**1，使用类中的无参构造方法【重点掌握】**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5f05aa20-2161-45e2-9a3f-c33a370f422f.png)

> 注意：如果类中没有无参构造会产生异常。

**2 用静态工厂创建UserFactory【了解】**  

    创建静态方法，返回类对象  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf175bcdf-4bb6-40de-b791-f889a7af0989.png)

    修改配置文件获取对象的方式  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0f09b7a4-aac3-4d59-ad1c-37c1e496983a.png)

**3 用实例工厂创建UserFactory【熟悉】**  

    创建不是静态方法，返回类对象

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora25b5e817-5e13-4d24-aa92-8c95603eba5c.png)

    修改配置文件获取对象

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora39987b0e-042d-4ac9-9d9b-7fdd46ad0e9a.png)

---

## 三，Bean属性注入  

**1，常见的属性注入方式**

> setXX方法注入

> 使用有参构造方法注入  

> 接口注入【了解】

**2，set方式注入**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4ac6c1bb-2e20-4645-90b7-410702ddcce3.png)

**如果里面有单个的Date属性如何注入呢？**

**3，有参构造方法注入**

    Person

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7ad2acfe-d314-4a58-bce0-92efa0b0afef.png)

applicationContext.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7a6353c8-89a2-43d0-81a2-4b4e1d519b8c.png)

测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora58ead772-a572-486f-b546-02a29547f2fa.png)

**4，集合和数组属性注入**

Animal

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafdaf96a3-4ce4-4e71-aa18-6d3f2257d5da.png)

applicationContext.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae85c0ca2-e2ac-49f2-97af-234eff6f43d5.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae1b36639-9a81-4ad9-8dbc-44b992c1d283.png)

测试  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7d4c1c76-a3d0-4c60-9639-6f783be4eae8.png)

## 四，spring模块化配置  

在开发中，我们一般会分模块去管理我们的spring xml文件，

dao放到app\_dao.xml里面  

service放到app\_service.xml里面

action放到app\_action.xml里面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad214b66d-5bae-4271-a7c4-66ee6d8d8e7a.png)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab1570651-63a2-4905-9a5e-2ee3369d943c.png)

## 五，IOC和DI的区别【重点理解】  

IOC：控制反转，把对象的创建交给spring进行创建  

DI：依赖注入，向类中的属性设置值  

关系：依赖注入（DI）不能单独存在，需要在控制反转（IOC）的基础之上完成功能。

# 06-【熟悉】XML方式重构三层结构

## 一，导入基本jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3c1fae16-c22c-4804-851e-ec9c060e3772.png)

## 二，创建UserDAO，UserService,UserAction

UserDAOImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora23f94083-7ef9-4f06-88b6-ec07abb29ddd.png)

UserServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3474f1fe-6152-48e8-ab99-8aab636823e2.png)

UserAction

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora23ace7b8-a6b7-497b-9e4a-bfe44b828a83.png)

## 三，创建appliactionContext.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora329f836f-530d-447e-a16b-2d295d6579c2.png)

## 四，配置自动装配

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7e858d68-c9c8-40a3-aecb-147e56df9e78.png)

# 07-【掌握】注解方式重构三层结构

## 一，导入jar包

**1,导入基本jar包**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7a0af40e-bd82-4c06-8dea-2101a6bbe0c3.png)

**2，导入aop的jar包**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7b1da35e-2881-43c2-b599-b0743b699223.png)

**3，给appliactionContext.xml添加**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad21fa99a-8baf-46dc-9f75-9b0100e1ffce.png)

**4，开启组件扫描**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1423f205-b055-4343-bf19-4aac66f00339.png)

---

## 二，在需要被纳入容器的类加注解  

---

将加了注解的类，纳入到spring容器中，进行实例化  

@Repository：加入dao层（数据访问层），将dao实现类纳入到spring容器中

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac76432ea-fa15-42d8-92ac-3023d39554cc.png)

@Service：加入service层（业务层），将service实现类纳入到spring容器中

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora20f2a629-0a74-493f-92b2-37e35968d302.png)

@Controller  ：加入web层（控制层），将Action纳入spring容器中

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae7830960-f52b-4e47-8901-25e01d6bc4c9.png)

测试得到DAO对象

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa3c96678-c0a6-4268-9524-2c7617c538d1.png)

## 三，给需要注入的属性加注解

建立起，对象之间的依赖关系  

@Autowired  

    作用地点：属性或者方法，构造方法  

    作用：从ioc容器中找对应属性类型的对象进行赋值  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracfd3dfa9-ff96-40c5-960f-5b79b8a13b97.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora71c24d7b-b911-4c6e-a849-9f74ca45623c.png)

## 三，执行流程

当加载spring容器的时候，根据xml文件的配置  

自动扫描指定的package  

将指定包中，被加了注解的类，纳入spring容器中，进行实例化  

,bean标签的id属性默认是类名首字母小写，  

可以自己指定id，给类的响应注解加参数（“xxx”）  

给纳入spring容器中的对象的添加了@Autowired的属性，完成自动装配  

默认：autowire=”byType”  

IOC/DI  完成对象的解耦合  

## 四，注解的总结说明

Spring注解@Component、@Repository、@Service、@Controller区别

        如果 Web 应用程序采用了经典的三层分层结构的话，最好在持久层、业务层和控制层分别采用@Repository、@Service 和 @Controller 对分层中的类进行注释，而用 @Component 对那些比较中立的类进行注释。 
        在一个稍大的项目中，通常会有上百个组件，如果这些组件采用xml的bean定义来配置，显然会增加配置文件的体积，查找以及维护起来也不太方便。 Spring2.5为我们引入了组件自动扫描机制，他可以在类路径底下寻找标注了@Component,@Service,@Controller,@Repository注解的类，并把这些类纳入进Spring容器中管理。它的作用和在xml文件中使用bean节点配置组件时一样的

---

## 五，<context:component-scan base-package = "" />浅析

component-scan 默认扫描的注解类型是 @Component，不过，在 @Component 语义基础上细化后的 @Repository, @Service 和 @Controller 也同样可以获得 component-scan 的青睐

有了context:component-scan，另一个context:annotation-config/标签根本可以移除掉，因为已经被包含进去了

另外context:annotation-config/还提供了两个子标签

1\.        context:include-filterp

2\.       context:exclude-filter //排除扫描的路径

context:component-scan有一个use-default-filters属性，属性默认为true,表示会扫描指定包下的全部的标有@Component的类，并注册成bean.也就是@Component的子注解@Service,@Reposity等。

这种扫描的粒度有点太大，如果你只想扫描指定包下面的Controller或其他内容则设置use-default-filters属性为false，表示不再按照scan指定的包扫描，而是按照context:include-filter指定的包扫描，示例：

```xml
<context:component-scan base-package="com.sxt" use-default-filters="false">
    <context:include-filter type="regex" expression="com.sxt.*"/>//注意后面要写.* 
</context:component-scan>
```

当没有设置use-default-filters属性或者属性为true时，表示基于base-packge包下指定扫描的具体路径

```xml
<context:component-scan base-package="com.sxt" >
        <context:include-filter type="regex" expression=".controller.*"/>
        <context:include-filter type="regex" expression=".service.*"/>
        <context:include-filter type="regex" expression=".dao.*"/>
</context:component-scan>
```

效果相当于：

```xml
<context:component-scan base-package="com.sxt" >
        <context:exclude-filter type="regex" expression=".pojo.*"/>
</context:component-scan>
```

注意：无论哪种情况<context:include-filter>和<context:exclude-filter>都不能同时存在

**注解说明：**

@Repository：仓库

* 作用地点：一般注解数据访问层
* 作用：创建对象

@Service：服务

* 作用地点：一般注解service的实现类层
* 作用：创建对象

@Controller

* 作用地点：一般注解到控制层
* 作用：创建对象

@Autowired

* 作用地点：属性    方法，构造方法
* 作用：从IOC容器中查找对应属性类型的对象进行赋值

@Component：组件

* 作用地点：作用一个类无法归类为dao、service、controller就用它
* 作用：创建对象
* 说明：spring3.0最先出来的一个注解

# 08-【熟悉】AOP的概述

## 1，什么是AOP

    AOP（Aspect Oriented Programing）面向切面编程。  

    AOP采取横向抽取机制，取代了传统的继承纵向继承体系重复性代码（性能监视、事务管理、安全检查、缓存）  

    Spring的AOP采用了纯Java实现，不需要专门的编译过程和类加载器，在运行期间通过动态代理的方式向目标类注入增强代码。  

## 2，AOP应用场景说明

* 举例实际项目的引用场景
* 对程序进行增强:不修改源码的情况下
* 权限校验,日志记录,性能监控,事务控制

## 3，AOP的底层实现

代理机制:

Spring的AOP的底层用到两种代理机制：

JDK的动态代理：针对实现了接口的类产生代理.

Cglib的动态代理：针对没有实现接口的类产生代理

# 09-【掌握】代理模式

## 1，代理模式概述

代理(Proxy)是一种设计模式，提供了对目标对象另外的访问方式；即通过代理对象访问目标对象。这样做的好处是：可以在目标对象实现的基础上，增强额外的功能操作,即扩展目标对象的功能。  

这里使用到编程中的一个思想：不要随意去修改别人已经写好的代码或者方法，如果需改修改，可以通过代理的方式来扩展该方法。  

举个例子来说明代理的作用：假设我们想邀请一位明星，那么并不是直接连接明星，而是联系明星的经纪人，来达到同样的目的。明星就是一个目标对象，他只要负责活动中的节目，而其他琐碎的事情就交给他的代理人(经纪人)来解决。这就是代理思想在现实中的一个例子  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9391359760381879.png)

代理模式的关键点是：代理对象与目标对象。代理对象是对目标对象的扩展，并会调用目标对象

## 2，代理模式的分类

1. 静态代理  ---装饰者模式  
2. 动态代理  
3. JDK的动态代理
4. Cglib动态代理

## 3，静态代理

静态代理在使用时,需要定义接口或者父类,被代理对象与代理对象一起实现相同的接口或者是继承相同父类.  

下面举个案例来解释:  

模拟保存动作,定义一个保存动作的接口:IUserDao.java,然后目标对象实现这个接口的方法UserDao.java,此时如果使用静态代理方式,就需要在代理对象(UserDaoProxy.java)中也实现IUserDao接口.调用的时候通过调用代理对象的方法来调用目标对象.  

需要注意的是,代理对象与目标对象要实现相同的接口,然后通过调用相同的方法来调用目标对象的方法  

代码示例:  

接口:IUserDao.java  

```java
/**
 * 接口
 */
public interface IUserDao {
    void save();
}
```

目标对象:UserDao.java

```java
/**
* 接口实现
* 目标对象
*/
public class UserDao implements IUserDao {
    public void save() {
        System.out.println("----已经保存数据!----");
    }
}
```

代理对象:UserDaoProxy.java

```java
/**
* 代理对象,静态代理
*/
public class UserDaoProxy implements IUserDao{
    //接收保存目标对象
    private IUserDao target;
    public UserDaoProxy(IUserDao target){
        this.target=target;
    }

    public void save() {
        System.out.println("开始事务...");
        target.save();//执行目标对象的方法
        System.out.println("提交事务...");
    }
}
```

测试类:App.java

```java
/**
* 测试类
*/
public class App {
    public static void main(String[] args) {
        //目标对象
        UserDao target = new UserDao();

        //代理对象,把目标对象传给代理对象,建立代理关系
        UserDaoProxy proxy = new UserDaoProxy(target);

        proxy.save();//执行的是代理的方法
    }
}
```

**实现方式一：继承的方法**

1、创建Man

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.050746397716031864.png)

2、创建SuperMan

```java
public class SuperMan extends Man{

    @Override
    public void eat() {
        before();
        super.eat();
        after();
    }

    public void before(){
        System.out.println("饭前水果");
    }


    public void after(){
        System.out.println("饭后搞一根");

    }
}
```

3、测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6873753167716996.png)

**实现方式二：装饰者模式**  

1、创建Person

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0022bdcc9bd-0fb5-4ee2-bd08-8a3f3c72140b.jpg)

2、创建SuperPerson

```java
public class SuperPerson {

    //声明目标对象
    private Person target;


    public SuperPerson(Person target) {
        this.target=target;
    }

    public void eat(){
        before();
        target.eat();
        after();
    }
    public void before(){
        System.out.println("饭前水果");
    }


    public void after(){
        System.out.println("饭后搞一根");

    }
}
```

3、测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora84aee124-dab3-4cf7-bed1-270639cdb5fa.jpg)

静态代理总结:  

1.可以做到在不修改目标对象的功能前提下,对目标功能扩展。  

2.缺点：

    因为代理对象需要与目标对象实现一样的接口，所以会有很多代理类,类太多.同时,一旦接口增加方法,目标对象与代理对象都要维护。  

如何解决静态代理中的缺点呢?答案是可以使用动态代理方式  

## 4，动态代理\[Dynamic proxy\]-JDK代理

**动态代理有以下特点:**  

1.代理对象,不需要实现接口

2.代理对象的生成,是利用JDK的API,动态的在内存中构建代理对象(需要我们指定创建代理对象/目标对象实现的接口的类型)

3.动态代理也叫做:JDK代理,接口代理



**JDK中生成代理对象的API**  

代理类所在包:java.lang.reflect.Proxy  

JDK实现代理只需要使用newProxyInstance方法,但是该方法需要接收三个参数,完整的写法是:

```java
static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces,InvocationHandler h )
```

注意该方法是在Proxy类中是静态方法,且接收的三个参数依次为:

* ClassLoader loader,:指定当前目标对象使用类加载器,获取加载器的方法是固定的
* Class<?>\[\] interfaces,:目标对象实现的接口的类型,使用泛型方式确认类型
* InvocationHandler h:事件处理,执行目标对象的方法时,会触发事件处理器的方法,会把当前执行目标对象的方法作为参数传入

代码示例:  

接口类IUserDao.java以及接口实现类,目标对象UserDao是一样的,没有做修改.在这个基础上,增加一个代理工厂类(ProxyFactory.java),将代理类写在这个地方,然后在测试类(需要使用到代理的代码)中先建立目标对象和代理对象的联系,然后代用代理对象的中同名方法。

代理工厂类:ProxyFactory.java

```java
/**
* 创建动态代理对象
* 动态代理不需要实现接口,但是需要指定接口类型
*/
public class ProxyFactory{

    //维护一个目标对象
    private Object target;
    public ProxyFactory(Object target){
        this.target=target;
    }

  //给目标对象生成代理对象
    public Object getProxyInstance(){
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InvocationHandler() {
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("开始事务2");
                        //执行目标对象方法
                        Object returnValue = method.invoke(target, args);
                        System.out.println("提交事务2");
                        return returnValue;
                    }
                }
        );
    }
}
```

测试类:App.java

```java
/**
* 测试类
*/
public class App {
    public static void main(String[] args) {
        // 目标对象
        IUserDao target = new UserDao();
        // 【原始的类型 class cn.itcast.b_dynamic.UserDao】
        System.out.println(target.getClass());
        // 给目标对象，创建代理对象
        IUserDao proxy = (IUserDao) new ProxyFactory(target).getProxyInstance();
        // class $Proxy0  内存中动态生成的代理对象
        System.out.println(proxy.getClass());
        // 执行方法  【代理对象】
        proxy.save();
    }
}
```

总结:  

代理对象不需要实现接口,但是目标对象一定要实现接口,否则不能用动态代理  

---

### 一、动态代理\[jdk的动态代理\]

**JDK\*\*动态代理有以下特点**:\*\*

1.代理对象,不需要实现接口

2.代理对象的生成,是利用JDK的API,动态的在内存中构建代理对象(需要我们指定创建代理对象/目标对象实现的接口的类型)

3.动态代理也叫做:JDK代理,接口代理

#### 1.Proxy的说明

        |--相关方法

                 |-- newProxyInstance(ClassLoader loader,

Class<?>\[\] interfaces,

InvocationHandler h)

                               throws IllegalArgumentException

                 |--参数1：ClassLoader  当前目标对象的类加载器

                 |--参数2：interfaces  目标对象所实的接口的数组

                 |--参数3：InvocationHandler  指派方法调用的调用处理程序

                                          |--相关方法invoke(Object proxy, Method method, Object\[\] args)

                                                  |--参数1：代理对象

                                                  |--参数2：当去调用方法时传过来的方法相关的信息

                                                  |--参数3：方法的参数列表

#### 2.创建目标类的接口

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5709854200345963.png)

#### 3.创建目标类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.18559916788257158.png)

####  4.创建代理的工厂

```java
/**
 * 代理工厂
 *
 * @author Administrator
 *
 */
public class ProxyFactory {

     // 声明目标对象
     private Object target;

     public ProxyFactory(Object target) {
         super();
         this.target = target;
     }

     /**
      * 生成代理对象
      */
     public Object getProxyInstance(){

         /**
          *        |--参数1：ClassLoader  当前目标对象的类加载器
                   |--参数2：interfaces  目标对象所实的接口的数组
                   |--参数3：InvocationHandler 指派方法调用的调用处理程序
          */
         return Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(), new InvocationHandler() {

              /**
               *            |--参数1：代理对象
                            |--参数2：当去调用方法时传过来的方法相关的信息
                            |--参数3：方法的参数列表
               */
              @Override
              public Object invoke(Object proxy, Method method, Object[] args)
                       throws Throwable {
                   /*System.out.println(proxy);*/
                   System.out.println(method.getName());
//                 System.out.println(args[0]);
                   //调用目标对象的方法
                   before();
                   Object invoke = method.invoke(target, args);
                   after();
                   return invoke;
              }
         });
     }

     /**
      * 前置增强
      */
     public void before(){
         System.out.println("饭前水果");
     }

     /**
      * 后置增强
      */
     public void after(){
         System.out.println("饭后搞一根");

     }
}
```

5. #### 测试  



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3560619303224196.png)

**总结：**

**优点：**有了目标对象，只要通过代理工厂就可以为所有的目标对象去创建代理对象，不用吧显示创建代理类了。

**缺点：**目标对象必须**至少实现一个接口**；代理对象强转时**只能转成目标对象所实现的接口类型**。

**原理：**当调用Proxy.newProxyInstance方法时，系统会在内存里面根据代理对象的类加载器，和目标对象所实现的所有接口去内存中创建一个实现了目标对象所有接口的代理类，并使用这个代理类创建一个代理对象返回给调用者。



---

## 5，动态代理Cglib代理

上面的静态代理和动态代理模式都是要求目标对象是实现一个接口的目标对象,但是有时候目标对象只是一个单独的对象,并没有实现任何的接口,这个时候就可以使用以目标对象子类的方式类实现代理,这种方法就叫做:Cglib代理

Cglib代理,也叫作子类代理,它是在内存中构建一个子类对象从而实现对目标对象功能的扩展.

JDK的动态代理有一个限制,就是使用动态代理的对象必须实现一个或多个接口,如果想目标没有实现接口的类,就可以使用Cglib实现.  

Cglib是一个强大的高性能的代码生成包,它可以在运行期扩展java类与实现java接口.它广泛的被许多AOP的框架使用,例如Spring AOP和synaop,为他们提供方法的interception(拦截)  

Cglib包的底层是通过使用一个小而块的字节码处理框架ASM来转换字节码并生成新的类.不鼓励直接使用ASM,因为它要求你必须对JVM内部结构包括class文件的格式和指令集都很熟悉.  

Cglib子类代理实现方法:  

1.需要引入cglib的jar文件,但是Spring的核心包中已经包括了Cglib功能,所以直接引入spring-core-3.2.5.jar即可.

2.引入功能包后,就可以在内存中动态构建子类

3.代理的类不能为final,否则报错

4.目标对象的方法如果为final/static,那么就不会被拦截,即不会执行目标对象额外的业务方法.

**cglib的实现原理（继承）：在内存中构造一个目标对象的子类对象，返回一个目标对象的子类对象代理对象。**  

**导入jar包**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3df32b80-659e-4aea-a1bc-9b33b3693f85.png)

代码示例:  

目标对象类:UserDao.java

```java
/**
* 目标对象,没有实现任何接口
*/
public class UserDao {

    public void save() {
        System.out.println("----已经保存数据!----");
    }
}
```

Cglib代理工厂:ProxyFactory.java

```java
/**
* Cglib子类代理工厂
* 对UserDao在内存中动态构建一个子类对象
* 实现cglib的MethodInterceptor的接口
*/
public class ProxyFactory implements MethodInterceptor{
    // 维护目标对象
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    // 给目标对象创建一个代理对象
    public Object getProxyInstance(){
        // 1.创建一个子类对象的构造器
        Enhancer en = new Enhancer();
        // 2.设置父类
        en.setSuperclass(target.getClass());
        // 3.设置回调函数，就是当前工厂对象
        en.setCallback(this);
        // 4.在内存中创建子类(代理对象)
        return en.create();
    }
    /**
    * 拦截方法
    * obj：目标对象
    * method：目标对象所调用的方法
    * args：方法参数
    * proxy：方法代理
    **/
    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("开始事务...");
        //执行目标对象的方法
        Object returnValue = method.invoke(target, args);
        System.out.println("提交事务...");
        return returnValue;
    }
}
```

测试类:  



```java
/**
* 测试类
*/
public class App {
    @Test
    public void test(){
        //目标对象
        UserDao target = new UserDao();
        //代理对象
        UserDao proxy = (UserDao)new ProxyFactory(target).getProxyInstance();
        //执行代理对象的方法
        proxy.save();
    }
}
```

总结：

在Spring的AOP编程中：  

* 如果加入容器的目标对象有实现接口，用JDK代理；
* 如果目标对象没有实现接口，用Cglib代理。

# 10-【掌握】普通AOP开发(XML方式)

## 一，AOP开发中的概念

| AOP目的：就是对类里面的方法进行加强。<br>前置加强：在方法执行之前加入相关代码；<br>后置加强：在方法执行之后加入相关代码；<br>环绕加强：前置加强和后置加强；<br>异常加强：在目标方法发生异常时加入相关代码。 |
| ------------------------------------------------------------ |

**1，JoinPoint（连接点）**：所谓连接点是指那些被拦截的点，而spring中这些点就是指方法，因为spring只支持方法类型的连接点。  

**2，PointCut（切入点）**：所谓切入点就是指我们要对那些JoinPoint进行拦截的定义。  

**3，Advice（通知/增强）**：所谓通知/增强，就是指拦截到JoinPoint后需要完成的事情。他分为前置通知/增强，后置通知/增强，异常通知/增强，最终通知/增强，环绕 通知/增强（切面要完成的功能）；

**4，Introduction（引介）**~~：引介是一种特殊的Advice，在不修改代码的前提下，引介可以在运行期为类动态的添加一些方法或Field。~~  

**5，Target（目标）**：代理对象的目标对象（要增强的类）  

**6，Weaving（织入）**：把Advice应用到Target的过程  

**7，Proxy（代理）**：一个类被AOP注入增强后，就产生了一个结果代理类  

**8，Aspect（切面）**：是PointCut和Advice（Introduction）的结合  

            如果com.xingen.service.impl包里面的所有类进行加强，那么com.xingen.service.impl就是切面。  

**9，画图**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5de1616c-828e-4a5e-b767-8e6aae441c8b.png)

---

三，开发和配置步骤  

**1，引入AOP相关jar包**  

    1 导入aop相关jar包  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracbb204ef-1193-4015-b119-8be7e56fbb59.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora341193562.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora341204625.png)

    2 导入aop操作的约束

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    ">
 </beans>
```

**2，编写目标类(核心业务对象)**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4c6f8ef3-33ee-43ae-85b8-40a3367ac45f.png)



**3，前置增强切面类**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora40e150dd-a0b3-4765-94a3-b5b96adaab94.png)

\*\*4，创建applicationContext.xml文件加入约束
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf641bf88-65be-4079-83e9-26cdbd91de9b.png)

\*\*5，目标类配置(实例化)
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora76a58769-d6a7-45a6-ae14-e60a90793c68.png)

\*\*6，增强类型配置(实例化)
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora50ffa245-0489-45ea-a7a8-51e558ade878.png)

\*\*7，AOP配置
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora341928578.png)

\*\*8，编写测试类
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf0515aae-c24f-4f8d-bbe2-a99615215f2b.png)

**9，结果**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora75d765fe-247a-4b3b-a51d-af8f1b7fe500.png)





---

## 三，关于添加类的说明

以上说到是的是前置增强，其它spring还提供了后置增强和环绕增强，异常通知

**1，后置增强**

【1】增强类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora734e52e9-2292-47a5-b7cd-6f3283a04762.png)



【2】增强类的申明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad059ca8c-afa6-4036-851e-0b351a8fba94.png)

【3】AOP配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6ea0a827-32f0-4dd2-a4fa-19b55756e5db.png)

【4】测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2ca26bc9-2baf-48da-afef-a0091d8542a8.png)

【5】结果  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora22984354-340e-45e1-92f3-c6082265ba89.png)

---

\*\*2， 环绕增强
\*\*

【1】增强类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora20c7720e-5e03-4f3a-a83e-cdffda7007cc.png)

【2】增强类的申明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora818266e6-9142-4989-9f50-0e9a8d36f8de.png)

【3】AOP配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracb9aeb8a-5ce5-42ea-a8ed-f29a1c35a308.png)

【4】测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2ca26bc9-2baf-48da-afef-a0091d8542a8.png)

【5】结果  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae2d20766-ee29-40db-8a6f-8d40e88a5fe3.png)

---

**3，异常通知**

【1】增强类  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabebe7088-7c47-4436-ad3b-985b9538e896.png)

【2】增强类的申明  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora76aca0a4-63d6-4d6f-b16b-217da4c85f4d.png)

【3】AOP配置  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6aff57f6-46d2-4b63-81b2-9294704ee1a7.png)

【4】测试  



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2ca26bc9-2baf-48da-afef-a0091d8542a8.png)

【5】结果  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0eca3a1f-f6ea-496f-bd3e-ee043e913e83.png)

# 11-【掌握】使用AspectJ AOP开发(XML方式)

## 一，AspectJ介绍

**1，什么是aspectJ**  

AspectJ是一个基于Java语言的AOP框架，Spring2.0开始引入对AspectJ的支持，AspectJ扩展了Java语言，提供了专门的编译器，在编译时提供了横向代码的注入。  

@AspectJ是AspectJ1.5新增功能，通过JDK1.5注解技术，允许直接在Bean中定义切面  

新版本的Spring中，建议使用AspectJ方式开发AOP

**2，aspectJ开发两种方式**  

    基于xml配置文件方式开发  

    基于注解方式的开发

## 二，开发和配置步骤  

**1，引入AOP相关jar包**  

    1 导入aop相关jar包  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad14fb527-1cfa-412b-a7fd-48e19c253b5f.png)

    2 导入aop操作的约束  



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora372d06c3-ec08-44be-ba77-b318eb412586.png)

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    ">
```

**2，编写目标类(核心业务对象)**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradccfbd72-296f-4e0d-a785-4f8cc55199e7.png)

**3，编写切面类**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae1fc0ade-261a-40ed-a58b-3838e491fab5.png)

\*\*4，创建applicationContext.xml文件
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora563725ad-1a8b-4b3e-9227-ea7e72067dcd.png)

\*\*5，目标类配置(实例化)
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf1089822-9165-4577-ab1f-7f0f4adeef76.png)

**6，增强类型配置(实例化)**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2934a05c-4e2c-47db-bb60-1d4cf30a503a.png)

**7，AOP配置**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeab64cca-6072-4ede-b4c2-65ba5ebf463d.png)

\*\*8，编写测试类
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabddbaee9-481d-433d-a08a-e999b08be1d0.png)

\*\*9， 环绕增强
\*\*

\[1\] 增强类  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradb83ad03-0a1b-4e0d-90b3-e4d456b85dd7.png)

\[2\] 配置文件  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae8cb4ee0-d1aa-41aa-8b57-6564933a23d2.png)

**10， 异常增强**  

【1】\[增强类\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4e40e7c9-9424-4107-9172-47ef504db37a.png)

【2】\[配置文件\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora31446fa7-bea5-4b06-9d4f-ea9d09556d58.png)

注意，配置文件里面的throwing=tx的tx必须和增强类里面的方法参数名一样

# 12-【熟悉】AOP开发(注解方式)

**1，注解配置的好处**

需要自定义切面类，不需要实现任何特定接口，灵活。

不需要在applicationcontext.xml中进行大量配置。

**2，注解的使用**

```java
/***
 * 自定义切面类
 * **/
@Component //将MyAspect纳入spring容器进行实例化
@Aspect //表示该类是个切面类
public class MyAspect {

    /**
     * 前置通知
     * **/
    @Before("execution(* com.bjsxt.service.impl.*.*(..))")
    public void before(){
        System.out.println("前置--------------通知");
    }
    /**
     * 后置通知
     * 入只传入一个参数默认就是切入点，
     * 如果传入多个参数必须指定参数名称
     * **/
    @AfterReturning(pointcut="execution(* com.bjsxt.service.impl.*.*(..))",returning="rv")
    public void after(Object rv){
        System.out.println("后置--------------通知----------"+rv);
    }
    /**
     * 环绕通知
     * **/
    @Around("execution(* com.bjsxt.service.impl.*.*(..))")
    public Object around(ProceedingJoinPoint jp){

        try{
            System.out.println("环绕前========"+new Date());
            //调用目标对象的方法
            Object rv=jp.proceed();  //method.invoke(obj, args)

            System.out.println("环绕后========"+new Date());
            return rv;
        }catch(Throwable ex){
            ex.printStackTrace();
        }
        return null;



    }
    /**
     * 异常通知
     * **/
    @AfterThrowing(pointcut="execution(* com.bjsxt.service.impl.*.*(..))",throwing="tr")
    public void expt(Throwable tr){

        System.out.println("异常通知============"+tr.getMessage());

    }


```

applicationContext.xml开启aop的自动代理

# 13-【了解】Spring-JdbcTemplate

## 一、Spring对不同的持久化【ORM】支持

Spring为各种支持的持久化技术，都提供了简单操作的模板和回调

| ORM持久化技术   | 模板类                                               |
| --------------- | ---------------------------------------------------- |
| JDBC            | org.springframework.jdbc.core.JdbcTemplate           |
| Hibernate5.0    | Org.springframework.orm.hibernate5.HibernateTemplate |
| ibatis(MyBatis) | org.springframework.orm.ibatis.sqlMapClientTemplate  |
| JPA             | org.springframework.orm.jpa.JpaTemplate              |

其实Spring的JDBCTemplate有点像DBUtils，但是有时候还没有DBUitls好用。这里来学习一下使用Spring的JDBCTemplate来玩一下CRUD。

## 二、使用JdbcTemplate需要的jar包

在这里使用Spring的JDBCTemplate的时候先要把轮子拿过来

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.34924664915044445.png)

除此之外，在Java中操作数据库怎么能不要对应的驱动包呢：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6998601647982572.png)

## 三、JdbcTemplate使用的基本步骤

然后再看看Spring的JDBCTemplate的使用大体步骤

① 第一步 创建对象设置数据库的信息

② 第二步 创建jdbcTemplate对象，设置数据源

③ 第三步 调用jdbcTemplate对象中的方法

这里有一个小例子：

```java
public class TestJDBCTemplate {

    @Test
    public void test01() {
        // JDBC模板依赖于连接池来获得数据的连接，所以必须先要构造连接池
        // 1、创建数据源对象
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        // 2、设置连接参数 driver   url    username     password
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");// 驱动名称driver
        dataSource.setUrl("jdbc:mysql://localhost:3306/sss");// url
        dataSource.setUsername("root");// username
        dataSource.setPassword("123456");// password
        // 3、创建JdbcTemplate
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        jdbcTemplate.setDataSource(dataSource);// 这里也可以使用构造方法
        // 4、创建sql语句
        String sql = "select count(*)  from t_classes";
        Long num = (long) jdbcTemplate.queryForObject(sql, Long.class);
        System.out.println(num);
    }
}
```

| jdbcTemplate相关方法说明：<br>    update：添加/修改i/删除<br>    queryForObject：查询单个对象（即数据库的一列）<br>    queryList：查询返回一个集合<br>    query |
| ------------------------------------------------------------ |

## 四、使用IOC和DI去完成上面的程序

其实这个例子本身没有什么的，只是演示了一下，其实在学Spring之后，感觉应该形成一种习惯，在new对象的时候我要想到IOC，在使用Set方法的时候，我要想到DI。切面编程我们应该想到用AOP的。这里可以在Spring中配置如下的引用链：

1\. 我要有DataSource，DataSource的属性可以通过注入数据库的一些配置属性添加

2\. 我要有JdbcTemplate，而Template依赖与DataSource，我要以ref的方式为我的JdbcTemplate注入引用

3\. 有了JdbcTemplate之后，我要有Dao，此时我应该在Dao添加一个JdbcTemplate的成员，然后以ref的方式将JdbcTemplate引入到Dao中

4\. 我在Action或者是Servlet中都会调用的是Serivce，所以，我在Serivce中要添加一个Dao作为成员，然后由ref在注入Dao到Service中

DataSource --> JdbcTemplate --> Dao --> Service --> Action/Servlet

"-->"表示将左边的对象注入到右边的对象当中

配置文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 导入约束xsd -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    ">
    <!-- IOC和DI的注解扫描 -->
      <context:component-scan base-package="com.sxt.dao.impl,com.sxt.service.impl" ></context:component-scan>
      <!-- 打开AOP的注解 -->
      <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

      <!-- 声明数据源 -->
      <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" >
          <!-- 注入相关属性 -->
          <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/sss"></property>
          <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
          <property name="user" value="root"></property>
          <property name="password" value="123456"></property>
      </bean>

      <!-- 声明JdbcTempleate -->
      <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
          <!-- 注入数据源 -->
          <property name="dataSource" ref="dataSource"></property>
      </bean>

       <bean id="userDaoImpl" class="com.sxt.dao.impl.UserDAOImpl">
          <property name="jdbcTemplate" ref="jdbcTemplate"></property>
     </bean>

      <bean id="userService" class="com.sxt.service.impl.UserServiceImpl">
         <property name="userDAO" ref="userDaoImpl"></property>
     </bean>

</beans>
```

中配置的数据源是C3P0的数据源，还要导入C3P0的包  



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08477066458736693.png)

其中dataSource和jdbcTemplate都是直接配置的，不用写啥。

然后是UserDAOImpl.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab62e9c9b-bc67-44ff-a901-f9e2afde2e15.png)

UserServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae846299a-583b-441f-bbd8-56c219dcae06.png)



测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab70ad30f-8230-42f8-ae2f-323a17de225f.png)

---

五、使用IOC和DI去完成上面的程序【注解方式】  



1,applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 导入约束xsd -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    ">
      <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource" >
          <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/sss"></property>
          <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
          <property name="user" value="root"></property>
          <property name="password" value="123456"></property>
      </bean>

      <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
          <property name="dataSource" ref="dataSource"></property>
      </bean>

        <!-- IOC和DI的注解扫描 -->
      <context:component-scan base-package="com.sxt.dao.impl,com.sxt.service.impl,com.sxt.action" ></context:component-scan>
      <!-- 打开AOP的注解 -->
      <aop:aspectj-autoproxy></aop:aspectj-autoproxy>

</beans>
```

2,UserDAOImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraefb57876-3a75-4163-bb98-bdccba31f1d0.png)

3,UserServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab30ebd0e-19da-482b-b99c-3a1682eb36ca.png)

4,测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradf07ad0a-b01d-476e-b5c7-f0be6fd7a823.png)

## **六、JdbcTemplate的CRUD方法**

1\. 插入数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa518efe1-c505-4897-bb41-cc7be89e5508.png)

如上，插入代码用的是update方法，其实增删改用的都是update方法，而查询则是和query相关的方法。

2\. 删除操作

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7a875e58-1a80-4716-ae0e-2e603db01964.png)

3\. 修改操作  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6424ade8-55b8-4c33-9101-a088a4538c78.png)

4\. 查询操作

上面三个都比较简单，查询倒是有些复杂。在使用比较基础的持久化工具的时候，比如DBUtils都会针对查询结果给我们提供一些封装的接口和类，但是JdbcTemplate只给我们提供了接口，并没有可用的类，所以我们需要自己写实现类来进行封装。这里会学习使用JdbcTemplate进行三种查询操作：

4.a. 查询表的记录数

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3322876695213064.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora35c39d04-eee0-49e3-b29c-faf694e82872.png)

4.b. 查询返回对象  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5790096298104477.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3a8eab20-95fb-41c3-819e-341121ea3273.png)

4.c. 查询并返回List集合

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6915923485797442.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf2d24305-9870-4cf3-b78b-48433ea37b1f.png)

# 14-【掌握】spring定时任务

**一，定时任务概述**

1、Quartz介绍

　　在企业应用中，我们经常会碰到时间任务调度的需求，比如每天凌晨生成前天报表，每小时生成一次汇总数据等等。Quartz是出了名的任务调度框架,它可以与J2SE和J2EE应用程序相结合，功能灰常强大，轻轻松松就能与Spring集成，使用方便。

2、Quartz中的概念

　　主要有三个核心概念：调度器、任务和触发器。三者关系简单来说就是，调度器负责调度各个任务，到了某个时刻或者过了一定时间，触发器触动了，特定任务便启动执行。概念相对应的类和接口有：

　　1）JobDetail：望文生义就是描述任务的相关情况；

　　2）Trigger：描述出发Job执行的时间触发规则。有SimpleTrigger和CronTrigger两个子类代表两种方式，一种是每隔多少分钟小时执行，则用SimpleTrigger；另一种是日历相关的重复时间间隔，如每天凌晨，每周星期一运行的话，通过Cron表达式便可定义出复杂的调度方案。

　　3）Scheduler：代表一个Quartz的独立运行容器，Trigger和JobDetail要注册到Scheduler中才会生效，也就是让调度器知道有哪些触发器和任务，才能进行按规则进行调度任务。

---

**二，xml配置JobDteail通过JobDetailBean实现【熟悉】**  

**1，创建项目并导包**

![image](C:/Users/18364/Downloads/images/eb9ed424-1874-4222-adb8-5cbea53d96fb.png)



**2，创建MyJob**

```java
public class MyJob {
    public void execute() {
        System.out.println("Quartz Spring XML 配置 - MyJob");
    }
}

```

**3，配置a\*\*pplicationContext**.xml\*\*

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 头文件 -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 配置Job类 -->
    <bean id="myJob" class="com.sxt.job.MyJob"></bean>

    <!-- 配置JobDetail -->
    <bean id="springQtzJobMethod"
        class="org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean">
        <!-- 执行目标job -->
        <property name="targetObject" ref="myJob"></property>
        <!-- 要执行的方法 -->
        <property name="targetMethod" value="execute"></property>
    </bean>

    <!-- 配置tirgger触发器 -->
    <bean id="cronTriggerFactoryBean"
        class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
        <!-- jobDetail -->
        <property name="jobDetail" ref="springQtzJobMethod"></property>
        <!-- cron表达式，执行时间 每5秒执行一次 -->
        <property name="cronExpression" value="0/5 * * * * ?"></property>
    </bean>

    <!-- 配置调度工厂 -->
    <bean id="springJobSchedulerFactoryBean"
        class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <ref bean="cronTriggerFactoryBean"></ref>
            </list>
        </property>

    </bean>
</beans>
```

**4，测试**  

```java
public class SpringQuartzXmlTest {
    public static void main(String[] args) {
        // 启动Spring 容器
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
                "classpath:applicationContext.xml");
        System.out.println("initContext successfully");
    }
}
```

---

**三，xml配置JobDteail通过MethodInvokeJobDetailFactoryBean实现(推荐)**  

**1，创建M\*\*\*\*yJob**

```java
public class MyJob extends QuartzJobBean {

    @Override
    protected void executeInternal(JobExecutionContext ctx)
            throws JobExecutionException {
        System.out.println("Spring 集成 Quartz 的第二种方式");
    }

}
```

**2，配置applicationCo\*\*\*\*ntext.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 头文件 -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 配置JobDetail -->
     <bean id="jobDetail" class="org.springframework.scheduling.quartz.JobDetailFactoryBean">
        <property name="jobClass" value="com.sxt.job.MyJob"></property>
        <property name="durability" value="true"></property>
    </bean>

    <!-- 配置tirgger触发器 -->
    <bean id="cronTriggerFactoryBean" class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
        <!-- jobDetail -->
        <property name="jobDetail" ref="jobDetail"></property>
        <!-- cron表达式，执行时间  每5秒执行一次 -->
        <property name="cronExpression" value="0/5 * * * * ?"></property>
    </bean>
    <!-- 配置调度工厂 如果将lazy-init='false'那么容器启动就会执行调度程序 -->
    <bean id="springJobSchedulerFactoryBean" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="triggers">
            <list>
                <ref bean="cronTriggerFactoryBean"></ref>
            </list>
        </property>
    </bean>
</beans>
```

**3，测试**

```java
public class SpringQuartzXmlTest {
    public static void main(String[] args) {
        // 启动Spring 容器
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
                "classpath:applicationContext.xml");
        System.out.println("initContext successfully");
    }
}

```

---

**四，注解配置【掌握】最简单**

注意两点

1，任务扫描

[task:annotation-driven/](task:annotation-driven/)  

2，包的扫描

      <context:component-scan base-package="com.sxt.job"/>

**1，创建MyJob并加注解**

```java
@Component
public class MyJob  {

    /**
     * 每5秒运行一次
     */
    @Scheduled(cron="0/5 * * * * ?")
    protected void doWork() {
        System.out.println("Spring 集成 Quartz 的第三种方式");
    }

}
```

**2，配置applicationContext.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 头文件 -->
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"
    xmlns:task="http://www.springframework.org/schema/task"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/task 
        http://www.springframework.org/schema/task/spring-task.xsd">
    <!-- 自动扫描 -->
    <context:component-scan base-package="com.sxt.job"></context:component-scan>
    <!-- 加载定时任务 -->
    <task:annotation-driven />
</beans>
```

**3，测试**

```java
public class SpringQuartzXmlTest {
    public static void main(String[] args) {
        // 启动Spring 容器
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(
                "classpath:applicationContext.xml");
        System.out.println("initContext successfully");
    }
}

```

**五，关于表达式的说明**  

[http://cron.qqe2.com/](http://cron.qqe2.com/)  可以使用这个去网上在线生成

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7bbfca66-81e4-4435-8f42-4771fa537ad1.png)

**六，关于笔记的说明**

些笔记是使用的导包的方式，没有使用maven来管理。所以要使用maven的话可以使用以下的地址

还有些其它包自己去maven库里面去找

```xml
<dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring.version}</version>
</dependency>

<dependency>
            <groupId>org.quartz-scheduler</groupId>
            <artifactId>quartz</artifactId>
            <version>2.2.3</version> 
</dependency>
```

# 15-【掌握】spring声明式事务SH集成

**一，开发中事务的分类**

    1，编程式事务  

        将事务控制的代码入侵到我们核心对象的代码中，如在hibernate 里面配置session.beginTreanaction() session.commit()  

    2，声明式事务  

        只需要在spring的配置文件中，进行事务声明，声明将哪些方法加入事务环境进行执行

---

**二，为什么要使用声明式事务**

大多数Spring用户选择声明式事务管理的原因是，这个是对应用代码影响最小的选择，使用aop的特点在某个方法执行前开启事务，结束时提交事务，因此也最符合 非侵

入式 轻量级容器的理念。

1，Spring声明式事务管理可以在任何环境下使用。只需更改配置文件， 它就可以和JDBC、JDO、Hibernate或其他的事务机制一起工作。

2，Spring的声明式事务管理可以被应用到任何类（以及那个类的实例）上。

3，Spring提供了声明式的回滚规则。

4，Spring允许你通过AOP定制事务行为。（例如，如果需要，你可以在事务回滚中插入定制的行为。 你也可以增加任意的通知，就象事务通知一样。）。

5，Spring不提供高端应用服务器提供的跨越远程调用的事务上下文传播。如果你需要这些特性，我们推荐你使用EJB。 然而，不要轻易使用这些特性。因为通常我们并不希 望事务跨越远程调用。

---

**三，Spring是如何实现声明式事务的**

Spring的事务管理是通过AOP代理实现的。 其中的事务通知由元数据（目前基于XML或注解）驱动。

代理对象与事务元数据结合产生了一个AOP代理，它使用一个PlatformTransactionManager 接口配合事务拦截器，在方法调用前后实施事务。

从概念上来说，在事务代理上调用方法的工作过程看起来像这样：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.21788591611114239.png)

  



---

**四，使用spring +hibrenate 完成声明式事务的配置**

1，创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora16ddeb0f-bd35-4247-b3bc-9198146e729d.png)

2，导入jar包

    1，spring jar包  

    2，hibernate jar包  

    3，mysql  jar包  

    4，c3p0的jar包  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5e2e4f36-7533-4397-b91b-c3d6514ab166.png)

3，创建User.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae6f10694-2370-4683-8ffe-0b4fe412f94c.png)

4，创建User.hbm.xm

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 导入xml文件约束 -->
<!DOCTYPE hibernate-mapping PUBLIC 
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
<hibernate-mapping package="com.sxt.po">
    <class name="User" table="user">
        <id name="id" column="id" type="java.lang.Integer">
            <generator class="native"></generator>
        </id>
        <!-- 描述其他简单类型属性：基本类型和对应包装类型以及String -->
        <property name="name" column="name" type="java.lang.String"></property>
        <property name="address" column="address" type="java.lang.String"></property>
    </class>
</hibernate-mapping>
```

5，创建UserDAO.java

```java
public interface UserDAO {
    void add(User user);
    void update(User user);
    void delete(User user);
    List<User> query();
    User queryById(User user);
}
```

6，创建UserDAOImpl.java

```java
/**
 * 这里继承了HibernateDaoSupport
 * @author Arvin
 *
 */
public class UserDAOImpl extends HibernateDaoSupport implements UserDAO {
    @Override
    public void add(User user) {
        this.getHibernateTemplate().save(user);
    }
    @Override
    public void update(User user) {
        this.getHibernateTemplate().update(user);
    }

    @Override
    public void delete(User user) {
        this.getHibernateTemplate().delete(user);
    }

    @Override
    public List<User> query() {
        return (List<User>) this.getHibernateTemplate().find(" from User", null);
    }
    @Override
    public User queryById(User user) {
        return this.getHibernateTemplate().get(User.class, user.getId());
    }
}
```

7，创建UserService.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraae6f2531-3e10-4d8e-9538-4f5519b990ec.png)

8，创建UserServiceImpl.java

```java
public class UserServiceImpl implements UserService{

    private UserDAO userDAO;

    @Override
    public void add(User user) {
        userDAO.add(user);
    }

    @Override
    public void update(User user) {
        userDAO.update(user);
    }

    @Override
    public void delete(User user) {
        userDAO.delete(user);
    }

    @Override
    public List<User> query() {
        return userDAO.query();
    }

    @Override
    public User queryById(User user) {
        return userDAO.queryById(user);
    }

    public UserDAO getUserDAO() {
        return userDAO;
    }

    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }


}
```

9，创建hibernate.cfg.xml

```xml
注意中这里面没有配置数据源，数据源我们通过c3p0去配置
<?xml version="1.0" encoding="UTF-8"?>
<!-- 导入hibernate的约束 -->
<!DOCTYPE hibernate-configuration PUBLIC
    "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="dialect">
            org.hibernate.dialect.MySQLDialect
        </property>
        <property name="hbm2ddl.auto">update</property>
        <!-- 在控制台打印sql语句 -->
        <property name="show_sql">true</property>
        <!-- 在控制台打印sql语句的时候进行格式化 -->
        <property name="format_sql">true</property>
        <!-- 在主配置文件中加载映射文件 -->
        <mapping resource="com/sxt/po/User.hbm.xml" />
    </session-factory>
</hibernate-configuration>

```

10，创建applicationContext.xml

    ①导入约束  



```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd
    ">

<beans>
```

    ②配置c3p0的数据源  

```xml
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/sss"></property>
        <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
        <property name="user" value="root"></property>
        <property name="password" value="123456"></property>
    </bean>
```

    ③实例化sessionFactory  

    ④配置声明式事务之实例化事务管理器  



    ⑤配置事务切面  



    ⑥AOP配置  

```xml
<aop:config>
        <aop:pointcut expression="execution(* com.sxt.service.impl.*.*(..))"
            id="pc" />
        <!-- 进行织入操作 -->
        <aop:advisor advice-ref="txAdvice" pointcut-ref="pc" />
    </aop:config>
```

    ⑦实例化UserDAO和UserService  



11，创建Test测试



```java
    public static void main(String[] args) {
        ApplicationContext ac = new ClassPathXmlApplicationContext(
                "applicationContext.xml");
        // 获得代理对象
        // 获得业务层对象
        UserService userService = (UserService) ac.getBean("userService");
        userService.add(new User("胡丹丹", "中国武汉"));
    }
```

---

---

写在后面的话，如果不要hibernate.cfg.xml的sessionFactory的配置方法

```xml
<bean id="sessionFactory"
        class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
        <property name="dataSource" ref="dataSource"></property>
        <property name="mappingLocations">
            <list>
       <value>classpath:com/sxt/po/*.hbm.xml</value>
            </list>
        </property>
        <property name="hibernateProperties">
            <props>
                <prop key="hibernate.dialect">org.hibernate.dialect.MySQL5Dialect</prop>
                <prop key="hibernate.hbm2ddl.auto">update</prop>
                <prop key="hibernate.show_sql">true</prop>
                <prop key="hibernate.format_sql">true</prop>
            </props>
        </property>
    </bean>
```

# 16-【掌握】spring声明度事务SM集成

# 17-spring的声明式事务

## 一、spring的声明式事务

## 1.开发中的事务分类

         1，编程式事务

                         |---mybtais

                                  |--1，得到sqlSession

                                  |--2，调用mybtais.的api

                                  |--3，提交事务

                                  |--4，关闭session

        2，声明式事务

                                  |--daoIMPL只管调用mybtais的api

                                  |--其它的都使用aop去切入

## 2.为什么要使用声明式事务

大多数Spring用户选择声明式事务管理的原因是，这个是对应用代码影响最小的选择，使用aop的特点在某个方法执行前开启事务，结束时提交事务，因此也最符合 非侵

入式 轻量级容器的理念。

1，Spring声明式事务管理可以在任何环境下使用。只需更改配置文件， 它就可以和JDBC、JDO、Hibernate或其他的事务机制一起工作。

2，Spring的声明式事务管理可以被应用到任何类（以及那个类的实例）上。

3，Spring提供了声明式的回滚规则。

4，Spring允许你通过AOP定制事务行为。（例如，如果需要，你可以在事务回滚中插入定制的行为。 你也可以增加任意的通知，就象事务通知一样。）

## 3.spring是如何实现声明式事务的

使用AOP去实现的

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8869886945257922.png)

# 18-spring和hibernate的集成【熟悉】

## 一、spring和hibernate的集成【熟悉】

## 使用HiberateTemplete1.      创建项目和包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5679999353383595.png)

## 2.导包

        hibernate

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8532361660444443.png)

        spring

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.33507260236502956.png)

        mysql

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5562045634503975.png)

## 3.创建hibernate.cfg.xml

因为数据源交给spring了，所在里面不用配置数据库的连接信息

| <hibernate-configuration><br>    <session-factory><br>           <!--<br>           配置hibernate的方言<br>           hibernate会根据当前数据库环境的需要，将普通话翻译为方言(每种数据库之间的差异)<br>           hibernate可以操作任何一中数据库，我们不需要考虑数据库之间的差异<br>           hibernate会自动根据当前数据库，生成数据库对应的方言（sql）<br>           方言可以满足，hibernate程序在不同数据库之间移植<br>         --><br>        <property name=\_"dialect"\_>org.hibernate.dialect.MySQLDialect</property><br>        <!--<br>           配置hibernate的正向工程<br>           类表<br>           正向工程：有java类自动生成数据库表（学习，hibernate提倡的是正向工程）<br>           反向工程：由数据库表自动生成java类（实际）<br>           hbm2ddl:  由hiberante的映射文件生成对的ddl语句，创建数据库表<br>           update:如果数据库没有java类对应的表，就自动创建，如果有检查类是否和表一致，<br>                  如果不一致自动新  <br>        --><br>        <property name=\_"hbm2ddl.auto"\_>update</property><br>        <br>        <property name=\_"show\_sql"\_>true</property><br>        <br>        <br>        <br>        <mapping resource=\_"com/sxt/pojo/User.hbm.xml"\_/><br>    </session-factory><br></hibernate-configuration> |
| ------------------------------------------------------------ |

## 4.创建User

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6345086225413678.png)

## 5.创建User.hbm.xml

| <hibernate-mapping package=\_"com.sxt.pojo"\_><br>    <class name=\_"User"\_ table=\_"sys\_user"\_><br>        <id name=\_"id"\_ column=\_"id"\_type=\_"java.lang.Integer"\_><br>           <generator class=\_"native"\_></generator><br>        </id><br>        <property name=\_"name"\_ column=\_"name"\_type=\_"java.lang.String"\_></property><br>        <property name=\_"age"\_ column=\_"age"\_type=\_"java.lang.Integer"\_></property><br>        <property name=\_"address"\_ column=\_"address"\_type=\_"java.lang.String"\_></property><br>        <property name=\_"createtime"\_ column=\_"createtime"\_ type=\_"java.util.Date"\_><br>        </property><br>    </class><br></hibernate-mapping> |
| ------------------------------------------------------------ |

## 6.创建UserDAO

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7164876057384245.png)

## 7.创建UserDAOImpl

| **public** **class** UserDAOImpl **implements** UserDAO{<br>    **private** HibernateTemplate hibernateTemplate;<br>    **public** **void** setHibernateTemplate(HibernateTemplate hibernateTemplate) {<br>        **this**.hibernateTemplate = hibernateTemplate;<br>    }<br>    @Override<br>    **public** Integer addUser(User user) {<br>        **return** (Integer) hibernateTemplate.save(user);<br>    }<br>    @Override<br>    **public** Integer updateUser(User user) {<br>        hibernateTemplate.update(user);<br>        **return** 1;<br>    }<br>    @Override<br>    **public** Integer deleteUser(Integer id) {<br>        User user=**new** User();<br>        user.setId(id);<br>        hibernateTemplate.delete(user);<br>        **return** 1;<br>    }<br>    @SuppressWarnings("unchecked")<br>    @Override<br>    **public** List queryAllUsers() {<br>        String hql="from User ";<br>        **return** (List) hibernateTemplate.find(hql);<br>    }<br>    @Override<br>    **public** User queryUserById(Integer id) {<br>        **return** hibernateTemplate.get(User.**class**, id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 8.创建UserService

| **public** **interface** UserService {<br>    /\*\*<br>     \* 添加<br>     \*/<br>    **public** Integer addUser(User user);<br>    /\*\*<br>     \* 修改<br>     \*/<br>    **public** Integer updateUser(User user);<br>    /\*\*<br>     \* 删除<br>     \*/<br>    **public** Integer deleteUser(Integer id);<br>    /\*\*<br>     \* 全查询<br>     \*/<br>    **public** List queryAllUsers();<br>    /\*\*<br>     \* 查询一个<br>     \*/<br>    **public** User queryUserById(Integer id);<br>} |
| ------------------------------------------------------------ |

## 9.创建UserServiceImpl

| **public** **class** UserServiceImpl **implements** UserService{<br>    **private** UserDAO userDAO;<br>    **public** **void** setUserDAO(UserDAO userDAO) {<br>        **this**.userDAO = userDAO;<br>    }<br>    @Override<br>    **public** Integer addUser(User user) {<br>        **return** userDAO.addUser(user);<br>    }<br>    @Override<br>    **public** Integer updateUser(User user) {<br>        **return** **this**.userDAO.updateUser(user);<br>    }<br>    @Override<br>    **public** Integer deleteUser(Integer id) {<br>        **return** userDAO.deleteUser(id);<br>    }<br>    @Override<br>    **public** List queryAllUsers() {<br>        **return** userDAO.queryAllUsers();<br>    }<br>    @Override<br>    **public** User queryUserById(Integer id) {<br>        **return** userDAO.queryUserById(id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 10.创建UserAction

| **public** **class** UserAction {<br>    **private** UserService userService;<br>    **public** **void** setUserService(UserService userService) {<br>        **this**.userService = userService;<br>    }<br>    **public** **void** addUser(User user) {<br>        userService.addUser(user);<br>    }<br>    **public** Integer updateUser(User user) {<br>        **return** **this**.userService.updateUser(user);<br>    }<br>    **public** Integer deleteUser(Integer id) {<br>        **return** userService.deleteUser(id);<br>    }<br>    **public** List queryAllUsers() {<br>        **return** userService.queryAllUsers();<br>    }<br>    **public** User queryUserById(Integer id) {<br>        **return** userService.queryUserById(id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 11.创建applicationContext.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>    xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>    xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>    <br>    <bean id=\_"dataSource"\_class=\_"org.springframework.jdbc.datasource.DriverManagerDataSource"\_><br>        <property name=\_"driverClassName"\_value=\_"com.mysql.jdbc.Driver"\_></property><br>        <property name=\_"url"\_value=\_"jdbc:mysql://127.0.0.1:3306/0412user"\_></property><br>        <property name=\_"username"\_value=\_"root"\_></property><br>        <property name=\_"password"\_value=\_"123456"\_></property><br>    </bean><br>    <br>    <br>    <bean id=\_"sessionFactory"\_class=\_"org.springframework.orm.hibernate4.LocalSessionFactoryBean"\_><br>        <property name=\_"dataSource"\_ref=\_"dataSource"\_ ></property><br>        <property name=\_"configLocation"\_value=\_"classpath:hibernate.cfg.xml"\_></property><br>    </bean><br>    <br>    <bean id=\_"hibernateTemplate"\_class=\_"org.springframework.orm.hibernate4.HibernateTemplate"\_><br>        <br>        <property name=\_"sessionFactory"\_ref=\_"sessionFactory"\_></property><br>    </bean><br>    <br>    <br>    <bean id=\_"transactionManager"\_class=\_"org.springframework.orm.hibernate4.HibernateTransactionManager"\_><br>        <property name=\_"dataSource"\_ref=\_"dataSource"\_></property><br>        <property name=\_"sessionFactory"\_ref=\_"sessionFactory"\_></property><br>    </bean><br>    <br>    <tx:advice id=\_"txAdvise"\_transaction-manager=\_"transactionManager"\_><br>        [tx:attributes\\](tx:attributes\)<br>             <br>             <tx:method name=\_"add\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"save\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"delete\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"del\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"update\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"load\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"get\*"\_propagation=\_"REQUIRED"\_/><br>             <tx:method name=\_"find\*"\_read-only=\_"true"\_/><br>             <tx:method name=\_"\*"\_read-only=\_"true"\_/><br>        </tx:attributes><br>    </tx:advice><br>    <br>    [aop:config\\](aop:config\)<br>             <br>        <aop:pointcut expression=\_"execution(\* com.sxt.service.impl.\*.\*(..))"\_id=\_"pc1"\_/><br>        <br>        <aop:advisor advice-ref=\_"txAdvise"\_pointcut-ref=\_"pc1"\_/><br>        <br>    </aop:config><br>    <br>    <bean id=\_"userDAO"\_class=\_"com.sxt.dao.impl.UserDAOImpl"\_><br>        <property name=\_"hibernateTemplate"\_ref=\_"hibernateTemplate"\_></property><br>    </bean><br>    <br>    <bean id=\_"userService"\_class=\_"com.sxt.service.impl.UserServiceImpl"\_><br>        <property name=\_"userDAO"\_ref=\_"userDAO"\_></property><br>    </bean><br>    <br>    <bean id=\_"userAction"\_class=\_"com.sxt.action.UserAction"\_><br>        <property name=\_"userService"\_ref=\_"userService"\_></property><br>    </bean><br></beans> |
| ------------------------------------------------------------ |

## 12.测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1606132477011943.png)

# 19-spring和hibernate的集成【熟悉】

## 一、spring和hibernate的集成【熟悉】

## HibernateSupport

## 1.修改UserDAOImpl

| **public** **class** UserDAOImpl **extends** HibernateDaoSupport **implements** UserDAO{<br>    @Override<br>    **public** Integer addUser(User user) {<br>        **return** (Integer) **this**.getHibernateTemplate().save(user);<br>    }<br>    @Override<br>    **public** Integer updateUser(User user) {<br>        **this**.getHibernateTemplate().update(user);<br>        **return** 1;<br>    }<br>    @Override<br>    **public** Integer deleteUser(Integer id) {<br>        User user=**new** User();<br>        user.setId(id);<br>        **this**.getHibernateTemplate().delete(user);<br>        **return** 1;<br>    }<br>    @SuppressWarnings("unchecked")<br>    @Override<br>    **public** List queryAllUsers() {<br>        String hql="from User ";<br>        **return** (List) **this**.getHibernateTemplate().find(hql);<br>    }<br>    @Override<br>    **public** User queryUserById(Integer id) {<br>        **return** **this**.getHibernateTemplate().get(User.**class**, id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 2.修改applicationContext.xml

去掉hibernateTemplete的声明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10123138925702069.png)

## 3.声明式事务的重点说明

| <br>     <bean id=\_"transactionManager"\_class=\_"org.springframework.orm.hibernate4.HibernateTransactionManager"\_><br>         <property name=\_"sessionFactory"\_ref=\_"sessionFactory"\_></property><br>     </bean><br>     <br>     <tx:advice id=\_"txAdvise"\_transaction-manager=\_"transactionManager"\_><br>         [tx:attributes\\](tx:attributes\)<br>              <br>              <tx:method name=\_"add\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"save\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"delete\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"del\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"update\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"load\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"get\*"\_propagation=\_"REQUIRED"\_/><br>              <tx:method name=\_"find\*"\_read-only=\_"true"\_/><br>              <tx:method name=\_"\*"\_read-only=\_"true"\_/><br>         </tx:attributes><br>     </tx:advice><br>     <br>     [aop:config\\](aop:config\)<br>              <br>         <aop:pointcut expression=\_"execution(\* com.sxt.service.impl.\*.\*(..))"\_ id=\_"pc1"\_/><br>         <br>         <aop:advisor advice-ref=\_"txAdvise"\_pointcut-ref=\_"pc1"\_/><br>         <br>     </aop:config> |
| ------------------------------------------------------------ |

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8393353356940948.png)

# 20-spring和hibernate的注解集成【熟悉】

## 一、spring和hibernate的注解集成【熟悉】

## hibernateTemplete的方式1.      修改UserDAOImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7100450434938582.png)

## 2.修改UserServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.49471739609015447.png)

## 3.修改UserAction

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7601357907568255.png)

## 4.创建application-dao.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>     xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>     xmlns:context=*"http://www.springframework.org/schema/context"*<br>     xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>     xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>     xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>     *http://www.springframework.org/schema/context/spring-context.xsd*<br>         *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>         *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>     <br>     <bean id=\_"dataSource"\_class=\_"org.springframework.jdbc.datasource.DriverManagerDataSource"\_><br>         <property name=\_"driverClassName"\_value=\_"com.mysql.jdbc.Driver"\_></property><br>         <property name=\_"url"\_value=\_"jdbc:mysql://127.0.0.1:3306/0412user"\_></property><br>         <property name=\_"username"\_value=\_"root"\_></property><br>         <property name=\_"password"\_value=\_"123456"\_></property><br>     </bean><br>     <br>     <br>     <bean id=\_"sessionFactory"\_class=\_"org.springframework.orm.hibernate4.LocalSessionFactoryBean"\_><br>         <property name=\_"dataSource"\_ref=\_"dataSource"\_ ></property><br>         <property name=\_"configLocation"\_value=\_"classpath:hibernate.cfg.xml"\_></property><br>     </bean><br>     <br>     <bean id=\_"hibernateTemplate"\_class=\_"org.springframework.orm.hibernate4.HibernateTemplate"\_><br>         <br>         <property name=\_"sessionFactory"\_ref=\_"sessionFactory"\_></property><br>     </bean><br>     <br>     <context:component-scan base-package=\_"com.sxt.dao.impl"\_></context:component-scan><br></beans> |
| ------------------------------------------------------------ |

## 5.创建application-service.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"xmlns:context="http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"xmlns:tx="http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>        *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>    <br>    <context:component-scan base-package=\_"com.sxt.service.impl"\_></context:component-scan><br>    <br>    <br>    <bean id=*"transactionManager"*<br>        class=\_"org.springframework.orm.hibernate4.HibernateTransactionManager"\_><br>        <property name=\_"sessionFactory"\_ref=\_"sessionFactory"\_></property><br>    </bean><br>    <br>    <tx:advice id=\_"txAdvise"\_transaction-manager=\_"transactionManager"\_><br>        [tx:attributes\\](tx:attributes\)<br>             <br>             <tx:method name=\_"add\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"save\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"delete\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"del\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"update\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"load\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"get\*"\_propagation=\_"REQUIRED"\_ /><br>             <tx:method name=\_"find\*"\_read-only=\_"true"\_ /><br>             <tx:method name=\_"\*"\_read-only=\_"true"\_ /><br>        </tx:attributes><br>    </tx:advice><br>    <br>    [aop:config\\](aop:config\)<br>        <br>        <aop:pointcut expression=*"execution(\* com.sxt.service.impl.\*.\*(..))"*<br>             id=*"pc1"* /><br>        <!-- <aop:pointcut expression="execution(\* com.bjsxt.service.impl.\*.\*(..))"<br>             id="pc2"/> --><br>        <aop:advisor advice-ref=\_"txAdvise"\_pointcut-ref=\_"pc1"\_ /><br>        <br>    </aop:config><br></beans> |
| ------------------------------------------------------------ |

## 6.创建application-action.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>    xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>    xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>        <context:component-scan base-package=\_"com.sxt.action"\_></context:component-scan><br></beans> |
| ------------------------------------------------------------ |

## 7.修改applicationContext.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>    xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>    xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>    <import resource=\_"classpath:application-dao.xml"\_/><br>    <import resource=\_"classpath:application-service.xml"\_/><br>    <import resource=\_"classpath:application-action.xml"\_/><br></beans> |
| ------------------------------------------------------------ |

## 8.测试

# 21-spring和hibernate的注解集成【熟悉】

## 一、spring和hibernate的注解集成【熟悉】

## 使用HibernateSupport

### 在17\_spring\_hibernate\_anntation基础上修改UserDAOImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.36110299930672773.png)

因为在dao里面要注入sessionFactory 而HibernateDaoSupport里面的setSessionFactory方法是final的方法不能被重写，。所以使用上面的方法去注入sessinFactory

# 22-spring和mybtais的集成【重点】

## 一、spring和mybtais的集成【重点】

## 1.创建项目和包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5293396945797579.png)

## 2.导包

        mysql

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4134942305772878.png)

        spring

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22394468391559594.png)

        mybtais

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10947975963233877.png)

## 3.生成User

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.21808514366251938.png)

## 4.生成UserMapper

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14017397513698496.png)

## 5.生成UserMapper.xml

加入以下配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8673317454044176.png)

## 6.创建UserService

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9662910962037432.png)

## 7.创建UserServiceImpl

| **public** **class** UserServiceImpl **implements** UserService {<br>    **private** UserMapper userMapper;<br>    **public** **void** setUserMapper(UserMapper userMapper) {<br>        **this**.userMapper = userMapper;<br>    }<br>    @Override<br>    **public** Integer addUser(User user) {<br>        **return** userMapper.insert(user);<br>    }<br>    @Override<br>    **public** Integer updateUser(User user) {<br>        **return** **this**.userMapper.updateByPrimaryKey(user);<br>    }<br>    @Override<br>    **public** Integer deleteUser(Integer id) {<br>        **return** **this**.userMapper.deleteByPrimaryKey(id);<br>    }<br>    @Override<br>    **public** List queryAllUsers() {<br>        **return** userMapper.queryAllUsers();<br>    }<br>    @Override<br>    **public** User queryUserById(Integer id) {<br>        **return** userMapper.selectByPrimaryKey(id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 8.创建UserAction

| **public** **class** UserAction {<br>    **private** UserService userService;<br>    **public** **void** setUserService(UserService userService) {<br>        **this**.userService = userService;<br>    }<br>    **public** **void** addUser(User user) {<br>        userService.addUser(user);<br>    }<br>    **public** Integer updateUser(User user) {<br>        **return** **this**.userService.updateUser(user);<br>    }<br>    **public** Integer deleteUser(Integer id) {<br>        **return** userService.deleteUser(id);<br>    }<br>    **public** List queryAllUsers() {<br>        **return** userService.queryAllUsers();<br>    }<br>    **public** User queryUserById(Integer id) {<br>        **return** userService.queryUserById(id);<br>    }<br>} |
| ------------------------------------------------------------ |

## 9.创建mybtais.cfg.xml

| <configuration><br>    <br>    <settings><br>        <setting name=\_"logImpl"\_ value=\_"LOG4J"\_/><br>    </settings><br>    <br>    <br>    <br>    <mappers><br>        <mapper resource=\_"com/sxt/mapping/UserMapper.xml"\_ /><br>    </mappers><br></configuration> |
| ------------------------------------------------------------ |

## 10.创建log4j.properties

| \# Global logging configuration<br>log4j.rootLogger=DEBUG, stdout<br>\# MyBatis logging configuration...<br>log4j.logger.org.mybatis.example.BlogMapper=TRACE<br>\# Console output...<br>log4j.appender.stdout=org.apache.log4j.ConsoleAppender<br>log4j.appender.stdout.layout=org.apache.log4j.PatternLayout<br>log4j.appender.stdout.layout.ConversionPattern=%5p \[%t\] - %m%n |
| ------------------------------------------------------------ |

## 11.创建application-dao.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>     xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>     xmlns:context=*"http://www.springframework.org/schema/context"*<br>     xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>     xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>     xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>     *http://www.springframework.org/schema/context/spring-context.xsd*<br>         *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>         *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>     <br>     <bean id=\_"dataSource"\_class=\_"org.springframework.jdbc.datasource.DriverManagerDataSource"\_><br>         <property name=\_"driverClassName"\_value=\_"com.mysql.jdbc.Driver"\_></property><br>         <property name=\_"url"\_value=\_"jdbc:mysql://127.0.0.1:3306/0412user"\_></property><br>         <property name=\_"username"\_value=\_"root"\_></property><br>         <property name=\_"password"\_value=\_"123456"\_></property><br>     </bean><br>     <br>     <br>     <br>     <bean id=\_"sqlSessionFactory"\_name=\_"sqlSessionFactory"\_ class=\_"org.mybatis.spring.SqlSessionFactoryBean"\_><br>         <br>         <property name=\_"dataSource"\_ref=\_"dataSource"\_></property><br>         <br>         <br>         <br>         <property name=\_"mapperLocations"\_><br>              <array><br>                   <value>classpath:com/sxt/mapping/\*.xml</value><br>              </array><br>         </property><br>     </bean><br>     <br>     <bean class=\_"org.mybatis.spring.mapper.MapperScannerConfigurer"\_><br>         <br>         <property name=\_"basePackage"\_value=\_"com.sxt.mapper"\_></property><br>         <br>         <property name=\_"sqlSessionFactoryBeanName"\_value=\_"sqlSessionFactory"\_></property><br>     </bean><br></beans> |
| ------------------------------------------------------------ |

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1685947517848689.png)

## 12.创建application-dao.xml注意点

如果不想使用mybtais.cfg.xml 在创建sqlSessionFactory时可以如下配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7957304915916916.png)

## 13.创建application-service.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>     xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"xmlns:context="http://www.springframework.org/schema/context"*<br>     xmlns:aop=*"http://www.springframework.org/schema/aop"xmlns:tx="http://www.springframework.org/schema/tx"*<br>     xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>     *http://www.springframework.org/schema/context/spring-context.xsd*<br>         *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>           *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>     <br>     <context:component-scan base-package=\_"com.sxt.service.impl"\_></context:component-scan><br>     <br>     <br>     <bean id=*"transactionManager"*<br>          class=\_"org.springframework.jdbc.datasource.DataSourceTransactionManager"\_><br>           <property name=\_"dataSource"\_ref=\_"dataSource"\_></property><br>     </bean><br>     <br>     <tx:advice id=\_"txAdvise"\_transaction-manager=\_"transactionManager"\_><br>           [tx:attributes\\](tx:attributes\)<br>                <br>                <tx:method name=\_"add\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"save\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"delete\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"del\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"update\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"load\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"get\*"\_propagation=\_"REQUIRED"\_ /><br>                <tx:method name=\_"find\*"\_read-only=\_"true"\_ /><br>                <tx:method name=\_"\*"\_read-only=\_"true"\_ /><br>           </tx:attributes><br>     </tx:advice><br>     <br>     [aop:config\\](aop:config\)<br>           <br>           <aop:pointcut expression=*"execution(\* com.sxt.service.impl.\*.\*(..))"*<br>                id=*"pc1"* /><br>           <!-- <aop:pointcut expression="execution(\* com.bjsxt.service.impl.\*.\*(..))"<br>                id="pc2"/> --><br>           <aop:advisor advice-ref=\_"txAdvise"\_pointcut-ref=\_"pc1"\_ /><br>           <br>     </aop:config><br>     <bean id=\_"userService"\_class=\_"com.sxt.service.impl.UserServiceImpl"\_autowire=\_"byType"\_><br>     </bean><br></beans> |
| ------------------------------------------------------------ |

## 14.创建application-action.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"* xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"* xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>    <bean id=\_"userAction"\_class=\_"com.sxt.action.UserAction"\_ autowire=\_"byType"\_><br>        <br>    </bean><br></beans> |
| ------------------------------------------------------------ |

## 15.创建applicationContext.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>    xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>    xmlns:tx=*"http://www.springframework.org/schema/tx"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>*http://www.springframework.org/schema/tx*<br>        *http://www.springframework.org/schema/tx/spring-tx.xsd*<br>\_"\_><br>    <import resource=\_"classpath:application-dao.xml"\_/><br>    <import resource=\_"classpath:application-service.xml"\_/><br>    <import resource=\_"classpath:application-action.xml"\_/><br></beans> |
| ------------------------------------------------------------ |

## 16.测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.06221785679525767.png)

## 17.测试完成之后自己改成注解配置

# 23-spring定时间任务

## 一、spring定时间任务【重点】

作用：隔多少时间执行一次

## 1.定时任务概述

1、Quartz介绍

　　在企业应用中，我们经常会碰到时间任务调度的需求，比如每天凌晨生成前天报表，每小时生成一次汇总数据等等。Quartz是出了名的任务调度框架,它可以与J2SE和J2EE应用程序相结合，功能灰常强大，轻轻松松就能与Spring集成，使用方便。

2、Quartz中的概念

　　主要有三个核心概念：调度器、任务和触发器。三者关系简单来说就是，调度器负责调度各个任务，到了某个时刻或者过了一定时间，触发器触动了，特定任务便启动执行。概念相对应的类和接口有：

　　1）JobDetail：望文生义就是描述任务的相关情况；

　　2）Trigger：描述出发Job执行的时间触发规则。有SimpleTrigger和CronTrigger两个子类代表两种方式，一种是每隔多少分钟小时执行，则用SimpleTrigger；另一种是日历相关的重复时间间隔，如每天凌晨，每周星期一运行的话，通过Cron表达式便可定义出复杂的调度方案。

　　3）Scheduler：代表一个Quartz的独立运行容器，Trigger和JobDetail要注册到Scheduler中才会生效，也就是让调度器知道有哪些触发器和任务，才能进行按规则进行调度任务。

## 2.配置方法一【JobDteail通过JobDetailBean】

### 1.创建项目并导包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14709352935739634.png)

http://central.maven.org/maven2/org/quartz-scheduler/quartz/2.3.0/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9754533640823316.png)

### 2.创建MyJob

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9481212824341548.png)

### 1.配置Job

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7479790771147157.png)

### 2.配置JobDetail

| <bean id=*"springQtzJobMethod"*<br>    class=\_"org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean"\_><br>        <br>        <property name=\_"targetObject"\_ ref=\_"myJob"\_></property><br>        <br>        <property name=\_"targetMethod"\_ value=\_"execute"\_></property><br>    </bean> |
| ------------------------------------------------------------ |

### 3.配置tirgger触发器

| <bean id=*"cronTriggerFactoryBean"*<br>     class=\_"org.springframework.scheduling.quartz.CronTriggerFactoryBean"\_><br>        <br>        <property name=\_"jobDetail"\_ref=\_"springQtzJobMethod"\_></property><br>        <property name=\_"cronExpression"\_ value=\_"0/5 \* \* \* \* ? "\_></property><br>    </bean> |
| ------------------------------------------------------------ |

### 4.配置调度工厂

| <br>    <bean id=*"springJobSchedulerFactoryBean"*<br>    class=\_"org.springframework.scheduling.quartz.SchedulerFactoryBean"\_><br>        <property name=\_"triggers"\_><br>             <array><br>                 <ref bean=\_"cronTriggerFactoryBean"\_/><br>             </array><br>        </property><br>    </bean> |
| ------------------------------------------------------------ |

### 5.测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2859973501581963.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3456258249743428.png)

## 3.配置方法二

**JobDteail通过MethodInvokeJobDetailFactoryBean\*\*实现**(**推荐**)\*\*

### 1.创建MyJob

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.12195252835039883.png)

### 2.配置

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"*<br>    xmlns:context=*"http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>\_http://www.springframework.org/schema/aop/spring-aop.xsd"\_><br>    <br>    <bean id=*"jobDetail"*<br>    class=\_"org.springframework.scheduling.quartz.JobDetailFactoryBean"\_><br>        <br>        <property name=\_"jobClass"\_value=\_"com.sxt.job.MyJob"\_></property><br>        <br>        <property name=\_"durability"\_value=\_"true"\_></property><br>    </bean><br>    <br>    <bean id=*"cronTriggerFactoryBean"*<br>     class=\_"org.springframework.scheduling.quartz.CronTriggerFactoryBean"\_><br>        <br>        <property name=\_"jobDetail"\_ref=\_"jobDetail"\_></property><br>        <br>        <property name=\_"cronExpression"\_value=\_"0/5 \* \* \* \* ? "\_></property><br>    </bean><br>    <br>    <bean id=*"springJobSchedulerFactoryBean"*<br>    class=\_"org.springframework.scheduling.quartz.SchedulerFactoryBean"\_><br>        <property name=\_"triggers"\_><br>             <array><br>                 <ref bean=\_"cronTriggerFactoryBean"\_/><br>             </array><br>        </property><br>    </bean><br></beans> |
| ------------------------------------------------------------ |

### 3.测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7291768453365514.png)

## 4.配置方法三【注解】【必须掌握】

### 1.创建MyJob

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.028863674768556793.png)

### 2.配置applicationContext.xml

| <beans xmlns=*"http://www.springframework.org/schema/beans"*<br>    xmlns:xsi=*"http://www.w3.org/2001/XMLSchema-instance"xmlns:context="http://www.springframework.org/schema/context"*<br>    xmlns:aop=*"http://www.springframework.org/schema/aop"xmlns:task="http://www.springframework.org/schema/task"*<br>    xsi:schemaLocation=*"http://www.springframework.org/schema/beans*<br>*http://www.springframework.org/schema/beans/spring-beans.xsd*<br>*http://www.springframework.org/schema/context*<br>    *http://www.springframework.org/schema/context/spring-context.xsd*<br>        *http://www.springframework.org/schema/aop*<br>*http://www.springframework.org/schema/aop/spring-aop.xsd*<br>  *http://www.springframework.org/schema/task*<br>    *http://www.springframework.org/schema/task/spring-task.xsd\_*"\_><br>    <br>    [task:annotation-driven/](task:annotation-driven/)<br>    <br>    <context:component-scan base-package=\_"com.sxt.job"\_></context:component-scan><br></beans> |
| ------------------------------------------------------------ |

### 3.测试

# 24-baseEasyui

## 一、baseEasyui

## 1.下载

http://www.jeasyui.com/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image002b85b2226-04e8-4a40-bcab-dd363e0c6bbb.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image004cf5bd030-7609-4b12-b61f-8b436daea49e.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image006e352565a-b901-4cf9-8336-5842cf4e58e4.jpg)

## 1.实现基本的CRUD的页面

http://www.jeasyui.com/demo/main/index.php

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0088ed14259-e261-44de-a5d2-75ac64f8100d.jpg)

| url=*"\${pageContext.request.contextPath}/json/userDate.json"*<br>            toolbar=*"#toolbar"* pagination=*"true"*<br>            rownumbers=*"true"* fitColumns=\_"true"*singleSelect=*"true"\_><br>        <thead><br>            <tr><br>                <th field=\_"firstname"\_ width=\_"50"\_>First Name</th><br>                <th field=\_"lastname"\_ width=\_"50"\_>Last Name</th><br>                <th field=\_"phone"\_ width=\_"50"\_>Phone</th><br>                <th field=\_"email"\_ width=\_"50"\_>Email</th><br>            </tr><br>        </thead><br>    </table> |
| ------------------------------------------------------------ |

属性说明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image010fc10d3c9-bbc8-475c-89a9-814da80514b5.jpg)

title:面板显示的标题

iconCls标题左边的图标  可以去themes/icon.css里面去换

class="easyui-datagrid"   easyui使用easyui-datagrid样式 去渲染表格

url  请求数据返回json接口

toolbar工具条  对应的div的id

pagination="true"  是否启分页面

rownumbers="true"  是否显示行号

 fitColumns="true"  是否自动分配表格宽度

 singleSelect="true"  是否启用单行选中

### 改成中文


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image01286a08842-769d-42c9-b207-74f2fb3a385d.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image01484c207c2-3618-4ad6-a577-765e4eb2f839.jpg)

自学

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image016d37c0fdf-47d5-4b36-9afb-854580b76cee.jpg)

