# Jenkins

## 一、安装

```Plain Text
# 创建存放路径
mkdir -vp /usr/local/docker/jenkins
# 进入刚创建的路径
cd /usr/local/docker/jenkins
# 创建并进入docker-compose.yml
vim /usr/local/docker/jenkins/docker-compose.yml
------------------------------------------
输入：
version: '3.1'
services:
  jenkins:
    restart: always
    image: jenkinsci/jenkins
    container_name: jenkins
    ports:
      # 发布端口
      - 8080:8080
      # 基于 JNLP 的 Jenkins 代理通过 TCP 端口 50000 与 Jenkins master 进行通信
      - 50000:50000
    environment:
      TZ: Asia/Shanghai
    volumes:
      - ./data:/var/jenkins_home
------------------------------------------
docker-compose up -d
docker-compose logs -f
# 遇到权限问题使用以下方案解决：chown -R 1000 /usr/local/docker/jenkins/data
```

## 二、解锁 Jenkins

Jenkins 第一次启动时需要输入一个初始密码用以解锁安装流程，使用 `docker logs jenkins` 即可方便的查看到初始密码

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraTDVGDREzz8k3O6YzYpTyK-9vjyCruoYg_lwB9vz1ZHo.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraDQ718XLsOaSAFalZT4A9mK-4HaYgtj67sytkwqbHJYM.png)

**注意：** 安装时可能会因为网速等原因导致安装时间比较长，请大家耐心等待。如果长时间停留在安装页没反应，请尝试使用 `F5` 刷新一下。

## 三、使用自定义插件的方式安装

插件是 Jenkins 的核心，其丰富的插件（截止到 `2018.10.29` 共有 `77350` 个插件）可以满足不同人群的不同需求

插件地址：[https://plugins.jenkins.io/](https://plugins.jenkins.io/)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoralA76Xf_oyDAhoO4hP114efi3nqBrf4lX0t9AMwHLFJI.png)

**注意：** 除了默认勾选的插件外，一定要勾选 `Publish over SSH` 插件，这是我们实现持续交付的重点插件。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraaNklb_f6N41DI05eOgyYdlYNRf-KbmFsWlWltwLbY18.png)

**开始安装了，根据网络情况，安装时间可能会比较长，请耐心等待**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawoz79ALiHILNG9CwSFfCxnS13RV4ibFZLkkx9CdKD0M.png)

**很多插件装不上怎么办？不要慌，记住这些插件的名字，咱们稍后可以手动安装**

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabeIRNSx70ZHus3YZd5XYdvHj8TBpIuZ0cxBYvR7lhww.png)

## 四、安装成功效果图

* 创建管理员

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraj3RpBMMalOVx8MiVbFkiYrAXfh8abkcDQ9Oagp_Und4.png)

* 安装完成，进入首页

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraIkEDy7lG9ppqFGocqwS_bBI4ohIfZucpc973w0Ycr-8.png)

## 五、附：Jenkins 手动安装插件

### 1、使用插件管理器安装

* `Manage Jenkins` -> `Manage Plugins` -> `Avaliable`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoralVJ6K1SRnyX4udfKxw87WRvB5KR2-mPs61ByqhJjQtY.png)

* 过滤出想要安装的插件，然后点击 `Download now and install after restart`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraH9lfLS03Db7SRUtVs8cyDKDU5Whf-ydHFYmZaxLTu8A.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraPGKFe99jArswNM_cQIGf2nqWOnOZVXdAgyDZsSykpu0.png)

### 2、手动上传 `.hpi` 文件

* 点击进入插件中心

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorajZ4j1p_IqJAzbYICtfk6ZK_SqLG_vOfo8HlX3CzAUW8.png)

* 点击 `Archives`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraAguZRT_EyYFhhwOyGWiAuOyNDTE_q9HAigsANFz9enQ.png)

* 下载需要的版本

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraVqkpazH1FqFTcoCKtzVcfES0YmCzWNZOpBj_IMs3SRU.png)

* 在插件管理器中选择 `Advanced`

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7Q3URpKxMlM1p_-dfdCwlReoBAuL9uGhTlk6NCcTBqI.png)

* 选择上传即可

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraMYsqd4JMb26Y3XvurbDSpjOmFLzF36Dkwy5I6gBCb60.png)

### 3、重启 Jenkins

```Plain Text
docker-compose down
docker-compose up -d
```

**注意：** 请留意需要下载插件的警告信息，如果不满足安装条件，Jenkins 是会拒绝安装的。如下图：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoravoxyeXFTAkjX-7foZqApmaBot5LHZlDC9HIP-K4sGCY.png)

