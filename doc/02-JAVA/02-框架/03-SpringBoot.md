# 01【熟悉】spring的发展

## 1，Spring1.x时代

在Spring1.x时代，都是通过xml文件配置bean，随着项目的不断扩大，需要将xml配置分放到不同的配置文件中，需要频繁的在java类和xml配置文件中切换。

## 2，Spring2.x时代

随着JDK 1.5带来的注解支持，Spring2.x可以使用注解对Bean进行申明和注入，大大的减少了xml配置文件，同时也大大简化了项目的开发。

那么，问题来了，究竟是应该使用xml还是注解呢？

## 3，注解还是XML

在spring早期版本中，由于当时的JDK并不支持注解，因此只能使用XML的配置，很快，随着JDK升级到JDK5之后，它加入了注解的新特性，这样注解就被广泛地使用起来， 于是spring内部也分为两派，一派是使用XML的，一派是使用注解的，为了简化开发，在spring2.X之后的版本也引入了注解，不过是少量的注解，如@Component @Service等，但是功能还是不强大，因此对于srping的开发，大部分情况下还是使用XML为主，随着注解的增加，尤其是Servlet3.0之后，WEB容器可以脱离web.xml的部署，使用得WEB容器完全可以基于注解开发，对于spring3和spring4的版本注解功能越来越强大。对于XML的依赖起来越少，到了4.0完全可以脱离XML， 所以在spring中使用注解开发占据了主流地位，近年来。微服务的流行，越来越多的企业要求快速开发，所以spring Boot更加兴旺了。

1、应用的基本配置用xml，比如：数据源、资源文件等；

2、业务开发用注解，比如：Service中注入bean等；

## 4，Spring3.x到Spring4.x

从Spring3.x开始提供了Java配置方式，使用Java配置方式可以更好的理解你配置的Bean，现在我们就处于这个时代，并且Spring4.x和Springboot都推荐使用java配置的方式。

## 5，SpringBoot的优点

1，创建独立的spring应用程序。

2，嵌入的tomcat jetty 或者undertow 不用部署WAR文件。

3，允许通过Maven来根据需要获取starter

4，尽可能的使用自动配置spring

5，提供生产就绪功能，如指标，健康检查和外部配置

6，绝对没有代码生成，对XML没有要求配置

# 02【熟悉】springboot和微服务的介绍

## **1，springboot简介**

　Spring Boot 是由 Pivotal 团队提供的全新框架，其设计目的是用来简化新 Spring 应用的初始搭建以及开发过程。

　　该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。　　

　　通过这种方式，Spring Boot 致力于在蓬勃发展的快速应用开发领域（rapidapplication development）成为领导者。

## 2，为什么用springboot

　　创建独立的 Spring 应用程序

　　嵌入的 Tomcat，无需部署 WAR 文件

　　简化 Maven 配置

　　自动配置 Spring

　　提供生产就绪型功能，如指标，健康检查和外部配置

　　开箱即用，没有代码生成，也无需 XML 配置。

        与云计算天然集成  

## 3，特性理解

　　为基于 Spring 的开发提供更快的入门体验

　　开箱即用，没有代码生成，也无需 XML 配置。同时也可以修改默认值来满足特定的需求。

　　提供了一些大型项目中常见的非功能特性，如嵌入式服务器、安全、指标，健康检测、外部配置等。

　　Spring Boot 并不是对 Spring 功能上的增强，而是提供了一种快速使用 Spring 的方式。　

## 4，传统开发模式

所有的功能打包在一个 WAR包里，基本没有外部依赖（除了容器），部署在一个JEE容器（Tomcat，JBoss，WebLogic）里，包含了 DO/DAO，Service，UI等所有逻辑。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6330237478304388.png)



优点：

* 开发简单，集中式管理
* 基本不会重复开发
* 功能都在本地，没有分布式的管理和调用消耗

缺点：

* 效率低：开发都在同一个项目改代码，相互等待，冲突不断
* 维护难：代码功功能耦合在一起，新人不知道何从下手
* 不灵活：构建时间长，任何小修改都要重构整个项目，耗时
* 稳定性差：一个微小的问题，都可能导致整个应用挂掉
* 扩展性不够：无法满足高并发下的业务需求
* 对服务器的性能要求要统一，要高

## 5，微服务开发

微服务：架构风格(服务微化)

        微服务是指开发一个单个小型的但有业务功能的服务，每个服务都有自己的处理和轻量通信机制，可以部署在单个或多个服务器上，微服务也指一种松耦合的，有一定有界上下文的**面向服务的架构**       

 目的：有效的拆分应用，实现敏捷开发和部署

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.45713493581380926.png)

优点

    1，每个微服务都很小，这样能聚焦一个指定的业务功能或业务需求  

    2，微服务能够被小团队开发，这个小团队2-5人就可以完成了  

    3，微服务是松耦合的，是有功能，有意义的服务，无论在开发阶段或部署阶段都是独立的  

    4，微服务可以使用不同的语言开发  

    5，微服务能部署在中低端配置的服务器上  

    6，很容易和第三方集成  

    7，每个服务都有自己的存储能力，单独的库，也可以有统一的库  

缺点

    1，微服务会带来过多的操作  

    2，可以有双倍的努力   

    4，分布式系统可能复杂难管理  

    5，分布跟踪部署难  

    6，当服务数量增加时，管理复杂度增加

# 03【掌握】入门程序

## 1，环境准备

①JDK1.8

②maven3.x

③spring tools suite3.9

④springboot2.x版本

⑤spring5

---

## 2，创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora42e286ff-8d90-48cd-8409-269136afceaf.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafcd31a92-9130-4bd0-8ba0-9f8024177910.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora52925f57-fa7e-4827-b9fd-017e1b5bee4a.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3b7c0a34-4d39-4588-9b23-41dc21d3bc80.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa49a1092-3dc2-47ff-aa93-a83a759c0535.png)

---

## 3，pom.xml的配置说明

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.sxt</groupId>
    <artifactId>01_springboot_helloworld</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>01_springboot_helloworld</name>
    <description>Demo project for Spring Boot</description>
    <!-- 继承springboot的父项目 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.0.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!-- 配置版本 -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <!-- 添加Springboot对Web的依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- 添加测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <!-- maven插件的配置 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

```

## 4，创建UserController

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora18bf71eb-6a6c-47fa-b68b-ad5e6ca7fa04.png)

---

## 5，启动测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae14b6fcf-bf54-4e8c-91b5-b96c83d7de99.png)

[http://127.0.0.1:8080/user/hello](http://127.0.0.1:8080/user/hello)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0bcbc3e7-d5e7-448a-b729-121059c7f7b7.png)

---

## 6，jar包启动测试

右键项目run

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0fa7b3fb-dfd3-49cd-80b1-f50598bde0b2.png)

查看target

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora26e6da31-264e-4657-92e6-4da6a26cf1c5.png)

把jar包放到D盘，使用java -jar 01\_springboot\_helloworld-0.0.1-SNAPSHOT.jar来执行

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora79b1cd1c-4ee9-452d-a419-10b3d4641eb1.png)

测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora815036c5-1125-457c-8679-4279e6e51d61.png)

---

## 7，banner的修改

spring Boot启动的时候会有一个默认的启动图案。如下图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradf15554d-fbc3-441d-9a67-a166c30aacec.png)

(1).在src/main/resources路径下新建一个banner.txt文件，并输入想要的内容即可。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1fd884ef-3825-4098-8cd4-0a74f6e9ade9.png)



(2).我这里面用在线生成图案的网站 [http://www.network-science.de/ascii/如图](http://www.network-science.de/ascii/如图)



**https://www.cnblogs.com/yanyangxue2016/p/8963047.html**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora31431780-8228-4fc7-9703-4275ee0f2a5c.png)



再启动

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa7af4417-3a39-44b2-8ae3-5941d8b1c9d3.png)



也可以使用一张图片，取名叫banner.png/jpg放到src/main/resources里面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4c1f0bb3-a6be-4d2d-87d1-d5629a3a91a2.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae26288d1-1496-4bbb-9238-1d89528265e5.png)

也可以关闭banner

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafcbdc185-0567-4d14-8676-369df76045c3.png)

# 04【掌握】常用注解\[spring的java配置\]

Java配置是Spring4.x推荐的配置方式，可以完全替代xml配置。

## 1\. 相关注解说明

1、@Configuration作用于类上，相当于一个xml配置文件；  

2、@Bean作用于方法上，相当于xml配置中的；

3、@Import注解 在创建配置文件之后可以引入其它的配置文件

4、@ComponentScan("com.sxt")配置扫描

---

## 2\. 动手走两步\[实现IOC\]

1，创建Person接口

```java
public interface Person {
   void doWork();
}
```

2，创建Student类实现Person接口

```java
@Component
public class Student implements Person {
    @Override
    public void doWork() {
        System.out.println("学习");
    }
}
```

3，创建Teacher类  

```java
@Component
public class Teacher implements Person {
    @Override
    public void doWork() {
        System.out.println("上课");
    }
}
```

4，创建JavaConfigA类用于实例化  

```java
@Configuration
public class JavaConfigA {
//  @Bean
    @Bean("student")
    public Person getStudent() {
        return new Student();
    }
}
```

5，创建JavaConfigB用于实例化

```java
@Configuration
public class JavaConfigB {
//  @Bean
    @Bean("teacher")
    public Person getTeacher() {
        return new Teacher();
    }
}
```

6，测试及效果

```java
public class AppContextTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext(ParentConfig.class);
        Student student = context.getBean(Student.class);
        Teacher teacher = context.getBean(Teacher.class);
        student.doWork();
        teacher.doWork();
        //以下的方式会报错
        Person person = context.getBean(Person.class);
        person.doWork();
    }
}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa1ca0e73-b0e2-4a95-b93b-8e3b51aa0a33.png)

7，总结

从以上的示例中可以看出，使用Java代码就完美的替代xml配置文件，并且结构更加的清晰。

# 05【掌握】springboot启动分析【难点】

## 1，启动流程及注解分析

1，@SpringBootApplication SpringBoot应用标注在某个类上说明这个类是SpringBoot的主配置类，SpringBoot就应该运行这个类的main方法来启动springBoot的应用

```java
@Target(ElementType.TYPE)  // 只能作用到类上
@Retention(RetentionPolicy.RUNTIME)  // 运行时有效
@Documented // 文档
@Inherited
@SpringBootConfiguration // springboot的注解，包装了springConfiguration
@EnableAutoConfiguration  // 自动装配的注解
// 自动扫描的注解
@ComponentScan(excludeFilters = {
        @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
        @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
```

2，@SpringBootConfiguration 标记在某个类上表示是一个springboot的配置类和@Configuration 一样

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration {
}
```

3，@Configuration 注解方式的容器的标注

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
}
```

4，@EnableAutoConfiguration开启自动配置功能

以前我们要自己配置东西，现在spring boot帮我们自动配置自己动扫描，@EnableAutoConfiguration就是告诉springBoot开启自动配置功能，这样自动配置才会生效

```java
@Target(ElementType.TYPE) // 作用到类上
@Retention(RetentionPolicy.RUNTIME)  //运行时有效
@Documented // 文档
@Inherited
@AutoConfigurationPackage  // 自动扫描的包的配置
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {

    String ENABLED_OVERRIDE_PROPERTY = "spring.boot.enableautoconfiguration";

    /**
     * Exclude specific auto-configuration classes such that they will never be applied.
     * @return the classes to exclude
     */
    Class<?>[] exclude() default {};

    /**
     * Exclude specific auto-configuration class names such that they will never be
     * applied.
     * @return the class names to exclude
     * @since 1.3.0
     */
    String[] excludeName() default {};

}
```

5，@AutoConfigurationPackage自动扫包的配置

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import(AutoConfigurationPackages.Registrar.class) // 引入自动配置包的注册器
public @interface AutoConfigurationPackage {

}
```

6，@Import(AutoConfigurationPackages.Registrar.class)对当前启动类所在的包进行注册

7，AutoConfigurationPackages.Registrar.class

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab8f194bf-26b5-47db-9b23-0a76e449c527.png)

8，@Import(AutoConfigurationImportSelector.class)配置自动导包的配置

9，进入AutoConfigurationImportSelector.class打断点查看如何自动导包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa2a51356-19ed-4fe8-996c-b7b6d305735d.png)

先加载所有的自动导包。后面再过滤项目中没有用到的包

10，可以上spring-boot-autoconfigure-2.X.jar包里面查看

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5a9a9f14-674e-4abe-92b4-671762c59bf2.png)



11，springboot提供了哪些starter

[https://docs.spring.io/spring-boot/docs/2.1.0.RELEASE/reference/htmlsingle/#using-boot-starter](https://docs.spring.io/spring-boot/docs/2.1.0.RELEASE/reference/htmlsingle/#using-boot-starter)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabdced97d-ef83-4d99-988e-8912e32c9ab3.png)

# 07【掌握】springboot的两种配置文件语法

## 1，使用application.yml配置

1，创建Student类

```java
@Component  //声明是spring的组件
@ConfigurationProperties(prefix="student")//使用student前缀去ioc容器里面读取配置文件
public class Student {
    private Integer id;
    private String name;
    private String [] hobby;
    private List<String> lists;
    private Map<String,String> maps;
    private Set<String> sets;
    private Integer age;
    private Date birth;
    //get set方法
}
```

2，配置application.yml文件

```java
student:
  id: 1
  hobby:
  - 1
  - 2
  - 3
  lists:
  - 4
  - 5
  - 6
  name: 张三
  maps:
    key1: value1
  sets:
  - 1
  - 2
  age: ${student.id}
  birth:
    2018/11/20
```

---

3，测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6a9ebb97-fe35-460a-bbfa-7af57f8b58a5.png)

## 2，使用application.properties

```java
student.id=1
student.name=xiaoming
student.age=${random.int(10)}
student.hobby=1,2,3,4,5
student.lists=4,5,6
student.birth=2018/12/12
student.maps.key1=value1
student.maps.key2=${student.maps.key1}
student.sets=1,2,3
```

---

## 3，配置文件占位符

1，随机数

```xml
${random.int}生成一个int的随机数 
${random.value}生成一个随机数
${random.long}生成一个long的随机数据
${random.int(10)}生成0-10的随机int数
${random.int[10,100]} 生到10-100的随机int数
```

2，IOC容器对象读取

```xml
${sutudent.name}读取ioc容器里面的student对象里的name属性
```

---

## 4，两种方法的说明

1，如果properties里面配置了就不会去yml里面去取值，如果没有配置就会去yml里面去取

2，两种配置方法是互补的

## 5，提示包的引入

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeae9e780-d75f-48ce-a757-78aac9998d15.png)

是不是很爽

# 08【掌握】@Value读取配置文件及验证处理

## 1，创建Student2

```java
@Component
public class Student2 {
    @Value("${student.id}")
    private Integer id;
    @Value("${student.name}")
    private String name;
//  @Value("${student.hobby}")
    private String [] hobby;
//  @Value("${student.lists}")
    private List<String> lists;
//  @Value("${student.maps}")
    private Map<String,String> maps;
//  @Value("${student.sets}")
    private Set<String> sets;
    @Value("${student.age}")
    private Integer age;
    @Value("${student.birth}")
    private Date birth;
}
```

## 2，配置application.yml文件

```java
student:
  id: 1
  hobby:
  - 1
  - 2
  - 3
  lists:
  - 4
  - 5
  - 6
  name: 张三
  maps:
    key1: value1
  sets:
  - 1
  - 2
  age: ${student.id}
  birth:
    2018/11/20
```

## 3，总结说明

1，@Value只能注入普通的属性\[也就是基本数据类型和String\] 其它的复杂类型是不能取到值的

2，如果属性是使用驼峰命名法则不能使用属性名注入，要使用@Value("\${student.user-name}")来取值

不能使用@Value("\${student.userName}")来取值

## 4，@Value和@ConfigurationProperties取值比较

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2f93025e-aa03-4031-8138-fddcc151eff2.jpg)



## 5，注解验证

修改Student类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab75682f2-7b07-49f7-b04a-18376a8cc7aa.png)



**修改application.yml配置文件**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0bbe9cd2-1e64-4f23-ac1a-bf4e9a8cd29f.png)

**测试**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad410aefc-e7a5-4535-aef5-30dfa0fbde34.png)

# 09【掌握】@PropertySource@ImportResource@Bean注解

## 1，@PropertySource

1，为使用要使用@PropertySource

        上面的注入，所有的配置都是写在appliaction.properties或application.yml文件里，那么如果不想写在这里面怎么处理呢使用@PropertySource可以解决

2，注入优先级的问题

    所在的配置都是优先注入appliaction.properties或application.yml里面的数据  

    如果要不一样，必须修改配置文件引入的前缀  

3，创建Stduent

```java
@Component
@PropertySource("classpath:student.properties")//从student.properties里面读取值注入到对象里面
@ConfigurationProperties(prefix="student2")//设置student.properties的注值前缀
public class Student3 {
    private Integer id;
    private String name;
    private String [] hobby;
    private List<String> lists;
    private Map<String,String> maps;
    private Set<String> sets;
    private Integer age;
    private Date birth;
    public Integer getId() {
        return id;
    }
    //get set toString
}
```

4，创建student.properties

```java
student2.id=1
student2.name=xiaoming
student2.age=${random.int(10)}
student2.hobby=1,2,3,4,5
student2.lists=4,5,6
student2.birth=2018/12/12
student2.maps.key1=value1
student2.maps.key2=${student.maps.key1}
student2.sets=1,2,3
```

---

2，@ImportResource

1，为什么要使用@ImportResource

        从上面所有的配置中可以看出我们没有使用以前的spring的xml的配置方法，如果还是要使用spring里面的xml的配置方式怎么办理，使用@ImportResource

2，创建beans.xml

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<bean id="student" class="com.sxt.demo.Student">
    <property name="id" value="1"></property>
</bean>
</beans>
```

3，修改Student.java

```java
//什么注解也没有哦。说明没有被纳入到spring的ioc容器
public class Student {
    private Integer id;
    private String name;
    private String [] hobby;
    private List<String> lists;
    private Map<String,String> maps;
    private Set<String> sets;
    private Integer age;
    private Date birth;
}
```

4，修改启动配置类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora95f11159-e8fa-4724-8ce9-db5930ac77d0.png)

5，测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {
    @Autowired
    private ApplicationContext content;
    @Test
    public void contextLoads() {
        Student bean = (Student4)content.getBean("student");
        System.out.println(bean);
    }

}
```

---

3，@Bean  

前面已经说明过了哦，不懂的回去看04【掌握】常用注解\[spring的java配置\]

# 10【掌握】profiles配置详解

## 1，为什么要使用profiles

    在开发中，一般有两种环境  

        1，生产环境  \[项目上线，客户在使用中，就是生产环境\]  

        2，开发环境\[就是开发环境，不解释\]  

    有时候开发环境和生产环境的配置方法是不一样的，那么如何快速的切换呢，这里就要使用profiles文件

## 2，使用方法

1，创建applicatin-dev.properties

```java
server.port=8081
```

2，创建applicatin-pro.properties

```java
server.port=8082
```

3，修改application.properties

```java
#server.port=8080
spring.profiles.active=pro
```

4，运行测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora417408f9-1b8d-4ad5-b34d-33487a370395.png)

5，总结

在application.properteis里面激活哪个文件就会使用哪个端口

3，去掉application.properties的运行方式  

右键运行-->Run Configruations 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac57ff585-dcfe-4117-8ac2-0d7f2adad3dc.png)

进入设置运行时的虚拟机参数

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora41b31191-b43a-483d-9cc5-ff7fd75d282d.png)

```java
-Dspring.profiles.active=pro
```

---

4，去掉application.properties的jar包运行方式

1，打包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8514570f-8911-4416-b8ae-6d1198637fcc.png)

2，java -jar运行

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad3e9a167-a49e-4edb-b97c-c0a8ea60ab40.png)

D:\\>java -jar 01\_springboot\_helloworld-0.0.1-SNAPSHOT.jar --spring.profiles.acti

ve=pro

---

5，yml文件的多配置块的集成切换  

```java
spring: 
  profiles:
    active: pro
---
server:
  port: 8081
spring:
  profiles: dev
---

server:
  port: 8082
spring:
  profiles: pro
```

# 12【掌握】自动配置原理及@Conditional派生注解

**配置文件到底能写什么？怎么写？自动配置原理；**

配置文件属性参考表

[https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#common-application-properties](https://docs.spring.io/spring-boot/docs/1.5.9.RELEASE/reference/htmlsingle/#common-application-properties)

---

## 1，自动配置的原理

**1.SpringBoot启动的时候加载主配置类，开启了自动配置功能 @EnableAutoConfiguration**

```java
//@SpringBootApplication  SpringBoot启动的时候加载主配置类
@SpringBootApplication
public class SpringBootConfigAutoconfigApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootConfigAutoconfigApplication.class, args);
    }
```

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
//@EnableAutoConfiguration 开启了自动配置功能
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
)
public @interface SpringBootApplication {}
```

**2.@EnableAutoConfiguration 作用：**

利用AutoConfigurationImportSelector给容器中导入一些组件

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
//利用AutoConfigurationImportSelector选择器给Spring导入一些组件
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
```

可以查看AutoConfigurationImportSelector.java里的selectImports()方法的内容得知获取了哪些组件；

```java
 public String[] selectImports(AnnotationMetadata annotationMetadata) {
        if (!this.isEnabled(annotationMetadata)) {
            return NO_IMPORTS;
        } else {
            AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader.loadMetadata(this.beanClassLoader);
            AnnotationAttributes attributes = this.getAttributes(annotationMetadata);
            //获取候选的配置
            List<String> configurations = this.getCandidateConfigurations(annotationMetadata, attributes);
            configurations = this.removeDuplicates(configurations);
            Set<String> exclusions = this.getExclusions(annotationMetadata, attributes);
            this.checkExcludedClasses(configurations, exclusions);
            configurations.removeAll(exclusions);
            configurations = this.filter(configurations, autoConfigurationMetadata);
            this.fireAutoConfigurationImportEvents(configurations, exclusions);
            return StringUtils.toStringArray(configurations);
        }
！
```

```java
 protected List<String> getCandidateConfigurations(AnnotationMetadata metadata, AnnotationAttributes attributes) {
        //扫描所有jar包类路径下  META-INF/spring.factories
        //把扫描到的这些文件的内容包装成properties对象
        //从properties中获取到EnableAutoConfiguration.class类（类名）对应的值，然后把他们添加在容器中
        List<String> configurations = SpringFactoriesLoader.loadFactoryNames(this.getSpringFactoriesLoaderFactoryClass(), this.getBeanClassLoader());
        Assert.notEmpty(configurations, "No auto configuration classes found in META-INF/spring.factories. If you are using a custom packaging, make sure that file is correct.");
        return configurations;
    }
```

```java
 public static List<String> loadFactoryNames(Class<?> factoryClass, @Nullable ClassLoader classLoader) {
        String factoryClassName = factoryClass.getName();
        return (List)loadSpringFactories(classLoader).getOrDefault(factoryClassName, Collections.emptyList());
    }
```

```java
private static Map<String, List<String>> loadSpringFactories(@Nullable ClassLoader classLoader) {
        MultiValueMap<String, String> result = (MultiValueMap)cache.get(classLoader);
        if (result != null) {
            return result;
        } else {
            try {
                //扫描所有jar包类路径下  META-INF/spring.factories
                //把扫描到的这些文件的内容包装成properties对像
                Enumeration<URL> urls = classLoader != null ? classLoader.getResources("META-INF/spring.factories") : ClassLoader.getSystemResources("META-INF/spring.factories");
                LinkedMultiValueMap result = new LinkedMultiValueMap();

                while(urls.hasMoreElements()) {
                    URL url = (URL)urls.nextElement();
                    UrlResource resource = new UrlResource(url);
                    Properties properties = PropertiesLoaderUtils.loadProperties(resource);
                    Iterator var6 = properties.entrySet().iterator();

                    while(var6.hasNext()) {
                        Entry<?, ?> entry = (Entry)var6.next();
                        List<String> factoryClassNames = Arrays.asList(StringUtils.commaDelimitedListToStringArray((String)entry.getValue()));
                        result.addAll((String)entry.getKey(), factoryClassNames);
                    }
                }

                cache.put(classLoader, result);
                return result;
            } catch (IOException var9) {
                throw new IllegalArgumentException("Unable to load factories from location [META-INF/spring.factories]", var9);
            }
        }
    }
```

将类路径下 META-INF/spring.factories 里面配置的所有EnableAutoConfiguration的值加入到了容器中；

每一个这样的 xxxAutoConfiguration类都是容器中的一个组件，都加入到容器中；用他们来做自动配置；

```java
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.cloud.CloudAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
org.springframework.boot.autoconfigure.couchbase.CouchbaseAutoConfiguration,\
org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.cassandra.CassandraRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.couchbase.CouchbaseRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.elasticsearch.ElasticsearchRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.ldap.LdapRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoReactiveRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.neo4j.Neo4jRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.solr.SolrRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.data.redis.RedisRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.data.rest.RepositoryRestMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration,\
org.springframework.boot.autoconfigure.elasticsearch.jest.JestAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.h2.H2ConsoleAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastAutoConfiguration,\
org.springframework.boot.autoconfigure.hazelcast.HazelcastJpaDependencyAutoConfiguration,\
org.springframework.boot.autoconfigure.http.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.http.codec.CodecsAutoConfiguration,\
org.springframework.boot.autoconfigure.influx.InfluxDbAutoConfiguration,\
org.springframework.boot.autoconfigure.info.ProjectInfoAutoConfiguration,\
org.springframework.boot.autoconfigure.integration.IntegrationAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JndiDataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.XADataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JmsAutoConfiguration,\
org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.JndiConnectionFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.activemq.ActiveMQAutoConfiguration,\
org.springframework.boot.autoconfigure.jms.artemis.ArtemisAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.jersey.JerseyAutoConfiguration,\
org.springframework.boot.autoconfigure.jooq.JooqAutoConfiguration,\
org.springframework.boot.autoconfigure.jsonb.JsonbAutoConfiguration,\
org.springframework.boot.autoconfigure.kafka.KafkaAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapAutoConfiguration,\
org.springframework.boot.autoconfigure.ldap.LdapAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration,\
org.springframework.boot.autoconfigure.mail.MailSenderValidatorAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.quartz.QuartzAutoConfiguration,\
org.springframework.boot.autoconfigure.reactor.core.ReactorCoreAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityRequestMatcherProviderAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration,\
org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration,\
org.springframework.boot.autoconfigure.sendgrid.SendGridAutoConfiguration,\
org.springframework.boot.autoconfigure.session.SessionAutoConfiguration,\
org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientAutoConfiguration,\
org.springframework.boot.autoconfigure.solr.SolrAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.jta.JtaAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.client.RestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.web.embedded.EmbeddedWebServerFactoryCustomizerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.HttpHandlerAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.ReactiveWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.WebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.error.ErrorWebFluxAutoConfiguration,\
org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.DispatcherServletAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.ServletWebServerFactoryAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.HttpEncodingAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.MultipartAutoConfiguration,\
org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.reactive.WebSocketReactiveAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketServletAutoConfiguration,\
org.springframework.boot.autoconfigure.websocket.servlet.WebSocketMessagingAutoConfiguration,\
org.springframework.boot.autoconfigure.webservices.WebServicesAutoConfiguration
```

**3.每一个自动配置类进行自动配置功能；**

**4.以HttpEncodingAutoConfiguration（Http编码自动配置）为例解释自动配置原理；**

根据当前不同的条件判断，决定这个配置类是否生效？

一但这个配置类生效；这个配置类就会给容器中添加各种组件；这些组件的属性是从对应的properties类中获取的，这些类里面的每一个属性又是和配置文件绑定的；

```java
@Configuration  //表示这是一个配置类，以前编写的配置文件一样，也可以给容器中添加组件
//自动启动指定类的ConfigurationProperties功能；将配置文件中对应的值和HttpEncodingProperties绑定起来；并把HttpEncodingProperties加入到ioc容器中
@EnableConfigurationProperties({HttpEncodingProperties.class})
//Spring底层@Conditional注解，根据不同的条件，如果满足指定的条件，整个配置类里面的配置就会生效；判断当前应用是否是web应用，如果是，当前配置类生效
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
//判断当前项目有没有这个类CharacterEncodingFilter；SpringMVC中进行乱码解决的过滤器；
@ConditionalOnClass({CharacterEncodingFilter.class})
//判断配置文件中是否存在某个配置spring.http.encoding.enabled；如果不存在，判断也是成立的
//即使我们配置文件中不配置pring.http.encoding.enabled=true，也是默认生效的；
@ConditionalOnProperty(prefix = "spring.http.encoding", value = "enabled", matchIfMissing = true)
public class HttpEncodingAutoConfiguration {

    //它已经和SpringBoot的配置文件映射了
    private final HttpEncodingProperties properties;

    //只有一个有参构造器的情况下，参数的值就会从容器中拿
    public HttpEncodingAutoConfiguration(HttpEncodingProperties properties) {
        this.properties = properties;
    }

    @Bean  //给容器中添加一个组件，这个组件的某些值需要从properties中获取
    @ConditionalOnMissingBean //判断容器没有CharacterEncodingFilter这个组件？
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
        filter.setEncoding(this.properties.getCharset().name());
        filter.setForceRequestEncoding(this.properties.shouldForce(Type.REQUEST));
        filter.setForceResponseEncoding(this.properties.shouldForce(Type.RESPONSE));
        return filter;
    }
```

所有在配置文件中能配置的属性都是在xxxxProperties类中封装着；配置文件能配置什么就可以参照某个功能对应的这个属性类

```java
//从配置文件中获取指定的值和bean的属性进行绑定
@ConfigurationProperties(prefix = "spring.http.encoding")
public class HttpEncodingProperties {
    public static final Charset DEFAULT_CHARSET;
```

**5.总结：**

```java
- SpringBoot启动会加载大量的自动配置类
- 我们看我们需要的功能有没有SpringBoot默认写好的自动配置类；
- 我们再来看这个自动配置类中到底配置了哪些组件；（只要我们要用的组件有，我们就不需要再来配置了）
- 给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们就可
以在配置文件中指定这些属性的值；
    - xxxxAutoConfigurartion：自动配置类；给容器中添加组件
    - xxxxProperties:封装配置文件中的默认配置
```

---

## 2，@Conditional派生注解关属性；

作用：必须是@Conditional指定的条件成立，才给容器中添加组件，配置配里面的所有内容才生效；

```java
@ConditionalOnJava  系统的java版本是否符合要求
@ConditionalOnBean  容器中存在指定Bean；
@ConditionalOnMissingBean   容器中不存在指定Bean；
@ConditionalOnExpression    满足SpEL表达式指定
@ConditionalOnClass 系统中有指定的类
@ConditionalOnMissingClass  系统中没有指定的类
@ConditionalOnSingleCandidate   容器中只有一个指定的Bean，或者这个Bean是首选Bean
@ConditionalOnProperty  系统中指定的属性是否有指定的值
@ConditionalOnResource  类路径下是否存在指定资源文件
@ConditionalOnWebApplication    当前是web环境
@ConditionalOnNotWebApplication 当前不是web环境
@ConditionalOnJndi  JNDI存在指定项
```

自动配置类必须在一定的条件下才能生效；

我们怎么知道哪些自动配置类生效?

我们可以通过启用debug=true属性(在配置文件配置)；来让控制台打印自动配置报告，这样我们就可以很方便的知道哪些自动配置类生效；

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7b37e005-065b-4be5-8028-34e444a20958.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora84432af0-e6c6-4f63-873c-c3eef64b421c.png)

# 13【掌握】web静态资源访问规则

## 1，springboot访问静态资源的几种方式

```java
(1)在src/main/resources/目录下创建 
        static文件夹 
(2)在src/main/resources/目录下创建 
        resources文件夹 
(3)在src/main/resources/目录下创建 
        public文件夹 
(4)在src/main/resources/目录下创建 
        META-INF/resources文件夹 
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora13d9295c-6079-49a3-a652-ac87d537b8ea.png)

如果每个目录下面都有相同的文件，那么访问的优先级为

META-INF>resources>static>public

---

## 2，自定义静态文件配置的方式

**1，创建JAVA类**

```java
@Configuration
//1.5的版本是继承WebMvcConfigurerAdapter  2.0是直接实现WebMvcConfigurer的接口
public class MyWebMvcConfigurer implements WebMvcConfigurer{

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/test/**").addResourceLocations("classpath:/teststatic/");
        WebMvcConfigurer.super.addResourceHandlers(registry);
    }
}
```

**2，创建一个java类实现WebMvcConfigurer类并且重写addResourceHandlers方法**，参数引用ResourceHandlerRegistry类这个对象调用addResourceHandler以及addResourceLocations方法，从俩个方法名我们不难看出前者是提供资源访问路径而后者是本地项目路径，那到底是什么意思呢？下面举例说明一下： 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4b999443-a0db-47fe-88b1-d4af98516e12.png)

**3，看完自定义访问静态资源不知道大家有没有猜到为什么springboot可以访问/META-INF/resources，resources，static，public这4个文件夹下的静态资源，并且直接访问文件名称即可。**

下面我们来看一下springboot中的源码： 

(1)打开WebMvcAutoConfiguration\$WebMvcAutoConfigurationAdapter类找到addResourceHandlers方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6653de62-f1ef-48a2-a0fc-4582f17ac0ce.png)

从图中我们可以看到首先将变量staticPathPattern赋值然后将获取的值赋给资源访问路径方法，下面我们看一下staticPathPattern的值为什么 

(2)打开WebMvcProperties类我们可以找到以下代码： 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraac587511-706b-45fc-9a3b-70f4a3fc73bf.png)

从图中我们可以看到值为/\*\*这也就解释了为什么springboot在访问静态资源的时候只访问资源啊名称即可。 

(3)下面我们继续查看WebMvcAutoConfiguration\$WebMvcAutoConfigurationAdapter类：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5bc4e5bc-99dc-4ec5-b5d5-1ba08e72c6d4.png)

打开getStaticLocations()方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac208aa1a-5e2e-49d2-8c11-2e5117bb53e8.png)

---

## 3，webjars的访问配置

 **1，什么是webjars**

WebJars是打包到JAR（Java Archive）文件中的客户端Web库（例如jQuery和Bootstrap）。

在基于JVM的Web应用程序中显式轻松地管理客户端依赖项

使用基于JVM的构建工具（例如Maven，Gradle，sbt，...）来下载客户端依赖项

了解您正在使用的客户端依赖项

传递依赖关系会自动解析，并可选择通过RequireJS加载

**2，springboot集成webjars**

    1，配置pom.xml

```Plain Text
    <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>3.1.1</version>
        </dependency>
```

    2，查看jar包  



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1e1133b7-25cf-48a3-89c2-bc2eb0fa22b5.png)



    3，重启服务测试  

[http://127.0.0.1:8080/webjars/jquery/3.1.1/jquery.min.js](http://127.0.0.1:8080/webjars/jquery/3.1.1/jquery.min.js)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora02b1c204-7a49-41e2-9b4a-87beadf85331.png)

**3，springboot是如何配置webjars的**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora501b4265-c851-4ac0-a2e7-0f00c3e04627.png)

# 14【掌握】thymeleaf模板的使用

## 1，thymeleaf概述

简单说， Thymeleaf 是一个跟 Velocity、FreeMarker 类似的模板引擎，它可以完全替代 JSP 。相较与其他的模板引擎，它有如下三个极吸引人的特点：

1、Thymeleaf 在有网络和无网络的环境下皆可运行，即它可以让美工在浏览器查看页面的静态效果，也可以让程序员在服务器查看带数据的动态页面效果。这是由于它支持 html 原型，然后在 html 标签里增加额外的属性来达到模板+数据的展示方式。浏览器解释 html 时会忽略未定义的标签属性，所以 thymeleaf 的模板可以静态地运行；当有数据返回到页面时，Thymeleaf 标签会动态地替换掉静态内容，使页面动态显示。

2、Thymeleaf 开箱即用的特性。它提供标准和spring标准两种方言，可以直接套用模板实现JSTL、 OGNL表达式效果，避免每天套模板、该jstl、改标签的困扰。同时开发人员也可以扩展和创建自定义的方言。

3、Thymeleaf 提供spring标准方言和一个与 SpringMVC 完美集成的可选模块，可以快速的实现表单绑定、属性编辑器、国际化等功能。

---

## 2，Spring Boot项目Thymeleaf模板页面存放位置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora35d1dc10-5940-4c74-97ce-0cd35f1e93e2.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2fffec24-6ac6-4ec9-b6b2-d8ed147457bd.png)

通过Thymeleaf类对集成所需的Bean进行自动配置，包括templateResolver、templateEngine和thymeleafViewResolver的配置。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora14c8696f-6e28-4b3d-97af-8da6a1502d03.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafada5eb0-6d6a-47f8-aae1-4143b30c4e0d.png)

---

## 3，通过Controller跳转到Thymeleaf的页面

**1，在templates下面创建index.html**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora858f2dda-95ad-4d1a-9b1a-82abee6f32ea.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>index</title>
</head>
<body>
    <h1>Thymeleaf Page: Welcome to Spring Boot World!</h1>
    <h1>File Location: resources/templates/index.html</h1>
</body>
</html>
```

**2，创建IndexController**

```java
@Controller
@RequestMapping("index")
public class IndexController {
    @RequestMapping("index")
    public String index() {
        return "index";
    }
}
```

**3，启动访问**

[http://127.0.0.1:8080/index/index](http://127.0.0.1:8080/index/index)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora98f8b66c-ccfe-49a3-bce1-e3493c0ca9c7.png)

---

## 4，Thymeleaf模板位置修改

**1，在main下载创建webapp/WEB-INF/page**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafe78d974-6cfc-4583-a91f-3ef8bb08ce9c.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>index</title>
</head>
<body>
    <h1>Thymeleaf Page: Welcome to Spring Boot World!</h1>
    <h1>File Location: src/main/webapp/WEB-INF/page/index.html</h1>
</body>
</html>
```

**2，修改application.yml**

```html
spring:
  thymeleaf:
    enabled: true     #设置是否可用，默认启动
    prefix: /WEB-INF/page/   #设置路径
    suffix: .htm    #设置文件后缀
    cache: false    #关闭缓存 【开发中关闭，发布后开启】
```

**3，启动访问**

[http://127.0.0.1:8080/index/index](http://127.0.0.1:8080/index/index)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5d8d5e4a-d0b4-4425-a814-5f3baddb913f.png)

---

## 5，Thymeleaf的相关语法

**1，简单表达式**   

　　1、变量的表达式：\${...}

　　2、选择变量表达式：\*{...}

　　3、信息表达式：#{...}

　　4、链接URL表达式：@{...}

**2，字面值**

　　1、文本文字：'one text', 'Another one!',…

　　2、文字数量：0, 34, 3.0, 12.3,…

　　3、布尔型常量：true, false

　　4、空的文字：null

　　5、文字标记：one, sometext, main,…

**3，文本处理**

　　1、字符串并置：+

　　2、文字替换：|The name is \${name}|

**4，表达式基本对象**

　　1、#ctx：上下文对象

　　2、#vars：上下文变量

　　3、#locale：上下文语言环境

　　4、#httpServletRequest：（只有在Web上下文）HttpServletRequest对象

　　5、#httpSession:（只有在Web上下文）HttpSession对象。

用法：US.

**5，实用工具对象**　

* dates： java.util的实用方法。对象:日期格式、组件提取等.
* calendars：类似于日期,但对于java.util。日历对象
* numbers：格式化数字对象的实用方法。
* strings：字符串对象的实用方法:包含startsWith,将/附加等。
* objects：实用方法的对象。
* bools：布尔评价的实用方法。
* arrays：数组的实用方法。
* lists：list集合。
* sets：set集合。
* maps：map集合。
* aggregates：实用程序方法用于创建聚集在数组或集合.
* messages：实用程序方法获取外部信息内部变量表达式,以同样的方式,因为它们将获得使用#{…}语法
* ids：实用程序方法来处理可能重复的id属性(例如,由于迭代)。

---

## 6，Thymeleaf代码提示功能

在Eclipse中安装Thymeleaf插件即可。

插件的地址为：

http://www.thymeleaf.org/eclipse-plugin-update-site/

安装方式参考[https://blog.csdn.net/king\_kgh/article/details/76084398](https://blog.csdn.net/king_kgh/article/details/76084398)

---

## 7，Thymeleaf读取xxx.propertis里面的对象【了解】

1，引入layui

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora224189cc-1de5-43de-aaf2-16cf29b0fa4a.png)

2，创建Student

```java
public class Student {
    private Integer id;
    private String name;
    private String sex;
    private Integer age;
    private String phone;
    private Date birth;
    //get set方法+构造方法
}
```

3，修改application.properties

```java
student.id=1
student.name=xiaoming
student.age=29
student.sex=man
student.birth=2018/12/12
student.phone=1590231311
```

4，修改IndexController

```java
@Controller
@RequestMapping("index")
public class IndexController {
    @RequestMapping("showStudent")
    public String showStudent(Model model) {
        return "showStudent";
    }
}
```

5，在templetes下载创建showStudent.html  

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" />
<title>学生信息</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" th:href="@{/layui/css/layui.css}" media="all">
</head>
<body>
    <fieldset class="layui-elem-field layui-field-title"
        style="margin-top: 20px;">
        <legend>卡片面板</legend>
    </fieldset>

    <div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-body">
                        编号: <span th:text="#{student.id}">1</span>
                    </div>
                    <div class="layui-card-body">
                        姓名: <span th:text="#{student.name}">老雷</span>
                    </div>
                    <div class="layui-card-body">
                        性别:<span th:text="#{student.sex}">男</span>
                    </div>
                    <div class="layui-card-body">
                        年龄:<span th:text="#{student.age}">29</span>
                    </div>
                    <div class="layui-card-body">
                        电话:<span th:text="#{student.phone}">15902738715</span>
                    </div>
                    <div class="layui-card-body">
                        生日:<span th:text="#{#dates.format(student.birth,'yyyy-MM-dd HH:mm:ss')}">2018年1月3日</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script th:src="@{layui/layui.js}" charset="utf-8"></script>
</html>
```

6，存在问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5d30cf47-92e7-401e-90c5-8223ea40dc3f.png)

出现以上的问题是没有正确读取xxx.properties文件里定义的学生信息。

7，解决上面的问题，创建I18NConfig

```java
@Configuration
public class I18NConfig {
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        // 是否加载消息
        messageSource.setUseCodeAsDefaultMessage(true);
        messageSource.setFallbackToSystemLocale(false);
        // 设置spring读取的配置文件的前缀名字
        messageSource.setBasename("application");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(2);
        return messageSource;
    }
}
setBaseName设置消息源的文件名，messageSource.setBasename("application");，表明消息源是以applicition打头的属性文件，如果要设置多个属性文件作为消息源，那么就要用setBaseNames方法来设置，比如：messageSource.setBasenames("student", "application"); 这样就有两个消息源：student.properties和application.properties。
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracca876e5-fc20-4ed9-a6d6-037fa1c473c9.png)

8，国际化创建application\_zh\_CN.properties  

```java
student.id=1
student.name=小明
student.age=29
student.sex=男
student.birth=2018-12-12
student.phone=1590231311
```

学生信息的中文版，到时会根据系统语言环境读取响应版本的属性文件。

9，刷新查看

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4ace880f-660d-426c-9e35-72a355a8d5ca.png)

大家可以看到，显示的学生信息中文版，说明读取的是application\_zh\_CN.properties属性文件里的数据。

---

8，Thymeleaf读取model里面的对象  

1，修改IndexController

```java
@Controller
@RequestMapping("index")
public class IndexController {
    @RequestMapping("showOneStudent")
    public String showOneStudent(Model model) {
        Student student=new Student(1, "xiaoming", "man", 25, "1341311311", new Date());
        model.addAttribute("student", student);
        return "showOneStudent";
    }
}
```

2，在templetes下创建showOneStudent.html【注意使用动态数据源】

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" />
<title>学生信息</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" th:href="@{/layui/css/layui.css}" media="all">
</head>
<body>
    <fieldset class="layui-elem-field layui-field-title"
        style="margin-top: 20px;">
        <legend>学生信息</legend>
    </fieldset>

    <div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-body">
                        编号: <span th:text="${student.id}">1</span>
                    </div>
                    <div class="layui-card-body">
                        姓名: <span th:text="${student.name}">老雷</span>
                    </div>
                    <div class="layui-card-body">
                        性别:<span th:text="${student.sex}">男</span>
                    </div>
                    <div class="layui-card-body">
                        年龄:<span th:text="${student.age}">29</span>
                    </div>
                    <div class="layui-card-body">
                        电话:<span th:text="${student.phone}">15902738715</span>
                    </div>
                    <div class="layui-card-body">
                        生日:<span th:text="${#dates.format(student.birth,'yyyy-MM-dd HH:mm:ss')}">2018年1月3日</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script th:src="@{layui/layui.js}" charset="utf-8"></script>
</html>

```

3，测试

[http://127.0.0.1:8080/index/showOneStudent](http://127.0.0.1:8080/index/showStudent)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora825d36d2-f7ef-42f4-90e0-a896692bb0a7.png)

---

## 9，Thymeleaf读取model里面的集合

1，修改IndexController

```java
@Controller
@RequestMapping("index")
public class IndexController {
    @RequestMapping("showAllStudent")
    public String showAllStudent(Model model) {
        List<Student> list=new ArrayList<>();
        for (int i = 1; i <=4; i++) {
            list.add(new Student(i, "小明", "男", 22+i, "123413131"+i, new Date()));
        }
        model.addAttribute("list", list);
        return "showAllStudent";
    }
}
```

1，在templetes下创建showAllStudent.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="UTF-8" />
<title>学生信息</title>
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" th:href="@{/layui/css/layui.css}" media="all">
</head>
<body>
    <fieldset class="layui-elem-field layui-field-title"
        style="margin-top: 20px;">
        <legend>学生信息</legend>
    </fieldset>

    <div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md6" th:each="student:${list}">
                <div class="layui-card" >
                    <div class="layui-card-body">
                        编号: <span th:text="${student.id}">1</span>
                    </div>
                    <div class="layui-card-body">
                        姓名: <span th:text="${student.name}">老雷</span>
                    </div>
                    <div class="layui-card-body">
                        性别:<span th:text="${student.sex}">男</span>
                    </div>
                    <div class="layui-card-body">
                        年龄:<span th:text="${student.age}">29</span>
                    </div>
                    <div class="layui-card-body">
                        电话:<span th:text="${student.phone}">15902738715</span>
                    </div>
                    <div class="layui-card-body">
                        生日:<span th:text="${#dates.format(student.birth,'yyyy-MM-dd HH:mm:ss')}">2018年1月3日</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script th:src="@{layui/layui.js}" charset="utf-8"></script>
</html>

```

3，测试

[http://127.0.0.1:8080/index/showAllStudent](http://127.0.0.1:8080/index/showOneStudent)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraab400c15-f1ca-4fd1-b67f-9801b0b7b262.png)

10，Themeleaf在js中取值  

```html
<script th:inline="javascript">
var name = [[${student.name}]];
alert(name)
</script>
```

---

## 11，访问带参数的消息

1，修改applicaion.properties

```html
sxt.welcome=欢迎{0} 来到武汉尚学堂
```

2，修改页面



3，效果

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora51d0807f-edf5-41e6-9bd7-e53ae8729cdd.png)

---

## 12，ThymeleafObjects的使用

1，修改IndexController

```java
@RequestMapping("showObject")
    public String showObject(HttpServletRequest req,HttpServletResponse resp) {
        ServletContext context = req.getServletContext();
        context.setAttribute("book", "上下五千年");
        HttpSession session=req.getSession();
        session.setAttribute("name", "习大大");
        return "showObject";
    }
}
```

2，创建showObject.html

```html
<div style="padding: 20px; background-color: #F2F2F2;">
        <div class="layui-row layui-col-space15">
            <div class="layui-col-md12">
                <div class="layui-card">
                    <div class="layui-card-body">
                        我爱的书名: <span th:text="${application.book}"></span>
                    </div>
                    <div class="layui-card-body">
                        我的姓名: <span th:text="${#httpSession.getAttribute('name')}"></span><br>
                        我的姓名: <span th:text="${session.name}"></span><br>
                    </div>
                    <div class="layui-card-body">
                        我的国家: <span
                            th:text="${#locale.country}+'-'+${#locale.getDisplayCountry()}"></span>
                    </div>
                    <div class="layui-card-body">
                        我的母语：<span
                            th:text="${#locale.language}+'-'+${#locale.getDisplayLanguage()}"></span>
                    </div>
                    <div class="layui-card-body">
                        时间：<span th:text="${#dates.format(#dates.createNow())}"></span>
                    </div>
                    <div class="layui-card-body">
                        收入：<span
                            th:text="'￥'+${#numbers.formatDecimal(2345.5645345, 3, 2)}"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
```

3，测试效果[http://127.0.0.1:8080/index/showObject](http://127.0.0.1:8080/index/showObject)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabb2874ac-a5ca-4cf2-90af-5868d6ec25b1.png)

---

## 13，Thymeleaf链接传值

```html
<a th:href="@{/index(username='admin',password='1234546')}"
```

# 15【掌握】AOP开发

## 1，概述

aop是spring的两大功能模块之一,功能非常强大,为解耦提供了非常优秀的解决方案。SpringBoot集成aop是非常方便的，下面使用aop来拦截业务组件的方法

---

## 2，使用方法

**1，添加maven依赖**

```java
 <dependency>
         <groupId>org.springframework.boot</groupId>  
         <artifactId>spring-boot-starter-aop</artifactId>  
     </dependency>  

```

**2，创建切面类并配置**

```java
@Aspect
@Component
public class MyAspect {
    //切入点
    @Pointcut("execution(* com.sxt.service.impl.*.*(..))")
    public void pc(){}  
    //前置通知
    @Before("pc()")
    public void doBefore() {
        System.out.println("前置通知");
    }
  //后置返回通知
    @AfterReturning(returning = "ret", pointcut = "pc()")  
    public void doAfterReturning(Object ret) {  
        // 处理完请求，返回内容  
        System.out.println("方法的返回值 : " + ret);  
    }  
}
```

---

# 16【掌握】管理及扩展springmvc组件

## 1，springmvc自动管理springmvc的源码分析

**1，前端控制器的自动管理**

    1.1找到WebMvcAutoConfiguration

```java
@Configuration  //配置类
@ConditionalOnWebApplication(type = Type.SERVLET)  //如果有servlet容器生效
//如果有Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class这些类生效
@ConditionalOnClass({ Servlet.class, DispatcherServlet.class, WebMvcConfigurer.class })
//如果有如果缺失WebMvcConfigurationSupport做的事
@ConditionalOnMissingBean(WebMvcConfigurationSupport.class)
//自动配置的顺序
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE + 10)
//配置完成之后再加载的类
@AutoConfigureAfter({ DispatcherServletAutoConfiguration.class,
        ValidationAutoConfiguration.class })
public class WebMvcAutoConfiguration {

    public static final String DEFAULT_PREFIX = "";

    public static final String DEFAULT_SUFFIX = "";

    private static final String[] SERVLET_LOCATIONS = { "/" };
    //******
}
```

  1.2找到DispatcherServletAutoConfiguration类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8e9e5af0-ecfe-4a69-8ce7-1a69c6cb7b49.png)

这里面的配置就是和springmvc里面的在web.xml里面的配置方式一样



**2，控制器的自动管理**

    就是包的自动扫描的设置  

**3，视图解析器的自动管理**

3.1查看WebMvcAutoConfiguration

```java
        //配置InternalResourceViewResolver视图解析器
        @Bean
        @ConditionalOnMissingBean
        public InternalResourceViewResolver defaultViewResolver() {
            InternalResourceViewResolver resolver = new InternalResourceViewResolver();
            resolver.setPrefix(this.mvcProperties.getView().getPrefix());
            resolver.setSuffix(this.mvcProperties.getView().getSuffix());
            return resolver;
        }
        //配置BeanNameViewResolver视图解析器
        @Bean
        @ConditionalOnBean(View.class)
        @ConditionalOnMissingBean
        public BeanNameViewResolver beanNameViewResolver() {
            BeanNameViewResolver resolver = new BeanNameViewResolver();
            resolver.setOrder(Ordered.LOWEST_PRECEDENCE - 10);
            return resolver;
        }
        //配置真正的视图解析器【作用，收集容器中拥有的视图解析器】
        @Bean
        @ConditionalOnBean(ViewResolver.class)
        @ConditionalOnMissingBean(name = "viewResolver", value = ContentNegotiatingViewResolver.class)
        public ContentNegotiatingViewResolver viewResolver(BeanFactory beanFactory) {
            ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
            resolver.setContentNegotiationManager(
                    beanFactory.getBean(ContentNegotiationManager.class));
            // ContentNegotiatingViewResolver uses all the other view resolvers to locate
            // a view so it should have a high precedence
            resolver.setOrder(Ordered.HIGHEST_PRECEDENCE);
            return resolver;
        }
        //配置LocaleResolver解析器
        @Bean
        @ConditionalOnMissingBean
        @ConditionalOnProperty(prefix = "spring.mvc", name = "locale")
        public LocaleResolver localeResolver() {
            if (this.mvcProperties
                    .getLocaleResolver() == WebMvcProperties.LocaleResolver.FIXED) {
                return new FixedLocaleResolver(this.mvcProperties.getLocale());
            }
            AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
            localeResolver.setDefaultLocale(this.mvcProperties.getLocale());
            return localeResolver;
        }

```

3.2查看ContentNegotiatingViewResolver是如何收集的

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9bb8eca3-3d90-4542-8843-fd1cacf66101.png)

默认的有四个解析器哦

3.2如何自定义前缀和后缀

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7b8a2f08-4afe-4fb2-ae6f-06ed39fea622.png)

上面的mvc:view：prefix要生效的必须加入内嵌tomcat对jsp的支持哦

3.3文件上传和下载的视图解析器  

MultipartAutoConfiguration  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf6ca9e57-db2c-4f65-bf20-07ef11c85c23.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4861e06e-e1bb-4711-8df6-98c544dcf727.png)

**4，静态资源的访问**  

见13【掌握】web静态资源访问规则

**5，消息转化\*\*\*\*和格式化转化**

    1，消息转化【接收页面参数并转化】  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8830001d-6088-4d7f-9e2d-1cf1e1f8f552.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6153fc52-ecff-4bdd-bc44-bb1986078508.png)

    2，格式化【接收页面参数并按某种格式格式化--如日期】  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3751df18-9d36-4d7f-adec-820223cc3f45.png)

这样配置接收页面参数就可以自动进行转化了  

**6，欢迎页面的自动配置**

在static下面创建index.html

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradf6958fe-b6e2-4949-8dba-c32963fd5578.png)

在WebMvcAutoConfiguration里面可以看到

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac7867a5a-a3dd-4afd-98d6-7a7393dc21a1.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa30eef81-f680-4928-a821-8d75dc522c54.png)

使用[http://127.0.0.1:8080/](http://127.0.0.1:8080/)直接访问就可以了  

---

## 2，springmvc自动管理springmvc的扩展设置

**1，在容器中注册视图控制器**

当页面跳转时，我们需要在Controller里面创建一个空方法去跳转，那么有没有别的配置方法呢

创建一个MvcConfig的配置类实现WebMvcConfigurer重写addViewControllers方法

```java
@Configuration
public class MvcConfig implements WebMvcConfigurer{
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/index/form").setViewName("form");
    }
}
```

这样配置配置之后访问http://127.0.0.1:8080/index/form就可以找到templetes/form.html页面了，不会写空方法嗅跳转了

**2，注册格式化器【了解】**

在之前的日期格式化中，我们使用spring.mvc.date-format=yyyy-MM-dd   进行日期格式化，那么如果想自己定义配置如何去注册呢

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora74bea243-9403-4fb7-ac30-b2d83af9f102.png)

删除配置文件里面的spring.mvc.date-format=yyyy-MM-dd去测试

**3，消息转化器扩展fastjson**  

1，添加maven的依赖

```java
<dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.53</version>
        </dependency>
```

2，修改MvcConfig

```java
@Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter fc=new FastJsonHttpMessageConverter();
        FastJsonConfig config=new FastJsonConfig();
        config.setSerializerFeatures(SerializerFeature.PrettyFormat);
        fc.setFastJsonConfig(config);
        converters.add(fc);
    }
```

3，给实体类加注解

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraec523999-a1ae-4048-a503-3d2c7bc34d15.png)

4，测试



**4，注册拦截器【掌握】**

1，创建拦截器

```java
public class MyHandlerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        System.out.println("前置拦截");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        System.out.println("后置拦截");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        System.out.println("最终拦截");
    }
}
```

2，修改MvcConfig  

```java
/**
     * 拦截器的注册
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //创建拦截器对象
        HandlerInterceptor interceptor = new MyHandlerInterceptor();
        //注册拦截器
        registry.addInterceptor(interceptor)
        .addPathPatterns("/**")//设置拦截路径
        .excludePathPatterns("/login/login*","login/toLogin*");//设置放行路径
    }

```

# 17【熟悉】内嵌WEB服务器加载原理【难点】

## 1，概述

    我们在使用springboot项目的时候并没有使用外部的tomcat，那么springboot是如何帮我们管理内置的服务器的呢？跟前雷哥继续看源代码  

## 2，服务器的相关配置

```java
server.address= # Network address to which the server should bind to.
server.context-path=/bjsxt #配置应用程序的访问地址如 http://127.0.0:8080/bjsxt默认为/
server.servlet.context-path=/bjsxt  #springboot2.0以上的配置
server.port=8080 #配置程序端口，默认为8080
server.servlet-path=/ #配置DispatcherServlet默认访问路径，默认为/ 可以为*.action
server.tomcat.uri-encoding=UTF-8 # 配置编码
server.session.timeout=1800    #用户绘画session过期时间，以秒为单位
```

---

## 3，原理

    1，查看@SpringBootApplication注解  

    2，查看@EnableAutoConfiguration 注解  

    3，查看AutoConfigurationImportSelector  类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac5872a29-a36a-4e2a-a1f3-58fa4840711d.png)

    在这里面加载了很多的自动的配置类，那么可以去自动配置的包里面找到

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae312e382-9d1c-4c50-a891-38b190cd2432.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora90a732cc-4098-416c-89f5-6859987566c5.png)

    4， 查看ServletWebServerFactoryAutoConfiguration  配置类  

        这个类是自动服务器的配置类，默认使用的是内嵌的tomcat  



```java
@Configuration//配置类型
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)//配置顺序
@ConditionalOnClass(ServletRequest.class)//必须有ServletRequest类
@ConditionalOnWebApplication(type = Type.SERVLET)//必须是servlet类型的应该
@EnableConfigurationProperties(ServerProperties.class)//配置服务器的相关属性
@Import({ ServletWebServerFactoryAutoConfiguration.BeanPostProcessorsRegistrar.class,
        ServletWebServerFactoryConfiguration.EmbeddedTomcat.class,//内嵌tomcat
        ServletWebServerFactoryConfiguration.EmbeddedJetty.class,//内嵌jetty
        ServletWebServerFactoryConfiguration.EmbeddedUndertow.class })//内嵌undertow
public class ServletWebServerFactoryAutoConfiguration {
}
```

5，查看ServerProperties.class

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraca8985e9-3ce7-467d-a767-b8c56b24c62b.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0a284c9c-a06c-481a-8f45-83584e4e2fb1.png)

    6，启动原理  

        查看 ServletWebServerFactoryAutoConfiguration  -- EmbeddedTomcat.class    



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora881e47b3-5312-414c-86c6-485e5f3a5720.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1621824a-17a2-4f99-a2f1-fa7d8f08ed60.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora91dbf44f-50ec-4b1b-8af0-5f3027831845.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraea22ade1-26f2-4dab-9c86-561c9e92eb1c.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0b18d0a9-3345-46d8-9111-17a0773d3726.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac6e1bd61-8c56-40f7-b6f9-41b663372235.png)

# 18【掌握】注册web三大组件

## 1，注册servlet

可以模仿DispatcherServlet的注入方式  --在DispatcherServletAutoConfiguration

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa413e10d-ee5b-4bf4-9e5b-d873fdec5355.png)

1，创建UserServlet

```java
public class UserServlet extends HttpServlet{

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        out.write("hello sxt");
        out.flush();
        out.close();
    }
}

```

2，在配置类里面注册

```java
@Bean
    public ServletRegistrationBean<UserServlet> getUserServlet() {
        ServletRegistrationBean<UserServlet> servletRegistrationBean=new ServletRegistrationBean<>();
        servletRegistrationBean.setServlet(new UserServlet());
        Collection<String> urlMappings=new ArrayList<>();
        urlMappings.add("/userServlet");
        servletRegistrationBean.setUrlMappings(urlMappings);

        // servletRegistrationBean.setLoadOnStartup(1); // 启动时加载
        // servletRegistrationBean.setInitParameters(initParameters);  // 注入servlet初始化的参数
        // servletRegistrationBean.addInitParameter(name,value); // 一个一个设置servlet初始化的参数


        return servletRegistrationBean;
    }
```

---

## 2，注册Filter

1，创建MyFilter

```java
public class MyFilter implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("前置拦截");
        chain.doFilter(request, response);//放行
        System.out.println("后置拦截");
    }
    @Override
    public void destroy() {

    }
}

```

2，在配置里面注册

```java
@Bean
    public FilterRegistrationBean<MyFilter> getMyFilter() {
        FilterRegistrationBean<MyFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new MyFilter());
        Collection<String> urlPatterns = new ArrayList<>();
        urlPatterns.add("/*");
        filterRegistrationBean.setUrlPatterns(urlPatterns);
        return filterRegistrationBean;
    }
```

3，在配置里面注册  

请求测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6914854b-f303-47e7-9674-9c5abf16abaf.png)

---

## 3，注册Listener

1，创建MyListener

```java
public class MyListener implements ServletContextListener{

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("ServletContextEvent被创建");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("ServletContextEvent被销毁");
    }

}
```

2，在配置里面注册  

```java
@Bean
    public ServletListenerRegistrationBean<MyListener> getMyListener(){
        ServletListenerRegistrationBean<MyListener> servletListenerRegistrationBean=new ServletListenerRegistrationBean<>();
        servletListenerRegistrationBean.setListener(new MyListener());
        return servletListenerRegistrationBean;
    }
```

3，启动测试  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorade0124aa-08a3-416d-983c-1ee63244d63c.png)

# 19【掌握】集成外部Tomcat配置

## 1，概述

    1，我们之前的项目都是使用springboot内置的tomcat来运行的，那会在开发中能不能使用外部的tomcat呢？当然可了

    2，springboot的内置tomcat不支持jsp，这也是开中我们要使用外部的tomcat的原因  

---

## 2，创建springboot的web项目

**1，new Spring Starter Project**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0f0a4a63-ee65-4a7b-9b3b-1e981d794345.png)

**2，下一步**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora793db88b-bcc2-4ae6-a748-0fb17b4f249c.png)

**3，下一步**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7b11d331-7cc0-43da-bb36-8ed1fec9ff79.png)

**4，完成**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad47b8d65-7bf1-4a89-b4dc-c1e8d0388a50.png)

**5，配置pom.xml的相关配置**  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.sxt</groupId>
    <artifactId>08_springboot_web</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>08_springboot_web</name>
    <description>Demo project for Spring Boot</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.6.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--加入对外部tomcat的依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <!--加入内嵌入tomcat对jsp的支持-->
        <dependency>
           <groupId>org.apache.tomcat.embed</groupId>
           <artifactId>tomcat-embed-jasper</artifactId>
           <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- 添加热部署依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <!-- optional=true, 依赖不会传递, 该项目依赖devtools -->
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- servlet 依赖 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <scope>provided</scope>
        </dependency>
        <!--jstl的依赖--->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jstl</artifactId>
            <version>1.1.2</version>
        </dependency>

        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>


    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>


</project>

```

**6，在main/webapp下创建index.jsp**

```xml
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
欢迎来到尚学堂
</body>
</html>
```

**7，选中下面的文件左键运行**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora54635dae-1b00-46f1-af96-3ff9e11df419.png)

**8，配置tomcat8**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac263ae29-fd73-4420-8482-7d85547cd541.png)



**9，下一步**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6a0b48ba-796b-4220-8780-b6d9ba87676b.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0571f56d-526e-4597-bf82-2a4506137f44.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6a089ca4-1e5f-41ea-9b5a-04cfb74ad957.png)

**10，测试**  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae7cc0045-3fa7-4e98-a703-ba0c5eb07520.png)

**11，关于其它配置的使用方法和springmvc的使用方法一样**

# 21【熟悉】集成JdbcTemplate

## 1，概述

JdbcTemplate 是spring封装的一个对数据库操作的类，在springBoot里面已经默认的自己配置进去了

可以查看JdbcTemplateAutoConfiguration 这个配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora72ad547f-0de3-4d4f-8f38-d68de516ae23.png)

---

## 2，创建表

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora96df48f7-7284-4a3e-b4f3-be9b7e0d916f.jpg)

```java
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `sid` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) DEFAULT NULL,
  `saddress` varchar(255) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  KEY `FK_47dx1ejhx6w9qu1vp3goba90` (`cid`),
  CONSTRAINT `FK_47dx1ejhx6w9qu1vp3goba90` FOREIGN KEY (`cid`) REFERENCES `classes` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '习大大', '中南海', '1');
INSERT INTO `student` VALUES ('2', '李总', '中南海', '1');
```

---

## 3，测试

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void contextLoads() {
        List<Map<String,Object>> list = jdbcTemplate.queryForList("select * from student");
        System.out.println(list);
    }
}
```

# 22【掌握】整合mybatis及事务处理

## 1，准备工作

1，复制上一个项目

2，添加mybatis的stater

```xml
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.2</version>
        </dependency>
```

3，准备数据库

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7ad7dfd7-6989-4978-9d50-159d70c01497.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora37afc948-0e3a-4045-9ba2-c4b66d21785e.jpg)

## 2，注解方式的整合

**1，创建User**

```java
public class User {
    private Integer userId;
    private String userName;
    private String userAddress; 
    public User() {
        // TODO Auto-generated constructor stub
    }
    public User(Integer userId, String userName, String userAddress) {
        super();
        this.userId = userId;
        this.userName = userName;
        this.userAddress = userAddress;
    }
}
```

**2，创建UserMapper**

```java
@Mapper
public interface UserMapper {
    @Delete("delete from sys_user where user_id=#{value}")
    int deleteByPrimaryKey(Integer userId);

    @Insert("insert into sys_user(user_name,user_address) values(#{userName},#{userAddress})")
    int insert(User record);

    @Select("select user_id as userId, user_name as userName, user_address as userAddress from sys_user where user_id=#{value} ")
    User selectByPrimaryKey(Integer userId);

    @Insert("update sys_user set user_name=#{userName},user_address=#{userAddress} where user_id=#{userId}")
    int updateByPrimaryKey(User record);

    @Select("select user_id as userId, user_name as userName, user_address as userAddress from sys_user")
    List<User> queryAllUser();
}
```

**3，测试**

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void insert() {
        int insert = userMapper.insert(new User(1, "小明", "武汉"));
        System.out.println(insert);
    }
    @Test
    public void update() {
        User user = new User(1, "大明", "大武汉");
        int num = userMapper.updateByPrimaryKey(user);
        System.out.println(num);
    }
    @Test
    public void delete() {
        int num = userMapper.deleteByPrimaryKey(1);
        System.out.println(num);
    }
    @Test
    public void queryOne() {
        User user = userMapper.selectByPrimaryKey(1);
        System.out.println(user);
    }
    @Test
    public void queryAll() {
        List<User> list = userMapper.queryAllUser();
        for (User user : list) {
            System.out.println(user);
        }
    }
}
```

---

## 3，配置文件方式的整合

**1，修改UserMapper**

```java
//@Mapper
public interface UserMapper {
    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKey(User record);

    List<User> queryAllUser();
}
```

**2，在resources/mapping/创建UserMapper.xml**  

```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.sxt.mapper.UserMapper" >
  <resultMap id="BaseResultMap" type="com.sxt.domain.User" >
    <id column="user_id" property="userId" jdbcType="INTEGER" />
    <result column="user_name" property="userName" jdbcType="VARCHAR" />
    <result column="user_address" property="userAddress" jdbcType="VARCHAR" />
  </resultMap>
  <sql id="Base_Column_List" >
    user_id, user_name, user_address
  </sql>
  <select id="selectByPrimaryKey" resultMap="BaseResultMap" parameterType="java.lang.Integer" >
    select 
    <include refid="Base_Column_List" />
    from sys_user
    where user_id = #{userId,jdbcType=INTEGER}
  </select>
  <delete id="deleteByPrimaryKey" parameterType="java.lang.Integer" >
    delete from sys_user
    where user_id = #{userId,jdbcType=INTEGER}
  </delete>
  <insert id="insert" parameterType="com.sxt.domain.User" >
    insert into sys_user (user_id, user_name, user_address
      )
    values (#{userId,jdbcType=INTEGER}, #{userName,jdbcType=VARCHAR}, #{userAddress,jdbcType=VARCHAR}
      )
  </insert>
  <insert id="insertSelective" parameterType="com.sxt.domain.User" >
    insert into sys_user
    <trim prefix="(" suffix=")" suffixOverrides="," >
      <if test="userId != null" >
        user_id,
      </if>
      <if test="userName != null" >
        user_name,
      </if>
      <if test="userAddress != null" >
        user_address,
      </if>
    </trim>
    <trim prefix="values (" suffix=")" suffixOverrides="," >
      <if test="userId != null" >
        #{userId,jdbcType=INTEGER},
      </if>
      <if test="userName != null" >
        #{userName,jdbcType=VARCHAR},
      </if>
      <if test="userAddress != null" >
        #{userAddress,jdbcType=VARCHAR},
      </if>
    </trim>
  </insert>
  <update id="updateByPrimaryKeySelective" parameterType="com.sxt.domain.User" >
    update sys_user
    <set >
      <if test="userName != null" >
        user_name = #{userName,jdbcType=VARCHAR},
      </if>
      <if test="userAddress != null" >
        user_address = #{userAddress,jdbcType=VARCHAR},
      </if>
    </set>
    where user_id = #{userId,jdbcType=INTEGER}
  </update>
  <update id="updateByPrimaryKey" parameterType="com.sxt.domain.User" >
    update sys_user
    set user_name = #{userName,jdbcType=VARCHAR},
      user_address = #{userAddress,jdbcType=VARCHAR}
    where user_id = #{userId,jdbcType=INTEGER}
  </update>

   <select id="queryAllUser" resultMap="BaseResultMap">
    select 
    <include refid="Base_Column_List" />
    from sys_user
  </select>
</mapper>
```

**3，配置application.yaml**

```html
mybatis:
  config-location: classpath:mybatis.cfg.xml  #核心配置文件的路径
  mapper-locations:
  - classpath:mapping/*.xml   #mapper的xml的路径
  type-aliases-package: com.sxt.domain   #类别名的路径
```

**4，测试**  

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void insert() {
        int insert = userMapper.insert(new User(1, "小明", "武汉"));
        System.out.println(insert);
    }
    @Test
    public void update() {
        User user = new User(1, "大明", "大武汉");
        int num = userMapper.updateByPrimaryKey(user);
        System.out.println(num);
    }
    @Test
    public void delete() {
        int num = userMapper.deleteByPrimaryKey(1);
        System.out.println(num);
    }
    @Test
    public void queryOne() {
        User user = userMapper.selectByPrimaryKey(1);
        System.out.println(user);
    }
    @Test
    public void queryAll() {
        List<User> list = userMapper.queryAllUser();
        for (User user : list) {
            System.out.println(user);
        }
    }
}
```

---

## 4，配置PageHelper插件

**1，配置方式1**

依赖pageHelper

```xml
<dependency>
   <groupId>com.github.pagehelper</groupId>
   <artifactId>pagehelper</artifactId>
   <version>5.1.8</version>
</dependency>
```

修改mybatis.cfg.xml

```xml
<configuration>
    <settings>
        <setting name="logImpl" value="LOG4J"/>
    </settings>
    <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins> 
</configuration>

```

测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf6c4b6a7-fd38-4572-9ed4-fb407a2a2673.png)



**2，配置方式2【推荐】**

修改pom.xml

修改mybatis.cfg.xml

```xml
<configuration>
    <settings>
        <setting name="logImpl" value="LOG4J"/>
    </settings>

<!-- 注释掉这个  <plugins>
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins> -->
</configuration>

```

测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5565ac8a-4126-4917-a241-856d80049088.png)

## 5，配置日志

1，修改pom.xml

2，修改yml

```xml
mybatis:
  #config-location: classpath:mybatis.cfg.xml   #加载核心配置文件
  mapper-locations:   #配置Mapper.xml的地址
  - classpath:mapper/*/*.xml  
  # mybaits的sql 和参数的日志输出
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

3，删除mybatis.cfg.xml

4，测试

---

## 5，事务处理

在Spring Boot中推荐使用@Transactional注解来声明事务。只需要在需要事务控制的方法或类（全部方法有效）上增加 @Transactional注解。原理是Spring Boot会自动默认分别注入DataSourceTransactionManager或JpaTransactionManager  

@Transactional不光可以注解在方法上，也可以注解在类上，当注解在类上的时候意味着此类的所有public方法都是开启事务的，如果类级别和方法级别同时使用了@Transactional注解，则使用在类级别的注解会重载方法级别的注解

以上的配置方法是一个一个的service去加，没有简单的方法呢，肯定可以哦

使用AOP的切面配置方式

1，引入AOP的依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

2，创建事务配置类

```java
@Aspect
@Configuration
public class TransactionAdviceConfig {
    private static final String AOP_POINTCUT_EXPRESSION = "execution (* com.***.service.*.*(..))";

    @Autowired
    private PlatformTransactionManager transactionManager;

    @Bean
    public TransactionInterceptor txAdvice() {

        DefaultTransactionAttribute txAttr_REQUIRED = new DefaultTransactionAttribute();
        txAttr_REQUIRED.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

        DefaultTransactionAttribute txAttr_REQUIRED_READONLY = new DefaultTransactionAttribute();
        txAttr_REQUIRED_READONLY.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        txAttr_REQUIRED_READONLY.setReadOnly(true);
        NameMatchTransactionAttributeSource source = new NameMatchTransactionAttributeSource();
        source.addTransactionalMethod("add*", txAttr_REQUIRED);
        source.addTransactionalMethod("save*", txAttr_REQUIRED);
        source.addTransactionalMethod("delete*", txAttr_REQUIRED);
        source.addTransactionalMethod("update*", txAttr_REQUIRED);
        source.addTransactionalMethod("exec*", txAttr_REQUIRED);
        source.addTransactionalMethod("set*", txAttr_REQUIRED);
        source.addTransactionalMethod("get*", txAttr_REQUIRED_READONLY);
        source.addTransactionalMethod("query*", txAttr_REQUIRED_READONLY);
        source.addTransactionalMethod("find*", txAttr_REQUIRED_READONLY);
        source.addTransactionalMethod("list*", txAttr_REQUIRED_READONLY);
        source.addTransactionalMethod("count*", txAttr_REQUIRED_READONLY);
        source.addTransactionalMethod("is*", txAttr_REQUIRED_READONLY);
        return new TransactionInterceptor(transactionManager, source);
    }
    @Bean
    public Advisor txAdviceAdvisor() {
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression(AOP_POINTCUT_EXPRESSION);
        return new DefaultPointcutAdvisor(pointcut, txAdvice());
    }
}

```

这样配置就不用在每个service上加事务注解了哦

# 23【掌握】springboot集成swagger

## 1，问题描述

随着互联网技术的发展，现在的网站架构基本都由原来的后端渲染，变成了：前端渲染、先后端分离的形态，而且前端技术和后端技术在各自的道路上越走越远。 前端和后端的唯一联系，变成了API接口；API文档变成了前后端开发人员联系的纽带，变得越来越重要，swagger就是一款让你更好的书写API文档的框架，而且swagger可以完全模拟http请求，入参出参和实际情况差别几乎为零。

　　没有API文档工具之前，大家都是手写API文档的（维护起来相当困难），在什么地方书写的都有，有在confluence上写的，有在对应的项目目录下readme.md上写的，每个公司都有每个公司的玩法，无所谓好坏。但是能称之为“框架”的，估计也只有swagger了

---

## 2，使用步骤

**1，创建springboot项目配置pom.xml**

**2，配置启动类**

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**3，创建Swagger的配置类**

```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket swaggerSpringMvcPlugin() {
        return new Docket(DocumentationType.SWAGGER_2).select()
    .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class)).build();
    }
}

```

**4，创建User**

```java
public class User {
    private Integer userId;
    private String userName;
    private String address;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone="GMT+8")
    private Date birth;

    public User() {
    }

    public User(Integer userId, String userName, String address, Date birth) {
        super();
        this.userId = userId;
        this.userName = userName;
        this.address = address;
        this.birth = birth;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    @Override
    public String toString() {
        return "User [userId=" + userId + ", userName=" + userName + ", address=" + address + ", birth=" + birth + "]";
    }

}

```

**5，创建ResObject**

```java
package com.sxt.springboot.controller;

public class ResObject {
    private Integer status;
    private Object msg;
    public ResObject() {
        // TODO Auto-generated constructor stub
    }
    public ResObject(Integer status, Object msg) {
        super();
        this.status = status;
        this.msg = msg;
    }
    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }

    public Object getMsg() {
        return msg;
    }
    public void setMsg(Object msg) {
        this.msg = msg;
    }
}
```

**6，创建Controller**

```java
@Api(description="用户管理",consumes="aaa",produces="bbb",value="cccc")
@RestController()
@RequestMapping("user")
public class UserController {

    @ApiOperation(value = "新增用户" ,  notes="新增注册")
    @RequestMapping(value="createUser",method=RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResObject createUser(@RequestBody User user){
        System.out.println("createUser:::"+user.toString());
        return new ResObject(HttpStatus.OK.value(), "新增成功.");
    }

    @ApiOperation(value = "修改用户" ,  notes="修改用户")
    @RequestMapping(value="updateUser",method=RequestMethod.POST,consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResObject updateUser(@RequestBody User user){
        System.out.println("updateUser:::"+user.toString());
        return new ResObject(HttpStatus.OK.value(), "修改成功.");
    }

    @ApiOperation(value = "删除用户" ,  notes="删除用户")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "userId", value = "用户标识", required = true, paramType = "query", dataType = "String")
    })
    @RequestMapping(value="deleteUser",method=RequestMethod.DELETE)
    public ResObject deleteUser(@RequestParam("userId") String userId){
        System.out.println("deleteUser:::"+userId);
        return new ResObject(HttpStatus.OK.value(), "删除成功.");
    }

    @ApiOperation(value = "查询用户" ,  notes="查询用户")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "userId", value = "用户标识", required = true, paramType = "query", dataType = "String")
    })
    @RequestMapping(value="queryUser",method=RequestMethod.GET)
    public ResObject queryUser(@RequestParam("userId") Integer userId){
        System.out.println("queryUser:::"+userId);
        User user = new User(userId, "张三", "武汉", new Date());
        return new ResObject(HttpStatus.OK.value(), user);
    }

}
```

**7，启动测试http://localhost:8080/swagger-ui.html** 



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora926efbab-b846-441b-a530-6f8df167f16e.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora964f09c2-21e8-4470-adf9-af9ef36941ce.png)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora250932bc-6b28-4122-980c-9db0961ef54d.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3002f460-144d-4a30-a36c-4994b59dd3d7.png)

# 24【掌握】整合shrio

## 1，概述

这个例子是在之前shiro集成springmvc的基础上改的哦，不知道的兄弟可以去看看我之前的springmvc集成shiro的代码

---

## 2，创建springboot的项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora62763654-2003-4dd0-bd57-107c6377bf7d.png)

---

## 3，配置pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.sxt</groupId>
    <artifactId>11_springboot_mybatis</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>11_springboot_mybatis</name>
    <description>Demo project for Spring Boot</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.6.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <shiro.version>1.3.2</shiro.version>
        <mybatis.starter.version>1.3.2</mybatis.starter.version>
        <druid.version>1.1.10</druid.version>
        <log4j.version>1.2.14</log4j.version>
        <!-- springboot2.0的版本中要使用2.0的  1.5的使用1.2.X的版本 -->
        <thymeleaf.shiro.version>2.0.0</thymeleaf.shiro.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>${mybatis.starter.version}</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- 添加热部署依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <!-- optional=true, 依赖不会传递, 该项目依赖devtools; 之后依赖boot项目的项目如果想要使用devtools, 
                需要重新引入 -->
            <optional>true</optional>
        </dependency>
        <!-- 添加thymeleaf -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
         <!-- 配置文件提示依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-dbcp2</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>${druid.version}</version>
        </dependency>
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>${log4j.version}</version>
        </dependency>
          <!--shrio的依赖 -->
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-all</artifactId>
            <version>${shiro.version}</version>
        </dependency>
            <!--shrio和thymeleaf集成的扩展依赖，为了能在页面上使用xsln:shrio的标签 -->
        <dependency>
            <groupId>com.github.theborakompanioni</groupId>
            <artifactId>thymeleaf-extras-shiro</artifactId>
            <version>${thymeleaf.shiro.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>


</project>

```

---

## 4，创建数据库

```xml
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `perid` int(11) NOT NULL AUTO_INCREMENT,
  `pername` varchar(255) DEFAULT NULL,
  `percode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`perid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('1', '用户查询', 'user:view');
INSERT INTO `permission` VALUES ('2', '用户添加', 'user:create');
INSERT INTO `permission` VALUES ('3', '用户修改', 'user:update');
INSERT INTO `permission` VALUES ('4', '用户删除', 'user:delete');
INSERT INTO `permission` VALUES ('5', '导出用户', 'user:export');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleid` int(11) NOT NULL AUTO_INCREMENT,
  `rolename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员');
INSERT INTO `role` VALUES ('2', 'CEO');
INSERT INTO `role` VALUES ('3', '保安');

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `perid` int(255) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES ('1', '1');
INSERT INTO `role_permission` VALUES ('2', '1');
INSERT INTO `role_permission` VALUES ('3', '1');
INSERT INTO `role_permission` VALUES ('4', '1');
INSERT INTO `role_permission` VALUES ('1', '2');
INSERT INTO `role_permission` VALUES ('2', '2');
INSERT INTO `role_permission` VALUES ('3', '2');
INSERT INTO `role_permission` VALUES ('1', '3');
INSERT INTO `role_permission` VALUES ('5', '3');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `userpwd` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'zhangsan', '639ffb0cbcca39d4fff8348844b1974e', '男', '武汉');
INSERT INTO `user` VALUES ('2', 'lisi', '0d303fa8e2e2ca98555f23a731a58dd9', '女', '北京');
INSERT INTO `user` VALUES ('3', 'wangwu', '473c41db9af5cc0d90e7adfd2b6d9180', '女', '成都');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userid` int(11) DEFAULT NULL,
  `roleid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1');
INSERT INTO `user_role` VALUES ('2', '2');
INSERT INTO `user_role` VALUES ('3', '3');
```

![image](C:/Users/18364/Downloads/images/5089c482-fd19-486f-a9d6-5f2de6411fc1.jpg)

---

5，创建相关的JAVA类  

![image](C:/Users/18364/Downloads/images/7d6a6d59-b4ec-4343-a453-d95d0529e520.png)

![image](C:/Users/18364/Downloads/images/5611f647-10e4-4b88-98c4-0bd4c3983dbb.png)

这个之前写过的，不再过多的解释 如果要源码的可以加我QQ:78414842

---

**6，导入静态文件**  



![image](C:/Users/18364/Downloads/images/06758c9a-8e7c-4187-b823-78cf826607d2.png)

---

**7，配置java类**  

**1， 数据源**

```java
@Configuration
public class DruidConfig {
    @Bean(initMethod="init")
    @ConfigurationProperties(prefix="spring.datasource")//配置这个目地是读取配置文件里面的数据
    public DruidDataSource getDruidDataSource() {
        return new DruidDataSource();
    }

    /**
     * 配置监控的servlet
     * @return
     */
    @Bean
    public ServletRegistrationBean<StatViewServlet> statViewServlet(){
        ServletRegistrationBean<StatViewServlet> bean=new ServletRegistrationBean<>();
        bean.setServlet(new StatViewServlet());
        bean.addUrlMappings("/druid/*");
        Map<String,String> initParams=new HashMap<>();
        initParams.put("loginUsername", "admin");
        initParams.put("loginPassword", "admin");
        initParams.put("allow", "");//允许所有ip访问
        initParams.put("deny", "192.168.1.1");//排除哪些IP
        //是否可以重置数据
        initParams.put("resetEnable","false");
        bean.setInitParameters(initParams);
        return bean;
    }

    /**
     * 配置监控的过滤器
     * @return
     */
    @Bean
    public FilterRegistrationBean<WebStatFilter> getWebStatFilter(){
        FilterRegistrationBean<WebStatFilter> registrationBean=new FilterRegistrationBean<>();
        registrationBean.setFilter(new WebStatFilter());
        Map<String, String> initParameters=new HashMap<>();
        initParameters.put("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        registrationBean.setInitParameters(initParameters);
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

}

```

**2， shiro的配置**  

```java
/**
 * shiro的配置
 * 
 * @author Arvin
 *
 */
@Configuration
public class ShrioConfig {

    @Value("${shiro.hashIterations}")
    private int hashIterations;// 散列次数

    @Value("${shiro.hashAlgorithmName}")
    private String hashAlgorithmName;// 加密方式

    /**
     * 创建创建凭证匹配器
     * 
     * @return
     */
    @Bean
    @ConfigurationProperties(prefix = "shiro")
    public HashedCredentialsMatcher getHashedCredentialsMatcher() {
        HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
        // 散列次数
        credentialsMatcher.setHashIterations(hashIterations);
        // 加密方式
        credentialsMatcher.setHashAlgorithmName(hashAlgorithmName);
        return credentialsMatcher;
    }

    /**
     * 创建安全管理器
     */
    @Bean
    public SecurityManager securityManager(UserRealm userRealm) {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        // 设置自定义realm
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    /**
     * Shiro 的Web过滤器
     */
    @Bean("shiroFilter")
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        // Shiro的核心安全接口，这个属性是必须的
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        // 过滤器配置
        Map<String, String> map = new HashMap<String, String>();
        // 登陆的接口放行
        map.put("/login/login*", "anon");
        map.put("/index.html", "anon");
        // 登出操作
        map.put("/logout", "logout");
        // 对所有用户认证
        map.put("/**", "authc");
        // 要求登录时的链接
        shiroFilterFactoryBean.setLoginUrl("/login/toLogin.action");
        // 登陆成功的页面 可以不配置，在controller里面去跳转
        shiroFilterFactoryBean.setSuccessUrl("/index");
        // 错误页面，认证不通过跳转
        shiroFilterFactoryBean.setUnauthorizedUrl("/error");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }

    /**
     * //加入注解的使用，不加入这个注解不生效
     * 
     * @param securityManager
     * @return
     */
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

    /**
     * 注册shiro的委托过滤器，相当于之前在web.xml里面配置的
     * @return
     */
    @Bean
    public FilterRegistrationBean<DelegatingFilterProxy> delegatingFilterProxy() {
        FilterRegistrationBean<DelegatingFilterProxy> filterRegistrationBean = new FilterRegistrationBean<DelegatingFilterProxy>();
        DelegatingFilterProxy proxy = new DelegatingFilterProxy();
        proxy.setTargetFilterLifecycle(true);
         proxy.setTargetBeanName("shiroFilter");
        filterRegistrationBean.setFilter(proxy);
        return filterRegistrationBean;
    }

      //这里是为了能在html页面引用shiro标签，上面两个函数必须添加，不然会报错
    @Bean(name = "shiroDialect")  
    public ShiroDialect shiroDialect(){  
        return new ShiroDialect();       
    } 
}
```

**2，访问后缀名的.do .action的配置**

```java
/**
 * .action  .do的配置
 * @author Arvin
 *
 */
@Configuration
public class UrlMatchConfig implements WebMvcConfigurer {
    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        // setUseSuffixPatternMatch 后缀模式匹配
        configurer.setUseSuffixPatternMatch(true);
        // setUseTrailingSlashMatch 自动后缀路径模式匹配
        configurer.setUseTrailingSlashMatch(true);
    }

    /**
     * 处理加入后缀之后静态资源无法访问的问题
     * @param dispatcherServlet
     * @return
     */
    @Bean
    public ServletRegistrationBean<DispatcherServlet> servletRegistrationBean(DispatcherServlet dispatcherServlet) {
        ServletRegistrationBean<DispatcherServlet> servletServletRegistrationBean = new ServletRegistrationBean<DispatcherServlet>(
                dispatcherServlet);
        servletServletRegistrationBean.addUrlMappings("*.html");
        servletServletRegistrationBean.addUrlMappings("*.css");
        servletServletRegistrationBean.addUrlMappings("*.js");
        servletServletRegistrationBean.addUrlMappings("*.png");
        servletServletRegistrationBean.addUrlMappings("*.gif");
        servletServletRegistrationBean.addUrlMappings("*.ico");
        servletServletRegistrationBean.addUrlMappings("*.jpeg");
        servletServletRegistrationBean.addUrlMappings("*.jpg");
        servletServletRegistrationBean.addUrlMappings("*.do");
        servletServletRegistrationBean.addUrlMappings("*.action");
        return servletServletRegistrationBean;
    }
}
```

---

**8，配置application.yml文件**  

```xml
#server:
#  port: 80
#  servlet:
#    context-path: /bjsxt
spring: 
  http:
    encoding:
      charset: UTF-8
      enabled: true
  thymeleaf:
    enabled: true
    cache: false
  datasource:
    username: root
    password: 123456
    url: jdbc:mysql://localhost:3306/shiro
    type: com.alibaba.druid.pool.DruidDataSource
    initialSize: 3 
    minIdle: 3 
    maxActive: 30 
    maxWait: 15000

mybatis:
  config-location: classpath:mybatis.cfg.xml
  mapper-locations:
  - classpath:mapping/*.xml
  type-aliases-package: com.sxt.domain
#shiro加密参数的配置
shiro:
  hashIterations: 2
  hashAlgorithmName: md5  
```

---

**9，创建登陆页面login.html 这个页面也可以放到static/login.html里面**

![image](C:/Users/18364/Downloads/images/2076ff9d-1726-4932-b34c-8772bc67fca8.png)

```xml
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>用户登陆</title>
</head>
<body>
    <h2 align="center">用户登陆</h2>
    <h5 align="center"></h5>
    <hr>
    <form action="/login/login.action"
        method="post">
        <table border="1" align="center" width="50%" cellpadding="5">
            <tr>
                <td width="30%" align="right">用户名:</td>
                <td><input type="text" name="username"></td>
            </tr>
            <tr>
                <td width="30%" align="right">密码:</td>
                <td><input type="text" name="userpwd"></td>
            </tr>
            <tr>
                <td align="center" colspan="2"><input type="submit" value="提交">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>
```

\*\***10，创建登陆页面list.html**\*\*

```xml
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org"
    xmlns:shiro="http://www.pollix.at/thymeleaf/shiro">

<head>
<meta charset="UTF-8">
<title></title>
<link rel="stylesheet" type="text/css"
    href="/easyui/themes/metro/easyui.css" />
<link rel="stylesheet" type="text/css" href="/css/icon.css" />
<script type="text/javascript" src="/easyui/jquery.min.js"></script>
<script type="text/javascript" src="/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="/easyui/locale/easyui-lang-zh_CN.js"></script>
</head>
<body>
    <!-- 表格开始 -->
    <table id="table" class="easyui-datagrid"></table>
    <div id="tb">
        <a shiro:hasPermission="user:create"  href="javascript:void(0)" class="easyui-linkbutton"
            data-options="iconCls:'icon-add',plain:true">添加客户</a> <a shiro:hasPermission="user:update" 
            href="javascript:void(0)" class="easyui-linkbutton"
            data-options="iconCls:'icon-edit',plain:true">修改客户</a> <a shiro:hasPermission="user:delete" 
            href="javascript:void(0)" class="easyui-linkbutton"
            data-options="iconCls:'icon-remove',plain:true">删除客户</a> <a shiro:hasPermission="user:export" 
            href="javascript:void(0)" class="easyui-linkbutton"
            data-options="iconCls:'icon-remove',plain:true">导出客户</a>
    </div>
    <!-- 表格结束 -->
    <script type="text/javascript">
        $(function() {
            $("#table").datagrid({
                singleSelect : true,
                width : '100%',
                height : '300px',
                title : '数据表格',
                iconCls : 'icon-save',
                collapsible : true,
                url : '/user/loadAllUser.action',
                rownumbers : true,
                toolbar : '#tb',
                fitColumns : true,
                columns : [ [ {
                    field : 'userid',
                    title : 'ID',
                    width : 100,
                    align : 'center',
                    sortable : true
                }, {
                    field : 'username',
                    title : '姓名',
                    width : 100,
                    align : 'center'
                }, {
                    field : 'address',
                    title : '登陆名',
                    width : 100,
                    align : 'center'
                }, {
                    field : 'sex',
                    title : '性别',
                    width : 100,
                    align : 'center'
                } ] ]
            });
        });
    </script>
</body>

</html>
```

# 25【掌握】项目打包

## 1，使用maven install打包注意点

注意排除springboot内置的tomcat

将spring-boot-starter-tomcat依赖的范围设置为provided,在打包时会将该包排除，因为要放到独立的tomcat中运行，Spring Boot内置的Tomcat是不需要用到的。

```xml
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>

```

---

## 2，修改入口类，设置启动配置

```java
@SpringBootApplication
@MapperScan("cn.bjsxt.springboot.mapper")
public class App  extends SpringBootServletInitializer{
   public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        // 用于独立tomcat运行的入口
        return builder.sources(App.class);
    }
}
```

## 3，打包\[也可以直接使用maven install\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1a838a16-1e8a-411d-ab0f-3ba54dd9bc42.jpg)

## 4，部署到tomcat

重命名生成的war包为ROOT.war，部署到tomcat的webapps文件目录下（确保webapps目录下没有其他ROOT文件夹） ，再运行startup,bat

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf0f3e2f1-acca-4178-9dc8-fb295a22ecaf.png)

## 5，注意点

1.运行tomcat的startup.bat时，窗口一闪而过，原因是少了一个环境变量的配置：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora121b6c3a-04f3-4a23-aaef-d692e73da04d.jpg)

在path变量里要引用该变量的值：%CATALINA\_HOME%\\bin

或者加入环境变量的jdk的路径

2.如果在webapps目录里的war包的名字是xxx.war(非ROOT.war), 则访问该war包解压后对应项目的contextPath就应该是/xxx，比如：

http://localhost:8080/boot/user/5

# 26【掌握】文件上传的配置

```java
/**
 * 文件上传的配置
 * @author LJH
 *
 */
@Configuration
@ConfigurationProperties(prefix="spring.multipart")
public class CommonsMultipartConfiguration {

    private long maxUploadSize;
    private int maxInMemorySize;
    private String defaultEncoding;

    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver getCommonsMultipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(maxUploadSize);;   // 20MB
        multipartResolver.setMaxInMemorySize(maxInMemorySize);;  // 1MB
        multipartResolver.setDefaultEncoding(defaultEncoding);
        return multipartResolver;
    }

    public long getMaxUploadSize() {
        return maxUploadSize;
    }

    public void setMaxUploadSize(long maxUploadSize) {
        this.maxUploadSize = maxUploadSize;
    }

    public int getMaxInMemorySize() {
        return maxInMemorySize;
    }

    public void setMaxInMemorySize(int maxInMemorySize) {
        this.maxInMemorySize = maxInMemorySize;
    }

    public String getDefaultEncoding() {
        return defaultEncoding;
    }

    public void setDefaultEncoding(String defaultEncoding) {
        this.defaultEncoding = defaultEncoding;
    }
}

```

```java
spring: 
    multipart:
      default-encoding: UTF-8
      max-upload-size: 20971520
      max-in-memory-size: 1048576
```

