# 01-Nacos Config 服务端初始化

# Nacos Config 服务端初始化

## 本节视频

* [【视频】Spring Cloud Alibaba-Nacos-分布式配置中心-服务端](https://www.bilibili.com/video/av40734881/)

## 分布式配置中心

在分布式系统中，由于服务数量巨多，为了方便服务配置文件统一管理，实时更新，所以需要分布式配置中心组件。

## Nacos Config

Nacos 提供用于存储配置和其他元数据的 key/value 存储，为分布式系统中的外部化配置提供服务器端和客户端支持。使用 Spring Cloud Alibaba Nacos Config，您可以在 Nacos Server 集中管理你 Spring Cloud 应用的外部属性配置。

Spring Cloud Alibaba Nacos Config 是 Spring Cloud Config Server 和 Client 的替代方案，客户端和服务器上的概念与 Spring Environment 和 PropertySource 有着一致的抽象，在特殊的 bootstrap 阶段，配置被加载到 Spring 环境中。当应用程序通过部署管道从开发到测试再到生产时，您可以管理这些环境之间的配置，并确保应用程序具有迁移时需要运行的所有内容。

## 创建配置文件

需要在 Nacos Server 中创建配置文件，我们依然采用 YAML 的方式部署配置文件，操作流程如下：

* 浏览器打开 http://localhost:8848/nacos ，访问 Nacos Server

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111030328.png)

* 新建配置文件，此处我们以之前创建的 **服务提供者** 项目为例

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111030615.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111030851.png)

注意：Data ID 的默认扩展名为 **.properties** ，希望使用 YAML 配置，此处必须指明是 .yaml

* 发布成功后在 “配置列表” 一栏即可看到刚才创建的配置项

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111031454.png)

# 02-Nacos Config 客户端的使用

# Nacos Config 客户端的使用

## 本节视频

* [【视频】Spring Cloud Alibaba-Nacos-分布式配置中心-客户端](https://www.bilibili.com/video/av40734966/)

## POM

此处我们以之前创建的 **服务提供者** 项目为例

在 `pom.xml` 中增加 `org.springframework.cloud:spring-cloud-starter-alibaba-nacos-config` 依赖

```Plain Text
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>

```

完整的 `pom.xml` 如下：

```Plain Text
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.funtl</groupId>
        <artifactId>hello-spring-cloud-alibaba-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../hello-spring-cloud-alibaba-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>hello-spring-cloud-alibaba-nacos-provider</artifactId>
    <packaging>jar</packaging>

    <name>hello-spring-cloud-alibaba-nacos-provider</name>
    <url>http://www.funtl.com</url>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!-- Spring Cloud End -->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.funtl.hello.spring.cloud.alibaba.nacos.provider.NacosProviderApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

```

## bootstrap.properties

创建名为 `bootstrap.properties` 的配置文件并删除之前创建的 `application.yml` 配置文件，由于已经在服务端配置，此处不再赘述

```Plain Text
# 这里的应用名对应 Nacos Config 中的 Data ID，实际应用名称以配置中心的配置为准
spring.application.name=nacos-provider-config
# 指定查找名为 nacos-provider-config.yaml 的配置文件
spring.cloud.nacos.config.file-extension=yaml
# Nacos Server 的地址
spring.cloud.nacos.config.server-addr=127.0.0.1:8848

```

**注意：在之前的 Spring Cloud Netflix 课程中有提到过 Spring Boot 配置文件的加载顺序，依次为 bootstrap.properties -> bootstrap.yml -> application.properties -> application.yml ，其中 bootstrap.properties 配置为最高优先级**

## 启动应用程序

启动应用后我们可以通过日志看到，已经成功加载到了配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111034112.png)

## 配置的动态更新

Nacos Config 也支持配置的动态更新，操作流程如下：

* 修改服务端配置，增加一个 `user.name` 的属性

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111034847.png)

* 修改 Controller ，增加一个请求方法，测试配置更新效果

```Plain Text
// 注入配置文件上下文
@Autowired
private ConfigurableApplicationContext applicationContext;

// 从上下文中读取配置
@GetMapping(value = "/hi")
public String sayHi() {
    return "Hello " + applicationContext.getEnvironment().getProperty("user.name");
}

```

* 通过浏览器访问该接口，浏览器显示

```Plain Text
Hello Lusifer

```

* 修改服务端配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111035618.png)

此时观察控制台日志，你会发现我们已经成功刷新了配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111035725.png)

* 刷新浏览器，浏览器显示

```Plain Text
Hello LusiferLee

```

**注意：你可以使用 spring.cloud.nacos.config.refresh.enabled=false 来关闭动态刷新**

# 03-Nacos Config 多环境的配置

# Nacos Config 多环境的配置

## 本节视频

* [【视频】Spring Cloud Alibaba-Nacos-分布式配置中心-多环境配置](https://www.bilibili.com/video/av40735056/)

## Spring Boot Profile

我们在做项目开发的时候，生产环境和测试环境的一些配置可能会不一样，有时候一些功能也可能会不一样，所以我们可能会在上线的时候手工修改这些配置信息。但是 Spring 中为我们提供了 Profile 这个功能。我们只需要在启动的时候添加一个虚拟机参数，激活自己环境所要用的 Profile 就可以了。

操作起来很简单，只需要为不同的环境编写专门的配置文件，如：`application-dev.yml`、`application-prod.yml`， 启动项目时只需要增加一个命令参数 `--spring.profiles.active=环境配置` 即可，启动命令如下：

```Plain Text
java -jar hello-spring-cloud-alibaba-nacos-provider-1.0.0-SNAPSHOT.jar --spring.profiles.active=prod

```

## Nacos Config Profile

spring-cloud-starter-alibaba-nacos-config 在加载配置的时候，不仅仅加载了以 dataid 为 `${spring.application.name}.${file-extension:properties}` 为前缀的基础配置，还加载了 dataid 为 `${spring.application.name}-${profile}.${file-extension:properties}` 的基础配置。在日常开发中如果遇到多套环境下的不同配置，可以通过 Spring 提供的 `${spring.profiles.active}` 这个配置项来配置。

此处我们以之前创建的 **服务提供者** 项目为例

### 在 Nacos Server 中增加配置

增加一个名为 `nacos-provider-config-prod.yaml` 的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111041121.png)

\*\*注意：此时，我将配置文件中的端口由 **8081** -> \*\***8082**

### 在项目中增加配置

增加一个名为 `bootstrap-prod.properties` 的配置文件，内容如下：

```Plain Text
spring.profiles.active=prod
spring.application.name=nacos-provider-config
spring.cloud.nacos.config.file-extension=yaml
spring.cloud.nacos.config.server-addr=127.0.0.1:8848

```

主要增加了 `spring.profiles.active=prod` 配置，用于指定访问 Nacos Server 中的 `nacos-provider-config-prod.yaml` 配置

## 启动应用程序

此时我们有两个配置文件，分别为 `bootstrap.properties` 和 `bootstrap-prod.properties` ，我们需要指定启动时加载哪一个配置文件，操作流程如下：

* `Run` -> `Edit Configurations..`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111043201.png)

* 设置需要激活的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111043322.png)

* 观察日志，判断是否成功加载配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer_20190111043538.png)

