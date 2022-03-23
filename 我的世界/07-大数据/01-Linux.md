# 00-环境准备

## 安装Vmware

## 安装虚拟机（Centos7.5）

## 网络配置

### 1、修改主机名

​    方式一：修改hostname文件

​        使用vi编辑 `/etc/hostname` 文件，设置计算机名称。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1410f293-5f78-4498-a877-c56a2c717ee2.png)

​    方式二：命令修改

```Plain Text
hostname node0
```

​    检验是否修改成功。

```Plain Text
hostname
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0c43182a-714b-441c-98d7-947e3c853121.png)

### 2、修改网络配置文件

* 获取本地网络信息

进入虚拟网络模拟器

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora561116ef-4ce0-4623-8991-30a97d9fe599.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora561116ef-4ce0-4623-8991-30a97d9fe599.png)

* 配置静态IP

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5c2911ed-6e2a-4e48-89af-773dcce0ec2c.png)

将文件内容修改成如下内容：

注意：IPADDR地址需要和上步中获取的子网IP在同一个网段中；网关和子网掩码使用上步中的；

```Plain Text
IPADDR=192.168.42.100
GATEWAY=192.168.42.2
NETMASK=255.255.255.0
DNS1=114.114.114.114
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae0b0cea7-d439-4ade-9b63-3c300daeef06.png)

* 重启网卡，启动配置

```bash
# 查看状态
systemctl status network
# 重启
systemctl restart network
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora48b9f013-1dd9-4bd7-8284-edcd7032dbed.png)

* 测试是否连通外网

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora182b3718-5fbb-4fac-84c9-83a62c01507c.png)

### 3、修改静态解析

```bash
vi /etc/hosts
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora81e2dd9e-b0e4-4909-96bf-1e8613098d65.png)

## 同步时间

* 安装ntp，用于同步时间

```Plain Text
yum install ntpdate -y
ntpdate time.windows.com
```

* 启动服务

![image](C:/Users/18364/Downloads/images/74c20c35-f56f-463d-b6a9-3fa66e5479b4.png)

* 使用date命令核对时间是否正确

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1192a84c-2db2-4654-b31d-e5dfce36703f.png)

## 安装Vim

安装vim

```Plain Text
yum install vim -y
```

## 关闭防火墙

* 临时关闭

```bash
systemctl stop firewalld
# 或
service firewalld stop
```

* 永久关闭

```bash
systemctl disable firewalld
```

* 查看防火墙状态

```bash
systemctl status firewalld
# 或
service firewalld status
```

## 关闭selinux

* 修改配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora60fb5738-ac16-4664-b6c6-db137a92d27b.png)

* 修改内容如下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4738b37b-19e9-42b6-a84d-984cbad27d00.png)

* 查看状态

输入`/usr/sbin/sestatus`，显示`SELinux status:disabled`表示已经关闭

## 安装lrzsz

用于上传和下载小文件

```Plain Text
yum install lrzsz -y
```

* `rz`用于上传
* `sz`用于下载

# 01-网络拓展

## OSI七层和TCP/IP四层的关系

七层结构记忆方法：应（应用层）、表（表示层）、会（会话层）、传（传输层）、网（网络层）、数（数据链路层）、物（物理层）

| OSI七层网络模型         | TCP/IP四层概念模型 | 对应网络协议                            |
| :---------------------- | :----------------- | --------------------------------------- |
| 应用层（Application）   | 应用层             | HTTP、TFTP, FTP, NFS, WAIS、SMTP        |
| 表示层（Presentation）  | 应用层             | Telnet, Rlogin, SNMP, Gopher            |
| 会话层（Session）       | 应用层             | SMTP, DNS                               |
| 传输层（Transport）     | 传输层             | TCP, UDP                                |
| 网络层（Network）       | 网络层             | IP, ICMP, ARP, RARP, AKP, UUCP          |
| 数据链路层（Data Link） | 数据链路层         | FDDI, Ethernet, Arpanet, PDN, SLIP, PPP |
| 物理层（Physical）      | 数据链路层         | IEEE 802.1A, IEEE 802.2到IEEE 802.11    |

# 02-简单shell命令

## man

* 查看下载源存放目录

```bash
ls /etc/yum.repos.d/
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora07671e9e-8783-4e82-8498-2ff89ea7e00e.png)

* 添加Yum资源包

```bash
# 下载
wget -O /etc/yum.repos.d/epel.repo http：//mirrors.aliyun.com/repo/epel-7.repo
yum clean all
yum  makecache
```

* 安装中文插件

```Plain Text
yum  install  man-pages-zh-CN  -y
```

* 修改语言环境

  方式一：临时修改

```Plain Text
echo $LANG
LANG=zh_CN.UTF-8
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0f3c6196-f579-4097-a7ab-3a43874011c2.png)

  方式二：永久修改

```Plain Text
vim /etc/locale.conf
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae5dfbb0d-7435-4fec-bbe9-efd56ab1bdae.png)

* man阅读快捷键
  * p：回到首页
  * 空格：下一页
  * b：上一页
  * /：查询
  * n：查询中找下一个
  * N：查询中找上一个
  * q：退出

## echo

* \-n：表示不要另起新行

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad5dedefa-f952-48e0-8822-d7d5c98e6566.png)

* \-e：表示解释逃逸字符

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9f085c68-ece3-4424-8f49-2719268a2191.png)

* 追加文本内容

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8ca74cdd-da9c-4da9-b707-ef0350b6f242.png)

* echo \$?

  输出上一个命令的结果

## ls

* ls目录或文件：列出指定目录下的内容
* ls别名：ls --color=auto
* ll别名：ls -l --color=auto
* ls -a：包含隐藏目录
* ls -l = ll

## pwd

显示当前工作目录

## cd

进入指定目录

* `cd dir/`进入指定目录
* `cd ~` 进入当前登录用户的家目录
* `cd ~ 用户名`进入指定用户的家目录
* `cd`进入当前用户的家目录
* `cd -`返回

## test

* 0（true正确）
* 非0（false错误）



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4543c217-bb7e-4157-9fd4-4feac8ca656e.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa7503470-f01c-41fe-a685-f58258afd00b.png)

## ps

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora881acc39-f0cf-4855-9211-6f6453a7fcd5.png)

以下为各选项的含义

* USER：该 process 属于那个使用者
* PID ：该 process 的程序标识符。
* %CPU：该 process 使用掉的 CPU 资源百分比;
* %MEM：该 process 所占用的物理内存百分比;
* VSZ ：该 process 使用掉的虚拟内存量 (Kbytes)
* RSS ：该 process 占用的物理的内存量 (Kbytes)
* TTY ：该 process 是在那个终端机上面运作,若与终端机无关则显示 ?, 另外, tty1-tty6 是本机上面的登入者程序,若为 pts/0 等等的,则表示为由网络连接进主机的程序。
* STAT：该进程目前的状态,状态显示与ps -l 的 S 旗标相同 (R/S/D/T/Z)
* START：该 process 被触发启动的时间;
* TIME ：该 process 实际使用 CPU 运作的时间。
* COMMAND：该程序的实际命令为何

## top

动态展示进程信息

## ln

用于创建软链接或硬链接。

* 软链接

```bash
ln -s log.txt ln1
```

* 原文件删除，软链接不可用
* 硬链接

```Plain Text
ln log.txt ln2
```

* 原文件删除，硬链接可用

**原文件、软硬链接的指向关系如下图：**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf1733cf5-f074-4238-956b-8f391ba86811.png)

# 文件系统命令

## df

查看系统挂载的磁盘情况。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac4fcd77d-0e69-4bbc-88c2-8a1540ad928c.png)

## mount

将光驱挂载到/mnt目录

```Plain Text
mount /dev/cdrom /mnt
```

## umount

```Plain Text
umount /mnt
```

注意卸载/mnt时，当前目录不能在/mnt下面，否则报出如下图所示提示：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora41550827-2e9e-45a3-bef1-8d77ad404af3.jpeg)

## 目录树及用途

| 目录   | 用途                                           |
| ------ | ---------------------------------------------- |
| /      | 虚拟目录的根目录。通常不会在这里存储文件       |
| /bin   | 二进制目录，存放许多用户级的GNU工具            |
| /boot  | 启动目录，存放启动文件                         |
| /dev   | 设备目录，Linux在这里创建设备节点              |
| /etc   | 系统配置文件目录                               |
| /home  | 主目录，Linux在这里创建用户目录                |
| /lib   | 库目录，存放系统和应用程序的库文件             |
| /media | 媒体目录，可移动媒体设备的常用挂载点           |
| /mnt   | 挂载目录，另一个可移动媒体设备的常用挂载点     |
| /opt   | 可选目录，常用于存放第三方软件包和数据文件     |
| /proc  | 进程目录，存放现有硬件及当前继承的相关信息     |
| /root  | root用户的主目录                               |
| /sbin  | 系统二进制目录，存放许多GNU管理员级工具        |
| /srv   | 服务目录，存放本地服务的相关文件               |
| /sys   | 系统目录，存放系统硬件信息的相关文件           |
| /tmp   | 临时目录，可以在该目录中创建和删除临时工作文件 |
| /usr   | 大量用户级的GNU工具和数据文件都存储在这里      |
| /var   | 可变目录，用以存放经常变化的文件，比如日志文件 |

# 系统操作命令

## du

du可以为目录递归地汇总每文件的磁盘使用情况。

* ￚa ：列出所有的文件与目录容量
* ￚh ：以人们较易读的容量格式(G/M)显示重要
* ￚs ：列出总量而已,而不列出每个各别的目录占用容量
* ￚk ：以 KBytes 列出容量显示
* ￚm ：以 MBytes 列出容量显示

## stat

显示文件的元数据。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3b7206e6-870f-4142-9c4f-0508ff5a4248.png)

## touch

* touch 已存在的文件，抹平各个时间
* touch 不存在的文件，则创建文件

## 进程相关命令

* `nohup [其他命令] &` ：后台守护执行
* `jobs`：列出当前的后台进程

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa7fc75f5-8b45-4a02-ac1d-8a51db2ac3aa.png)

* `fg [n]`：前台执行某个进程
  * 当直接使用`fg`时，会把`vim xshell.txt`调到前台执行；
  * 当使用`fg 2`或者`fg 3`时，会分别把`tail -F install.log`和`nohup tail -F install.log &`调到前台执行；

## kill

* **\-9**：直接终止
* **\-15**：等待处理完全部工作再终止

## history

显示命令输入的历史内容

## find

查询文件或目录

示例：在etc下查询一个名字为ifcfg-ens33的文件。

`find /etc/ -name ifcfg-ens33`

# 文本操作命令

## cat

查看文件内容，适用于小文件读取。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora69880947-62b7-4b7e-8212-7943e2d659d7.png)

## tac（反向输出）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6b4191a3-8b67-4dd3-b5dd-ee6fe943082d.png)

## more

* 空格(space)：向下翻页
* 回车(Enter)：向下翻一行
* “/字符串”：在当前显示内容中线下查询字符串内容
* “：f”：立即显示出文件名以及目前显示的行数
* “q”：离开显示内容
* "b"或\[ctrl\]-b：代表回翻，该操作仅对文件有效

## less

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora12187af2-0948-44f1-8852-ce42e89d4671.png)

查看文件内容的时候可以进行一下操作：

* 空格：向下翻一页
* \[pagedown\]：向下翻动一页
* \[pageup\]：向上翻动一页
* “/字符串”：向下搜索字符串内容
* “?字符串”：向上搜寻字符串内容
* n：重复上一次查询任务
* N：反向重复前一个查询任务
* g：到文件的第一行
* G：到文件的最后一行(注意大小写)
* q：离开文件



## head

head(取出前面几行，Centos6.5使用/etc/man.config文件)：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora766a30ac-aa07-4108-8150-78b9eaca12b7.jpeg)

## tail

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraefd78ef6-087b-49d1-ab66-f07cc24fe139.jpeg)

## 管道

```Plain Text
[root@bk1 ~]# ps -ef |grep ssh
[root@bk1 ~]# yum list |grep mysql
```

如何显示文件中间的几行？

`head -m profile | tail -n`

**管道左侧的输出作为右侧的输入**

`echo "/" | ls -l` 显示内容错误(不是预期的结果)，因为ls不需要输入，只需要参数

## Xargs

把管道左边的输出作为一个参数传给右边。

`echo "/" | xargs ls -l`

上面这种情况会展示根目录的内容列表。

*xargs：命令*

* 在标准输入中读取到的内容
* 自己的参数理解为一个字符串：模仿shell，做blank切分，第一个子字符串为命令
* 将步骤1的内容做为步骤2的命令的选项参数拼接起来
* 执行得到的结果

## 数据重定向

* 标准输入（stdin）：编号为0
* 标准输出（stdout）：编号为1
  * `1>`：以覆盖的方法，将正确的数据输出到文件；
  * `1>>`：以累加的方法，将正确的数据输出到文件；
* 标准错误输出（stderr）：编号为2
  * `2>`：以覆盖的方法，将错误输出的数据输出到文件；
  * `2>>`:以累加的方法，将错误输出的数据输出到文件；

```Plain Text
ls  -l  >> ok1.log
ls l  > ok2.log
ls  hello 2>/root/err.log
ls  hello / 1>/root/log.log 2>/root/err.log
ls 1>/dev/null
ls  2>/tmp/err.log
```

既向控制台输出，也向文件写入

`ls -l / | tee ok2.log`

* tee命令，将输入分成两个输出；
* tee只会把正确的信息保存到文件中，错误的无法保存；
* tee这种保存内容的方式为覆盖；

## cut

显示切割的行数据

* \-s：不显示没有分行符的行
* \-d：指定分隔符对源数据的行进行分割（**分割出来是一个数组**）
* \-f：选定显示那些列（**从1开始**）
  * m-n：m列到n列
  * \-n：第一列到n列
  * m-：第m列到最后一列
  * n：第n列

常用案例：

1.  以冒号分割并输出1到2个值

`cut -d ":" -f 1-2 /etc/passwd`

## sort

## wc

## sed

## awk

## vi/vim编辑器的使用