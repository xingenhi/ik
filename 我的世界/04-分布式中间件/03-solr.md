# 01【掌握】入门问题

## 1，问题概述

大数据量的查询问题

假设我们要从商品的表里面查询一个商品

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.32454756066100193.png)

我们的数据库里面肯定有个t\_goods的表，我们现在利用商品的名称做模糊查询

### 1.1 对于数据库的查询的

select \* from t\_goods where goodsName like “%手机%” ;

问题：

1，这个查询速度快不快？

2，对于goodsName 是否添加了索引（假设我们添加了）

3，对于上面的sql 语句，是否会走索引？

索引的本质是一颗树，若我们使用（“%手机%” ） 查询时，它无法去比较大小，无法比较，就无法走索引！

那种场景走索引：最左匹配原则 goodsName like “手机%”，它会走索引。

                             goodsName like “%手机” 它不会走索引。

既然不会走索引，它的查询速度，就需要来一个全表的扫描。它的速度会非常慢！

假设我们的数据有百万级别的，查询一个商品，可能就需要20s 左右！

### 1.2 使用Map 集合来做查询

Map<String,List>

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.46846710733364383.png)

我们在Map 集合的Key 放商品的关键字，value放商品的id的集合。

到时我们使用关键字查询商品的ids就可以了

### 1.3 怎么得到商品的关键字？

商品名称Eg: 

【小米10 旗舰新品2月13日14点发布】小米10 骁龙865 5G 抢先预约抽壕礼

荣耀20S 李现同款 3200万人像超级夜景 4800万超广角AI三摄 麒麟810 全网通版

荣耀20i 3200万AI自拍 超广角三摄 全网通版6GB+64GB 渐变红 移动联通电信4G

Redmi 8A 5000mAh 骁龙八核处理器 AI人脸解锁 4GB+64GB 深海蓝 游戏老人手机

### 1.4，老师问你一个问题：请说出包含 明月的古诗？

明月几时有,把酒问青天(苏东坡《水调歌头》)

海上升明月，天涯共此时（张九龄《望月怀远》）

暗尘随马去，明月逐人来（苏昧道《正月十五夜》）

三五明月满，四五蟾兔缺（无名氏《孟冬寒气至》）

白云还自散，明月落谁家（李白《忆东山二首》）

明月却多情，随人处处行（张先《菩萨蛮》）

明月净松林，千峰同一色（欧阳修《自菩提步月归广化寺》）

明月几时有，把酒问青天（苏轼《水调歌头》）

明月出天山，茫茫人海间（李白《关山月》）

明月照高楼，流光正徘徊（曹植《怨歌行》）

明月隐高树，长河没晓天（陈子昂《春夜别友人》）

举杯邀明月，对影成三人（李白《月下独酌》）

举头望明月,低头思故乡(李白《静夜思》)

深林人不知，明月来相照（王维《竹里馆》）

明月松间照，清泉石上流（王维《山居秋暝》）

如果在使用数据库查询，你只能遍历你学过的每一首诗，看看里面有没有《明月》两个字

如果使用索引

明月---List<以上所有>

白云---List<忆东山二首>

青天---List<水调歌头>

---

## 2，分词

海上生明月 - 如何分成  ----->海上 | 生 | 明月

### 2.1 新建项目

#### 创建空项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8682862539500651.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.05749302157852489.png)

#### 创建项目

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9054765285732731.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.33592834554682377.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.27629238849149507.png)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1376387832147488.png)

 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.03774643386492361.png)

### 2.2 jieba分词器（导入依赖）

```java
<dependencies>
    <dependency>
        <groupId>com.huaban</groupId>
        <artifactId>jieba-analysis</artifactId>
        <version>1.0.2</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.12</version>
    </dependency>
</dependencies>
```

 2.3 分词测试

```java
package com.xingen.slor.test;

import com.huaban.analysis.jieba.JiebaSegmenter;
import com.huaban.analysis.jieba.SegToken;

import java.util.List;

/**
 * @Description : 分词测试
 * @Author : 辛根
 * @Date : 2020/4/12 18:24
 */
public class TestJieBa {

    // 声明分词对象
    private static JiebaSegmenter jiebaSegmenter = new JiebaSegmenter();

    public static void main(String[] args) {

        String content = "锤子(smartisan) 坚果Pro3 8GB+128GB 黑色 骁龙855PLUS 4800万四摄 全网通双卡双待 全面屏游戏手机";

        /**
         * 参数1：要分词的内容
         * 参数2：分词模式
         */
        List<SegToken> process = jiebaSegmenter.process(content, JiebaSegmenter.SegMode.SEARCH);
        for (SegToken segToken : process) {
            System.out.println(segToken.word);
        }
        System.out.println("分词完成" + process.size());

    }
}

```

3，使用商品搜索案例来展示我们的Map集合  

### 3.1 商品的模拟

```java
package com.xingen.slor.test.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/12 18:30
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goods {

    /**
     * 商品ID
     */
    private Integer id;

    /**
     * 商品名称
     */
    private String goodsname;

    /**
     * 商品价格
     */
    private Double goodsPrice;
}
```

### 3.2 数据库的模拟

```java
package com.xingen.slor.test.utils;

import com.xingen.slor.test.domain.Goods;

import java.util.*;

/**
 * @Description :模拟数据库
 * @Author : 辛根
 * @Date : 2020/4/12 18:29
 */
public class DBUtils {
    private static Map<Integer, Goods> db = new HashMap<Integer, Goods>();

    public static void insert(Goods goods) {
        db.put(goods.getId(), goods);
    }

    public static Goods getById(Integer id) {
        return db.get(id);
    }

    /**
     * @param ids
     * @ClassName: DBUtils
     * @Description: 提供一个根据ids的集合查询商品的方法     key--->多个商品ID
     * @Return: java.util.List<com.xingen.slor.test.domain.Goods>
     * @Author: 辛根 2020/4/12 18:38
     */
    public static List<Goods> getByIds(Set<Integer> ids) {
        if (null == ids || ids.isEmpty()) {
            return Collections.emptyList();
        }
        List<Goods> list = new ArrayList<Goods>();
        for (Integer id : ids) {
            Goods g = db.get(id);
            if (null != g) {
                list.add(g);
            }
        }
        return list;
    }

}
```

### 3.3 商品服务的接口GoodsService

```java
package com.xingen.slor.test.service;

import com.xingen.slor.test.domain.Goods;

import java.util.List;

/**
 * @Description :
 * @Author : 辛根  2020/4/12 18:38
 */
public interface GoodsService {

    /**
     * @Description:添加商品
     * @Author:辛根 2020/4/12 18:39
     */
    void insert(Goods goods);

    /**
     * @Description:根据商品名称模糊查询商品
     * @Author:辛根 2020/4/12 18:40
     */
    List<Goods> findByGoodsName(String goodsName);
}
```

### 3.4 商品服务的实现类（GoodsServiceImpl）

```java
package com.xingen.slor.test.service.impl;

import com.huaban.analysis.jieba.JiebaSegmenter;
import com.huaban.analysis.jieba.SegToken;
import com.xingen.slor.test.domain.Goods;
import com.xingen.slor.test.service.GoodsService;
import com.xingen.slor.test.utils.DBUtils;

import java.util.*;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/12 18:40
 */
public class GoodsServiceImpl implements GoodsService {

    // 模拟一个索引库
    private Map<String, Set<Integer>> indexs = new HashMap<String, Set<Integer>>();

    private JiebaSegmenter jiebaSegmenter = new JiebaSegmenter();

    public void insert(Goods goods) {
        /**
         * 当插入商品值时，要构造一个Map集合
         * Map<String,List<ID>/>
         */
        //分词
        List<String> keywords = this.fenci(goods.getGoodsname());
        // 插入数据
        DBUtils.insert(goods);
        // 保存到分词的关键字和ids的映射关系
        saveKeyWords(keywords, goods.getId());
    }

    /**
     * @param keywords
     * @param id
     * @ClassName: GoodsServiceImpl
     * @Description: 保存分词关键字和id的映射关系
     * @Return: void
     * @Author: 辛根 2020/4/12 18:47
     */
    private void saveKeyWords(List<String> keywords, Integer id) {
        if (null != keywords && !keywords.isEmpty()) {
            for (String keyword : keywords) {
                if (indexs.containsKey(keyword)) {// 先看关键字在索引里面是否存在
                    Set<Integer> integers = indexs.get(keyword); // 得到这个关键字对应的已存在的id集合
                    integers.add(id); // 把新插入的id放入
                } else { // 说明这是一个新词，之前的索引库不存在
                    HashSet<Integer> ids = new HashSet<Integer>();
                    ids.add(id);
                    indexs.put(keyword, ids);
                }
            }
        }
    }

    /**
     * @param goodsname
     * @ClassName: GoodsServiceImpl
     * @Description: 完成分词
     * @Return: java.util.List<java.lang.String>
     * @Author: 辛根 2020/4/12 18:45
     */
    private List<String> fenci(String goodsname) {
        List<SegToken> tokens = jiebaSegmenter.process(goodsname, JiebaSegmenter.SegMode.SEARCH);
        List<String> keywords = new ArrayList<String>(tokens.size());
        for (SegToken token : tokens) {
            keywords.add(token.word);
        }
        return keywords;
    }

    /**
     * @param goodsName
     * @ClassName: GoodsServiceImpl
     * @Description: 查询
     * @Return: java.util.List<com.xingen.slor.test.domain.Goods>
     * @Author: 辛根 2020/4/12 18:57
     */
    public List<Goods> findByGoodsName(String goodsName) {
        // 直接从map中取有没有
        if (indexs.containsKey(goodsName)) {
            // 取出有goodsName里面有传过来的goodsName商品的ID
            Set<Integer> ids = indexs.get(goodsName);
            List<Goods> goods = DBUtils.getByIds(ids);
            return goods;
        } else {
            return Collections.emptyList();
        }
    }
}
```

### 3.5 测试类

```java
package com.xingen.slor.test;

import com.xingen.slor.test.domain.Goods;
import com.xingen.slor.test.service.GoodsService;
import com.xingen.slor.test.service.impl.GoodsServiceImpl;

import java.util.List;

/**
 * @Description :测试类
 * @Author : 辛根
 * @Date : 2020/4/12 18:57
 */
public class TestApp {
    public static void main(String[] args) {
        GoodsService goodsService = new GoodsServiceImpl();
        Goods goods = new Goods(1, "苹果手机", 10.00);
        Goods goods1 = new Goods(2, "华为手机", 11.00);
        Goods goods2 = new Goods(3, "红米手机", 5.00);
        Goods goods3 = new Goods(4, "联想手机", 6.00);
        goodsService.insert(goods);
        goodsService.insert(goods1);
        goodsService.insert(goods2);
        goodsService.insert(goods3);

        List<Goods> goodss = goodsService.findByGoodsName("苹果");
        for (Goods goodsTest : goodss) {
            System.out.println(goodsTest);
        }
    }
}
```

### 3.6 我们在搜索苹果手机时，搜索不出来结果

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.19486367076455835.png)

#### 解决方案

搜索的时候也进行分词

#### 修改GoodsService

```java
/**
 * @Description: 根据商品名称模糊查询商品
 * @Param: [goodsName]
 * @return: java.util.List<com.leige.solr.test.domain.Goods>
 * @Author: 雷哥
 * @Date: 2020/4/2
 */
List<Goods> findByKeyWord(String keyword);
```

#### 修改GoosServiceImpl

```java
@Override
public List<Goods> findByKeyWord(String keyword) {

    //先分词再查询
    List<String> stringList = this.fenci(keyword);
    Set<Integer> idsSet = new HashSet<>();
    for (String kw : stringList) {
        //直接从Map里面取有没有
        if(indexs.containsKey(kw)){
            Set<Integer> ids = indexs.get(kw);//取出有goodsName里面有传过来的goodsName商品的ID
            idsSet.addAll(ids);
        }
    }

    if(idsSet.isEmpty()){
        return Collections.emptyList();
    }else{
        return DBUtils.getByIds(idsSet);
    }
}
```

#### 修改TestApp测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.34544623288622284.png)

3.7 搜索速度的提升

之前：是需要把数据库做一个全表的扫描

现在：直接通过计算hash值定位 值，在非常理想的情况下。他的速度，只计算一次

### 3.8 新的问题

我们的一句话会分出来很多的关键字，都给他建立<K,List> 我们的Map 里面将容纳非常多的元素！

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9834968168767998.png)

那我们往Map 集合里面放元素时，将有29 个被放进去！若成千上万的商品，那Map 集合非常大！怎么解决Map 集合无限扩大的问题？

解决方案

#### 字典树

三点水  --- 清    浮    

单人旁      位   价

##### 之前没有使用字典树的图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7480331470058019.png)

##### 使用字典树的图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1866885991814226.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5692267851523972.png)

# 02【熟悉】倒排索引算法

## 1，什么是倒排索引？

见其名知其意，有倒排索引，对应肯定，有正向索引。

正向索引（forward index），反向索引（inverted index）更熟悉的名字是倒排索引。

在搜索引擎中每个文件都对应一个文件ID，文件内容被表示为一系列关键词的集合（实际上在搜索引擎索引库中，关键词也已经转换为关键词ID）。例如“文档1”经过分词，提取了20个关键词，每个关键词都会记录它在文档中的出现次数和出现位置。

正向索引的结构如下：

       “文档1”的ID > 单词1：出现次数，出现位置列表；单词2：出现次数，出现位置列表；…………。

       “文档2”的ID > 此文档出现的关键词列表。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2933874638187334.png)

　　一般是通过key，去找value。

    当用户在主页上搜索关键词“华为手机”时，假设只存在正向索引（forward index），那么就需要扫描索引库中的所有文档，找出所有包含关键词“华为手机”的文档，再根据打分模型进行打分，排出名次后呈现给用户。因为互联网上收录在搜索引擎中的文档的数目是个天文数字，这样的索引结构根本无法满足实时返回排名结果的要求。

    所以，搜索引擎会将正向索引重新构建为倒排索引，即把文件ID对应到关键词的映射转换为关键词到文件ID的映射，每个关键词都对应着一系列的文件，这些文件中都出现这个关键词。

倒排索引的结构如下：

       “关键词1”：“文档1”的ID，“文档2”的ID，…………。

       “关键词2”：带有此关键词的文档ID列表。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14150297468602474.png)

　　从词的关键字，去找文档。

---

## 2，单词——文档矩阵

      单词-文档矩阵是表达两者之间所具有的一种包含关系的概念模型，如下图的每列代表一个文档，每行代表一个单词，打对勾的位置代表包含关系。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4194246711551843.png)

     从纵向即文档这个维度来看，每列代表文档包含了哪些单词，比如文档1包含了词汇1和词汇4，而不包含其它单词。从横向即单词这个维度来看，每行代表了哪些文档包含了某个单词。比如对于词汇1来说，文档1和文档4中出现过单词1，而其它文档不包含词汇1。矩阵中其它的行列也可作此种解读。

    搜索引擎的索引其实就是实现“单词-文档矩阵”的具体数据结构。可以有不同的方式来实现上述概念模型，比如“倒排索引”、“签名文件”、“后缀树”等方式。但是各项实验数据表明，“倒排索引”是实现单词到文档映射关系的最佳实现方式，所以本博文主要介绍“倒排索引”的技术细节。

---

## 3，倒排索引基本概念

      文档(Document)：一般搜索引擎的处理对象是互联网网页，而文档这个概念要更宽泛些，代表以文本形式存在的存储对象，相比网页来说，涵盖更多种形式，比如Word，PDF，html，XML等不同格式的文件都可以称之为文档。再比如一封邮件，一条短信，一条微博也可以称之为文档。在本书后续内容，很多情况下会使用文档来表征文本信息。

     文档集合(Document Collection)：由若干文档构成的集合称之为文档集合。比如海量的互联网网页或者说大量的电子邮件都是文档集合的具体例子。

     文档编号(Document ID)：在搜索引擎内部，会将文档集合内每个文档赋予一个唯一的内部编号，以此编号来作为这个文档的唯一标识，这样方便内部处理，每个文档的内部编号即称之为“文档编号”，后文有时会用DocID来便捷地代表文档编号。

     单词编号(Word ID)：与文档编号类似，搜索引擎内部以唯一的编号来表征某个单词，单词编号可以作为某个单词的唯一表征。

     倒排索引(Inverted Index)：倒排索引是实现“单词-文档矩阵”的一种具体存储形式，通过倒排索引，可以根据单词快速获取包含这个单词的文档列表。倒排索引主要由两个部分组成：“单词词典”和“倒排文件”。

     单词词典(Lexicon)：搜索引擎的通常索引单位是单词，单词词典是由文档集合中出现过的所有单词构成的字符串集合，单词词典内每条索引项记载单词本身的一些信息以及指向“倒排列表”的指针。

     倒排列表(PostingList)：倒排列表记载了出现过某个单词的所有文档的文档列表及单词在该文档中出现的位置信息，每条记录称为一个倒排项(Posting)。根据倒排列表，即可获知哪些文档包含某个单词。

     倒排文件(Inverted File)：所有单词的倒排列表往往顺序地存储在磁盘的某个文件里，这个文件即被称之为倒排文件，倒排文件是存储倒排索引的物理文件。

     关于这些概念之间的关系，通过图2可以比较清晰的看出来。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.24580324753290586.png)

---

## 4，倒排索引简单实例

   倒排索引从逻辑结构和基本思路上来讲非常简单。下面我们通过具体实例来进行说明，使得读者能够对倒排索引有一个宏观而直接的感受。

   假设文档集合包含五个文档，每个文档内容如图3所示，在图中最左端一栏是每个文档对应的文档编号。我们的任务就是对这个文档集合建立

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8495683435887849.png)

　　中文和英文等语言不同，单词之间没有明确分隔符号，所以首先要用分词系统将文档自动切分成单词序列。这样每个文档就转换为由单词序列构成的数据流，为了系统后续处理方便，需要对每个不同的单词赋予唯一的单词编号，同时记录下哪些文档包含这个单词，在如此处理结束后，我们可以得到最简单的倒排索引 如下图，“单词ID”一栏记录了每个单词的单词编号，第二栏是对应的单词，第三栏即每个单词对应的倒排列表。比如单词“谷歌”，其单词编号为1，倒排列表为{1,2,3,4,5}，说明文档集合中每个文档都包含了这个单词。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9673087838809521.png)

　　之所以说上图所示倒排索引是最简单的，是因为这个索引系统只记载了哪些文档包含某个单词，而事实上，索引系统还可以记录除此之外的更多信息。下图是一个相对复杂些的倒排索引，与上图的基本索引系统比，在单词对应的倒排列表中不仅记录了文档编号，还记载了单词频率信息（TF），即这个单词在某个文档中的出现次数，之所以要记录这个信息，是因为词频信息在搜索结果排序时，计算查询和文档相似度是很重要的一个计算因子，所以将其记录在倒排列表中，以方便后续排序时进行分值计算。在图5的例子里，单词“创始人”的单词编号为7，对应的倒排列表内容为：（3:1），其中的3代表文档编号为3的文档包含这个单词，数字1代表词频信息，即这个单词在3号文档中只出现过1次，其它单词对应的倒排列表所代表含义与此相同。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.05828327821626595.png)

 　　实用的倒排索引还可以记载更多的信息，下图所示索引系统除了记录文档编号和单词频率信息外，额外记载了两类信息，即每个单词对应的“文档频率信息”（对下图的第三栏）以及在倒排列表中记录单词在某个文档出现的位置信息。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.072060620330237.png)

   **“文档频率信息”**代表了在文档集合中有多少个文档包含某个单词，之所以要记录这个信息，其原因与单词频率信息一样，这个信息在搜索结果排序计算中是非常重要的一个因子。而单词在某个文档中出现的位置信息并非索引系统一定要记录的，在实际的索引系统里可以包含，也可以选择不包含这个信息，之所以如此，因为这个信息对于搜索系统来说并非必需的，位置信息只有在支持“短语查询”的时候才能够派上用场。

     以单词“拉斯”为例，其单词编号为8，文档频率为2，代表整个文档集合中有两个文档包含这个单词，对应的倒排列表为：{(3;1;<4>)，(5;1;<4>)},其含义为在文档3和文档5出现过这个单词，单词频率都为1，单词“拉斯”在两个文档中的出现位置都是4，即文档中第四个单词是“拉斯”。

---

## 5，树形结构

       B树（或者B+树）是另外一种高效查找结构，图8是一个 B树结构示意图。B树与哈希方式查找不同，需要字典项能够按照大小排序（数字或者字符序），而哈希方式则无须数据满足此项要求。

       B树形成了层级查找结构，中间节点用于指出一定顺序范围的词典项目存储在哪个子树中，起到根据词典项比较大小进行导航的作用，最底层的叶子节点存储单词的地址信息，根据这个地址就可以提取出单词字符串。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9393583542441956.png)

## 6，总结


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.48170067245367987.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7616930764874694.png)

单词ID：记录每个单词的单词编号；

单词：对应的单词；

文档频率：代表文档集合中有多少个文档包含某个单词

倒排列表：包含单词ID及其他必要信息

DocId：单词出现的文档id

TF：单词在某个文档中出现的次数

POS：单词在文档中出现的位置

     以单词“加盟”为例，其单词编号为6，文档频率为3，代表整个文档集合中有三个文档包含这个单词，对应的倒排列表为{(2;1;<4>),(3;1;<7>),(5;1;<5>)}，含义是在文档2，3，5出现过这个单词，在每个文档的出现过1次，单词“加盟”在第一个文档的POS是4，即文档的第四个单词是“加盟”，其他的类似。

这个倒排索引已经是一个非常完备的索引系统，实际搜索系统的索引结构基本如此。

# 03【熟悉】手写倒排索引

之前我们必须对文档进行分词

trie.insert("华为");

trie.insert("华为手机");

trie.insert("华为平板");

trie.insert("华为牛逼");

trie.insert("鸿蒙");

trie.insert("华为鸿蒙操作系统");

文档---《华为  华为手机  华为平板  华为牛逼 鸿蒙 华为鸿蒙操作系统》

分词

       --华为

       --华为手机

       --华为平板

       --华为牛逼

       --鸿蒙

       --华为鸿蒙操作系统

针对上面的分词放到字典树之后的结果为

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7217625512846388.png)

 手写倒排

 创建Node

```java
import lombok.Data;

import java.util.LinkedList;

/**
 * Created with IntelliJ IDEA.
 *字典树的节点
 * @Auther: 雷哥
 * @Date: 2020/04/02/17:21
 * @Description:
 */
@Data
public class Node {

    private char content;//存在当前节点的字
    private boolean isEnd;//是否是词的结尾
    private int count;//这个词在这个字下面的分支的个数
    private LinkedList<Node> childList;//子节点



    /***
    * @Description: 构造方法 初始化节点使用
    * @Param:
    * @return:
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public Node(char c){
        childList=new LinkedList<>();
        isEnd=false;
        content=c;
        count=0;
    }

    /****
    * @Description: 提供一个遍历node中的linkedList中是否有这个字。有就意味着可以继续查找下去，没有就没有
    * @Param:
    * @return:
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public Node subNode(char c){
        if(null!=childList&&!childList.isEmpty()){
            for (Node node : childList) {
                if(node.content==c){
                    return node;
                }
            }
        }
        return null;
    }

}
```

 创建TrieTree

```java
/**
 * Created with IntelliJ IDEA.
 *字典树
 * @Auther: 雷哥
 * @Date: 2020/04/02/17:30
 * @Description:
 */
public class TrieTree {

    private Node root;//根

    /***
    * @Description: 因为只有一个根
    * @Param: []
    * @return:
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public TrieTree(){
        root=new Node(' ');//构造一个空的根节点
    }






    /***
    * @Description: 查询
    * @Param: word 要判断的词
    * @return: 是否存在
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public boolean search(String word){ //华为
        Node current=root;//从根节点开始找

        if(null!=word){
            //转成字符数组
            char[] chars = word.toCharArray();
            if(null!=chars&&chars.length>0){
                for (char c : chars) {
                    Node node = current.subNode(c);
                    if(null==node){//如果返回的子节点为空 说明不存在
                        return false;
                    }else{
current=current.subNode(c);
                    }
                }
                //判断当前节点是否是结束节点
                if(current.isEnd()){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return false;
        }
    }


    /***
    * @Description: 插入方法，先判断是否有这个词，(通过上面的写的查询方法) 如果没有，。就一个一个按顺序判断里面的字
     * 如果有这个字，继续判断下一个，当没有字个字的时候，对空上字new Node对象，放到上一个字的LindkedList里面
     *
    * @Param: [word]  要插入的分词
    * @return: void
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public void insert(String word){ //华为电脑
        //判断有没有这个词  有就直接说这个词在整个字典数已存在
        if(this.search(word)){
            return;
        }
        //如果不存在 ，就从根节点一个一个找
        Node current=root;
        if(null!=word){
            char[] chars = word.toCharArray();
            if(null!=chars&&chars.length>0){
                for (char c : chars) {
                    Node child = current.subNode(c);
                    if(null!=child){
                        current=child;
                    }else{
                        //构造新的
                        current.getChildList().add(new Node(c));
                        current=current.subNode(c);
                    }
current.setCount(current.getCount()+1);//出现次数+1
                }
                //循环结束之后把最后一个字变成isEnd是true
                current.setEnd(true);
            }

        }

    }

    /***
    * @Description: 删除分词
    * @Param: [word] 要删除的分词
    * @return: void
    * @Author: 雷哥
    * @Date: 2020/4/2
    */
    public void deleteWord(String word) {
        //查询一个词在不在字典树
        if (this.search(word) == false) {
            return;
        }
        Node current = root;
        if (null != word) {
            char[] chars = word.toCharArray();
            if (null != chars && chars.length > 0) {
                for (char c : chars) {
                    Node node = current.subNode(c);
                    if (node.getCount() == 1) {
current.getChildList().remove(node);
                        return;
                    } else {
current.setCount(current.getCount() - 1);
                        current = node;
                    }
                }
                current.setEnd(false);//isend设置为false代表当前路上的字连起来不是一相词了
            }
        }
    }

}
```

 测试

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/02/17:50
 * @Description:
 */
public class TestTrieTree {
    public static void main(String[] args) {
        String content="华为-华为手机-华为平板-华为牛逼-鸿蒙-华为鸿蒙操作系统";
        //模拟分词
        String[] split = content.split("-");

        //构造字典树
        TrieTree trie = new TrieTree();
        //把分词插入
        for (String s : split) {
            trie.insert(s);
        }

        System.out.println(trie.search("华为"));
        System.out.println(trie.search("华为手"));

        trie.deleteWord("华为");
        System.out.println(trie.search("华为"));

        System.out.println(trie.search("华为手机"));

    }
}
```

# 04【熟悉】Solr概述

## 1，概述

Solr 是一个基于 Apache Lucene 之上的搜索服务器，它是一个开源的、基于 Java 的信息检索库。它旨在驱动功能强大的文档检索应用程序 - 无论您需要根据用户的查询将数据服务到何处，Solr 都可以为您服务。Solr与应用程序的集成以为您服务。

下面是一个如何将 Solr 集成到应用程序中的示例

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7052772505794406.png)

在上述情况下，Solr 与其他服务器应用程序并行运行。例如，在线商店应用程序将提供用户界面、购物车以及为最终用户购买的方式；而库存管理应用程序将允许商店员工编辑产品信息。产品元数据将保存在某种数据库以及 Solr 中。

Solr的官网： [http://lucene.apache.org/solr/](http://lucene.apache.org/solr/)

---

## 2，特点

Solr是一个高性能，采用Java开发，

基于Lucene的全文搜索服务器。同时对其进行了扩展，提供了比Lucene更为丰富的查询语言，同时实现了可配置、可扩展并对查询性能进行了优化，并且提供了一个完善的功能管理界面，是一款非常优秀的全文搜索引擎。

在Lucene 主要有个算法被为

倒排索引：使用关键字去搜索文档

正排索引：使用文档的Id 去查询文档，对比文档里面有没有该关键字

**倒排索引：就是利用一个\*\*\*\*Map** **集合搞定**

   **Map<String,List>** **这个速度快**

**正排索引：扫描全表，做个匹配而已**

---

## 3，工作方式

文档通过Http利用XML或者json 加到一个搜索集合中。

查询该集合也是通过http收到一个XML/JSON响应来实现。它的主要特性包括：高效、灵活的缓存功能，垂直搜索功能，高亮显示搜索结果，通过索引复制来提高可用性，提供一套强大Data Schema来定义字段，类型和设置文本分析，提供基于Web的管理界面等

---

## 4，SolrCloud与Solr，lucene关系

### 1，solr与luence的关系

    Many people new to Lucene and Solr will ask the obvious question: Should I use Lucene or Solr?

The answer is simple: if you're asking yourself this question, in 99% of situations, what you want to use is Solr.

A simple way to conceptualize the relationship between Solr and Lucene is that of a car and its engine. You can't drive an engine, but you can drive a car. Similarly, Lucene is a programmatic library which you can't use as-is, whereas Solr is a complete application which you can use out-of-box.

 网上有这样的比喻:

(1) lucene是数据库的话，solr就是jdbc

(2) lucene是jar，solr就是一个引用这些jar来写的搜索客户端。Solr是一个可以直接用的应用，而lucene只是一些编程用的库。

### 2、 Solr与SolrCloud

SolrCloud是Solr4.0版本开发出的具有开创意义的基于Solr和Zookeeper的分布式搜索方案，或者可以说，SolrCloud是Solr的一种部署方式。Solr可以以多种方式部署，例如单机方式，多机Master-Slaver方式，这些方式部署的Solr不具有SolrCloud的特色功能。

# 05【掌握】Solr的安装

## 1.    安装前的概述

1.1，solr是基于lucene而lucene是java写的，所以solr需要jdk----当前安装的solr-7.5需要jdk-1.8及以上版本，下载安装jdk并设置JAVA\_HOME即可。

1.2，下载solr，然后解压即可，windows和linux都可以下.tgz（.tgz本质是.tar.gz）和.zip解压出来都一样的。

1.3，在solr5以前solr的启动都有tomcat作为容器，但是从solr5以后solr内部集成jetty服务器，可以通过bin目录中脚本直接启动。就是从solr5以后跟solr4最大的区别是被发布成一个独立的应用。

1.4，在solr5之后solr其实特别容易安装，有安装包，之后在解压，直接启动bin下solr，solr就这样完成的启动了。。

## 2.    准备工作

1， 安装docker

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8713465218829344.png)

2， 安装vim

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9088792079706911.png)

3， 安装jdk

搜索

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9940966661228747.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.569304006660858.png)

yum -y install java-1.8.0-openjdk

## 3.    安装solr

### 1)下载solr

[https://lucene.apache.org/solr/](https://lucene.apache.org/solr/)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.290004664912706.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.134069677948468.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5678951466207586.png)

```java
wget https://mirrors.tuna.tsinghua.edu.cn/apache/lucene/solr/7.7.2/solr-7.7.2.tgz
```


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.12328773422283353.png)

### 2)解压solr并移动到/usr/local

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.17447168231929283.png)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7091964571888041.png)

移动

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.09340335299658296.png)

### 3)启动solr

#### 进入solr目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7166886562595955.png)

#### 目录分析

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5696995118051222.png)

(1)bin：是脚本的启动目录

(2)contrib：Solr 的contrib目录包含 Solr 专用功能的附加插件目录

(3)dev-tools：跟开发工具相关的包

(4)dist：编译打包后存放目录，即构建后的输出产物存放的目录

(5)docs：solr文档的存放目录

(6)example：示范例子的存放目录，这里展示了DIH，即数据导入处理的例子

(7)server:此目录是 Solr 应用程序的核心所在。此目录中的 README 提供了详细的概述，但以下是一些特点：

Solr 的 Admin UI（server/solr-webapp）

Jetty 库（server/lib）

日志文件（server/logs）和日志配置（server/resources）。有关如何自定义 Solr 的默认日志记录的详细信息，请参阅配置日志记录一节。

示例配置（server/solr/configsets）

#### 进入bin目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.46942363070759957.png)

#### bin目录分析

1.1、solr和solr.cmd：

分别是用于\* nix系统和Windows系统，根据所选参数不同而控制solr的启动和停止。

1.2、solr.in.sh和solr.in.cmd：

这些是分别用于\* nix和Windows系统的属性文件。

1.3、install\_solr\_services.sh：

此脚本用于\* nix系统将Solr作为服务安装

#### 启动

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8928485237709262.png)

出现以上问题可以修改启动代码

./solr start -force

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.866357054220113.png)

到此启动成功

### 4)测试访问

[http://www.leige.plus:8983/solr/](http://www.leige.plus:8983/solr/)

[http://ip:8983/solr/](http://ip:8983/solr/)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.541060882611975.png)

### 5)安装存在的问题

#### 无法启动

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4301317062155799.png)

如果上面的没有显示pid的值，说是有没有启动成功

原因：因为你的服务器配置太低，并关闭一个其它暂时用没用到服务

#### 启动成功之后无法访问

1·，阿里云    因为你对外的8983的端口没有开放

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.11585430046902903.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7641684261532635.png)

2，VM   因为你的虚拟机的防火墙没有关闭

```java
查看防火墙状态

firewall-cmd --state

1

停止firewall

systemctl stop firewalld.service

1

禁止firewall开机启动

systemctl disable firewalld.service
```

# 06【掌握】Solr的名词解释及配置文件说明

## 1，名词解释

### 1.1 索引库

我们导入数据，solr 会被它以某种格式保存在索引库里面！

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4579439520243731.png)

可以看出刚安装的现在没有任何索引库

### 1.2 索引分词

Solr在导入数据库时，会对某些语句进行分词

### 1.3 搜索分词

Solr在搜索数据库时，会对某些语句进行分词

### 1.4 文档

Solr 里面搜索出来的每个数据，都是以xml 文件或json 来表示，这些数据被称为文档

Json->文档

Xml->文件

### 1.5 字段

文档里面可能有很多的字段，就类似于数据库的字段

### 1.6 和Mysql的数据库做对比

| mysql                 | Solr                                       |
| --------------------- | ------------------------------------------ |
| 数据库                | 索引库                                     |
| 表                    | Solr里面直接把数据放在索引库，没有表的概念 |
| 行         对象       | 文档                                       |
| 列         对象的属性 | 字段                                       |

---

## 2，配置文件说明

在 Solr 中有几个配置文件，您将在执行过程中与之交互。

这些文件中的很多都是 XML 格式的，尽管与配置设置交互的 API 在需要时往往接受 JSON 以进行编程访问。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9868608262023318.png)

### 2.1，Solr Home

在运行 Solr 时，您需要访问主目录。

当您第一次安装 Solr 时，您的主目录是：server/solr。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.30390858215918065.png)

Solr 主目录包含重要的配置信息，并且是 Solr 将存储其索引的地方。

以下示例显示了 Solr 主目录中的关键部分：

示例-单机模式

```java
<solr-home-directory>/
   solr.xml
   core_name1/
      core.properties
      conf/
         solrconfig.xml
         managed-schema
      data/
   core_name2/
      core.properties
      conf/
         solrconfig.xml
         managed-schema
      data/
```

### 2.2，Solr 配置文件

在 Solr 的目录中，你会发现这些文件：

solr.xml：为您的 Solr 服务器实例指定配置选项。

每个 Solr  core：

* core.properties：为每个核心定义特定的属性，例如其名称、核心所属的集合、模式的位置以及其他参数。
* solrconfig.xml：控制高级行为。例如，您可以为数据目录指定一个备用位置。
* managed-schema（或用 schema.xml 替代）描述您将要求 Solr 索引的文档。模式将文档定义为字段集合。您可以同时定义字段类型和字段本身。字段类型定义功能强大，包含有关 Solr 如何处理传入字段值和查询值的信息。
* data/：包含索引文件的目录。

# 07【掌握】Solr索引库说明及创建

## 1\.    索引库概述  

**索引库类似于mysql的数据库，所以如果要使用Solr必须创建一个索引库才能使用**

## 2.    使用solr管理页面去创建【不推荐】

### 2.1打开solr的管理页面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.28899829665530047.png)

### 2.2点击add Core

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7799541409171988.png)

name:自定义名字 建议和instanceDir目录保持一样

instanceDir:实例名称  一般和name一样

dataDir:默认的默认数据存储目录  一般data

config指写配置文件  db1-core/conf/solrconfig.xml

schema:指定属性的xml 默认为db1-conre/conf/managed-schema文件

### 2.3点击add Core报错

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.320441295082761.png)

查看usr/local/server/solr/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.25008116085947135.png)

### 2.4解决上面报错的问题

进入db1-core这个目录发现里面啥都没有

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4074824955120535.png)

执行下面的命令解决默认配置问题不存在的问题

```java
cp -r ../configsets/sample_techproducts_configs/* ./
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.05607407394764405.png)

回到solr管理台

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.46211513264866977.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.041064168007534575.png)

## 3.    使用命令创建【推荐】

### 3.1，进入solr的/bin目录

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7804519027826823.png)

### 3.2，执行创建命令

```java
./solr create_core -c db2_core -force
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.757533323829163.png)

修改创建命令

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5149653675478755.png)

查看server/solr/

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.36081757517738006.png)

页面查看

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.841427204213301.png)

# 08【熟悉】Solr控制台说明-主面板

## 1,Dashboard(仪表盘)

访问 [http://www.leige.plus:8983/solr](http://www.leige.plus:8983/solr)时，出现该主页面，可查看到solr运行时间、solr版本，系统内存、虚拟机内存的使用情况

这里的图片描述

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4512884512737753.png)

## 2.Logging(日志)

显示solr运行出现的异常或错误

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.18807921780992418.png)

## 3.Core Admin (core管理)

主要有Add Core(添加核心)， Unload（卸载核心），Rename（重命名核心），Reload(重新加载核心)，Optimize（优化索引库） 

Add Core是添加core：主要是在instanceDir对应的文件夹里生成一个core.properties文件 

name：给core起的名字； 

instanceDir：与我们在配置solr到tomcat里时的solr\_home里新建的core文件夹名一致； 

dataDir:确认Add Core时，会在new\_core目录下生成名为data的文件夹 

config：new\_core下的conf下的config配置文件(solrconfig.xml) 

schema: new\_core下的conf下的schema文件(schema.xml) 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5885832560151827.png)

确认Add Core时，会在new\_core下生成data文件夹，与core.properties文件。core.properties文件里内容如下： 

前面已说过

## 4.Java Properties

可查看到Java相关的一些属性的信息

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9496877659182503.png)

# 09【熟悉】Solr控制台-core操作说明

## Core Selecter(core选择器)

需要在Core Admin里添加了core后才有可选项，这里以已经添加好的ims\_advertiser\_core为例。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.15080566227757372.png)

## Overview

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9121730224900033.png)

## Analysis（分析器）


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6077453120831902.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7918305932944006.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.44513614849794414.png)

## Schema【---solr/db2-core/conf/】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.31881917855848724.png)

### 添加一个field

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2849316278674309.png)

添加完成之后查managed-schma多一个属性

相当于给数据库里面的某一个表添加了一个叫goods\_name和字段

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2785289460646179.png)

### 添加一个动态的field

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.45656198630838496.png)

添加完成之后查managed-schma多一个属性

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7105357099390304.png)

### 添加一个动态的copyfield

添加一个goods\_keywords

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9721917834158949.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22202320804518438.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.586652422741857.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8687310228764699.png)

## Document和Query

因为上面添加了goods\_name  和goods\_remark的属性现地相当于有一个solr的数据库里面有一个表叫db2-core  这个表里面现在自己加了goods\_name和goods\_remark的两个字段

### 向库里面增加数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8696037814688927.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5936423847933903.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9995157413750735.png)

### 向库里面修改数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6991162502418986.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6623443372669342.png)

### 删除数据

#### 根据ID删除

```java
<delete><query>id:1</query></delete>
<commit/>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6921262838662112.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8774861735970252.png)

#### 全删除

```xml
<delete><query>*:*</query></delete>
<commit/>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.42367924410004026.png)

### 查询数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7141267187100482.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9715359356004677.png)

Request-Handler(qt):

```java
q: 查询字符串（必须的）。:表示查询所有；keyword:吕布 表示按关键字“吕布”查询

fq: filter query 过滤查询。使用Filter Query可以充分利用Filter Query Cache，提高检索性能。作用：在q查询符合结果中同时是fq查询符合的(类似求交集)，例如：q=mm&fq=date_time:[20081001 TO 20091031]，找关键字mm，并且date_time是20081001到20091031之间的。 

sort: 排序。格式如下：字段名 排序方式；如advertiserId desc 表示按id字段降序排列查询结果。

start,rows:表示查回结果从第几条数据开始显示，共显示多少条。

fl: field list。指定查询结果返回哪些字段。多个时以空格“ ”或逗号“,”分隔。不指定时，默认全返回。
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.356083843420933.png)

```java
// df: default field默认的查询字段，一般默认指定。

// Raw Query Parameters:



wt: write type。指定查询输出结果格式，我们常用的有json格式与xml格式。在solrconfig.xml中定义了查询输出格式：xml、json、Python、ruby、PHP、phps、custom。 

indent: 返回的结果是否缩进，默认关闭，用 indent=true | on 开启，一般调试json,php,phps,ruby输出才有必要用这个参数。
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.09602132956122982.png)

~~debugQuery: 设置返回结果是否显示Debug信息。~~

~~dismax:~~

~~edismax:~~



```java
hl: high light 高亮。hl=true表示启用高亮

hl.fl ： 用空格或逗号隔开的字段列表（指定高亮的字段）。要启用某个字段的highlight功能，就得保证该字段在schema中是stored。如果该参数未被给出，那么就会高 亮默认字段 standard handler会用df参数，dismax字段用qf参数。你可以使用星号去方便的高亮所有字段。如果你使用了通配符，那么要考虑启用 hl.requiredFieldMatch选项。

hl.simple.pre：

hl.requireFieldMatch: 如果置为true，除非该字段的查询结果不为空才会被高亮。它的默认值是false，意味 着它可能匹配某个字段却高亮一个不同的字段。如果hl.fl使用了通配符，那么就要启用该参数。尽管如此，如果你的查询是all字段（可能是使用 copy-field 指令），那么还是把它设为false，这样搜索结果能表明哪个字段的查询文本未被找到 

hl.usePhraseHighlighter：如果一个查询中含有短语（引号框起来的）那么会保证一定要完全匹配短语的才会被高亮。

hl.highlightMultiTerm：如果使用通配符和模糊搜索，那么会确保与通配符匹配的term会高亮。默认为false，同时hl.usePhraseHighlighter要为true。
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5836923830647706.png)

## Files

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10114803767829729.png)

## Ping

延时

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.47665764041593855.png)

## Plugins

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4642732272320729.png)

## Replication

复制

## Dataimport

数据全量和增量导入

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5595112889532957.png)

# 10【掌握】Solr的分词及IK库的使用

## 1，什么是分词

分词：雷哥的理解是，输入的一句话，按照它自己定义的规则分为常用词语。

首先，Solr有自己基本的类型，string、int、date、long等等。

  对于string类型，比如在你的core/conf/manage-schema文件中，配置一个字段类型为string类型，如果查询符合“我是中国人”的数据，它就认为“我是中国人”是一个词语。

  但是如果你将该字段设置成了分词，即配置成了text\_ik类型，就可能匹配“我”、“中国人”、“中国”、“中”、“人”带有这些字的该字段数据都可能被查询到。这就是分词带来的结果。具体要按照各自的业务来配置是否分词，分词对于大文本字段设置是合理的，但是对于小字段，设置分词是没必要的，甚至有相反的结果。比如你的某一个叫姓名的字段设置了分词，还不如设置string,查询时模糊匹配效果最好，（模糊匹配就是查询条件两边加上\*），当然也要看自己业务需求是什么。

## 2，配置目地

就是让solr能对中文进行分词

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00248c127f7-7513-4ede-bdb4-1aeedfb92cd9.jpg)

## 3，分词器的选择

之前我们使用jieba分词，效果不是很好。

现在有个非常牛逼的分词器，IK 分词器，效果非常好，如果你一直使用solr 那么以后将一直使用IK分词器。

**为什么使用IK？？**

·中文分词在solr里面是没有默认开启的，需要自己配置一个中文分词器。

·目前可用的分词器有smartcn，IK，Jeasy，庖丁。其实主要是两种，一种是基于中科院ICTCLAS的隐式马尔科夫HMM算法的中文分词器，如smartcn，ictclas4j，优点是分词准确度高，缺点是不能使用用户自定义词库；另一种是基于最大匹配的分词器，如IK ，Jeasy，庖丁，优点是可以自定义词库，增加新词，缺点是分出来的垃圾词较多。各有优缺点。

·主流还是ik,可以扩展自己的词库，非常方便，加入一些热搜词，主题词，对于搜索而言，非常方便 

## 4，分词器的的配置

### 4.1，下载

下载ik (5及以上版本通用) [http://files.cnblogs.com/files/zhangweizhong/ikanalyzer-solr5.zip](http://files.cnblogs.com/files/zhangweizhong/ikanalyzer-solr5.zip) 

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image00475c4eefe-9554-4021-936c-04a20475f714.jpg)

### 4.2，解压文件及说明

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0065331411a-acac-41e1-9bb7-296e55f4ca53.jpg)

ext.dic**自定义词**  如沙雕  在汉语里面不是一个词  ，它只是一个网络用语，可以配置到这里面让它成为一个词  

stopword.dic  **停止字典** 如 啊  吧   唉   不作分词

IKAnalyzer.cfg.xml**配置ik的配置文件** 不用改

Jar：如果要使用ik分词要导入的**jar包**

### 4.3，修改managed-sahma

UseSmart 和分词的粒度相关：

False: 分词的粒度大，一句话里面分的词语少

True:分词的粒度细,一句话里面分的词语多

那我们在导入时需要的关键字多吗？让索引的数据量少一点。我们的粒度大：False

我们在搜索时需要的关键字多吗？我们想尽可能的覆盖所有的范围，我们的粒度要细：True

 4.4，把修改managed-sahma覆盖到solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image008123e1c09-8300-4f17-a780-c883c0e8bc7d.jpg)

### 4.5，重启solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image010d0c672f8-564d-4ebe-8b4d-ddab553c21ad.jpg)

### 4.6，查看分析出现错

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image01221c22aff-f2a5-4867-9231-afd70fd22979.jpg)

产生原因是因为我们只添加发分词

但是ik想要运行必须要加入相关的配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0141aa17dad-fc2b-4445-bb84-ba4ba855b223.jpg)

上面的配置没有加入

### 4.7，把IK的配置入到solr

#### 4.7.1，放入jar包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0167efe2dcc-6f4a-4826-900d-06274c444178.jpg)

#### 4.7.2，放配置

在/usr/local/solr-7.7.2/server/solr-webapp/webapp/WEB-INF创建一个classes

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0188eb48147-3b6f-4452-be4f-ba4c08a6e033.jpg)

### 4.8，重启solr分析

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0205038548c-4214-4e1c-9b25-020dae53c5e6.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0221b9651e2-6546-4608-bf16-5689d25834a2.jpg)

### 4.9存在问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0242b9594eb-a756-4445-93e7-1a96df23dcf2.jpg)

要索引时要遵循一个原因

1， 索引时分词的要尽量少

2， 搜索时分词尽量多

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0266d7a057a-97b6-43eb-91c1-e6d3f31d2998.jpg)

改完重新覆盖

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0284258f00a-6343-4acc-bcd9-0d8bc82a9d8c.jpg)

重启测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0305dbc8dbb-fa73-4b1b-9431-6720dccdaef7.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image032fc1d379b-e510-4e2f-adb6-b33bf04e065e.jpg)

### 4.10如何使用到属性上

##### 添加一个属性

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image034a8675c1f-a224-4f5a-9451-f6fda7e11d85.jpg)

##### 添加数据测试下

###### 添加数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image036c26eb44d-55ff-47f4-9e96-26c4fc658b1a.jpg)

###### 查看分词

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image038128076bc-9602-40df-aae3-ad9ecca5a175.jpg)

###### 查询测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image040e054f7cd-1c4a-42df-9370-1406bdbea9d1.jpg)



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image04293cd06a4-403b-4572-9049-571914660a9d.jpg)

为什么pro3有  pro没有 因为ik分词时认为pro3是一个词  而pro不是词

### 4.11 ext.dic的说明

在ext.dic里添加一个自定义的词   沙雕  

覆盖    查询

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0449a1e0e67-3ae1-4ed6-8bb4-0fde06dc55f0.jpg)

重启测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image046e47802ad-8e9b-48f9-8df9-f0943ffcf26f.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image0486541e2cb-0640-4f44-bab7-efb89576f61e.jpg)

发现现在solr认为  沙雕就是一个词

# 11【掌握】Solr的javaAPI讲解solrj

## 1、solr项目pom依赖

```java
<properties>
    <solrj.version>7.7.2</solrj.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.apache.solr</groupId>
        <artifactId>solr-solrj</artifactId>
        <version>${solrj.version}</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.12</version>
    </dependency>
</dependencies>
```

## 2、添加数据

```java
/**
 * @Description :添加简单数据
 * @Author : 辛根
 * @Date : 2020/4/22 18:14
 */
public class Test02AddData {

    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {

        // 一个一个添加
//        SolrInputDocument doc = new SolrInputDocument();
//        doc.addField("goods_name","小青柑普洱茶 正宗生晒新会小青柑100g 茶叶品尝装 小青桔陈皮云南宫廷普洱茶熟茶");
//        doc.addField("goods_remark","该商品购买1-100件时享受单件价￥9.90，超出数量以结算价为准，仅限购买一次");
//        httpSolrClient.add(doc);
//        httpSolrClient.commit();
//        httpSolrClient.close();
//        System.out.println("添加成功");

        // 一个集合一个集合的添加
        List<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
        for (int i = 0; i < +5; i++) {
            SolrInputDocument dox = new SolrInputDocument();
            dox.addField("goods_name", "锤子手机" + i);
            dox.addField("goods_remark", "坚果Pro3----" + i);
            docs.add(dox);
        }
        httpSolrClient.add(docs);
        httpSolrClient.commit();
        httpSolrClient.close();
        System.out.println("添加成功");

        // 参数说明：第一个指的是库名，第二个指的是传入的SolrInputDocument对象
        // httpSolrClient.add("db1-core",docs);

    }
}
```

## 3、删除数据

```java
/**
 * @Description :添加简单数据
 * @Author : 辛根
 * @Date : 2020/4/22 18:14
 */
public class Test03DeleteData {

    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {

        // 根据id删除
        httpSolrClient.deleteById("8d64e944-bebf-47ce-87c0-c715d8fbcada");

        // 根据ids删除
        httpSolrClient.deleteById(Arrays.asList("aeecc2e8-e4aa-4b5f-bb34-513426aaee87", "d48b51ac-ccb2-4b7c-83f5-b3d5e9efb11e"));

        // 根据id删除指定库的数据
        httpSolrClient.deleteById("db1-core","1");

        // 全删除
        httpSolrClient.deleteByQuery("*:*");

        httpSolrClient.commit();
        httpSolrClient.close();
        System.out.println("操作成功");
    }
}
```

## 4、按照对象格式添加

（1）普通方式：

```java
public class Test04AddCustData {

    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {

        //一个集合一个集合的添加
        List<SolrInputDocument> persons = new ArrayList<SolrInputDocument>(5) ;
        SolrInputDocument lvbu = new SolrInputDocument();
        lvbu.addField("id","1");
        lvbu.addField("name","吕布");
        lvbu.addField("age",33);
        lvbu.addField("sex","男");
        lvbu.addField("salary","8888.88");
        lvbu.addField("remark","人中吕布,马中赤兔");
        SolrInputDocument zhaoyun = new SolrInputDocument();
        zhaoyun.addField("id","2");
        zhaoyun.addField("name","赵云");
        zhaoyun.addField("age",28);
        zhaoyun.addField("sex","男");
        zhaoyun.addField("salary","8888.88");
        zhaoyun.addField("remark","七进七出");
        SolrInputDocument guanyu = new SolrInputDocument();
        guanyu.addField("id","3");
        guanyu.addField("name","关羽");
        guanyu.addField("age",44);
        guanyu.addField("sex","男");
        guanyu.addField("salary","9999.88");
        guanyu.addField("remark","忠肝义胆");
        SolrInputDocument zhangfei = new SolrInputDocument();
        zhangfei.addField("id","4");
        zhangfei.addField("name","张飞");
        zhangfei.addField("age",41);
        zhangfei.addField("sex","男");
        zhangfei.addField("salary","8888.88");
        zhangfei.addField("remark","莽夫一个");
        SolrInputDocument liubei = new SolrInputDocument();
        liubei.addField("id","5");
        liubei.addField("name","刘备");
        liubei.addField("age",48);
        liubei.addField("sex","男");
        liubei.addField("salary","99999.88");
        liubei.addField("remark","心机婊");
        persons.add(lvbu) ;
        persons.add(zhaoyun) ;
        persons.add(guanyu) ;
        persons.add(zhangfei) ;
        persons.add(liubei) ;
        httpSolrClient.add(persons);
        httpSolrClient.commit();
        httpSolrClient.close();
        System.out.println("操作成功");
    }
}
```

（2）注解的方式：在实体类属性上添加注解@Field

Person实体类

```java
package com.xg.solr;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.solr.client.solrj.beans.Field;

/**
 * @Description :
 * @Author : 辛根
 * @Date : 2020/4/22 19:01
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Field("id")
    private Integer id;
    @Field("name")
    private String name;
    @Field("age")
    private Integer age;
    @Field("sex")
    private String sex;
    @Field("salary")
    private Double salary;
    @Field("remark")
    private String remark;

}
```

```java
public class Test05AddCustData {



    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {

        //一个集合一个集合的添加
        List<Person> persons = new ArrayList<Person>(5) ;
        persons.add(new Person(1,"吕布",33,"男",8888.88,"人中吕布"));
        persons.add(new Person(2,"赵云",28,"男",9888.88,"七进七出"));
        persons.add(new Person(3,"关羽",44,"男",10888.88,"忠肝义胆"));
        persons.add(new Person(4,"张飞",41,"男",11888.88,"莽夫一个"));
        persons.add(new Person(5,"刘备",48,"男",12888.88,"心机婊"));
        httpSolrClient.addBeans(persons);
        httpSolrClient.commit();
        httpSolrClient.close();
        System.out.println("操作成功");
    }
}
```

## 5、全查询  

```java
public class Test06QueryAll {


    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {
        String keywords = "*:*";

        // 创建一个全查询条件对象
        SolrQuery solrQuery = new SolrQuery(keywords);
        // 查询
        QueryResponse query = httpSolrClient.query(solrQuery);
        // 取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}

```

## 6、分页查询

```java
public class Test07QueryForPage {


    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {
        String keywords = "*:*";
        int page = 2;
        int limit = 3;

        // 创建一个全查询条件对象
        SolrQuery solrQuery = new SolrQuery(keywords);
        //设置从哪里开始查，不查页码
        solrQuery.setStart((page - 1) * limit);
        //设置每页显示多少条
        solrQuery.setRows(limit);
        // 查询
        QueryResponse query = httpSolrClient.query(solrQuery);
        // 取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数" + results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 7、排序查询

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14573205242468515.png)

```java
public class Test08QuerySort {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String SOLR_URL="http://www.leige.plus:8983/solr/db2-core";
    //声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;
    static {
        httpSolrClient=new HttpSolrClient.Builder(SOLR_URL).build();
    }
    public static void main(String[] args) throws IOException, SolrServerException {
       String keywords="*:*";
       //创建一个查询条件对象
        SolrQuery solrQuery=new SolrQuery(keywords);
  //        solrQuery.setSort("id",SolrQuery.ORDER.desc); //只能根据一个属性进行排序
        solrQuery.setSort("age",SolrQuery.ORDER.asc);
        //查询
        QueryResponse query = httpSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 9，高亮查询

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3756219225102981.png)

```java
public class Test09QueryHeightLight {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String SOLR_URL="http://www.leige.plus:8983/solr/db2-core";
    //声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;
    static {
        httpSolrClient=new HttpSolrClient.Builder(SOLR_URL).build();
    }
    public static void main(String[] args) throws IOException, SolrServerException {
        List<Person> personList=new ArrayList<>();
       String keywords="name:吕布";
       //创建一个查询条件对象
        SolrQuery solrQuery=new SolrQuery(keywords);
        //开户高亮
        solrQuery.setHighlight(true);
        //设置要进行高亮的属性
        solrQuery.addHighlightField("name");
        solrQuery.addHighlightField("remark");
        //设置高亮的前后缀
        solrQuery.setHighlightSimplePre("<font color=red>");
        solrQuery.setHighlightSimplePost("</font>");
        //查询
        QueryResponse query = httpSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        //取出高亮的结果
        Map<String, Map<String, List<String>>> highlighting = query.getHighlighting();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {//搜索处理的每个文档，进文档里面的内容进行高亮
            Person person=new Person();
            person.setId(Integer.valueOf(result.getFieldValue("id").toString()));
            person.setName(result.getFieldValue("name").toString());
            person.setAge(Integer.valueOf(result.getFieldValue("age").toString()));
            person.setSex(result.getFieldValue("sex").toString());
            person.setSalary(Double.valueOf(result.getFieldValue("salary").toString()));
            person.setRemark(result.getFieldValue("remark").toString());
  //            System.out.println(result);
            String id= (String) result.getFieldValue("id");
            Map<String, List<String>> listMap = highlighting.get(id);
            if(null!=listMap&&!listMap.isEmpty()){
                List<String> name = listMap.get("name");
                List<String> remark = listMap.get("remark");
  //                System.out.println(name.get(0)+"  "+remark.get(0));
              if(!StringUtils.isEmpty(name.get(0))){
                  person.setName(name.get(0));
              }
              if(!StringUtils.isEmpty(remark.get(0))){
                  person.setRemark(remark.get(0));
              }
            }
            personList.add(person);
        }
        for (Person person : personList) {
            System.out.println(person);
        }
    }
}
```

## 10、范围查询

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7770157358962019.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.15707409221800855.png)

```java
public class Test10QueryRange {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String SOLR_URL="http://www.leige.plus:8983/solr/db2-core";
    //声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;
    static {
        httpSolrClient=new HttpSolrClient.Builder(SOLR_URL).build();
    }
    public static void main(String[] args) throws IOException, SolrServerException {
        //创建条件
        SolrQuery solrQuery=new SolrQuery("*:*");
        //限定范围 20-40岁之间的
        solrQuery.setFilterQueries("age:[20 TO 40]");
        QueryResponse query = httpSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 11、过滤查询

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.24895115078406596.png)

```java
public class Test11QueryFilter {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String SOLR_URL="http://www.leige.plus:8983/solr/db2-core";
    //声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;
    static {
        httpSolrClient=new HttpSolrClient.Builder(SOLR_URL).build();
    }
    public static void main(String[] args) throws IOException, SolrServerException {
        //创建条件
        SolrQuery solrQuery=new SolrQuery("*:*");
        //限定条件 年龄=33
        solrQuery.setFilterQueries("age:33");
        QueryResponse query = httpSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 12、合并域查询

```java
public class Test12QueryArea {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String SOLR_URL="http://www.leige.plus:8983/solr/db2-core";
    //声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;
    static {
        httpSolrClient=new HttpSolrClient.Builder(SOLR_URL).build();
    }
    public static void main(String[] args) throws IOException, SolrServerException {
        //创建条件
        SolrQuery solrQuery=new SolrQuery("keywords:吕布");
        QueryResponse query = httpSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 13、综合查询\[后面还会说\]

把上面所有的查询全部来一次

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08438253096172584.png)

```java
public class Test08QueryZhongHe {

    // 声明一个连接solr的地址(ip:port/solr/库名)
    public static final String SOLR_URL = "http://129.211.39.189:8983/solr/db2_core";

    // 声明一个连接solr的对象
    private static HttpSolrClient httpSolrClient;

    static {
        httpSolrClient = new HttpSolrClient.Builder(SOLR_URL).build();
    }

    public static void main(String[] args) throws IOException, SolrServerException {

        Map<String, String> filter = new HashMap<String, String>();
        filter.put("age", "33");
        List<Map<String, Object>> list = queryAll("吕布", 1, 10, 1, "20-40", filter);
        for (Map<String, Object> map : list) {
            System.out.println(map);
        }
    }

    /**
     * @param keywords 关键字
     * @param page     页码
     * @param limit    每页长度
     * @param ageSort  年龄排序规则【1升序0降序】
     * @param ageRange 年龄的范围
     * @param filter   过滤条件
     * @ClassName: Test08QueryZhongHe
     * @Description:
     * @Return: java.util.List<java.util.Map < java.lang.String, java.lang.Object>>
     * @Author: 辛根 2020/4/23 19:57
     */
    public static List<Map<String, Object>> queryAll(String keywords, int page, int limit, int ageSort, String ageRange, final Map<String, String> filter) {
        // 条件构造
        SolrQuery solrQuery = new SolrQuery("key:" + keywords);

        // 分页处理
        solrQuery.setStart((page - 1) * limit);
        solrQuery.setRows(limit);

        // 排序
        switch (ageSort) {
            case 0:
                solrQuery.addSort("age", SolrQuery.ORDER.desc);
                break;
            case 1:
                solrQuery.addSort("age", SolrQuery.ORDER.asc);
                break;
        }

        // 范围处理和过滤条件处理
        final List<String> fqList = new ArrayList<String>();
        if (StringUtils.isEmpty(ageRange)) {
            if (ageRange.contains("-")) {
                throw new RuntimeException("年龄范围参数不合格");
            }
            String[] split = ageRange.split("-");
            fqList.add("age:[" + split[0] + " TO " + split[1] + "]");
        }
        if (filter != null && !filter.isEmpty()) {
            filter.forEach((k, v) -> {
                fqList.add(k + ":" + v);
            });
        }
        if (!fqList.isEmpty()) {
            solrQuery.setFilterQueries(fqList.toArray(new String[]{}));
        }

        // 高亮处理
        solrQuery.addHighlightField("name");
        solrQuery.addHighlightField("remark");
        solrQuery.setHighlightSimplePre("<font color=red>");
        solrQuery.setHighlightSimplePost("</font>");

        try {
            List<Map<String, Object>> listMaps = new ArrayList<>();
            QueryResponse query = httpSolrClient.query(solrQuery);
            SolrDocumentList results = query.getResults();
            Map<String, Map<String, List<String>>> highlighting = query.getHighlighting();
            System.out.println("总条数：" + results.getNumFound());

            for (SolrDocument result : results) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", result.getFieldValue("id"));
                map.put("name", result.getFieldValue("name"));
                map.put("age", result.getFieldValue("age"));
                map.put("sex", result.getFieldValue("sex"));
                map.put("salary", result.getFieldValue("salary"));
                map.put("remark", result.getFieldValue("remark"));

                Map<String, List<String>> listMap = highlighting.get(map.get("id"));
                if (null != listMap && !listMap.isEmpty()) {
                    String name = listMap.get("name").get(0);
                    String remark = listMap.get("remark").get(0);
                    map.put("name", name);
                    map.put("remark", remark);
                }
                listMaps.add(map);
            }
            return listMaps;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

# 12【案例】使用Solr完成对jd案例的实现

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3815567240894633.png)

## 1，solr搜索实现三步走实现

1，需要把商品的数据导入到Solr 里面

2，根据条件编写各种代码实现搜索

3，使用定时任务定时同步数据库和solr的数据【当然应该提供手动同步】

## 2，solr搜索的说明

### 2.1，关键字搜索 copyField\[数组\]去完成

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5154271674520462.png)

### 2.2，分页

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.06155643352180468.png)

### 2.3，过滤条件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7178405369965892.png)

### 2.4，排序

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3112505518237103.png)

### 2.5，高亮

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9206862693425137.png)

### 2.6，价格区间

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2850846425235611.png)

## 3，准备数据库

### 3.1，创建数据库

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8578210301163256.png)

### 3.1，导入数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3153810909731009.png)

注意点:updatetime 是最后做增加更新时使用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3214682700719739.png)

## 4，创建项目并修改pom.xml

### 4.1创建项目


![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6792945676645509.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.25685552606426476.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.29208764668671044.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.44273520939096217.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.2680513740717359.png)

### 4.2修改pom.xml添加Druid和mybatisplus的依赖

```java
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.3.1.tmp</version>
</dependency>

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
 <version>1.1.21</version>
</dependency>
```

## 5，配置yml

```java
#端口
server:
  port: 8080
spring:
  #数据源的配置
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/jd-shop?serverTimezone=UTC
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  application:
    name: jd-search
  data:
    solr:
      host: http://www.leige.plus:8983/solr/jd-shop
#配置mybatisplus
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  mapper-locations: classpath:mapper/*.xml
  global-config:
    db-config:
      id-type: auto
```

## 6，使用插件生成Goods和GoodsMapper

### 6.1，准备工作

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4615616028539115.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.22902105020566862.png)

### 6.2，安装插件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08720462063897896.png)

[https://zhile.io/2019/04/23/mybatis-code-helper-pro-crack.html](https://zhile.io/2019/04/23/mybatis-code-helper-pro-crack.html)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5312431839721673.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10128070882514775.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5363636616629928.png)

OK之后重启IDEA

### 6.3，生成Goods

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6535805370962026.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8438442450429274.png)

### 6.4，生成GoodsMapper

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6316157092404536.png)

### 6.5，生成GoodsMapper.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6203508626141587.png)

### 6.6，修改主启类

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14687948162891631.png)

## 7，测试mybatisplus和solr是否可用

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8688170684502046.png)

## 8，在solr里面创建jd-shop的core并配置好属性

#### 8.1,创建jd-shop

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4207671188654532.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5882612189167237.png)

#### 8.2,配置分词和属性

```java
<field name="id" type="string" indexed="true" stored="true" required="true" multiValued="false" />
<field name="name" type="text_cn" indexed="true" stored="true" required="true" multiValued="false"
<field name="shopid" type="plong" indexed="true" stored="true" multiValued="false" />
<field name="oriprice" type="pdouble" indexed="true" stored="true" multiValued="false" />
<field name="price" type="pdouble" indexed="true" stored="true" multiValued="false" />
<field name="remark" type="text_cn" indexed="true" stored="true" multiValued="false" />
<field name="content" type="text_cn" indexed="true" stored="true" multiValued="false" />
<field name="picture" type="string" indexed="false" stored="true" multiValued="false" />
<field name="categoryid" type="plong" indexed="true" stored="true" multiValued="false" />
<field name="salenum" type="pint" indexed="true" stored="true" multiValued="false" />
<field name="totalstocks" type="pint" indexed="true" stored="true" multiValued="false" />
<field name="is_jd_express" type="pint" indexed="true" stored="true" multiValued="false" />
<field name="is_second-hand" type="pint" indexed="true" stored="true" multiValued="false" />
<field name="is_new" type="pint" indexed="true" stored="true" multiValued="false" />
<field name="is_to_pay" type="pint" indexed="true" stored="true" multiValued="false" />

<field name="keywords" type="text_cn" indexed="true" stored="true" multiValued="true" />
<copyField source="name" dest="keywords" />
<copyField source="remark" dest="keywords" />
<!--添加一个中文分词器IK-->
<fieldType name="text_cn" class="solr.TextField" positionIncrementGap="100">
    <analyzer type="index">
      <tokenizer class="org.apache.lucene.analysis.ik.IKTokenizerFactory" useSmart="true"/>
    </analyzer>
    <analyzer type="query">
      <tokenizer class="org.apache.lucene.analysis.ik.IKTokenizerFactory" useSmart="false"/>
    </analyzer>
</fieldType>
```

8.3,覆盖到solr并重启  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.18696868687313487.png)

## 9，编写代码实现全量和增量导入

### 9.1，全量导入

#### 创建ImportService

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/04/12:22
 * @Description:
 */
public interface ImportService {

    /***
    * @Description:
    * @Param: 全量导入
    * @return:
    * @Author: 雷哥
    * @Date: 2020/4/4
    */
    public void importAll();


    /***
    * @Description:
    * @Param: 增量导入
    * @return:
    * @Author: 雷哥
    * @Date: 2020/4/4
    */
    public void importUpdate();
}
```

#### 导入fastjson

```java
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.62</version>
</dependency>
```

#### 创建ImportServiceImpl

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/04/12:24
 * @Description:
 */
@Service
@Transactional
public class ImportServiceImpl implements ImportService {


    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private SolrClient solrClient;

    @Override
    @PostConstruct  //只要IOC容器加载就运行
    public void importAll() {
        //查询出所有上架的商品
        QueryWrapper<Goods> qw=new QueryWrapper<>();
        qw.eq("status",1);
        List<Goods> goodsList = goodsMapper.selectList(qw);
        List<SolrInputDocument> docs=this.createDoc(goodsList);
        try {
            solrClient.add(docs);
            solrClient.commit();//提交
            System.out.println("数据全量同步成功:"+new Date());
        }catch (Exception e){
            System.out.println(e);
        }


    }

    /***
    * @Description: 构造文档集合
    * @Param: [goodsList]
    * @return: java.util.List<org.apache.solr.common.SolrInputDocument>
    * @Author: 雷哥
    * @Date: 2020/4/4
    */
    private List<SolrInputDocument> createDoc(List<Goods> goodsList) {

        List<SolrInputDocument> docs=new ArrayList<>(goodsList.size());
        for (Goods g : goodsList) {
            SolrInputDocument doc=new SolrInputDocument();
            doc.addField("id",g.getId().toString());
            doc.addField("name",g.getName());
            doc.addField("shopid",g.getShopid().longValue());
            doc.addField("oriprice",g.getOriprice().doubleValue());
            doc.addField("price",g.getPrice().doubleValue());
            doc.addField("remark",g.getRemark());
            doc.addField("content",g.getContent());
            doc.addField("picture",g.getPicture());
            doc.addField("categoryid",g.getCategoryid().longValue());
            doc.addField("salenum",g.getSalenum().intValue());
            doc.addField("totalstocks",g.getTotalstocks().intValue());

            JSONObject jsonObject = JSON.parseObject(g.getFilters().toString());
            doc.addField("is_jd_express",jsonObject.get("is_jd_express").equals(true)?1:0);
            doc.addField("is_second_hand",jsonObject.get("is_second_hand").equals(true)?1:0);
            doc.addField("is_new",jsonObject.get("is_new").equals(true)?1:0);
            doc.addField("is_to_pay",jsonObject.get("is_to_pay").equals(true)?1:0);
            docs.add(doc);
        }

        return docs;

    }

    @Override
    public void importUpdate() {

    }
}
```

查看数据  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3816389562496719.png)

### 9.2，增量导入

#### 修改ImportServiceImpl

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/04/12:24
 * @Description:
 */
@Service
@Log4j2
@Transactional
public class ImportServiceImpl implements ImportService {


    @Autowired
    private GoodsMapper goodsMapper;

    @Autowired
    private SolrClient solrClient;

    @Override
    @PostConstruct  //只要IOC容器加载就运行
    public void importAll() {
        //查询出所有上架的商品
        QueryWrapper<Goods> qw=new QueryWrapper<>();
        qw.eq("status",1);
        List<Goods> goodsList = goodsMapper.selectList(qw);
        List<SolrInputDocument> docs=this.createDoc(goodsList);
        try {
            solrClient.add(docs);
            solrClient.commit();//提交
            log.info("数据全量同步成功:"+new Date());
        }catch (Exception e){
            System.out.println(e);
            log.warn("数据全量同步失败,{}",e);
        }
        this.lastSycnDate=new Date();
    }

    /***
    * @Description: 构造文档集合
    * @Param: [goodsList]
    * @return: java.util.List<org.apache.solr.common.SolrInputDocument>
    * @Author: 雷哥
    * @Date: 2020/4/4
    */
    private List<SolrInputDocument> createDoc(List<Goods> goodsList) {

        List<SolrInputDocument> docs=new ArrayList<>(goodsList.size());
        for (Goods g : goodsList) {
            SolrInputDocument doc=new SolrInputDocument();
            doc.addField("id",g.getId().toString());
            doc.addField("name",g.getName());
            doc.addField("shopid",g.getShopid().longValue());
            doc.addField("oriprice",g.getOriprice().doubleValue());
            doc.addField("price",g.getPrice().doubleValue());
            doc.addField("remark",g.getRemark());
            doc.addField("content",g.getContent());
            doc.addField("picture",g.getPicture());
            doc.addField("categoryid",g.getCategoryid().longValue());
            doc.addField("salenum",g.getSalenum().intValue());
            doc.addField("totalstocks",g.getTotalstocks().intValue());

            JSONObject jsonObject = JSON.parseObject(g.getFilters().toString());
            doc.addField("is_jd_express",jsonObject.get("is_jd_express").equals(true)?1:0);
            doc.addField("is_second-hand",jsonObject.get("is_second-hand").equals(true)?1:0);
            doc.addField("is_new",jsonObject.get("is_new").equals(true)?1:0);
            doc.addField("is_to_pay",jsonObject.get("is_to_pay").equals(true)?1:0);
            docs.add(doc);
        }
        return docs;
    }

    //声明一个最后一次的导入时间
    private Date lastSycnDate=new Date();

    @Override
    @Scheduled(initialDelay = 5*1000,fixedRate = 5*1000)  //延时5秒执行 5秒循环一次
    public void importUpdate() {

        //查询出所有上架的商品
        QueryWrapper<Goods> qw=new QueryWrapper<>();
        qw.eq("status",1);
qw.ge("updatetime",lastSycnDate);
        List<Goods> goodsList = goodsMapper.selectList(qw);
        List<SolrInputDocument> docs=this.createDoc(goodsList);
        try {
            solrClient.add(docs);
            solrClient.commit();//提交
            lastSycnDate=new Date();
            log.info("数据增量导入成功:"+lastSycnDate.toLocaleString());
        }catch (Exception e){
            System.out.println(e);
            log.warn("数据增量导入失败{}",e);
        }

    }
}
```

修改主启动类开启定时任务  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7674605693939028.png)

## 10，编写代码实现搜索

### 创建DataGridView

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/04/14:50
 * @Description:
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataGridView {
    private Integer code=0;
    private String msg="";
    private Long count;
    private Object data;

}
```

### 创建SearchService

```java
/**
 * Created with IntelliJ IDEA.
 * 对外的搜索服务接口
 * @Auther: 雷哥
 * @Date: 2020/04/04/14:48
 * @Description:
 */
public interface SearchService {

    /***
    * @Description:
    * @Param: [keywords, 关键字
     * page,  页码
     * limit,  每页显示条数
     * sort,  排序字段  1  价格 2 销量
     * priceScope,  价格区间200-300
     * filters]  "is_jd_express":1,
     *         "is_second-hand":1,
     *         "is_new":1,
     *         "is_to_pay":1,
    * @return: DataGridView
    * @Author: 雷哥
    * @Date: 2020/4/4
    */
    DataGridView searchGoods(String keywords, Integer page, Integer limit, Integer sort, String priceScope, Map<String,Object> filters);
}
```

### 创建SearchServiceImpl

```java
/**
 * Created with IntelliJ IDEA.
 *
 * @Auther: 雷哥
 * @Date: 2020/04/04/14:54
 * @Description:
 */
@Service
@Log4j2
public class SearchServiceImpl implements SearchService {

    @Autowired
    private SolrClient solrClient;
    /***
     * @Description:
     * @Param: [keywords, 关键字
     * page,  页码
     * limit,  每页显示条数
     * sort,  排序字段  1  价格升  2 价格降3 销量升    4  销量降
     * priceScope,  价格区间200-300
     * filters]  "is_jd_express":1,
     *         "is_second_hand":1,
     *         "is_new":1,
     *         "is_to_pay":1,
     * @return: DataGridView
     * @Author: 雷哥
     * @Date: 2020/4/4
     */
    @Override
    public DataGridView searchGoods(String keywords, Integer page, Integer limit,
                                    Integer sort, String priceScope, Map<String, Object> filters) {
        //关键字
        SolrQuery solrQuery=null;
        if(StringUtils.isEmpty(keywords)){
            solrQuery=new SolrQuery("*:*");
        }else{
            solrQuery=new SolrQuery("keywords:"+keywords);
        }
        //分页处理
        solrQuery.setStart((page-1)*limit);
        solrQuery.setRows(limit);
        //处理排序
        switch (sort){
            case 1://按价格升
                solrQuery.addSort("price",SolrQuery.ORDER.asc);
                break;
            case 2://按价格降
                solrQuery.addSort("price",SolrQuery.ORDER.desc);
                break;
            case 3://按销量升
                solrQuery.addSort("salenum",SolrQuery.ORDER.asc);
                break;
            case 4://按销量降
                solrQuery.addSort("salenum",SolrQuery.ORDER.desc);
                break;
        }

        //处理价格过滤
        List<String> filterList=new ArrayList<>();
        if(!StringUtils.isEmpty(priceScope)){
            String[] split = priceScope.split("-");
            if(split.length!=2){
                throw  new RuntimeException("传入的价格范围参数不合法");
            }
            filterList.add("price:["+split[0]+" TO "+split[1]+"]");
        }
        //处理其它过滤"is_jd_express":1,
        //     *"is_second_hand":1,
        //     *"is_new":1,
        //     *"is_to_pay":1,
        if(!filters.isEmpty()){
            for (Map.Entry<String, Object> entry : filters.entrySet()) {
                filterList.add(entry.getKey()+":"+entry.getValue());
            }
        }
        //添加过滤条件
        if(!filterList.isEmpty()){
solrQuery.addFilterQuery(filterList.toArray(new String[]{}));
        }

        //只要关键字不为空才设置高亮
       if(!StringUtils.isEmpty(keywords)){
           solrQuery.setHighlight(true);
           solrQuery.addHighlightField("name");
           solrQuery.addHighlightField("remark");
           solrQuery.setHighlightSimplePre("<font color=red>");
           solrQuery.setHighlightSimplePost("</font>");
       }



        DataGridView dataGridView=new DataGridView();
        List<Goods> goods=new ArrayList<>();

       try
       {
           QueryResponse query = solrClient.query(solrQuery);
           SolrDocumentList results = query.getResults();
           dataGridView.setCount(results.getNumFound());//设置总条数
           Map<String, Map<String, List<String>>> highlighting =null;
           if(solrQuery.getHighlight()){//如果开户高亮，就高亮查询
               highlighting=query.getHighlighting();
           }
           for (SolrDocument result : results) {
               Goods g=new Goods();
               g.setId(Long.valueOf(result.getFieldValue("id").toString()));
               g.setName(result.getFieldValue("name").toString());
               g.setShopid(Long.valueOf(result.getFieldValue("shopid").toString()));
               g.setOriprice(new BigDecimal(Double.valueOf(result.getFieldValue("oriprice").toString())));
               g.setPrice(new BigDecimal(Double.valueOf(result.getFieldValue("price").toString())));
               g.setRemark(result.getFieldValue("remark").toString());
               g.setContent(result.getFieldValue("content").toString());
               g.setPicture(result.getFieldValue("picture").toString());
               g.setCategoryid(Long.valueOf(result.getFieldValue("categoryid").toString()));
               g.setSalenum(Integer.valueOf(result.getFieldValue("salenum").toString()));
               g.setTotalstocks(Integer.valueOf(result.getFieldValue("totalstocks").toString()));
               //处理高亮
               if(solrQuery.getHighlight()){
                    if(null!=highlighting&&!highlighting.isEmpty()){
                        for (Map.Entry<String, Map<String, List<String>>> entry : highlighting.entrySet()) {
                            String key = entry.getKey();
                            Map<String, List<String>> value = entry.getValue();
                            if(value.containsKey("name")){
                                String hlName=value.get("name").get(0);
                                g.setName(hlName);
                            }
                            if(value.containsKey("remark")){
                                String hlRemark=value.get("remark").get(0);
                                g.setRemark(hlRemark);
                            }

                        }
                    }
               }
               goods.add(g);
           }
       }catch (Exception e){
           log.warn("查询失败{}",e);
       }
        dataGridView.setData(goods);
        return dataGridView;
    }
}
```

测试

```java
@SpringBootTest
class SolrSpringbootJdApplicationTests {


    @Autowired
    private SearchService searchService;

    @Test
    void contextLoads() {
        Map<String, Object> filters=new HashMap<>();
        filters.put("is_jd_express",1);//要求京东快递
        DataGridView searchGoods = searchService.searchGoods("", 1, 5, 1, "70-500", filters);
        List<Goods> data = (List<Goods>) searchGoods.getData();
        for (Goods datum : data) {
            System.out.println(datum);
        }

    }

}
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.18274126569477048.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7300122104058988.png)

# 13【掌握】Solr控制台全量和增量导入配置

## 1.    概念说明

全量导入:一次性全导入。

增量导入：数据库中，新增的，修改的数据导入==>所以数据库中必须有一列,用来记录最后修改时间，做增量时

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9702801877486611.png)

## 2.    清空solr里面的数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4828022978387941.png)

## 3.    导包

### 3.1，在solr安装目录下dist目录下有两个solr-dataimport\*\*。.jar3.2，引入mysql的驱动包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.44258837035480764.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7103208879424247.png)

## 4.    全量导入的配置

### 4.1，修改server/solr/jd-shop/conf/solrconfig.xml

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1294901843246738.png)

### 4.2，创建server/solr/jd-shop/conf/data-conf.xml的文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<dataConfig>
    <!--配置数据源-->
    <dataSource type="JdbcDataSource"
driver="com.mysql.jdbc.Driver"
url="jdbc:mysql://127.0.0.1:3310/jd-shop?serverTimezone=UTC"
user="root"
 password="123456"/>
    <document>
        <entity name="goods"
          query="select id,name,shopid,oriprice,price,remark,content,picture,categoryid,salenum,totalstocks,
                case  JSON_EXTRACT(filters, '$.is_jd_express') WHEN true THEN 1 ELSE 0  END AS is_jd_express,
                case  JSON_EXTRACT(filters, '$.is_second_hand') WHEN true THEN 1 ELSE 0  END AS is_second_hand,
                case  JSON_EXTRACT(filters, '$.is_new') WHEN true THEN 1 ELSE 0  END AS is_new,
                case  JSON_EXTRACT(filters, '$.is_to_pay') WHEN true THEN 1 ELSE 0  END AS is_to_pay
                FROM goods where status= 1;" >
              <!--查询的数据和数据库索引意义对应column 是查询的字段name 是solr索引对应的字段
              <field column="fid" name="fid"/>  因为已经使用As映射好了 不用加了-->
        </entity>
    </document>
</dataConfig>
```

### 4.3，在阿里云上使用docker运行一个mysql

#### 启动docker

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.25741231052491187.png)

#### 使用docker运行mysql

docker run --name mysql -p 3310:3306 -e MYSQL\_ROOT\_PASSWORD=123456 -d mysql:5.7

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5938867801245907.png)

### 4.4，nvcat连接再把本地的库上传到阿里云

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.11645738825693303.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6408092963656624.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8807578433380618.png)

### 4.5，把刚才修改和创建的两配置文件覆盖到solr配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9065778617889679.png)

### 4.6，重启solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7232169145902692.png)

### 4.7，查看控制台

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3822741562426581.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.16120116604171916.png)

执行之后再查看数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9164000779038961.png)

## 5.    增量导入的配置

### 5.1，entity几个属性说明




   注意这个只能返回ID字段

  

   注意这个只能返回ID字段

### 5.2，修改data-config.xml并覆盖

```java
<?xml version="1.0" encoding="UTF-8" ?>
<dataConfig>
    <!--配置数据源-->
    <dataSource type="JdbcDataSource"
driver="com.mysql.jdbc.Driver"
url="jdbc:mysql://127.0.0.1:3310/jd-shop?serverTimezone=UTC"
user="root"
password="123456"/>
    <document>
        <entity name="goods"
          query="select id,name,shopid,oriprice,price,remark,content,picture,categoryid,salenum,totalstocks,
                case  JSON_EXTRACT(filters, '$.is_jd_express') WHEN true THEN 1 ELSE 0  END AS is_jd_express,
                case  JSON_EXTRACT(filters, '$.is_second_hand') WHEN true THEN 1 ELSE 0  END AS is_second_hand,
                case  JSON_EXTRACT(filters, '$.is_new') WHEN true THEN 1 ELSE 0  END AS is_new,
                case  JSON_EXTRACT(filters, '$.is_to_pay') WHEN true THEN 1 ELSE 0  END AS is_to_pay
                FROM goods where status= 1;"
          deltaQuery = "SELECT  id  FROM goods WHERE updatetime > '${dataimporter.last_index_time}' and status=1 "
          deletedPkQuery = "SELECT id  FROM goods WHERE  status=0 "
          deltaImportQuery="select id,name,shopid,oriprice,price,remark,content,picture,categoryid,salenum,totalstocks,
                case  JSON_EXTRACT(filters, '$.is_jd_express') WHEN true THEN 1 ELSE 0  END AS is_jd_express,
                case  JSON_EXTRACT(filters, '$.is_second_hand') WHEN true THEN 1 ELSE 0  END AS is_second_hand,
                case  JSON_EXTRACT(filters, '$.is_new') WHEN true THEN 1 ELSE 0  END AS is_new,
                case  JSON_EXTRACT(filters, '$.is_to_pay') WHEN true THEN 1 ELSE 0  END AS is_to_pay
                FROM goods where id ='${dataimporter.delta.id}'"
                >
              <!--查询的数据和数据库索引意义对应column 是查询的字段name 是solr索引对应的字段
              <field column="fid" name="fid"/>  因为已经使用As映射好了 不用加了-->
        </entity>
    </document>
</dataConfig>
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.47995827452942813.png)

### 5.3，重启solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5412922051412586.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8526067252630362.png)

# 14【掌握】SolrCloud概述

## 1，为什么要使用Solr集群

Solr 在数据非常大的时候，它的搜索速度会变慢（读）

Solr在并发特别大的时间，它的导入速度会变慢（写）

Solr 集群将解决solr 在高并发，大数据量的 读和写的问题！

### 1.1，数据库的数据大，并发高使用什么优化

读：使用缓存优化，分库分表

写：使用分库分表

### 1.2，Redis的数据量大，并发高使用什么优化

Redis-Cluster redis 的集群

### 1.3，Solr 数据量大，并发高使用什么优化

使用Solr-Cloud 优化，solr 集群

---

## 2，什么是SolrCloud

        SolrCloud(solr 云)是Solr提供的分布式搜索方案，当你需要大规模，容错，分布式索引和检索能力时使用 SolrCloud。当一个系统的索引数据量少的时候是不需要使用SolrCloud的，当索引量很大，搜索请求并发很高，这时需要使用SolrCloud来满足这些需求。

SolrCloud是基于Solr和Zookeeper的分布式搜索方案，它的主要思想是使用Zookeeper作为集群的配置信息中心。

它有几个特色功能：

1）集中式的配置信息

2）自动容错

3）近实时搜索

4）查询时自动负载均衡

---

## 3，Solr 集群的架构图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.32034178083656245.png)

### 3.1，逻辑架构

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5443050822065342.png)

1 在solr-cloud 把索引库库(图中sxt)称为集合Collection

2 Solr-1到solr-4 里面的机器里面都将存储sxt 的一部分数据

3 对于一个分片的机器，它们的数据都是相同的

### 3.2，物理的架构

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.1726498050629673.png)

### 3.3，在solr 集群里面需要解决的问题

因为每个solr服务器的库，存储的都是sxt 的一部分。

那每个solr 服务器的core 里面的配置文件都必须相同，怎么保证配置文件都是相同的

Zookeeper：起到了什么作用？

Zookeeper 可以在集群里面共享配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.06027195054225755.png)

# 15【掌握】SolrCloud搭建

实际方案

Zookeeper集群+solr集群去搭建

现在选择方案

单机的zookeeper+solr去搭建

## 1，准备一个zk

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9504124011384315.png)

连接测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.12134621006451751.png)

## 2，做为一基础版本的solr安装包

1， 配置好分词配置文件

2， 配置好分词jar包

3， 配置好控制台的数据全量和增量导入的jar包

### 创建/user/local/solr-cloud并进入

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.11742823708335992.png)

### 把/root/software/solr-7.7.2.gz包加压到/usr/local/solr-cloud

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3875212205527664.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.46746034471016396.png)

### 把solr-7.7.2改名

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9076463375968418.png)

### 导入ik相关的包和配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7536164933786951.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7602059062064985.png)

### 导入控制数据导入的相关的包

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9838335964297176.png)

## 3，端口配置选择

| 机器的编号 | 文件夹的名称 | 端口 |
| ---------- | ------------ | ---- |
| 1          | solr-1       | 8984 |
| 2          | solr-2       | 8985 |
| 3          | solr-3       | 8986 |
| 4          | solr-4       | 8987 |

## 4，进行solr-cloud的一个配置

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6864945973387543.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3212603318408328.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.18901578007339723.png)

## 5，把solr-1复制3个

cp -r solr-1 solr-2

cp -r solr-1 solr-3

cp -r solr-1 solr-4

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6621364826194965.png)

## 6，分别以集群的方式启动4台solr

单机版本的zk./solr start -p 8984 -force -c -m 256m -z localhost:2181

集群版本的zk

./solr start -p 8984 -force -c -m 256m -z localhost:2181,localhost:2182,localhost:2183

\-p 端口 solr

\-c 代表集群

\-m 代表当前solr服务器默认的内存大小

\-z 指定zookeeper的地址

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.44556017391673153.png)

Cd /usr/local/solr-cloud

./solr-1/bin/solr -p 8984 -force -c -m 256m -z localhost:2181

./solr-2/bin/solr -p 8985 -force -c -m 256m -z localhost:2181

./solr-3/bin/solr -p 8986 -force -c -m 256m -z localhost:2181

./solr-4/bin/solr -p 8987 -force -c -m 256m -z localhost:2181

## 7，分别访问4台solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.14978857025285236.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.08257878702207083.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9561155261928573.png)

## 8，查看zk

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.445851085421481.png)

## 9，创建collection\[逻辑库\]

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9876362392444038.png)

Name：集群里面的集合名称

Config 当前库使用的配置文件

numShards:设置该库有多个分片

replicationFact 每一个片有2个机器

点击添加帮忙现如下警告 直接刷新页面

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.729333677691612.png)

F5

## 10，查看分片图

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9826327474941022.png)

## 11，关闭一个主机如上面的8986

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9909548621827344.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7967932614523704.png)

如果8986再回来，当小弟

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6583266021948314.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9496399400270519.png)

## 12，选择collection

集群—操作collection

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5484468440653688.png)

单机—操作core

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.42580256674999906.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5591208107726572.png)

## 13，查看分片

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.28821730192816214.png)

# 16【掌握】zookeeper管理配置文件

## 1，准备一个配置好了的配置文件

在之前的单机版本里面有一个好的

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7082872952328354.png)

## 2，使用solr准备好的zk工具包上传

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10197056296527157.png)

[https://lucene.apache.org/solr/guide/7\_7/command-line-utilities.html](https://lucene.apache.org/solr/guide/7_7/command-line-utilities.html)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7526550683505248.png)

语法

./server/scripts/cloud-scripts/zkcli.sh -zkhost 127.0.0.1:9983 -cmd upconfig -confname my\_new\_config -confdir server/solr/configsets/\_default/conf



最后我们的语法

cd /usr/local/solr-7.7.2/server/scripts/cloud-scripts



./zkcli.sh -zkhost localhost:2181 -cmd upconfig -confname jd-shop -confdir  /usr/local/solr-7.7.2/server/solr/jd-shop/conf

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.01836460198887554.png)

查看zk

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.42824436065449595.png)

## 3，创建新的collection选择jd-shop这个配置文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6085929470215257.png)

## 4，分词测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.21463609620139787.png)

## 5，使用控制台导入数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9807079905597528.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.5264624368358412.png)

# 17【掌握】Solr集群的使用

## 使用java连接solr

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8330399014145287.png)

出现异常

原因：因为solr-cloud使用时必须指定一个逻辑库

### 写法1【不推荐】

```Plain Text
*/  public class Test14SolrCloudQueryAll {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String _SOLR_URL_="http://www.leige.plus:8984/solr/db2-collection";
    //声明一个连接solr的对象
    private static CloudSolrClient cloudSolrClient;
    static {
        List solrUrls=new ArrayList<>();
        solrUrls.add("http://www.leige.plus:8984/solr");
        solrUrls.add("http://www.leige.plus:8985/solr");
        solrUrls.add("http://www.leige.plus:8986/solr");
        solrUrls.add("http://www.leige.plus:8987/solr");
        _cloudSolrClient_=new CloudSolrClient.Builder(solrUrls).build();
        cloudSolrClient.setDefaultCollection("db2-collection");
  //        cloudSolrClient.setZkClientTimeout(5000);
//        cloudSolrClient.setZkConnectTimeout(5000);
    }
    public static void main(String[] args) throws IOException, SolrServerException {
       String keywords="*:*";
       //创建一个查询条件对象
        SolrQuery solrQuery=new SolrQuery(keywords);
        //查询
        QueryResponse query = cloudSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

### 写法2【推荐】找zk

```Plain Text
_/** * Created with IntelliJ IDEA.
 *__全查询_ * @Auther:_ 雷哥 _* @Date: 2020/04/03/18:53* * @Description: */*  public class Test15SolrCloudQueryAll {
    //声明一个连接solr的地址  ip:port/solr/库名
    public static final String _SOLR_URL_="http://www.leige.plus:8984/solr/db2-collection";
    //声明一个连接solr的对象
    private static CloudSolrClient cloudSolrClient;
    static {
        List zkHosts=new ArrayList<>();
        zkHosts.add("www.leige.plus:2181");
        _cloudSolrClient_=new CloudSolrClient.Builder(zkHosts, Optional.empty()).build();
        cloudSolrClient.setDefaultCollection("db2-collection");
        cloudSolrClient.setZkClientTimeout(5000);
        cloudSolrClient.setZkConnectTimeout(5000);
    }
    public static void main(String[] args) throws IOException, SolrServerException {
       String keywords="*:*";
       //创建一个查询条件对象
        SolrQuery solrQuery=new SolrQuery(keywords);
        //查询
        QueryResponse query = cloudSolrClient.query(solrQuery);
        //取出结果
        SolrDocumentList results = query.getResults();
        System.out.println("总条数:"+results.getNumFound());
        for (SolrDocument result : results) {
            System.out.println(result);
        }
    }
}
```

## 使用boot连接solr

### 只改yml就行了

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.16275611183569658.png)

### 为什么

```Plain Text
@Configuration(
    proxyBeanMethods = false
  )
@ConditionalOnClass({HttpSolrClient.class, CloudSolrClient.class})
@EnableConfigurationProperties({SolrProperties.class})
  public class SolrAutoConfiguration {
    public SolrAutoConfiguration() {
    }

    @Bean
    @ConditionalOnMissingBean
    public SolrClient solrClient(SolrProperties properties) {
        return (SolrClient)(StringUtils.hasText(properties.getZkHost()) ? (new Builder(Arrays.asList(properties.getZkHost()), Optional.empty())).build() : (new org.apache.solr.client.solrj.impl.HttpSolrClient.Builder(properties.getHost())).build());
    }
}
```

从上面的代码可以看出如果配置了zkHost那么就从zookeeper里面取solr节点创建对象

否则就根据solr:host去创建对象

### 查询报错【原因，没有设置默认库】

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9159579657130066.png)

### 创建SolrConfig设置默认库

```Plain Text
/*** * Created with IntelliJ IDEA. * * @Auther: 雷哥_ _* @Date: 2020/04/04/23:18*
* * @Description: */*  @Configuration
  public class SolrConfig {
    @Autowired
    private SolrClient solrClient;
    @PostConstruct
    public void setDefaultCore(){
        if(solrClient instanceof CloudSolrClient){
            CloudSolrClient cloudSolrClient= (CloudSolrClient) solrClient;
            cloudSolrClient.setDefaultCollection("db2-collection");
        }
    }
}
```

### 再测试

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.12917103930292445.png)

# 18【掌握】最后两个问题

## 1，为什么只要一个zk地址就可以连接到solr集群并写数据

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image002c85de2ef-b526-441e-b650-343ea752a3e9.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image004eca0e2fd-cdfa-4569-9c10-43ace162aa0b.jpg)

## 2，我们在搭建solr集群时能不能去使用局域网的地址

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraclip_image006b6cba7d7-3d1d-4cfe-a457-2afe1b1a13aa.jpg)

在solr.xml 里面我们使用的公网的地址，现在没有任何问题？为什么不使用局域网的地址？

我们知道，我们可以从zk上面获取solr的地址。Solr 是把自己的那个地址写在zk 上面！

Solr 会把自己配置文件solr.xml 里面的host地址写在zk 上面！

假设我们写的局域网的地址：那在zk 上面就是局域网的地址->app 从zk 上面获取的就是局域网的地址-> 你的app 能不能通过局域网的地址来连接solr

原因就是上面的

那什么时候就能使用局域网！

我们若把app 和solr 部署在一个局域网内部！就可以了。在工作时，需要把程序和solr 部署在局域网里面