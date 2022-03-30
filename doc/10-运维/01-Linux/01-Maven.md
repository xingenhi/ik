# Maven

百度云下载链接

链接：https://pan.baidu.com/s/19t6Lz7R1GO40AtPl5KtQgg

提取码：xghi

复制这段内容后打开百度网盘手机App，操作更方便哦

官方下载链接

http://maven.apache.org/download.cgi

上面提供了两种下载方式，一个是本人的百度云分享，另外一个是提供的官方下载地址。

本文推荐的maven版本是3.5.x，在目前的使用中出现的版本问题较少。

```shell
cd /usr/local/bin/
打开xftp，上传文件
# 解压文件
tar -zxvf apache-maven-3.5.4-bin.tar.gz -C ./
# 删除原文件
rm -rf apache-maven-3.5.4-bin.tar.gz
# 配置环境变量
sudo vi /etc/profile
------------------------------------------
追加：
export MAVEN_HOME=/usr/local/bin/apache-maven-3.5.4
export PATH=$MAVEN_HOME/bin:$PATH
------------------------------------------
# 刷新环境变量配置
source /etc/profile
mvn -version
```

