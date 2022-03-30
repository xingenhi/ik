# 01-什么是 Git

## 本节视频

* [【视频】平台即服务-GitLab-使用 Git 托管代码](https://www.bilibili.com/video/av27548316)

## 概述

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf7246b600c338744a9591cd7530fd9f9d62aa0f8.png)

* Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
* Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。
* Git 与常用的版本控制工具 CVS, Subversion 等不同，它采用了分布式版本库的方式，不必服务器端软件支持。

# 02-安装 Git

## 下载

下载地址：https://git-scm.com/downloads

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511792517.png)

## 安装

双击安装文件，然后出现安装向导界面,点击下一步(Next)即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora02_WizardNext.png)

接着出现授权信息界面， Next即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora03_LicenceNext.png)

选择安装路径

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora04_InstallPath.png)

选择文件关联,如果你不清楚,直接默认,下一步即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora05_Associate.png)

接着出现开始菜单文件夹,默认,下一步即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora06_StartMenu.png)

然后是是否配置Path的配置,选择中间一个,可以通过 Windows命令行(CMD)调用 git 命令。 然后点击下一步

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora07_GitPath.png)

选择回车换行的格式。默认即可.(检出时转换为Windows风格,提交时转换为Linux风格.)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora08_CRLF.png)

然后是安装进度界面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora09_Installing.png)

安装完成. 去掉那个查看版本说明的复选框,点击完成(Finish)按钮即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora10_Finish.png)

可以在cmd里面测试是否设置了Path,是否安装成功. 在CMD中输入 git 或者 git --version 试试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511793614.png)

# 03-Git 的一般工作流程

# Git 的一般工作流程

* 克隆 Git 资源作为工作目录。
* 在克隆的资源上添加或修改文件。
* 如果其他人修改了，你可以更新资源。
* 在提交前查看修改。
* 提交修改。
* 在修改完成后，如果发现错误，可以撤回提交并再次修改并提交。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoragit-process.png)

# 04-Git 的基本操作

# 获取与创建项目命令

### git init

用 git init 在目录中创建新的 Git 仓库。 你可以在任何时候、任何目录中这么做，完全是本地化的。

```Plain Text
git init

```

### git clone

使用 git clone 拷贝一个 Git 仓库到本地，让自己能够查看该项目，或者进行修改。

```Plain Text
git clone [url]

```

## 快照

### git add

git add 命令可将该文件添加到缓存

```Plain Text
git add <filename>

```

### git status

git status 以查看在你上次提交之后是否有修改。

```Plain Text
git status
git status -s

```

### git diff

执行 git diff 来查看执行 git status 的结果的详细信息。

git diff 命令显示已写入缓存与已修改但尚未写入缓存的改动的区别。git diff 有两个主要的应用场景。

* 尚未缓存的改动：git diff
* 查看已缓存的改动： git diff --cached
* 查看已缓存的与未缓存的所有改动：git diff HEAD
* 显示摘要而非整个 diff：git diff --stat

### git commit

使用 git add 命令将想要快照的内容写入缓存区， 而执行 git commit 将缓存区内容添加到仓库中。

Git 为你的每一个提交都记录你的名字与电子邮箱地址，所以第一步需要配置用户名和邮箱地址。

```Plain Text
git config --global user.name 'yourname'
git config --global user.email youremail

```

将文件写入缓存区并提供提交注释

```Plain Text
git commit -m 'update message'

```

### git reset HEAD

git reset HEAD 命令用于取消已缓存的内容。

```Plain Text
git reset HEAD -- <filename>

```

## 拉取与推送

### git pull

git pull命令用于从另一个存储库或本地分支获取并集成(整合)。git pull命令的作用是：取回远程主机某个分支的更新，再与本地的指定分支合并，它的完整格式稍稍有点复杂。

```Plain Text
git pull <远程主机名> <远程分支名>:<本地分支名>

```

将远程存储库中的更改合并到当前分支中。在默认模式下，`git pull`是`git fetch`后跟`git merge FETCH_HEAD`的缩写。更准确地说，`git pull`使用给定的参数运行`git fetch`，并调用`git merge`将检索到的分支头合并到当前分支中。

### git push

`git push`命令用于将本地分支的更新，推送到远程主机。它的格式与`git pull`命令相似。

```Plain Text
git push <远程主机名> <本地分支名>:<远程分支名>

```

## 标签

### git tag

如果你达到一个重要的阶段，并希望永远记住那个特别的提交快照，你可以使用 `git tag` 给它打上标签。

比如说，我们想为我们的 商城 项目发布一个"1.0.0"版本。 我们可以用 `git tag -a v1.0.0` 命令给最新一次提交打上（HEAD） "v1.0.0" 的标签。

`-a` 选项意为"创建一个带注解的标签"。 不用 -a 选项也可以执行的，但它不会记录这标签是啥时候打的，谁打的，也不会让你添加个标签的注解。 我推荐一直创建带注解的标签。

```Plain Text
git tag -a v1.0.0
```

如果我们要查看所有标签可以使用以下命令：

```Plain Text
git tag
```

# 05-TortoiseGit 简化 Git 操作

TortoiseGit, 中文名海龟 Git. 海龟 Git 只支持 Windows 系统, 有一个前辈海龟 SVN, TortoiseSVN 和 TortoiseGit 都是非常优秀的开源的版本库客户端. 分为 32 位版与 64 位版.并且支持各种语言,包括简体中文

## 下载

下载地址：https://tortoisegit.org/download/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511792468.png)

## 安装

我们需要先安装程序包,然后安装语言包(LanguagePack). 因为TortoiseGit 只是一个程序壳,必须依赖一个 Git Core,也就是上一节我们安装的 Git. 所以安装前请确定已完成上一节的操作. 下面以64位版本为演示(64,32位除文件名不一样,其他的操作都一致)

* 双击安装程序

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora203_tgitWizard.png)

* 下一步,进入版权信息界面. 直接点击下一步(Next)即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora204_tgit_License.png)

* 下一步,选择SSH客户端. 可以选择 TortoiseGitPlink(位于TortoiseGit安装目录/bin 下), 也可以选择 Git 默认的SSH客户端,位于 Git安装目录/bin/ssh.exe(如果配置了 Path,那直接是 ssh.exe)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora204_2_tgit_Network.png)

* 接着是选择安装目录,可以保持默认,或者安装到开发环境目录下,安装的程序组件保持默认即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora205_tgit_dir.png)

* 下一步到确认安装界面,点击 Install按钮安装即可,如下图所示

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora206_install_tgit.png)

* 安装完成,点击 Finish 按钮即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora207_tgit_installed.png)

## 安装语言包

双击打开语言包安装程序

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora208_LanguageWizard.png)

点击下一步(Alt+N), 语言包会自动安装完成

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora209_LangPackFinished.png)

## 配置

在空白处点击鼠标右键, 选择 --> TortoiseGit --> Settings, 然后就可以看到配置界面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511793790.png)

选中General,在右边的 Language中选择中文. 不勾选自动升级的复选框,可能还需要指定 Git.exe 文件的路径

再次点击鼠标右键,可以看到弹出菜单中已经变成中文. 原来的 Settings 变成 设置; Clone 变为 克隆

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511793872.png)

# 06-什么是 GitLab

## 本节视频

* [【视频】平台即服务-GitLab-简介与安装](https://www.bilibili.com/video/av27548337)

## 概述

GitLab 是利用 Ruby on Rails 一个开源的版本管理系统，实现一个自托管的 Git 项目仓库，可通过 Web 界面进行访问公开的或者私人项目。它拥有与 Github 类似的功能，能够浏览源代码，管理缺陷和注释。可以管理团队对仓库的访问，它非常易于浏览提交过的版本并提供一个文件历史库。团队成员可以利用内置的简单聊天程序 (Wall) 进行交流。它还提供一个代码片段收集功能可以轻松实现代码复用，便于日后有需要的时候进行查找。

# 07-基于 Docker 安装 GitLab

我们使用 Docker 来安装和运行 GitLab 中文版，由于新版本问题较多，这里我们使用目前相对稳定的 10.5 版本，`docker-compose.yml` 配置如下：

```Plain Text
version: '3'
services:
    web:
      image: 'twang2218/gitlab-ce-zh:10.5'
      restart: always
      hostname: '192.168.75.145'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://192.168.75.145:8080'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 8080
      ports:
        - '8080:8080'
        - '8443:443'
        - '2222:22'
      volumes:
        - /usr/local/docker/gitlab/config:/etc/gitlab
        - /usr/local/docker/gitlab/data:/var/opt/gitlab
        - /usr/local/docker/gitlab/logs:/var/log/gitlab

```

### 安装完成后的工作

* 访问地址：http://ip:8080
* 端口 8080 是因为我在配置中设置的外部访问地址为 8080，默认是 80
* 初始化安装完成后效果如下：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511797825.png)

* 设置管理员初始密码，这里的密码最好是 字母 + 数字 组合，并且 大于等于 8 位
* 配置完成后登录，管理员账号是 root

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511798229.png)

**注意：** 如果服务器配置较低，启动运行可能需要较长时间，请耐心等待

# 08-GitLab 的基本设置

## 本节视频

* [【视频】平台即服务-GitLab-基本设置](https://www.bilibili.com/video/av27548356)

## GitLab 的基本设置

第一次使用时需要做一些初始化设置，点击“管理区域”-->“设置”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511798480.png)

### 账户与限制设置

关闭头像功能，由于 Gravatar 头像为网络头像，在网络情况不理想时可能导致访问时卡顿

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511798637.png)

## 注册限制

由于是内部代码托管服务器，可以直接关闭注册功能，由管理员统一创建用户即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511798763.png)

# 09-GitLab 的账户管理

使用时请不要直接通过 root 用户操作，需要先创建用户，然后通过创建的用户操作，如果你是管理员还需要为其他开发人员分配账户

## 创建用户

点击“管理区域”-->“新建用户”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511799413.png)

## 设置账户信息

同时你可以将自己设置为管理员

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511799508.png)

## 修改用户密码

由于我们创建时并没有配置邮箱，所以还需要重新编辑用户信息并手动设置密码

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511799858.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511799897.png)

## 退出并使用新账户登录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511800022.png)

> 注意：创建完账户，第一次登录时还会提示你修改登录密码

# 10-GitLab 创建第一个项目

## 本节视频

* [【视频】平台即服务-GitLab-第一个托管项目](https://www.bilibili.com/video/av27548374)

## GitLab 创建第一个项目

点击 `+` 号 --> `新建项目`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511800438.png)

输入项目名称及描述信息，设置可见等级为私有，这样别人就看不见你的项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511800627.png)

## 初始化项目

我们选择通过增加一个 README 的方式来初始化项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511800836.png)

直接提交修改即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511800904.png)

## 使用 SSH 的方式拉取和推送项目

### 生成 SSH KEY

使用 ssh-keygen 工具生成，位置在 Git 安装目录下，我的是 `C:\Program Files\Git\usr\bin`

输入命令：

```Plain Text
ssh-keygen -t rsa -C "your_email@example.com"

```

执行成功后的效果：

```Plain Text
Microsoft Windows [版本 10.0.14393]
(c) 2016 Microsoft Corporation。保留所有权利。

C:\Program Files\Git\usr\bin>ssh-keygen -t rsa -C "topsale@vip.qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Lusifer/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Lusifer/.ssh/id_rsa.
Your public key has been saved in /c/Users/Lusifer/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:cVesJKa5VnQNihQOTotXUAIyphsqjb7Z9lqOji2704E topsale@vip.qq.com
The key's randomart image is:
+---[RSA 2048]----+
|  + ..=o=.  .+.  |
| o o + B .+.o.o  |
|o   . + +=o+..   |
|.=   .  oo...    |
|= o     So       |
|oE .    o        |
| .. .. .         |
| o*o+            |
| *B*oo           |
+----[SHA256]-----+

C:\Program Files\Git\usr\bin>

```

### 复制 SSH-KEY 信息到 GitLab

秘钥位置在：`C:\Users\你的用户名\.ssh` 目录下，找到 `id_rsa.pub` 并使用编辑器打开，如：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511801618.png)

登录 GitLab，点击“用户头像”-->“设置”-->“SSH 密钥”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511801730.png)

成功增加密钥后的效果

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511801884.png)

### 使用 TortoiseGit 克隆项目

* 新建一个存放代码仓库的本地文件夹
* 在文件夹空白处按右键
* 选择“Git 克隆...”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511802101.png)

* 服务项目地址到 URL

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511802242.png)

* 如果弹出连接信息请选择是

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511802354.png)

* 成功克隆项目到本地

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511802402.png)

### 使用 TortoiseGit 推送项目（提交代码）

* 创建或修改文件（这里的文件为所有文件，包括：代码、图片等）
* 我们以创建 `.gitignore` 过滤配置文件为例，该文件的主要作用为过滤不需要上传的文件，比如：IDE 生成的工程文件、编译后的 class 文件等
* 在工程目录下，新建 `.gitignore` 文件，并填入如下配置：

```Plain Text
.gradle
*.sw?
.*
*
*~
/build
/code
.classpath
.project
.settings
.metadata
.factorypath
.recommenders
bin
build
target
.factorypath
.springBeans
interpolated*.xml
dependency-reduced-pom.xml
build.log
_site/
.*.md.html
manifest.yml
MANIFEST.MF
settings.xml
activemq-data
overridedb.*
*.iml
*.ipr
*.iws
.idea
.DS_Store
.factorypath
dump.rdb
transaction-logs
**/overlays/
**/logs/
**/temp/
**/classes/

```

* 右键呼出菜单，选择“提交 Master...”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511802947.png)

* 点击“全部”并填入“日志信息”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511803046.png)

* 点击“提交并推送”

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511803174.png)

* 成功后的效果图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511803209.png)

## 查看 GitLab 确认提交成功

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraLusifer1511803280.png)

# 11-GitLab 使用 SSH 免密登录

## 本节视频

* [【视频】平台即服务-GitLab-使用 SSH 免密登录](https://www.bilibili.com/video/av27548396)

------

------

# 00-GitLab Runner部署

前置基础：

* java环境
* maven环境
* docker
* docker-compose
* docker-registry
* gitlab
* nexus

## 一、GitLab Runner安装运行

### 1、环境准备

1. 创建工作目录

```Plain Text
mkdir -p /usr/local/docker/runner
```

2. 创建构建目录

```Plain Text
mkdir -p /usr/local/docker/runner/environment
```

3. 下载 `jdk-8u241-linux-x64.tar.gz和apache-maven-3.5.4-bin.tar.gz` 并复制到 `/usr/local/docker/runner/environment`

JDK

百度云下载链接：[https://pan.baidu.com/s/1RZK423GbeDqD7TJJ8M9Wyw](https://pan.baidu.com/s/1RZK423GbeDqD7TJJ8M9Wyw) 提取码：63jj

官方下载链接：[https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)

Maven

百度云下载链接：[https://pan.baidu.com/s/1Q275RdqNpoRQDvuTioVNRQ](https://pan.baidu.com/s/1Q275RdqNpoRQDvuTioVNRQ) 提取码：vwea

官方下载链接：[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)

### 2、Dockerfile

在 `/usr/local/docker/runner/environment` 目录下创建 `Dockerfile`

```Plain Text
cd /usr/local/docker/runner/environment
vim Dockerfile
----------------------------------------------------------
输入：
FROM gitlab/gitlab-runner:v11.0.2
MAINTAINER xingenhi <xingenhi@163.com>

# 更新下载源
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted universe multiverse' > /etc/apt/sources.list && \
    echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted universe multiverse' >> /etc/apt/sources.list && \
    echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted universe multiverse' >> /etc/apt/sources.list && \
    echo 'deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse' >> /etc/apt/sources.list && \
    apt-get update -y && \
    apt-get clean

# 安装 Docker
RUN apt-get -y install apt-transport-https ca-certificates curl software-properties-common && \
    curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] http://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" && \
    apt-get update -y && \
    apt-get install -y docker-ce
COPY daemon.json /etc/docker/daemon.json

# 安装 Docker Compose
WORKDIR /usr/local/bin
RUN curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
RUN chmod +x docker-compose

# 安装 Java
RUN mkdir -p /usr/local/java
WORKDIR /usr/local/java
COPY jdk-8u241-linux-x64.tar.gz /usr/local/java
RUN tar -zxvf jdk-8u241-linux-x64.tar.gz && \
    rm -fr jdk-8u241-linux-x64.tar.gz

# 安装 Maven
RUN mkdir -p /usr/local/maven
WORKDIR /usr/local/maven
COPY apache-maven-3.5.4-bin.tar.gz /usr/local/maven
RUN tar -zxvf apache-maven-3.5.4-bin.tar.gz && \
    rm -fr apache-maven-3.5.4-bin.tar.gz
# COPY settings.xml /usr/local/maven/apache-maven-3.5.4/conf/settings.xml

# 配置环境变量
ENV JAVA_HOME /usr/local/java/jdk1.8.0_241
ENV MAVEN_HOME /usr/local/maven/apache-maven-3.5.4
ENV PATH $PATH:$JAVA_HOME/bin:$MAVEN_HOME/bin

WORKDIR /
```

### 3、daemon.json

在 `/usr/local/docker/runner/environment` 目录下创建 `daemon.json`，用于配置加速器和仓库地址

```Plain Text
cd /usr/local/docker/runner/environment
vim daemon.json
-----------------------------------------
输入：
{
  "registry-mirrors": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "192.168.42.139:5000"
  ]
}
```

此处为语雀加密文本卡片，点击链接查看：[https://www.yuque.com/xingenhi/doc/nnx7ky#jqAhF](https://www.yuque.com/xingenhi/doc/nnx7ky#jqAhF)

### 4、docker-compose.yml

在 `/usr/local/docker/runner` 目录下创建 `docker-compose.yml`

```Plain Text
cd /usr/local/docker/runner
vim docker-compose.yml
---------------------------------------
输入：
version: '3.1'
services:
  gitlab-runner:
    build: environment
    restart: always
    container_name: gitlab-runner
    privileged: true
    volumes:
      - /usr/local/docker/runner/config:/etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock
```

## 二、刷新配置环境

**在宿主机进行操作即可**

* 刷新docker私有仓库配置

**首先保证本地配置了私有仓库,如果宿主机的本地仓库已经配置，此步骤可以跳过**

```Plain Text
vim /etc/docker/daemon.json
------------------------------------
输入：
{
  "registry-mirrors": [
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [
    "192.168.199.100:5000"
  ]
}
-------------------------------------
# 先刷新配置
systemctl daemon-reload
# 重启docker
systemctl restart docker
# 检验是否配置成功
docker info
```

* 权限修改

在我测试过程中，如果直接使用，会报如下图的错误，需要我们手动进行赋予权限。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraoHDrIRjrEV6x_BKNl3ahB0btkZ8-AbGQ7H3V48NOZZs.png)

**第一种**：只要docker服务重启，就需要重新设置一次。

```Plain Text
cd /var/run sudo
```

```Plain Text
chmod 666 docker.sock
```

**第二种**：可以持续有效

```Plain Text
#添加docker用户组
groupadd docker
#将登陆用户加入到docker用户组中
gpasswd -a ${USER} docker
#更新用户组
newgrp docker
```

## 三、项目注册 Runner

* 执行：`docker exec -it gitlab-runner gitlab-runner register`



* \# 输入 GitLab 地址

      Please enter the gitlab-ci coordinator URL (e.g. [https://gitlab.com/):](https://gitlab.com/):)

---

**查找路径：gitlab具体项目-->设置-->CI/CD-->Runner（展开）-->Setup a specific Runner manually里面的内容**

```Plain Text
http://192.168.75.146:8080/
```

* \# 输入 GitLab Token

Please enter the gitlab-ci token for this runner:

---

**查找路径：gitlab具体项目-->设置-->CI/CD-->Runner（展开）-->Setup a specific Runner manually里面的内容**

```Plain Text
1Lxq_f1NRfCfeNbE5WRh
```

* \# 输入 Runner 的说明

Please enter the gitlab-ci description for this runner:

---

```Plain Text
可以为空
```

* \# 设置 Tag，可以用于指定在构建规定的 tag 时触发 ci

Please enter the gitlab-ci tags for this runner (comma separated):

---

```Plain Text
可以为空
```

* \# 选择 runner 执行器，这里我们选择的是 shell

Please enter the executor: docker-ssh, parallels, ssh, virtualbox, docker+machine, docker-ssh+machine, docker, kubernetes, shell:

---

```Plain Text
shell
```

整体执行过程如下图：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoragh_IImmuRs5MfL68UcXvVdjmdSME6Fjg7GKFrzz9hlE.png)

说明：

* gitlab-ci-multi-runner register：执行注册命令
* Please enter the gitlab-ci coordinator URL：输入 ci 地址
* Please enter the gitlab-ci token for this runner：输入 ci token
* Please enter the gitlab-ci description for this runner：输入 runner 名称
* Please enter the gitlab-ci tags for this runner：设置 tag
* Whether to run untagged builds：这里选择 true ，代码上传后会能够直接执行
* Whether to lock Runner to current project：直接回车，不用输入任何口令
* Please enter the executor：选择 runner 类型，这里我们选择的是 shell

## 四、项目持续集成

### 1、部署通用模块项目

---

先将所有被依赖项目（通用模块项目）部署到 Nexus，为项目创建一个 `deploy.bat` 文件，示例代码如下：

```Plain Text
cd ..
cd dependencies
call mvn deploy

cd ..
cd commons
call mvn deploy
```

### 2、持续集成依赖管理项目

---

由于我们所有项目的父工程都是依赖于 `dependencies`，所以我们持续集成的第一步是将该项目进行持续集成，在项目目录创建 `.gitlab-ci.yml` 文件，代码如下：

```Plain Text
stages:
  - deploy

deploy:
  stage: deploy
  script:
    - /usr/local/maven/apache-maven-3.5.4/bin/mvn clean install
```

### 3、持续集成服务提供者或者消费者

---

#### （1）.gitlab-ci.yml

在项目工程下编写 .gitlab-ci.yml 配置文件：

```Plain Text
stages:
  - build
  - push
  - run
  - clean

build:
  stage: build
  script:
    - /usr/local/maven/apache-maven-3.5.4/bin/mvn clean package
    - cp target/itoken-eureka-1.0.0-SNAPSHOT.jar docker
    - cd docker
    - docker build -t 127.0.0.1:5000/itoken-eureka .

push:
  stage: push
  script:
    - docker push 127.0.0.1:5000/itoken-eureka

run:
  stage: run
  script:
    - cd docker
    - docker-compose down
    - docker-compose up -d

clean:
  stage: clean
  script:
    - docker rmi $(docker images -q -f dangling=true)
```

节点说明：

* stages：定义构建阶段，这里只有一个阶段 deploy
* deploy：构建阶段 deploy 的详细配置也就是任务配置
* script：需要执行的 shell 脚本
* only：这里的 master 指在提交到 master 时执行
* tags：与注册 runner 时的 tag 匹配

#### （2）Dockerfile

在项目工程下创建`docker`文件夹，并在`docker`文件夹下创建`Dockerfile` 配置文件：

```Plain Text
FROM openjdk:8-jre
MAINTAINER xingenhi <xingenhi@163.com>

ENV APP_VERSION 1.0.0-SNAPSHOT

# dockerize插件，用于当某个项目需要依赖其他项目时等待顺序启动
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir /app
COPY itoken-eureka-$APP_VERSION.jar /app/app.jar

# 【"dockerize", "-timeout", "5m", "-wait", "http://192.168.92.130:8888"】：等待服务启动后再开始运行
ENTRYPOINT ["dockerize", "-timeout", "5m", "-wait", "http://192.168.92.130:8888", "java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar", "--spring.profiles.active=prod"]

EXPOSE 8761
```

#### （3）docker-compose.yml

在项目工程下创建`docker`文件夹，并在`docker`文件夹下创建`docker-compose.yml` 配置文件：

```Plain Text
version: '3.1'
services:
  itoken-eureka-1:
    restart: always
    image: 127.0.0.1:5000/itoken-eureka
    container_name: itoken-eureka-1
    ports:
      - 8761:8761
    networks:
      - eureka-network1

  itoken-eureka-2:
    restart: always
    image: 127.0.0.1:5000/itoken-eureka
    container_name: itoken-eureka-2
    ports:
      - 8861:8761
    networks:
      - eureka-network2

  itoken-eureka-3:
    restart: always
    image: 127.0.0.1:5000/itoken-eureka
    container_name: itoken-eureka-3
    ports:
      - 8961:8761
    networks:
      - eureka-network3


networks:
  eureka-network1:
  eureka-network2:
  eureka-network3:
```

### 4、其它配置

为保证能够正常集成，我们还需要一些其它配置：

* 安装完 GitLab Runner 后系统会增加一个 gitlab-runner 账户，我们将它加进 root 组：

```Plain Text
gpasswd -a gitlab-runner root
```

* 配置需要操作目录的权限，比如你的 runner 要在 gaming 目录下操作：

```Plain Text
chmod 775 gaming
```

* 由于我们的 shell 脚本中有执行 git pull 的命令，我们直接设置以 ssh 方式拉取代码：

```Plain Text
su gitlab-runner
ssh-keygen -t rsa -C "你在 GitLab 上的邮箱地址"
cd 
cd .ssh
cat id_rsa.pub
```

* 复制 id\_rsa.pub 中的秘钥到 GitLab：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraycW732lV2MgXvK_DOuLyo50bLgalS0uzRQe0xssbcWU.png)

* 通过 ssh 的方式将代码拉取到本地

### 5、测试集成效果

所有操作完成后 push 代码到服务器，查看是否成功：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora-epn6a6x0TeSXavZeKWQFRQ1bbZxLVHZBTDEpfo_y6s.png)

passed 表示执行成功

### 6、其他命令

删除注册信息：

```Plain Text
gitlab-ci-multi-runner unregister --name "名称"
```

查看注册列表：

```Plain Text
gitlab-ci-multi-runner list
```

# 00-GitLab部署

```Plain Text
mkdir -vp /usr/local/docker/gitlab
cd /usr/local/docker/gitlab/
vim docker-compose.yml
-----------------------------------
输入：
version: '3.1'
services:
    web:
      image: 'twang2218/gitlab-ce-zh:11.1'
      restart: always
      hostname: '192.168.75.145'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://192.168.75.145:8080'
          gitlab_rails['gitlab_shell_ssh_port'] = 2222
          unicorn['port'] = 8888
          nginx['listen_port'] = 8080
      ports:
        - '8080:8080'
        - '8443:443'
        - '2222:22'
      volumes:
        - /usr/local/docker/gitlab/config:/etc/gitlab
        - /usr/local/docker/gitlab/data:/var/opt/gitlab
        - /usr/local/docker/gitlab/logs:/var/log/gitlab
-----------------------------------
docker-compose up -d
# 测试访问
访问http://ip:post/8080
```