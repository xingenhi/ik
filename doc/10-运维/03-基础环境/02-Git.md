# Git

# 01【熟悉】git简介

## 一，概述

Git是什么？

Git是目前世界上最先进的分布式版本控制系统（没有之一）。

Git有什么特点？简单来说就是：高端大气上档次！

哪些GIT网站？

    [https://github.com/](https://github.com/) 全球最大的开源项目网站。

    [https://gitee.com/](https://gitee.com/) 中国最大的开源项目网站。

---

## 二，git的诞生

        很多人都知道，Linus在1991年创建了开源的Linux，从此，Linux系统不断发展，已经成为最大的服务器系统软件了。

        Linus虽然创建了Linux，但Linux的壮大是靠全世界热心的志愿者参与的，这么多人在世界各地为Linux编写代码，那Linux的代码是如何管理的呢？

        事实是，在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码！

        你也许会想，为什么Linus不把Linux代码放到版本控制系统里呢？不是有CVS、SVN这些免费的版本控制系统吗？因为Linus坚定地反对CVS和SVN，这些集中式的版本控制系统不但速度慢，而且必须联网才能使用。有一些商用的版本控制系统，虽然比CVS、SVN好用，但那是付费的，和Linux的开源精神不符。

        不过，到了2002年，Linux系统已经发展了十年了，代码库之大让Linus很难继续通过手工方式管理了，社区的弟兄们也对这种方式表达了强烈不满，于是Linus选择了一个商业的版本控制系统BitKeeper，BitKeeper的东家BitMover公司出于人道主义精神，授权Linux社区免费使用这个版本控制系统。

        安定团结的大好局面在2005年就被打破了，原因是Linux社区牛人聚集，不免沾染了一些梁山好汉的江湖习气。开发Samba的Andrew试图破解BitKeeper的协议（这么干的其实也不只他一个），被BitMover公司发现了（监控工作做得不错！），于是BitMover公司怒了，要收回Linux社区的免费使用权。

        Linus可以向BitMover公司道个歉，保证以后严格管教弟兄们，嗯，这是不可能的。实际情况是这样的：

        Linus花了两周时间自己用C写了一个分布式版本控制系统，这就是Git！一个月之内，Linux系统的源码已经由Git管理了！牛是怎么定义的呢？大家可以体会一下。

        Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。

        历史就是这么偶然，如果不是当年BitMover公司威胁Linux社区，可能现在我们就没有免费而超级好用的Git了。

---

## 三，集中式VS分布式

        Linus一直痛恨的CVS及SVN都是集中式的版本控制系统，而Git是分布式版本控制系统，集中式和 分布式版本控制系统有什么区别呢？

        先说集中式版本控制系统，版本库是集中存放在中央服务器的，而干活的时候，用的都是自己的电脑，所以要先从中央服务器取得最新的版本，然后开始干活，干完活了，再把自己的活推送给中央服务器。中央服务器就好比是一个图书馆，你要改一本书，必须先从图书馆借出来，然后回到家自己改，改完了，再放回图书馆。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8909244590067427.png)

  

        集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟，这还不得把人给憋死啊。

        那分布式版本控制系统与集中式版本控制系统有何不同呢？首先，分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库，那多个人如何协作呢？比方说你在自己电脑上改了文件A，你的同事也在他的电脑上改了文件A，这时，你们俩之间只需把各自的修改推送给对方，就可以互相看到对方的修改了。

        和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

        在实际使用分布式版本控制系统的时候，其实很少在两人之间的电脑上推送版本库的修改，因为可能你们俩不在一个局域网内，两台电脑互相访问不了，也可能今天你的同事病了，他的电脑压根没有开机。因此，分布式版本控制系统通常也有一台充当“中央服务器”的电脑，但这个服务器的作用仅仅是用来方便“交换”大家的修改，没有它大家也一样干活，只是交换修改不方便而已。

  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4753485566301585.png)

        当然，Git的优势不单是不必联网这么简单，后面我们还会看到Git极其强大的分支管理，把SVN等远远抛在了后面。

        CVS作为最早的开源而且免费的集中式版本控制系统，直到现在还有不少人在用。由于CVS自身设计的问题，会造成提交文件不完整，版本库莫名其妙损坏的情况。同样是开源而且免费的SVN修正了CVS的一些稳定性问题，是目前用得最多的集中式版本库控制系统。

        除了免费的外，还有收费的集中式版本控制系统，比如IBM的ClearCase（以前是Rational公司的，被IBM收购了），特点是安装比Windows还大，运行比蜗牛还慢，能用ClearCase的一般是世界500强，他们有个共同的特点是财大气粗，或者人傻钱多。

        微软自己也有一个集中式版本控制系统叫VSS，集成在Visual Studio中。由于其反人类的设计，连微软自己都不好意思用了。

        分布式版本控制系统除了Git以及促使Git诞生的BitKeeper外，还有类似Git的Mercurial和Bazaar等。这些分布式版本控制系统各有特点，但最快、最简单也最流行的依然是Git！

# 02【掌握】git的安装

## 一，下载

1，[https://git-scm.com/downloads](https://git-scm.com/downloads)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad414eb6f-035f-4959-ad03-a3f43cd90ec3.png)

2，[https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora6d08910b-dd3a-4023-b4be-eafadc4fd69a.png)

---

## 二，安装

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa7a8ea09-7542-437d-9455-9653f0ef2831.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora305526fe-1dfc-4190-8754-7e51230f69b7.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora13f7c3b9-843f-4847-8a29-5264dd847bf1.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradd0c921e-6691-4488-9400-b49f0de98746.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac2ac9ef6-b9d8-4e8e-a829-a654677000a4.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora3796fc8a-9311-46d8-9dff-5dee1ab3590a.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0632b1ce-7150-4acf-bc66-55f54b259f94.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab7bbdca1-5c55-4454-93ff-a0d3dd010bb0.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa652162b-68fc-4376-a4d8-7cb32739bc50.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7d089bb7-c16b-4593-b396-9524c7564b31.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf1c88a6b-8f05-43f3-9f52-89233db33857.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabc8076d2-40f8-4808-a242-b9eb61ea3102.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8e895ba4-fa65-4c1c-afda-95fa1ffaa823.png)



---

## 二，设置全局身份

1，打开git Bash

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora209664a5-49fc-4a21-b169-575d1dfb5442.png)

如果出现以下界面说明安装成功了（除非脸黑，否则是没有任何问题的）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraba219978-b880-4a88-87ac-830fb16cd39b.jpg)

因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。

```javascript
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora1100332c-a3f2-4866-b17e-c14375ee4995.jpg)



---

## 三，创建版本库

什么是版本库呢？版本库又名仓库，英文名repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。

所以，创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录：

```bash
#创建仓库
$ mkdir D:/git/repository
#以上的设置之后相当于在D盘的git下创建了一个repository的目录
#接下来我们要把这个目录变成一个版本库
#打开目录
cd D/git/repository
#执行仓库的初始化命令
Arvin@Arvin-pc MINGW64 /d/git/repository
$ git init
Initialized empty Git repository in D:/git/repository/.git/

```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorafa220157-464a-42a3-acd4-4bd5bbdd8f9c.jpg)

瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改个个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -ah命令就可以看见。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorae3b3805b-8fc8-410d-bc9d-e314f3c30b41.jpg)

# 03【掌握】文件管理-添加文件

## 添加文件

首先这里再明确一下，所有的版本控制系统，其实只能跟踪文本文件的改动，比如TXT文件，网页，所有的程序代码等等，Git也不例外。版本控制系统可以告诉你每次的改动，比如在第5行加了一个单词“Linux”，在第8行删了一个单词“Windows”。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。

不幸的是，Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动的，前面我们举的例子只是为了演示，如果要真正使用版本控制系统，就要以纯文本方式编写文件。

因为文本是有编码的，比如中文有常用的GBK编码，日文有Shift\_JIS编码，如果没有历史遗留问题，强烈建议使用标准的UTF-8编码，所有语言使用同一种编码，既没有冲突，又被所有平台所支持。

现在我们编写一个readme.txt文件，内容如下：

```bash
锄禾日当午;
```

一定要放到D:\\git\\repository目录下（子目录也行），因为这是一个Git仓库，放到其他地方Git再厉害也找不到这个文件。

把一个文件放到Git仓库只需要两步。

第一步，用命令git add告诉Git，把文件添加到仓库：

```bash
$ git add readme.txt
```

执行上面的命令，没有任何显示，这就对了，Unix的哲学是“没有消息就是好消息”，说明添加成功。

第二步，用命令git commit告诉Git，把文件提交到仓库：

```bash
$ git commit -m "创建一个新文件"
[master (root-commit) eaadf4e] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```

简单解释一下git commit命令，-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

git commit命令执行成功后会告诉你，1 file changed：1个文件被改动（我们新添加的readme.txt文件）；2 insertions：插入了两行内容（readme.txt有两行内容）。

为什么Git添加文件需要add，commit一共两步呢？因为commit可以一次提交很多文件，所以你可以多次add不同的文件，比如：

```bash
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

我们已经成功地添加并提交了一个readme.txt文件，现在，是时候继续工作了，于是，我们继续修改readme.txt文件，改成如下内容：

```bash
锄禾日当午;
汗滴禾下土;
```

现在，运行git status命令看看结果：  

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
    modified: readme.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

git status命令可以让我们时刻掌握仓库当前的状态，上面的命令输出告诉我们，readme.txt被修改过了，但还没有准备提交的修改。

虽然Git告诉我们readme.txt被修改了，但如果能看看具体修改了什么内容，自然是很好的。比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的readme.txt，所以，需要用git diff这个命令看看：

```bash
$ git diff readme.txt 
diff --git a/readme.txt b/readme.txt
index b7b591a..ed02637 100644
--- a/readme.txt
+++ b/readme.txt
@@ -1,2 +1,3 @@
 锄禾日当午;
\ No newline at end of file
+汗滴禾下土;
\ No newline at end of file

```

git diff顾名思义就是查看difference，显示的格式正是Unix通用的diff格式，可以从上面的命令输出看到，我们在第二行添加了一个  "汗滴禾下土;"。

知道了对readme.txt作了什么修改后，再把它提交到仓库就放心多了，提交修改和提交新文件是一样的两步，第一步是git add：

```bash
$ git add readme.txt
```

同样没有任何输出。在执行第二步git commit之前，我们再运行git status看看当前仓库的状态：

```bash
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
    modified: readme.txt
```

git status告诉我们，将要被提交的修改包括readme.txt，下一步，就可以放心地提交了：

```bash
$ git commit -m "添加 汗滴禾下土;"
[master e475afc] add distributed
 1 file changed, 1 insertion(+), 1 deletion(-)
```

提交后，我们再用git status命令看看仓库的当前状态：

```bash
$ git status
On branch master
nothing to commit, working tree clean
```

Git告诉我们当前没有需要提交的修改，而且，工作目录是干净（working tree clean）的。

小结

```bash
添加文件到Git仓库，分两步：
使用命令git add <file>，注意，可反复多次使用，添加多个文件；
使用命令git commit -m <message>，完成。
要随时掌握工作区的状态，使用git status命令。
如果git status告诉你有文件被修改过，用git diff可以查看修改内容
```

---

# 04【掌握】文件管理-版本回退

## 版本回退

现在，你已经学会了修改文件，然后把修改提交到Git版本库，现在，再练习一次，修改readme.txt文件如下：

```bash
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
```

然后尝试提交：

```bash
$ git add readme.txt
$ git commit -m "添加 谁知盘中餐;"
[master 1094adb] append GPL
 1 file changed, 1 insertion(+), 1 deletion(-)
```

像这样，你不断对文件进行修改，然后不断提交修改到版本库里，就好比玩RPG游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss之前，你会手动存盘，以便万一打Boss失败了，可以从最近的地方重新开始。Git也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

现在，我们回顾一下readme.txt文件一共有几个版本被提交到Git仓库里了：

版本1：创建一个新文件

```bash
锄禾日当午;
```

版本2：添加  汗滴禾下土;

```bash
锄禾日当午;
汗滴禾下土;
```

版本3：添加 谁知盘中餐;

```javascript
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
```

当然了，在实际工作中，我们脑子里怎么可能记得一个几千行的文件每次都改了什么内容，不然要版本控制系统干什么。版本控制系统肯定有某个命令可以告诉我们历史记录，在Git中，我们用git log命令查看：

```bash
$ git log
commit cb5f63708e7ac7297cb62e5d120611aae8db1690 (HEAD -> master)
Author: laolei <78714842@qq.com>
Date:   Mon Sep 17 21:39:25 2018 +0800

    添加 谁知盘中餐;

commit c80cf994f0ee2460c40931dfc0911c02c14b3c35
Author: laolei <78714842@qq.com>
Date:   Mon Sep 17 21:35:17 2018 +0800

    添加 汗滴禾下土;

commit c133d59177a11c1b9a1ce09c3ef084a274b9cff4
Author: laolei <78714842@qq.com>
Date:   Mon Sep 17 21:34:11 2018 +0800

    创建一个新文件

```

git log命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是 创建一个新文件。

如果嫌输出信息太多，看得眼花缭乱的，可以试试加上--pretty=oneline参数：

```bash
$ git log --pretty=oneline
cb5f63708e7ac7297cb62e5d120611aae8db1690 (HEAD -> master) 添加 谁知盘中餐;
c80cf994f0ee2460c40931dfc0911c02c14b3c35 添加 汗滴禾下土;
c133d59177a11c1b9a1ce09c3ef084a274b9cff4 创建一个新文件
```

需要友情提示的是，你看到的一大串类似cb5f63...的是commit id（版本号），和SVN不一样，Git的commit id不是1，2，3……递增的数字，而是一个SHA1计算出来的一个非常大的数字，用十六进制表示，而且你看到的commit id和我的肯定不一样，以你自己的为准。为什么commit id需要用这么一大串数字表示呢？因为Git是分布式的版本控制系统，后面我们还要研究多人在同一个版本库里工作，如果大家都用1，2，3……作为版本号，那肯定就冲突了。

每提交一个新版本，实际上Git就会把它们自动串成一条时间线。如果使用可视化工具查看Git历史，就可以更清楚地看到提交历史的时间线：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora847cf68e-6b30-45b6-a50a-f5138c5af706.png)

好了，现在我们启动时光穿梭机，准备把readme.txt回退到上一个版本，也就是\[添加 汗滴禾下土 \]的那个版本，怎么做呢？  

首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交cb5f63708e7...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD\~100。

现在，我们要把当前版本【添加  谁知盘中餐;】回退到上一个版本【添加 汗滴禾下土;】，就可以使用git reset命令：

```bash
$ git reset --hard HEAD^
HEAD is now at c80cf99 添加 汗滴禾下土;
```

\--hard参数有啥意义？这个后面再讲，现在你先放心使用。

看看readme.txt的内容是不是版本 \[添加 汗滴禾下土\]：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
```

果然被还原了。

还可以继续回退到上一个版本【创建一个新文件】，不过且慢，然我们用git log再看看现在版本库的状态：

```bash
$ git log
commit c80cf994f0ee2460c40931dfc0911c02c14b3c35 (HEAD -> master)
Author: laolei <78714842@qq.com>
Date:   Mon Sep 17 21:35:17 2018 +0800

    添加 汗滴禾下土;

commit c133d59177a11c1b9a1ce09c3ef084a274b9cff4
Author: laolei <78714842@qq.com>
Date:   Mon Sep 17 21:34:11 2018 +0800

    创建一个新文件

```

最新的那个版本【添加  谁知盘中餐;】已经看不到了！好比你从21世纪坐时光穿梭机来到了19世纪，想再回去已经回不去了，肿么办？

办法其实还是有的，只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个【添加  谁知盘中餐;】的commit id是cb5f63708e7...，于是就可以指定回到未来的某个版本：

```bash
$ git reset --hard cb5f63
HEAD is now at cb5f637 添加 谁知盘中餐;
```

版本号没必要写全，前几位就可以了，Git会自动去找。当然也不能只写前一两位，因为Git可能会找到多个版本号，就无法确定是哪一个了。

再小心翼翼地看看readme.txt的内容：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
```

果然，我胡汉三又回来了。

Git的版本回退速度非常快，因为Git在内部有个指向当前版本的HEAD指针，当你回退版本的时候，Git仅仅是把HEAD从指向【添加  谁知盘中餐;】：git-head  改为指向【添加 汗滴禾下土;】：git-head-move

然后顺便把工作区的文件更新了。所以你让HEAD指向哪个版本号，你就把当前版本定位在哪。

现在，你回退到了某个版本，关掉了电脑，第二天早上就后悔了，想恢复到新版本怎么办？找不到新版本的commit id怎么办？

在Git中，总是有后悔药可以吃的。当你用\$ git reset --hard HEAD^回退到【添加 汗滴禾下土;】版本时，再想恢复到【添加  谁知盘中餐;】，就必须找到【添加  谁知盘中餐;】的commit id。Git提供了一个命令git reflog用来记录你的每一次命令：

```bash
$ git reflog
cb5f637 (HEAD -> master) HEAD@{0}: reset: moving to cb5f63
c80cf99 HEAD@{1}: reset: moving to HEAD^
cb5f637 (HEAD -> master) HEAD@{2}: commit: 添加 谁知盘中餐;
c80cf99 HEAD@{3}: commit: 添加 汗滴禾下土;
c133d59 HEAD@{4}: commit (initial): 创建一个新文件
```

终于舒了口气，从输出可知，添加  谁知盘中餐;】的commit id是cb5f637，现在，你又可以乘坐时光机回到未来了。

#### 小结

现在总结一下：

HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit\_id。

穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。

要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。







---

# 05【掌握】工作区和暂存区

## 工作区和暂存区

Git和其他版本控制系统如SVN的一个不同之处就是有暂存区的概念。

先来看名词解释。

工作区（Working Directory）

就是你在电脑里能看到的目录，比如我的repostiory文件夹就是一个工作区：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8186a9d4-a9dc-406d-98f0-165983b9a34c.png)



working-dir

版本库（Repository）

工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.3323794454118689.png)

  

分支和HEAD的概念我们以后再讲。

前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

俗话说，实践出真知。现在，我们再练习一遍，先对readme.txt做个修改，比如加上一行内容：

```bash
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
```

然后，在工作区新增一个LICENSE文本文件（内容随便写）。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora362c458b-c815-48e7-a0b1-d2438629b1d8.png)



先用git status查看一下状态：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   readme.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        LICENSE.txt

no changes added to commit (use "git add" and/or "git commit -a")

```

Git非常清楚地告诉我们，readme.txt被修改了，而LICENSE还从来没有被添加过，所以它的状态是Untracked。

现在，使用两次命令git add，把readme.txt和LICENSE.txt都添加后，用git status再查看一下：

```bash
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   LICENSE.txt
        modified:   readme.txt
```

现在，暂存区的状态就变成这样了：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6682527229723187.png)

所以，git add命令实际上就是把要提交的所有修改放到暂存区（Stage），然后，执行git commit就可以一次性把暂存区的所有修改提交到分支。

```bash
$ git commit -m "添加 粒粒皆辛苦和LICENCE.txt"
[master f8eb8ab] 添加 粒粒皆辛苦和LICENCE.txt
 2 files changed, 3 insertions(+), 1 deletion(-)
 create mode 100644 LICENSE.txt
```

一旦提交后，如果你又没有对工作区做任何修改，那么工作区就是“干净”的：

```bash
$ git status
On branch master
nothing to commit, working tree clean
```

现在版本库变成了这样，暂存区就没有任何内容了：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.07419062306722735.png)

  

#### 小结

暂存区是Git非常重要的概念，弄明白了暂存区，就弄明白了Git的很多操作到底干了什么。

没弄明白暂存区是怎么回事的童鞋，请向上滚动页面，再看一次。

# 06【掌握】文件管理-文件修改

## 管理修改

现在，假定你已经完全掌握了暂存区的概念。下面，我们要讨论的就是，为什么Git比其他版本控制系统设计得优秀，因为Git跟踪并管理的是修改，而非文件。

你会问，什么是修改？比如你新增了一行，这就是一个修改，删除了一行，也是一个修改，更改了某些字符，也是一个修改，删了一些又加了一些，也是一个修改，甚至创建一个新文件，也算一个修改。

为什么说Git管理的是修改，而不是文件呢？我们还是做实验。第一步，对readme.txt做一个修改，比如加一行内容：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
```

然后，添加：

```bash
$ git add readme.txt
$ git status
# On branch master
# Changes to be committed:
# (use "git reset HEAD <file>..." to unstage)
#
# modified: readme.txt
#
```

然后，再修改readme.txt：

```bash
$ cat readme.txt 
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
GIT文件再次修改
```

提交：

```bash
$ git commit -m "添加 GIT修改测试"
[master 519219b] git tracks changes
 1 file changed, 1 insertion(+)
```

提交后，再看看状态：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified: readme.txt
no changes added to commit (use "git add" and/or "git commit -a")
```

咦，怎么第二次的修改没有被提交？

别激动，我们回顾一下操作过程：

第一次修改 -> git add -> 第二次修改 -> git commit

你看，我们前面讲了，Git管理的是修改，当你用git add命令后，在工作区的第一次修改被放入暂存区，准备提交，但是，在工作区的第二次修改并没有放入暂存区，所以，git commit只负责把暂存区的修改提交了，也就是第一次的修改被提交了，第二次的修改不会被提交。

提交后，用git diff HEAD -- readme.txt命令可以查看工作区和版本库里面最新版本的区别：

```bash
$ git diff head -- readme.txt
diff --git a/readme.txt b/readme.txt
index 6f624d5..0e523cb 100644
--- a/readme.txt
+++ b/readme.txt
@@ -2,4 +2,5 @@
 汗滴禾下土;
 谁知盘中餐;
 粒粒皆辛苦;
-GIT修改测试
\ No newline at end of file
+GIT修改测试
+GIT文件再次修改
\ No newline at end of file

```

可见，第二次修改确实没有被提交。

那怎么提交第二次修改呢？你可以继续git add再git commit，也可以别着急提交第一次修改，先git add第二次修改，再git commit，就相当于把两次修改合并后一块提交了：

第一次修改 -> git add -> 第二次修改 -> git add -> git commit

好，现在，把第二次修改提交了，然后开始小结。

小结

现在，你又理解了Git是如何跟踪修改的，每次修改，如果不用git add到暂存区，那就不会加入到commit中。

# 07【掌握】文件管理-撤销修改

## 撤销修改

自然，你是不会犯错的。不过现在是凌晨两点，你正在赶一份工作报告，你在readme.txt中添加了一行：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
GIT文件再次修改
我那愚蠢的老板还是中意SVN
```

在你准备提交前，一杯咖啡起了作用，你猛然发现了\[愚蠢的老板\]可能会让你丢掉这个月的奖金！既然错误发现得很及时，就可以很容易地纠正它。你可以删掉最后一行，手动把文件恢复到上一个版本的状态。如果用git status查看一下：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified: readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

你可以发现，Git会告诉你，git checkout -- file可以丢弃工作区的修改：

```bash
$ git checkout -- readme.txt
```

命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次git commit或git add时的状态。

现在，看看readme.txt的文件内容：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
GIT文件再次修改
我那愚蠢的老板还是中意SVN
```

文件内容果然复原了。

git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。

现在假定是凌晨3点，你不但写了一些胡话，还git add到暂存区了：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
GIT文件再次修改
我那愚蠢的老板还是中意SVN
$ git add readme.txt
```

庆幸的是，在commit之前，你发现了这个问题。用git status查看一下，修改只是添加到了暂存区，还没有提交：

```bash
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified: readme.txt
```

Git同样告诉我们，用命令git reset HEAD 可以把暂存区的修改撤销掉（unstage），重新放回工作区：

```bash
$ git reset HEAD readme.txt
Unstaged changes after reset:
M readme.txt
```

git reset命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用HEAD时，表示最新的版本。

再用git status查看一下，现在暂存区是干净的，工作区有修改：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified: readme.txt
```

还记得如何丢弃工作区的修改吗？

```bash
$ git checkout -- readme.txt
$ git status
On branch master
nothing to commit, working tree clean
```

整个世界终于清静了！

 现在，假设你不但改错了东西，还从暂存区提交到了版本库，怎么办呢？还记得版本回退一节吗？可以回退到上一个版本。不过，这是有条件的，就是你还没有把自己的本地版本库推送到远程。还记得Git是分布式版本控制系统吗？我们后面会讲到远程版本库，一旦你把stupid boss提交推送到远程版本库，你就真的惨了……

小结

又到了小结时间。

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD ，就回到了场景1，第二步按场景1操作。

场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

# 08【掌握】文件管理-删除文件

## 删除文件

在Git中，删除也是一个修改操作，我们实战一下，先添加一个新文件test.txt到Git并且提交：

```bash
$ git add test.txt
$ git commit -m "add test.txt"
[master b84166e] add test.txt
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt
```

一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用rm命令删了：

```bash
$ rm test.txt
```

这个时候，Git知道你删除了文件，因此，工作区和版本库就不一致了，git status命令会立刻告诉你哪些文件被删除了：

```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    deleted: test.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

现在你有两个选择，一是确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit：

```bash
$ git rm test.txt
rm 'test.txt'

$ git commit -m "remove test.txt"
[master d46f35e] remove test.txt
 1 file changed, 1 deletion(-)
 delete mode 100644 test.txt
```

现在，文件就从版本库中被删除了。

 小提示：先手动删除文件，然后使用git rm 和git add效果是一样的。

另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：

```bash
$ git checkout -- test.txt
```

git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。

小结

命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

# 09【掌握】分支管理-创建与合并分支

## 一，创建与合并分支

在版本回退里，你已经知道，每次提交，Git都把它们串成一条时间线，这条时间线就是一个分支。截止到目前，只有一条时间线，在Git里，这个分支叫主分支，即master分支。HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。  

一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6495317798349465.png)

  

每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长：

 当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.10889024910460621.png)

  

你看，Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，工作区的文件都没有任何变化！

不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9646015361355231.png)

  

假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.4857606453504424.png)

  

所以Git合并分支也很快！就改改指针，工作区内容也不变！

合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.7022787158120254.png)

  

真是太神奇了，你看得出来有些提交是通过分支完成的吗？

### 下面开始实战。

首先，我们创建dev分支，然后切换到dev分支：

```bash
$ git checkout -b dev
Switched to a new branch 'dev'
```

git checkout命令加上-b参数表示创建并切换，相当于以下两条命令：

```bash
$ git branch dev
$ git checkout dev
Switched to branch 'dev'
```

然后，用git branch命令查看当前分支：

```bash
$ git branch
* dev
  master
```

git branch命令会列出所有分支，当前分支前面会标一个\*号。

然后，我们就可以在dev分支上正常提交，比如对readme.txt做个修改，加上一行：

创建分支与合并测试

然后提交：

```bash
$ git add readme.txt 
$ git commit -m "分支测试"
[dev b17d20e] branch test
 1 file changed, 1 insertion(+)
```

现在，dev分支的工作完成，我们就可以切换回master分支：

```bash
$ git checkout master
Switched to branch 'master'
```

切换回master分支后，再查看一个readme.txt文件，刚才添加的内容不见了！因为那个提交是在dev分支上，而master分支此刻的提交点并没有变：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.6365464895406732.png)

  

现在，我们把dev分支的工作成果合并到master分支上：

```bash
$ git merge dev
Updating 3c10f34..e7c94eb
Fast-forward
 readme.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

git merge命令用于合并指定分支到当前分支。合并后，再查看readme.txt的内容，就可以看到，和dev分支的最新提交是完全一样的。

注意到上面的Fast-forward信息，Git告诉我们，这次合并是“快进模式”，也就是直接把master指向dev的当前提交，所以合并速度非常快。

当然，也不是每次合并都能Fast-forward，我们后面会讲其他方式的合并。

合并完成后，就可以放心地删除dev分支了：

```bash
$ git branch -d dev
Deleted branch dev (was b17d20e).
```

删除后，查看branch，就只剩下master分支了：

```bash
$ git branch
* master
```

因为创建、合并和删除分支非常快，所以Git鼓励你使用分支完成某个任务，合并后再删掉分支，这和直接在master分支上工作效果是一样的，但过程更安全。

### 小结

Git鼓励大量使用分支：

```bash
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
```

---

## 二，解决冲突

人生不如意之事十之八九，合并分支往往也不是一帆风顺的。

准备新的feature1分支，继续我们的新分支开发：

```bash
$ git checkout -b feature1
Switched to a new branch 'feature1'
```

修改readme.txt最后一行，改为：

```bash
创建分支与合并测试非常好用
```

在feature1分支上提交：

```bash
$ git add readme.txt
$ git commit -m "AND simple"
[feature1 14096d0] AND simple
 1 file changed, 1 insertion(+), 1 deletion(-)
```

切换到master分支：

```bash
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
```

Git还会自动提示我们当前master分支比远程的master分支要超前1个提交。

在master分支上把readme.txt文件的最后一行改为：

```bash
创建分支与合并测试真的非常好用
```

提交：

```bash
$ git add readme.txt 
$ git commit -m "& simple"
[master 5dc6824] & simple
 1 file changed, 1 insertion(+), 1 deletion(-)
```

现在，master分支和feature1分支各自都分别有新的提交，变成了这样：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.9065400963122769.png)

  

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突，我们试试看：

```bash
$ git merge feature1
Auto-merging readme.txt
CONFLICT (content): Merge conflict in readme.txt
Automatic merge failed; fix conflicts and then commit the result.
```

果然冲突了！Git告诉我们，readme.txt文件存在冲突，必须手动解决冲突后再提交。git status也可以告诉我们冲突的文件：

```bash
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

    both modified: readme.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

我们可以直接查看readme.txt的内容：

```bash
$ cat readme.txt
锄禾日当午;
汗滴禾下土;
谁知盘中餐;
粒粒皆辛苦;
GIT修改测试
<<<<<<< HEAD
创建分支与合并测试真的非常好用
=======
创建分支与合并测试非常好用
>>>>>>> feature1
```

Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改如下后保存：

```bash
创建分支与合并测试真的非常好用
```

再提交：

```bash
$ git add readme.txt 
$ git commit -m  “修复合并冲突"
[master 1acc920] ”修“修复合并冲突
```

现在，master分支和feature1分支变成了下图所示：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8859179403776045.png)

  



```bash
$ git log --graph --pretty=oneline --abbrev-commit
*   1acc920 (HEAD -> master) ”修“修复合并冲突
|\
| * 5d6615b (feature1) 添加非常好用
* | 1735bf6 修改真的非常好用
|/
* e7c94eb 分支测试
* 3c10f34 remove test.txt
* 910e156 add test.txt
* 1db9628 添加 GIT修改测试
* f8eb8ab 添加 粒粒皆辛苦和LICENCE.txt
* cb5f637 添加 谁知盘中餐;
* c80cf99 添加 汗滴禾下土;
* c133d59 创建一个新文件
```

最后，删除feature1分支：

```bash
$ git branch -d feature1
Deleted branch feature1 (was 14096d0).
```

工作完成。

### 小结

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用git log --graph命令可以看到分支合并图。

# 10【熟悉】分支管理-分支策略说明

## 一，分支策略

通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

下面我们实战一下--no-ff方式的git merge：

首先，仍然创建并切换dev分支：

```bash
$ git checkout -b dev
Switched to a new branch 'dev'
```

修改readme.txt文件，并提交一个新的commit：

```bash
$ git commit -m "添加dev上的修改内容"
[dev 8bee24d] 添加dev上的修改内容
 1 file changed, 2 insertions(+)
```

现在，我们切换回master：

```bash
$ git checkout master
Switched to branch 'master'
```

准备合并dev分支，请注意--no-ff参数，表示禁用Fast forward：

```bash
$ git merge --no-ff -m "merge with no-ff" dev
Merge made by the 'recursive' strategy.
 readme.txt | 1 +
 1 file changed, 1 insertion(+)
```

因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去。

合并后，我们用git log看看分支历史：

```bash
$ git log --graph --pretty=oneline --abbrev-commit
* e1e9c68 (HEAD -> master) merge with no-ff
|\  
| * f52c633 (dev) add merge
|/  
* cf810e4 conflict fixed
...
```

可以看到，不使用Fast forward模式，merge后就像这样：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.8550256303679495.png)

  

分支策略

在实际开发中，我们应该按照几个基本原则进行分支管理：

首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；

那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；

你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

所以，团队合作的分支看起来就像这样：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0.07400541109495484.png)

  

---

## 小结

Git分支十分强大，在团队开发中应该充分应用。

合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

# 11【了解】分支管理-Bug分支和Feature分支

## 一，Bug分支

软件开发中，bug就像家常便饭一样。有了bug就需要修复，在Git中，由于分支是如此的强大，所以，每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。

当你接到一个修复一个代号101的bug的任务时，很自然地，你想创建一个分支issue-101来修复它，但是，等等，当前正在dev上进行的工作还没有提交：

```bash
$ git status
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file: hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified: readme.txt
```

并不是你不想提交，而是工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？

幸好，Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

```bash
$ git stash
Saved working directory and index state WIP on dev: f52c633 add merge
```

现在，用git status查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。

首先确定要在哪个分支上修复bug，假定需要在master分支上修复，就从master创建临时分支：

```bash
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git checkout -b issue-101
Switched to a new branch 'issue-101'
现在修复bug，需要把“Git is free software ...”改为“Git is a free software ...”，然后提交：
$ git add readme.txt 
$ git commit -m "fix bug 101"
[issue-101 4c805e2] fix bug 101
 1 file changed, 1 insertion(+), 1 deletion(-)
```

修复完成后，切换到master分支，并完成合并，最后删除issue-101分支：

```bash
$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 6 commits.
  (use "git push" to publish your local commits)

$ git merge --no-ff -m "merged bug fix 101" issue-101
Merge made by the 'recursive' strategy.
 readme.txt | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

太棒了，原计划两个小时的bug修复只花了5分钟！现在，是时候接着回到dev分支干活了！

```bash
$ git checkout dev
Switched to branch 'dev'

$ git status
On branch dev
nothing to commit, working tree clean
```

工作区是干净的，刚才的工作现场存到哪去了？用git stash list命令看看：

```bash
$ git stash list
stash@{0}: WIP on dev: f52c633 add merge
```

工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；

另一种方式是用git stash pop，恢复的同时把stash内容也删了：

```bash
$ git stash pop
On branch dev
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file: hello.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified: readme.txt

Dropped refs/stash@{0} (5d677e2ee266f39ea296182fb2354265b91b3b2a)
```

再用git stash list查看，就看不到任何stash内容了：

```bash
$ git stash list
```

你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：

```bash
$ git stash apply stash@{0}
```

#### 小结

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；

当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。

---

## 二，Feature分支

软件开发中，总有无穷无尽的新的功能要不断添加进来。

添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

现在，你终于接到了一个新任务：开发代号为Vulcan的新功能，该功能计划用于下一代星际飞船。

于是准备开发：

```bash
$ git checkout -b feature-vulcan
Switched to a new branch 'feature-vulcan'
```

5分钟后，开发完毕：

```bash
$ git add vulcan.py
$ git status
On branch feature-vulcan
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file: vulcan.py

$ git commit -m "add feature vulcan"
[feature-vulcan 287773e] add feature vulcan
 1 file changed, 2 insertions(+)
 create mode 100644 vulcan.py
```

切回dev，准备合并：

```bash
$ git checkout dev
```

一切顺利的话，feature分支和bug分支是类似的，合并，然后删除。

但是！

就在此时，接到上级命令，因经费不足，新功能必须取消！

虽然白干了，但是这个包含机密资料的分支还是必须就地销毁：

```bash
$ git branch -d feature-vulcan
error: The branch 'feature-vulcan' is not fully merged.
If you are sure you want to delete it, run 'git branch -D feature-vulcan'.
```

销毁失败。Git友情提醒，feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用大写的-D参数。。

现在我们强行删除：

```bash
$ git branch -D feature-vulcan
Deleted branch feature-vulcan (was 287773e).
```

终于删除成功！

#### 小结

开发一个新feature，最好新建一个分支；

如果要丢弃一个没有被合并过的分支，可以通过git branch -D 强行删除。

# 12【掌握】使用GitHub远程仓库

## 一，远程库存配置

到目前为止，我们已经掌握了如何在Git仓库里对一个文件进行时光穿梭，你再也不用担心文件备份或者丢失的问题了。

Git是分布式版本控制系统，同一个Git仓库，可以分布到不同的机器上。怎么分布呢？最早，肯定只有一台机器有一个原始版本库，此后，别的机器可以“克隆”这个原始版本库，而且每台机器的版本库其实都是一样的，并没有主次之分。

你肯定会想，至少需要两台机器才能玩远程库不是？但是我只有一台电脑，怎么玩？

其实一台电脑上也是可以克隆多个版本库的，只要不在同一个目录下。不过，现实生活中是不会有人这么傻的在一台电脑上搞几个远程库玩，因为一台电脑上搞几个远程库完全没有意义，而且硬盘挂了会导致所有库都挂掉，所以我也不告诉你在一台电脑上怎么克隆多个仓库。

实际情况往往是这样，找一台电脑充当服务器的角色，每天24小时开机，其他每个人都从这个“服务器”仓库克隆一份到自己的电脑上，并且各自把各自的提交推送到服务器仓库里，也从服务器仓库中拉取别人的提交。

完全可以自己搭建一台运行Git的服务器，不过现阶段，为了学Git先搭个服务器绝对是小题大作。好在这个世界上有个叫GitHub的神奇的网站，从名字就可以看出，这个网站就是提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。

在继续阅读后续内容前，请自行注册GitHub账号。由于你的本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以，需要一点设置：

第1步：创建SSH Key。

        在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id\_rsa和id\_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：

```bash
#$ ssh-keygen -t rsa -C "youremail@example.com"
$ ssh-keygen -t rsa -C "78414842@qq.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Administrator.BF-20160110UHLI/.ssh                        /id_rsa):
Created directory '/c/Users/Administrator.BF-20160110UHLI/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Administrator.BF-20160110UHLI/.ssh/id_rsa.
Your public key has been saved in /c/Users/Administrator.BF-20160110UHLI/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:tPmsYxqoNKtpylNEUCgIEyyeMjdXKwTimpCtkw0qXAM 78414842@qq.com
The key's randomart image is:
+---[RSA 2048]----+
|OE=o             |
|=B... .          |
|B.++ . ..        |
|BO+.+ .. o       |
|X+oo .  S        |
|.. . .   o       |
|  + . .   o      |
|.= +   .o.       |
|*o+   .o..       |
+----[SHA256]-----+

```

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。

如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id\_rsa和id\_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id\_rsa是私钥，不能泄露出去，id\_rsa.pub是公钥，可以放心地告诉任何人。

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorab0f1669b-1f88-403f-b43b-7a11d5780895.png)

第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：

然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id\_rsa.pub文件的内容：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraed7ce399-4e82-4538-be51-e082562e58a1.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8491bc06-9e7b-4b3f-b717-31d615695375.png)



点“New SSH Key”，你就应该看到已经添加的Key：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf46f958a-4fe4-4a07-8683-5fc5e8ba13d5.png)

添加成功

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora9f637d14-6ce8-4808-a8cf-dd1356c83eea.png)

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。  

当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。

最后友情提示，在GitHub上免费托管的Git仓库，任何人都可以看到喔（但只有你自己才能改）。所以，不要把敏感信息放进去。

如果你不想让别人看到Git库，有两个办法，一个是交点保护费，让GitHub把公开的仓库变成私有的，这样别人就看不见了（不可读更不可写）。另一个办法是自己动手，搭一个Git服务器，因为是你自己的Git服务器，所以别人也是看不见的。这个方法我们后面会讲到的，相当简单，公司内部开发必备。

确保你拥有一个GitHub账号后，我们就即将开始远程仓库的学习。

小结

“有了远程仓库，妈妈再也不用担心我的硬盘了。”——Git点读机

---

## 二，添加远程仓库

现在的情景是，你已经在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，真是一举多得。

首先，登陆GitHub，然后，在右上角找到“Create a new repo”按钮，创建一个新的仓库：



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora801f177b-afde-4fa6-a60c-747a636291f6.png)

  

在Repository name填入repository，其他保持默认设置，点击“Create repository”按钮，就成功地创建了一个新的Git仓库：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora24babdd2-0ebc-4626-99ba-51317a3f6f79.png)

目前，在GitHub上的这个repository仓库还是空的，GitHub告诉我们，可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。

现在，我们根据GitHub的提示，在本地的repository仓库下运行命令：

```bash
 git remote add origin git@github.com:leijhArvin/repository.git
```

请千万注意，把上面的leijhArvin替换成你自己的GitHub账户名，否则，你在本地关联的就是我的远程库，关联没有问题，但是你以后推送是推不上去的，因为你的SSH Key公钥不在我的账户列表中。

添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。

**下一步，就可以把本地库的所有内容推送到远程库上：**

```bash
$ git push -u origin master
The authenticity of host 'github.com (192.30.253.113)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
Counting objects: 35, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (28/28), done.
Writing objects: 100% (35/35), 3.12 KiB | 638.00 KiB/s, done.
Total 35 (delta 9), reused 0 (delta 0)
remote: Resolving deltas: 100% (9/9), done.
remote:
remote: Create a pull request for 'master' on GitHub by visiting:
remote:      https://github.com/leijhArvin/repository/pull/new/master
remote:
To github.com:leijhArvin/repository.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

把本地库的内容推送到远程，用git push命令，实际上是把当前分支master推送到远程。

由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

推送成功后，可以立刻在GitHub页面中看到远程库的内容已经和本地一模一样：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraec25db88-2d2b-4da3-8351-246e7c0969a1.png)



从现在起，只要本地作了提交，就可以通过命令：

\$ git push origin master

把本地master分支的最新修改推送至GitHub，现在，你就拥有了真正的分布式版本库！

SSH警告

当你第一次使用Git的clone或者push命令连接GitHub时，会得到一个警告：

```bash
$ git push -u origin master
The authenticity of host 'github.com (192.30.253.113)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
```

这是因为Git使用SSH连接，而SSH连接在第一次验证GitHub服务器的Key时，需要你确认GitHub的Key的指纹信息是否真的来自GitHub的服务器，输入yes回车即可。

Git会输出一个警告，告诉你已经把GitHub的Key添加到本机的一个信任列表里了：

Warning: Permanently added 'github.com' (RSA) to the list of known hosts.

这个警告只会出现一次，后面的操作就不会有任何警告了。

如果你实在担心有人冒充GitHub服务器，输入yes前可以对照GitHub的RSA Key的指纹信息是否与SSH连接给出的一致。

小结

要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；

关联后，使用命令git push -u origin master第一次推送master分支的所有内容；

此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！

---

## 三，从远程仓库克隆

上次我们讲了先有本地库，后有远程库的时候，如何关联远程库。

现在，假设我们从零开发，那么最好的方式是先创建远程库，然后，从远程库克隆。

首先，登陆GitHub，创建一个新的仓库，名字叫myerp：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5df909a2-ba49-48a0-bf7e-76b9453f60dc.png)

我们勾选Initialize this repository with a README，这样GitHub会自动为我们创建一个README.md文件。创建完毕后，可以看到README.md文件：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoracbaf2841-7925-4e0e-bd93-f358090d59a5.png)



现在，远程库已经准备好了，下一步是用命令git clone克隆一个本地库：

```bash
$ git clone git@github.com:leijhArvin/myerp.git
Cloning into 'myerp'...
Warning: Permanently added the RSA host key for IP address '192.30.253.112' to the list of known hosts.
remote: Counting objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.
```

注意把Git库的地址换成你自己的，然后进入myerp目录看看，已经有README.md文件了：

```bash
$ cd myerp
$ ls
README.md
```

 如果有多个人协作开发，那么每个人各自从远程克隆一份就可以了。

你也许还注意到，GitHub给出的地址不止一个，还可以用https://github.com/michaelliao/myerp.git这样的地址。实际上，Git支持多种协议，默认的git://使用ssh，但也可以使用https等其他协议。

使用https除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放http端口的公司内部就无法使用ssh协议而只能用https。

小结

要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。

Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

# 13【掌握】分支管理-多人协作

## 一，多人协作

当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。

要查看远程库的信息，用git remote：

```bash
$ git remote
origin
```

或者，用git remote -v显示更详细的信息：

```bash
$ git remote -v
origin  git@github.com:leijhArvin/myerp.git (fetch)
origin  git@github.com:leijhArvin/myerp.git (push)
```

上面显示了可以抓取和推送的origin的地址。如果没有推送权限，就看不到push的地址。

推送分支

推送分支，就是把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上：

```bash
$ git push origin master
```

如果要推送其他分支，比如dev，就改成：

```bash
$ git push origin dev
```

但是，并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

master分支是主分支，因此要时刻与远程同步；

dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

总之，就是在Git中，分支完全可以在本地自己藏着玩，是否推送，视你的心情而定！

抓取分支

多人协作时，大家都会往master和dev分支上推送各自的修改。

现在，模拟一个你的小伙伴，可以在另一台电脑（注意要把SSH Key添加到GitHub）或者同一台电脑的另一个目录下克隆

```bash
$ git clone git@github.com:leijhArvin/myerp.git
Cloning into 'myerp'...
remote: Counting objects: 40, done.
remote: Compressing objects: 100% (21/21), done.
remote: Total 40 (delta 14), reused 40 (delta 14), pack-reused 0
Receiving objects: 100% (40/40), done.
Resolving deltas: 100% (14/14), done.
```

当你的小伙伴从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支。不信可以用git branch命令看看：

```bash
$ git branch
* master
```

现在，你的小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：

```bash
$ git checkout -b dev origin/dev
```

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora435745bd-5306-4503-a3bc-d13acd37e7c1.png)

现在，他就可以在dev上继续修改，然后，时不时地把dev分支push到远程：  

```bash
$ git commit -m "add HelloWorld"
[dev d48215c] add HelloWorld
 1 file changed, 6 insertions(+)
 create mode 100644 HelloWorld.java

$ git push origin dev
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 371 bytes | 371.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:leijhArvin/myerp.git
   edf9131..d48215c  dev -> dev
```

 你的小伙伴已经向origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：

```bash
$ cat HelloWorld.java
public class HelloWorld{
    public static void main(String [] args){
        System.out.print("helloWorld");
    }   
}

$ git add HelloWorld.java

$ git commit -m "add new env"
[dev 7bd91f1] add new env
 1 file changed, 1 insertion(+)
 create mode 100644 env.txt

$ git push origin dev
To github.com:leijharvin/myerp.git
 ! [rejected] dev -> dev (non-fast-forward)
error: failed to push some refs to 'git@github.com:michaelliao/learngit.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送：

```bash
$ git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> dev
```

git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接：

```bash
$ git branch --set-upstream-to=origin/dev dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
再pull：
$ git pull
Auto-merging env.txt
CONFLICT (add/add): Merge conflict in env.txt
Automatic merge failed; fix conflicts and then commit the result.
```

这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：

```bash
$ git commit -m "合并分支"
[dev 57c53ab] fix env conflict

$ git push origin dev
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (6/6), 621 bytes | 621.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0)
To github.com:michaelliao/learngit.git
   7a5e5dd..57c53ab dev -> dev
```

 因此，多人协作的工作模式通常是这样：

首先，可以试图用git push origin 推送自己的修改；

如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；

如果合并有冲突，则解决冲突，并在本地提交；

没有冲突或者解决掉冲突后，再用git push origin 推送就能成功！

如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to  origin/。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

小结

查看远程库信息，使用git remote -v；

本地新建的分支如果不推送到远程，对其他人就是不可见的；

从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；

在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；

从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

# 14【掌握】使用码云

## 1，概述        

    使用GitHub时，国内的用户经常遇到的问题是访问速度太慢，有时候还会出现无法连接的情况（原因你懂的）。 如果我们希望体验Git飞一般的速度，可以使用国内的Git托管服务——码云（[https://gitee.com](https://gitee.com/)）。

        和GitHub相比，码云也提供免费的Git仓库。此外，还集成了代码质量检测、项目演示等功能。对于团队协作开发，码云还提供了项目管理、代码托管、文档管理的服务，5人以下小团队免费。

 **码云的免费版本也提供私有库功能，只是有5人的成员上限。**

---

## 2，设置公匙

使用码云和使用GitHub类似，我们在码云上注册账号并登录后，需要先上传自己的SSH公钥。选择右上角用户头像 -> 菜单“修改资料”，然后选择“SSH公钥”，填写一个便于识别的标题，然后把用户主目录下的.ssh/id\_rsa.pub文件的内容粘贴进去：  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora33ce84c0-f001-4054-ae9d-4ba03a29889f.png)

点击“确定”即可完成并看到刚才添加的Key：

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf304a5da-3c11-4c2a-8483-5b85f1b0e9a3.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora43a61277-20b3-4e09-8aab-b8afbd024a4e.png)

---

## 3，创建项目

在码云上创建一个新的项目，选择右上角用户头像 -> 菜单“控制面板”，然后点击“创建项目”：  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora49989daa-c497-49f9-9409-bacc871ab01c.png)

项目名称最好与本地库保持一致：

然后，我们在本地库上使用命令git remote add把它和码云的远程库关联：

```bash
git remote add origin https://gitee.com/leijharvin/repository.git
```

---

## 4，拉取远程代码库 

由于在创建远程仓库时会初始化一个README.md文件，而本地仓库里没有，所以需要先执行pull操作将远程仓库拉取合并到本地仓库，否则会出错。执行代码：

```bash
git pull origin master
```

此时可以看到在本地代码仓库中多了一个README.md文件。 



![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoradfba0815-0296-4e16-9977-36c809556ef3.png)

  

---

## 5，创建本地文件并提交

5.1创建两个文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8017c5ca-669a-4e91-bb3c-d5e2f1e880ba.png)

5.2添加并提交 到本地仓库

```bash
Arvin@Arvin-pc MINGW64 /d/git/repository (master)
$ git add .

Arvin@Arvin-pc MINGW64 /d/git/repository (master)
$ git commit -m '添加两个文件'
[master 4b9ab65] 添加两个文件
 2 files changed, 12 insertions(+)
 create mode 100644 HelloWorld..java
 create mode 100644 HelloWorld2.java

```

5.3  推送到gitee

```bash
$ git push --set-upstream origin master
```

提交完成之后看到

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraf46518ce-e5d8-4f35-809a-b64eba781f47.png)

## 6，删除文件

```bash
#1，使用git命令删除本地的文件
$ git rm HelloWorld2.java
rm 'HelloWorld2.java'
#2，再提交到本地的版本库
Arvin@Arvin-pc MINGW64 /d/git/repository (master)
$ git commit -m "删除了一个文件"
[master d43e6c2] 删除了一个文件
 1 file changed, 6 deletions(-)
 delete mode 100644 HelloWorld2.java

 #3，再推送到gitee
 $ git push --set-upstream origin master
Counting objects: 2, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 245 bytes | 245.00 KiB/s, done.
Total 2 (delta 1), reused 0 (delta 0)
remote: Powered by Gitee.com
To https://gitee.com/leijharvin/repository.git
   4b9ab65..d43e6c2  master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.


```

再看gitee上面就只有一个文件了

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora8d8054b4-2fcd-4c59-94a7-9ff83d344cc3.png)

# 16【掌握】eclipse里面使用gitee

## 一，把项目分享到gitee

**1、准备工作**

> 1、一个注册好的码云帐号 https://gitee.com/

> 2、安装好的Eclipse （本示例用的版本 sts ，已经集成Git）



**2、Eclipse 配置Git 相关帐号资料**

> 1、路径： Window --- Preferences --- Team--- Git --- Configuration --- User Settings --- Add Entry --- 如下图：

> a. user.email ： “ 您的码云帐号”

> b. user.name： "提交时显示的名字，自定义。"

> c. 等价于git命令： git config --global user.name/user.email "xxxx"

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5988cbcf-e0e0-4dea-b00d-224e8613ae81.png)



**3、Eclipse** **配置** **publickKey**

> 1、生成 key 路径： Window --- Preferences --- General --- Network Connections --- SSH2 --- Key Management --- Generate RSA Key ---

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad709b7b5-1cf3-47c8-9ce5-770462498642.png)

        2、获取 key 路径： Window --- Preferences --- General --- Network Connections --- SSH2 --- General  

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac49f2c94-6e36-43ae-868c-4e0981e1b253.png)

**4、在码云\*\*\*\*中配置 用户 ssh key**

1、步骤： 登录码云 --- 进入 个人设置中心 --- SSH公钥 （即： 用户 ssh key）

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorad0526293-8cb0-4b04-8eb9-83e3649126e8.png)

    2、补充：为什么要配置用户 ssh key 而非 项目 ssh key？

项目的 sshkey 只针对项目，且我们仅对项目提供了部署公钥，即项目下的公钥仅能拉取项目，这通常用于生产服务器拉取仓库的代码。

用户的 key 则是针对用户的，用户添加了 key 就对用户名下的项目和用户参加了的项目具有权限，一般而言，用户的key具有推送和拉取的权限，而项目的 key 则只具有拉取权限。



3、补充：验证添加的 key 是否生效。

在 Git Bash 中输入命令： ssh -T git@gitee.com

返回： Welcome to Gitee.com, xxx ! ---- 则表示添加key成功！如下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5c8efc4e-e928-4f1a-b3d6-c985f93aabc6.jpg)

**5、Eclipse项目分享到码云**

1、码云上创建一个项目，名字：helloworld 注意不要创建README.md这个文件

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraae4abf7f-a354-4bb8-91a3-6aaef724b53a.png)



2、Eclipse上创建一个项目，名字：helloworld

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora4ad468bc-c55e-4815-81af-5d74ff2027c2.png)



3、Eclipse项目分享到码云： 选中项目gitee --- 右键 --- Team --- Share Project --- Git --- 如下

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora0ba27e0f-e5fd-46cd-b4d0-759d7bbb92dd.png)

4、提交项目： 选中项目helloworld--- 右键 --- Team --- Commit ---

选择中要提交的文件添加到暂存区

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa54234af-2b4a-4548-ad27-6e438596865a.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora761934b4-b10e-4b89-965b-510762912b63.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora85f7d3fd-1544-41d9-84b5-9def34fcddce.png)

以上的两个按钮，第一个是提交到本地仓库并push到gitee

第二个按钮是提交到本地仓库

push到gitee

右键项目--team-->push Branch master

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora175fc1b0-565c-434d-9829-a35640dcc39d.png)

输入密码找回的问题

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora5ba85850-8856-4f1b-a2c2-c788ce9a0ff4.png)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorac4c10bdb-516d-439b-92b7-36d8db680156.png)

之后再看gitee里的代码就成功了

## 二，从gitee把项目拉取下来

1，找到项目地址

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora77814d60-50f4-4d81-b82c-2b992c82ce66.png)

2，项目区域右键import  选择git

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorabbcf1bb7-3130-4456-a6fc-c4c52718e37f.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora7fb80ae9-861a-4903-a393-8225a8d3680a.jpg)

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typoraa3ec4ea1-a597-4880-a486-e9dfbd5108bf.png)

选择保存路径完事

![image](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typora875165ca-f395-42d9-b0a9-4900ab6cb6f4.png)

------

# Git过滤文件

在使用git提交文件的时候，可能会提交一些编程软件产生的索引文件或者target内容等等，然而这些文件上传是没有用处的，可以使用以下方案过滤部分文件。



在git仓库提交的项目目录中创建以下两个文件。

## .gitattributes

```Plain Text
# Windows-specific files that require CRLF:
*.bat       eol=crlf
*.txt       eol=crlf

# Unix-specific files that require LF:
*.java      eol=lf
*.sh        eol=lf
```

## .gitignore

```Plain Text
target/
!.mvn/wrapper/maven-wrapper.jar

## STS ##
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans

## IntelliJ IDEA ##
.idea
*.iws
*.iml
*.ipr

## JRebel ##
rebel.xml

## MAC ##
.DS_Store

## Other ##
logs/
temp/
```