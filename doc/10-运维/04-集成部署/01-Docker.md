# 01【熟悉】docker简介

## 1，什么是docker

        Docker是一个开项目，诞生于2013年初，最初是dotCloud公司内部的一个业余项目。它基于Google公司推出的Go语言实现。项目后来加入了Linux基金会，遵从了Apache2.0协议，项目代码在GitHub上进行维护。Docker自开源后受到广范的关注和讨论，以至于dotCloud公司后来都改名为Docker Inc。RedHat已经在其RHEL6.5中集中支持Docker;Google也在其PaaS产品中广泛应用。Docker的目标是实现经量级的操作系统虚拟化解决方案。Docker的基础是Linux容器（LXC）等技术。在LXC的基础上Docker进行了进一步的封装，让用户不需要关心容器的管理，使得操作更加简单。用户操作Docker的容器就像操作一个快速轻量级的虚拟机一样简单。

        下图比较了Docker和传统虚拟化方式的不同之处，可见容器是在操作系统层面上实现的虚拟化，直接复用本地主机的操作系统，而传统方式则是在硬件层现实现

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradaa75e7f-a2ee-437a-8553-e296cc261d59.jpg)

---

## 2，docker的设计思想

        Docker的思想来自于集装箱，集装箱解决了什么问题？在一艘大船上，可以把货物规整的摆放起来。并且各种各样的货物被集装箱标准化了，集装箱和集装箱之间不会互相影响。那么我就不需要专门运送水果的船和专门运送化学品的船了。只要这些货物在集装箱里封装的好好的，那我就可以用一艘大船把他们都运走。docker就是类似的理念。现在都流行云计算了，云计算就好比大货轮。docker就是集装箱。

1.不同的应用程序可能会有不同的应用环境，比如.net开发的网站和php开发的网站依赖的软件就不一样，如果把他们依赖的软件都安装在一个服务器上就要调试很久，而且很麻烦，还会造成一些冲突。比如IIS和Apache访问端口冲突。这个时候你就要隔离.net开发的网站和php开发的网站。常规来讲，我们可以在服务器上创建不同的虚拟机在不同的虚拟机上放置不同的应用，但是虚拟机开销比较高。docker可以实现虚拟机隔离应用环境的功能，并且开销比虚拟机小，小就意味着省钱了。

2.你开发软件的时候用的是Ubuntu，但是运维管理的都是centos，运维在把你的软件从开发环境转移到生产环境的时候就会遇到一些Ubuntu转centos的问题，比如：有个特殊版本的数据库，只有Ubuntu支持，centos不支持，在转移的过程当中运维就得想办法解决这样的问题。这时候要是有docker你就可以把开发环境直接封装转移给运维，运维直接部署你给他的docker就可以了。而且部署速度快。

3.在服务器负载方面，如果你单独开一个虚拟机，那么虚拟机会占用空闲内存的，docker部署的话，这些内存就会利用起来。

总之docker就是集装箱原理。



---

## 3，为什么要使用docker

        作为一种新兴的虚拟化方式，Docker 跟传统的虚拟化方式相比具有众多的优势。首先，Docker 容器的启动可以在秒级实现，这相比传统的虚拟机方式要快得多。其次，Docker 对系统资源的利用率很高，一台主机上可以同时运行数千个Docker 容器。

容器除了运行其中应用外，基本不消耗额外的系统资源，使得应用的性能很高，同时系统的开销尽量小。

传统虚拟机方式运行10 个不同的应用就要起10 个虚拟机，而Docker 只需要启动10 个隔离的应用即可。具体说来，Docker 在如下几个方面具有较大的优势。

### 1，更快速的交付和部署

对开发和运维（devop）人员来说，最希望的就是一次创建或配置，可以在任意地方正常运行。开发者可以使用一个标准的镜像来构建一套开发容器，开发完成之后，运维人员可以直接使用这个容器来部署代码。Docker 可以快速创建容器，快速迭代应用程序，并让整个过程全程可见，使团队中的其他成员更容易理解应用程序是如何创建和工作的。Docker 容器很轻很快！容器的启动时间是秒级的，大量地节约开发、测试、部署的时间.

### 2，更轻松的迁移和扩展

Docker 容器几乎可以在任意的平台上运行，包括物理机、虚拟机、公有云、私有云、个人电脑、服务器

等。这种兼容性可以让用户把一个应用程序从一个平台直接迁移到另外一个。

### 3，更简单的管理

使用Docker，只需要小小的修改，就可以替代以往大量的更新工作。所有的修改都以增量的方式被分发和更新，从而实现自动化并且高效的管理。对比虚拟机

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora212dc76e-0c2d-493d-af45-3765188d8b96.jpg)

---

3，docker的局限性  

1. Docker是基于Linux 64bit的，无法在32bit的linux/Windows/unix环境下使用  
2. LXC是基于cgroup等linux kernel功能的，因此container的guest系统只能是linux base的  
3. 隔离性相比KVM之类的虚拟化方案还是有些欠缺，所有container公用一部分的运行库  
4. 网络管理相对简单，主要是基于namespace隔离  
5. cgroup的cpu和cpuset提供的cpu功能相比KVM的等虚拟化方案相比难以度量(所以dotcloud主要是按内存收费)  
6. Docker对disk的管理比较有限  
7. container随着用户进程的停止而销毁，container中的log等用户数据不便收集

---

\*\*4，docker在开发、测试、部署中的定位
\*\*

### 1，尝试新软件

对开发者而言，每天会催生出的各式各样的新技术都需要尝试，然而开发者却不太可能为他们一一搭建好环境并进行测试。时间非常宝贵，正是得益于 Docker，让我们有

可能在一条或者几条命令内就搭建完环境。Docker 有一个傻瓜化的获取软件的方法，Docker 后台会自动获得环境镜像并且运行环境。

并不仅仅是新技术环境搭建用得到 Docker。如果你想快速在你的笔记本上运行一个 MySQL 数据库，或者一个 Redis 消息队列，那么使用 Docker 便可以非常容易地做到。例如 Docker 只需要一条命令便可以运行 MySQL 数据库：docker run -d -p 3306:3306 tutum/mysql。

### 2，进行演示

工作中自己开发的成果对客户或者别人做一两个演示。搭建演示环境的过程非常麻烦。Docker是演示这些工具的最合理的方式。同时，对于客户来说，可以直接将 Docker 镜像提供给他们，而不必去做任何环境配置的工作，工作的效果也会和在他们演示中所看到的一模一样，同时不必担心他们的环境配置会导致我们的产品无法运行。

### 3，避免“我机器上可以运行”

无论是上一篇介绍的企业部署 Docker 还是本文的个人 Docker 用例，都提到了这个情况。因为环境配置不同，很多人在开发中也会遇到这个情况，甚至开发的软件到了测试人员的机器上便不能运行。但这都不是重点。重点是，如果我们有一个可靠的、可分发的标准开发环境，那么我们的开发将不会像现在这么痛苦。Docker 便可以解决这个问题。Docker 镜像并不会因为环境的变化而不能运行，也不会在不同的电脑上有不同的运行结果。可以给测试人员提交含有应用的 Docker 镜像，这样便不再会发生“在我机器上是可以运行的”这种事情，很大程度上减轻了开发人员测试人员互相检查机器环境设置带来的时间成本。

### 4，更好地利用资源

虚拟机的粒度是“虚拟出的机器”，而 Docker 的粒度则是“被限制的应用”，相比较而言 Docker 的内存占用更少，更加轻量级。对我来说这是 Docker 的一个优势：因为在如果在电脑中运行多个 Docker 应用，使用 Docker 比使用虚拟机更加简单，方便，粒度更细，也能持续地跟踪容器状态。

### 5，为微服务定制

我们一直在讲“微服务（Microservices）”的概念。Docker 可以很好地和微服务结合起来。从概念上来说，一个微服务便是一个提供一整套应用程序的部分功能，Docker 便可以在开发、测试和部署过程中一直充当微服务的容器。甚至生产环境也可以在 Docker 中部署微服务。

### 6，在云服务提供商之间移植

大多数的云主机提供商已经全面支持 Docker。对于开发人员来说，这表示你可以很方便地切换云服务提供商，当然也可以很方便地将你本地的开发环境移动到云主机上，不需要本地上配置一次运行环境、在云主机上还配置一次运行环境。全面部署 Docker (Docker here and Docker there) 作为标准运行环境可以极大地减轻应用上线时的工作量和产生 BUG。

### 7，技术的创新

Docker 正在快速发展，工具也在不断更新，没有人能预见到未来 Docker 会是什么样子的。你在复杂的系统中 Docker 使用的越多，越是可能会发现技术上的空白和未来技术发展的方向。现在还处在 Docker 的发展期，任何你使用 Docker 创建的工具都有可能成为社区关注的热点。这是 Docker 的机会，也是成就你自己的机会。

# 02【掌握】docker和虚拟技术比较

## 1，之前的虚拟技术

虚拟机（virtual machine）就是带环境安装的一种解决方案。

它可以在一种操作系统里面运行另一种操作系统，比如在Windows 系统里面运行Linux 系统。应用程序对此毫无感知，因为虚拟机看上去跟真实系统一模一样，而对于底层系统来说，虚拟机就是一个普通文件，不需要了就删掉，对其他部分毫无影响。这类虚拟机完美的运行了另一套系统，能够使应用程序，操作系统和硬件三者之间的逻辑不变。  



![image](data:image/png;base64,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)

  

虚拟机的缺点：

1 资源占用多 2 冗余步骤多 3 启动慢

---

## 2，docker容器化技术

    由于前面虚拟机存在这些缺点，Linux 发展出了另一种虚拟化技术：Linux 容器（Linux Containers，缩写为 LXC）。



Linux 容器不是模拟一个完整的操作系统，而是对进程进行隔离。有了容器，就可以将软件运行所需的所有资源打包到一个隔离的容器中。容器与虚拟机不同，不需要捆绑一整套操作系统，只需要软件工作所需的库资源和设置。系统因此而变得高效轻量并保证部署在任何环境中的软件都能始终如一地运行。

![image](data:image/png;base64,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7fc+6fHIyOhfrf3qFsDfNPT//C7jodH9YeT/bR1wRy3531b1bzs/NDCUeSz/lbfHpTsHbz7NriWyyOT/vOzLEPC76v6fXnw5+qF/ZNG+QXcU+fMayB915Mpff+KjPV519Kutvvz8lNWz6+3I9vahR92ZwvDI6G9XJg5njo2O5jr8X1ZkDpn8Qgbf/3l48HPRbTH+7aI+2a6MFho7LwzdepY8w/9an4wsyJ/XQP6ow8n/c3a1bw9Sdc7cziwH3veP/PGCTPHX83ptFfDjpSGrkD0vw+l/+vTfa/v/bHHfH2ZvFjj5/745I7P2AnoSFZ++Tl5iS1umhhYa/6kqGUfkuTIX7iWjA/LnNZA/6nDy51Ky48uSXmHjgjxsOPnR4uHLjKLXHidOZk/KKJ26QWjyq7LLnLuTGUf6P45aseNh5nk0+btn7nycybzqSUYH5M9rIH/U4eSXqGuOf+wZyMj2rm/kXy9MpuJfjTc6GE8+T+BWPHbjy5eFFib/+btf8lrwKzPwWf7nbzMvNxatBawC8uc1kD/qyN3zq7hoX/IN/76OZEmv6MvmNM/bXX0X/7M+uSmYPWP08LUvp1iY/NoLuExKftvkd70dST3z361Lnhn58xrIH3Wk5FfYrls4Ay3zpnfkTxZ8uUufG1Z/CvIf6szUGBoe/Yvl4z8z8uc1kD/qGCv/b1f2Jff234z8UfYr+vIfk+XAo+7hBXsGNTOvODyo7fo/bk5uDdjRKcj/V2v7MzWy3x0ubck8c8XewbafPlW1JN/2IX9eA/mjjrHyK9afTr7zW3c6+c5PuwDL5OK+6rfiFORX1J/4OHbfX304eV3kz2sgf9Txq9Jeu80+a/uXO/ya8OWkkmuOf9ToYMm/bx7YeWFI03LHg0+7Lg6p6O7t2zPk/uzHQqcrPzvnuwO9ijKrj331O4K/rM/8OkhjhJ655erQ/9068C/mJ4eWHRxUfS03XGXiOwbyE0SkgfwEEWkgP0FEGshPEJEG8hNEpIH8BBFpID9BRBrITxCRBvITRKSB/AQRaSA/QUQayE8QkQbyE0SkgfwEEWkgP0FEGshPEJEG8hNEpIH8BBFpID9BRBrITxCRBvITRKSB/AQRaSA/QUQayE8QkQbyE0SkEYz8v132liCI7xuJYN+JvMgPADMf5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiBTkB4gU5AeIFOQHiJRE/tsAEBmJ/AAQIcgPECnIDxAlo6P/HzGIFOujodNFAAAAAElFTkSuQmCC)

比较了 Docker 和传统虚拟化方式的不同之处：

**\*传统虚拟机技术是虚拟出一套硬件后，在其上运行一个完整操作系统，在该系统上再运行所需应用进程；**

**\*而容器内的应用进程直接运行于宿主的内核，容器内没有自己的内核，而且也没有进行硬件虚拟。因此容器要比传统虚拟机更为轻便。**

**\* 每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。**



---

## 3，开发和运维的春天

容器技术特点：一次构建，到处运行\[雷哥教你再也不用纠结环境问题啦\]

**1，更快的应用交付和部署。**传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。

2，**更快的和扩缩容。**随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。

**3，更简单的系统运维。**应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。

**4，更高效的计算资源利用。**　Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。



---

## 4，企业级应用

新浪

![image-20220330161926989](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoratyporaimage-20220330161926989.png)

![image-20220330161935863](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoratyporaimage-20220330161935863.png)

![image-20220330161940686](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoratyporaimage-20220330161940686.png)

![image-20220330161945483](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoratyporaimage-20220330161945483.png)

美团

![image-20220330161955651](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoratyporaimage-20220330161955651.png)

等等………………

# 03【掌握】docker下载

## 1，Docker 下载

1，官网 [http://www.docker.com](http://www.docker.com/)

2，中文官网 [https://docker-cn.com](https://docker-cn.com/)

3，仓库  [https://hub.docker.com](https://hub.docker.com/)

---

## 2，Docker 安装前提说明

### 2.1 CentOS Docker 安装

Docker支持以下的CentOS版本：

CentOS 7 (64-bit)

CentOS 6.5 (64-bit) 或更高的版本

### 2.2 前提条件

目前，CentOS 仅发行版本中的内核支持 Docker。

Docker 运行在 CentOS 7 上，要求系统为64位、系统内核版本为 3.10 以上。\[我们基于7以上的版本来讲的哦\]

Docker 运行在 CentOS-6.5 或更高的版本的 CentOS 上，要求系统为64位、系统内核版本为 2.6.32-431 或者更高版本\[。

### 2.3 查看自己的内核

uname命令用于打印当前系统相关信息（内核版本号、硬件架构、主机名称和操作系统类型等）。

```python
uname -r 
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaa0e2e75-fe3c-4d93-8151-c7add4c92a41.png)

版本OK木有问题

注意在centos6.5下面也可以安装。但是有点麻烦。想装的可以自己去查资源



---

## 3，Docker 的基本组成

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3072053002081556.png)

# 04【掌握】docker安装

## 1，centos 下安装Docker 文档

https://docs.docker.com/install/linux/docker-ce/centos/

## 2，Docker 安装

### 2.1，确定是centos7的版本

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7871d434-5599-44c8-a268-bc60127c9fa7.png)

### 2.2，yum安装gcc相关

```python
1，确定centos7能上外网
2，yum -y install gcc
3，yum -y install gcc-c++
```

### 2.3，卸载旧版本

```python
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

### 2.4，安装方法

```python
yum install docker
```

### 2.5，启动docker

```python
systemctl start docker
```

### 2.6，查看版本

```python
docker version
```

### 2.7，测试运行 hello-world

```python
docker run hello-world
```

由于本地没有hello-world这个镜像，所以会下载一个hello-world的镜像，并在容器内运行。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracf799e19-cee3-49e8-b2d2-a39d9f02dac7.png)

### 2.8，测试运行nginx

```bash
docker run -p 8080:80 -d docker.io/nginx   //将80端口映射为8080，或者80:80还是原先的80端口，不可以不写。
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2a58ba0e-f688-448d-bf07-e977a14d9045.png)

测试

[http://192.168.15.134:8080/](http://192.168.15.134:8080/)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac0ccab13-911b-4496-bdf4-9c259d6162fa.png)

是不是很爽呀

### 2.9，卸载docker

```bash
systemctl stop docker
yum -y remover docker
rm -rf /var/lib/docker
```

---

---

# 05【掌握】docker加速配置和run

## 1，说明

Docker 运行容器前需要本地存在对应的镜像，如果镜像不存在本地，Docker 会从镜像仓库下载（默认是Docker Hub 公共注册服务器中的仓库）。

---

## 2， 获取镜像

通过网址可以找到目标镜像 [https://hub.docker.com/explore/](https://hub.docker.com/explore/)

![image-20220330162213583](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162213583.png)

可以使用docker pull 命令来从仓库获取所需要的镜像。

下面的例子将从Docker Hub 仓库下载一个Ubuntu 18.04 操作系统的镜像。

```
docker pull ubuntu:18.04
该命令实际上相当于sudo docker pull registry.hub.docker.com/ubuntu:18.04
```

![image-20220330162234669](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162234669.png)

从上面可以看出下载的很慢，因为docker默认是从docker Hub上下载的，而这个镜像地址在国外，所有很慢，我们可要其它镜像地址，如国内的

```python
sudo docker pull registry.docker-cn.com/library/ubuntu:18.04
```

这样下载就很比刚才快很多了哦  

---

## 3，阿里云镜像加速

1.登录：[https://dev.aliyun.com/search.html](https://dev.aliyun.com/search.html)

2.登录阿里云 搜索   容器镜像服务  找到后如下图

![image-20220330162252646](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162252646.png)

![image-20220330162257265](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162257265.png)

可以看到加速器地址哦

编辑配置文件

vi /etc/docker/daemon.json

拷贝下面的内容/etc/docker/daemon.json中

{ "registry-mirrors": ["https://32xw0apq.mirror.aliyuncs.com"] }

![image-20220330162307703](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162307703.png)

执行下面两条命令  刷新docker的配置

systemctl daemon-reload 

sudosystemctl restart docker

![image-20220330162315236](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162315236.png)

**不指定版本会默认下载最新版**

已经编辑好的命令：

```
1. 安装／升级Docker客户端
推荐安装1.10.0以上版本的Docker客户端，参考文档 docker-ce

2. 配置镜像加速器
针对Docker客户端版本大于 1.10.0 的用户
您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
{
  "registry-mirrors": ["https://h8vcychj.mirror.aliyuncs.com"]
}
然后运行：
systemctl daemon-reload
systemctl restart docker
```

## 4，下载其它镜像

如tomcat

![image-20220330162338485](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162338485.png)

```
docker pull tomcat:8.5
```

## 5，docker镜像的相关常用命令

> 5.1 列出所有镜像

> docker images 

> 5.2 根据镜像id删除镜像

> docker rmi 镜像id 



---

## 6，docker run了啥

![image-20220330162403360](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162403360.png)

# 06【掌握】docker底层原理

## 1，Docker是如何工作的

Docker是一个Client-Server结构的系统，Docker守护进程运行在主机上， 然后通过Socket连接从客户端访问，守护进程从客户端接受命令并管理运行在主机上的容器。 容器，是一个运行时环境，就是我们前面说到的集装箱。 

![image-20220330162443149](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162443149.png)

## **2，为什么Docker比VM快**

(1)docker有着比虚拟机更少的抽象层。由亍docker不需要Hypervisor实现硬件资源虚拟化,运行在docker容器上的程序直接使用的都是实际物理机的硬件资源。因此在CPU、内存利用率上docker将会在效率上有明显优势。

(2)docker利用的是宿主机的内核,而不需要Guest OS。因此,当新建一个容器时,docker不需要和虚拟机一样重新加载一个操作系统内核。仍而避免引寻、加载操作系统内核返个比较费时费资源的过程,当新建一个虚拟机时,虚拟机软件需要加载Guest OS,返个新建过程是分钟级别的。而docker由于直接利用宿主机的操作系统,则省略了返个过程,因此新建一个docker容器只需要几秒钟。

![image-20220330162454540](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162454540.png)

![image-20220330162500029](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162500029.png)

# 07【掌握】docker命令\[帮助+镜像\]

## 1，帮助命令

```bash
docker version 查看docker版本
docker info 显示全系统信息
docker --help 显示docker相关的所有命令及功能说明
```

## 2，镜像命令

### 2.1 docker images  列表本机上的镜像

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora69fe9c56-ac42-4949-8521-7d717386d805.png)

```bash
REPOSITORY：表示镜像的仓库源
TAG：镜像的标签
IMAGE ID：镜像ID
CREATED：镜像创建时间
SIZE：镜像大小
```

同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本，我们使用 REPOSITORY:TAG 来定义不同的镜像。

如果你不指定一个镜像的版本标签，例如你只使用 ubuntu，docker 将默认使用 ubuntu:latest 镜像

docker images -\[options\]的说明

```bash
-a 列表本地的所有镜像及子镜像
-q 只显示镜像ID
--digests 显示镜像的摘要信息
--no-trunc 显示完整的镜像信息

```

---

### 2.2 docker seach 镜像搜索命令

搜索网站:[https://hub.docker.com](https://hub.docker.com/)

语法

```bash
docker search 镜像名称
```

docker search 镜像名称  -\[options\]   说明

```bash
--no-trunc 显示完整的镜像描述
-s 列出收藏数不少于指定值的镜像
--automated 只列出 automated build类型的镜像
```

---

### 2.3 docker pull 镜像下载命令

语法

```bash
docker pull 镜像名称:[TAG]
例如:docker pull tomcat:8.5  下载8.5的镜像版本
     dokcer pull tomcat 默认下载最新的tomcat镜像版本 【latest】     
```

---

### 2.4 docker rim 镜像删除命令

```bash
删除单个   docker rmi -f 镜像ID
删除多个   docker rmi -f 镜像ID1 镜像ID2
           docker rim -f 镜像名:[tag]  镜像名:[tag]
删除全部
           docker rmi -f $(docker images -qa)
```

---

---

# 08【掌握】docker命令\[容器\]

## 1、什么是容器 

 容器镜像是一个软件的轻量级独立可执行软件包，包含运行它所需的一切：代码，运行时，系统工具，系统库，设置。不管环境如何，集装箱化软件都可以运行相同的Linux和Windows应用程序。容器将软件与其周围环境隔离开来，例如开发环境和生产环境之间的差异，并有助于减少在同一基础架构上运行不同软件的团队之间的冲突。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5119f7f3-5247-45be-acae-352089f7f2f2.jpg)

1.轻量级 

在一台机器上运行的Docker容器共享该机器的操作系统内核; 他们立即开始并使用更少的计算和内存。图像由文件系统层构建并共享公用文件。这最大限度地减少了磁盘使用量，图像下载速度更快。 

2.标准 

Docker容器基于开放标准，可在所有主要Linux发行版，Microsoft Windows以及任何基础架构（包括虚拟机，裸机和云中）上运行。 

3.安全 

Docker容器将应用程序彼此隔离并从底层基础架构中分离出来。Docker提供了最强大的默认隔离功能，可以将应用程序问题限制在一个容器中，而不是整个机器上。

---

---

2，演示前提  

    有镜像才能创建容器，这个是根本要求(下载centos镜像来演示)

```bash
docker pull centos
```

---

---

## 3，创建并启动容器

### 3.1语法

```bash
docker run [options] images [command][args] 
```

### 3.2options说明

有些是一个减号，有些是两个减号

\--name="容器新名字": 为容器指定一个名称；

\-d: 后台运行容器，并返回容器ID，也即启动守护式容器；

\-i：以交互模式运行容器，通常与 -t 同时使用；

\-t：为容器重新分配一个伪输入终端，通常与 -i 同时使用；

\-P: 随机端口映射；

\-p: 指定端口映射，有以下四种格式

      ip:hostPort:containerPort

      ip::containerPort

      hostPort:containerPort

      containerPort

### 3.3交互式运行

```bash
#使用镜像centos:latest以交互模式启动一个容器,在容器内执行/bin/bash命令。
docker run -it centos /bin/bash 
```

---

---

## 4，列出当前所有正在运行的容器

### 4.1语法

```bash
docker ps [options]
```

### 4.2 options语法说明

\-a :列出当前所有正在运行的容器+历史上运行过的

\-l :显示最近创建的容器。

\-n：显示最近n个创建的容器。

\-q :静默模式，只显示容器编号。

\--no-trunc :不截断输出。

---

---

## 5，退出容器

1，exit:停止容器并退出

2，ctrl+P+Q  容器不停止退出

---

---

## 6，启动容器

```bash
docker start 容器ID或容器名称
```

---

---

## 7，重启容器

```bash
docker restart 容器ID或容器名称
```

---

---

## 8，停止容器

```bash
docker stop 容器ID或容器名称
```

---

---

## 9，强制停止容器

```bash
docker kill 容器ID或容器名称
```

---

---

## 10，删除已停止的容器

```bash
#单个删除
docker rm 容器ID
#多个删除
docker rm -f $(docker ps -aq)
docker ps -aq xargs docker rm
```

---

---

## 11，其它重点内容

### 1，启用守护式容器

#使用镜像centos:latest以后台模式启动一个容器

docker run -d centos

问题：docker ps -a 进行查看, 会发现容器已经退出

很重要的要说明的一点: Docker容器后台运行,就必须有一个前台进程.

容器运行的命令如果不是那些一直挂起的命令（比如运行top，tail），就是会自动退出的。

这个是docker的机制问题,比如你的web容器,我们以nginx为例，正常情况下,我们配置启动服务只需要启动是应的service即可。例如  service nginx start

但是,这样做,nginx为后台进程模式运行,就导致docker前台没有运行的应用,

这样的容器后台启动后,会立即自杀因为他觉得他没事可做了.

所以，最佳的解决方案是,将你要运行的程序以前台进程的形式运行

### 2，查看容器日志

如果是后台运行的程序，那么如何查看运行的日志呢？

1，先运行一个程序  在后台被隔两秒输出\[hello laolei\]

```bash
 docker run -d centos /bin/sh -c "while true;do echo hello laolei;sleep 2;done"
```

2，查看日志

```bash
docker logs -tf --tail 10 容器ID

*   -t 是加入时间戳
*   -f 跟随最新的日志打印
*   --tail 数字 显示最后多少条
```

3，查看容器运行进程   

```bash
docker top 容器ID
```

### 4，查询容器内部细节

```bash
docker inspect 容器ID
```

### 5，进入正在进行的容器并以命令行交互

```bash
#方式1
docker exec -it 容器ID /bin/bash
#方式2
docker attach 容器ID
#两种方式的区别
exec 在容器中打开新的终端 并且可以启动新的进程

attch 直接进行容器终端，不会启动新的进程
```

### 6，进入容器内拷贝文件到主机

```bash
docker cp 容器ID:容器内的路径  主机目录
```

# 09【掌握】docker命令总结

![image-20220330162848139](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162848139.png)

# 10【掌握】docker镜像

## 1，什么是镜像

### 1.1   UnionFS（联合文件系统）

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。

![image-20220330162910253](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162910253.png)

特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录

### 1.2  Docker镜像加载原理

  docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。

bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已由bootfs转交给内核，此时系统也会卸载bootfs。

 rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。 

![image-20220330162922180](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162922180.png)

 平时我们安装进虚拟机的CentOS都是好几个G，为什么docker这里才200M？？

![image-20220330162933396](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162933396.png)

对于一个精简的OS，rootfs可以很小，只需要包括最基本的命令、工具和程序库就可以了，因为底层直接用Host的kernel，自己只需要提供 rootfs 就行了。由此可见对于不同的linux发行版, bootfs基本是一致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

### 1.3  分层的镜像

以我们的pull为例，在下载的过程中我们可以看到docker的镜像好像是在一层一层的在下载

![image-20220330162945324](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330162945324.png)

### 1.4 为什么docker要使用上面的这种分层结构

最大的一个好处就是 - 共享资源

比如：有多个镜像都从相同的 base 镜像构建而来，那么宿主机只需在磁盘上保存一份base镜像，

同时内存中也只需加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。  

## 2，镜像的特点

Docker镜像都是只读的

当容器启动时，一个新的可写的镜像被加载到镜像层的顶部。

这一层通常被叫做容器层，容器层之下的都叫镜像层

3，镜像的commit操作  

### 3.1 作用

当镜像运行之后可以修改容器里面的内容，再提交成一个新的镜像

### 3.2 命令语法

docker commit -m='新的镜像的描述信息' -a='作者' 容器ID 要创建的目标镜像名:[标签名]

3.3 案例演示  

##### 1，从hub上拉一下tomcat镜像当运行

```
docker run -it -p 8080:8080 tomcat 
p 主机端口:容器端口
P 随机分配端口
i 交互
t 终端
```

![image-20220330163012238](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163012238.png)

![image-20220330163016552](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163016552.png)

![image-20220330163022962](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163022962.png)

从上面可以看出docs是可以访问的哦

##### 2，删除tomcat里面webapps 里面的docs项目

![image-20220330163033265](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163033265.png)

刷新页面docs不存在了哦  

![image-20220330163041423](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163041423.png)

##### 3，把当前运行的这个没有docs的容器生成一个新的镜像

语法

```
docker commit -a='作者' -m='镜像描述' 容器ID 新的镜像名/名称:版本
```

案列

```
docker commit -a='laolei' -m='del tomcat docs' dbebc1893880  laolei/tomcatnodocs:1.0
```

![image-20220330163140081](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163140081.png)

##### 4，启动自己创建的镜像和之前的对比

1 ，删除所有容器

```bash
docker rm -f $(docker ps -aq)
```

2，启动之前的镜像

```bash
docker run -d -p 8888:8080 镜像ID或仓库ID+版本
```

3，启动自己的镜像

```
docker run -d -p 9999:8080 镜像ID 
```

# 11【掌握】docker容器数据卷

## 1，什么是容器数据卷

先来看看Docker的理念：

\* 将应用与运行的环境打包形成容器运行 ，运行可以伴随着容器，但是我们对数据的要求希望是持久化的

\* 容器之间希望有可能共享数据

Docker容器产生的数据，如果不通过docker commit生成新的镜像，使得数据做为镜像的一部分保存下来，

那么当容器删除后，数据自然也就没有了。

为了能保存数据在docker中我们使用卷。

---

## 2，容器数据卷能做什么

1，容器数据的持久化

2，容器之间继承和共享数据

---

## 3，添加数据卷的方式

### 3.1直接使用命令添加

①语法

```java
 docker run -it -v /宿主机目录:/容器内目录 centos /bin/bash


```

②查看容器卷是否挂载成功

```java
docker inspect 容器ID
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraccd05137-0cf0-4c67-ae22-641112519973.png)



③查看容器卷和宿主机的数据共享

在宿主机的mycentos001中创建hello.txt文件并写入数据mycentos001

进入容器查看container001里面有hello.txt文件数据和mycentos001里面的一样

注意：在以上的例子中，默认的只能在宿主机里面写数据。

如果出以下的问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorada8f352e-a6e0-4a48-9dd8-54bf5b7e1e6b.png)

解决办法：在挂载目录后多加一个--privileged=true参数即可

④查看容器停止后，主机修改数据是否同步

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0df70207-d16e-449c-b392-3379ff833bf3.png)

⑤带权限的处理方式

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7fd0c032-f467-4e8c-a55b-0ead1283696a.png)

---

```java
 docker run -it -v /宿主机目录:/容器内目录:ro centos /bin/bash
```

---

### 3.2使用DockerFile添加

①在宿主机的根目录下创建mydocker文件夹并进入

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora52c68615-0b6b-40f4-94b7-55dd2627a3a9.png)

②在当前目录创建一个DockerFile的文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraee2fa046-8985-425b-8e86-b659c7757d28.png)

③编写DockerFile

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9b3aa538-b861-4c2c-a5b0-455d9cf85135.png)

```bash
FROM centos
VOLUME ["/dataContainer1","/dataContainer2"]
CMD echo "finished,--------success1"
CMD /bin/bash
```

④build生成一个新的镜像

```bash
docker build -f /mydocker/DockerFile -t laolei/centos .   #注意后面有一个点哦
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae375d9f6-b2e0-461e-a8ce-30ce105e632a.png)

⑤启动容器

```bash
docker run -it --name='mycentos' laolei/centos
```

⑥查看容器里面有两个容器卷

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2256c71f-ab9b-49c7-ae24-708cb3c0c907.png)

---

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae7518e0b-7fbb-46ed-945d-bde4193ae9e2.png)

---

---

## 4，数据卷容器

4.1，作用：实现容器之间的数据共享

4.2，操作思路

```bash
以上面的laolei/centos为镜像，里面有dataContainer1和dataContailer2
启动一个容器dc1  在dataContailer1里面添加dc1.txt
    docker run -it --name='dc1' laolei/centos
    cd /dataContailer1
    touch dct.txt
启动一个容器dc2 继承dc1  在dataContailer1里面添加dc2.txt
启动一个容器dc3 继承dc2  在dataContailer1里面添加dc3.txt
发现在dc3可以看到dc1.txt dc2.txt dc3.txt
      dc1里面可以看到dc1.txt dc2.txt dc3.txt
删除dc1容器之后在dc2和dc3里面还是可以看到dc1.txt dc2.txt dc3.txt

说明数据卷容器的生命周期一直持续到没有容器使用它为止
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabb25d5a0-b947-4cf4-a42a-f025e9e464c4.png)

# 12【掌握】Dockerfile详解【1】

## 1，什么是Dockerfile

1，Dockerfile是用来构建Docker镜像的构建文件，是由一系列的命令和参数构成的脚本

2，Dokcerfile的构建步骤

​    编写Dokcerfile文件  

​    docker build 生成新的镜像  

​    docker run 运行镜像  

3，以centos的镜像为例来说明 https://hub.docker.com/_/centos

![image-20220330163255283](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163255283.png)

![image-20220330163259947](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163259947.png)

## 2，DockerFile构建过程解析

2.1基础知识

```
1，每条保留字指令都必须为大写字母后面要跟随至少一个参数
2，指令从上到下顺序执行
3，#表示注释
4，每条指令都会创建一个新的镜像层，并对镜像进行提交
```

2.2大致流程

```
1，docker从基础镜像运行一个容器
2，执行一条指令并对容器进行修改
3，执行类似于docker commit的操作提交一个新的镜像
4，docker再基于刚提交的新的镜像运行一个新的容器
5，执行dockerfile的下一个指令再人生第2点直到没有指令
```

2.3总结

```
从应用软件的角度来看，Dockerfile、Docker镜像与Docker容器分别代表软件的三个不同阶段，
*  Dockerfile是软件的原材料
*  Docker镜像是软件的交付品
*  Docker容器则可以认为是软件的运行态。
Dockerfile面向开发，Docker镜像成为交付标准，Docker容器则涉及部署与运维，三者缺一不可，合力充当Docker体系的基石。

1 Dockerfile，需要定义一个Dockerfile，Dockerfile定义了进程需要的一切东西。
    Dockerfile涉及的内容包括执行代码或者是文件、环境变量、依赖包、运行时环境、动态链接库、操作系统的发行版、
    服务进程和内核进程(当应用进程需要和系统服务和内核进程打交道，这时需要考虑如何设计namespace的权限控制)等等;
2 Docker镜像，在用Dockerfile定义一个文件之后，docker build时会产生一个Docker镜像，
    当运行 Docker镜像时，会真正开始提供服务;
3 Docker容器，容器是直接提供服务的。
```

![image-20220330163343431](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163343431.png)

## 3，DockerFile体系结构（关键字---重点啊）

**FROM** 基础镜像，当前新镜像是基于哪个镜像的

**MAINTAINER**  镜像维护者的姓名和邮箱地址

**RUN**  容器构建时需要运行的命令

**EXPOSE** 当前容器对外暴露的端口

WORKDIR 指定在创建容器后，终端默认登陆进来的工作目录

**ENV** 用来在构建镜像过程中设置环境变量

**ADD** 将宿主机目录下的文件拷贝进镜像并且ADD命令会自动处理URL和解压tar包

**COPY** 类似ADD，拷贝文件和目录到镜像中 ，语法COPY src dest  COPY [''src","dest"]

**VOLUME** 容器数据卷，用于数据保存和持久化工作

**CMD** 指定一个容器启动时要运行的命令格式

​    shell:  CMD  <命令>  

​    exec  CMD ['可执行文件',"参数1","参数2"]  

​    DockerFile中可以有多个CMD指令，但只有最后一个生效，CMD会被docker run之后的参数替换  

**ENTEYPONT**  指定一个容器启动时要运行的命令

​      ENTRYPOINT的目地和CMD一样，都是在指定容器启动程序及参数  

**OBBUILD** 当构建一个被继承的Dockerfile时运行命令，父镜像在被子镜像继承后触发父镜像的onbuild

#### 总结

![image-20220330163404120](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraimage-20220330163404120.png)

# 13【掌握】Dockerfile详解【2】

## 1，Base镜像的说明

docker Hub上99%的镜像都是通过base镜像中安装和配置需要的软件构建出来的

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora14b30bb6-e6f9-4e5b-a16d-273aa4b1376f.png)



---

---

## 2，自定义mycentos镜像

#### 2.1目地

1.  登陆后的默认路径  
2.  vim编辑器  
3.  查看网络配置ifconfig支持  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora27ec6c19-5779-479e-818f-6e0a7e302d2d.png)

---

#### 2.2进入mydocker目录创建DockerFile文件编写

```python
cd  /mydocker
touch Dockerfile
vi Dockerfile
```

向Dockerfile里面写入内容

```python
#继承父镜像
FROM centos
#作者和邮箱
MAINTAINER laolei<78414842@qq.com>
#设置环境变量
ENV MYPATH /usr/local
WORKDIR $MYPATH
#安装vim 和网络工具
RUN yum -y install vim
RUN yum -y install net-tools
#对外暴露的端口[提示作用]
EXPOSE 80
#输出
CMD echo $MYPATH
CMD echo "success--------------ok"
CMD /bin/bash
```

#### 2.3使用docker build命令构建镜像

docker build -t mycentos:1.2 .

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaf0164d1-6719-4163-9563-1128e4e78ca6.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf925468e-0c2b-44f3-b4d0-ff1c91d71861.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraad952d8a-00ba-4668-91f6-656fd51818ec.png)

#### 2.4使用docker run命令运行

```python
docker run -it mycentos:1.2
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3c968fc9-b6e0-489f-ae76-8a5325235cc0.png)

可以看到里面可以使用ipconfig命令了哦

#### 2.5列出镜像的变更历史

```python
docker history 镜像名:TAG
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa9e8d1fb-9750-4381-9c34-7098bed392c1.png)

---

---

# 14【掌握】Dockerfile详解【3】

1，CMD说明  

---

Dockerfile 中可以有多个CMD的命令，但只有最后一个生效，CMD会被docker run之后的参数替换掉

可以使用tomcat的案例演示

2.1查看tomcat的Dockerfile

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae4c89d9a-6c2c-485d-b2dd-a41999834be0.png)

从上面的可以看出最后执行了一个catalina.sh的命令  相当于./bin/catalina.sh  
运行如下命令，可以看出下图的效果

```python
docker run -it -p 9999:8080 tomcat ls -lh
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabd19bf29-0c3c-41c2-a539-cf8c2180d6d6.png)

发现这个tomcat的容器启动之后就退出了

那是因为在启动容器的时候后面加了ls -lh那么会覆盖Dockerfile里面的  CMD \["catalina.sh", "run"\]

---

## 2，ENTRYPOINT说明

使用ENTRYPOINT来运行命令，在run 运行的参数会追加到新的命令后面

---

## 3，自定义ls镜像来说明CMD和ENTRYPOINT的区别

目地：讲解CMD和ENTRYOINT的区别

编写Dockerfile

```python
FROM centos
CMD [ "ls", "-a" ]
```

构建镜像

```python
docker build -t myls:1.2 .
```

启动镜像

```python
docker run -it myls:1.2 -lh
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora441b6f1e-11b2-4514-bff9-bdbb6f567a29.png)

出现错误，这是因为Dockerfile里面使用的是CMD \["ls", "-a"\]运行是传一个-lh过去会覆盖



修改Dockerfile

```python
FROM centos
ENTRYPOINT [ "ls", "-a" ]
```

构建镜像  

```python
docker build -t myls:1.3 .
```

运行镜像

```python
docker run -it myls:1.3 -l
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora41fe7d26-ee33-4c74-bfb6-5721720d2c4d.png)

发现 【 -l 】被追加到 ls 后面了哦

# 15【掌握】Dockerfile详解【4】

## 1，自定义tomcat镜像

### 1，准备工作

下载tomca9

下载jdk8linux

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora748a32eb-31e9-4a9c-9e7a-f8641532ffd4.png)

```python
#创建目录
mkdir -p /mydocker/tomcat9
#进入目录
cd /mydocker/tomcat9
#创建文件
touch README.txt
#随便向README.TXT里面写点内容
vi README.txt
#把下载好的tomcat和jdk放到/mydocker/tomcat9里面
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1e8cfea4-33e5-4cbb-bfbf-8a8b6be13c9c.png)

---

---

### 2，编写Dockerfile

```bash
#基于centos镜像
FROM         centos
MAINTAINER    laolei<78414842@qq.com>
#把宿主机当前上下文的README.txt拷贝到容器/usr/local/路径下
COPY README.txt /usr/local/README.txt
#把java与tomcat添加到容器中 使用ADD 会自动解压，使用COPY要自行手动解压
ADD jdk-8u181-linux-x64.tar.gz  /usr/local/
ADD apache-tomcat-9.0.19.tar.gz /usr/local/
#安装vim编辑器
RUN yum -y install vim
#设置工作访问时候的WORKDIR路径，登录落脚点
ENV MYPATH /usr/local
WORKDIR $MYPATH
#配置java与tomcat环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_181
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.19
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.19
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
#容器运行时监听的端口(提示作用)
EXPOSE  8080
#启动时运行tomcat
# ENTRYPOINT ["/usr/local/apache-tomcat-9.0.19/bin/startup.sh" ]
# CMD ["/usr/local/apache-tomcat-9.0.19/bin/catalina.sh","run"]
#启动tomcat并显示出logs/catalina.out下最后的日志
CMD /usr/local/apache-tomcat-9.0.19/bin/startup.sh && tail -F /usr/local/README.txt
```

### 3，构建镜像

```bash
 docker build -t mytomcat9:1.0 .
```

### 4，运行镜像测试

```bash
 docker run -it --name 'mytomcat9-1' -p 9999:8080 mytomcat9:1.0
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradddbe220-c42a-496a-8320-a19fc06107c5.png)





---

# 16【掌握】Dockerfile详解【5】

## 1，打jar包镜像

### 1.1准备工作

创建一个springboot项目并打jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4d4c6370-6fc1-484e-a707-0b4f35aebbcc.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4f023751-8628-4beb-b36c-150672db9773.png)

把jar包copy到linux  /mydocker/myjarproject

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab78a9ba7-3825-42a4-84ea-d49b2df01a4e.png)

### 1.2编写Dockerfile

```bash
FROM openjdk:8u181-jdk-alpine
ARG workdir=/app
VOLUME ${workdir}
WORKDIR ${workdir}
ADD bjsxt.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

### 1.3构建镜像

```bash
docker build -t myapp:1.0 .
```

### 1.4运行镜像

```bash
docker run -it --name 'myapp' -p 8888:8080 myapp:1.0
```

### 1.5 测试

```bash
http://192.168.15.134:8888/user/loadAllUser
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora94ec836a-1a1d-4bad-a78d-91051a9c7674.png)

---

---

## 2，打war包镜像

### 2.1准备工作

把上面的项目改成war项目打war包放到linux

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa0a986ea-e7ad-4d6b-b527-439c23cec105.png)

### 2.2编写Dockerfile

```bash
#基于tomcat
FROM tomcat:alpine
#作者信息
MAINTAINER    laolei<78414842@qq.com>
#声明环境变量
ENV TOMCATPATH=/usr/local/tomcat
#设置工作目录
WORKDIR ${TOMCATPATH}/webapps
#删除webapps下面的所有项目
RUN  rm -rf * 
#添加war包到当前的工作目录下的webapps
COPY bjsxt.war ./bjsxt.war
#更改war包的名字
RUN mv ./bjsxt.war ./ROOT.war
#显示webapps下面的文件
RUN ls -lh ./
#解压war包
RUN unzip ./ROOT.war -d ./
#删除ROOT.war包
RUN rm -rf ./ROOT.war
EXPOSE 8080
CMD ["bin/catalina.sh", "run"]

```

### 2.3构建镜像

```bash
docker build -t mywarapp:1.0 .
```

### 2.4运行镜像

```bash
docker run -it -p 8888:8080 mywarapp:1.0 
```

### 2.5 测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora47eee456-cb8f-41a5-b478-af95f7e57dd8.png)



---

---

## 3，优化镜像

分析上面的镜像里面有相同的部分，能不能把相同的部分抽出来成为一个镜像呢？(肯定是可以的)

# 17【熟悉】本地镜像发布到阿里云

1，镜像的生成方法  

---

1，docker commit

2，Dockerfile

---

## 2，本地镜像推送到阿里云

#### 2.1以修改的mywar的image为例来说明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2f82984f-c0fc-47eb-98c7-c74324784d56.png)

#### 2.2登陆阿里开发平台

[https://dev.aliyun.com/search.html](https://dev.aliyun.com/search.html)   完成登陆

打开[https://cr.console.aliyun.com/cn-hangzhou/instances/repositories](https://cr.console.aliyun.com/cn-hangzhou/instances/repositories)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa070b8ba-b01a-4b00-9aa1-03ed4e966954.png)



#### 2.3创建镜像仓库

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2706b810-e04c-4973-ac0a-5dbfc22e100c.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6333c063-94d2-4044-89e5-42749fcc8c65.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora18a696ba-8b97-4324-a5b4-b623b9a8cae3.png)

#### 2.4设置镜像仓库的访问密码

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1d33a3cf-c180-4421-b99f-a8a6186643f5.png)

#### 2.5 打开阿像页面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad1f5669b-548f-4609-9f62-9969a0213be7.png)

按里面的操作来就行了

```bash
$ sudo docker login --username=78414842@qq.com registry.cn-hangzhou.aliyuncs.com
$ sudo docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/laolei/mywar:[镜像版本号]
$ sudo docker push registry.cn-hangzhou.aliyuncs.com/laolei/mywar:[镜像版本号]
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora995b6018-4ec1-4ff3-bea3-efa276537162.png)

#### 2.6  的阿里的公有仓库里面查询试试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraab903c86-992f-4f90-9908-ed221c93e631.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6fa9f7a6-b85f-42b5-82ea-f11e408dc643.png)

---

---

4，把阿里云的镜像下载到本地  

4.1语法

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/laolei/mywar:[镜像版本号]
```

4.2案例

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1473b8ef-a733-44ff-87d7-400df74f26e8.png)

4.3运行测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora79b3dd3f-a953-4555-a25e-74d25b65f8de.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0eb95aab-ccf5-4634-97c4-fa923962ae44.png)

# 18【掌握】docker常用安装

## 1，安装步骤梳理

1. 搜索镜像  
2. 拉取镜像  
3. 查看镜像  
4. 启动镜像  
5. 停止容器  
6. 移除容器  

---

## 2，安装tomcat

docker hub好查找tomcat镜像  docker search tomcat



从docker hub上拉取tomcat镜像到本地  docker pull tomcat



使用docker images查看是否有拉取到tomcat

使用tomcat镜像运行镜像成为容器  

    docker run -it -p 8080:8080 tomcat   

                -p 主机端口:容器端口  

                -P 随机分配端口  

                -i  交互

                -t 终端    

---

## 3，安装mysql

docker hub上查找mysql镜像  docker search mysql

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora68031fe8-fb0f-414e-9b3b-439a3a71eac9.png)

docker hub上拉取mysql镜像到本地  docker pull mysql:5.6

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7ce92676-46f3-4a9a-a293-d1a883618fab.png)



使用mysql5.6镜像创建容器运行存在问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8cfe3f03-e492-4a53-b0e9-c6281730a1b3.png)

这是因为mysql镜像一启动中在加设置用户名和密码

修改成下面的命令

```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.6
```


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf4d2fb51-f918-4b89-906e-3601a0edbdc9.png)

  

发现启动起来了

使用navcat连接一下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1becdce2-c015-4c6c-8251-d61e1e8b83dd.jpg)

发现报错，这是因为docker 的mysql里面的localhost  -root 的密码是启动时设置的是123456现%-root的没有设置

下面是解决方法

```bash
1, 进入mysql的docker 容器
docker exec -it mysql /bin/bash
2，登陆mysql
mysql -u root -p
输入密码
3,使用mysql数据库
use mysql
4,执行修改密码的命令
update user set password=password(123456) where host='%'
5,重启mysql的docker 容器
exit退出
exit退出mysql容器
docker restart mysql
```

再就可以进行远程连接了哦

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraeccc2326-19ea-4d19-83b2-62bec487ad40.jpg)

如果出现使用宿主机IP无法访问的情况 在宿主机里面执行如下命令

请顺序运行以下命令：



nmcli connection modify docker0 connection.zone trusted

systemctl stop NetworkManager.service

firewall-cmd --permanent --zone=trusted --change-interface=docker0

systemctl start NetworkManager.service

nmcli connection modify docker0 connection.zone trusted

systemctl restart docker.service

再重启mysql和tomcat的容器

# 19-Docker 安装 Redis

# Docker 安装 Redis

Redis 是一个开源的使用 ANSI C 语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value 的 NoSQL 数据库，并提供多种语言的 API。

### 1、查看可用的 Redis 版本

访问 Redis 镜像库地址： [https://hub.docker.com/\_/redis?tab=tags](https://hub.docker.com/_/redis?tab=tags)。

可以通过 Sort by 查看其他版本的 Redis，默认是最新版本 **redis:latest**。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.35863917952796504.png)

你也可以在下拉列表中找到其他你想要的版本：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22007907098842994.png)

此外，我们还可以用 docker search redis 命令来查看可用版本：

```Plain Text
$ docker search  redis
NAME                      DESCRIPTION                   STARS  OFFICIAL  AUTOMATED
redis                     Redis is an open source ...   2321   [OK]       
sameersbn/redis                                         32                   [OK]
torusware/speedus-redis   Always updated official ...   29             [OK]
bitnami/redis             Bitnami Redis Docker Image    22                   [OK]
anapsix/redis             11MB Redis server image ...   6                    [OK]
webhippie/redis           Docker images for redis       4                    [OK]
clue/redis-benchmark      A minimal docker image t...   3                    [OK]
williamyeh/redis          Redis image for Docker        3                    [OK]
unblibraries/redis        Leverages phusion/baseim...   2                    [OK]
greytip/redis             redis 3.0.3                   1                    [OK]
servivum/redis            Redis Docker Image            1                    [OK]
...
```

### 2、取最新版的 Redis 镜像

这里我们拉取官方的最新版本的镜像：

```Plain Text
$ docker pull redis:latest
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.24507409726744753.png)

### 3、查看本地镜像

使用以下命令来查看是否已安装了 redis：

```Plain Text
$ docker images
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1551525120172566.png)

在上图中可以看到我们已经安装了最新版本（latest）的 redis 镜像。

### 4、运行容器

安装完成后，我们可以使用以下命令来运行 redis 容器：

```Plain Text
$ docker run -itd --restart=always --name redis -p 6379:6379 redis:4.0
```

参数说明：

* **\-p 6379:6379**：映射容器服务的 6379 端口到宿主机的 6379 端口。外部可以直接通过宿主机ip:6379 访问到 Redis 的服务。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.023720384391622638.png)

### 5、安装成功

最后我们可以通过 **docker ps** 命令查看容器的运行信息：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08002451602204692.png)

接着我们通过 redis-cli 连接测试使用 redis 服务。

```Plain Text
$ docker exec -it redis /bin/bash
```


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6412505260124792.png)

  

来源： [https://www.runoob.com/docker/docker-install-redis.html](https://www.runoob.com/docker/docker-install-redis.html)





---

redis设置密码：

设置密码有两种方式。

#### 1\. 命令行设置密码。

运行cmd切换到redis根目录，先启动服务端
`>redis-server.exe`
另开一个cmd切换到redis根目录，启动客户端
`>redis-cli.exe -h 127.0.0.1 -p 6379`
客户端使用config get requirepass命令查看密码

```Plain Text
>config get requirepass
1)"requirepass"
2)""    //默认空
```

客户端使用config set requirepass yourpassword命令设置密码

```Plain Text
>config set requirepass 123456
>OK
```

一旦设置密码，必须先验证通过密码，否则所有操作不可用

```Plain Text
>config get requirepass
(error)NOAUTH Authentication required
```

使用auth password验证密码

```Plain Text
>auth 123456
>OK
>config get requirepass
1)"requirepass"
2)"123456"
```

也可以退出重新登录
`redis-cli.exe -h 127.0.0.1 -p 6379 -a 123456`
命令行设置的密码在服务重启后失效，所以一般不使用这种方式。

#### 2\. 配置文件设置密码

在redis根目录下找到redis.windows.conf配置文件，搜索requirepass，找到注释密码行，添加密码如下：

```Plain Text
# requirepass foobared
requirepass tenny     //注意，行前不能有空格
```

重启服务后，客户端重新登录后发现

```Plain Text
>config get requirepass
1)"requirepass"
2)""
```

密码还是空？

网上查询后的办法：创建redis-server.exe 的快捷方式， 右键快捷方式属性，在目标后面增加redis.windows.conf， 这里就是关键，你虽然修改了.conf文件，但是exe却没有使用这个conf，所以我们需要**手动指定**一下exe按照**修改后的conf**运行，就OK了。

所以，这里我再一次重启redis服务(指定配置文件)
`>redis-server.exe redis.windows.conf`
客户端再重新登录，OK了。

```Plain Text
>redis-cli.exe -h 127.0.0.1 -p 6379 -a 123456
>config get requirepass
1)"requirepass"
2)"123456"
```

疑问: redis目录下有两个配置文件redis.windows.conf和redis.windows-server.conf，看到网上有的人用前者有的人用后者，不清楚到底该用哪一个。看了下两个文件又没啥区别，个人就用前者了。  

来源： [https://www.cnblogs.com/tenny-peng/p/11543440.html](https://www.cnblogs.com/tenny-peng/p/11543440.html)

# 离线服务器下docker的部署与应用

## 一分钟内形成[docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020)的模糊概念

网上很多文章避免将docker与虚拟机混为一谈，但对于初学者来说，完全可以将docker当做一种虚拟机技术，只需要牢牢记住一点最重要的区别：docker依赖于物理机的内核，所以在linux下“生成的docker”，一般不能直接在windows下运行。（虚拟机是完完全全模拟了一台物理机，这是一个很大的区别）。
当你有了这样的一个模糊概念，接下来只需要快速了解docker的三个基础组成部分，**仓库、镜像、容器**，就可以快速的应用起来。类比虚拟机，**镜像**就相当于安装虚拟机时用的iso文件，**仓库**自然就是一个官方存放**镜像**的地方，方便用户直接“下载”，当你的虚拟机运行起来后，就相当于一个**容器**。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora2018060217191255.png)

## 我为什么使用docker，需求是什么

在很多项目中，我们需要对一些url进行定时拨测，获取这些url的各种指标，例如响应时间、渲染时间等等，网上有许多开源的工具供我们挑选使用，sitespeed就是其中之一。sitespeed可以对访问过程进行度量，形成各种指标。访问过程进行录相、截图。指标分为浏览（体验）类指标、评分指标、DNS指标等几个维度。关于sitespeed更为详细的介绍可自行搜索。
然后由于其使用图形界面的浏览器，不太适合做为服务端程序运行，同时其各种依赖库的安装配置较为麻烦，故以docker的方式运行是比较合适的。[https://www.sitespeed.io/](https://blog.csdn.net/u011372108/article/details/80549731)在sitespeed.io的官方介绍上也指出所提供的docker镜像部署了所有的运行环境，对于用户只需直接使用即可。

## 离线安装docker：部署yum源或者rpm/deb包安装

对于某些特定环境，服务器是不允许访问互联网的，因此不能直接从软件源下载docker进行安装，这就造成了很多**依赖包**安装的麻烦。在此可以有几种不同的离线安装方式可供选择：
\* 对于ubuntu系统，你只需一台联网的同环境的虚拟机就可以得到deb安装包和**所有的依赖包**。
`apt-get install --download-only docker`这条命令的具体用法可以自行搜索，解决令人头疼的依赖问题简直舒服。
\* 对于centos系统，同样可以搜索所有的依赖包，通过rpm包的方法安装。但更加推荐部署本地yum源的方式，简单高效一劳永逸，部署步骤可自行搜索。

## 镜像文件的导入导出

不能访问互联网，意味着docker提供的官方仓库也不可访问，因此需要我们在本地虚拟机`docker pull sitespeed.io`相应的镜像，可以简单测试是否可用。

```Plain Text
[~]$ docker images
REPOSITORY                           TAG                 IMAGE ID            CREATED             SIZE
docker.io/hello-world                latest              e38bc07ac18e        7 weeks ago         1.85 kB
docker.io/sitespeedio/sitespeed.io   latest              38463a656de8        8 weeks ago         1.77 GB
[~]$ docker run hello-world
Hello from Docker!123456
```

通过`docker images`看到本地存放了两个镜像，`docker run *`命令可以简单的在某个镜像文件基础上启动一个容器。
接下来要做的就是将镜像文件使用**save**命令导出为tar文件：
`docker save 38463a656de8> /root/sitespeed.tar`
通过物理设备传输至离线服务器上，通过**load**命令导入镜像：
`docker load < /root/sitespeed.tar`
导入完成后，用**docker images**命令查看，惊奇的发现REPOSITORY和TAG列均为，所以**save**命令保存的并不是所有的信息，具体的区别自行搜索即可。不过不影响使用，我们只要修改一下就可以正常使用了。
`docker tag 38463a656de8 docker.io/sitespeedio/sitespeed.io:latest`

## docker镜像是如何制作的

基于docker提供的服务，我们想要制作自己特定功能的docker镜像，只需要按照格式编写一个**Dockerfile**文件即可。一个简单的Dockerfile如下：

```Plain Text
FROM ubuntu14.04
COPY start.sh /start.sh
RUN apt-get install -y gcc
CMD
ENTRYPOINT ["/start.sh"]12345
```

FROM命令用于指定一个基础镜像(当然可以指定一个空镜像**scratch**)，COPY和RUN都是字面意思，CMD和ENTRYPOINT 指定docker启动时的运行命令，关于二者的区别，在此不细说，推荐使用ENTRYPOINT。
编写完成后，运行命令：`docker build -t my_name:my_tag`
通过`docker images`命令就可以看到本地已经有了刚刚创建的镜像，通过
`docker run my_name:my_tag`就可以启动并运行。
不得不提的是，Dockerfile中的每一条命令都会创建一个临时层，(类似于**套娃**的感觉)所以要注意命令的书写方式，比如多条RUN命令合为一条书写。同时，减少不必要的操作。例如，新建一个文件，在后面步骤又删除了，这样两次操作都会存储在最终的docker镜像中，生成镜像的体积也会增大，这就是网上一些不成熟的镜像体积很大的原因。
关于docker启动时的很多参数都可以自己按需查找，个人觉得-v和–entrypoint参数结合使用，会对大家测试一些小东西很有帮助。

```Plain Text
-v 指定一个本地目录挂载到容器中指定位置
--entrypoint 指定docker运行入口，覆盖Dockerfile中的CMD和ENTRYPOINT12
```

例如：

```Plain Text
docker run --entrypoint /app/start.sh -v /root/app:/app docker_img.io1
```

首先通过**-v**将本地的/root/app目录挂载到镜像中的/app目录，之后再通过**–entryponit**指定运行入口为/app/start.sh。
有了这样的用法，我们可以通过Dockerfile建立一个包含各种运行环境的基础镜像，通过这样的方式，测试我们自己的小程序(虽然应用场景有限)。当然还是要牢记文章开头所说的，docker是需要基于物理机的内核。

## 补充：关于docker的垃圾回收问题

在某次意外操作后，发现依赖docker的应用无法正常运行，排查原因发现竟然是磁盘空间不足，docker无法启动。发现在/var/lib/docker/目录下存在大量文件，原来docker每次运行时会在/var/lib/docker/containers以及/var/lib/docker/overlay下生成一些相关文件，具体作用可自行查阅。但问题在于docker运行结束并不会自动回收产生的这些记录文件，随着时间的积累，导致历史文件会越来越多。如何解决，docker官方提供了相关的垃圾回收功能，需手动运行，当然也可以自己编写垃圾回收守护进程，或者在github上有许多好的开源程序可供使用。

**本文主要叙述了一些简单的docker使用场景，若果个别地方有错误，请不吝指出。**