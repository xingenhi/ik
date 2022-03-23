# 01-InfluxDB

InfluxDB是一个用Go语言编写的时间序列数据库，旨在处理高写入和查询负载。它是TICK堆栈的组成部分 。InfluxDB旨在用作涉及大量带时间戳数据的任何用例的后备存储，包括DevOps监控，应用程序指标，物联网传感器数据和实时分析。同时influxdb也是一个开源分布式时序、事件和指标数据库，无需外部依赖。类似的数据库有kdb、Graphite、es等。

InfluxDB（时序数据库），常用的一种使用场景：监控数据统计。每毫秒记录一下电脑内存的使用情况，然后就可以根据统计的数据，利用图形化界面（InfluxDB V1一般配合Grafana）制作内存使用情况的折线图；

可以理解为按时间记录一些数据（常用的监控数据、埋点统计数据等），然后制作图表做统计；

## 1、什么是InfluxDB

从文章开票的介绍里能大概知道它的使用场景，下面介绍来自维基百科：

> InfluxDB是一个由InfluxData开发的开源时序型数据。它由Go写成，着力于高性能地查询与存储时序型数据。InfluxDB被广泛应用于存储系统的监控数据，IoT行业的实时数据等场景。

## 2、对常见关系型数据库（MySQL）的基础概念对比

| 概念         | MySQL    | InfluxDB                                                    |
| ------------ | -------- | ----------------------------------------------------------- |
| 数据库（同） | database | database                                                    |
| 表（不同）   | table    | measurement                                                 |
| 列（不同）   | column   | tag(带索引的，非必须)、field(不带索引)、timestemp(唯一主键) |

* tag set：**不同**的每组tag key和tag value的集合；
* field set：每组field key和field value的集合；
* retention policy：数据存储策略（默认策略为autogen）InfluxDB没有删除数据操作，规定数据的保留时间达到清除数据的目的；
* series：共同retention policy，measurement和tag set的集合；
* 示例数据如下： 其中census是measurement，butterflies和honeybees是field key，location和scientist是tag key

```Plain Text
name: census
————————————
time                 butterflies     honeybees     location     scientist
2015-08-18T00:00:00Z      12             23           1         langstroth
2015-08-18T00:00:00Z      1              30           1         perpetua
2015-08-18T00:06:00Z      11             28           1         langstroth
2015-08-18T00:06:00Z      11             28           2         langstroth
```

示例中有三个tag set

## 3、注意点

* tag 只能为字符串类型
* field 类型无限制
* 不支持join
* 支持连续查询操作（汇总统计数据）：CONTINUOUS QUERY
* 配合Telegraf服务（Telegraf可以监控系统CPU、内存、网络等数据）
* 配合Grafana服务（数据展现的图像界面，将influxdb中的数据可视化）

# 02-数据库系统架构

[drawio](--e9J1gLQ3AeuzUkSWmCyTqzamm3GIW7YptgGum_KJg.svg)

* DataBase：数据库；
* RP：数据保留策略。数据保留策略是数据库级别而不是表级别的属性。每一个数据库有多个保留策略，但是只能有一个默认策略；
* ShardGroup：每个ShardGroup只存储指定时间段的数据，不同的ShardGroup对应的时间段不重合；

# 03-部署InfluxDB

## 一、安装包部署

1、准备安装包

安装包：`1.7.8`

> [下载链接](https://knowledge-base-1301208976.cos.ap-beijing.myqcloud.com/influxdb/InfluxDBStudio-0.2.0.zip)

influx安装包中的配置文件在路径`etc/influxdb` 下，influxdb.conf具体内容如下：

> [influxdb.conf](https://knowledge-base-1301208976.cos.ap-beijing.myqcloud.com/influxdb/influxdb.conf)

* `[meta]`
  * `dir` 元数据库存储路径
* `[data]`
  * `dir` 数据库数据存储路径
  * `wal-dir` 预写日志存储路径
  * `series-id-set-cache-size`
* `[coordinator]`
* `[retention]`
* `[shard-precreation]`
* `[monitor]`
* `[http]`
* `[logging]`
* `[subscriber]`
* `[[graphite]]`
* `[[collectd]]`
* `[[opentsdb]]`
* `[[udp]]`
* `[continuous_queries]`
* `[tls]`

2、启动

```Plain Text
# 前台启动
bin/influxd -config ../etc/influxdb/influxdb.conf
# 后台启动
nohup bin/influxd -config ../etc/influxdb/influxdb.conf &
```

3、登录

`bin/influx` 

## 二、docker部署


## 三、docker-compose部署

> [docker-compose.yml](https://knowledge-base-1301208976.cos.ap-beijing.myqcloud.com/influxdb/docker-compose.yml)
>
> [install.sh](https://knowledge-base-1301208976.cos.ap-beijing.myqcloud.com/influxdb/install.sh)

## 四、连接工具

> [InfluxDBStudio-0.2.0.zip](https://knowledge-base-1301208976.cos.ap-beijing.myqcloud.com/influxdb/InfluxDBStudio-0.2.0.zip)

# 04-常用命令

## 1、数据库

```Plain Text
-- 查看当前数据库
show databases

-- 创建数据库
create database test

-- 使用数据库
use test

-- 删除数据库
drop database test
```

## 2、数据保留策略

```Plain Text
-- 创建数据库策略
-- <retention_policy_name>：保留策略名称
-- <database_name>：数据库名称
-- <duration>：数据过期时间
-- replication：副本因子
-- shard duration：分片组的默认时长
-- [default]：是否为默认保存策略
create retention policy <retention_policy_name> on <database_name> duration <duration> replication <n> [shard duration <duration>] [default]
-- 例如：create retention policy "influx_retention" on "test" duration 30d replication 1 default;

-- 查看保留期
show retention policies on <database_name>

-- 修改保留期
alter retention policy <retention_policy_name> on <database_name> duration <duration>

-- 删除保留期
drop retention policy <retention_policy_name> on <database_name>
```

## 3、表

```Plain Text
-- 查看表
show measurments

-- 插入数据（自动创建表）
use <database_name>
insert <表名>,[tags] [fileds]
-- 例如：
insert weather,altitude=1000,area=北 temperature=11,humidity=-4
insert weather,altitude=500,area=北 temperature=18,humidity=5
insert weather,altitude=1000,area=南 temperature=12,humidity=-5
insert weather,altitude=500,area=南 temperature=25,humidity=7

-- 简单查询数据
select * from <表名>

-- 修改时间的显示格式
precision rfc3339

-- 删除表
drop measurment <表名>
```

## 4、用户

```Plain Text
-- 显示用户
show users

-- 创建用户
-- 普通用户
create user <user_name> with password 'password'
-- 管理员用户
create user <user_name> with password 'password' with all privileges

-- 修改用户密码
set password for <user_name> = 'password'

-- 删除用户
drop user <user_name>
```

## 5、数据库访问权限

* 用户授权
  * 授权用户数据库操作权限

`grant all privileges on <database_name> to <user_name>`

   * 授权用户管理员权限
     `grant all privileges to <user_name>` 
     备注：只能使用admin权限才可以操作数据库。
* 撤销授权
  * 撤销用户数据库操作权限

`revoke all privileges on <database_name> from <user_name>`

   * 撤销用户管理员权限

`revoke all privileges from <user_name>` 

## 6、开启用户登录认证

   * 开启登录认证

在influxdb配置文件infuxdb.conf中，开启用户登录认证，添加如下内容：

```Plain Text
[http]
auth-enabled = true
```

   * 开启认证后无密码登录
     `bin/influx`
   * 开启认证后有密码登录
     `bin/influx -username [username] -password <password>`
