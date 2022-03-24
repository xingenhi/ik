# **Oracle**

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps1093.tmp.jpg) 

 

来源： https://www.cnblogs.com/xuanhai/p/5810918.html

1、导入和导出

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps1094.tmp.jpg) 

 

完全导出

exp 用户名/口令@orcl file=导出的文件路径及名称 log=日志文件路径及名称 full= y

用户导出

exp 用户名/口令@orcl file=导出的文件路径及名称 log=日志文件路径及名称 owner=(dw,dw1)

表导出

exp 用户名/口令@orcl file=导出的文件路径及名称 log=日志文件路径及名称 tables=(dw.doctor,dw.dept)

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps1095.tmp.jpg) 

 

创建表空间：

create tablespace 表空间名字

datafile '数据文件所在的相对/绝对路径.dat' size 100m;

创建临时表空间

create temporary tablespace 临时表空间的名字 tempfile '路径' size 100m;

创建新用户

create user 用户名

identified by 口令

default tablespace 表空间名称

temporary tablespace 临时表空间名称

赋权限

grant dba to 用户名;

完全导入

imp 用户名/口令@orcl file=导入文件路径 log=日志文件路径 full=y ignore=y

ignore=y指的是：遇到错误是否忽略

用户导入

imp 用户名/口令@orcl file=导入文件路径 log=日志文件路径 fromuser=dw touser=dw ignore=y

fromuser指的是：dmp文件中的需要导入的用户名

touser指的是：被导入的用户名

表导入

imp 用户名/口令@orcl file=导入文件路径 log=日志文件路径 fromuser=dw tables=(doctor,dept) ignore=y

2、数据泵与传统的导入导出的区别：

1）EXP和IMP是客户端工具程序,它们既可以在可以客户端使用,也可以在服务端使用。

2）EXPDP和IMPDP是服务端的工具程序,他们只能在ORACLE服务端使用,不能在客户端使用。

3）IMP只适用于EXP导出文件,不适用于EXPDP导出文件;IMPDP只适用于EXPDP导出文件,而不适用于EXP导出文件。

3、数据泵导入导出

先创建directory对象

CREATE DIRECTORY 对象名 AS ‘映射地址路径’;

赋权限

CREATE DIRECTORY 对象名 AS ‘映射地址路径’;

导出：

expdp dw/dw directory=对象名 dumpfile=dept.dmp tables=dept

导入：

impdp dw/dw directory=对象名 dumpfile=full.dmp tables=dept.emp

4、数据库概念：数据库是按照数据结构来组织、存储和管理数据的仓库。

5、传统的数据模型：

层次模型——1：n

网状模型——m：n

关系模型——二维表格

6、DBMS（数据库管理系统）

概念：是负责数据定义、描述、建立、操纵、维护、管理、控制等功能的计算机系统软件。其中数据定义建立、维护、控制等功能主要由DBA实施。

组成：

DDL（数据描述语言）

create

alter

drop

DML（数据操纵语言）

select

update

DCL（数据控制语言）

grant

deny

revoke

7、数据库的层次结构

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps1096.tmp.jpg) 

 

8、关系数据库

基本概念

关系：通常将一个没有重复行、重复列的二维表看成一个关系。

●元组：二维表的每一行在关系中称为元组，又称记录。

●属性：二维表的每一列在关系中称为属性。属性值则是各个元组在该属性上的取值。

●关系模式：二维表的表头那一行称为关系模式。关系模式可表示为：关系模式名(属性名1,属性名2,…,属性名n)

●域：属性的取值范围称为域。

性质

不允许出现完全相同的元组；

不允许出现同名的属性；

元组顺序、属性顺序可以任意交换；

关系可以为空，即元组个数可以为0

主要优点

数据结构单一

关系规范化

概念简单，操作方便

9、空值NULL

空值（null）：null的含义是“不知道”或者“不存在”的值。它不同于空字符串、整数0和false。数据库中任何数据类型均可以取null值。

   null参与的所有运算，包括算术运算、比较运算和逻辑运算，结果都为null（null or true和null and false除外）。

   在SQL中null只能用is null和is not null判断。

10、主键：唯一标识表中的某一条记录，并且一个表最多只能有一个主键。

11、外键：

表示的是两个关系之间的相关联系。

外键的取值允许重复。

如果关系R的某个属性组t2参照了关系S的某个属性组t1，则t2的取值要么为null，要么必须为t1中的值。

参照关系和被参照关系可以同一个关系。

12、超码：是一个或多个属性的集合，可以在一个实体集中唯一标识一个实体。

13、候选码：是最小的超码，他们的任意真子集都不能成为超码。

14、主码：是从多个候选码中任意选出一个作为主码。一般来说主码都应该选择那些从不或者极少变化的属性。

15、数据库的体系结构是指数据库的组成、工作过程与原理，以及数据在数据库中的组织与管理机制。

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps1097.tmp.jpg) 

 

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10A8.tmp.jpg) 

 

物理组件：

数据文件：用于存储数据库数据；

控制文件：记录数据库的物理结构的二进制文件；

日志文件：记录对数据库的所有修改信息，用于故障恢复。

逻辑组件：

数据库-->表空间-->段-->区-->数据块（最小逻辑单位）

模式指的是：数据表、视图、索引、序列等数据库对象的统称。

在表空间下通过模式来管理数据，一个模式中的数据有可能分布在多个段中，也可能存在在一个段中，当然一个段中可以存放多个模式的数据。

Oracle自带的表空间：system表空间、user表空间、undo表空间、temp表空间

16、简单命令

 

登入用户名/口令@数据库名

system/oracle@px

spool d:/out.txt

查询语句

spool off

desc 表名

查看表结构

set linesize 100

设置一行显示的字符数

查询表空间数据文件的路径：

SELECT

  tablespace_name,

  file_name,

  bytes / 1024 / 1024 MB

FROM

  dba_data_files;

17、OracleService+服务名：数据库启动的基础；OracleOrDb11g_homeTNSListener:服务器为客户端提供的监听服务。

18、用户是数据库中定义的一个名称，用于连接数据库和访问数据库对象。

19、权限指的是执行特定命令或访问数据库对象的权力。

系统权限：允许用户执行某些数据库操作

对象权限：允许用户对数据库对象执行特定操作

20、角色是一组相关权限的组合，可以将权限授予角色，再把角色授予用户，以简单化权限管理。

更改用户口令

alter user 用户名 identified by 口令;

锁定/解锁用户

alter user 用户名 account unlock;

删除用户

drop user 用户名 cascade;

（cascade是级联删除该用户有关的）

授权

grant 权限|角色 to 用户（角色）

回收权限

revoke 角色|权限 from 用户（角色）

21、字符集

是一个字节数据的解释的符号集合，有大小之分，有互相的包容关系。

NLS_LANG = 语言+地域+字符集

主要分为：oracle service端、Oracle client端字符集、dmp文件的字符集。

查看oracel server端的字符集

select userenv('language') from dual;

或者

select value$

from sys.props$

where name in ('NLS_LANGUAGE', 'NLS_TERRITORY', NLS_CHARACTERSET');

———————————————————————————————————————————————————————————————————

查看oracle client端的字符集

在windows平台下，就是注册表里面相应OracleHome的NLS_LANG。位置在：HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraDb11g_home1下。

22、DQL

SELECT子句：指定要显示的属性列；

FROM子句：指定查询对象(基本表或视图)；

WHERE子句：指定查询条件；

GROUP BY子句：对查询结果按指定列的值分组，该属性列值相等的元组为一个组。通常会在每组中作用聚集函数；

HAVING短语：筛选出只有满足指定条件的组；

ORDER BY子句：对查询结果按指定列值的升序（asc）或降序（desc）排序。

------

distinct：去除查询结果中的重复项

23、SQL操作符

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10A9.tmp.jpg) 

 

添加：

关于null值参与运算的影响：

***\*算数运算：\****如果算术表达式的任一输入为空，则该运算表达式结果为空；

***\*比较运算：\****sql将涉及空值任何比较运算的结果视为unknown（unknown是再sql中除true和false之外的第三个逻辑值）；

***\*集合运算：\****在集合运算中，{('A',null),('A',null)}中的两个元素会被认为是相同的元素。因此在使用distinct子句只会保留这样的相同的元组的一份拷贝。

24、参与集合运算的两个关系R和S必须是相容的：

关系R和S的属性数目必须相同；

R的第i个属性的数据类型必须和S的第i个属性的数据类型相同。

union all 查询结果保留重复单元

union 去除结果重复单元

25、伪列

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AA.tmp.jpg) 

 

26、伪表

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AB.tmp.jpg) 

 

27、常用函数

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AC.tmp.jpg) 

 

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AD.tmp.jpg) 

 

 

28、聚集函数

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AE.tmp.jpg) 

 

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10AF.tmp.jpg) 

 

单价为null的在前者求平均值中没有参与计算；空值转换后，单价为空的数据参与了计算。

29、聚集函数的特性

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10B0.tmp.jpg) 

 

30、分组聚集

使用了group by子句的sql语句，select子句中只能出现聚集函数和group by子句中出现的属性名。

聚集分组与不使用聚集分组的聚集函数不同之处在于：如果聚集分组的输入值为空值（空值可能是where中的条件或者having中的条件造成的），此时聚集函数返回空值；不适用聚集分组一定返回一行数据，但是这一行数据有可能是0或者null。

31、嵌套子查询

in

使用in作为连接词的嵌套查询成为不相关子查询；

子查询的执行不需要提前取得父查询的值，只是作为父查询的查询条件；

连接词in测试元组是否是集合中的成员，集合是由select子句产生的一组值构成。连接词not in则是测试元组是否不是集合中的成员；

父查询（外层查询）、子查询（内层查询）

运行原理： Oracle在执行IN子查询时，首先执行子查询，并将获得的结果列表存放在一个加了索引的临时表中。在执行子查询之前，系统先将主查询挂起，待子查询执行完毕，存放在临时表中以后再执行主查询。

exists

使用exists作为连接词的嵌套查询称为相关子查询；

执行查询的时候先取得外层查询的一个属性值，然后执行与此属性相关的子查询，执行完毕后再取得外层父查询的下一个值，依次再来重复执行子查询；

测试一个子查询的结果中是否有元组；

exists结构在作为参数的子查询返回值不是空集合时，返回true，是空集合时，返回false；

运行原理： Oracle会首先检查主查询，然后运行子查询直到它找到第一个匹配项。将外层查询出来的每一行数据根据共有字段，代入内查询作为检验，如果内查询返回的结果取非空值，则EXISTS子句返回TRUE，这一行行可作为外查询的结果行，否则不能作为结果。

子查询并不返回任何数据，只是根据子查询的条件判断查询的结果是否为空集合，为空则不显示该记录；反之则显示。

in和exists比较

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10C0.tmp.jpg) 

 

EXISTS与IN的使用效率的问题，通常情况下采用exists要比in效率高，因为IN不走索引，但要看实际情况具体使用：IN适合于外表大而内表小的情况；EXISTS适合于外表小而内表大的情况。

EXISTS是对外表做LOOP循环，在循环体中执行内表查询；IN是把外表和内表做hash连接。

EXISTS是对外表做LOOP循环，在循环体中执行内表查询，所以循环的次数越少，速度就越快；

IN是把外表和内表做hash连接，所以内表越小，整个查询的范围就小，效率就高。

exists允许返回值是多个；但是in只允许是一个。

not exists结构模拟集合包含运算

查询使用了全部药品的医疗费用凭单编码

select distinct fyid

from dw.patient_script_detl a

where not exists

  (select ylxmbm

   from dw.medi_item

   where ylxmlb = '1'

   minus

   (select ylxmbm

   from dw.patient_script_detl b

   where a.fyid = b.fyid)); 

------

select distinct fyid

from dw.patient_script_detl a

where not exists

  (select 1 

   from dw.medi_item b

   where ylxmlb = '1'

​    and not exists (select 2

​            from dw.patient_script_detl c

​            where a.fyid = c.fyid

​               and b.ylxmbm = c. ylxmbm));

临时关系

复杂查询很难或者根本不可能用一个sql查询语句的交、并、差集解决，在这种情况下，需要用定义临时关系的方法。

查询报销费用超过10000元的病人的个人编码和姓名（temp就是一个临时关系）

select dw.per_natl.grbm, xm

from dw.per_natl,(select grbm, sum(bxje) sbxje from dw.patient_settle group by grbm) ***\*temp\****

where dw.per_natl.grbm = temp.grbm and sbxje > 10000;

查询药品单价大于所有要药品的平均单价的药品编码、名称、单价

select ylxmbm, ylxmmc, dj

 from dw2019.medi_item

where ylxmlb = '1'

  and dj>(select avg(nvl(dj, 0)) pjdj from dw2019.medi_item where ylxmlb = '1');

32、SQL语句按照其功能分为五类：

数据查询语言（DQL）

select

数据操纵语言（DML）

insert

delete

update

数据定义语言（DDL）

create

alter

drop

rename（重命名）

truncate（截断一个表）

事务控制语言（TCL）

commit（提交）

rollback（回滚）

数据控制语言（DCL）

grant

revoke

33、Oracle数据类型

 

![img](https://picgo-1301208976.cos.ap-beijing.myqcloud.com//typorawps10C1.tmp.jpg) 

 

34、创建表

create table 表名

(

列名 类型,...,

constraint 名字 primary key(主键名),

constraint 名字 foreign key (外键名) references 被参照表名(外键名)

) tablespace 表空间;

 

***\*__________________________________________________________\****

通过子查询创建表：

create table tablename[(columname,...)]

tablespace 表空间名称

as(子查询);

35、修改表

添加一列：

alter table 表 add 列名 类型;

 

删除一列：

alter table 表 drop column 列名;

 

修改列的长度（只能改大，不能改小）：

alter table 表名 modify 列名 类型;

36、删除表

删除表和数据

drop table 表名;

删除表中的数据，保留表

truncate table 表名;

37、数据库对象：是逻辑结构的集合，最基本的数据库对象是表，其他的有同义词、序列、视图、索引。

索引

概念：索引是Oracle的一个对象，一旦建立索引是否使用由Oracle决定，索引中存储了特定列的排序数据，实现对表的快速访问。使用索引可以很快查找到建立索引时列的值所在的行，而不必对表实现全表扫描，所以适当的使用索引可以减少磁盘I/O量。

特点：

对于具有只读特性或较少插入、更新或删除操作的大表通常可以提高查询速度；

可以对表的一列或多列建立索引；

建立索引的数量没有限制；

索引需要磁盘存储，由Oracle数据库服务器自动维护；

索引对用户透明，是否使用索引是Oracle决定的。

 

创建索引

create [unique] [bitmap] [cluster] index 索引名

on 表名(列名 [asc/desc],[...])

tablespace 表空间;

 

unique（distinct）：唯一性索引，不允许表中不同的元组在索引列上取相同值。若已有相同值存在，则系统给出相关信息，不建此索引；

cluster：聚集索引，表中元组按索引项的值排序并物理地聚集在一起。一个基本表上只能建一个聚集索引（该索引可以包含多个列）；

***\*Oracle数据库自动给每个表的主码建立唯一索引。\****

删除索引

drop index 索引名

索引不是越多越好的原因：

第一，创建索引和维护索引要耗费时间，这种时间随着数据量的增加而增加；

第二，索引需要占物理空间，除了数据表占数据空间之外，每一个索引还要占一定的物理空间；

第三，当对表中的数据进行增加、删除和修改的时候，索引也要动态的维护，这样就降低了数据的维护速度。

视图

视图以经过定制的方式显示来自一个或者多个表的数据；

视图可以视为“虚拟表”或“储存的查询”；

创建视图所依据的表成为“基表”；

视图的优点有：

提供了另外一种级别的表的安全性；

隐藏的数据的复杂性；

简化的用户的sql命令；

隔离基表结构的改变；

通过重命名列，从另外一个角度提供数据。

创建视图

create view viename[(列名，列名...)]

as(子查询)

[with check option];

 

with check option：表示对于视图进行增、删、改操作时要保证更新的行满足视图定义中的谓语条件（即子查询中的条件表达式）

删除视图

drop view <视图名称> [cascade];

 

视图删除后视图的定义将从数据字典中删除。如果视图上还导出了其他视图。则使用cascade级联删除语句，把该视图和由他导出的所有视图一起删除。

在下列情况下，必须指明视图的所有列名：

某个目标列是聚集函数或者目标列表表达式；

多表连接时，选出了几个同名列作为视图的字段；

需要在视图中为某个列启用新的更合适的名字；

目标列是*

序列号

概念： Oracle使用序列生成器自动产生用户可以在事务中使用的唯一序列号，该序列号是一个整数类型数据，序列生成器主要完成在多用户环境下产生唯一的数字序列，但是不会造成额外的磁盘I/O或事务锁。

优点：

序列号是独立于表的对象，由Oracle自动维护；

序列号可以对多个用户共享使用，即同一个序列对象供多个表使用且相互独立；

在SQL语句中使用序列号就可以使用它产生的序列号；

***\*创建序列号\****

create sequence <序列号名>

increment by 1

start with 1

maxvalue 99999999999999999999

minvalue 1 nocycle;

 

（1）incerment：sequence每次增加的数值；

（2）start： Sequence 开始数值；

maxvalue： Sequence 最大值；

***\*（3）nocycle\****：当 Sequence 达最大值时，不重头开始（也可以选择“***\*cycle\****”，表示当 Sequence 达最大值时，重头开始）。

***\*修改序列号\****

alter sequence 序列名

　　[INCREMENT BY n]

　　[{MAXVALUE/ MINVALUE n|NOMAXVALUE}]

　　[{CYCLE|NOCYCLE}]

　　[{CACHE n|NOCACHE}];

 

注意：不能修改序列号的初始值。

***\*删除序列号\****

drop sequence 序列名;

38、insert

插入命令

insert into 表名[(列名,...)] values(数据,...);

 

注意：可以把values更换成一个子查询

39、update

修改命令

update 表名 set 列名 = 表达式 | 子查询,...

[where 条件表达式]

40、delete

删除命令

delete from 表名

[where 条件表达式];

41、事务

概念：事务是一组逻辑工作单元，它有一条或多条SQL语句组成。一个事务可以在操作的数据库对象上执行一个或多个操作，事务可以作为程序的部分功能而执行。

事务开始于一条可执行的SQL语句，继续执行事务主体，然后结束于以下的一种情况发生：

显示提交COMMIT：当事务遇到COMMIT指令时，将结束事务并永久保存所有更改的数据到数据库文件中；

显示回滚ROLLBACK：当事务遇到ROLLBACK指令时，也结束事务的执行，但是此时它回滚所有更改的数据到其原始值，即取消所有更改；

DDL语句：一旦用户在使用数据定义语言时，如CREATE、DROP等，则之前的所有DML语言操作都作为事务的一部分而提交，此时称为隐式提交；

非正常地结束程序：当程序崩溃或意外中止时，所有数据更改都被回滚，类似于显示回滚操作的结果，这里是隐式回滚的，因为没有用户参与。

特性

原子性（Atomicity）：事务要么执行成功，要么什么也不执行。如果事务执行了一部分而系统崩溃或发生异常，则Oracle将回滚所有更改的数据，此时Oracle使用还原段管理更改数据的原始值用户事务回滚；

一致性（Consistency）：事务必须保持数据库保持在一致状态，如在SCOTT用户的DEPT表中删除一条记录，但是EMP表中存在雇员属于要删除的部门，那就就拒绝这样的操作执行。即保持数据库中的数据保持在一致状态；

隔离性（Isolation）：使得多个用户隔离执行实现数据库的并发访问。这种隔离性要求一个事务修改的数据在未提交前，其他事务看不到它所做的更改。Oracle使用并发控制机制实现事务的隔离性；

持久性（Durability）：该特性保证提交的事务永久的保存在数据库中，在Oracle数据库中提交的数据并不是立即写入数据文件，而是先保存在数据库高速缓存中，为了防止实例崩溃，Oracle使用日志优先的方法，首先将提交的数据更改写入重做日志文件，即使实例崩溃也可以在实例恢复时，保证事务的持久性。

事务命令

commit（提交）：把上一个connit或rollback命令之后的全部事务都保存到数据库；

rollback（回滚）：撤销在上一次执行commit或者rollback命令之后执行的所有DML操作。

比较

commit和rollback的共同之处在于都能够结束事务，释放事务占用的资源，包括：封锁、内存等资源。二者的不同之处在于它们结束事务的方式不同。

commit和rollback命令只对DML起作用，DDL、DQL和DCL不需要commit和rollback。

42、锁

概念：是实现数据库并发控制的一个重要技术。

当一个事务首次发起一个DML语句时就获得一个锁，该锁保持到事务被提交或回滚。

DML中的insert、update、delete语句都会对操作的行产生锁定。

当Oracle数据库发生锁定等待时，如果不及时处理常常会引起Oracle数据库挂起，或导致死锁的发生，产生ORA错误。这些现象都会对实际应用产生极大的危害，如长时间未响应，大量事务失败等。