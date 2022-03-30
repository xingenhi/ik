# JDK

百度云下载链接

链接：https://pan.baidu.com/s/1bu81MKLPdDSFJtU49PCWlQ

提取码：xghi

复制这段内容后打开百度网盘手机App，操作更方便哦

官方下载链接

https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

上面提供了两种下载方式，一个是本人的百度云分享，另外一个是提供的官方下载地址。

本文推荐的jdk版本是1.8.x，在目前的使用中出现的版本问题较少。

```shell
cd /usr/local/bin/
打开xftp，上传文件
# 解压包
tar -zxvf jdk-8u241-linux-x64.tar.gz -C ./
# 删除上传的压缩包
rm -rf jdk-8u241-linux-x64.tar
# 配置环境变量
sudo vi /etc/profile
------------------------------------------
追加：
JAVA_HOME=/usr/local/bin/jdk1.8.0_241
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME
export PATH
export CLASSPATH
------------------------------------------
# 刷新环境变量配置
source /etc/profile
java -version
```

