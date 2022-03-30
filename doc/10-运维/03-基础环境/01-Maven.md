# Maven

# 01【掌握】maven概述

## **一，定义**

1，Maven 作为 Apache 的一个开源项目，旨在给项目管理提供更多的支持，它最早的意图只是为了给 apache 组织的几个项目提供统一的开发、测试、打包和部署，能让开发者在多个项目中方便的切换。

2，Maven 中最值得称赞的地方就是使用了标准的目录结构和部署。

3，在多个开发团队环境的情况下，Maven可以设置标准。由于大部分的项目设置简单可重复使用，使使Maven开发容易，创建报告，检查，生产和测试完全自动化设置。

4，maven是一个项目构建和管理的工具，提供了帮助管理 构建、文档、报告、依赖、scms、发布、分发的方法。可以方便的编译代码、进行依赖管理、管理二进制库等等。

5，maven的好处在于可以将项目过程规范化、自动化、高效化以及强大的可扩展性，利用maven自身及其插件还可以获得代码检查报告、单元测试覆盖率、实现持续集成等等。

## **二，基本原理**

Maven 的基本原理很简单，采用远程仓库和本地仓库以及一个类似 build.xml 的 pom.xml ，将 pom.xml 中定义的 jar 文件从远程仓库下载到本地仓库，各个应用使用同一个本地仓库的 jar ，同一个版本的 jar 只需下载一次，而且避免每个应用都去拷贝 jar 。

同时它采用了现在流行的插件体系架构，只保留最小的核心，其余功能都通过插件的形式提供，所以 maven 下载很小，在执行 maven 任务时，才会自动下载需要的插件。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1008662004297971.png)

mirror相当于一个拦截器，它会拦截maven对remote repository的相关请求，把请求里的remote repository地址，重定向到mirror里配置的地址。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6138167609150529.png)



此时，B Repository被称为A Repository的镜像。如果仓库X可以提供仓库Y存储的所有内容，那么就可以认为X是Y的一个镜像。换句话说，任何一个可以从仓库Y获得的构件，都能够从它的镜像中获取。

< mirrors/>是镜像列表，是maven从远程仓库里下载构件的一组服务器镜像。镜像能减轻中央maven库的负载，也能突破代理等的网络环境的限制，每个仓库都有一个ID，而mirror需要和仓库的ID对应。

---

## **三，坐标**

### （1）定义

坐标用来标识时空中的某个点，方便人们找到位置，如中电信息大厦可以用经纬度坐标找到，也可以通过国家、省市区、街道、门牌组成的坐标去找。

### （2）分类

groupId: 组织ID，一般是公司、团体名称

artifactId：实际项目的ID，一般是项目、模块名称

version:版本，开发中的版本一般打上 SNAPSHOT 标记

Type/packaging :包类型，如JAR,EAR,POM…

classifier:分类，如二进制包、源、文档

通过这个规则就可以定位到世界上任何一个构件。  

## **四，特点**

1，依赖管理是maven的一大特征，对于一个简单的项目，对依赖的管理并不是什么困难的事，但是如果这个项目依赖的库文件达到几十个甚至于上百个的时候就不是一个简单的问题了。在这个时候maven对于依赖管理的作用就显露出来了。

2，传递性依赖是在maven2中添加的新特征，这个特征的作用就是你不需要考虑你依赖的库文件所需要依赖的库文件，能够将依赖模块的依赖自动的引入。

3，由于没有限制依赖的数量，如果出现循环依赖的时候会出现问题，这个时候有两种方式处理，一种是通过 build-helper-maven-plugin 插件来规避，另一种就是重构两个相互依赖的项目。

4，通过传递性依赖，项目的依赖结构能够很快生成。Maven 能够解决依赖传递

5，传递依赖中需要关注的就是依赖调解，依赖调解的两大原则是：最短路径优先和第一声明优先

6，maven有三套classpath（编译classpath，运行classpath，测试classpath）分别对应构建的三个阶段。依赖范围就是控制依赖与这三套classpath的关系。

7，依赖范围有六种：

> compile：编译依赖范围，在三个classpath都有效。

> test：测试依赖范围，在编译代码和运行代码是无效。

> provided：以提供的依赖范围，在编译和测试的时候有效，在运行的时候无效。例如servlet-api,因为容器已经提供，在运行的时候是不需要的。

> runtime：运行时依赖范围，仅在测试和运行的时候有效。例如jdbc只有在测试和运行的时候才有效。

> system：系统依赖范围，与provided范围一致，但是依赖是通过系统变量来指定依赖，不利于移植。

> import(在maven2.0.9后支持)：导入依赖范围，对三个classpath没有实际影响。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.45850734076513744.png)

## **五，三级仓库结构**

（1）远程公用仓库

Maven 内置了远程公用仓库： [http://repo1.maven.org/maven2](http://repo1.maven.org/maven2) 这个公用仓库也叫中央仓库是由 Maven 自己维护，包好了世界上大部分流行的开源项目构件。 

[https://mvnrepository.com](https://mvnrepository.com/) 

（2）内部中央仓库

也称私有共享仓库(私服)。一般是由公司自己设立的，只为本公司内部共享使用。它既可以作为公司内部构件协作和存档，也可以作为公用类库镜像缓存，减少在外部访问和下载的频率。

（3）本地仓库

Maven 会将工程中依赖的构件(Jar包)从远程下载到本机一个目录下管理，通常默认在 \$user.home/.m2/repository 下。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6517100338971942.png)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5256178568948484.png)



# 02【掌握】eclipse集成maven插件

## 一，下载maven服务器

下载地址[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3b7276ee-e131-4c1d-a023-ac83f1443670.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabf35140e-2846-4812-9853-c129b8a7c6f8.png)

## 二，配置环境变量并测试

1，将下载的压缩文件解压到D盘

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac04ece2d-b483-4a97-a374-9e6a2427ce34.png)

2，配置M2\_HOME的环境变量

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4b3b8fc6-9da9-4273-9dba-7f2bd8f1d2c3.png)

3，配置path环境变量，在path值的末尾添加"%M2\_HOME%\\bin"

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad8c52dc3-749f-4b82-8d25-3d179ea8a8b0.png)

4，点击确定之后，打开cmd窗口：输入 mvn -version,出现如下内容表示安装成功  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2ebbf458-f878-4dc4-9c15-d99b7deb9ba9.png)

## 三，配置本地仓库

打开本地存放maven目录 例如：D:\\apache-maven-3.3.9,打开conf文件夹下的settings.xml文件，找到第53行，把注释去掉，

修改成：仓库路径  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad12e9cf9-d97a-4177-aebd-90a44b646a9a.png)

    关于仓库的说明  

1，以上的 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora22cc5f96-7021-4550-bb6e-238fa3e23b5d.jpg)

 是默认的本地仓库

2，中央仓库

        外网仓库，将开源的组件，或者工具上传到一个特定服务器（中央仓库）

        [http://mvnrepository.com/](http://mvnrepository.com/)

        现在使用阿里云的中央仓库。找到setting.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora642058e6-9bc8-41dd-86a3-81d96ebc348a.png)

```xml
<mirror>  
      <id>alimaven</id>  
      <name>aliyun maven</name>  
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
      <mirrorOf>central</mirrorOf>          
    </mirror>  
```

3，私服务  

公司自己搭建maven服务器，在局域网内使用。

---

**四，Maven项目的JDK配置**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora41f84860-e276-4698-a7dd-d22c81f888ed.png)

```xml
<profile>  
        <id>jdk1.8</id>  
        <activation>  
            <activeByDefault>true</activeByDefault>  
            <jdk>1.8</jdk>  
        </activation>  
        <properties>  
            <maven.compiler.source>1.8</maven.compiler.source>  
            <maven.compiler.target>1.8</maven.compiler.target>  
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>  
        </properties>  
    </profile>
```

---

**五，在eclipse下安装插件**

1、打开window->preferences->Maven->Installations 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa49083b9-015f-47c8-95b6-4f6c2b98308a.png)

2、点击Add,选择maven所在的目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa6a84285-0a54-4d07-826c-281c636ace3a.png)

3、点击左侧User Settings,选择maven所在目录下conf/settings.xml,确认maven仓库所在位置  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorace40d01e-2b95-4297-9dde-3530e65e185d.png)

4、选择java->Installed JREs,选择JDK，点EDIT  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora98d6f224-8f4f-4681-a929-b28509fd6c2f.png)

6、在Default VM Arguments中输入\[选择性配置\]

\-Dmaven.multiModuleProjectDirectory=M2\_HOME（注意前面的-不可省略）  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab72ccb1a-0812-439d-b7d2-9c6521f949f4.png)

7，到此所有的配置完成，接下来新建项目就可以了【但是还会有问题哦，在下面的创建项目中一一说明】

---

# 03【掌握】eclipse下创建java项目

**1，新建一个maven工程**

File-->new--other,然后如图所示，点击next  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa6f6d4b1-fdc8-4fda-976f-b604660a0a9b.png)

**2，选择简单项目**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabed310c1-f808-4829-bcf7-5749f217137b.png)

---

**3，填写包名和项目名**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora23c483ea-9fdd-4520-8e11-f07ff969b616.png)

---

\*\*4，Finish完成创建--项目目录说明
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae3cd8d45-5a10-403f-9e59-606eeecef072.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2c2ce01d-7336-4c45-a9cb-ec943855b060.png)

---

**5，给项目导入简单的依赖**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 建立项目自己的坐标 -->
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sxt</groupId>
    <artifactId>HelloMaven</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <!-- 添加第三方依赖 -->
    <dependencies>
        <!-- junit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.11</version>
            <scope>test</scope>
        </dependency>
        <!-- spring-beans -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>4.3.14.RELEASE</version>

            <!-- 排除掉 spring-beans 依赖的 spring-core -->
            <exclusions>
                <exclusion>
                    <groupId>org.springframework</groupId>
                    <artifactId>spring-core</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
</project>
```

**6，Maven坐标说明**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf5ce6308-db41-4c21-9036-2af9bd724772.png)

**groupId** ：定义当前Maven项目隶属的实际项目。首先，Maven项目和实际项目不一定是一对一的关系。比如SpringFrameWork这一实际项目，其对应的Maven项目会有很多，如spring-core,spring-context等。这是由于Maven中模块的概念，因此，一个实际项目往往会被划分成很多模块。其次，groupId不应该对应项目隶属的组织或公司。原因很简单，一个组织下会有很多实际项目，如果groupId只定义到组织级别，而后面我们会看到，artifactId只能定义Maven项目（模块），那么实际项目这个层次将难以定义。最后，groupId的表示方式与Java包名的表达方式类似，通常与域名反向一一对应。上例中，groupId为junit，是不是感觉很特殊，这样也是可以的，因为全世界就这么个junit，它也没有很多分支。

**artifactId** : 该元素定义当前实际项目中的一个Maven项目（模块），推荐的做法是使用实际项目名称作为artifactId的前缀。比如上例中的junit，junit就是实际的项目名称，方便而且直观。在默认情况下，maven生成的构件，会以artifactId作为文件头，如junit-3.8.1.jar，使用实际项目名称作为前缀，就能方便的从本地仓库找到某个项目的构件。

**version** : 该元素定义了使用构件的版本，如上例中junit的版本是3.8.1，你也可以改为4.0表示使用4.0版本的junit。

**packaging** ：定义Maven项目打包的方式，使用构件的什么包。首先，打包方式通常与所生成构件的文件扩展名对应，如上例中没有packaging，则默认为jar包，最终的文件名为junit-3.8.1.jar。也可以打包成war等。

**classifier**: 该元素用来帮助定义构建输出的一些附件。附属构件与主构件对应，如上例中的主构件为junit-3.8.1.jar,该项目可能还会通过一些插件生成如junit-3.8.1-javadoc.jar,junit-3.8.1-sources.jar, 这样附属构件也就拥有了自己唯一的坐标。

**上述5个元素中，groupId、artifactId、version是必须定义的，packaging是可选的（默认为jar），而classfier是不能直接定义的，需要结合插件使用。**

# 04【掌握】eclipse下maven项目聚合

**一，项目继承1**

## 1，建立maven\_parent父项目

项目的packaging：pom

Packaging为pom的项目，不用来开发java代码。用来声明整个系统中的所需要依赖的资源。

方便项目中依赖的统一管理。

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.bjsxt.parent</groupId>
  <artifactId>maven_parent</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>
  <!-- 对项目中需要的所有资源进行版本统一声明 -->
  <properties>
    <junit.version>4.11</junit.version>
    <spring.version>4.3.14.RELEASE</spring.version>
  </properties>
  <!-- 声明第三方依赖 -->
  <dependencies>
    <!-- junit -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${junit.version}</version>
        <scope>test</scope>
    </dependency>
    <!-- spring-beans -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>${spring.version}</version>
    </dependency>
  </dependencies>
</project>
```

## 2，建立bjsxtoa子项目

继承maven\_parent.

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5c7d7074-bb81-4256-8660-80ce433d42e3.png)

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <!-- 指定需要继承的项目的gav坐标 -->
  <parent>
    <groupId>com.bjsxt.parent</groupId>
    <artifactId>maven_parent</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <!-- 
    如果子项目的groupid和version和父项目相同，
    子项目可以不写
    groupid，version
   -->
  <groupId>com.bjsxt.oa</groupId>
  <artifactId>bjsxtoa</artifactId>
  <version>0.0.1-SNAPSHOT</version>

</project>

```

3，查看子项目的依赖  

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9828796154091526.png)

 

---

**二，项目继承2**

在继承的过程中，可以在子项目，做出选择。

## 1建立maven\_parent2父项目

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.bjsxt.parent2</groupId>
  <artifactId>maven_parent2</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>


  <!-- 对项目中需要的所有资源进行版本统一声明 -->
  <properties>
    <junit.version>4.11</junit.version>
    <spring.version>4.3.14.RELEASE</spring.version>
  </properties>


  <!-- 声明第三方依赖 
    dependencyManagement：
    声明在dependencyManagement
    里面的依赖资源，不会被直接继承
  -->
  <dependencyManagement>

    <dependencies>
        <!-- junit -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>${junit.version}</version>
            <scope>test</scope>
        </dependency>

        <!-- spring-beans -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>${spring.version}</version>
        </dependency>
    </dependencies>

  </dependencyManagement>
</project>

```

2建立bjsxtoa2子项目

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <!-- 指定父项目的gav坐标 -->
  <parent>
    <groupId>com.bjsxt.parent2</groupId>
    <artifactId>maven_parent2</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <groupId>com.bjsxt.oa2</groupId>
  <artifactId>bjsxtoa2</artifactId>
  <version>0.0.1-SNAPSHOT</version>

  <dependencies>
    <!-- 选择继承父项目中的资源 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
    </dependency>   
  </dependencies>
</project>

```

3查看子项目的依赖

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3896434485495244.png)

 

---

**三，项目聚合**

\*\*

使用maven的module项目，完成项目的拆分，将一个系统可以拆分为n个子系统（子项目）进行开发：

可以按照三层结果进行拆分，也可以按照项目的模块进行拆分。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora90e90e05-ff57-4110-9c4d-0ce21ddc2a4a.png)



\*\*

**1，建立maven\_jd\_car项目**

Packaging:pom项目

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.jd.car</groupId>
  <artifactId>maven_jd_car</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>pom</packaging>
  <!-- 一个聚合项目的四个module项目 -->
  <modules>
   <module>maven_jd_car_pojo</module>
   <module>maven_jd_car_dao</module>
   <module>maven_jd_car_service</module>
   <module>maven_jd_car_web</module>

  </modules>
</project>

```

\**2，建立maven\_****jd\_car\_pojo****项目*\*

Packaging: jar

继承：maven\_jd\_car

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>maven_jd_car_pojo</artifactId>
</project>

```

**3，建立maven\_jd\_car\_dao项目**

Packageing：jar

继承：maven\_jd\_car

依赖：maven\_jd\_car\_pojo

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>maven_jd_car_dao</artifactId>

  <!-- 
   添加依赖
   -->
   <dependencies>
     <!-- 依赖maven_jd_car_pojo -->
     <dependency>
      <groupId>com.jd.car</groupId>
      <artifactId>maven_jd_car_pojo</artifactId>
      <version>0.0.1-SNAPSHOT</version>
     </dependency>
   </dependencies>
</project>

```

**4，建立maven\_jd\_car\_service项目**

Packageing：jar

继承：maven\_jd\_car

依赖：maven\_jd\_car\_dao

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>maven_jd_car_service</artifactId>
  <dependencies>
   <!-- service依赖dao层 -->
   <dependency>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car_dao</artifactId>
    <version>0.0.1-SNAPSHOT</version>
   </dependency>
  </dependencies>
</project>

```

**5，建立mave\*\*\*\*n\_jd\_car\_web项目**

Packageing：war

继承：maven\_jd\_car

依赖：maven\_jd\_car\_service

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>maven_jd_car_web</artifactId>
  <dependencies>
   <!-- 依赖service -->
   <dependency>
    <groupId>com.jd.car</groupId>
    <artifactId>maven_jd_car_service</artifactId>
    <version>0.0.1-SNAPSHOT</version>
   </dependency>
  </dependencies>
</project>

```

# 05【掌握】eclipse下创建maven的WEB项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafaf4f8ac-881b-4803-84c5-96631c30f496.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraab04a807-ec9e-4e22-9220-778a8d11a6b1.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae02e5021-c263-4b90-a000-03904a6ff5a0.png)



**1，完成项目的目录结构**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa1fc9382-3d97-4c85-a53a-d1715c82e7aa.png)



**2，webap\*\*\*\*p目录**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad90ad556-a799-4daf-ae73-8d11d17512ef.jpg)



**3，导入web项\*\*\*\*目需要依赖**

Jsp,servlet,jstl.

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0eb62583-60f8-49de-a743-743571dcf945.jpg)

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.bjsxt.car</groupId>
  <artifactId>car</artifactId>
  <packaging>war</packaging>
  <version>0.0.1-SNAPSHOT</version>
  <name>car Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
    <!-- 添加jsp的依赖 -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jsp-api</artifactId>
       <version>2.0</version>
      <scope>provided</scope>
    </dependency>
    <!-- 添加servlet的依赖 -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
      <scope>provided</scope>
    </dependency>
    <!-- 添加jstl的依赖 -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
      <dependency>
          <groupId>taglibs</groupId>
          <artifactId>standard</artifactId>
          <version>1.1.2</version>
      </dependency>

  </dependencies>
  <build>
    <finalName>car</finalName>
  </build>
</project>

```

**4，配置tomc\*\*\*\*at插件**

用来部署，发布web项目。

```xml
<build>
    <finalName>car</finalName>
    <plugins>
     <plugin>
      <!--maven的tomcat插件 -->
      <groupId>org.apache.tomcat.maven</groupId>
      <artifactId>tomcat7-maven-plugin</artifactId>
      <version>2.2</version>
      <configuration>
       <uriEncoding>UTF-8</uriEncoding> <!--解决页面提交数据乱码问题 -->
       <port>8080</port><!-- tomcat插件的请求端口 --> 
       <path>/car</path><!-- 项目的请求路径 -->
      </configuration>
     </plugin>
    </plugins>
  </build>
```

**5，编写jsp文\*\*\*\*件**

**6，配置we\*\*b**.xml\*\*

**7，部署\*\*\*\*项目**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad17d69b0-5b78-4ccb-b856-dde35b2af422.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8a735988-e02d-4a14-84b2-09a3af5e2294.jpg)

**8，解决Can\*\*\*\*not change version of project facet Dynamic web module to 3.0**

1、打开项目所在目录下的.settings文件夹

1.1修改项目的设置，打开项目.settings目录下的org.eclipse.jdt.core.prefs（打开工具例如NOTEPAD++）

把1.5改成1.8，例如：

1.2打开org.eclipse.wst.common.project.facet.core.xml

把

```xml
<installed facet="java" version="1.5"/>改成
<installed facet="java" version="1.8"/>，
把 
<installed facet="jst.web" version="2.3"/>改成 <installed facet="jst.web" version="3.0"/>
```

2、打开存放依赖的pom.xml文件，修改最下面的

```xml
 <build>
      <finalName>D5.22hotai</finalName>
       <plugins>  
          <plugin>  
              <groupId>org.apache.maven.plugins</groupId>  
              <artifactId>maven-compiler-plugin</artifactId>  
              <version>3.3</version>  
              <configuration>  
                  <!-- 指定source和target的版本 -->                 
                 <source>1.8</source>  
                 <target>1.8</target>  
             </configuration>  
         </plugin>  
     </plugins>  
   </build>
```

3，重启eclipse或者右键选中工程maven→ Update Project...  

---

**9，开源项目的GAV坐标**  

[https://mvnrepository.com/](https://mvnrepository.com/)  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa4555bee-4fdd-4eeb-972a-939a7b63f430.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2374354b-43ff-4414-949d-ef5d268b33b5.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac287b57d-6382-46bb-af0f-334b0df1c5ae.png)

# 06【掌握】maven项目的自动部署

将开发好的项目打成war,上传到用户的服务器。

 1，配置tomcat的账户

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaa1a6f1a-d14a-4ebd-93aa-fe9b73328e0b.jpg)

 

```xml
<role rolename="admin-gui"/>
  <role rolename="admin-script"/>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>

  <user username="admin" password="admin"
      roles="admin-gui,admin-script,manager-gui,manager-script"/>
```

---

 **2，配置maven的settings.xml**

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora90429148-6c2d-467c-b45a-77d1633d31da.jpg)

 

\**3.****使用****admin\*\*\**登**陆**to\*\***mcat**

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5891795886856912.png)

 

---

**4，配置项目的pom.xml**

```xml
 <build>
        <!-- 打包生成war包的名字 -->
        <finalName>05_maven_web</finalName>
        <!-- 配置插件 -->
        <plugins>
            <!-- 配置tomcat的插件 -->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <uriEncoding>UTF-8</uriEncoding><!--  解决页面提交数据乱码问题 -->
                    <port>8080</port><!-- tomcat插件的请求端口 -->
                    <!-- <path>/bjsxt</path> --><!-- 项目的请求路径 -->
                    <!-- 指tomcat的manager项目的访问地址     
                    http://127.0.0.1:8080/manager
                    text必须要加，不加的话，使用maven打包的话不能帮我们把项目部署到tomcat7里面
                     -->
                    <url>http://localhost:8080/manager/text</url>
                    <!-- tomcat的登陆名和密码 -->
                    <username>admin</username>
                    <password>admin</password>
                    <!-- 打成war包的名字 -->
                    <path>/bjsxt</path>
                </configuration>
            </plugin>
        </plugins>

    </build>

```

---

 **5，使用eclipse启动部署**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabcfa3fa8-968c-4d37-831f-4975d0edece9.png)



---

**6，使用mvn命令部署**  

1，切换到项目目录 

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5066993995002389.png)

 、

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7147492084267362.png)

 

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4953d2c0-03c0-4f5b-88b6-d00b61d939b1.png)

tomcat的webapps下面看

---

## 7.注意点

以上的操作：tomcat状态必须是启动状态

热部署==热修复

# 07【掌握】使用maven重构springmvc的项目

**一，背景**

    前期完成了出租车管理的项目，接下使用maven来重构这个项目  

**二，创建项目CarRent**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5362b0e9-8830-468d-b4fa-80b0e68a97d7.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae20404d8-ac4b-4bde-8529-04ed1ddbcaff.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora65a75803-1f5b-4535-a8bd-d4d71e0c9594.png)

**创建成功之后不显示java  的源代码目录**

**解决方法**

1.eclipse->window>preferences->java->compiler->选择本地要用的Java版本

2.eclipse->window>preferences->java->installJars->修改为本地jdk

3.项目右键->buildPath configure Build Path->点击选项卡Libraries->选中JRE System Library->

点击edit->选中Alternate JRE->选择jdk

4.点击finish，点击ok，自动出现src/main/java和src/test/java

也就是项目的JDK版本必须和使用的当前eclipse的版本一样



---

**三，创建项目相关的包**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0abfb4b4-2657-481f-b536-d27626b9f059.png)

---

\*\*四，拷贝原项目的相关代码
\*\*

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0d7b4764-f206-411e-b14c-ca9dc08c4280.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4d91b396-c743-4b9b-81af-225c621cb86c.png)



---

**五，配置web.xml**

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

---

**五，配置pom.xml**

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sxt.carrent</groupId>
    <artifactId>Carrent</artifactId>
    <packaging>war</packaging>
    <version>0.0.1-SNAPSHOT</version>
    <name>汽车出租系统 Maven Webapp</name>
    <url>http://maven.apache.org</url>

    <!-- jar包版本声明 -->
    <properties>
        <servlet.version>3.1.0</servlet.version>
        <jsp.version>2.3.1</jsp.version>
        <jstl.version>1.2</jstl.version>
        <mybatis.version>3.4.6</mybatis.version>
        <mybatis-spring.version>1.3.2</mybatis-spring.version>
        <spring.version>4.3.13.RELEASE</spring.version>
        <druid.version>1.0.18</druid.version>
        <mysql.version>5.1.39</mysql.version>
        <jackson.version>2.9.0</jackson.version>
        <fileupload.version>1.3.1</fileupload.version>
        <pagehelper.version>5.1.1</pagehelper.version>
        <!-- 注意只能使用2.0以下的版本 -->
        <log4j.version>1.2.17</log4j.version>
    </properties>


    <dependencies>
        <!-- 导入jsp -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <version>${jsp.version}</version>
            <scope>provided</scope>
        </dependency>
        <!-- 导入servlet -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>${servlet.version}</version>
            <scope>provided</scope>
        </dependency>

        <!-- 导入jstl -->
        <dependency>
            <groupId>javax.servlet.jsp.jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>${jstl.version}</version>
        </dependency>
        <!-- pagepelper -->
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>${pagehelper.version}</version>
        </dependency>
        <!-- mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>${mybatis.version}</version>
        </dependency>
        <!-- mybatis-spring -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>${mybatis-spring.version}</version>
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
            <artifactId>spring-jdbc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <!-- springmvc -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- mysql数据库驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql.version}</version>
        </dependency>
        <!-- json -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>${jackson.version}</version>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>${jackson.version}</version>
        </dependency>

        <!-- 文件上传 -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>${fileupload.version}</version>
        </dependency>
        <!-- log4j -->
         <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>${log4j.version}</version>
        </dependency>


    </dependencies>
    <build>
        <finalName>Carrent</finalName>
        <plugins>
            <plugin>
                <!--maven的tomcat插件 -->
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>8080</port><!-- tomcat插件的请求端口 -->
                    <path>/car</path><!-- 项目的请求路径 -->
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

```

---

**六，导入jsp文件和静态资源文件**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8323fc9b-a18d-4557-a902-7b8c30755925.png)

---

**七，发布项目运行**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7ec62868-8b1b-485b-aea6-a5dd219ce74d.png)

访问[http://127.0.0.1:8080/car/index.jsp](http://127.0.0.1:8080/car/index.jsp)

# 08【掌握】分项目重构springmvc的项目

## 一，创建工具项目rent\_car\_commons

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9a73c138-a344-4567-ab2d-3ff60fa2cd02.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac6e0e511-60a6-4039-8996-6deeb01c82a3.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora79e535a4-3cc8-409a-91c0-77f8a457a962.png)

## 二，创建maven-pom的主项目rent\_car

Packaging : pom

依赖：rent\_car\_commons

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora739732a4-398e-411e-8c7e-ee8c4c7ed67f.png)

配置一些要依赖的包

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.sxt.rent</groupId>
    <artifactId>car_rent</artifactId>
    <packaging>pom</packaging>
    <version>0.0.1-SNAPSHOT</version>
    <name>car_rent Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <!-- jar包版本声明 -->
    <properties>
        <servlet.version>3.1.0</servlet.version>
        <jsp.version>2.3.1</jsp.version>
        <jstl.version>1.2</jstl.version>
        <mybatis.version>3.4.6</mybatis.version>
        <mybatis-spring.version>1.3.2</mybatis-spring.version>
        <spring.version>4.3.13.RELEASE</spring.version>
        <druid.version>1.0.18</druid.version>
        <mysql.version>5.1.39</mysql.version>
        <jackson.version>2.9.0</jackson.version>
        <fileupload.version>1.3.1</fileupload.version>
        <pagehelper.version>5.1.1</pagehelper.version>
        <!-- 注意只能使用2.0以下的版本 -->
        <log4j.version>1.2.17</log4j.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.sxt.utils</groupId>
            <artifactId>rent_car_commons</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
    </dependencies>
    <!-- 声明需要的依赖的具体的资源 -->
    <dependencyManagement>
        <dependencies>
            <!-- 导入jsp -->
            <dependency>
                <groupId>javax.servlet.jsp</groupId>
                <artifactId>javax.servlet.jsp-api</artifactId>
                <version>${jsp.version}</version>
                <scope>provided</scope>
            </dependency>
            <!-- 导入servlet -->
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>javax.servlet-api</artifactId>
                <version>${servlet.version}</version>
                <scope>provided</scope>
            </dependency>

            <!-- 导入jstl -->
            <dependency>
                <groupId>javax.servlet.jsp.jstl</groupId>
                <artifactId>jstl</artifactId>
                <version>${jstl.version}</version>
            </dependency>
            <!-- pagepelper -->
            <dependency>
                <groupId>com.github.pagehelper</groupId>
                <artifactId>pagehelper</artifactId>
                <version>${pagehelper.version}</version>
            </dependency>
            <!-- mybatis -->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>${mybatis.version}</version>
            </dependency>
            <!-- mybatis-spring -->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis-spring</artifactId>
                <version>${mybatis-spring.version}</version>
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
                <artifactId>spring-jdbc</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-tx</artifactId>
                <version>${spring.version}</version>
            </dependency>

            <!-- springmvc -->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>${spring.version}</version>
            </dependency>
            <!-- mysql数据库驱动 -->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
            <!-- json -->
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>${jackson.version}</version>
            </dependency>
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-core</artifactId>
                <version>${jackson.version}</version>
            </dependency>

            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-annotations</artifactId>
                <version>${jackson.version}</version>
            </dependency>
            <!-- 文件上传 -->
            <dependency>
                <groupId>commons-fileupload</groupId>
                <artifactId>commons-fileupload</artifactId>
                <version>${fileupload.version}</version>
            </dependency>
            <!-- log4j -->
            <dependency>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
                <version>${log4j.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
```

## 三，创建rent\_car\_domain 的模块

Packaging : jar

继承：rent\_car

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6ed3f97e-582e-4997-b955-2efd62e9208a.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora713a43bd-6f73-4dc2-b646-728effd5aead.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab85f61cf-26aa-48d8-afd9-05390d1e9080.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8ce8d6ba-6420-4ef9-86a4-01237b9fdf0f.png)

## 四，创建rent\_car\_mapper的模块

Packaging : jar

继承：rent\_car

依赖：rent\_car\_domain

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>com.bjsxt.rent</groupId>
    <artifactId>rent_car</artifactId>
    <version>0.0.1-SNAPSHOT</version>
  </parent>
  <artifactId>rent_car_mapper</artifactId>

  <dependencies>
    <!-- pagepelper -->
    <dependency>
        <groupId>com.github.pagehelper</groupId>
        <artifactId>pagehelper</artifactId>
     </dependency>
    <!-- 依赖rent_car_domain -->
    <dependency>
        <groupId>com.bjsxt.rent</groupId>
        <version>0.0.1-SNAPSHOT</version>
        <artifactId>rent_car_domain</artifactId>
    </dependency>
    <!-- mybatis -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
    </dependency>
    <!-- mybatis_spring -->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
    </dependency>
    <!-- datasource -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
    </dependency>
    <!-- mysql数据库驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>   
  </dependencies>
</project>

```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3bc40571-168d-4648-8e63-b20f124f265e.png)

## 五，创建rent\_car\_service 的模块

Packaging : jar

继承：rent\_car

依赖：rent\_car\_mapper

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.sxt.rent</groupId>
        <artifactId>car_rent</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <artifactId>rent_car_service</artifactId>

    <dependencies>
        <!-- 依赖rent_car_domain模块 因为里面有vo -->
        <dependency>
            <groupId>com.sxt.rent</groupId>
            <artifactId>rent_car_domain</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- 依赖rent_car_mapper模块 -->
        <dependency>
            <groupId>com.sxt.rent</groupId>
            <artifactId>rent_car_mapper</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- 依赖rent_car_commons项目 -->
        <dependency>
            <groupId>com.sxt.utils</groupId>
            <artifactId>rent_car_commons</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- 加入spring的依赖 -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aspects</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </dependency>
    </dependencies>
</project>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6c9ae124-02e6-49d6-9218-ba63e3ad8a71.png)

## 六，创建rent\_car\_web 的模块

Packaging : war

继承：rent\_car

依赖：rent\_car\_service

注意选择web项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora28747605-a707-4357-8a99-731e0a9d6ef6.png)

next

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab109d426-c7c9-4415-8196-68b242085fc7.png)

next

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora20137ce3-e770-48f2-a3e8-fdb3cca31dff.png)

pom

```xml
<?xml version="1.0"?>
<project
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
    xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.sxt.rent</groupId>
        <artifactId>car_rent</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </parent>
    <artifactId>rent_car_web</artifactId>
    <packaging>war</packaging>
    <name>rent_car_web Maven Webapp</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>com.sxt.rent</groupId>
            <artifactId>rent_car_service</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
        <!-- 导入jsp -->
        <dependency>
            <groupId>javax.servlet.jsp</groupId>
            <artifactId>javax.servlet.jsp-api</artifactId>
            <scope>provided</scope>
        </dependency>
        <!-- 导入servlet -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <scope>provided</scope>
        </dependency>

        <!-- 导入jstl -->
        <dependency>
            <groupId>javax.servlet.jsp.jstl</groupId>
            <artifactId>jstl</artifactId>
        </dependency>
        <!-- springmvc -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
        </dependency>
        <!-- json -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <!-- upload -->
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
        </dependency>
        <!-- log4j -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </dependency>
    </dependencies>
    <build>
        <finalName>rent_car_web</finalName>
    </build>
</project>

```

导入静态资源和jsp

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad8ee8ca6-f9d0-46bf-a2c0-d89685e5712b.png)

拷贝resources

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora30166d5e-2a60-4aa9-97f1-723aeef5b1cd.png)

拷贝controller

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab1044d66-5f6f-4fb2-88ea-a1593492cbb4.png)

配置web.xml

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

**七，发布运行项目**  

修改rent\_car的pom

```xml
<build>
        <finalName>car_rent</finalName>
        <plugins>
            <plugin>
                <!--maven的tomcat插件 -->
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
                <configuration>
                    <port>8080</port><!-- tomcat插件的请求端口 -->
                    <path>/car</path><!-- 项目的请求路径 -->
                </configuration>
            </plugin>
        </plugins>
    </build>
```

可以看到里面有模块的包含

不用手动去写，在创建的时选父项目之后就自动配置了哦

```xml
    <modules>
        <module>rent_car_domain</module>
        <module>rent_car_mapper</module>
        <module>rent_car_service</module>
        <module>rent_car_web</module>
    </modules>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac85419b8-910f-4686-baba-ef6ee01390a4.png)

访问

[http://127.0.0.1:8080/car/index.jsp](http://127.0.0.1:8080/car/index.jsp)

