# 01【掌握】springMVC概述

## 一，概述

Spring MVC是Spring提供的一个强大而灵活的web框架。借助于注解，Spring MVC提供了几乎是POJO的开发模式，使得控制器的开发和测试更加简单。这些控制器一般不直接处理请求，而是将其委托给Spring上下文中的其他bean，通过Spring的依赖注入功能，这些bean被注入到控制器中。

Spring MVC主要由DispatcherServlet、处理器映射、处理器(控制器)、视图解析器、视图组成。他的两个核心是两个核心：

处理器映射：选择使用哪个控制器来处理请求

视图解析器：选择结果应该如何渲染



通过以上两点，Spring MVC保证了如何选择控制处理请求和如何选择视图展现输出之间的松耦合。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab60ce096-638c-4eb4-93f3-4201b0580ab9.jpg)

## 二，springmvc的原理图


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.637330979196812.png)



1，  前端处理器

2，  控制器映射器

3，  控制器适配器

4，控制器

5，  视图处理器

## 三，SpringMVC接口解释

（1）DispatcherServlet接口：

Spring提供的前端控制器，所有的请求都有经过它来统一分发。在DispatcherServlet将请求分发给Spring Controller之前，需要借助于Spring提供的HandlerMapping定位到具体的Controller。

（2）HandlerMapping接口：

能够完成客户请求到Controller映射。

（2）HandlerAdapter接口：

根据映射器返回的结果寻找哪一种适配器调用相关的Controller。

（3）Controller接口：

需要为并发用户处理上述请求，因此实现Controller接口时，必须保证线程安全并且可重用。

Controller将处理用户请求，这和Struts Action扮演的角色是一致的。一旦Controller处理完用户请求，则返回ModelAndView对象给DispatcherServlet前端控制器，ModelAndView中包含了模型（Model）和视图（View）。

从宏观角度考虑，DispatcherServlet是整个Web应用的控制器；从微观考虑，Controller是单个Http请求处理过程中的控制器，而ModelAndView是Http请求过程中返回的模型（Model）和视图（View）。

（4）ViewResolver接口：

Spring提供的视图解析器（ViewResolver）在Web应用中查找View对象，从而将相应结果渲染给客户。

---

## 四，SpringMVC下载

在spring包里面就有

# 02【掌握】springMVC的入门配置

## 一，环境准备

1，java环境

2，myeclipse

3，springmvc版本 4.3

需要spring的所有jar包（一定要有spring-webmvc-4.3.7.RELEASE.jar）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae84fbeab-20dd-41d2-b507-36c994ce428d.png)

### 二，创建项目导入jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac0c5ce88-bedb-4825-a6d7-b46d2dcbe68f.png)

## 三，创建spring的核心配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2740369b-1a46-4ab0-8f31-66bbe6d8ccfd.png)

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">
</beans>
```

## 四，配置前端控制器

## 五，创建Handler【Controller】

```java
public class User1Controller implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        List<User> list=new ArrayList<>();
        list.add(new User(1, "张三", 22, "武汉"));
        list.add(new User(2, "李四", 23, "北京"));
        list.add(new User(3, "王五", 26, "深圳"));
        list.add(new User(4, "赵六", 29, "上海"));
        list.add(new User(5, "孙七", 32, "杭州"));
        request.setAttribute("list", list);
        ModelAndView view=new ModelAndView("/WEB-INF/jsp/user/list.jsp");
        return view;
    }
}

```

## 六，创建视图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeb5d093d-3b7f-4868-9497-149dfc0fb6d6.png)

```xml
    <table border="1" width="90%" align="center" cellpadding="3">
        <tr>
            <th>编号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>地址</th>
        </tr>
        <c:forEach items="${list }" var="sn">
            <tr align="center">
                <td>${sn.uid }</td>
                <td>${sn.uname }</td>
                <td>${sn.uage }</td>
                <td>${sn.uaddress }</td>
            </tr>
        </c:forEach>
    </table>
```

## 七，在springmvc.xml里面配置Controller

## 八，配置处理器适配器

## 九，配置处理器映射器

## 十，配置视图解析器

## 十一，发布测试

[http://127.0.0.1:8080/bjsxt/user1Controller.action](http://127.0.0.1:8080/bjsxt/user1Controller.action)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8d092281-04f0-41e9-a3e2-14418495f97b.png)

# 03【掌握】springmvc.xml详解

## 一，非注解映射器

1，org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping

        |--将bean的name作为url进行查找 ，需要在配置Handler时指定beanname（就是url）  

        配置方法  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab5a5bb4f-74de-4d24-93f9-0ded369b269d.png)

2，org.springframework.web.servlet.handler.SimpleUrlHandlerMapping

        |--可以配置多个url  

        配置方法  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora37c27cf1-ac1e-4311-b009-78616592ca23.png)

注意，以上两种映射器是可以共存的哦

---

## 二，非注解处理器适配器

1，org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter

        |--使用它的话那么创建的Controller必须实现Controller接口  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8ff5db90-0a06-4bd8-9878-0bd846624fdd.png)

2，org.springframework.web.servlet.mvc.HttpRequestHandlerAdapter

        |--使用它的话那么创建的Controller必须实现HttpReqeustHandler接口  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac7d7b13a-518d-4d6f-948c-b4257fe19caa.png)

---

## 三，注解映射器和注解适配器的配置

在spring3.1之前使用org.springframework.web.servlet.mvc.annotation.DefaultAnnotationHandlerMapping注解映射器。

在spring3.1之后使用org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping注解映射器。

在spring3.1之前使用org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter注解适配器。

在spring3.1之后使用org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter注解适配器。

配置方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac046abf2-90ac-4583-8949-897768720ebc.png)

打开注解扫描

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa04cc88c-f772-420e-b97b-4eeabc1ac858.png)

创建注解的Controller

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf50d3dc1-8a56-4dae-859c-47de5956cf90.png)

发布测试

[http://127.0.0.1:8080/bjsxt/user3.action](http://127.0.0.1:8080/bjsxt/user3.action)

# 04【掌握】DispatcherServlet.properties说明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5a28b058-3197-447e-a8dd-ef20b51ca653.png)

前端控制器从上边的文件中加载处理映射器、适配器、视图解析器等组件，如果不在springmvc.xml中配置，使用默认加载的。  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3e974915-e51e-4e79-a010-5a3d3dc8dcad.png)

# 05【掌握】入门程序总结

通过入门程序理解springmvc前端控制器、处理器映射器、处理器适配器、视图解析器用法。

前端控制器配置：

第一种：\*.action，访问以.action结尾 由DispatcherServlet进行解析

第二种：/，所以访问的地址都由DispatcherServlet进行解析，对于静态文件的解析需要配置不让DispatcherServlet进行解析

  使用此种方式可以实现 RESTful风格的url

处理器映射器：

非注解处理器映射器（了解）

**注解的处理器映射器（掌握）**

         对标记@Controller类中标识有@RequestMapping的方法进行映射。在@RequestMapping里边定义映射的url。使用注解的映射器不用在xml中配置url和Handler的映射关系。

处理器适配器：

非注解处理器适配器（了解）

**注解的处理器适配器（掌握）**

         注解处理器适配器和注解的处理器映射器是配对使用。理解为不能使用非注解映射器进行映射。

<mvc:annotation-driven></mvc:annotation-driven>可以代替下边的配置：



```Plain Text
   <!--注解映射器 -->
   <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping"/>

   <!--注解适配器 -->
   <bean class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter"/>
```

实际开发使用：mvc:annotation-driven

------

# 06【掌握】Controller中参数绑定

## 一，简单类型参数绑定

1，创建index.jsp

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae09e076e-ac53-4b0e-b558-1af912fb1f01.png)

2，创建UserController

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7c53137e-a07e-4f55-9e17-39c950e820cc.png)

---

## 二，集合类型参数绑定

1，index,jsp

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3d929212-e409-4dda-94ea-46f1c9be41bd.png)



2，UserController添加一个方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracc1a06ed-2050-4a12-9cb8-0bac4bb75acd.png)

---

## 三，对象类型参数绑定【重点】

1，创建UserVo

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa4e42b42-bca5-4cc2-b5ae-c867f0efbb87.png)

2，编写视图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraee97ab41-bf31-48f8-aa50-e54c668019fd.png)

2，在UserController中添加方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab97e30e1-c82a-4290-af40-24a3b01b3bf3.png)

---

## 四，默认参数绑定

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora81d20082-afd6-42ea-97e2-96ba1bb38b7e.png)

Model

```xml
model.addAttribute("users", users); 等价于request.setAttribute(); 等价于modelAndView.addObject();

modelAndView.setViewName("跳转地址"); 等价于request.getRequestDispacther("跳转地址");
```

## 五、其他Web参数类型的绑定

HttpServletRequest、HttpServletResponse、HttpSession

第一种方法【使用形参的方式绑定】

```xml
    @RequestMapping("queryWeb")
    public String queryWeb(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        System.out.println(request);
        System.out.println(response);
        System.out.println(session);
        // 从request中取出session
        System.out.println(request.getSession());
        // 获取servletContext
        System.out.println(request.getServletContext());
        System.out.println(session.getServletContext());
        return "";
    }
```

第二种方法【注入的方式绑定】

```xml
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private HttpSession session;

    @RequestMapping("queryWeb")
    public String queryWeb() {
        System.out.println(request);
        System.out.println(response);
        System.out.println(session);
        // 从request中取出session
        System.out.println(request.getSession());
        // 获取servletContext
        System.out.println(request.getServletContext());
        System.out.println(session.getServletContext());
        return "";
    }

//要求：当前的类的对象必须是spring的ioc容器创建的

// 注意点：对象的hasCode的值可能不一样，但是里面的内容是一样的。
```

第三种方法【解耦的方式】

```xml

```

想要哪个写哪个，请看，是不是很高大上

## 六，HttpRequest的几种其它获取方法

1，使用注解的方法

    要求。对象必须由ioc 容器创建  

```java
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private HttpServletRequest request;

    @Override
    public void addUser(User user) {
        System.out.println(request);
    }

}
```

2，使用解耦的方法  

```java
        //当前这个对象没有被spring管理  如何得到   在这里面得到request
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        HttpServletResponse response = requestAttributes.getResponse();
        HttpSession session = request.getSession();
        System.out.println(request);
```

# 07【掌握】中文乱码处理

**servlet里面的解决方法：**

1、请求乱码：

```xml
// 1、 
request.setCheracterEncoding("utf-8");
// 2、如果这样还是乱码，接下来需要配置tomcat
String name = request.getParamater("name");
// 配置tomcat的servlet.xml-->Connertor添加useBodyEncodingForURI="true"
                    一般把URLEncoding="utf-8"加上
// 3、如果还是解决不了乱码
String myname = new String(name.getBytes("iso-8859-1"), "utf-8");
```

2、响应乱码：

```xml
// 1、解决写入的字符串的编码格式
response.setCheracterEncoding("utf-8");
    PrintWriter out = response.getWriter();
    out.wrinte("你好世界");
// 2、强制浏览器使用某种格式解析
response.setContentType("text/html;charset=utf-8");
```

3、过滤器解决

**spring里面的解决方法【过滤器】：**  

在web.xml配置过滤器。CharacterEncodingFilter  

4、数据库乱码

（1）新建数据库时指定编码：utf-8

（2）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraccccef25-8a32-4dc5-80c3-a4cf280ae985.jpg)

```xml
url: jdbc:mysql://129.211.39.189:3306/carrent?useUnicode=true&characterEncoding=utf8&useSSL=true&serverTimezone=UTC
```

（3）修改mysql的my.ini

```xml
第57行：[mysql]节点修改default-character-set=utf8
第81行：[mysqld]节点修改character-set-servlet=utf8
```

# 08【掌握】springMVC的跳转

## 一，视图解析器的配置

视图解析器配置前缀和后缀：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora88504433-90d6-4992-a71d-b0c447b4ea95.jpg)

程序中不用指定前缀和后缀：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa2b75076-d23f-4cc0-a800-eb2ddb56c42d.png)

## 二，两种跳转方式

在Servlet和struts里面我们知道有两种跳转方法

    1，请求转发 【项目内部，一次请求一次响应】

    2，请求重定向【可以转发到外部的项目，两次请求两次响应】
同理springmvc里面也提供了这两种方法

    在Controller里面的返回值可以是String  ModelAndView  如果是ModelAndView默认的就是请求转发  

    如  return "index.jsp" 这种方法是默认的请求转发   这个写法====return "forward:index.jsp"  

    如  return "redirect:index.jsp"这种方法是就重定向到index.jsp页面  

```java
/***
         * 前提:已经配置了视图解析器
         * 请求转化：
               return "index.jsp" 
               model.addAttribute(arg1,arg2)将数据封装到request作用域
           重定向：
                return "redirect:url[A1] "，视图解析器不再起作用
         *      model.addAttribute(arg1,arg2)变为url传参数  会跟在url的后面
         * **/

```

**servlet中的转发和重定向**

转发：一次请求一次响应，只能在服务器内部转发，页面发生变化之后客户端不知道

```java
request.getRequestDispatcher("url").forward(request, response);
```

重定向：两次请求两次响应，可以重定向到其他服务器，页面的url会发生变化

```java
response.sedRedirect("url");
```

# 09【掌握】springMVC和ajax的交互

## 一，响应简单文本到客户端

### 1，Controller的方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora05e4cff3-3522-498f-9361-ad367ebe5e8e.png)

注意这里的@ResponseBosy  设置return直接响应字符串

### 2，index.jsp

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora699eea55-8803-40c8-ae0b-d639e4d1e556.png)

解决返回字符串乱码问题

第一种：在@RequestMapping中添加**produces="text/html;charset=UTF-8**

第二种：在MVC 配置中加入，spring版本必需为3.1或以上版本才可以下配置

```xml
    <mvc:annotation-driven>
        <mvc:message-converters register-defaults="true">
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
              <constructor-arg value="UTF-8" />
            </bean>
        </mvc:message-converters>
    </mvc:annotation-driven>
```

## 二，响应json对象到客户端

### 1，实现方法

①，可以使用上面的方法组装一个json的字符串，让Handler里面的方法返回一个字符串就可以了

②，springmvc里面内置了jackson的json生成和解析的方法，【但是要导jackson的包】

### 2，jackson的实现方法

    1，导入jackson的jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora26b052f9-1321-4b36-b2ec-1c672786fd30.png)

    2，编写Handler  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora34321302-5bb4-400d-9e80-102c3f6eba3e.png)

    3，请求  

        [http://127.0.0.1:8080/bjsxt/user/queryUsers.action](http://127.0.0.1:8080/bjsxt/user/queryUsers.action)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae2edb0a7-afe1-4893-96fb-6b0914b040f9.png)

# 10【掌握】SSM的整合

**使用spring springmvc   mybatis整合框架**

业务：完成用户的登陆和用户的全查询显示

## 一，创建项目和包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora49dc9cfd-4489-46c4-842e-5bc036dfcbbe.png)

## 二，导包

### 1，导spring的包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora154704be-c347-4f82-95ef-d88a9cd0f29e.png)

### 2，导mybatis的包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora75f31acb-9528-404a-883a-fd29a3c2276c.png)

### 3，导数据库驱动包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6a82ea8f-fdaf-4260-a826-7df8e16c0b6b.png)

### 4，导链接池的包【可不导】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1d77ddc0-cd8f-4bbb-9961-dca2a686f262.png)

### 5，导分页的包【不用可不导】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora26ff701d-d723-415a-adce-540ca4586ca6.png)

### 6，导json包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraef89ab40-9d17-4f7b-98a6-63035aaeba84.png)

## 三，创建springmvc.xml

### 1，创建srpingmvc.xml导入头文件

```xml
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
<beans>
```

### 2，配置Handler注解扫描

### 3，配置注解映射器和适配器

### 4，配置视图解析器

### 5，配置静态资源

```xml
    <mvc:resources mapping="/static/**" location="/static/" />  
```

---

## 四，创建mybatis.cfg.xml

其它这个文件可以不创建，但是为了配置mapper.xml的别名，我们还是在这里配置一下

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="logImpl" value="LOG4J" />
    </settings>
    <typeAliases>
        <!-- 别外优化 -->
        <package name="com.sxt.domain" />
    </typeAliases>
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor">
        </plugin>
    </plugins>
</configuration>
```

## 五，创建applicationContext.xml

### 1,创建applicationContext.xml并导入头文件

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context" xmlns:tx="http://www.springframework.org/schema/tx"
    xmlns:aop="http://www.springframework.org/schema/aop" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans 
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd">
<beans>
```

### 2，扫描service的注解

### 3，配置数据源【这里说三种配置方法】

#### 3.1spring自带的

```xml
<bean id="dataSource"
        class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://localhost:3306/ssm" />
        <property name="username" value="root" />
        <property name="password" value="123456" />
    </bean>
```

#### 3.2c3p0的【注意导c3p0的两个jar包】

#### 3.3dbcp的【注意导dbcp的两个jar包】

### 4，实例化SqlSessionFactory

```xml
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"></property>
        <!--mybatis的配置文件 -->
        <property name="configLocation" value="classpath:mybatis.cfg.xml" />
        <!--扫描 XXXmapper.xml映射文件,配置扫描的路径 这个不配置也可以，但是不配置的话，下面dao和xxxMapper.xml必须放在同一个包下面 -->
        <property name="mapperLocations" value="classpath:com/sxt/mapping/*.xml"></property>
    </bean>
```

### 5，配置dao包的查找

### 6，第4点和第五点还可以这样配置【不推荐】

```xml
 注意，这样配置就没有mybatis.cfg.xml了，当然，想要也可以加进来，还有就是XxxMapper.java和XxxMapper.xml的名字必须相同
<!-- 实例化SqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!-- 给SqlSessionFactory 对象注入 DataSource -->
        <property name="dataSource" ref="dataSource"></property>
        <!-- 注入分页插件，拦截器 -->
        <property name="plugins">
            <list>
                <bean class="com.github.pagehelper.PageHelper">
                    <property name="properties">
                        <props>
                            <!-- 底层数据库的方言 -->
                            <prop key="dialect">mysql</prop>
                            <!-- 分页最大页，最小页判断 -->
                            <prop key="reasonable">true</prop>
                        </props>
                    </property>
                </bean>
            </list>
        </property>
    </bean>

    <!-- 
        通过MapperScannerConfigurer扫描，产生Mapper接口的代理对象
        产生的Mapper接口的代理对象，在spring容器的id为接受名字，首字母小写
        mapper.java 和 mapper.xml必须名字相同，在同一个目录
     -->
     <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!-- 指定需要扫的package -->
        <property name="basePackage" value="com.bjsxt.mapper"></property>
        <!-- 注入SqlSessionFactory对象 -->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"></property>
     </bean>
```

### 7，声明式事务配置

## 六，log4j的配置

### 1，创建log4j.properties

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

### 2，修改mybtais.xml让mybtis使用log4j的日志输出

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora16134586-1c57-427d-8bcf-a8bde361251d.png)

## 七，web.xml的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://java.sun.com/xml/ns/javaee"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
    id="WebApp_ID" version="3.0">
    <display-name>ssm</display-name>
    <!-- 加载Spring容器配置 -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- Spring容器加载所有的配置文件的路径 -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:applicationContext.xml</param-value>
    </context-param>

    <!-- 配置SpringMVC核心控制器,将所有的请求(除了刚刚Spring MVC中的静态资源请求)都交给Spring MVC -->
    <servlet>
        <servlet-name>springMvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath*:springmvc.xml</param-value>
        </init-param>
        <!--用来标记是否在项目启动时就加在此Servlet,0或正数表示容器在应用启动时就加载这个Servlet, 当是一个负数时或者没有指定时，则指示容器在该servlet被选择时才加载.正数值越小启动优先值越高 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--为DispatcherServlet建立映射 -->
    <servlet-mapping>
        <servlet-name>springMvc</servlet-name>
        <!-- 拦截所有请求,千万注意是(/)而不是(/*) -->
        <url-pattern>*.action</url-pattern>
    </servlet-mapping>

    <!-- 设置编码过滤器 -->  
    <filter>  
        <filter-name>encodingFilter</filter-name>  
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>  
        <init-param>  
            <param-name>encoding</param-name>  
            <param-value>UTF-8</param-value>  
        </init-param>  
        <init-param>  
            <param-name>forceEncoding</param-name>  
            <param-value>true</param-value>  
        </init-param>  
    </filter>  

    <filter-mapping>  
        <filter-name>encodingFilter</filter-name>  
        <url-pattern>/*</url-pattern>  
    </filter-mapping>  
    <welcome-file-list>
        <welcome-file>login.jsp</welcome-file>
    </welcome-file-list>
</web-app>
```

**到此，框架搭建完成，那么接下来完成登陆和显示所用用户的操作**

## 七，完成用户登陆

### 1，创建User.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora53385f9b-75df-404e-b63b-149c37c014d2.png)

### 2，创建UserDAO.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa510b6b2-816f-41fb-9275-1d10fba9f614.png)

### 3，创建UserMapper.xml【这里面的id名必须和UserDAO里面的方法名一样】

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- mapper 引来定义数据库操作的信息 -->
<mapper namespace="com.sxt.dao.UserDAO">
    <!-- 添加 -->
    <insert id="add" parameterType="User">
        insert into user values(null,#{name},#{age},#{sex},#{address},#{loginname},#{pwd})
    </insert>
    <!-- 修改 -->
    <update id="update" parameterType="User">
        update user set name=#{name},age=#{age},sex=#{sex},address=#{address},loginname=#{loginname},pwd=#{pwd} where id=#{id}
    </update>
    <!-- 删除  -->
    <delete id="delete" parameterType="User">
        delete from user where id=#{id}
    </delete>
    <!-- 全查询 -->
    <select id="queryAll" resultType="User">
        select * from user;
    </select>
    <!-- 查询一个 -->
    <select id="queryById" resultType="User" parameterType="User">
        select * from user where id=${id}
    </select>
    <!-- 登陆 -->
    <select id="login" parameterType="User" resultType="User">
        select * from user where loginname=#{loginname} and pwd=#{pwd}
    </select>

</mapper>
```

### 4，创建UserService.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradd93f232-44ca-445e-9b0a-61e5363f425f.png)

### 5，创建UserServiceImpl.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4a1eccf8-00a1-4785-8e8c-259567f7563a.png)

### 6，创建UserController.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora31426ba3-6a78-4d6c-96b0-b88458a68706.png)

### 8，导入模版

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora713c05a4-996b-475e-a3cb-de60cbfd10d7.png)

    1，程序入口index.jsp  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6321f931-d7b7-4ace-b02a-89426bfbb190.png)

    1，登陆页面login.jsp  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora79810f9a-3005-428d-a5d4-a1c963dd5f0f.jpg)

    2，index.jsp  

    3，list.jsp  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2964edbb-4759-4487-ab85-149fe3080af4.jpg)

# 11【掌握】springMVC的文件上传下载

## 一，文件上传

### 1，下载导入jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora74204cc3-22d6-4c1c-9a9f-4fba422c171c.jpg)

### 2，配置二进制流程解析

### 3，创建index.jsp

```xml
  <body>
    <form action="uploadFile.action" method="post" enctype="multipart/form-data">
        <input type="file" name="mf"><br>
        <input type="submit" value="上传">
    </form>
  </body>
```

### 4，定义Handler处理上传请求

```java
@Controller
public class FileController {
    /***
     * 处理文件上传的请求
     * mf:绑定客户端提交的文件数据（上传文件）
     * **/
    @RequestMapping("/uploadFile")
    public void uploadFile(MultipartFile mf,HttpSession session){

        System.out.println("===="+mf.getName());
        System.out.println("===="+mf.getOriginalFilename());
        System.out.println("===="+mf.getContentType());
        //获得upload目录，在服务器上的绝对路径
        String path = session.getServletContext().getRealPath("/upload");
        //获得文件名称
        String fileName=mf.getOriginalFilename();
        fileName=UUID.randomUUID().toString().replace("-","")+
                fileName.substring(fileName.lastIndexOf("."));
        //创建目标文件
        File dest = new File(path,fileName);
        /***
         * 将上传的文件拷贝到磁盘目录
         * **/
        try {
            mf.transferTo(dest);
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}

```

5，修改文件名  

6，分文件夹管理

7，保存路径到数据库

## 二，文件下载

1，直接使用路径下载【简单】

2，通过Handler下载

    1，创建down.jsp  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab0e2b56a-b961-4b8b-988b-faeebb773a74.png)

    2，创建Handler并写下载的方法

```java
/***
     * 处理文件下载的请求
     * @return 将下载的文件，封装到ResponseEntity对象
     * **/
    @RequestMapping("/downFile")
    public ResponseEntity  downFile(String fname,HttpSession session){
        //获得需要下载的文件保存的目录
        String path = session.getServletContext().getRealPath("/upload");
        //获得需要下载的文件对象
        File file = new File(path,fname);
        //将下载的文件，封装byte[]
        byte[] bytes=null;
        try {
            bytes = FileUtils.readFileToByteArray(file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //创建封装响应头信息的对象
        HttpHeaders header=new HttpHeaders();
        //封装响应内容类型(APPLICATION_OCTET_STREAM 响应的内容不限定)
        header.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        //设置下载的文件的名称
        header.setContentDispositionFormData("attachment", "123.jpg");


        //创建ResponseEntity对象
        ResponseEntity entity=
                new ResponseEntity(bytes, header, HttpStatus.CREATED);

        return entity;
    }
```

# 12【掌握】拦截器

## 一，未登陆拦截器

### 1，创建LoginInterceptor

```java
public class LoginInterceptor implements HandlerInterceptor {
    /***
     * handler中处理请求的方法,完全执行完毕之后，执行该方法 对handler中的方法进行异常的统一处理 和 进行日志记录
     * 
     * **/
    @Override
    public void afterCompletion(HttpServletRequest req,
            HttpServletResponse resp, Object obj, Exception ex)
            throws Exception {
        System.out.println("============afterCompletion");

    }

    /***
     * handler中处理请求的方法，返回ModelAndView对象之前执行 对象ModelAndView进行统一处理
     * */
    @Override
    public void postHandle(HttpServletRequest req, HttpServletResponse resp,
            Object obj, ModelAndView mav) throws Exception {
        System.out.println("============postHandle");
    }

    /***
     * handler中处理请求的方法之前执行
     * 
     * @return 控制者被拦截的handler是否进行放行
     * **/
    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse resp,
            Object obj) throws Exception {
        System.out.println("============preHandle");
        HttpSession session = req.getSession();
        Object uname = session.getAttribute("user");
        if (uname != null) {
            // 用户已经登陆，放行
            return true;
        }
        // 跳转到登陆页面
        resp.sendRedirect(req.getContextPath()+"/login.jsp");
        return false;
    }
}
```

### 2，在springmvc.xml里面注册自定义拦截器

# 13【了解】springmvc-RestFul

## 一，什么是RestFul

什么是rest?当我看到这个词的时候，本意是休息,定是做web开发的和中设计模式

好了,就来简单介绍一下rest

rest即**Representational State Transfer**，表现层状态转化

互联网上资源（是服务）细化理解为一个url，如果访问某个资源通过http url访问。

我们把”资源”具体呈现出来的形式，叫做它的”表现层”（Representation）

表现层对用户展示的形式：html、json、xml、pdf、图片。。

        由于http协议的限制,服务器和客户端不能实现主动通信,只能有客户端发起请求服务端响应请求,也就是将请求方法和参数都包含url,

        使用rest和不使用rest的规则都是这样做的,但是rest对于url做了很好的规划,这个规则将方法和资源分开看起来做的很简单,但是却使我们更好理解了,上网无非就是对于网络资源的操作,网络资源在internet中直白点说就是url(个人理解)所以如果客户端想要操作服务器，必须通过某种手段，让服务器端发生”状态转化”（State Transfer）。而这种转化是建立在表现层之上的，所以就是”表现层状态转化”。

        GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源

RESTful就是对http最全面最好的诠释，RESTful就是进行互联网开发的理念、思想。

## 二，RESTful开发中url的规范

### 1、url规范

原始url：http://www……/queryItems.action?type=101&id=111…

规范后：http://www…/item/101/1

比如：

对商品查询

url：http://www…/item/101/1 表示对101分类 下的1号商品查询

http请求方法设置为get

比如：

对商品删除

url：http://www…/item/101/1表示对101分类 下的1号商品删除

http请求方法设置为delete

### 2，rest向客户端发送数据

在请求时指定服务端给客户端响应的内容类型是什么？

实现：在请求时设置http头中Accept

对商品查询，以json格式展示：

rest设置：

url为：http://www…/item/101/1

客户端请求此url并且设置Accept为”applicatoin/json”

服务端处理方法：

接收请求，解析Accept，根据指定类型返回不同的内容格式。

如果解析到Accept为”applicatoin/json”，服务端就将内容转成json输出

如果解析到Accept为”applicatoin/xml”，服务端就将内容转成xml输出

RESTful架构的特点：

综合上面的解释，我们总结一下什么是RESTful架构：

　　**（1）每一个URI代表一种资源；**

实现：

规范后的url规范后：http://www…/item/101/1，特点是参数通过url传递。

**（2）客户端和服务器之间，传递这种资源的某种表现层；**

实现：

服务端解析Accept，根据客户端的要求将内容进行输出。

**（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现”表现层状态转化”。**

实现：

服务解析客户端请求的http方法，根据不同的方法执行不同的service操作。

---

## 三，SpringMVC+Json构建基于Restful风格的应用

### 1，创建项目并导入spring的jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8ea9512b-33b4-4b4d-ad1a-df3968d0c47a.png)

### 2，配置web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://java.sun.com/xml/ns/javaee"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
    id="WebApp_ID" version="3.0">
    <display-name>01_springmvc_hello</display-name>
    <!-- 解决HTTP PUT请求Spring无法获取请求参数的问题 -->
    <filter>
        <filter-name>HttpPutFormContentFilter</filter-name>
        <filter-class>org.springframework.web.filter.HttpPutFormContentFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HttpPutFormContentFilter</filter-name>
        <servlet-name>springmvc</servlet-name>
    </filter-mapping>
    <!-- 配置springmvc的核心控制器 -->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 给DispatcherServlet给定初始化参数 -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath*:springmvc.xml</param-value>
        </init-param>
        <!-- 在启动服务器的时候，实例化核心控制器 -->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <!--注意这个地方，一定要这么配置 -->
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!-- 编码过虑 -->
    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

### 3，创建springmvc.xml

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

    <context:component-scan base-package="com.sxt.controller"></context:component-scan>
    <mvc:annotation-driven></mvc:annotation-driven>
    <!-- 配置视图解析器 -->
    <bean
        class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
 <!-- 对静态资源文件的访问 不支持访问WEB-INF目录 -->  
    <mvc:default-servlet-handler />  
</beans>
```

### 4，创建Person.java

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora472e13d9-3693-4170-8e0b-89dfaae4fadb.png)

### 5，创建PersonController

```java
@Controller
public class PersonController{

    public static List<Person> persons=new ArrayList<>();
    private static Random random=new Random();
    static{
        for (int i = 1; i <=10; i++) {
            persons.add(new Person(i, "张三"+i,random.nextDouble()>=0.5?"男":"女" , random.nextInt(89)+10));
        }
    }


    @RequestMapping(value="hello",produces="text/html;charset=utf-8")
    @ResponseBody
    public String hello(){
        return "你好!:hello ";
    }

    @RequestMapping(value="say/{name}/{msg}",produces="text/html;charset=utf-8",method=RequestMethod.GET)
    @ResponseBody
    public String say(@PathVariable(value="name")String name,@PathVariable(value="msg")String msg){
        return name+":"+msg;
    }

    /**
     * 根据id得到person
     */
    @RequestMapping(value="person/{id}",method=RequestMethod.GET)
    @ResponseBody
    public Person getPerson(@PathVariable(value="id")String id){
        Person p=null;
        for (Person person : persons) {
            if(Integer.parseInt(id)==person.getId()){
                p=person;
                break;
            }
        }
        return p;
    }

    /**
     * 添加
     */
    @RequestMapping(value="person",method=RequestMethod.POST,produces="text/html;charset=utf-8")
    @ResponseBody()
    public String addPerson(Person person){
        persons.add(person);
        return "添加成功  当前集合长度为:"+persons.size();
    }

    /**
     * 删除方法
     */
    @RequestMapping(value="person/{id}",method=RequestMethod.DELETE,produces="text/html;charset=utf-8")
    @ResponseBody
    public String deletePerson(@PathVariable(value="id")Integer id){
        for (Person person : persons) {
            if(id==person.getId()){
                persons.remove(person);
                break;
            }
        }
        return "删除成功  当前集合长度为:"+persons.size();
    }

    /**
     * 更新
     */
    @RequestMapping(value="person",method=RequestMethod.PUT,produces="text/html;charset=utf-8")
    @ResponseBody
    public String updatePerson(Person person){
        for (Person p : persons) {
            if(p.getId()==person.getId()){
                BeanUtils.copyProperties(person, p);
                break;
            }
        }
        return "更新成功  当前集合长度为:"+persons.size();
    }

    /**
     * 全查询
     */
    @RequestMapping(value="person",method=RequestMethod.PATCH)
    @ResponseBody
    public List<Person> getAllPerson(){
        return persons;
    }
}
```

### 6，创建index.jsp测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5e4fa3e3-1024-42bd-a8a4-74a34fc98c56.png)

```html
  <body>
        <input type="button" id="btn1" value="hello">
        <input type="button" id="btn2" value="say">
        <input type="button" id="btn3" value="获取Person id=1 GET">
        <input type="button" id="btn4" value="添加Person POST">
        <input type="button" id="btn5" value="删除人员  DELETE">
        <input type="button" id="btn6" value="更新人员  PULL">
        <input type="button" id="btn7" value="全查询人员  PATCH">
  </body>

  <script type="text/javascript">

    $(function(){
        $("#btn3").click(function(){
            $.ajax({
                url : 'person/1',
                type : 'get',
                success : function(data) {
                    alert(data.name);
                },
                error : function(xhr, textStatus) {
                    alert(textStatus);
                },
            });
        });
        $("#btn4").click(function(){
            $.ajax({
                url : 'person',
                type : 'post',
                data:{id:11,name:'小明11',sex:'男',age:22},
                success : function(data) {
                    alert(data);
                },
                error : function(xhr, textStatus) {
                    alert(textStatus);
                },
            });
        });
        $("#btn5").click(function(){
            $.ajax({
                url : 'person/1',
                type : 'delete',
                success : function(data) {
                    alert(data);
                },
                error : function(xhr, textStatus) {
                    alert(textStatus);
                },
            });
        });
        $("#btn6").click(function(){
            $.ajax({
                url : 'person',
                type : 'put',
                data:{id:1,name:'小明222',sex:'男',age:22},
                success : function(data) {
                    alert(data);
                },
                error : function(xhr, textStatus) {
                    alert(textStatus);
                },
            });
        });
        $("#btn7").click(function(){
            $.ajax({
                url : 'person',
                type : 'patch',
                success : function(data) {
                    alert(data);
                },
                error : function(xhr, textStatus) {
                    alert(textStatus);
                },
            });
        });
    });
  </script>
```

# 14【了解】源码分析

## 1.tomcat启动时的加载的代码分析

### 1.web.xml--前端控制器

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab286379b-6f7d-46c6-a670-e627292cca9c.jpg)

### 2.DisaptcherServlet

         |-- FrameworkServlet

                            |-- HttpServletBean

                                               |--init方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2d4fbf72-2911-4043-8f74-3e5d899a6b14.jpg)

### 3.HttpServletBean

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa0107166-bb6c-4e6a-b19e-65aee1cfea5b.jpg)

里面有initServletBean();这个方法是在子里面重写的

### 4. FrameWorkServlet

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2637b398-dd75-43a8-b1b2-342f0c8d1448.jpg)

发现有initWebApplicationContext()

### 5.FrameWorkServlet -- initWebApplicationContext()

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae2e0568d-10b2-469d-8e64-69c05583b2a0.jpg)

有onRefresh()

发面不前类里面的onRefresh方法是空的，所有再找子类 DispactherServlet

### 6.DispatcherServlet-onRefresh

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora36f90d53-06af-441f-930c-153efd7f1c37.jpg)

### 7.DispatcherServlet- initStrategies()

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7e7faf43-59ac-48ed-b959-83b440ac281d.jpg)

这个方法加载完成之后启动的加载就完成

## 2.用户请求时的加载代码分析

http://127.0.0.1:8080/user/addUser.action

### 1.web.xml里面的前端控制器

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora32124027-5a91-4e2a-afb8-edfe7d8f10c5.jpg)

### 2.FrameWorkServlet

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3fc2784b-7d50-4453-a22d-775e2131b62b.jpg)

调用HttpServlet里面的service方法

service方法里面根据请求方式调用FrameWorkServlet里面的

doGET

doPost

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae42345fe-e1d1-4a42-bf01-778b9f187022.jpg)

### 3. FrameWorkServlet调用doXXX方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2d33f3f7-dfcd-4d81-a4b6-8d9fae49222c.jpg)

### 4.FrameWorkServlet-- processRequest

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7d92ff20-34fd-4219-8357-8dd3ab7737fb.jpg)

发面有doService的方法

### 5.DispatcherServlet-- doService

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabf326f8c-bbbd-418b-8d97-9ac70482f394.jpg)

### 6.DispatcherServlet-- doDispatch

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora43af216f-b1cf-4a19-bbe4-62a683ef2d6c.jpg)

执行Controller里面的相关方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora887cf6e9-fb49-40aa-80b0-383cb5fc7d38.jpg)

执行结果集的转发

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad7243646-bc10-4f1f-8363-0674a8e4965c.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora665e5b21-79f5-4d7e-a63a-322582c205d4.jpg)