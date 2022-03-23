# 01【熟悉】ActiveMQ概述

## 1，生活中的案例\[生产中的问题\]为什么要使用MQ

  1，学生问问题的例子 

  2，分布式项目中RPC的调用处理时间过长的问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7091671328605158.png)

## 2，为什么要使用MQ

微服务架构后，链式调用是我们在写程序时候的一般流程，为了这完成一个整体功能会把它拆分成多个函数（或子模块）比如模块A调用模块B，模块B调用模块C，模块C调用模块D。但是大型分布式应用中，系统间的RPC交互复杂，一个功能后面要调用上百个接口并非不可能，从单机架构过渡到分布式微服务架构，这样的架构有没有问题呢？有

    根据上面的风个问题，在设置系统时可以明确要克到的目标

1，要做到系统解耦，当新的模块进来时，可以做到代码改动最小;  **能够解耦**

2，设置流程缓冲池，可以让后端系统按自身吞吐能力进行消费，不被冲垮; **能够削峰**

3，强弱依赖梳理能把非关键调用链路的操作异步化并提升整体系统的吞吐能力;**能够异步**

## 3，什么是MQ

### 3.1，定义

面向消息的中间件(message-oriented middleware0) MOM能够很好的解决以上的问题。

是指利用高效可靠的消息传递机制进行与平台无关的数据交流，并基于数据通信来进行分布式系统的集成。

通过提供消息传递和消息排队模型在分布式环境下提供应用解耦，弹性伸缩，冗余存储，流量削峰，异步通信，数据同步等

大致流程

发送者把消息发给消息服务器，消息服务器把消息存放在若干队列/主题中，在合适的时候，消息服务器会把消息转发给接受者。

在这个过程中，发送和接受是异步的,也就是发送无需等待，发送者和接受者的生命周期也没有必然关系

在发布pub/订阅sub模式下，也可以完成一对多的通信，可以让一个消息有多个接受者\[微信订阅号就是这样的\]

![image](C:/Users/18364/Downloads/images/0.8297816218975649.png)

### 3.2，特点

#### 3.2.1，异步处理模式

消息发送者可以发送一个消息而无需等待响应。消息发送者把消息发送到一条虚拟的通道(主题或队列)上;

消息接收者则订阅或监听该通道。一条信息可能最络转发给一个或多个消息接收者，这些接收者都无需对消息发送者做出回应。整个过程都是异步的。

案例：

也就是说，一个系统和另一个系统这间进行通信的时候，假如系统A希望发送一个消息给系统B，让它去处理，但是系统A不关注系统B到底怎么处理或者有没有处理好，所以系统A把消息发送给MQ，然后就不管这条消息的“死活” 了，接着系统B从MQ里面消费出来处理即可。至于怎么处理，是否处理完毕，什么时候处理，都是系统B的事，与系统A无关。

![image](C:/Users/18364/Downloads/images/0.9233725117882501.png)

这样的一种通信方式，就是所谓的“异步”通信方式，对于系统A来说，只要把消息发给MQ,然后系统B就会异步处去进行处理了，系统A不能“同步”的等待系统B处理完。这样的好处是什么呢？解耦

#### 3.2.2，应用系统的解耦

  发送者和接收者不必了解对方，只需要确认消息

  发送者和接收者不必同时在线

#### 3.2.3，现实中的业务

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2275095893698076.png)

## **4，什么是ActiveMQ**

         ActiveMQ是Apache出品，最流行的，能力强劲的开源消息总线。ActiveMQ 是一个完全支持JMS1.1和J2EE 1.4规范的 JMS Provider实现,尽管JMS规范出台已经是很久的事情了,但是JMS在当今的J2EE应用中间仍然扮演着特殊的地位。

主要特点：

1\. 多种语言和协议编写客户端。语言: Java, C, C++, C#, Ruby, Perl, Python, PHP。应用协议: OpenWire,Stomp REST,WS Notification,XMPP,AMQP

2\. 完全支持JMS1.1和J2EE 1.4规范 (持久化,XA消息,事务)

3\. 对Spring的支持,ActiveMQ可以很容易内嵌到使用Spring的系统里面去,而且也支持Spring2.0的特性

4\. 通过了常见J2EE服务器(如 Geronimo,JBoss 4, GlassFish,WebLogic)的测试,其中通过JCA 1.5 resourceadaptors的配置,可以让ActiveMQ可以自动的部署到任何兼容J2EE1.4 商业服务器上

5\. 支持多种传送协议:in-VM,TCP,SSL,NIO,UDP,JGroups,JXTA

6\. 支持通过JDBC和journal提供高速的消息持久化

7\. 从设计上保证了高性能的集群,客户端-服务器,点对点

8\. 支持Ajax

9\. 支持与Axis（Apache Extensible Interaction System 即阿帕奇可扩展交互系统。Axis本质上就是一个SOAP引擎，提供创建服务器端、客户端和网关SOAP操作的基本框架）的整合

10\. 可以很容易得调用内嵌JMS provider,进行测试

11.支持集群

## 5，学什么

1，异步消息的消费和处理

2，控制消息的消费顺序

3，和spring及Springboot的整合

4，集群容错的配置

……………………

# 02【了解】ActiveMQ在windows下的安装

## 1，下载

下载地址[http://activemq.apache.org/components/classic/download/](http://activemq.apache.org/components/classic/download/)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.29372627612942304.png)

---

## 2， 安装

安装步骤：

第一步：安装jdk，需要jdk1.7以上版本【一定要配置JAVA\_HOME】

第二步：解压缩activeMQ的压缩包。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9430584402380384.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.00034071544704534525.png)

   目录说明

①bin 启动和停止的相关文件目录

②conf配置目录【用户名和密码】

③data  数据目录

④docs 文档目录

⑤examples 官方案例目录

⑥lib运行时的支持jar包

⑦webapps官方应用程序目录

⑧activemq-all.\*.jar官方jar包

第三步：启动和停止。看自己的系统位数进入相关的目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8949824548535333.png)

启动： 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7329423420366623.png)

停止：关闭窗口就可以啦

第四步：访问后台管理。

http://127.0.0.1:8161/index.html

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1009622917587299.png)

[http://127.0.0.1:8161/admin](http://IP:8161/admin)

输入用户名和密码   admin/admin

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8088029388315301.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3000415264635825.png)

## 3， 修改8161端口

conf/jetty.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7083007539163506.png)

## 4， 修改登陆用户名和密码

conf/users.properties

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.20238844318482987.png)

# 03【掌握】ActiveMQ在Linux下的安装

## 1，下载

        下载地址[http://activemq.apache.org/activemq-5156-release.html](http://activemq.apache.org/activemq-5156-release.html)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6002290632697614.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7580403269259061.png)

## 2，安装

1，配置jdk环境变量【不会的回看Linux】

2，上传mq的压缩包到Linux

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5514547352854222.png)

3，解压到usr/local/ActiveMQ

```Plain Text
mkdir /usr/local/ActiveMQ

tar -zxvf apache-activemq-5.15.10-bin.tar.gz -C /usr/local/ActiveMQ/
```

5，配置用户名和密码\[默认为admin/admin\]

```Plain Text
vim conf/users.properties
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.26428473661332946.png)

4，启动和停止重启

```Plain Text
./bin/activemq start
./bin/activemq stop
./bin/activemq restart
```

## 3，放行端口

8161

61616

访问

[http://192.168.72.139:8161/admin](http://IP:8161/admin)

输入用户名和密码   admin/admin

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.928928669838061.png)

## 4，测试发消息

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7628468973092692.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8016471078864712.png)

## 5，端口说明

ActiveMQ是使用61616端口提供的JMS服务

使用8161提供管理控制台的服务

# 04【掌握】消息发送模式和接口说明

## 1，JMS消息发送模式

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2026569265534725.png)

        在**点对点**或队列模型下，一个生产者向一个特定的队列发布消息，一个消费者从该队列中读取消息。这里，生产者知道消费者的队列，并直接将消息发送到消费者的队列。这种模式被概括为：只有一个消费者将获得消息。生产者不需要在接收者消费该消息期间处于运行状态，接收者也同样不需要在消息发送时处于运行状态。每一个成功处理的消息都由接收者签收。

        **发布者／订阅者**模型支持向一个特定的消息主题发布消息。0或多个订阅者可能对接收来自特定消息主题的消息感兴趣。在这种模型下，发布者和订阅者彼此不知道对方。这种模式好比是匿名公告板。这种模式被概括为：多个消费者可以获得消息.在发布者和订阅者之间存在时间依赖性。发布者需要建立一个订阅（subscription），以便客户能够购订阅。订阅者必须保持持续的活动状态以接收消息，除非订阅者建立了持久的订阅。在那种情况下，在订阅者未连接时发布的消息将在订阅者重新连接时重新发布。

## 2，JMS应用程序接口

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7529029568074845.png)

**1，ConnectionFactory** **接口（连接工厂）**

用户用来创建到JMS提供者的连接的被管对象。JMS客户通过可移植的接口访问连接，这样当下层的实现改变时，代码不需要进行修改。管理员在JNDI名字空间中配置连接工厂，这样，JMS客户才能够查找到它们。根据消息类型的不同，用户将使用队列连接工厂，或者主题连接工厂。

**2，Connection** **接口（连接）**

连接代表了应用程序和消息服务器之间的通信链路。在获得了连接工厂后，就可以创建一个与JMS提供者的连接。根据不同的连接类型，连接允许用户创建会话，以发送和接收队列和主题到目标。

**3，Destination** **接口（目标）**

目标是一个包装了消息目标标识符的被管对象，消息目标是指消息发布和接收的地点，或者是队列，或者是主题。JMS管理员创建这些对象，然后用户通过JNDI发现它们。和连接工厂一样，管理员可以创建两种类型的目标，点对点模型的队列，以及发布者／订阅者模型的主题。

**4，MessageConsumer** **接口（消息消费者）**

由会话创建的对象，用于接收发送到目标的消息。消费者可以同步地（阻塞模式），或异步（非阻塞）接收队列和主题类型的消息。

**5，MessageProducer** **接口（消息生产者）**

由会话创建的对象，用于发送消息到目标。用户可以创建某个目标的发送者，也可以创建一个通用的发送者，在发送消息时指定目标。

**6，Message** **接口（消息）**

是在消费者和生产者之间传送的对象，也就是说从一个应用程序创送到另一个应用程序。一个消息有三个主要部分：

消息头（必须）：包含用于识别和为消息寻找路由的操作设置。

一组消息属性（可选）：包含额外的属性，支持其他提供者和用户的兼容。可以创建定制的字段和过滤器（消息选择器）。

一个消息体（可选）：允许用户创建五种类型的消息（文本消息，映射消息，字节消息，流消息和对象消息）。

消息接口非常灵活，并提供了许多方式来定制消息的内容。

**7，Session** **接口（会话）**

表示一个单线程的上下文，用于发送和接收消息。由于会话是单线程的，所以消息是连续的，就是说消息是按照发送的顺序一个一个接收的。会话的好处是它支持事务。如果用户选择了事务支持，会话上下文将保存一组消息，直到事务被提交才发送这些消息。在提交事务之前，用户可以使用回滚操作取消这些消息。一个会话允许用户创建消息生产者来发送消息，创建消息消费者来接收消息。

对比JDBC

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.03893326231697481.png)

# 05【掌握】ActiveMQ点对点【队列】模式

## 1，创建项目加入maven依赖  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.737890193119704.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9461965016993991.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14707318275832676.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5930315190351884.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5208617356752047.png)

##  2，加入依赖

```java
<!--activemq需要的jar包不是使用最新版本的。有BUG -->
<dependencies>
    <dependency>
        <groupId>org.apache.activemq</groupId>
        <artifactId>activemq-all</artifactId>
        <version>5.15.12</version>
    </dependency>
    <!--下面是log4等通用配置 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.25</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.16.18</version>
    </dependency>
</dependencies>
```

## 3，创建生产者发送消息

第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。

第二步：使用ConnectionFactory对象创建一个Connection对象。

第三步：开启连接，调用Connection对象的start方法。

第四步：使用Connection对象创建一个Session对象。

第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Queue对象。

第六步：使用Session对象创建一个Producer对象。

第七步：创建一个Message对象，创建一个TextMessage对象。

第八步：使用Producer对象发送消息。

第九步：关闭资源。

```java
package com.xingen.hello;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

/**
 * @Description :消息生产者
 * @Author : 辛根
 * @Date : 2020/4/6 13:29
 */
public class TestMessageProducer {

    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String QUEUE_NAME = "queue-test";


    public static void main(String[] args) throws JMSException {
        //    第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        //    第二步：使用ConnectionFactory对象创建一个Connection对象。
        Connection connection = factory.createConnection();
        //    第三步：开启连接，调用Connection对象的start方法。
        connection.start();
        //    第四步：使用Connection对象创建一个Session对象。
        //第一个参数：是否开启事务。true：开启事务，第二个参数忽略。
        //第二个参数：当第一个参数为false时，才有意义。消息的应答模式。1、自动应答2、手动应答。一般是自动应答。
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        //    第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Queue对象。
        Queue queue = session.createQueue(QUEUE_NAME);
        //    第六步：使用Session对象创建一个Producer对象。
        MessageProducer producer = session.createProducer(queue);
        //    第七步：创建一个Message对象，创建一个TextMessage对象。
        TextMessage textMessage = session.createTextMessage("我是一条测试消息");
        //    第八步：使用Producer对象发送消息。
        producer.send(textMessage);
        //    第九步：关闭资源。
        producer.close();
        session.close();
        connection.close();
        System.out.println("消费发送成功");
    }
}
```

##  4，发送成功这后查询看

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab1958134-822c-48af-852d-e80900197ca3.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae92a16a4-8041-4f85-a13f-7fd565fa3ca8.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa27f42c6-12da-4819-952a-cfbac66c930c.png)



## 5，消息消费之同步消费

第一步：创建一个连接工厂

第二步：创建一个连接

第三步：打开连接

第四步：创建会话

第五步：创建目的地

第六步：创建消费者

第七步：接收消息

第八步：关闭资源

```java
package com.xingen.hello;

import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

/**
 * @Description :同步消费
 * @Author : 辛根
 * @Date : 2020/4/6 13:50
 */
public class TestMessageSyncConsumer {

    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String QUEUE_NAME = "queue-test";

    public static void main(String[] args) throws JMSException {
        // 第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        // 第二步：使用ConnectionFactory对象创建一个Connection对象。
        Connection connection = factory.createConnection();
        // 第三步：开启连接，调用Connection对象的start方法。
        connection.start();
        // 第四步：使用Connection对象创建一个Session对象。
        //第一个参数：是否开启事务。true：开启事务，第二个参数忽略。
        //第二个参数：当第一个参数为false时，才有意义。消息的应答模式。1、自动应答2、手动应答。一般是自动应答。
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        // 第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Queue对象。
        Queue queue = session.createQueue(QUEUE_NAME);
        // 第六步：使用Session对象创建一个MessageConsumer对象。
        MessageConsumer consumer = session.createConsumer(queue);
        // 第七步：使用consumer接收消息
        /**
         * receive的说明默认没参数是一直等待
         * receive(long time)   time代表阻塞时长，时间一过，不等了
         */
        TextMessage message = (TextMessage) consumer.receive(2000); //因为前后发送的是TextMesssage
        // 第八步：输出消息
        System.out.println(message.getText());
        // 第九步：关闭资源。
        consumer.close();
        session.close();
        connection.close();
        System.out.println("消息消费成功");
    }
}
```

##  6，消息消费之同步消费\[循环消费\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab45df350-8be0-4a66-96e0-dcd50d9e205e.jpg)

## 7，receive()和receive(long time)的说明  

> receive()一直阻塞

> receive(10000L)10秒没收到消息就放弃

## 8，异步消费者【推荐】

```java
package com.xingen.hello;

import lombok.SneakyThrows;
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;
import java.io.IOException;

/**
 * @Description :异步消费
 * @Author : 辛根
 * @Date : 2020/4/6 14:02
 */
public class TestMessageASyncConsumer {
    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String QUEUE_NAME = "queue-test";

    public static void main(String[] args) throws JMSException, IOException {
        // 第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        // 第二步：使用ConnectionFactory对象创建一个Connection对象。
        Connection connection = factory.createConnection();
        // 第三步：开启连接，调用Connection对象的start方法。
        connection.start();
        // 第四步：使用Connection对象创建一个Session对象。
        //第一个参数：是否开启事务。true：开启事务，第二个参数忽略。
        //第二个参数：当第一个参数为false时，才有意义。消息的应答模式。1、自动应答2、手动应答。一般是自动应答。
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        // 第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Queue对象。
        Queue queue = session.createQueue(QUEUE_NAME);
        // 第六步：使用Session对象创建一个MessageConsumer对象。
        MessageConsumer consumer = session.createConsumer(queue);
        // 第七步：使用consumer接收消息
        consumer.setMessageListener(new MessageListener() {
            @SneakyThrows
            @Override
            public void onMessage(Message message) {
                if(message instanceof  TextMessage){
                    TextMessage textMessage= (TextMessage) message;
                    System.out.println("接收到消息:"+textMessage.getText());
                }
            }
        });
        System.out.println("消息监听中:-----");
        System.in.read();

        // 第九步：关闭资源。
        consumer.close();
        session.close();
        connection.close();
        System.out.println("消息消费成功");
    }
}
```

###  8.1，MessageListener接口说明

一个消费的监听器，当有消息到达时会回调里面的onMessage的方法

在测试的时候不能让应用程序结束 所以在加System.in.read();

## 9，总结特点

1，每一个消息只能有一个消费者，类似1对1的关系。好比个人快递自己领取自己的

2\.  消息的生产者和消费者之间没有时间上的相关性。无论消费者在生产者发送消息的时候是否处于运行状态，消费者都可以提取消息，好比我们发短息，发送者发送后不见得接收者会立即接收  如关机

3，消息被消费后队列中不会再存储，所以消费者不会消费到已经被消费掉的消息

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.23433717252931135.png)

# 06【问题】消费者的三大消费情况

1，消费情况1  

先生产，只启用1号消费者

问题：1号消费者能消费到消息吗?

答案：可以

## 2，消费情况2

先生产，先启动1号消费者再启动2号消费者。

问题：2号消费者还能消费消息吗？

答案： 不能，因为一个消息只能被一个消费者消费  点对点的情况

## 3，消费情况3

先启动2个消费者，再生产10条消息

问题：消费情况如何

答案：? 【做实验验证】

      A：2个消费者者有10条

      B：先到先得，10条全给一个

      C：一人一半  **依次循环**

# 07【掌握】ActiveMQ发布/订阅模式

## 1，创建生成者Producer

第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。

第二步：使用ConnectionFactory对象创建一个Connection对象。

第三步：开启连接，调用Connection对象的start方法。

第四步：使用Connection对象创建一个Session对象。

第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Topic对象。

第六步：使用Session对象创建一个Producer对象。

第七步：创建一个Message对象，创建一个TextMessage对象。

第八步：使用Producer对象发送消息。

第九步：关闭资源。

```java
package com.xingen.topic;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQTextMessage;

import javax.jms.*;

/**
 * @Description :主题的生产者
 * @Author : 辛根
 * @Date : 2020/4/6 14:23
 */
public class TestMessageTopicProducer {

    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String TOPIC_NAME = "topic-test";

    public static void main(String[] args) throws JMSException {
//        第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
//        第二步：使用ConnectionFactory对象创建一个Connection对象。
        Connection connection = factory.createConnection();
//        第三步：开启连接，调用Connection对象的start方法。
        connection.start();
//        第四步：使用Connection对象创建一个Session对象。
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
//        第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Topic对象。
        Topic topic = session.createTopic(TOPIC_NAME);
//        第六步：使用Session对象创建一个Producer对象。
        MessageProducer producer = session.createProducer(topic);
//        第七步：创建一个Message对象，创建一个TextMessage对象。
//        TextMessage textMessage = session.createTextMessage("我数一个主题消息");
        ActiveMQTextMessage textMessage1 = new ActiveMQTextMessage();
        textMessage1.setText("我是一个new出来的主题消息");
//        第八步：使用Producer对象发送消息。
        producer.send(textMessage1);
//        第九步：关闭资源。
        System.out.println("主题消息发送成功！");
        connection.close();
        session.close();
        producer.close();
    }
}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9457584113663964.png)

## 2，创建消费者 Consumer

第一步：创建一个ConnectionFactory对象。

第二步：从ConnectionFactory对象中获得一个Connection对象。

第三步：开启连接。调用Connection对象的start方法。

第四步：使用Connection对象创建一个Session对象。

第五步：使用Session对象创建一个Destination对象。和发送端保持一致topic，并且话题的名称一致。

第六步：使用Session对象创建一个Consumer对象。

第七步：接收消息。

第八步：打印消息。

第九步：关闭资源

```java
package com.xingen.topic;

import lombok.SneakyThrows;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQTextMessage;

import javax.jms.*;

/**
 * @Description :主题的消费者
 * @Author : 辛根
 * @Date : 2020/4/6 14:33
 */
public class TestMessageTopicConsumer {

    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String TOPIC_NAME = "topic-test";


    public static void main(String[] args) throws Exception {

        // 第一步：创建ConnectionFactory对象，需要指定服务端ip及端口号。
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        // 第二步：使用ConnectionFactory对象创建一个Connection对象。
        Connection connection = factory.createConnection();
        // 第三步：开启连接，调用Connection对象的start方法。
        connection.start();
        // 第四步：使用Connection对象创建一个Session对象。
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        // 第五步：使用Session对象创建一个Destination对象（topic、queue），此处创建一个Topic对象。
        Topic topic = session.createTopic(TOPIC_NAME);
        // 第六步：使用Session对象创建一个Producer对象。
        MessageConsumer consumer = session.createConsumer(topic);
        // 第七步：监听消息
        consumer.setMessageListener(new MessageListener() {
            @SneakyThrows
            @Override
            public void onMessage(Message message) {
                ActiveMQTextMessage textMessage = (ActiveMQTextMessage) message;
                System.out.println("消费者接收到消息:" + textMessage.getText());
            }
        });
        // 第八步：关闭资源。
        System.out.println("主题消费者启动成功");
        System.in.read();
        consumer.close();
        session.close();
        connection.close();
    }
}
```

## 3，注意点

先启动消费者再启动生产者，要不然发送的废消息

如你不关注订阅号就接收不到消息

## 4，点对点和发布订阅模式的比较

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.009378233555137358.png)

# 08【掌握】ActiveMQ发布/订阅模式—持久

## 1、启动一个消费者、查看

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5340867037131342.png)

## 2、为什么先生产再消费接收不到

默认情况下。消费者是一个活动的非持久的订阅者

当我上线之后，只能接收我上线之后消息

## 3、如何设置持久的订阅者

```java
package com.xingen.topic;

import lombok.SneakyThrows;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQTextMessage;

import javax.jms.*;

/**
 * @Description :主题的持久消费者
 * @Author : 辛根
 * @Date : 2020/4/6 14:42
 */
public class TestMessageTopicDurableConsumer {
    private static final String BROKER_URL = "tcp://129.211.39.189:61616";
    private static final String TOPIC_NAME = "topic-test";


    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        Connection connection = factory.createConnection();
        connection.setClientID("zhangsan");//设置订阅者的名字
        connection.start();
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        Topic topic = session.createTopic(TOPIC_NAME);

        TopicSubscriber subscriber = session.createDurableSubscriber(topic, "---");
        subscriber.setMessageListener(new MessageListener() {
            @SneakyThrows
            @Override
            public void onMessage(Message message) {
                ActiveMQTextMessage textMessage = (ActiveMQTextMessage) message;
                System.out.println("消费者接收到消息:" + textMessage.getText());
            }
        });
        System.out.println("主题消费者启动成功");
        System.in.read();
        subscriber.close();
        session.close();
        connection.close();
    }
}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9262975164951989.png)

停止程序

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5803820781762107.png)

## 4、测试逻辑

1， 先启动消费者----关注订阅号

2， 再下线

3， 再生产

4， 消费者再上线

# 09【理解】JMS的深入理解

## 1，JMS是什么

JMS的全称是Java Message Service，即Java消息服务。用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。

它是JAVAEE技术体系中的一个消息传递服务中间件，而MQ是JMS的落地得产品

以下是JAVAEE技术体系

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3613461730404295.png)

## 2 ，什么是消息服务【回顾】

Java消息服务指的是两个应用程序之间进行异步通信的API，它为标准消息协议和消息服务提供了一组通用接口，包括创建，发送，读取消息等等，用于支持JAVA应用程序开发。在JavaEE中，当两个应用程序使用JMS进行通信时，它们之间并不是直接相连的，而是通过一个共同的消息收发服务组件关联起来以达到解耦，异步，削峰的效果

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.287780237305839.png)

---

## 3 ，JMS相关落地的产品及比较

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.15998453861818018.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.49372631079702295.png)

## 4 ，JMS组成的特点

1，JMS Provier 作用：实现JMS接口规范的消息中间件，也就是我们学习的MQ

2，JMS Producer 作用：消息生产者，创建与发送JMS消息的客户端应用

3，JMS  Consumer 作用：消息的消费者，接受与处理JMS消息的客户端应用

4，JMS Messager 作用：消息的载体

---

## 5 ，JMS Messager详解

### 5.1，消息头

**JMSDesination**:消息发送的目地地，主是指Queue和Topic

**JMSDeliveyMode**:消息的持久模式和非持久模式。

一条持久性的消息应该被传送 “仅仅一次”，这就意味着如果JMS提供者出现故障，该消息并不会丢失，它会在服务器恢复之后再次传递。

一条非持久的消息：最多会传送一次，这意味着服务器如果出现故障，该消息将永远丢失

**JMSExpiration**:消息的过期设置，默认为永不过期

        消息过期时间，等于Destination的send方法中的timeToLive值加上发送时间点的GMT时间值

        如果timeToLive的值等于0，则消永不过期。

        如果发送后，在消息过期时间之后消息还没有被发送到目的地，则该消息被清除

**JMSPriority**:消息优先级，从0-9十个级别，0-4是普通消息，5-9是加急消息。

        JMS不要求MQ严格按照这十个优先级发送消息，但必须保正加急消息要先于普通消息到达。默认为4级

**JMSMessageID**:        

        唯一识别每个消息的表示，由MQ产生

### 5.2，消息体：消息的载体

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6177528565529371.png)

　　· StreamMessage -- Java原始值的数据流

　　· MapMessage--一套名称-值对

　　· TextMessage--一个字符串对象

　　· ObjectMessage--一个序列化的 Java对象  需要放行所有包的安全检查  

```java
 ActiveMQConnectionFactory factory=new ActiveMQConnectionFactory(brokerURL);
 factory.setTrustAllPackages(true);//放行所有包的安全检查
```

　　· BytesMessage--一个字节的数据流

注意：发送和接收消息必须是一一对应的

### 5.3，消息属性

消息属性是一种加强型的API

如果需要使用消息头发外的值，那么可以使用消息属性

用于识别、去重、重点标注等等操作

它们是属性名属性值对应的形式制定的。可以把属性看着消息头的扩展，属性指定一些消息头没有包括的附加信息，比如可以在属性里指定消息选择器

消息的属性就像可以分配给一个消息的附加消息头一样，它们允许开发者添加有关消息的不透明的附加信息，它们还用于暴露消息选择器在消息过滤时使用的数据。

```java
TextMessage message=session.createTextMessage();
message.setText(text);
message.setStringProperty("username","小明");//自定义属性
```

# 10【掌握】消息可靠性及持久化

## 1，参数配置说明

### 1.1，持久设置

```java
producer.setDeliveryMode(DeliveryMode.PERSISTENT);
```

### 1.2，非持久设置

```java
producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
```

### 1.3，其它说明

**默认为持久消息**

## 2，Queue测试逻辑

1，不设置，发送消息   重启MQ 查看消息是否存在

       存在  说明默认为持久

2，设置持久，发送消息   重启MQ 查看消息是否存在

       |--存在    

3，设置不持久，发送消息   重启MQ 查看消息是否存在

              |--不存在

### 2.2 Queue测试结论

        持久化消息，这个队列的默认传递样式，此模式保证这些消息只被传送一次和成功使用一次。对于这些消息，可靠性是优先考虑的因素。可靠性是另一个重要方面是确保持久性消息传递到目标后，消息服务在向消费者传递它们之前不会丢失这些消息。

---

## 3，Topic测试逻辑【先启动订阅再生产】默认是非持久

1，不设置，发送消息   重启MQ 查看消息是否存在

       |--存在   但是没有意义

2，设置持久，发送消息   重启MQ 查看消息是否存在

       |--存在  但但没有意义

3，设置不持久，发送消息   重启MQ 查看消息是否存在

       |--不存在

### 3.1，其它说明

非持久的topic没有意义，因为发布订阅模式是先启动订阅再启动生产，消息已经被消费了。如果先启动生产者后启动订阅者，消息会被当作废消息

# 11【掌握】生产者消费者事务和签收说明

## 1，ActiveMQ事务

### 1.1，生产者提交时的事务设置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.42905365593011924.png)

#### 1.1.1，false

只要执行send就进入到队列中，没有事务，那么第二个参数签收就有效

#### 1.1.2，true

先执行send再执行commit,消息才被真正的提交到队列中

#### 1.1.3，何时使用

当消息需要批量发送，要确保所要消息全部发送成功才会全部入队

### 1.2，消费者消费事务的设置

#### 1.2.1，false

消费者接收到消息之后直接消费完成，队列中不再有未消费的消息

#### 1.2.2，true

消息者接收到消息之后消费完成。队列中的消费没有被标记为消费，再次启动消费者还可以接收到消息

### 1.3，总结

事务偏生产者，签收偏消费者，消费者那边不用开户事务，否则出现重复消费

## 2，ActiveMQ签收【Acknowledge】

### 2.1，非事务模式下签收

生产者 签收设置为自动，消费者 签收设置为自动，正常

生产者 签收设置为自动，消费者 签收设置为手动，会出重复消费   【**消费者使用手动签收可以解决message.acknowledge();//签收】**

生产者 签收设置为手动，消费者 签收设置为自动，正常

### 2.2，有事务模式下签收

生产者 签收设置为自动，消费者 签收设置为自动，已提交，正常

生产者 签收设置为自动，消费者 签收设置为自动，未提交，会出现重复消费

生产者 签收设置为自动，消费者 签收设置为手动，未提交，已ACK 会出重复消费

生产者 签收设置为自动，消费者 签收设置为手动，已提交，未正常

生产者 签收设置为手动，消费者 签收设置为自动，已提交，正常

生产者 签收设置为手动，消费者 签收设置为自动，未提交，会出现重复消费

生产者 签收设置为手动，消费者 签收设置为自动，未提交，未ACK 会出重复消费

生产者 签收设置为手动，消费者 签收设置为自动，未提交，已ACK 会出重复消费

生产者 签收设置为手动，消费者 签收设置为手动，已提交，未ACK   正常

生产者 签收设置为手动，消费者 签收设置为手动，已提交，已ACK   正常

## 3，ActiveMQ事务签收总结

事务偏向于消息生产方

       |--如果生产方开启事务，发完消息之后未提交事务，那么消息不会进入队列

签收偏向于消息的消费方

       |--如果消费方未开启事务，设置签收模式为手动，那么必须ack

       |--如果消费方开启事务，设置签收为自动，也要提交事务

       |--如果消费方开启事务，设置签收不手动，可以不用ACK，但是必须提交事务

# 12【掌握】ActiveMQ配置文件和Broker

## 1，ActiveMQ多配置文件启动  

* Jetty.xml  这个是activemq的web模块的修改；  
* activemq.xml  

### 1.1，在哪里

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.991077333798237.png)

### 1.2，copy配置文件

```java
cp activemq.xml activemq2.xml
```

### 1.3，使用activemq2.xml启动【了解】

```java
./bin/activemq start xbean:file:conf/activemq2.xml
```

## 2、内嵌的broker

### 2.1，是什么

相当于一个ActiveMQ服务器实例

就是实现了用嵌入形式启动ActiveMQ把MQ嵌入到Java代码中，以例随时启动随时启动

在用的时候再去启动这样能节省资源，也保存证了可靠性。

### 2.2，代码

```java
public class EmbedBroker {
    public static void main(String[] args) throws Exception {
        BrokerService brokerService = new BrokerService();
        brokerService.setUseJmx(true);
        brokerService.addConnector("tcp://localhost:61616");
        brokerService.start();
    }
}
```

引入jackson

```java
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.10.1</version>
</dependency>
```

### 2.3，使用之前的代码连接localhost测试

# 13【掌握】ActiveMQ整合Spring

## 1，准备工作

### 1.1 创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3078438821425678.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3842373127683363.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1496496845941318.png)

### 1.2修改pom加入依赖

```xml
<properties>
    <spring.version>4.3.24.RELEASE</spring.version>
    <activemq.version>5.15.12</activemq.version>
</properties>

<dependencies>
    <!--activemq需要的jar包 -->
    <dependency>
        <groupId>org.apache.activemq</groupId>
        <artifactId>activemq-all</artifactId>
        <version>${activemq.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.activemq</groupId>
        <artifactId>activemq-pool</artifactId>
        <version>${activemq.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jms</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.version}</version>
    </dependency>
</dependencies>
```

##  2，Queue的整合

### 2.1，步骤

第一步：初始化一个spring容器

第二步：从容器中获得JMSTemplate对象。

第三步：从容器中获得一个Destination对象

第四步：使用JMSTemplate对象发送消息，需要知道Destination

###  2.2，创建application-queue.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <!--创建一个连接工厂-->
    <bean id="jmsFactory"
          class="org.apache.activemq.pool.PooledConnectionFactory"
          destroy-method="stop">
        <property name="connectionFactory">
            <bean class="org.apache.activemq.ActiveMQConnectionFactory">
            <property name="brokerURL"
                      value="tcp://www.leige.tech:61616" />
        </bean>
        </property>
        <property name="maxConnections" value="100"></property>
    </bean>

    <!--声明消费类型对象 队列或主题-->
    <bean id="destinationQueue"
          class="org.apache.activemq.command.ActiveMQQueue">
        <!--因为ActiveMQQueue里面队列名字的get set 方法，所以只能使用构造方法注入队列的名字-->
        <constructor-arg index="0" value="spring-active-queue" />
    </bean>



    <!-- Spring的JMS模版工具 -->
    <bean id="jmsTemplate"
          class="org.springframework.jms.core.JmsTemplate">
        <property name="connectionFactory" ref="jmsFactory" />
        <!--设置默认的Destination-->
        <property name="defaultDestination" ref="destinationQueue" />
        <!-- 消息转化器 -->
        <property name="messageConverter">
            <bean class="org.springframework.jms.support.converter.SimpleMessageConverter" />
        </property>
    </bean>

</beans>
```

###  2.3，测试发送

```java
package com.xingen.queue;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;

/**
 * @Description : 生产者
 * @Author : 辛根
 * @Date : 2020/4/7 15:26
 */
public class TestQueueProducer {
    public static void main(String[] args) {
        // 加载IOC容器
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:application-queue.xml");
        context.start();
        JmsTemplate jms = context.getBean(JmsTemplate.class);

        // 设置默认的消息发送目的地，用于覆盖xml里面的配置(destinationQueue)
        //jmsTemplate.setDefaultDestination(new ActiveMQQueue("activemq-queme-spring"));

        // 消息发送
        jms.send(new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                // 创建消息并发送
                TextMessage textMessage = session.createTextMessage("spring—-hell");
                System.out.println("---------" + Thread.currentThread().getName());
                return textMessage;
            }
        });
        System.out.println("=======" + Thread.currentThread().getName());
        System.out.println("消息发送成功");
        System.out.println(jms);
    }
}

```

###  2.3，测试接收

```java
package com.xingen.queue;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.JMSException;
import javax.jms.TextMessage;

/**
 * @Description :消费者
 * @Author : 辛根
 * @Date : 2020/4/7 15:39
 */
public class TestQuenConsumer {
    public static void main(String[] args) throws JMSException {
        //加载IOC窗口
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:application-queue.xml");
        ((ClassPathXmlApplicationContext) context).start();

        JmsTemplate jmsTemplate = context.getBean(JmsTemplate.class);
        TextMessage receive = (TextMessage) jmsTemplate.receive();
        System.out.println(receive.getText());

        System.out.println("消费成功");
        System.out.println(jmsTemplate);
    }
}

```

## 3，Topic的整合

### 3.1，创建application-topic.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--创建一个连接工厂-->
    <bean id="jmsFactory"
          class="org.apache.activemq.pool.PooledConnectionFactory"
          destroy-method="stop">
        <property name="connectionFactory">
            <bean class="org.apache.activemq.ActiveMQConnectionFactory">
                <property name="brokerURL"
                          value="tcp://www.leige.tech:61616"/>
            </bean>
        </property>
        <property name="maxConnections" value="100"></property>
    </bean>

    <!--声明消费类型对象 队列或主题-->
    <bean id="destinationTopic"
          class="org.apache.activemq.command.ActiveMQTopic">
        <!--因为ActiveMQQueue里面队列名字的get set 方法，所以只能使用构造方法注入队列的名字-->
        <constructor-arg index="0" value="spring-active-topic"/>
    </bean>


    <!-- Spring的JMS模版工具 -->
    <bean id="jmsTemplate"
          class="org.springframework.jms.core.JmsTemplate">
        <property name="connectionFactory" ref="jmsFactory"/>
        <!--设置默认的Destination-->
        <property name="defaultDestination" ref="destinationTopic"/>
        <!-- 消息转化器 -->
        <property name="messageConverter">
            <bean class="org.springframework.jms.support.converter.SimpleMessageConverter"/>
        </property>
    </bean>
</beans>
```

### 3.2，测试发送

```java
package com.xingen.topic;

import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import javax.jms.TextMessage;

/**
 * @Description : 生产者
 * @Author : 辛根
 * @Date : 2020/4/7 15:26
 */
public class TestTopicProducer {
    public static void main(String[] args) {
        // 加载IOC容器
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("classpath:application-topic.xml");
        context.start();
        JmsTemplate jms = context.getBean(JmsTemplate.class);

        // 设置默认的消息发送目的地，用于覆盖xml里面的配置
        //jmsTemplate.setDefaultDestination(new ActiveMQQueue("activemq-queme-spring"));

        // 消息发送
        jms.send(new MessageCreator() {
            public Message createMessage(Session session) throws JMSException {
                // 创建消息并发送
                TextMessage textMessage = session.createTextMessage("spring—-hell");
                System.out.println("---------" + Thread.currentThread().getName());
                return textMessage;
            }
        });
        System.out.println("=======" + Thread.currentThread().getName());
        System.out.println("消息发送成功");
        System.out.println(jms);
    }
}
```

###  3.2，测试接收

```java
package com.xingen.topic;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jms.core.JmsTemplate;

import javax.jms.JMSException;
import javax.jms.TextMessage;

/**
 * @Description :消费者
 * @Author : 辛根
 * @Date : 2020/4/7 15:39
 */
public class TestTopicConsumer {
    public static void main(String[] args) throws JMSException {
        //加载IOC窗口
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:application-topic.xml");
        ((ClassPathXmlApplicationContext) context).start();

        JmsTemplate jmsTemplate = context.getBean(JmsTemplate.class);
        TextMessage receive = (TextMessage) jmsTemplate.receive();
        System.out.println(receive.getText());

        System.out.println("消费成功");
        System.out.println(jmsTemplate);
    }
}
```

 注意点：先启动接收（消费者）再发送（生产者）

## 1， JMSTemplate   API详解

### 1.1，接收消息的API

```java
jmsTemplate.receive();//接收一次消息。阻塞状态 和consumer.receive()方法一样
jmsTemplate.receive("spring-queue");//指从哪个队列或主题接收一次消息。阻塞状态
jmsTemplate.receive(new ActiveMQQueue("spring-queue"));//指从哪个队列或主题接收一次消息。阻塞状态


Object convert = jmsTemplate.receiveAndConvert();//接收并转化消费阻塞状态
jmsTemplate.receiveAndConvert("spring-queue");//指从哪个队列或主题接收一次消息。阻塞状态
jmsTemplate.receiveAndConvert(new ActiveMQQueue("spring-queue"));//指从哪个队列或主题接收一次消息。阻塞状态
```

### 1.2，发送消息的API

```java
//发送消息
jmsTemplate.send(new MessageCreator() {
    @Override
    public Message createMessage(Session session) throws JMSException {
        //创建消费并发送
        TextMessage textMessage = session.createTextMessage("hello-spring-topic");
        System.out.println("-----"+Thread.currentThread().getName());
        return textMessage;
    }
});

// 发送消息到某个队列或者主题
jmsTemplate.send("mq-spring-queue",new MessageCreator() {
    @Override
    public Message createMessage(Session session) throws JMSException {
        return null;
    }
});

// 发送并转换
jmsTemplate.send(new ActiveMQQueue("mq-spring-queue"),new MessageCreator() {
    @Override
    public Message createMessage(Session session) throws JMSException {
        return null;
    }
});
// 以上的三种要使用jmsTemplate.reveice();去收消息

// jmsTemplate.convertAndSend(new User()); 要使用jsmTmelate.receiveAndConvert();
```

# 14【掌握】ActiveMQ整合Springboot

## 1、Boot整合ActiveMQ之队列

### 1.1创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac0815d9b-f3d1-46c7-a4cc-4e197945aaec.png)

###  1.2修改yml

```java
server:
  port: 8081

#设置activemq
spring:
  activemq:
    broker-url: tcp://129.211.39.189:61616
    user: admin
    password: admin
  jms:
    # 默认是false。false代表队列、true代表主题
    pub-sub-domain: false

boot-queue: boot-queue
```

###  1.3创建配置类

```java
package com.xingen.conf;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jms.Queue;

/**
 * @Description :配置类
 * @Author : 辛根
 * @Date : 2020/4/7 16:09
 */
@Configuration
@ConditionalOnClass(value = ActiveMQQueue.class)
public class ActiveMQConfig {

    // 指定队列的名字
    @Value("${boot-queue}")
    private String queueName;

    @Bean
    public Queue queue() {
        return new ActiveMQQueue(queueName);
    }
}
```

###  **1.4修改启动类**

启动类上添加注释：@EnableJms

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa457f8d4-8c14-4d9b-8a41-ba8009153c90.jpg)

**1.5发送**  

```java
package com.xingen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.jms.Queue;

/**
 * @Description : 发送
 * @Author : 辛根
 * @Date : 2020/4/7 16:14
 */
@RestController
@RequestMapping("msg")
public class MsgController {

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    @Autowired
    private Queue queue;

    /**
     * @param msg
     * @ClassName: MsgController
     * @Description: 发送
     * @Return: java.lang.String
     * @Author: 辛根 2020/4/7 16:21
     */
    @RequestMapping("send")
    public String sent(String msg) {
        jmsMessagingTemplate.convertAndSend(queue, msg);
        return "发送成功";
    }
}
```

### **1.5接收**

```java
package com.xingen.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 * @Description : 接收
 * @Author : 辛根
 * @Date : 2020/4/7 16:22
 */
@Component
public class Receiver {

    @JmsListener(destination = "${boot-queue}")
    public void receive(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功");
    }
}
```

添加：为什么是发送消息的时候要注入使用JmsMessagingTemplate  

```Plain Text
1、找到ActiveMQAutoConfiguration 
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradc862f0d-2134-4b03-92d1-95397a08836f.jpg)

2、JmsAutoConfiguration  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora500c0de9-2788-48a3-a441-1db5f257e5d1.jpg)

## 2、Boot整合ActiveMQ之主题

### 2.1创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image02479026a53-7a0f-4cfb-8b22-e4344d866ecd.jpg)

### 2.2修改yml

```java
server:
  port: 8082

#设置activemq
spring:
  activemq:
    broker-url: tcp://129.211.39.189:61616
    user: admin
    password: admin
  jms:
    # 默认是false。false代表队列、true代表主题
    pub-sub-domain: true

boot-topic: boot-topic
```

###  2.3创建配置类

```java
package com.xingen.conf;

import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @Description :配置类
 * @Author : 辛根
 * @Date : 2020/4/7 16:09
 */
@Configuration
@ConditionalOnClass(value = ActiveMQTopic.class)
public class ActiveMQConfig {

    // 指定队列的名字
    @Value("${boot-topic}")
    private String topicName;

    @Bean
    public Topic queue() {
        return new ActiveMQTopic(topicName);
    }
}
```

### 2.4修改启动类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab6a4d69e-acfd-4dc3-8751-d7617936d054.jpg)

### 2.5发送 

```java
package com.xingen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @Description : 发送
 * @Author : 辛根
 * @Date : 2020/4/7 16:14
 */
@RestController
@RequestMapping("msg")
public class MsgController {

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    @Autowired
    private Topic topic;

    /**
     * @param msg
     * @ClassName: MsgController
     * @Description: 发送
     * @Return: java.lang.String
     * @Author: 辛根 2020/4/7 16:21
     */
    @RequestMapping("send")
    public String sent(String msg) {
        jmsMessagingTemplate.convertAndSend(topic, msg);
        return "发送成功";
    }
}
```

### 2.6接收

```java
package com.xingen.conf;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 * @Description : 接收
 * @Author : 辛根
 * @Date : 2020/4/7 16:22
 */
@Component
public class Receiver {

    @JmsListener(destination = "${boot-topic}")
    public void receive1(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功1");
    }

    @JmsListener(destination = "${boot-topic}")
    public void receive2(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功2");
    }
}
```

## 3.Boot整合ActiveMQ之队列和主题

### 3.1说明

上面的两种整合方式都只能要么使用队列，要么使用主题

那么不能能两个一起上？

肯定是可以的

### 3.2创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image040c3dfeaea-3a0f-4bc5-9a46-500ab21573f4.jpg)

### ** **3.3修改yml

```java
server:
  port: 8083

#设置activemq
spring:
  activemq:
    broker-url: tcp://129.211.39.189:61616
    user: admin
    password: admin

boot-queue: boot-queue
boot-topic: boot-topic
```

###  3.4创建配置类

```java
package com.xingen.conf;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.apache.activemq.command.ActiveMQTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;

import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @Description :配置类
 * @Author : 辛根
 * @Date : 2020/4/7 16:09
 */
@Configuration
@ConditionalOnClass(value = ActiveMQTopic.class)
public class ActiveMQConfig {

    @Value("${boot-topic}")
    private String topicName;

    @Value("${boot-queue}")
    private String queueName;

    @Value("${spring.activemq.user}")
    private String username;
    @Value("${spring.activemq.password}")
    private String password;
    @Value("${spring.activemq.broker-url}")
    private String brokerUrl;

    @Bean
    public Topic topic() {
        return new ActiveMQTopic(topicName);
    }

    @Bean
    public Queue queue() {
        return new ActiveMQQueue(queueName);
    }

    @Bean
    @Primary
    public ActiveMQConnectionFactory activeMQConnectionFactory() {
        return new ActiveMQConnectionFactory(username, password, brokerUrl);
    }

    //处理队列的监听工厂
    @Bean
    public JmsListenerContainerFactory<?> jmsListenerContainerFactoryQueue(ActiveMQConnectionFactory factory) {
        DefaultJmsListenerContainerFactory defaultJmsListenerContainerFactory = new DefaultJmsListenerContainerFactory();
        defaultJmsListenerContainerFactory.setConnectionFactory(factory);
        defaultJmsListenerContainerFactory.setPubSubDomain(false);//代表队列
        return defaultJmsListenerContainerFactory;
    }

    //处理主题的监听工厂
    @Bean
    public JmsListenerContainerFactory<?> jmsListenerContainerFactoryTopic(ActiveMQConnectionFactory factory) {
        DefaultJmsListenerContainerFactory defaultJmsListenerContainerFactory = new DefaultJmsListenerContainerFactory();
        defaultJmsListenerContainerFactory.setConnectionFactory(factory);
        defaultJmsListenerContainerFactory.setPubSubDomain(true);//代表主题
        return defaultJmsListenerContainerFactory;
    }

}
```

### 3.5修改启动类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6ba2459e-4182-437f-bb07-eb5c850eb6c5.jpg)

### 3.6发送

```java
package com.xingen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.jms.Queue;
import javax.jms.Topic;

/**
 * @Description : 发送
 * @Author : 辛根
 * @Date : 2020/4/7 16:14
 */
@RestController
@RequestMapping("msg")
public class MsgController {

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    @Autowired
    private Topic topic;

    @Autowired
    private Queue queue;

    /**
     * @param msg
     * @ClassName: MsgController
     * @Description: 发送topic
     * @Return: java.lang.String
     * @Author: 辛根 2020/4/7 17:08
     */
    @RequestMapping("sendTopic")
    public String sendTopic(String msg) {
        jmsMessagingTemplate.convertAndSend(topic, msg);
        return "发送成功topic";
    }

    /**
     * @param msg
     * @ClassName: MsgController
     * @Description: 发送queue
     * @Return: java.lang.String
     * @Author: 辛根 2020/4/7 17:08
     */
    @RequestMapping("sendQueue")
    public String sendQueue(String msg) {
        jmsMessagingTemplate.convertAndSend(queue, msg);
        return "发送成功queue";
    }

}
```

### 3.7接收

```java
package com.xingen.conf;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 * @Description : 接收
 * @Author : 辛根
 * @Date : 2020/4/7 16:22
 */
@Component
public class Receiver {

    @JmsListener(destination = "${boot-queue}", containerFactory = "jmsListenerContainerFactoryQueue")
    public void receive1(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功1-queue");
    }

    @JmsListener(destination = "${boot-queue}", containerFactory = "jmsListenerContainerFactoryQueue")
    public void receive2(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功2-queue");
    }

    @JmsListener(destination = "${boot-topic}", containerFactory = "jmsListenerContainerFactoryTopic")
    public void receive3(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功1-topic");
    }

    @JmsListener(destination = "${boot-topic}", containerFactory = "jmsListenerContainerFactoryTopic")
    public void receive4(Object object) {
        System.out.println(object);
        System.out.println("监听器触发，调用成功2-topic");
    }
}

```

# 15【掌握】ActiveMQ的传输协议

## 1，ActiveMQ的传输协议简介  

ActiveMQ允许客户端使用多种协议来连接，配置Transport Connector的文件在activeMQ安装目录的conf/activemq.xml中的标签之内。官方默认提供的：

```java
<transportConnectors>
    <!-- DOS protection, limit concurrent connections to 1000 and frame size to 100MB -->
    <transportConnector name="openwire" uri="tcp://0.0.0.0:61616?maximumConnections=1000&wireFormat.maxFrameSize=104857600"/>
    <transportConnector name="amqp" uri="amqp://0.0.0.0:5672?maximumConnections=1000&wireFormat.maxFrameSize=104857600"/>
    <transportConnector name="stomp" uri="stomp://0.0.0.0:61613?maximumConnections=1000&wireFormat.maxFrameSize=104857600"/>
    <transportConnector name="mqtt" uri="mqtt://0.0.0.0:1883?maximumConnections=1000&wireFormat.maxFrameSize=104857600"/>
    <transportConnector name="ws" uri="ws://0.0.0.0:61614?maximumConnections=1000&wireFormat.maxFrameSize=104857600"/>
</transportConnectors>
```

ActiveMQ所有URI配置都基于java.net.URI类，该类不允许使用空格。因此，如果正在使用failover:或 static:URI，请不要在','符号周围放置任何空格。

ActiveMQ传输配置选项官网链接：[https://activemq.apache.org/configuring-version-5-transports](https://activemq.apache.org/configuring-version-5-transports)

在更改传输协议之前，必须保证ActiveMQ没有运行！ 

---

## 2，ActiveMQ的传输协议种类

### 2.1，TCP传输（The TCP Transport）

TCP传输允许客户端使用TCP套接字连接到远程ActiveMQ代理。这些配置选项可用于使用JMS客户端的连接URI字符串或在代理的传输连接器URI上调整客户端上的底层TCP传输。

TCP是默认的Broker配置,TCP的Client监听端口61616

在网络传输数据前，必须要序列化数据，消息是通过一个叫wire protocol的来序列化成字节流。默认情况下，ActiveMQ把wire protocol叫做OpenWire,它的目的是促使网络上的效率和数据快速交互。

TCP传输的优点：

　　　　TCP协议传输可靠性高，稳定性强

　　　　高效性：字节流方式传递，效率很高

　　　　有效性、可用性：应用广泛，支持任何平台

关于Transport协议的可配置参数，可以参加官网：[http://activemq.apache.org/configuring-version-5-transports.html](http://activemq.apache.org/configuring-version-5-transports.html)

例子

```java
tcp://localhost:61616?threadName&trace=false&soTimeout=60000
```

### 2.2、NIO传输（The NIO Transport）

NIO Transport与常规TCP传输非常相似。不同之处在于它是使用NIO API实现的，它可以帮助提高性能和可扩展性，不用将Java NIO包与IBM的AIO4J包混淆。NIO仅是服务器端传输选项。尝试在客户端使用它将实例化常规TCP传输。要从TCP切换到NIO，只需更改URI的方案部分。这是在代理的XML配置文件中定义的示例。

```java
<broker>
  ...
  <transportConnectors>
    <transportConnector name="nio" uri="nio://0.0.0.0:61616"/>  
  </<transportConnectors>
  ...
</broker>
```

NIO和TCP协议类似，但NIO更侧重于底层的访问操作，允许开发人员对同一资源可有更多的client调用和服务端有更多的负载。

适合使用NIO协议的场景：

可能有大量的Client去连接到Broker上，一般情况下，大量的Client去连接Broker是被操作系统的线程所限制的。因此，NIO的实现比TCP需要更少的线程去运行，所以建议使用NIO协议

可能对于Broker有一个很迟钝的网络传输，NIO比TCP提供更好的性能。

配置语法

```java
nio://hostname:port?key=value
```

配置选项与TCP传输相同。

注意：原始NIO传输是使用OpenWire协议的tcp传输的替代品。其他网络协议，如AMQP，MQTT，Stomp等也有自己的NIO传输实现。它通常通过在协议前缀中添加“+ nio”后缀来配置，例如

```java
mqtt+nio://localhost:1883
```

所有协议特定配置也应适用于NIO版本的传输。

### 2.3，AUTO传输

从5.13.0开始，ActiveMQ支持通过TCP，SSL，NIO和NIO SSL进行自动有线协议检测。支持OpenWire，STOMP，AMQP和MQTT。有关详细信息，请参阅AUTOTransport Reference。

### 2.4，VM传输

VM传输允许客户端在VM内相互连接，而无需网络通信的开销。使用的连接不是套接字连接，而是使用直接方法调用来启用高性能嵌入式消息传递系统。第一个使用VM连接的客户端将引导嵌入式代理。后续连接将附加相同的代理。一旦关闭了与代理的所有VM连接，嵌入式代理将自动关闭。有关更多信息，请参阅VM传输参考

### 2.5，AMQP传输

从5.8.0开始，ActiveMQ支持AMQP。有关详细信息，请参阅AMQP传输参考。

### 2.6，MQTT传输

从5.6.0开始，ActiveMQ也支持MQTT。它是一种轻量级的发布/订阅消息传输。有关详细信息，请参阅MQTT传输参考。

### 2.7，SSL传输

这允许您使用SSL通过TCP进行通信。有关更多信息，请参阅SSL传输参考

### 2.8，NIO SSL传输

可用性

自5.6起可用

通过NIO实现SSL传输。这允许您将大量SSL客户端连接到单个代理实例。它只是服务器端传输选项

```java
<broker>
  ...
  <transportConnectors>
    <transportConnector name="nio+ssl" uri="nio+ssl://0.0.0.0:61616"/>  
  </<transportConnectors>
  ...
</broker>
```

尝试nio+ssl在客户端使用传输URL将实例化常规SSL传输。

## 3，ActiveMQ的传输协议之NIO

NIO Transport与常规TCP传输非常相似。不同之处在于它是使用NIO API实现的，它可以帮助提高性能和可扩展性，不用将Java NIO包与IBM的AIO4J包混淆。。NIO仅是服务器端传输选项。尝试在客户端使用它将实例化常规TCP传输。要从TCP切换到NIO，只需更改URI的方案部分。这是在代理的XML配置文件中定义的示例。

### 3.1，配置方式

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0026aa44c83-bfdb-4f65-a327-c53dcb9c26ea.png)

### 3.2，是否可以和其它协议共存？

### 3.3，使用之前的代码进行验证

```java
public static final String URL = "nio://192.169.3.100:61618";
public static final String queue_name = "Transport";
```

---

## 4，ActiveMQ的传输协议之NIO加强

以上的设置NIO只能支持openwire协议，那么能不能让基支持其它协议呢

### 4.1，使用auto来解决

使用auto关键字

使用“+”符号来为端口设置多种特性

如果我们即需要某一个端口支持NIO网络io模型，又需要它支持多种协议                

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image004ef637e54-95d5-406f-a1ca-d64c5df86989.png)

# 16【掌握】ActiveMQ消息持久化

1，ActiveMQ消息持久化理论简介  

ActiveMQ的持久化机制包含JDBC，KahaDB、LevelDB

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5079984774527203.png)

在activemq.xml中查看默认的broker持久化机制。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.022608437561748476.png)

可以访问[http://activemq.apache.org/persistence.html](http://activemq.apache.org/persistence.html)查看详情

## 2，ActiveMQ消息持久化机制之AMQ和KahaDB

### 2.1，AMQ的优缺点

  1、性能

    AMQ的性能改与JDBC的持久化机制，由于是在文件中追加写入消息，所以性能比较高。并且创建了消息主键索引和缓存机制以提升性能。每个日志文件默认为32M，超出后会创建一个新文件。当消息消费完成后是进行删除还是归档操作，取决于配置。

  2、缺点

    AMQ会为每一个Destination创建一个索引，若创建了大小的消息队列，则磁盘占用会非常大；所以由于索引文件比较大，当Broker崩溃后，重建所以速度比较慢。

### 2.2，KahaDB的概述

    KahaDB是基于文件的本地数据库储存形式，虽然没有AMQ的速度快，但是它具有强扩展性，恢复的时间比AMQ短

    KahaDB基于文件系统，其次KahaDB支持事务。在ActiveMQ V5.4版本及后续版本KahaDB都是ActiveMQ的默认持久化存储方案。最后   Apache ActiveMQ官方表示它用来替换之前的AMQ Message Store存储方案。

    KahaDB主要元素包括：一个内存Metadata Cache用来在内存中检索消息的存储位置、若干用于记录消息内容的Data log文件、一个在磁盘上检索消息存储位置的Metadata Store、还有一个用于在系统异常关闭后恢复Btree结构的redo文件。如下图所示（官网引用）：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6604182208440779.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.41150378823257217.png)

### 2.3，KahaDB主要特性

    1、日志形式存储消息；

    2、消息索引以B-Tree结构存储，可以快速更新；

    3、完全支持JMS事务；

    4、支持多种恢复机制；

        消息存储在基于文件的数据日志中。如果消息发送成功，变标记为可删除的。系统会周期性的清除或者归档日志文件。

        消息文件的位置索引存储在内存中，这样能快速定位到。定期将内存中的消息索引保存到metadata store中，避免大量消息未发送时，消息索引占用过多内存空间。

### 2.4，KahaDB的文档结构说明

进入activemq/data目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.948645140515458.png)

进入bahadb的目录 

以下是KahaDB在磁盘文件上的现实展示。注意，可能您查看自己测试实例中所运行的KahaDB，看到的效果和本文中给出的效果不完全一致。例如您的data log文件可能叫db-1.log，也有可能会多出一个db.free的文件，但是这些都不影响我们对文件结构的分析：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14504065713435854.png)

①db.data

它是消息的**索引**文件。本质上是B-Tree的实现，使用B-Tree作为索引指向db-\*.log里面存储的消息。

②db.redo

主要用来进行**消息恢复**。

③db-\*.log 存储**消息的内容**。对于一个消息而言，不仅仅有消息本身的数据(message data)，而且还有(Destinations、订阅关系、事务...)

data log以日志形式存储消息，而且新的数据总是以APPEND的方式追加到日志文件末尾。因此，消息的存储是很快的。比如，对于持久化消息，Producer把消息发送给Broker，Broker先把消息存储到磁盘中(enableJournalDiskSyncs配置选项)，然后再向Producer返回Acknowledge。Append方式在一定程度上减少了Broker向Producer返回Acknowledge的时间。

④lock文件  锁

### 2.5，KahaDB的属性(\*为重要的)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10736870090058515.png)

5.4之后的版本

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2587982858865685.png)

5.6版本之后有效的属性：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.31828156604293906.png)

5.10版本

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5805752152229444.png)

---

## 3，ActiveMQ消息持久化机制之LevelDB简介【了解】

### 3.1，概述

LevelDB：从ActiveMQ 5.6版本之后，又推出了LevelDB的持久化引擎。LevelDB持久化性能高于KahaDB，虽然目前默认的持久化方式仍然是KahaDB，但是LevelDB是将来的趋势。并且，在ActiveMQ 5.9版本提供了基于LevelDB和Zookeeper的数据复制方式，用于Master-slave方式的首选数据复制方案。LevelDB使用自定义的索引代替常用的BTree索引。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.17053095919600958.png)

        通过上图可以看出LevelDB主要由6部分组成：内存中的MemTable和ImmutableMemTable，还有硬盘上的log文件，manifest文件，current文件和SSTable文件。还有一些其他的辅助文件，暂时不做说明。

        每写入一次数据，需要写入log文件，和MemTable，也就是说，只需要一次硬盘的顺序写入，和一个内存写入，如果系统崩溃，可以通过log文件恢复数据。每次写入会先写log文件，后写MemTable来保证不丢失数据。

        当MemTable到达内存阀值，LevelDB会创建一个新的MemTable和log文件，而旧的MemTable会变成ImmutableMemTable，ImmutableMemTable的内容是只读的。然后系统会定时的异步的把ImmutableMemTable的数据写入新的SSTable文件。

        SSTable文件和MemTable，ImmutableMemTable的数据结构相同，都是key，value的数据，按照key排序。

        manifest文件用于记录每个SSTable的key的起始值和结束值，有点类似于B-tree索引。而manifest同样会生成新文件，旧的文件不再使用。current文件就是指定哪个manifest文件是现在正在使用的。

### 3.2，官网

[http://activemq.apache.org/leveldb-store](http://activemq.apache.org/leveldb-store)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2192156157154842.png)

官网已经不推荐使用

---

## 4，ActiveMQ消息持久化机制之JDBC配置mysql【了解】

### 4.1，概述

顾名思义，JDBC持久化就是把消息的相关信息存入mysql数据库里面

### 4.2，配置方式

#### 4.2.1，把连接MySQL数据库的jar文件，放到ActiveMQ的lib目录下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2949594448873524.png)

#### 4.2.2， 修改conf目录下的activemq.xml原来的kahadb的持久化数据的方式

```java
1、注释原有配置
<!--
<persistenceAdapter>
      <kahaDB directory="${activemq.data}/kahadb"/>
</persistenceAdapter>
-->
2、修改成新的配置
<persistenceAdapter>
      <jdbcPersistenceAdapter dataSource="#mysql-ds"/>
</persistenceAdapter>
```

```Plain Text

```

#### 4.2.3，连接Mysql的配置(注意配置文件放置的位置放在borker下面)

```java
<bean id="mysql-ds" class="org.apache.commons.dbcp2.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/activemq?relaxAutoCommit=true"/>
    <property name="username" value="root"/>
    <property name="password" value="123456"/>
    <property name="poolPreparedStatements" value="true"/>
 </bean>
```

```Plain Text

```

此时，重新启动MQ，就会发现db数据库中多了三张表：activemq\_acks，activemq\_lock，activemq\_msgs，OK，说明activemq已经持久化成功啦！

如果没有就使用脚本

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7242028761810905.png)

### 4.3，三张表的说明

#### 4.3.1，activemq\_acks：

```Plain Text
用于存储订阅关系。如果是持久化Topic，订阅者和服务器的订阅关系在这个表保存。
```

```Plain Text
主要的数据库字段如下：
```

* container：消息的destination  
* sub\_dest：如果是使用static集群，这个字段会有集群其他系统的信息   
* client\_id：每个订阅者都必须有一个唯一的客户端id用以区分   
* sub\_name：订阅者名称   
* selector：选择器，可以选择只消费满足条件的消息。条件可以用自定义属性实现，可支持多属性and和or操作   
* last\_acked\_id：记录消费过的消息的id。  

#### 4.3.2，activemq\_lock

在集群环境中才有用，只有一个Broker可以获得消息，称为Master Broker，其他的只能作为备份等待Master Broker不可用，才可能成为下一个Master Broker。这个表用于记录哪个Broker是当前的Master Broker。

#### 4.3.3，activemq\_msgs：

用于存储消息，Queue和Topic都存储在这个表中。

```Plain Text
主要的数据库字段如下：
```

* id：自增的数据库主键  
* container：消息的destination  
* msgid\_prod：消息发送者客户端的主键   
* msg\_seq：是发送消息的顺序，msgid\_prod+msg\_seq可以组成jms的messageid  
* expiration：消息的过期时间，存储的是从1970-01-01到现在的毫秒数  
* msg：消息本体的java序列化对象的二进制数据  
* priority：优先级，从0-9，数值越大优先级越高  
* activemq\_acks用于存储订阅关系。如果是持久化topic，订阅者和服务器的订阅关系在这个表保存  

### 4.4，运行代码验证

一定要开启持久化   **producer.setDeliveryMode(DeliveryMode.PERSISTENT);**

### 4.5，验证结果

如果是点对点：在没有消费的情况下会把消息保存到activemq\_msgs表中，只要有任意一个消费者已经消费过了，这些消息会立马被清除。

如果是topic，一般是先启动消费者订阅再生产的情况下会把消息保存到activemq\_acks中。

### 4.6，可以遇到的坑

数据库jar包

记得需要使用到的相关jar文件放置到Activemq安装路径下的lib目录，连接池的包也要放

createTableOnStartup属性

在jdbcPersistenceAdapter标签中设置了createTablesOnStartup属性为true时在第一次启动activeMQ时，ActiveMQ服务节点会自动创建表。启动完成后可以去掉这个属性，或者更改为false

下划线的问题

如果出现java.lang.IIlegalStateException:BeanFactory not initalized or already closed

这是因为操作系统的机器名中有"\_"符号，请更改机器名并重启后可以解决

### 4.7，关于主题和队列

* 队列会默认进行存储。  
* 如果主题没有持久的订阅者，那么主题消息不会被持久化；如果有，即使没有上线，也会持久化。  

---

## 5，ActiveMQ消息持久化机制之JDBC With Journal

### 5.1，概述

为了在ActiveMQ V4.x中实现持久消息传递的高性能，我们强烈建议您使用我们的高性能日志 - 默认情况下已启用。这很像一个数据库消息（以及transcation提交/回滚和消息确认）以尽可能快的速度写入日志 - 然后每隔一段时间我们将日志检查到长期持久性存储（在本例中为JDBC）。

它在使用队列时很常见，例如消息在发布后很快消耗掉; 因此，您可以发布10,000条消息，并且只有一些未完成的消息 - 因此，当我们检查JDBC数据库时，我们通常只有少量消息可以实际写入JDBC。即使我们必须将所有消息写入JDBC，我们仍然可以通过日志获得性能提升，因为我们可以使用大型事务批处理将消息插入JDBC数据库以提高JDBC端的性能。

JDBC With Journal方式克服了JDBC Store的不足，使用快速的缓存写入技术，大大提高了性能。

JDBC With Journal方式，发送出来的消息会在内存中告诉缓存，接收端若在没有接收情况下7\~10分钟后再写入数据库，这样接收端就不用等到数据库操作完了之后再接收消息。

### 5.2，JDBC Store和JDBC Message Store with ActiveMQ Journal的区别

1. Jdbc with journal的性能优于jdbc
2. Jdbc用于master/slave模式的数据库分享
3. Jdbc with journal不能用于master/slave模式
4. 一般情况下，推荐使用jdbc with journal

5.3，配置方式  

1、打开activemq.xml配置文件（在apache-activemq/conf文件夹下），将原来使用的kahaDB消息持久化机制注释掉，添加以下代码：

```java
<persistenceFactory>
    <journalPersistenceAdapterFactory 
        journalLogFiles="4"
        journalLogFileSize="32768"
        useJournal="true"
        useQuickJournal="true"
        dataSource="#mysql-ds"
        dataDirectory="activemq-data"/>
</persistenceFactory>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9443441612119923.png)

2，也可以配置dbcp的数据连接池，但是必须引入dbcp的相关jar包

```java
<bean id="mysql-ds" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
  <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
  <property name="url" value="jdbc:mysql://localhost/db?relaxAutoCommit=true"/>
  <property name="username" value="activemq"/>
  <property name="password" value="activemq"/>
  <property name="poolPreparedStatements" value="true"/>
</bean>
```

---

## 6，ActiveMQ持久化机制小总结

1，持久化消息的作用

    MQ所在的服务器down了消息不会丢失的机制

2，持久化机制演化过程

    从最初的AMQ Message Store方案到ActiveMQ V4版本中推出的High performance journal(高性能事务支持)附件，并且同步推出数据库的存储方案。ActiveMQ5.3版本中又推出来的KahaDB的支持(5.4版本后为ActiveMQ默认持久化方案)，后来又开始支持LeaveDB,到现在。V5.9+版本提供了标准的zookeeper+LeavelDB集群化方案。

3，ActiveMQ的消息持久化机制

* AMQ  
* KahaDB  
* JDBC  
* ~~LevelDB~~  
* Replicated LevelDB Store   集群模式  

4，其它

    在发送者把消息发送出去后，消息中心首先把消息存储到本地数据文件、内存数据库者或者远程数据库等，然后试图把消息发送给接收者

    发送成功则把消息从存储中删除失败则继续尝试。消息中心启动后首先要检查指定存储位置，如果有未发送成功的消息，就需要把消息发送出去

# 17【掌握】Zookeeper和Replicated LevelDB

## 1，面试题

引入消息队列之后如何保证高可用？

 基于zookeeper和leveldb搭建activemq集群 集群仅提供主备方式的高可用集群功能，避免单点故障

## 2，Zookeeper和Replicated LevelDB集群概述

保存高可用

一台不行，搞多台

5.9之后推荐使用Replicated LevelDB的集群配置

[http://activemq.apache.org/persistence](http://activemq.apache.org/persistence)

使用ZooKeeper实现的Master-Slave实现方式，是对ActiveMQ进行高可用的一种有效的解决方案，高可用的原理：使用ZooKeeper（集群）注册所有的ActiveMQ Broker。只有其中的一个Broker可以对外提供服务（也就是Master节点），其他的Broker处于待机状态，被视为Slave。如果Master因故障而不能提供服务，则利用ZooKeeper的内部选举机制会从Slave中选举出一个Broker充当Master节点，继续对外提供服务。

高可用+负载均衡实现

Broker-Cluster 可以解实现载均衡，但当其中一个 Broker 突然宕掉的话，那么存在于该 Broker 上处于 Pending 状态的 message 将会丢失，无法达到高可用的目的。Master-Slave 与 Broker-Cluster 相结合的部署

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.849235129955798.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8461255172021978.png)

## 3，Zookeeper和Replicated LevelDB集群部署原理说明

 [http://activemq.apache.org/replicated-leveldb-store](http://activemq.apache.org/replicated-leveldb-store)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.345746968959959.png)

使用zk集群注册所有的ActiveMQ Broker但只有其中一个Broker可以提供服务它将被视为Master,其它的Broker处于待机状态人Slave.

如果Master挂了，Zookeeper会从Slave中选出一个Broker当作Master

Slave连接Master并同步他们的存储状态，Slave不接受客户端连接。所有的存储操作都会被复制连接到Master的Slave.

如果Master宕机得到了最新的Slave会成为Master.故障节点在恢复后会重新加入到集群中并连接Master进入Slave模式。

所有需要同步到磁盘的消息传递操作都将等待更新完成后再复制到法定仲裁节点。因此，如果将存储配置为，replicas="3"则仲裁大小为(3/2+1)=2。主服务器将更新存储在本地，并等待另外1个从服务器存储更新，然后再报告成功。考虑它的另一种方法是，存储将对复制节点的仲裁进行同步复制，对任何其他节点进行异步复制复制。

当选出一个新的主节点时，您还至少需要有一定数量的联机节点才能找到更新最新的节点。更新最新的节点将成为新的主节点。因此，**建议您至少使用3个副本节点运行**，以便可以在不造成服务中断的情况下关闭一个副本节点。

## 4，Zookeeper和Replicated LevelDB集群部署配置

### 4.1.环境和版本

centos7+

jdk1.8+

zookeeper

**apache-activemq-5.15.9-bin.tar.gz**

### 4.2.关闭防火墙并保证win可以ping通过activemq服务器

### 4.3.要求具备zk或zk集群并可以成功启动

 参考之前讲解过的zookeeper

#### 4.4.集群部署规划列表

| 主机          | zk端口 | AMQ集群bind的端口          | AMQ消息TCP端口 | 管理控制台端口 | AMQ节点安装目录           |
| ------------- | ------ | -------------------------- | -------------- | -------------- | ------------------------- |
| 192.168.3.110 | 2181   | bind:"tcp://0.0.0.0:63631" | 61616          | 8161           | /activemq\_cluster/node01 |
| 192.168.3.110 | 2181   | bind:"tcp://0.0.0.0:63632" | 61617          | 8162           | /activemq\_cluster/node02 |
| 192.168.3.110 | 2181   | bind:"tcp://0.0.0.0:63633" | 61618          | 8163           | /activemq\_cluster/node03 |

#### 2.5.创建3台集群目录

```java
mkdir /usr/local/activemq_cluster
cd /usr/local/activemq_cluster
cp -r /usr/local/activemq activemq-node01
cp -r /usr/local/activemq activemq-node02
cp -r /usr/local/activemq activemq-node03
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9529995058112273.png)

#### 2.6.修改管理控制台端口

```java
vim /usr/local/activemq-cluster/activemq-node01/conf/jetty.xml     
vim /usr/local/activemq-cluster/activemq-node02/conf/jetty.xml     
vim /usr/local/activemq-cluster/activemq-node03/conf/jetty.xml     
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.20227980999213296.png)

**2.7.hostname名字映射\[可以不写，目地是为了防止IP变化之后改的配置比较多\]**

```java
vim /etc/hosts
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.520306786211774.png)

#### 2.8.activemq集群配置

  3个节点的BrokerName要求完全一致

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5248660943941641.png)

  3个节点的持久化配置

```java
<persistenceAdapter>
         <replicatedLevelDB
           directory="${activemq.data}/leveldb"
           replicas="3"
           bind="tcp://0.0.0.0:63631"
            zkAddress="127.0.0.1:2181"
               hostname="xingen-server"
           zkPath="/activemq/leveldb-stores"
           />
    </persistenceAdapter>
    <persistenceAdapter>
            <replicatedLevelDB
               directory="${activemq.data}/leveldb"
               replicas="3"
               bind="tcp://0.0.0.0:63632"
               zkAddress="127.0.0.1:2181"
               hostname="xingen-server"
               zkPath="/activemq/leveldb-stores"
               />
        </persistenceAdapter>
    <persistenceAdapter>
         <replicatedLevelDB
           directory="${activemq.data}/leveldb"
           replicas="3"
           bind="tcp://0.0.0.0:63633"
           zkAddress="127.0.0.1:2181"
           hostname="xingen-server"
           zkPath="/activemq/leveldb-stores"
           />
    </persistenceAdapter>
```

#### 2.9.修改各个节点的消息端口

```java
vim /usr/local/activemq-cluster/activemq-node01/conf/activemq.xml
vim /usr/local/activemq-cluster/activemq-node02/conf/activemq.xml
vim /usr/local/activemq-cluster/activemq-node03/conf/activemq.xml
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4309570197427725.png)

#### 2.10.按照顺序启动3个ActiveMQ节点， 到这步前题是zk集群已经成功启动运行2.11.zk集群的节点状态说明

 连接zk

```java
./usr/local/zookeeper/bin/zkCli.sh
```

 查看master

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5284559081496747.png)

## 4，Replicated LevelDB集群故障迁移和验证

### 集群可用性测试

MQ的客户端只能访问Master的Broker,其它处理Slave的Broker不能访问，所有客户端连接的Broker应该使用failover协议

当一个MQ节点挂掉或者一个zk节点挂掉，mq服务依然正常运行，如果只剩下一个MQ节点由于不能选举Master,所有MQ不能正常运行

同样的，如果ZK只剩下一个节点活动，不管MQ节点存活，MQ也不能正常提供服务(MQ集群的高可用依赖于zk集群的高可用)

### 干掉一台Activemq，它会自动切换到另一个活着的

3如机器中的MQ只会有一个MQ可以被客户端连接使用，在测试时可以把Master关掉，然后再重试客户端消息发送和消费还可以正常使用，则说明集群正常。

如现在[http://192.168.3.110:8161可以正常访问](http://192.168.3.110:8161可以正常访问)说是这台是master

代码测试更改brokerUrl

```java
failover:(tcp://www.leige.tech:61616,tcp://www.leige.tech:61617,tcp://www.leige.tech:61618)
```

## 5，解决有数据之后主机宕机后无法访问的问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.26397019554932777.png)

查看日志出现以下错【雷哥没法解决】  ---换MQ的版本apache-activemq-5.15.9-bin.tar.gz

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6531794310390467.png)

# 18【掌握】ActiveMQ高级特性

## 1，高级特性之异步投递及确认成功

### 1.1，同步发送

        ActiveMQ官方说异步发送是很多模式下默认的传输方式，但是在发送非事物持久化消息的时候默认使用的是同步发送模式。同步发送时，Producer.send() 方法会被阻塞，直到 broker 发送一个确认消息给生产者，这个确认消息暗示生产者 broker 已经成功地将它发送的消息路由到目标目的并把消息保存到二级存储中。

        同步发送持久消息能够提供更好的可靠性，但这潜在地影响了程序的响应速度，因为在接受到 broker 的确认消息之前应用程序或线程会被阻塞。如果应用程序能够容忍一些消息的丢失，那么可以使用异步发送。异步发送不会在受到 broker 的确认之前一直阻塞 Producer.send 方法。

### 1.2，异步发送

        使用不同的模式对send 方法的反应时间有巨大的影响，反映时间是衡量ActiveMQ 吞吐量的重要因素，使用异步发送可以提高系统的性能。在默认大多数情况下，AcitveMQ 是以异步模式发送消息。例外的情况：在没有使用事务的情况下，生产者以PERSISTENT 传送模式发送消息。在这种情况下，send 方法都是同步的，并且一直阻塞直到ActiveMQ 发回确认消息：消息已经存储在持久性数据存储中。这种确认机制保证消息不会丢失，但会造成生产者阻塞从而影响反应时间。高性能的程序一般都能容忍在故障情况下丢失少量数据。如果编写这样的程序，可以通过使用异步发送来提高吞吐量（甚至在使用PERSISTENT 传送模式的情况下）。

### 1.3，设置异步发送

```java
ActiveMQConnectionFactory activeMQConnectionFactory = new ActiveMQConnectionFactory("ACTIVEMQ_URL");
activeMQConnectionFactory.setUseAsyncSend(true);
```

### 1.4，异步发送丢失消息的场景

        生产者设置UseAsyncSend=true，使用producer.send(msg)持续发送消息。由于消息不阻塞，生产者会认为所有send的消息均被成功发送至MQ。如果服务端突然宕机，此时生产者端内存中尚未被发送至MQ的消息都会丢失。正确的异步发送方法是需要接收回调的。

        producer.send有带上AsyncCallback的方法。该方法中需要重写onSuccess方法和onException方法。onSuccess方法就是表示这条消息成功发送到MQ上，并接收到了MQ持久化后的回调。onException表示MQ返回一个入队异常的回执。在上面的示例中用的是CountDownLatch类在onSuccess中记录。主要是因为onSuccess方法中只能引用final对象。

### 1.5，代码测试

```java
package com.xingen.advcase;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.ActiveMQMessageProducer;
import org.apache.activemq.AsyncCallback;

import javax.jms.*;

/**
 * @Description :消息生产者——异步发送并回调
 * @Author : 辛根
 * @Date : 2020/4/6 13:29
 */
public class TestMessageProducer {

    private static final String BROKER_URL = "tcp://129.211.39.189:61617";
    private static final String QUEUE_NAME = "queue-test";


    public static void main(String[] args) throws JMSException {
        ConnectionFactory factory = new ActiveMQConnectionFactory(BROKER_URL);
        // 开启异步发送
        ((ActiveMQConnectionFactory) factory).setAlwaysSyncSend(true);
        Connection connection = factory.createConnection();
        connection.start();
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        Queue queue = session.createQueue(QUEUE_NAME);
        ActiveMQMessageProducer producer = (ActiveMQMessageProducer) session.createProducer(queue);
        // 设置消息类型为持久
        producer.setDeliveryMode(DeliveryMode.PERSISTENT);
        TextMessage textMessage = session.createTextMessage("我是一条测试消息");
        // 由于消息是持久的，所以这里默认发送的消息是使用的同步模式
        producer.send(queue, textMessage, new AsyncCallback() {
            @Override
            public void onSuccess() {
                System.out.println("消费发送成功，所处线程:"+Thread.currentThread().getName());
            }

            @Override
            public void onException(JMSException e) {
                System.out.println("消费发送失败，所处线程:"+Thread.currentThread().getName());
            }
        });
        System.out.println("主程序所处线程为:"+Thread.currentThread().getName());
        producer.close();
        session.close();
        connection.close();
        System.out.println("消费发送成功");
    }

}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabf42a8d2-26c4-4c10-b81c-9516db65c937.jpg)

### 1.6，面试题

1，Activemq的消费是否支持异步——**是**

2，Activemq异步消费如何开启及如何时确定投递成功？

* 使用setAlwaysSyncSend(true)开启  
* 发送时使用AsyncCallback方法接收回调

3、Activemq默认情况下是同步还是异步？

    非事务模式下默认是同步的。  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad1c8b65d-ef0c-4feb-894b-fa1631eeda24.jpg)

## 2，高级特性之延迟投递和定时投递

### 2.1，概述

        5.4版的ActiveMQ在ActiveMQ消息代理中内置了一个可选的持久性调度程序。通过在“ Xml配置”中将broker schedulerSupport属性设置为true 可以启用此功能。ActiveMQ客户端可以通过使用以下消息属性来利用延迟传递。

[http://activemq.apache.org/delay-and-schedule-message-delivery.html](http://activemq.apache.org/delay-and-schedule-message-delivery.html)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9850467778519642.png)

```java
schedulerSupport="true"
```

### 2.2，属性说明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8773038911693348.png)

### 2.3，案例说明-延时20秒

```java
TextMessage message = session.createTextMessage("我是一个消息----helo");
message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY,20000);
producer.send(message);
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5804ba94-554b-4ab5-98f2-77b86f18c768.jpg)

###  2.4，案例说明-延时10秒，投递10次，间隔5秒

```java
TextMessage message = session.createTextMessage("我是一个消息----helo");
//多少毫秒这后入队
message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY,10000);
//隔多少毫秒再投
message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_PERIOD,5000);
//总共投多少次
message.setIntProperty(ScheduledMessage.AMQ_SCHEDULED_REPEAT,10);
producer.send(message);
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora62201c88-d70d-437b-b676-e08aa56c0d51.jpg)

### 2.5，案例说明-使用CRON表达式  

```java
MessageProducer producer = session.createProducer(destination);
TextMessage message = session.createTextMessage("test msg");
message.setStringProperty(ScheduledMessage.AMQ_SCHEDULED_CRON, "0 * * * *");
producer.send(message);
MessageProducer producer = session.createProducer(destination);
TextMessage message = session.createTextMessage("test msg");
message.setStringProperty(ScheduledMessage.AMQ_SCHEDULED_CRON, "0 * * * *");
message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY, 1000);
message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_PERIOD, 1000);
message.setIntProperty(ScheduledMessage.AMQ_SCHEDULED_REPEAT, 9);
producer.send(message);
```

### 2.6，其它说明

1，CRON表达式的优先级高于另外三个参数，如果在设置了CRON的同时，也有repeat和period参数，则会在每次CRON执行的时候，重复投递repeat次，每次间隔为period。就是说设置是叠加的效果。例如每小时都会发生消息被投递10次，延迟1秒开始，每次间隔1秒

2，此处Cron是Unix系统中任务调度器,它使用一个字符串来表示一个任务何时需要被执行。而不是quartz里边的那个Cron表达式

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7717337386583017.png)

## 3，高级特性之消费重试机制

### 3.1，activeMQ会在什么情况下重新发送消息

        activeMQ中的消息重发，指的是消息可以被broker重新分派给消费者，不一定的之前的消费者。重发消息之后，消费者可以重新消费。消息重发的情况有以下几种。

1.事务会话中，当还未进行session.commit()时，进行session.rollback()，那么所有还没commit的消息都会进行重发。

2.使用客户端手动确认的方式时，还未进行确认并且执行Session.recover()，那么所有还没acknowledge的消息都会进行重发。

3.所有未ack的消息，当进行session.closed()关闭事务，那么所有还没ack的消息broker端都会进行重发，而且是马上重发。

4.消息被消费者拉取之后，超时没有响应ack，消息会被broker**重发**。

        重发指的是消息经过broker重新进行转发给消费者，经过测试，1和2的情况消息重发会发送给原来的消费者，3和4可以转发消息给别的消费者。累计次数超过设置的maximumRedeliveries时消息都会都会进入死信队列。

消息的重发时间间隔和重发次数

间隔  1

次数   6    （6次之后进入死信队列）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.0935673063662166.png)

###  3.2，java配置

```java
public static void main(String[] args) throws JMSException {
    ActiveMQConnectionFactory connectionFactory = new ActiveMQConnectionFactory(BROKER_URL);
    RedeliveryPolicy redeliveryPolicy = new RedeliveryPolicy();
    // 是否在每次尝试重新发送失败后,增长这个等待时间
    redeliveryPolicy.setUseExponentialBackOff(true);
    // 重发次数,默认为6次 这里设置为1次
    redeliveryPolicy.setMaximumRedeliveries(2);
    // 重发时间间隔,默认为1秒
    redeliveryPolicy.setMaximumRedeliveries(1000);
    // 第一次失败后重新发送之前等待500毫秒,第二次失败再等待500 * 2毫秒,这里的2就是value
    redeliveryPolicy.setBackOffMultiplier(2);
    // 最大传送延迟，只在useExponentialBackOff为true时有效（V5.5），假设首次重连间隔为10ms，倍数为2，那么第二次重连时间间隔为
    // 20ms，
    // 第三次重连时间间隔为40ms，当重连时间间隔大的最大重连时间间隔时，以后每次重连时间间隔都为最大重连时间间隔。
    redeliveryPolicy.setMaximumRedeliveryDelay(1000);
    connectionFactory.setRedeliveryPolicy(redeliveryPolicy);

    Connection connection = connectionFactory.createConnection();
    connection.start();
    Session session = connection.createSession(true, Session.CLIENT_ACKNOWLEDGE);
    Queue queue = session.createQueue(QUEUE_NAME);
    MessageConsumer consumer = session.createConsumer(queue);

    TextMessage message = (TextMessage) consumer.receive(1000);
    System.out.println("消费者接收到消息:"+message.getText());
    consumer.close();
    session.close();
    connection.close();
    System.out.println("消息消费成功");
}
```

### 3.3，spring的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8191266649803235.png)

### 3.4，springboot的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5258080647454998.png)

##  4，高级特性之死信队列

[http://activemq.apache.org/message-redelivery-and-dlq-handling.html](http://activemq.apache.org/message-redelivery-and-dlq-handling.html)

### 4.1，简介

DLQ-死信队列(Dead Letter Queue)用来保存处理失败或者过期的消息。

就是一条消息现次被重发了多次后(默认6次)，将会被activemq移入"死信队列"。开发人员可以在这个Queue中查看处理出错的消息，进行人工处理。

### 4.2，简介

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.21943883152300409.png)

开发中的情况

一般生产环境中在使用MQ的时候设计两个队列：一个是核心业务队列，一个是死信队列。

核心业务队列，就是处理正常的消息，另一个就是处理处理异常情况的。

由上图中可以看到，在第三方物流系统故障期间，所有的订单消息全部处理失败，全部会转入死信队列。然后你的仓储系统得专门有一个后台线程。监控第三方物流系统是否正常。能否请求。不停的监视。一旦发现对方恢复正常。这个后台线程就从死信队列消费出来处理失败的订单，重新执行发货和配送的通知逻辑。

### 4.3，配置方式

#### 4.3.1，activemq.xml

```java
<destinationPolicy>
    <policyMap>
        <policyEntries>
            <!--添加内容开始-->
            <policyEntry queue=">">
                <deadLetterStrategy>
                    <individualDeadLetterStrategy queuePrefix="DLQ." useQueueForQueueMessages="true" />
                </deadLetterStrategy>
            </policyEntry>
            <!--添加内容结束-->
            <policyEntry topic=">" >
                <pendingMessageLimitStrategy>
                    <constantPendingMessageLimitStrategy limit="1000"/>
                </pendingMessageLimitStrategy>
            </policyEntry>
        </policyEntries>
    </policyMap>
</destinationPolicy>
```

#### 4.3.2，配置说明：

queuePrefix==代表死信队列的前缀   最后的名字为DLQ.队列名

userQueueForTopicMessages 表示是否把Topic的DealLetter保存到Queue中，默认为true

userQueueForQueneMessages 表示是否把Queue的DealLetter保存到Queue中，默认为true

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5553723430564659.png)

### 4.4，重试多次，看失败6次之后进入死信队列的名字

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.20009478944780845.png)

## 5，高级特性之防止重复调用

[http://activemq.apache.org/redelivery-policy](http://activemq.apache.org/redelivery-policy)

网络延时传输中，会造成进行MQ重试。在重试过程中。可能会有重复消费的问题。

如果消息是做数据库的插入操作。给这个消息做一个唯一主键，那么就算出理重复消费的情况。就会有主键冲突，避免数据库出现脏数据。

如果上面两种情况还不行，准备一个第三方服务来做消费记录。如redis，给消息分配一个全局的ID,只要消费过该消息，把<id,Message>发K-V形式写入redis.那消费者开始消费前，先去redis中查询有没有消费记录就可以了。

# 19【熟悉】ActiveMQ应用场景

## 1 ，异步处理

场景说明：用户注册后，需要发注册邮件和注册短信。传统的做法有两种 1.串行的方式；2.并行方式

a、串行方式：将注册信息写入数据库成功后，发送注册邮件，再发送注册短信。以上三个任务全部完成后，返回给客户端。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5198473439033614.png)

b、并行方式：将注册信息写入数据库成功后，发送注册邮件的同时，发送注册短信。以上三个任务完成后，返回给客户端。与串行的差别是，并行的方式可以提高处理的时间

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.15586489230247413.png)

假设三个业务节点每个使用50毫秒钟，不考虑网络等其他开销，则串行方式的时间是150毫秒，并行的时间可能是100毫秒。

因为CPU在单位时间内处理的请求数是一定的，假设CPU1秒内吞吐量是100次。则串行方式1秒内CPU可处理的请求量是7次（1000/150）。并行方式处理的请求量是10次（1000/100）

小结：如以上案例描述，传统的方式系统的性能（并发量，吞吐量，响应时间）会有瓶颈。如何解决这个问题呢？

引入消息队列，将不是必须的业务逻辑，异步处理。改造后的架构如下：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2919812290806019.png)

按照以上约定，用户的响应时间相当于是注册信息写入数据库的时间，也就是50毫秒。注册邮件，发送短信写入消息队列后，直接返回，因此写入消息队列的速度很快，基本可以忽略，因此用户的响应时间可能是50毫秒。因此架构改变后，系统的吞吐量提高到每秒20 QPS。比串行提高了3倍，比并行提高了两倍。

---

## 2，应用解耦

场景说明：用户下单后，订单系统需要通知库存系统。传统的做法是，订单系统调用库存系统的接口。如下图：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9585466771169423.png)

传统模式的缺点：假如库存系统无法访问，则订单减库存将失败，从而导致订单失败，订单系统与库存系统耦合

如何解决以上问题呢？引入应用消息队列后的方案，如下图：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3283812081893891.png)

订单系统：用户下单后，订单系统完成持久化处理，将消息写入消息队列，返回用户订单下单成功

库存系统：订阅下单的消息，采用拉/推的方式，获取下单信息，库存系统根据下单信息，进行库存操作

假如：在下单时库存系统不能正常使用。也不影响正常下单，因为下单后，订单系统写入消息队列就不再关心其他的后续操作了。实现订单系统与库存系统的应用解耦

---

## 3，流量削锋

流量削锋也是消息队列中的常用场景，一般在秒杀或团抢活动中使用广泛。

应用场景：秒杀活动，一般会因为流量过大，导致流量暴增，应用挂掉。为解决这个问题，一般需要在应用前端加入消息队列。

a、可以控制活动的人数

b、可以缓解短时间内高流量压垮应用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4960394295257037.png)

用户的请求，服务器接收后，首先写入消息队列。假如消息队列长度超过最大数量，则直接抛弃用户请求或跳转到错误页面。

秒杀业务根据消息队列中的请求信息，再做后续处理

---

## 4，日志处理

日志处理是指将消息队列用在日志处理中，比如Kafka的应用，解决大量日志传输的问题。架构简化如下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6811467667947021.png)

日志采集客户端，负责日志数据采集，定时写受写入Kafka队列

Kafka消息队列，负责日志数据的接收，存储和转发

日志处理应用：订阅并消费kafka队列中的日志数据 

---

## 5，消息通讯

消息通讯是指，消息队列一般都内置了高效的通信机制，因此也可以用在纯的消息通讯。比如实现点对点消息队列，或者聊天室等

点对点通讯：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10730521846180628.png)

客户端A和客户端B使用同一队列，进行消息通讯。

聊天室通讯：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.498950540767881.png)

客户端A，客户端B，客户端N订阅同一主题，进行消息发布和接收。实现类似聊天室效果。

# 20【掌握】ActiveMQ面试宝典

## 1\. ActiveMQ服务器宕机怎么办？

这在得从ActiveMQ的储存机制说起。在通常的情况下，非持久化消息是存储在内存中的，持久化消息是存储文件中的，它们的最大限制在配置文件的节点中配置。但是，在非持久化消息堆积到一定程度，内存告急的时候，ActiveMQ会将内存中的非持久化消息写入临时文件中，以腾出内存。虽然都保存到了文件里，但它和持久化消息的区别是，重启后持久化消息会从文件中恢复，非持久化的临时文件会直接删除。

那如果文件增大到达了配置中的最大限制的时候会发生什么？

设置2G左右的持久化文件限制，大量生产持久化消息直到文件达到最大限制，此时生产者阻塞，但消费者可正常连接并消费消息，等消息消费掉一部分，文件删除又腾出空间之后，生产者又可继续发送消息，服务自动恢复正常。

设置2G左右的临时文件限制，大量生产非持久化消息并写入临时文件，在达到最大限制时，生产者阻塞，消费者可正常连接但不能消费消息，或者原本慢速消费的消费者，消费突然停止。整个系统可连接，但是无法提供服务，就这样挂了。

解决方案：尽量不要用非持久化消息，非要用的话，将临时文件限制尽可能的调大。

---

## 2\. 丢消息怎么办？

这得从java的java.net.SocketException异常说起。简单点说就是当网络发送方发送一堆数据，然后调用close关闭连接之后。这些发送的数据都在接收者的缓存里，接收者如果调用read方法仍旧能从缓存中读取这些数据，尽管对方已经关闭了连接。但是当接收者尝试发送数据时，由于此时连接已关闭，所以会发生异常，这个很好理解。不过需要注意的是，当发生SocketException后，原本缓存区中数据也作废了，此时接收者再次调用read方法去读取缓存中的数据，就会报Software caused connection abort: recv failed错误。

通过抓包得知，ActiveMQ会每隔10秒发送一个心跳包，这个心跳包是服务器发送给客户端的，用来判断客户端死没死。如果你看过上面第一条，就会知道非持久化消息堆积到一定程度会写到文件里，这个写的过程会阻塞所有动作，而且会持续20到30秒，并且随着内存的增大而增大。当客户端发完消息调用connection.close()时，会期待服务器对于关闭连接的回答，如果超过15秒没回答就直接调用socket层的close关闭tcp连接了。这时客户端发出的消息其实还在服务器的缓存里等待处理，不过由于服务器心跳包的设置，导致发生了java.net.SocketException异常，把缓存里的数据作废了，没处理的消息全部丢失。

解决方案：用持久化消息，或者非持久化消息及时处理不要堆积，或者启动事务，启动事务后，commit()方法会负责任的等待服务器的返回，也就不会关闭连接导致消息丢失了。

---

## 3\. 持久化消息非常慢。

默认的情况下，非持久化的消息是异步发送的，持久化的消息是同步发送的，遇到慢一点的硬盘，发送消息的速度是无法忍受的。但是在开启事务的情况下，消息都是异步发送的，效率会有2个数量级的提升。所以在发送持久化消息时，请务必开启事务模式。其实发送非持久化消息时也建议开启事务，因为根本不会影响性能。

## 4\. 消息的不均匀消费。

有时在发送一些消息之后，开启2个消费者去处理消息。会发现一个消费者处理了所有的消息，另一个消费者根本没收到消息。原因在于ActiveMQ的prefetch机制。当消费者去获取消息时，不会一条一条去获取，而是一次性获取一批，默认是1000条。这些预获取的消息，在还没确认消费之前，在管理控制台还是可以看见这些消息的，但是不会再分配给其他消费者，此时这些消息的状态应该算作“已分配未消费”，如果消息最后被消费，则会在服务器端被删除，如果消费者崩溃，则这些消息会被重新分配给新的消费者。但是如果消费者既不消费确认，又不崩溃，那这些消息就永远躺在消费者的缓存区里无法处理。更通常的情况是，消费这些消息非常耗时，你开了10个消费者去处理，结果发现只有一台机器吭哧吭哧处理，另外9台啥事不干。

解决方案：将prefetch设为1，每次处理1条消息，处理完再去取，这样也慢不了多少。

```java
tcp://localhost:61616?jms.prefetchPolicy.queuePrefetch=1
ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory(URL);
ActiveMQPrefetchPolicy prefetchPolicy = new ActiveMQPrefetchPolicy();
prefetchPolicy.setQueuePrefetch(10);
factory.setPrefetchPolicy(prefetchPolicy);
```

---

## 5\. 死信队列。

如果你想在消息处理失败后，不被服务器删除，还能被其他消费者处理或重试，可以关闭AUTO\_ACKNOWLEDGE，将ack交由程序自己处理。那如果使用了AUTO\_ACKNOWLEDGE，消息是什么时候被确认的，还有没有阻止消息确认的方法？有！

消费消息有2种方法，一种是调用consumer.receive()方法，该方法将阻塞直到获得并返回一条消息。这种情况下，消息返回给方法调用者之后就自动被确认了。另一种方法是采用listener回调函数，在有消息到达时，会调用listener接口的onMessage方法。在这种情况下，在onMessage方法执行完毕后，消息才会被确认，此时只要在方法中抛出异常，该消息就不会被确认。那么问题来了，如果一条消息不能被处理，会被退回服务器重新分配，如果只有一个消费者，该消息又会重新被获取，重新抛异常。就算有多个消费者，往往在一个服务器上不能处理的消息，在另外的服务器上依然不能被处理。难道就这么退回--获取--报错死循环了吗？

在重试6次后，ActiveMQ认为这条消息是“有毒”的，将会把消息丢到死信队列里。如果你的消息不见了，去ActiveMQ.DLQ里找找，说不定就躺在那里。

---

## 6\. ActiveMQ中的消息重发时间间隔和重发次数吗？

ActiveMQ：是Apache出品，最流行的，能力强劲的开源消息总线。是一个完全支持JMS1.1和J2EE 1.4规范的 JMS Provider实现。JMS（Java消息服务）：是一个Java平台中关于面向消息中间件（MOM）的API，用于在两个应用程序之间，或分布式系统中发送消息，进行异步通信。

首先，我们得大概了解下，在哪些情况下，ActiveMQ服务器会将消息重发给消费者，这里为简单起见，假定采用的消息发送模式为队列（即消息发送者和消息接收者）。

①　如果消息接收者在处理完一条消息的处理过程后没有对MOM进行应答，则该消息将由MOM重发.

②　如果我们队某个队列设置了预读参数（consumer.prefetchSize），如果消息接收者在处理第一条消息时（没向MOM发送消息接收确认）就宕机了，则预读数量的所有消息都将被重发!

③　如果Session是事务的，则只要消息接收者有一条消息没有确认，或发送消息期间MOM或客户端某一方突然宕机了，则该事务范围中的所有消息MOM都将重发。

④　说到这里，大家可能会有疑问，ActiveMQ消息服务器怎么知道消费者客户端到底是消息正在处理中还没来得急对消息进行应答还是已经处理完成了没有应答或是宕机了根本没机会应答呢？其实在所有的客户端机器上，内存中都运行着一套客户端的ActiveMQ环境，该环境负责缓存发来的消息，负责维持着和ActiveMQ服务器的消息通讯，负责失效转移（fail-over）等，所有的判断和处理都是由这套客户端环境来完成的。

我们可以来对ActiveMQ的重发策略（Redelivery Policy）来进行自定义配置，其中的配置参数主要有以下几个：

可用的属性

 属性 默认值 说明

collisionAvoidanceFactor 默认值0.15 , 设置防止冲突范围的正负百分比，只有启用useCollisionAvoidance参数时才生效。

maximumRedeliveries 默认值6 , 最大重传次数，达到最大重连次数后抛出异常。为-1时不限制次数，为0时表示不进行重传。

maximumRedeliveryDelay 默认值-1, 最大传送延迟，只在useExponentialBackOff为true时有效（V5.5），假设首次重连间隔为10ms，倍数为2，那么第二次重连时间间隔为 20ms，第三次重连时间间隔为40ms，当重连时间间隔大的最大重连时间间隔时，以后每次重连时间间隔都为最大重连时间间隔。

initialRedeliveryDelay 默认值1000L, 初始重发延迟时间

redeliveryDelay 默认值1000L, 重发延迟时间，当initialRedeliveryDelay=0时生效（v5.4）

useCollisionAvoidance 默认值false, 启用防止冲突功能，因为消息接收时是可以使用多线程并发处理的，应该是为了重发的安全性，避开所有并发线程都在同一个时间点进行消息接收处理。所有线程在同一个时间点处理时会发生什么问题呢？应该没有问题，只是为了平衡broker处理性能，不会有时很忙，有时很空闲。

useExponentialBackOff 默认值false, 启用指数倍数递增的方式增加延迟时间。

backOffMultiplier 默认值5, 重连时间间隔递增倍数，只有值大于1和启用useExponentialBackOff参数时才生效。

# 21【扩展】redis+MQ+Mysql实现秒杀

## 准备工作

### 使用docker启动Redis

docker run -d --name redis -p 6379:6379 redis --requirepass "123456"

### MQ已有

### 准备mysql数据库【本地】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0020257bf04-7acb-4c54-b90b-eda39221e8fe.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00429b021c5-d70a-4e7a-8a23-36a017892821.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0069604f5fb-e754-4116-9476-7de7e3a6a019.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0083ec2b7ae-5b92-40ed-ab65-8d678251c243.jpg)

## 架构图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0104eaefdb7-af46-465b-92a0-302002145508.jpg)

## 创建项目


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image012bc1c57c5-ab07-4170-9e88-9f99194ec954.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0142e58a8fa-519a-47da-ada1-684b7b7ee771.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0164db97a36-3ba0-4bc4-a4d0-bf3aa04eb9e2.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image018551cd55d-dfff-4f55-b636-3161923dfb5b.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image020799f3d60-994f-41d3-8d0c-76012eb4ec81.jpg)

## 修改pom.xml引入druid数据源

```java
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.1.21</version>
        </dependency>
```

修改yml

```java
server:
  port: 8080

  #数据源的配置
  spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://47.101.217.125:3306/miaosha?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC
    username: root
    password: 123456
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      max-active: 20
      min-idle: 5
      validation-query: select x
      initial-size: 3
      max-wait: 5000

  #redis配置
  redis:
    host: 129.211.39.189
    password: 123456
    port: 6379

  activemq:
    broker-url: tcp://129.211.39.189:61616
    user: admin
    password: admin
  jms:
    pub-sub-domain: false   #false代表队列[默认]  true代表主题

#mybatis的配置
mybatis:
  mapper-locations: classpath:mapper/*Mapper.xml  #配置mapper.xml的扫描
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

 生成Order 和Goods相关

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image022ec2caf79-5a77-4d49-ab61-9c65322d869b.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image02408872ce6-6ace-48ee-b23c-c57ff25fbc00.jpg)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image026df78ca4e-09d9-407d-9101-68087662707b.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0286bc1beb2-040f-482a-a474-37de0ca81ca1.jpg)

## 创建ActiveMQConfig

```java
package com.xingen.config;

import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jms.Queue;

/**
 * @Description :配置类
 * @Author : 辛根
 * @Date : 2020/4/9 17:00
 */
@Configuration
public class ActiveMQConfig {

    public static final String QUEUE_NAME = "seconds-kill-queue";

    @Bean
    public Queue queue() {
        return new ActiveMQQueue(QUEUE_NAME);
    }

}
```

## 创建Sender发送消息

```java
package com.xingen.mq.service;

import com.xingen.config.ActiveMQConfig;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * @Description :生产者
 * @Author : 辛根
 * @Date : 2020/4/9 17:03
 */
@Service
@Log4j2
public class Sender {

    @Autowired
    private JmsMessagingTemplate jmsMessagingTemplate;

    private int i;

    /**
     * @param goodsId
     * @param userId
     * @ClassName: Sender
     * @Description: 如查用户抢到商品就发送到队列，信息包含商品ID和用户ID
     * @Return: void
     * @Author: 辛根 2020/4/9 17:04
     */
    public void sendDirectQueue(String goodsId, String userId) {
        log.info(">>>>>>>>>>>>>>秒杀请求已发送，商品ID为：" + goodsId + "--用户ID：" + userId);
        try {
            Map<String, String> map = new HashMap<>();
            map.put("goodsId", goodsId);
            map.put("userId", userId);
            //第一个参数是指要发送到哪个队列里面， 第二个参数是指要发送的内容
            jmsMessagingTemplate.convertAndSend(ActiveMQConfig.QUEUE_NAME, map);
            //此处为了记录并发请求下，请求的次数及消息传递的次数
            log.info("发送请求>>>>>>>>>>>>>" + i++);
        } catch (Exception e) {
            log.error("请求发送异常：" + e.getMessage());
            e.printStackTrace();
        }
    }

}
```

创建Receiver异步接收消息  

```java
package com.xingen.mq.service;

import com.xingen.config.ActiveMQConfig;
import com.xingen.domain.Goods;
import com.xingen.domain.Order;
import com.xingen.service.GoodsService;
import com.xingen.service.OrderService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import javax.jms.MapMessage;
import java.util.Date;

/**
 * @Description :消费者
 * @Author : 辛根
 * @Date : 2020/4/9 17:04
 */
@Service
@Log4j2
public class Receiver {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private GoodsService goodsService;

    @Autowired
    private OrderService orderService;

    private int i;

    @JmsListener(destination = ActiveMQConfig.QUEUE_NAME)
    public void receive(MapMessage mapMessage) {
        try {
            //取到商品ID判断redis里面的该商品库存是否为0
            String goodsId = mapMessage.getString("goodsId");
            ValueOperations<String, String> opsForValue = redisTemplate.opsForValue();
            long num = opsForValue.decrement(goodsId).longValue();//递减
            if (num < 0) {
                /**
                 * 此处不能判断等于0，因为当商品库存为1时，Redis执行递减返回为0
                 * 如果判断为0商品最后不能卖完也就是当库存为1时此处就抛异常了
                 */
                throw new RuntimeException("库存不足啦，不能再抢了");
            }
            log.info("接收时>>>>>>>>>>>" + i++);
            Goods goods = new Goods();
            goods.setGoodsId(Long.valueOf(goodsId));
            //哪果不为0=则减小mysql里面该商品的库存
            goods.setTotalStocks((int) num);
            //根据商品的id和库存同步数据到MySQL
            if (!goodsService.updateByPrimaryKeySelective(goods)) {
                throw new RuntimeException("同步到商品表异常！");
            }
            //生成订单
            String uid = mapMessage.getString("userId");
            log.info("成功了>>>>>>>>>>>" + uid + "  抢到了商品 O(∩_∩)O哈哈~");
            Order order = new Order();
            order.setGoodsid(Integer.valueOf(goodsId));
            order.setUserid(Integer.valueOf(uid));
            order.setCreatetime(new Date());
            orderService.insert(order);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

创建GoodsService

```java
package com.xingen.service;

import com.xingen.domain.Goods;

/**
 * @Description :
 * @Author : 辛根  2020/4/9 17:16
 */
public interface GoodsService {
    boolean updateByPrimaryKeySelective(Goods goods);
}

```

## 创建GoodsServiceImpl

```java
package com.xingen.service.impl;

import com.xingen.domain.Goods;
import com.xingen.mapper.GoodsMapper;
import com.xingen.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/9 17:16
 */
@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public boolean updateByPrimaryKeySelective(Goods goods) {
        return goodsMapper.updateByPrimaryKeySelective(goods) > 0;
    }
}

```

## 创建OrderService

```java
package com.xingen.service;

import com.xingen.domain.Order;

/**
 * @Description :
 * @Author : 辛根  2020/4/9 17:16
 */
public interface OrderService {
    void insert(Order order);
}

```

## 创建OrderServiceImpl

```java
package com.xingen.service.impl;

import com.xingen.domain.Order;
import com.xingen.mapper.OrderMapper;
import com.xingen.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/9 17:17
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public void insert(Order order) {
        orderMapper.insert(order);
    }
}

```

 程序启动时加载要加入秒杀的商品到redis

### 创建ApplicationInitListener

```java
package com.xingen.listener;

import com.xingen.domain.Goods;
import com.xingen.service.GoodsService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Scope;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.Iterator;
import java.util.List;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/9 17:26
 */
@Component
@Scope("singleton")
@Log4j2
public class ApplicationInitListener implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    private GoodsService goodsService;
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null) {
            ValueOperations<String, String> opsForValue = redisTemplate.opsForValue();
            log.info(">>>>>>>>>>>>项目初始化完成，执行监听器中逻辑");
            //mapper中的sql，返回全部上架（支持秒杀）的商品集合
            List<Goods> list = goodsService.selectGoodsToMiaoSha();
            Iterator<Goods> it = list.iterator();
            while (it.hasNext()) {
                Goods p = it.next();
                try {
                    opsForValue.set(String.valueOf(p.getGoodsId()), String.valueOf(p.getTotalStocks()));
                    log.info("商品放成Redis成功ID：" + p.getGoodsId() + "商品库存：" + p.getTotalStocks());
                } catch (Exception e) {
                    log.error("当前商品ID：" + p.getGoodsId() + "库存：" + p.getTotalStocks() + "放入Redis缓存异常<<<<<<<<<<<<<<<<<<<<");
                    e.printStackTrace();
                }
            }
        }
    }
}
```

修改GoodsService  

```java
package com.xingen.service;

import com.xingen.domain.Goods;

import java.util.List;

/**
 * @Description :
 * @Author : 辛根  2020/4/9 17:16
 */
public interface GoodsService {
    boolean updateByPrimaryKeySelective(Goods goods);

    /**
     * @Description: 查询所有秒杀的商品
     * @Return:
     * @Author:辛根 2020/4/9 17:27
     */
    List<Goods> selectGoodsToMiaoSha();
}
```

### 修改GoodsServiceImpl

```java
package com.xingen.service.impl;

import com.xingen.domain.Goods;
import com.xingen.domain.GoodsExample;
import com.xingen.mapper.GoodsMapper;
import com.xingen.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/9 17:16
 */
@Service
public class GoodsServiceImpl implements GoodsService {

    @Autowired
    private GoodsMapper goodsMapper;

    @Override
    public boolean updateByPrimaryKeySelective(Goods goods) {
        return goodsMapper.updateByPrimaryKeySelective(goods) > 0;
    }

    /**
     * @ClassName: GoodsServiceImpl
     * @Description: 查询所有秒杀的商品
     * @Return: java.util.List<com.xingen.domain.Goods>
     * @Author: 辛根 2020/4/9 17:27
     */
    @Override
    public List<Goods> selectGoodsToMiaoSha() {
        GoodsExample example = new GoodsExample();
        GoodsExample.Criteria criteria = example.createCriteria();
        // 只招要秒杀的
        criteria.andIsmiaoshaEqualTo(1);
        List<Goods> goods = this.goodsMapper.selectByExample(example);
        return goods;
    }
}
```

 创建ActiveController

```java
 @RestController
  public class ActiveController {

    @Autowired
    private GoodsService goodsService;

    /**
     * 秒杀入口
     * @param pid -商品id，做检查库存使用
     * @param userId -用户id，做订单和用户关联使用（比如生成成功秒杀商品的用户订单表）
     *                我这里没做多余的逻辑，只看了相关情况的返回结果，有需要的可以自己去实现
     */
    @RequestMapping(value = "secondsKill")
    public ResultObj secondsKill(String pid, String userId) {
        try {
            //模拟发送100次请求，库存设置为少于100查看结果，此100次请求为顺序请求
            //for(int i=0; i<100; i++) {
            boolean result = goodsService.secondsKill(pid, userId);
            if(result) {
                return new ResultObj(1,"秒杀成功，请稍后去订单查询");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultObj(-1,"秒杀失败，原因:"+e.getMessage());
        }
        return null;
    }
}
```

修改GoodsService  

```java
package com.xingen.service;

import com.xingen.domain.Goods;

import java.util.List;

/**
 * @Description :
 * @Author : 辛根  2020/4/9 17:16
 */
public interface GoodsService {
    boolean updateByPrimaryKeySelective(Goods goods);

    /**
     * @Description: 查询所有秒杀的商品
     * @Return:
     * @Author:辛根 2020/4/9 17:27
     */
    List<Goods> selectGoodsToMiaoSha();

    /**
     * @Description: 
     *  
     * @Return: 
     * @Author:辛根 2020/4/9 17:33
    */
    boolean secondsKill(String pid, String userId);
}
```

## 修改GoodsServiceImpl

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0440fe73e67-9919-4855-ae3b-6e6222f44abe.jpg)

## 启动测试

### redis里面有数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image04607694015-a2b1-4d1d-90ac-b517f96660fc.jpg)

[http://127.0.0.1:8080/secondsKill?pid=18&userId=1](http://127.0.0.1:8080/secondsKill?pid=18&userId=1)

