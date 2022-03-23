# 01【掌握】分布式基础理论

## 1，什么是分布式系统？

《分布式系统原理与范型》定义：

“分布式系统是若干独立计算机的集合，这些计算机对于用户来说就像单个相关系统”

分布式系统（distributed system）是建立在网络之上的软件系统。

随着互联网的发展，网站应用的规模不断扩大，常规的垂直应用架构已无法应对，分布式服务架构以及流动计算架构势在必行，亟需一个治理系统确保架构有条不紊的演进。

## 2，发展演变

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora58706db0-7e08-4f3a-9884-f43c196b6ab5.jpg)

### 2.1，单一应用架构

当网站流量很小时，只需一个应用，将所有功能都部署在一起，以减少部署节点和成本。此时，用于简化增删改查工作量的数据访问框架\*\*(ORM)是关键。\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabc64a668-3739-4e9b-8580-1d153eca6b75.jpg)

适用于小型网站，小型管理系统，将所有功能都部署到一个功能里，简单易用。

缺点： 1、性能扩展比较难 

       2、协同开发问题

       3、不利于升级维护

### 2.2，垂直应用架构

当访问量逐渐增大，单一应用增加机器带来的加速度越来越小，将应用拆成互不相干的几个应用，以提升效率。此时，用于加速前端页面开发的**Web框架(MVC)是关键**。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora97ac3786-6df7-465d-a689-b79c9b4d088d.png)

通过切分业务来实现各个模块独立部署，降低了维护和部署的难度，团队各司其职更易管理，性能扩展也更方便，更有针对性。

缺点： 公用模块无法重复利用，开发性的浪费

### 2.3，分布式服务架构

当垂直应用越来越多，应用之间交互不可避免，将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，使前端应用能更快速的响应多变的市场需求。此时，用于提高业务复用及整合的分布式服务框架(**RPC)是关键。**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1c31f15c-fda4-4886-8382-9bb1de08d76c.jpg)

### 2.4，流动计算架构

当服务越来越多，容量的评估，小服务资源的浪费等问题逐渐显现，此时需增加一个调度中心基于访问压力实时管理集群容量，提高集群利用率。此时，用于提高机器利用率的**资源调度和治理中心(SOA)\[ Service Oriented Architecture\]是关键。**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf5345476-49ec-4297-b358-0f74ff4b4d86.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradcc496d6-4078-4b85-a475-d4f28b7c85f7.png)



---

## 3，RPC

什么叫RPC

RPC【Remote Procedure Call】是指远程过程调用，是一种进程间通信方式，他是一种技术的思想，而不是规范。它允许程序调用另一个地址空间（通常是共享网络的另一台机器上）的过程或函数，而不用程序员显式编码这个远程调用的细节。即程序员无论是调用本地的还是远程的函数，本质上编写的调用代码基本相同。

RPC基本原理

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac86bc222-3445-4db7-923a-b763d16310ed.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora508b0344-6d0b-4c97-88a6-10eec171c300.jpg)

RPC两个核心模块：通讯，序列化。

# 02【掌握】dubbo核心概念

## 淘宝的演变

[https://www.jianshu.com/p/537b3ee7229d](https://www.jianshu.com/p/537b3ee7229d)

1，简介  

Apache Dubbo (incubating) |?d?b??| 是一款高性能、轻量级的开源Java RPC框架，它提供了三大核心能力：面向接口的远程方法调用，智能容错和负载均衡，以及服务自动注册和发现。

官网：[http://dubbo.apache.org/](http://dubbo.apache.org/)

## 2，基本概念

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora71b8ea4c-e305-4cab-b7a8-db371f1e9e5f.jpg)

**服务提供者（Provider）：**暴露服务的服务提供方，服务提供者在启动时，向注册中心注册自己提供的服务。

**服务消费者（Consumer）:** 调用远程服务的服务消费方，服务消费者在启动时，向注册中心订阅自己所需的服务，服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。

**注册中心（Registry）：**注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者

**监控中心（Monitor）：**服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心

* 调用关系说明  
* 服务容器负责启动，加载，运行服务提供者。  
* 服务提供者在启动时，向注册中心注册自己提供的服务。  
* 服务消费者在启动时，向注册中心订阅自己所需的服务。  
* 注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。  
* 服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。  
* 服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。

# 03【掌握】dubbo环境搭建linux

## 1，安装zookeeper

### 1.1，安装JDK

#### 1.1.1，下载JDK

[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0f2a29d0-94da-41cb-a7a1-bc809c548747.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora204125c9-4cad-4b6e-95ea-170a03193b7a.png)

#### 1.1.2，使用XFTP工具导入linux

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7fc1a10f-d2e4-4c56-a322-e4192476744c.png)

#### 1.1.3，解压到/root/software目录

```java
mkdir /root/software   #在root下面创建software目录
tar -zxvf  jdk-8u181-linux-x64.tar.gz -C /root/software #解压到指定目录
```

#### 1.1.4，配置环境变量并测试

打开控制台，运行\$ sudo vi /etc/profile，在最后插入下面要配置的内容 ，按Esc键 ，输入( :wq 保存并退出)   

```java
JAVA_HOME=/root/software/jdk1.8.0_181
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export PATH
export CLASSPATH
```

让环境变量生效，执行下面的命令

```java
source /etc/profile
```

验证

```java
java -version
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeb0adf11-75a4-40f5-9699-4d341f84068a.png)

### 1.2，安装zookeeper

#### 1.2.1，下载

可以从 

```java
https://apache.org/dist/zookeeper/stable
http://mirror.bit.edu.cn/apache/zookeeper/stable/
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaa599b24-8e44-4739-918f-3de921458b43.png)

在linux上使用  wget  

[http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/](http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/)[zookeeper-3.4.14.tar.gz](http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.4.14/zookeeper-3.4.14.tar.gz) 来下载

建议使用镜像

推荐下载好了再使用xftp传到linux如果使用wget会丢失jar包\[亲测过\]

#### 1.2.2，解压并修改位置

```html
#解压到/usr/local下面
tar -zxvf zookeeper-3.4.14.tar.gz -C /usr/local
#进入目录
cd /usr/local/
#修改名字
mv zookeeper-3.4.14/ zookeeper
```

#### 1.2.3，修改配置文件

```html
#打开zk的配置文件目录
cd /usr/local/zookeeper/conf
#修改zoo_sample.cfg 为zoo.cfg [一定要改]
mv zoo_sample.cfg  zoo.cfg
#编辑zoo.cfg
vi zoo.cfg
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradac20b28-d458-4a9d-9cd7-39f0a1948876.png)

#### 1.2.4， 开机启动zookeepr脚本

```java
#!/bin/bash
#chkconfig:2345 20 90
#description:zookeeper
#processname:zookeeper
ZK_PATH=/usr/local/zookeeper
export JAVA_HOME=/root/software/jdk1.8.0_181
case $1 in
         start) sh  $ZK_PATH/bin/zkServer.sh start;;
         stop)  sh  $ZK_PATH/bin/zkServer.sh stop;;
         status) sh  $ZK_PATH/bin/zkServer.sh status;;
         restart) sh $ZK_PATH/bin/zkServer.sh restart;;
         *)  echo "require start|stop|status|restart"  ;;
esac
```

打开/etc/init.d/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracbe07d9c-5d17-4d00-b527-07fd80e4b778.png)

把脚本注册为Service  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora58e2e9f1-21a1-4383-9e09-5a58d0c3502a.png)

增加权限

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora20efbc74-477c-4004-b2d8-601107df00d7.png)

#### 1.2.5，启动zookeeper

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6f951e81-c8ce-4e37-8054-4c1f5f9d4311.png)

如果出现连接不上在问题修改etc/hosts

删除第一行里面的127.0.0.1

## 2，安装dubbo监控【常规安装】

dubbo本身并不是一个服务软件。它其实就是一个jar包能够帮你的java程序连接到zookeeper，并利用zookeeper消费、提供服务。所以你不用在Linux上启动什么dubbo服务。

但是为了让用户更好的管理监控众多的dubbo服务，官方提供了一个可视化的监控程序，不过这个监控即使不装也不影响使用。

### 2.1、下载dubbo-admin

[https://github.com/apache/dubbo-admin/tree/master](https://github.com/apache/dubbo-admin/tree/master)  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab77741ad-7ea2-427b-a066-305eb0c8fd33.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraefd4ba5d-5759-4e1f-a602-0f60221bb5ff.jpg)

配置参考文档

[http://dubbo.apache.org/zh-cn/docs/admin/introduction.html](http://dubbo.apache.org/zh-cn/docs/admin/introduction.html)  

### 2.2，解压

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8fefee4f-5c18-47fc-9cdb-483592f66f28.png)

dubbo-admin  管理项目

dubbo-monitor-simple监控统计项目

dubbo-registry-simple 简单的注册中心，开发中一般使用zk

### 2.3，修改配置文件并打包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7ea3b457-f86b-457e-b04d-615907b17da2.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0e4400c3-9fa1-42df-af9a-23ad1d8141e4.png)

配置密码和注册中心，在启动之前一定要启动注册中心，要不然无法访问哦

使用mvn install 打包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac364a288-02c6-47b0-b748-d4eac4549092.png)

把包好的jar包放到linux上去使用java -jar 运行

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora315e862d-93c8-4c27-99df-e7a3e471eb49.png)

在Winows里面使用[http://192.168.120.131:7001/](http://192.168.120.131:7001/)去访问

用户名:root

密码:root

## 3，安装dubbo监控【使用docker安装】

### 3.1，安装zookeeper

```java
docker pull zookeeper:3.4.14#拉取镜像
docker run --name zookeeper -p 2182:2181 -v /root/zookeeper/data:/data -d zookeeper:3.4.14#启动容器
```

### 3.2，拉取镜像

[https://hub.docker.com/r/chenchuxin/dubbo-admin](https://hub.docker.com/r/chenchuxin/dubbo-admin)

```java
docker pull webuilder/dubboadmin
```

### 3.3，启动容器

```java
docker run -itd -p 8080:8080 -e ZOOKEEPER_SERVER=your_zookeeper_ip:2181 dubboadmin --name=dubbo-name
or
docker run -itd -p 8080:8080 --add-host zookeeper-server:your_zookeeper_ip dubboadmin --name=dubbo-name
```

### 3.4，环境参数

```java
ZOOKEEPER_SERVER （必选） Zookeeper's IP and PORT, sparated by a colon. Default is 'zookeeper-server:2181'
ROOT_PASSWORD （可选） Dubbo Admin's root user's password, default is 'root'
GUEST_PASSWORD （可选） Dubbo Admin's guest user's password, default is 'root'
```

# 04【掌握】dubbo环境搭建windows

## 1，下载并安装zookepper

### 1.1、下载zookeeper

网址 https://archive.apache.org/dist/zookeeper/zookeeper-3.4.14/ 

### 1.2、解压zookeeper

解压运行zkServer.cmd ，初次运行会报错，没有zoo.cfg配置文件

### 1.3、修改zoo.cfg配置文件

将conf下的zoo\_sample.cfg复制一份改名为zoo.cfg即可。

注意几个重要位置：

dataDir=./ 临时数据存储的目录（可写相对路径）

clientPort=2181 zookeeper的端口号

修改完成后再次启动zookeeper

### 1.4、使用zkCli.cmd测试

ls /：列出zookeeper根下保存的所有节点

create –e /sxt 123：创建一个sxt节点，值为123

get /sxt：获取/sxt节点的值

## 2，下载并安装dubbo-admin

dubbo本身并不是一个服务软件。它其实就是一个jar包能够帮你的java程序连接到zookeeper，并利用zookeeper消费、提供服务。所以你不用在Linux上启动什么dubbo服务。

但是为了让用户更好的管理监控众多的dubbo服务，官方提供了一个可视化的监控程序，不过这个监控即使不装也不影响使用。

### 1、下载dubbo-admin

[https://github.com/apache/dubbo-admin/tree/master](https://github.com/apache/dubbo-admin/tree/master)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6cb78f68-b3ea-44bf-b428-283292903bd0.png)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeeeda2ba-966f-440f-a231-5b058ef59f2a.jpg)



### 2、进入目录，修改dubbo-admin配置

修改 src\\main\\resources\\application.properties 指定zookeeper地址

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae1cfd4d1-3fe0-4d7f-b540-44b059eab304.png)

### 3、打包dubbo-admin

```java
mvn clean package -Dmaven.test.skip=true 
mvn installl
```

### 4、运行dubbo-admin

java -jar dubbo-admin-0.0.1-SNAPSHOT.jar

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora20b306d1-514d-46db-8c0b-0e2ba9c62008.png)

注意：【有可能控制台看着启动了，但是网页打不开，需要在控制台按下ctrl+c即可】

[http://127.0.0.1:7001/](http://127.0.0.1:7001/)  

默认使用root/root 登陆

![image](C:/Users/18364/Downloads/images/2370b5b4-6928-4705-a33c-b3f472c3b163.png)

# 05【掌握】dubbo-helloworld

## 1，提出需求

某个电商系统，订单服务需要调用用户服务获取某个用户的所有地址；

我们现在 需要创建两个服务模块进行测试 

| 模块                | 功能           |
| ------------------- | -------------- |
| 订单服务web模块     | 创建订单等     |
| 用户服务service模块 | 查询用户地址等 |

测试预期结果：

 订单服务web模块在A服务器，用户服务模块在B服务器，A可以远程调用B的功能。

## 2，工程架构

根据 dubbo《服务化最佳实践》 

### 2.1，分包

建议将服务接口，服务模型，服务异常等均放在 API 包中，因为服务模型及异常也是 API 的一部分，同时，这样做也符合分包原则：重用发布等价原则(REP)，共同重用原则(CRP)。

如果需要，也可以考虑在 API 包中放置一份 spring 的引用配置，这样使用方，只需在 spring 加载过程中引用此配置即可，配置建议放在模块的包目录下，以免冲突，如：com/alibaba/china/xxx/dubbo-reference.xml。

### 2.2，粒度

服务接口尽可能大粒度，每个服务方法应代表一个功能，而不是某功能的一个步骤，否则将面临分布式事务问题，Dubbo 暂未提供分布式事务支持。

服务接口建议以业务场景为单位划分，并对相近业务做抽象，防止接口数量爆炸。

不建议使用过于抽象的通用接口，如：Map query(Map)，这样的接口没有明确语义，会给后期维护带来不便。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0d6e712e-a2af-4c71-adc7-506de2c9600f.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac3ccd028-9b6e-4bbb-9d70-1615c950f7f1.png)

## 3，创建模块

### 3.1、ego-interface：公共接口层（model，service，exception…）

作用：定义公共接口，也可以导入公共依赖

①Bean模型

```java
public class UserAddress implements Serializable{
    private Integer id;
    private String userAddress;
    private String userId;
}
```

②Service接口UserService

```java
public List<UserAddress> getUserAddressList(String userId)
```

 ③Service接口OrderService

```java
public interface OrderService {

    /**
     * 初始化订单
     * @param userId
     */
    public List<UserAddress> initOrder(String userId);

}
```

### 3.2、ego-user-service-provider：用户服务模块（对用户接口的实现）

1、pom.xml

```java
<dependencies>
   <dependency>
    <groupId>com.sxt</groupId>
    <artifactId>ego-interface</artifactId>
    <version>0.0.1-SNAPSHOT</version>
   </dependency>
  </dependencies>
```

2、Service

```java
public class UserServiceImpl implements UserService{

    public static List<UserAddress> address=new ArrayList<>();

    static {
        address.add(new UserAddress(1, "湖北省武汉市东湖高新区金融港B22栋11楼", "whsxt"));
        address.add(new UserAddress(2, "北京市海淀区西三旗街道建材城西路中腾建华商务大厦东侧二层尚学堂", "bjsxt"));
    }

    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        //讲道理要是去数据库里面去查询的
        return address;
    }
}

```

### 3.3、ego-order-service-consumer：订单模块（调用用户模块）  

1、pom.xml  

```java
<dependencies>
   <dependency>
    <groupId>com.sxt</groupId>
    <artifactId>ego-interface</artifactId>
    <version>0.0.1-SNAPSHOT</version>
   </dependency>
   </dependencies>
```

2、测试

```java
public class OrderServiceImpl implements OrderService{

    UserService userService;

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    /**
     * 初始化订单，查询用户的所有地址并返回
     * 
     * @param userId
     * @return
     */
    @Override
    public List<UserAddress> initOrder(String userId) {
        return userService.getUserAddressList(userId);
    }
}

```

现在这样是无法进行调用的。我们ego-order-web引入了ego-interface，但是interface的实现是ego-user，我们并没有引入，而且实际他可能还在别的服务器中。

## 4，使用dubbo改造

### 4.1、改造ego-user-service-provider作为服务提供者

1、引入dubbo和其它的修改pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sxt</groupId>
    <artifactId>ego-user-service-provider</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>com.sxt</groupId>
            <artifactId>ego-interface</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>

        <!-- 核心包 -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.6.7</version>
        </dependency>
        <!-- java连接zookeeper的包，因为服务启动时要注册 -->
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.11</version>
        </dependency>
        <!-- curator-framework -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>4.1.0</version>
        </dependency>
        <!-- 因为dubbo底层使用的是netty，【通讯框架】 -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>4.1.32.Final</version>
        </dependency>
    </dependencies>
</project>
```

**由于我们使用zookeeper作为注册中心，所以需要操作zookeeper**

**dubbo 2.6以前的版本引入zkclient操作zookeeper** 

**dubbo 2.6及以后的版本引入curator操作zookeeper**

**下面两个zk客户端根据dubbo版本2选1即可**

2、配置提供者provider.xml  

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
        http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">


    <!--当前应用的名字 -->
    <dubbo:application name="ego-user"></dubbo:application>
    <!--指定注册中心的地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />
    <!--使用dubbo协议，将服务暴露在20880端口 -->
    <dubbo:protocol name="dubbo" port="20880" />

    <bean id="userServiceImpl" class="com.sxt.service.impl.UserServiceImpl"></bean>
    <!-- 指定需要暴露的服务 -->
    <dubbo:service
        interface="com.sxt.service.UserService" ref="userServiceImpl" />

</beans>


```

3、启动服务TestProvider

```java
public class TestProvider {
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext ioc = new ClassPathXmlApplicationContext("classpath:provider.xml");
        ioc.start();
        System.out.println("服务提供者启动成功");
        System.in.read();
    }
}

```

### 
![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraba162a06-14ad-4b34-97dd-4e6d26cc6df1.png)

刷新发现有一个服务了

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora426d9e99-a49f-4480-8e6a-b77e6781bc55.png)

---

### 4.2、改造ego-order-service-consumer作为服务消费者

1、引入dubbo和其它依赖修改pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sxt</groupId>
    <artifactId>ego-order-service-consumer</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>com.sxt</groupId>
            <artifactId>ego-interface</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- 引入dubbo -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.6.7</version>
        </dependency>
        <dependency>
            <groupId>com.101tec</groupId>
            <artifactId>zkclient</artifactId>
            <version>0.11</version>
        </dependency>
        <!-- curator-framework -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>4.1.0</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>4.1.32.Final</version>
        </dependency>
    </dependencies>
</project>
```

2、配置消费者信息consumer.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
        http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
    <!-- 应用名 -->
    <dubbo:application name="ego-order-web"></dubbo:application>
    <!-- 指定注册中心地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />
    <!-- 生成远程服务代理，可以和本地bean一样使用demoService -->
    <dubbo:reference id="userService"
        interface="com.sxt.service.UserService"></dubbo:reference>

        <!-- orderService -->
    <bean id="orderService" class="com.sxt.service.impl.OrderServiceImpl">
        <property name="userService" ref="userService"></property>
    </bean>
</beans>
```

3、测试调用  

访问ego-order-service-consumer的initOrder请求，会调用UserService获取用户地址；

调用成功。说明我们order已经可以调用远程的UserService了；

```java
public class TestConsumer {
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:consumer.xml");
        OrderService bean = context.getBean(OrderService.class);
        List<UserAddress> order = bean.initOrder("whsxt");
        for (UserAddress userAddress : order) {
            System.out.println(userAddress.getUserAddress());
        }
    }
}
```

---

4、注解版  

1、服务提供方

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
        http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

    <!--当前应用的名字 -->
    <dubbo:application name="ego-user"></dubbo:application>
    <!--指定注册中心的地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />
    <!--使用dubbo协议，将服务暴露在20880端口 -->
    <dubbo:protocol name="dubbo" port="20880" />

     <dubbo:annotation package="com.sxt.service.impl"/>
</beans>

```

```java
@Service //使用dubbo提供的service注解，注册暴露服务
public class UserServiceImpl implements UserService{

    public static List<UserAddress> address=new ArrayList<>();

    static {
        address.add(new UserAddress(1, "湖北省武汉市东湖高新区金融港B22栋11楼", "whsxt"));
        address.add(new UserAddress(2, "北京市海淀区西三旗街道建材城西路中腾建华商务大厦东侧二层尚学堂", "bjsxt"));
    }

    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        //讲道理要是去数据库里面去查询的
        return address;
    }
}

```

2、服务消费方

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
        http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd">
    <!-- 应用名 -->
    <dubbo:application name="ego-order-web"></dubbo:application>
    <!-- 指定注册中心地址 -->
    <dubbo:registry address="zookeeper://127.0.0.1:2181" />
    <dubbo:annotation package="com.sxt.service.impl"/>

    <context:component-scan base-package="com.sxt.service.impl"></context:component-scan>
</beans>

```

```java
@Service// 使用spring的service
public class OrderServiceImpl implements OrderService{

    @Reference //使用dubbo提供的reference注解引用远程服务
    UserService userService;
    /**
     * 初始化订单，查询用户的所有地址并返回
     * @param userId
     * @return
     */
    @Override
    public List<UserAddress> initOrder(String userId) {
        return userService.getUserAddressList(userId);
    }
}


```

# 06【掌握】监控中心

## 1，dubbo-admin

图形化的服务管理页面；安装时需要指定注册中心地址，即可从注册中心中获取到所有的提供者/消费者进行配置管理

## 2，dubbo-monitor-simple

简单的监控中心；

## 3、安装

1、找到之前下载好的dubbo-admin里面的dubbo-monitor-simple项目

2、修改配置指定注册中心地址

进入 dubbo-monitor-simple\\src\\main\\resources\\conf

修改 dubbo.properties文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3e45986b-89e6-4b29-ab65-8edea4ab6f79.png)

3、打包dubbo-monitor-simple

mvn clean package -Dmaven.test.skip=true

4、解压 tar.gz 文件，并运行start.bat

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8c45264e-500d-4d08-8792-10826815945e.png)

如果缺少servlet-api，自行导入servlet-api再访问监控中心

5、启动访问8080

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora219898f2-39c1-4663-b163-551fe24d455d.png)

2、监控中心配置

所有服务配置连接监控中心，进行监控统计

 <dubbo:monitor protocol="registry">

Simple Monitor 挂掉不会影响到 Consumer 和 Provider 之间的调用，所以用于生产环境不会有风险。

Simple Monitor 采用磁盘存储统计信息，请注意安装机器的磁盘限制，如果要集群，建议用mount共享磁盘。

# 07【掌握】dubbo整合SpringBoot方式1

## 1，概述

dubbo整合springboot和三种方式

1. 方式1：引入dubbo-starter，在application.properties配置属性，使用@Service【暴露服务】使用@Reference【引用服务】  
2. 方式2：保留dubbo xml配置文件; 导入dubbo-starter，使用@ImportResource导入dubbo的配置文件即可  
3. 方式3：使用注解API的方式， 将每一个组件手动创建到容器中,让dubbo来扫描其他的组件  
4. 可以查看github[https://github.com/apache/dubbo](https://github.com/apache/dubbo)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0eb9e95c-5af9-4d0e-8b69-530d8a27aca9.png)

## 2，服务提供者

### 2.1，创建boot-ego-user-service-provider

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa0618c5c-3458-4666-8b99-eb2825ba9b09.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraae3eb426-1a06-4661-8f58-c2818112c56c.png)

### 2.2，加入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.sxt</groupId>
    <artifactId>boot-ego-user-service-provider</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>boot-ego-user-service-provider</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <maven-jar-plugin.version>3.1.1</maven-jar-plugin.version>
        <dubbo.version>2.6.5</dubbo.version>

    </properties>

    <dependencies>

        <dependency>
            <groupId>com.sxt</groupId>
            <artifactId>ego-interface</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- Dubbo Spring Boot Starter -->
        <dependency>
            <groupId>com.alibaba.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>0.2.1.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
        <!-- curator-framework -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>2.12.0</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
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

### 2.3，创建UserServiceImpl

```java
import com.alibaba.dubbo.config.annotation.Service;
import com.sxt.domain.UserAddress;
import com.sxt.service.UserService;

@Service//暴露服务
public class UserServiceImpl implements UserService{
    public static List<UserAddress> address=new ArrayList<>();
    static {
        address.add(new UserAddress(1, "湖北省武汉市东湖高新区金融港B22栋11楼", "whsxt"));
        address.add(new UserAddress(2, "北京市海淀区西三旗街道建材城西路中腾建华商务大厦东侧二层尚学堂", "bjsxt"));
    }
    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        //讲道理要是去数据库里面去查询的
        return address;
    }
}

```

### 2.4，配置properties文件

```xml
dubbo.application.name=boot-ego-user-service-provider
dubbo.registry.address=zookeeper://127.0.0.1:2181

dubbo.protocol.name=dubbo
dubbo.protocol.port=20880

#dubbo.monitor.protocol=registry
```

### 2.5，修改启动类

```python
@EnableDubbo//开户注解的dubbo功能
@SpringBootApplication
public class BootEgoUserServiceProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootEgoUserServiceProviderApplication.class, args);
    }
}
```

### 2.6，启动测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae0d2a404-264f-4e8f-be2e-2dc9c2bd53ff.png)

## 3，服务消费者

### 3.1，创建boot-ego-order-service-consumer

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora158a6f2f-67e2-4110-8ade-a56b29157fdd.png)

### 3.2，加入依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.sxt</groupId>
    <artifactId>boot-ego-user-service-provider</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>boot-ego-user-service-provider</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <dubbo.version>2.6.5</dubbo.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>com.sxt</groupId>
            <artifactId>ego-interface</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Dubbo Spring Boot Starter -->
        <dependency>
            <groupId>com.alibaba.boot</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>0.2.1.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
        <!-- curator-framework -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>2.12.0</version>
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

### 3.3，创建OrderServiceImpl

```java
@Service
public class OrderServiceImpl implements OrderService {

    @Reference
    UserService userService;

    @Override
    public List<UserAddress> initOrder(String userId) {
        System.out.println("用户id："+userId);
        //1、查询用户的收货地址
        List<UserAddress> addressList = userService.getUserAddressList(userId);
        return addressList;
    }
}
```

### 3.4，创建OrderController

```java
@Controller
public class OrderController {

    @Autowired
    OrderService orderService;

    @ResponseBody
    @RequestMapping("/initOrder")
    public List<UserAddress> initOrder(@RequestParam("uid")String userId) {
        return orderService.initOrder(userId);
    }

}

```

### 3.5，修改properties

```java
dubbo.application.name=boot-ego-order-service-consumer
dubbo.registry.address=zookeeper://127.0.0.1:2181

dubbo.monitor.protocol=registry

server.port=8888
```

### 3.5，启动类配置

```python
@SpringBootApplication
@EnableDubbo //启动dubbo
public class BootEgoOrderServiceConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(BootEgoOrderServiceConsumerApplication.class, args);
    }
}
```

### 3.6，启动测试  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora87ed4960-549f-4c31-8825-13c86b637035.png)

# 08【掌握】dubbo整合SpringBoot方式2

## 1，提供者

```java
@Configuration
public class DubboConfig {


    /**
     * 创建dubbo的应用对象
     * <dubbo:application  name="boot-ego-user-service-provider"></dubbo:application>
     */
    @Bean
    public ApplicationConfig applicationConfig() {
        ApplicationConfig applicationConfig=new ApplicationConfig();
        applicationConfig.setName("boot-ego-user-service-provider");
        return applicationConfig;
    }

    /**
     * 创建注册中心的对象
     * <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry>
     */
    @Bean
    public RegistryConfig registryConfig() {
        RegistryConfig registryConfig=new RegistryConfig();
        registryConfig.setProtocol("zookeeper");
        registryConfig.setAddress("127.0.0.1:2181");

        return registryConfig;
    }


    /**
     * 使用dubbo协议，将服务暴露在20880端口
     * <dubbo:protocol name="dubbo" port="20880"></dubbo:protocol>
     */
    @Bean
    public ProtocolConfig protocolConfig() {
        ProtocolConfig config=new ProtocolConfig();
        config.setName("dubbo");
        config.setPort(20880);
        return config;

    }

    /**
     * 指定需要暴露的服务
     * <dubbo:service interface="com.sxt.service.UserService" ref="userServiceImpl"></dubbo:service>
     * @param application 
     */
    @Bean
    public ServiceConfig<UserService> serviceConfigUserService(UserService userService, ApplicationConfig applicationConfig,RegistryConfig registryConfig){
        ServiceConfig<UserService> serviceConfig = new ServiceConfig<>();
        serviceConfig.setInterface(UserService.class);
        serviceConfig.setRef(userService);

        //注入applicationName
        serviceConfig.setApplication(applicationConfig);
        //设置注册中心
        serviceConfig.setRegistry(registryConfig);

        //设置方法
        MethodConfig methodConfig=new MethodConfig();
        methodConfig.setRetries(2);
        methodConfig.setName("getUserAddressList");
        methodConfig.setTimeout(2000);

        List<MethodConfig> methods=new ArrayList<MethodConfig>();
        methods.add(methodConfig);
        serviceConfig.setMethods(methods);
        //暴露的方法
        serviceConfig.export();
        return serviceConfig;
    }


    /**
     * <!-- 配置监控中心 -->
    <dubbo:monitor protocol="registry"></dubbo:monitor>
     */
    @Bean
    public MonitorConfig  monitorConfig() {
        MonitorConfig monitorConfig=new MonitorConfig();
        monitorConfig.setProtocol("registry");
        return monitorConfig;
    }
}

```

## 2，消费端

```java
@Configuration
public class DubboConfig {


    /**
     * 创建dubbo的应用对象
     * <dubbo:application  name="boot-ego-user-service-provider"></dubbo:application>
     */
//  @Bean
    public ApplicationConfig applicationConfig() {
        ApplicationConfig applicationConfig=new ApplicationConfig();
        applicationConfig.setName("boot-ego-order-service-consumer");
        return applicationConfig;
    }

    /**
     * 创建注册中心的对象
     * <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry>
     */
    //@Bean
    public RegistryConfig registryConfig() {
        RegistryConfig registryConfig=new RegistryConfig();
        registryConfig.setProtocol("zookeeper");
        registryConfig.setAddress("127.0.0.1:2181");

        return registryConfig;
    }

    /**
     * 
     * @param orderServiceImpl
     * 
     * <!-- 生成远程服务代理，可以和本地bean一样使用demoService -->
    <dubbo:reference id="userService" interface="com.sxt.service.UserService" ></dubbo:reference>

    <!-- 创建orderService -->
    <bean id="orderServiceImpl" class="com.sxt.service.impl.OrderServiceImpl">
        <property name="userService" ref="userService"></property>
    </bean>
     * @return
     */
    @Bean
    public ReferenceConfig<UserService> referenceConfigUserService(OrderServiceImpl orderServiceImpl ){
        ReferenceConfig<UserService> referenceConfig=new ReferenceConfig<>();
        referenceConfig.setInterface(UserService.class);
        referenceConfig.setId("userService");
        referenceConfig.setApplication(applicationConfig());
        referenceConfig.setRegistry(registryConfig());
        //给orderServiceImpl注入数据
        orderServiceImpl.setUserService(referenceConfig.get());
        return referenceConfig;
    }



    /**
     * <!-- 配置监控中心 -->
    <dubbo:monitor protocol="registry"></dubbo:monitor>
     */
    @Bean
    public MonitorConfig  monitorConfig() {
        MonitorConfig monitorConfig=new MonitorConfig();
        monitorConfig.setProtocol("registry");
        return monitorConfig;
    }
}

```

# 09【掌握】配置文件加载顺序【配置覆盖原则】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa7e5b15b-b6cf-4ba4-acfa-44627c86d0b8.jpg)

1、JVM 启动 -D 参数优先，这样可以使用户在部署和启动时进行参数重写，比如在启动时需改变协议的端口。

2、XML 次之，如果在 XML 中有配置，则 dubbo.properties 中的相应配置项无效。

3、Properties 最后，相当于缺省值，只有 XML 没有配置时，dubbo.properties 的相应配置项才会生效，通常用于共享公共配置，比如应用名。

3、配置原则  

dubbo推荐在Provider上尽量多配置Consumer端属性：

1、作服务的提供者，比服务使用方更清楚服务性能参数，如调用的超时时间，合理的重试次数，等等

2、在Provider配置后，Consumer不配置则会使用Provider的配置值，即Provider配置可以作为Consumer的缺省值。否则，Consumer会使用Consumer端的全局设置，这对于Provider不可控的，并且往往是不合理的

配置的覆盖规则：

1. 方法级配置别优于接口级别，即小Scope优先 
2. Consumer端配置 优于 Provider配置 优于 全局配置，
3. 最后是Dubbo Hard Code的配置值（见配置文档）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6b706bdf-6965-44a5-8c3c-3bca0425dfa9.jpg)

| **消费者方法>提供者方法>消费者接口级别>提供者接口级别>消费者全局>提供者全局** |
| ------------------------------------------------------------ |

实际开发中是配置提供者还是消费者？

答案：实际开发中是配置提供者。

# 10【掌握】超时处理

## 一、概述

    由于网络或服务端不可靠，会导致调用出现一种不确定的中间状态（超时）。为了避免超时导致客户端资源（线程）挂起耗尽，必须设置超时时间。

    为什么会有超时处理：当消费者调用提供者时，提供者执行的时间过长，会超时，消费者会认为调用失败。

## 二、xml配置方式

### 1、Dubbo消费端

全局超时配置

```xml
<dubbo:consumer timeout="5000" />
```

指定接口以及特定方法超时配置  

```xml
<dubbo:reference interface="com.sxt.service.UserService" timeout="2000">
    <dubbo:method name="getUserAddressList" timeout="3000" />
</dubbo:reference>
```

### 2、Dubbo服务端

全局超时配置

```xml
<dubbo:provider timeout="5000" />
```

指定接口以及特定方法超时配置  

```xml
<dubbo:provider interface="com.sxt.service.UserService" timeout="2000">
    <dubbo:method name="getUserAddressList" timeout="3000" />
</dubbo:provider>
```

## 三、超时处理注解配置

```java
@Reference(timeout=5000)
UserService userService;
​
@Service(timeout=5000)
public class UserServiceImpl{
}
```

# 11【掌握】启动时检查

## 一、概述

    Dubbo 缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，阻止 Spring 初始化完成，以便上线时，能及早发现问题，默认 check="true"。

    可以通过 check="false" 关闭检查，比如，测试时，有些服务不关心，或者出现了循环依赖，必须有一方先启动。

    另外，如果你的 Spring 容器是懒加载的，或者通过 API 编程延迟引用服务，请关闭 check，否则服务临时不可用时，会抛出异常，拿到 null 引用，如果 check="false"，总是会返回引用，当服务恢复时，能自动连上。

## 二、xml配置

关闭某个服务的启动时检查 (没有提供者时报错)：

```xml
<dubbo:reference interface="com.sxt.service.UserService" check="false" />
```

关闭所有服务的启动时检查 (没有提供者时报错)：

```xml
<dubbo:consumer check="false" />
```

关闭注册中心启动时检查 (注册订阅失败时报错)：

```xml
<dubbo:registry check="false" />
```

通过 dubbo.properties

```xml
dubbo.referencecom.sxt.service.UserService.check=false
dubbo.reference.check=false
dubbo.consumer.check=false
dubbo.registry.check=false
```

通过 -D 参数

```yaml
java -Ddubbo.reference.com.sxt.service.UserService.check=false
java -Ddubbo.reference.check=false
java -Ddubbo.consumer.check=false 
java -Ddubbo.registry.check=false
​
配置的含义：
dubbo.reference.check=false，强制改变所有 reference 的 check 值，就算配置中有声明，也会被覆盖。
dubbo.consumer.check=false，是设置 check 的缺省值，如果配置中有显式的声明，如：<dubbo:reference check="true"/>，不会受影响。
dubbo.registry.check=false，前面两个都是指订阅成功，但提供者列表是否为空是否报错，如果注册订阅失败时，也允许启动，需使用此选项，将在后台定时重试。
```

## 三、启动检查注解配置

```java
@Reference(check=false)
UserService userService;
```

# 12【掌握】重试原则

## 一、概述

    失败自动切换，当出现失败，重试其它服务器，但重试会带来更长延迟。可通过 retries="2" 来设置重试次数(不含第一次)。

**什么时候使用重试，什么时候不使用重试？**

答：如果是非幂等操作【执行多次对数据有影响的操作，如add】，不能重试；如果是幂等性操作【执行多次对数据没有影响的操作，如查询，修改，删除】，可以重试。

## 二、xml配置

```java
<dubbo:service retries="2" />
或
<dubbo:reference retries="2" />
或
<dubbo:reference>
    <dubbo:method name="getUserAddressList" retries="2" />
</dubbo:reference>
```

## 三、重试注解的配置

```java
@Reference(retries=2)
UserService userService;
​
@Service(retries=2)
public class UserServiceImpl{
}
```

# 13【掌握】灰度发布

## 一、什么是灰度发布

    当一个接口实现，出现不兼容升级时，可以用版本号过渡，版本号不同的服务相互间不引用。

    可以按照以下的步骤进行版本迁移：

* 在低压力时间段，先升级一半提供者为新版本
* 再将所有消费者升级为新版本
* 然后将剩下的一半提供者升级为新版本

## 二、xml配置

```xml
老版本服务提供者配置：
<dubbo:service interface="com.sxt.service.impl.UserServiceImpl" version="1.0.0" />
​
新版本服务提供者配置：
<dubbo:service interface="com.sxt.service.impl.UserServiceImpl2" version="2.0.0" />
​
老版本服务消费者配置：
<dubbo:reference id="userService" interface="com.sxt.service.UserService" version="1.0.0" />
​
新版本服务消费者配置：
<dubbo:reference id="userService" interface="com.sxt.service.UserService" version="2.0.0" />
​
如果不需要区分版本，可以按照以下的方式配置：
<dubbo:reference id="userService" interface="com.sxt.service.UserService" version="*" />
```

## 三、注解配置

### 提供者:

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac7310767-81cd-47f4-816d-5b65e76cdfd2.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad9b32e48-10d7-47d3-987d-f346e12f2dc2.png)

### 消费者:

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracdf04ca1-3332-46f2-9419-fb4770dd87b7.png)

# 14【掌握】本地存根

## 一、概述

远程服务后，客户端通常只剩下接口，而实现全在服务器端，但提供方有些时候想在客户端也执行部分逻辑，比如：做 ThreadLocal 缓存，提前验证参数，调用失败后伪造容错数据等等，此时就需要在 API 中带上 Stub，客户端生成 Proxy 实例，会把 Proxy 通过构造函数传给 Stub \[1\]，然后把 Stub 暴露给用户，Stub 可以决定要不要去调 Proxy。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8664607986264516.png)

## 二、xml配置

消费端在 spring 配置文件中按以下方式配置\[1\]：

```python
<dubbo:reference id="userService" interface="com.sxt.service.UserService" stub="com.sxt.service.impl.SubUserServiceImpl">
    </dubbo:reference>
```

消费端提供 Stub 的实现 \[2\]：

```python
public class SubUserServiceImpl implements UserService{
​
    private UserService userService;

    public SubUserServiceImpl(UserService userService) {
        this.userService=userService;
    }
    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        try {
            return userService.getUserAddressList("whsxt");
        } catch (Exception e) {
            return Arrays.asList(new UserAddress(1, "本地存根", "aaaaa"));
        }
    }

}
```

**Stub 必须有可传入 Proxy 的构造函数。** 

在 interface 旁边放一个 Stub 实现，它实现 UserService 接口，并有一个传入远程 UserService 实例的构造函数 

## 三、注解配置

```python
@Reference(stub="com.sxt.service.SubUserServiceImpl")
UserService userService;
```

# 15【掌握】dubbo整合springboot的常规配置项

## 1，超时处理注解配置

```java
@Reference(timeout=5000)
UserService userService;

@Service(timeout=5000)
public class UserServiceImpl{
}
```

## 2，启动检查注解配置

```java
@Reference(check=false)
UserService userService;
```

## 3，重试注解的配置

```java
@Reference(retries=2)
UserService userService;

@Service(retries=2)
public class UserServiceImpl{
}
```

## 4，灰度发布的注解配置

### 提供者:

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac7310767-81cd-47f4-816d-5b65e76cdfd2.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad9b32e48-10d7-47d3-987d-f346e12f2dc2.png)

### 消费者:

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracdf04ca1-3332-46f2-9419-fb4770dd87b7.png)

## 5，本地存根的注解配置

```python
@Reference(stub="com.sxt.service.SubUserServiceImpl")
UserService userService;
```

# 16【掌握】zookeeper宕机与dubbo直连

## 1，zookeeper宕机

现象：zookeeper注册中心宕机，还可以消费dubbo暴露的服务。

原因：

健壮性

监控中心宕掉不影响使用，只是丢失部分采样数据

数据库宕掉后，注册中心仍能通过缓存提供服务列表查询，但不能注册新服务

注册中心对等集群，任意一台宕掉后，将自动切换到另一台

注册中心全部宕掉后，服务提供者和服务消费者仍能通过本地缓存通讯

服务提供者无状态，任意一台宕掉后，不影响使用

服务提供者全部宕掉后，服务消费者应用将无法使用，并无限次重连等待服务提供者恢复

高可用：通过设计，减少系统不能提供服务的时间；

## 2，dubbo直连

直连就是直接连接服务器绕过注册中心了

```python
@Reference(url="127.0.0.1:20880")
UserService userService;
```

# 17【掌握】集群下dubbo负载均衡配置

## 1，概述

在集群负载均衡时，Dubbo 提供了多种均衡策略，缺省为 random 随机调用。

负载均衡策略

## 2，Random LoadBalance

随机，按权重设置随机概率。

在一个截面上碰撞的概率高，但调用量越大分布越均匀，而且按概率使用权重后也比较均匀，有利于动态调整提供者权重。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6f318b3f-6a56-4dee-9991-01e317e9223e.png)

## 3，RoundRobin LoadBalance

轮循，按公约后的权重设置轮循比率。

存在慢的提供者累积请求的问题，比如：第二台机器很慢，但没挂，当请求调到第二台时就卡在那，久而久之，所有请求都卡在调到第二台上。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5b00b7a2-9469-42e6-abb0-7f8b81f94a6c.png)

## 4，LeastActive LoadBalance

最少活跃调用数，相同活跃数的随机，活跃数指调用前后计数差。

使慢的提供者收到更少请求，因为越慢的提供者的调用前后计数差会越大。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora51bd3709-2772-431d-92fd-76bfc32bcacd.png)

## 5，ConsistentHash LoadBalance

一致性 Hash，相同参数的请求总是发到同一提供者。

当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其它提供者，不会引起剧烈变动。算法参见：http://en.wikipedia.org/wiki/Consistent\_hashing

缺省只对第一个参数 Hash，如果要修改，请配置 <dubbo:parameter key="hash.arguments" value="0,1" />

缺省用 160 份虚拟节点，如果要修改，请配置 <dubbo:parameter key="hash.nodes" value="320" />



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad1f27668-7c63-4013-b630-965c8c3e510c.png)

## 6，测试思路

1，启动3个提供者20880   20881    20882 

2，启动提供者不加可以看出默认的是random

3，修改成randomrobin的方式再来测试

## 7，动态权重修改

1，写死

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracc59a023-261c-443b-b6a6-3c98a63bf00a.png)

2，动态

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1d7e7612-0b67-40f9-ab6a-25f4698c0741.png)

3，精确调整

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab45433f2-dcc0-4acb-acdf-5d5240db70e9.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2dcff3dc-bc36-4e67-8427-3fc951ccc92d.png)

# 18【掌握】整合hystrix，服务熔断与降级处理

## 1、服务降级

什么是服务降级？

**当服务器压力剧增的情况下，根据实际业务情况及流量，对一些服务和页面有策略的不处理或换种简单的方式处理，从而释放服务器资源以保证核心交易正常运作或高效运作。**

可以通过服务降级功能临时屏蔽某个出错的非关键服务，并定义降级后的返回策略。

向注册中心写入动态配置覆盖规则：

```java
RegistryFactory registryFactory = ExtensionLoader.getExtensionLoader(RegistryFactory.class).getAdaptiveExtension();
Registry registry = registryFactory.getRegistry(URL.valueOf("zookeeper://10.20.153.10:2181"));
registry.register(URL.valueOf("override://0.0.0.0/com.foo.BarService?category=configurators&dynamic=false&application=foo&mock=force:return+null"));
```

其中：

mock=force:return+null 表示消费方对该服务的方法调用都直接返回 null 值，不发起远程调用。用来屏蔽不重要服务不可用时对调用方的影响。

还可以改为 mock=fail:return+null 表示消费方对该服务的方法调用在失败后，再返回 null 值，不抛异常。用来容忍不重要服务不稳定时对调用方的影响。

演示屏蔽  在消费者端把A服务器屏蔽。再去请求，此时发现不会做远程调用 直接返回了null

演示容错  在消费者端把A服务的超时时间设置成1000  把对应调用了提供者睡眠5000，再来调用测试

## 2、集群容错

在集群调用失败时，Dubbo 提供了多种容错方案，缺省为 failover 重试。

集群容错模式

**Failover Cluster**

失败自动切换，当出现失败，重试其它服务器。通常用于读操作，但重试会带来更长延迟。可通过 retries="2" 来设置重试次数(不含第一次)。

重试次数配置如下：

<dubbo:service retries="2" />

或

<dubbo:reference retries="2" />

或

[dubbo:reference](dubbo:reference)

    <dubbo:method name="getUserAddressList" retries="2" />

**Failfast Cluster**

快速失败，只发起一次调用，失败立即报错。通常用于非幂等性的写操作，比如新增记录。

**Failsafe Cluster**

失败安全，出现异常时，直接忽略。通常用于写入审计日志等操作。

**Failback Cluster**

失败自动恢复，后台记录失败请求，定时重发。通常用于消息通知操作。

**Forking Cluster**

并行调用多个服务器，只要一个成功即返回。通常用于实时性要求较高的读操作，但需要浪费更多服务资源。可通过 forks="2" 来设置最大并行数。

**Broadcast Clus\*\*\*\*ter**

广播调用所有提供者，逐个调用，任意一台报错则报错 \[2\]。通常用于通知所有提供者更新缓存或日志等本地资源信息。

**集群模式配置**

按照以下示例在服务提供方和消费方配置集群模式

```java
<dubbo:service cluster="failsafe" />
或
<dubbo:reference cluster="failsafe" />
```

## 3、整合hystrix

Hystrix 旨在通过控制那些访问远程系统、服务和第三方库的节点，从而对延迟和故障提供更强大的容错能力。Hystrix具备拥有回退机制和断路器功能的线程和信号隔离，请求缓存和请求打包，以及监控和配置等功能

### 1、配置spring-cloud-starter-netflix-hystrix

spring boot官方提供了对hystrix的集成，直接在pom.xml里加入依赖：

```java
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
            <version>1.4.4.RELEASE</version>
        </dependency>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7073a4bf-1a2a-44db-8f5f-027d965132ae.png)

然后在Application类上增加@EnableHystrix来启用hystrix starter：

```java
@EnableDubbo//开户注解的dubbo功能
@SpringBootApplication
@EnableHystrix
public class BootEgoUserServiceProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(BootEgoUserServiceProviderApplication.class, args);
    }
}
```

---

### 2、配置Provider端

在Dubbo的Provider上增加@HystrixCommand配置，这样子调用就会经过Hystrix代理。

```java
@Service//暴露服务
public class UserServiceImpl implements UserService{

    public static List<UserAddress> address=new ArrayList<>();

    static {
        address.add(new UserAddress(1, "湖北省武汉市东湖高新区金融港B22栋11楼", "whsxt"));
        address.add(new UserAddress(2, "北京市海淀区西三旗街道建材城西路中腾建华商务大厦东侧二层尚学堂", "bjsxt"));
    }
    @HystrixCommand
    @Override
    public List<UserAddress> getUserAddressList(String userId) {
        System.out.println("UserServiceImpl----20082-3");
        //讲道理要是去数据库里面去查询的
        if(Math.random()>0.5) {
            throw new RuntimeException();
        }
        return address;
    }
}
```

3、配置Consumer端  

对于Consumer端，则可以增加一层method调用，并在method上配置@HystrixCommand。当调用出错时，会走到fallbackMethod = "reliable"的调用里。

启动类

```java
@SpringBootApplication
@EnableDubbo //启动dubbo
@EnableHystrix
public class BootEgoOrderServiceConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BootEgoOrderServiceConsumerApplication.class, args);
    }

}

```

消费类

```java
 @Service
public class OrderServiceImpl implements OrderService {

    @Reference
    UserService userService;
    //如果出错就调用hello方法
    @HystrixCommand(fallbackMethod="hello")
    @Override
    public List<UserAddress> initOrder(String userId) {
        System.out.println("用户id："+userId);
        //1、查询用户的收货地址
        List<UserAddress> addressList = userService.getUserAddressList(userId);
        return addressList;
    }

    /**
    出错之后的回调方法
    **/
    public List<UserAddress> hello(String userId) {
        return Arrays.asList(new UserAddress(3, "出错啦", "1"));
    }
}
```

# 19【熟悉】RPC原理和通信原理

## 1，rpc原理

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora953bfd62-482a-4b0a-b110-73b7031ddc4d.jpg)

一次完整的RPC调用流程（同步调用，异步另说）如下： 

**1）服务消费方（client）调用以本地调用方式调用服务；** 

2）client stub接收到调用后负责将方法、参数等组装成能够进行网络传输的消息体； 

3）client stub找到服务地址，并将消息发送到服务端； 

4）server stub收到消息后进行解码； 

5）server stub根据解码结果调用本地的服务； 

6）本地服务执行并将结果返回给server stub； 

7）server stub将返回结果打包成消息并发送至消费方； 

8）client stub接收到消息，并进行解码； 

**9）服务消费方得到最终结果。**

RPC框架的目标就是要2\~8这些步骤都封装起来，这些细节对用户来说是透明的，不可见的。

## 2、netty通信原理

Netty是一个异步事件驱动的网络应用程序框架， 用于快速开发可维护的高性能协议服务器和客户端。它极大地简化并简化了TCP和UDP套接字服务器等网络编程。

BIO：(Blocking IO)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora00832bb9-7dbe-41c8-881e-5427246f6fb9.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora85f7eb6c-96d3-4962-8635-4dac5ae231f7.jpg)

Selector 一般称 为选择器 ，也可以翻译为 多路复用器，

Connect（连接就绪）、Accept（接受就绪）、Read（读就绪）、Write（写就绪）

Netty基本原理：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaa5f6b5b-f195-4f73-86bd-7d0482f4b1ff.jpg)

# 20【难点】\[源代码\]dubbo的设计原理

## 1、dubbo原理 -框架设计

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora11a4b2a3-9042-4374-b050-f9d62598a0c9.jpg)

* config 配置层：对外配置接口，以 ServiceConfig, ReferenceConfig 为中心，可以直接初始化配置类，也可以通过 spring 解析配置生成配置类  
* proxy 服务代理层：服务接口通过代理，生成服务的客户端 Stub 和服务器端 Skeleton, 以 ServiceProxy 为中心，扩展接口为 ProxyFactory  
* registry 注册中心层：封装服务地址的注册与发现，以服务 URL 为中心，扩展接口为 RegistryFactory, Registry, RegistryService  
* cluster 路由层：封装多个提供者的路由及负载均衡，并桥接注册中心，以 Invoker 为中心，扩展接口为 Cluster, Directory, Router, LoadBalance  
* monitor 监控层：RPC 调用次数和调用时间监控，以 Statistics 为中心，扩展接口为 MonitorFactory, Monitor, MonitorService  
* protocol 远程调用层：封装 RPC 调用，以 Invocation, Result 为中心，扩展接口为 Protocol, Invoker, Exporter  
* exchange 信息交换层：封装请求响应模式，同步转异步，以 Request, Response 为中心，扩展接口为 Exchanger, ExchangeChannel, ExchangeClient, ExchangeServer  
* transport 网络传输层：抽象 mina 和 netty 为统一接口，以 Message 为中心，扩展接口为 Channel, Transporter, Client, Server, Codec  
* serialize 数据序列化层：可复用的一些工具，扩展接口为 Serialization, ObjectInput, ObjectOutput, ThreadPool  

## 2、dubbo原理 -启动解析、加载配置信息

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab786ea76-56a2-436f-8fd5-1cdf6da1ea3a.jpg)

在DubboBeanDefinitionParser构造方法的前面执行了DubboNamespaceHandler

## 3、dubbo原理 -服务暴露

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2896f1f1-18fb-4012-8219-9f64e645f3be.jpg)

## 4、dubbo原理 -服务引用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa9b76afd-c67b-4035-94be-eb37fc36fdb5.jpg)

## 5、dubbo原理 -服务调用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac48043a8-050b-4a62-97b4-31c460dfd027.jpg)

# 21【难点】dubbo 启动加载

找到DefinitionParser  

这个spring工厂提供的个解析XML和注解的全局接口

只要实现了这个接口的配置，那么在XML里面定义的标签就可以被解析

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00161fd878b-72be-4a2f-b1c3-f7a9a0ba5754.png)

## 找到DubboBeanDefinitionParser

它实现了DefinitionParser这样一个接口，目地是用于来解析springxml或注解的配置里面的信息

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00294a8fa38-ba14-497b-9c9b-87601ef71503.png)

## 找到DubboNamespaceHandler

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0034c96de05-93a7-42da-bfe9-91c37040fb3d.png)

# 22【难点】dubbo 服务暴露源码分析

找到ServiceBean  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4157555882372946.png)

```xml
/**
 * ServiceFactoryBean
 *
 * @export
 */
public class ServiceBean<T> extends ServiceConfig<T> implements InitializingBean, DisposableBean,
        ApplicationContextAware, ApplicationListener<ContextRefreshedEvent>, BeanNameAware,
        ApplicationEventPublisherAware {
​
    private static final long serialVersionUID = 213195494150089726L;
​
    private final transient Service service;
​
    private transient ApplicationContext applicationContext;
​
    private transient String beanName;
​
    private transient boolean supportedApplicationListener;
​
    private ApplicationEventPublisher applicationEventPublisher;

InitializingBean   实现在这个接口那当IOC初始化时会调用的方法
​
ApplicationContextAware, 实现这个接口可以得到上下文的IOC窗口对象ApplicationListener<ContextRefreshedEvent>  监听器
```

找到ServiceBean-- afterPropertiesSet  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.16523564441214714.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.675086549324774.png)

## 找到ServiceBean—export方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.15255362600569985.png)

## 找到ServiceConfig—export方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9973470674297131.png)

## 找到ServiceConfig—doExport方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.09334511939387824.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9626789459995215.png)

## 找到ServiceConfig—doExportUrls方法

得入注册地，进行注册

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6390975725514623.png)

## 找到ServiceConfig—doExportUrlsFor1Protocol方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5648297099551987.png)

## 找到RegistryProtocol—export方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.685856467274036.png)

## 找到DubboProtocol—export方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22153617887659954.png)

## 找到DubboProtocol—openServer方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.32193798081036995.png)

## 找到DubboProtocol—createServer方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.267493020365812.png)

## 找到Exchangers—bind方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08287302054116184.png)

## 找到HeaderExchanger—bind方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22583738917380383.png)

## 找到Transporters—bind方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.31140679665128945.png)

## 找到Transporter—bind方法—到netty底层了

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5698558317678453.png)

# 23【难点】dubbo 服务引用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.20516336164404306.png)

## 找到ReferenceBean

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4561941148445007.png)

## 找到ReferenceBean- afterPropertiesSet

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6474903745641671.png)

## 找到ReferenceBean- getObject();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9256267303072615.png)

## 找到ReferenceBean- get();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1795218249845068.png)

## 找到ReferenceBean- init();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08894660814333773.png)

## 找到ReferenceBean- createProxy();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8672426776284355.png)

## 找到RegistryProtocol- refer();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7929086140033001.png)

## 找到DubboProtocol- refer();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3826040427441947.png)

## 找到DubboProtocol- getClients();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.00031364493018216135.png)

## 找到DubboProtocol- getSharedClients();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.28525356090996046.png)

## 找到DubboProtocol- initClients();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.40026927821872615.png)

## 找到Exchangers- connect();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6541956395476806.png)

## 找到HeaderExchanger- connect();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5780569610661319.png)

## 找到Transporters- connect();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.020797709326534367.png)

## 找到Transporter- connect();

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.43263922621413925.png)

# 24【难点】dubbo 服务调用

## 找到程序入口

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0019313feaf-d880-4e38-bd85-0ca88dad1ca6.png)

## OrderServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image002c11f86f7-582f-4fa5-9068-4639d72e5859.png)

## OrderServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image003d0bc4a78-5e57-46cc-b4dc-da8afe6ed391.png)

## 找到InvokerInvocationHandler-invoke

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image004aaba15b0-e0ba-4043-96a1-e802fbb573ef.png)

## 找到MockClusterInvoker-invoke

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image005af6bbb58-b7a9-4181-aa3d-c6678461d409.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0066735b373-8285-4852-b1a1-81933309aeb7.png)

## 找到FailoverClusterInvoker-invoke

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0075209cf29-9f37-4a1e-ab36-ecfa2668d0f6.png)

## 因为FailoverClusterInvoker里面没invoker方法 所的找其父类找到AbstractClusterInvoker里面的invoker

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image008c755072b-76af-4977-af12-edc8b31cca79.png)

## 找到FailoverClusterInvoker里面doInvoker方法

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00946838450-b54f-4520-8e70-2eb321e6b083.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image010b4a71948-4634-4c66-acd4-7fb2897456be.png)

# 25【面试】相关面试题的处理

[https://blog.csdn.net/moakun/article/details/82919804](https://blog.csdn.net/moakun/article/details/82919804)

## **1、Dubbo是什么？**  

Dubbo是阿里巴巴开源的基于 Java 的高性能 RPC 分布式服务框架，现已成为 Apache 基金会孵化项目。

面试官问你如果这个都不清楚，那下面的就没必要问了。

官网：http://dubbo.apache.org

## **2、为什么要用Dubbo？**

因为是阿里开源项目，国内很多互联网公司都在用，已经经过很多线上考验。内部使用了 Netty、Zookeeper，保证了高性能高可用性。

使用 Dubbo 可以将核心业务抽取出来，作为独立的服务，逐渐形成稳定的服务中心，可用于提高业务复用灵活扩展，使前端应用能更快速的响应多变的市场需求。

下面这张图可以很清楚的诠释，最重要的一点是，分布式架构可以承受更大规模的并发流量。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image001d20b8124-daa6-45cc-855d-a6741cc0ef26.png)

下面是 Dubbo 的服务治理图。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image002acc10a61-fb32-4150-9e90-553b210ada5f.png)

## **3、Dubbo 和 Spring Cloud 有什么区别？**

两个没关联，如果硬要说区别，有以下几点。

1）通信方式不同

Dubbo 使用的是 RPC 通信，而 Spring Cloud 使用的是 HTTP RESTFul 方式。

2）组成部分不同

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00322de700d-3b17-4568-8afe-a4d578f3390e.png)

## **4、dubbo都支持什么协议，推荐用哪种？**

·dubbo://（推荐）

·rmi://

·hessian://

·http://

·webservice://

·thrift://

·memcached://

·redis://

·rest://

## **5、Dubbo需要 Web 容器吗？**

不需要，如果硬要用 Web 容器，只会增加复杂性，也浪费资源。

## **6、Dubbo内置了哪几种服务容器？**

·Spring Container

·Jetty Container

·Log4j Container

Dubbo 的服务容器只是一个简单的 Main 方法，并加载一个简单的 Spring 容器，用于暴露服务。

## **7、Dubbo里面有哪几种节点角色？**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0041bc3dc61-699f-42a2-9e81-545035fe3fb2.png)

## **8、画一画服务注册与发现的流程图**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image005107ec406-3a81-42be-936a-bc22cf0a9bb5.png)

该图来自 Dubbo 官网，供你参考，如果你说你熟悉 Dubbo, 面试官经常会让你画这个图，记好了。

## **9、Dubbo默认使用什么注册中心，还有别的选择吗？**

推荐使用 Zookeeper 作为注册中心，还有 Redis、Multicast、Simple 注册中心，但不推荐。

## **10、Dubbo有哪几种配置方式？**

1）Spring 配置方式
2）Java API 配置方式

## **11、Dubbo 核心的配置有哪些？**

我曾经面试就遇到过面试官让你写这些配置，我也是蒙逼。。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image006b44a61f9-9a0a-4e63-9285-45a48026110b.png)

配置之间的关系见下图。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0075d7c7732-c553-45ba-9676-114cc8c09ceb.png)

## **12、在 Provider 上可以配置的 Consumer 端的属性有哪些？**

1）timeout：方法调用超时
2）retries：失败重试次数，默认重试 2 次
3）loadbalance：负载均衡算法，默认随机
4）actives 消费者端，最大并发调用限制

## **13、Dubbo启动时如果依赖的服务不可用会怎样？**

Dubbo 缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，阻止 Spring 初始化完成，默认 check="true"，可以通过 check="false" 关闭检查。

## **14、Dubbo推荐使用什么序列化框架，你知道的还有哪些？**

推荐使用Hessian序列化，还有Duddo、FastJson、Java自带序列化。

## **15、Dubbo默认使用的是什么通信框架，还有别的选择吗？**

Dubbo 默认使用 Netty 框架，也是推荐的选择，另外内容还集成有Mina、Grizzly。

## **16、Dubbo有哪几种集群容错方案，默认是哪种？**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00806973275-8522-4c3d-9d72-d68f266de289.png)

## **17、Dubbo有哪几种负载均衡策略，默认是哪种？**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image009ee8d3b8f-1ad4-4ced-8036-7d3850792f5e.png)

## **18、注册了多个同一样的服务，如果测试指定的某一个服务呢？**

可以配置环境点对点直连，绕过注册中心，将以服务接口为单位，忽略注册中心的提供者列表。

## **19、Dubbo支持服务多协议吗？**

Dubbo 允许配置多协议，在不同服务上支持不同协议或者同一服务上同时支持多种协议。

## **20、当一个服务接口有多种实现时怎么做？**

当一个接口有多种实现时，可以用 group 属性来分组，服务提供方和消费方都指定同一个 group 即可。

## **21、服务上线怎么兼容旧版本？---灰度发布**

可以用版本号（version）过渡，多个不同版本的服务注册到注册中心，版本号不同的服务相互间不引用。这个和服务分组的概念有一点类似。

## **22、Dubbo可以对结果进行缓存吗？**

可以，Dubbo 提供了声明式缓存，用于加速热门数据的访问速度，以减少用户加缓存的工作量。

## **23、Dubbo服务之间的调用是阻塞的吗？**

默认是同步等待结果阻塞的，支持异步调用。

Dubbo 是基于 NIO 的非阻塞实现并行调用，客户端不需要启动多线程即可完成并行调用多个远程服务，相对多线程开销较小，异步调用会返回一个 Future 对象。

异步调用流程图如下。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image010003b5ab1-65dc-4251-932f-bc2e0374b3a3.png)

## **24、Dubbo支持分布式事务吗？**

目前暂时不支持，后续可能采用基于 JTA/XA 规范实现，如以图所示。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image011e6cf5bc4-93a2-4469-9590-20e3bd710ca4.png)

## **26、Dubbo支持服务降级吗？**

Dubbo 2.2.0 以上版本支持。

## **28、服务提供者能实现失效踢出是什么原理？**

服务失效踢出基于 Zookeeper 的临时节点原理。

## **29、如何解决服务调用链过长的问题？**

Dubbo 可以使用 Pinpoint 和 Apache Skywalking(Incubator) 实现分布式服务追踪，当然还有其他很多方案。

## **30、服务读写推荐的容错策略是怎样的？**

读操作建议使用 Failover 失败自动切换，默认重试两次其他服务器。

写操作建议使用 Failfast 快速失败，发一次调用失败就立即报错。

## **31、Dubbo必须依赖的包有哪些？**

Dubbo 必须依赖 JDK，其他为可选。

## **32、Dubbo的管理控制台能做什么？**

管理控制台主要包含：路由规则，动态配置，服务降级，访问控制，权重调整，负载均衡，等管理功能。

## **33、说说 Dubbo 服务暴露的过程。**

Dubbo 会在 Spring 实例化完 bean 之后，在刷新容器最后一步发布 ContextRefreshEvent 事件的时候，通知实现了 ApplicationListener 的 ServiceBean 类进行回调 onApplicationEvent 事件方法，Dubbo 会在这个方法中调用 ServiceBean 父类 ServiceConfig 的 export 方法，而该方法真正实现了服务的（异步或者非异步）发布。

## **34、Dubbo 停止维护了吗？**

2014 年开始停止维护过几年，17 年开始重新维护，并进入了 Apache 项目。

## **35、Dubbo 和 Dubbox 有什么区别？**

Dubbox 是继 Dubbo 停止维护后，当当网基于 Dubbo 做的一个扩展项目，如加了服务可 Restful 调用，更新了开源组件等。

## **36、你还了解别的分布式框架吗？**

别的还有 Spring cloud、Facebook 的 Thrift、Twitter 的 Finagle 等。

## **37、Dubbo 能集成 Spring Boot 吗？**

可以的，项目地址如下。

https://github.com/apache/incubator-dubbo-spring-boot-project

## **38、在使用过程中都遇到了些什么问题？**

Dubbo 的设计目的是为了满足高并发小数据量的 rpc 调用，在大数据量下的性能表现并不好，建议使用 rmi 或 http 协议。

## **40、你觉得用 Dubbo 好还是 Spring Cloud 好？**

扩展性的问题，没有好坏，只有适合不适合，不过我好像更倾向于使用 Dubbo, Spring Cloud 版本升级太快，组件更新替换太频繁，配置太繁琐，还有很多我觉得是没有 Dubbo 顺手的地方……