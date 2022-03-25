# layui遇到的问题解决办法

# 外部调用layui里面的方法

方法一、

```java
外部调用：
    οnclick="layui.edit(' + id + ')"


内部接收：
    layui.edit = function(id){
       console.log(id);
    }
```

方法二、

```java
外部调用：
    οnclick="clickDic(' + id + ')"

内部接收：
    window.clickDic= function(id){
        console.log(id);
    }
```