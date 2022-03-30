# Node.js

```shell
# 在node.js官网（https://nodejs.org/zh-cn/download/）上选择linux版本，右键复制下载链接
cd /usr/local/bin/
wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz
tar xvf node-v12.18.3-linux-x64.tar.xz -C ./
# 配置环境变量
sudo vi /etc/profile
------------------------------------------
追加：
export NODE_HOME=/usr/local/bin/node-v12.18.3-linux-x64
export PATH=$PATH:$NODE_HOME/bin 
export NODE_PATH=$NODE_HOME/lib/node_modules
------------------------------------------
# 刷新环境变量配置
source /etc/profile
# 测试
node -v
npm -v
```

