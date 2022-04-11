# [SpringBoot集成Redis](https://www.cnblogs.com/vchar/p/14591566.html)

Redis一个基于内存实现的NoSql数据库，通常将其用于数据缓存以此来减少系统的压力，下面我将在SpringBoot中分别实现Redis单机模式、Redis主从复制、Redis哨兵模式、Redis-Cluster模式在SpringBoot中的集成的示例。

## 一、SpringBoot中集成单机版Redis

Redis的相关安装教程这里不再赘述，请参考[Docker上安装Redis](https://blog.vchar.top/redis/1610674996.html)。示例项目源代码[https://github.com/vcharfred/spring-demo的Hoxton分支的redis-template*模块中](https://github.com/vcharfred/spring-demo/tree/Hoxton) 。

#### 添加redis的自动装配类

版本号不用写，直接使用springboot默认适配的版本即可

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- 使用lettuce做redis的连接池需要额外引入这个包-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

### 开箱即用的配置

正如标题所说开箱即用，我们只需要在application.yml配置类里面添加如下redis配置即可

```yaml
spring:
  redis:
    # 地址
    host: 192.168.56.102
    # 端口号
    port: 3306
    # 密码
    password: 123456
    # 超时时间，单位毫秒
    timeout: 3000
    # 数据库编号
    database: 0
    # 配置lettuce
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 1
        # 连接池中的最大空闲连接
        max-idle: 6
        # 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
        max-active: 10
        # 连接池最大阻塞等待时间（使用负值表示没有限制）；单位毫秒
        max-wait: 1000
      #关闭超时时间；单位毫秒
      shutdown-timeout: 200
```

springboot的redis自动装配类已经配置了一个StringRedisTemplate的bean，如果操作都是使用String的数据类型，那么直接使用即可，使用示例

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;

/**
 * 增删查改示例1
 */
@Override
public String crud1() {
    ValueOperations<String, String> operations = this.stringRedisTemplate.opsForValue();
    // 获取数据
    String val = operations.get("student:1");
    if(null==val){
        log.info("缓存中数据不存在");
        Student student = Student.create();
        val = JSON.toJSONString(student);
        // 添加数据
        operations.set("student:1", val);

        Student student2 = Student.create();
        student2.setId(2L);
        operations.set("student:2", JSON.toJSONString(student2));
        this.stringRedisTemplate.opsForList().leftPush("student_list", JSON.toJSONString(student));
        this.stringRedisTemplate.opsForList().leftPush("student_list", JSON.toJSONString(student2));

    }else {
        // 删除数据
        this.stringRedisTemplate.delete("student:2");
        log.info("删除缓存");
    }
    log.info(val);

    // 获取列表数据
    List<String> list = this.stringRedisTemplate.opsForList().range("student_list", 0, 3);
    log.info(JSON.toJSONString(list));
    return val;
}
```

### 自定义配置Redis操作的bean

StringRedisTemplate虽然可以满足需求，但是还是需要我们去序列化一下；因此我简化操作我们需要自定义配置创建RedisTemplate的bean。创建一个配置类继承CachingConfigurerSupport类。

```java
@Configuration
public class RedisConfig<K, V> extends CachingConfigurerSupport {

    /**
     * 自定义缓存注解key的生成策略。默认的生成策略是看不懂的(乱码内容)
     * 通过Spring 的依赖注入特性进行自定义的配置注入并且此类是一个配置类可以更多程度的自定义配置
     * 这里是生成的key是：类全名.方法名 方法参数（的md5加密）
     */
    @Bean
    @Override
    public KeyGenerator keyGenerator() {
        return (target, method, params) -> {
            StringBuilder prefix = new StringBuilder();
            prefix.append(target.getClass().getName());
            prefix.append(".").append(method.getName());
            StringBuilder sb = new StringBuilder();
            for (Object obj : params) {
                sb.append(obj.toString());
            }
            return prefix.append(DigestUtils.md5DigestAsHex(sb.toString().getBytes()));
        };
    }

    /**
     * 缓存配置管理器
     */
    @Bean
    public CacheManager cacheManager(LettuceConnectionFactory factory) {
        //以锁写入的方式创建RedisCacheWriter对象
        RedisCacheWriter writer = RedisCacheWriter.lockingRedisCacheWriter(factory);
        //设置缓存注解的缓存时间，缓存1小时
        Duration duration = Duration.ofSeconds(3600L);
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig().entryTtl(duration);
        return new RedisCacheManager(writer, redisCacheConfiguration);
    }

    /**
     * 修改redisTemplate的序列化方式
     *
     * @param factory LettuceConnectionFactory
     */
    @Bean(name = "redisTemplate")
    public RedisTemplate<K, V> redisTemplate(LettuceConnectionFactory factory) {
        //创建RedisTemplate对象
        RedisTemplate<K, V> template = new RedisTemplate<K, V>();
        template.setConnectionFactory(factory);
        //设置key的序列化方式
        template.setKeySerializer(keySerializer());
        template.setHashKeySerializer(keySerializer());

        //设置RedisTemplate的Value序列化方式Jackson2JsonRedisSerializer；默认是JdkSerializationRedisSerializer
        template.setValueSerializer(valueSerializer());
        template.setHashValueSerializer(valueSerializer());

        template.afterPropertiesSet();
        return template;
    }

    private RedisSerializer<String> keySerializer() {
        return new StringRedisSerializer();
    }

    private RedisSerializer<Object> valueSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);

        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会抛出异常
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);
        //解决时间序列化问题
        om.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        om.registerModule(new JavaTimeModule());

        jackson2JsonRedisSerializer.setObjectMapper(om);
        return jackson2JsonRedisSerializer;
    }

}
```

使用示例

```java
@Autowired
private RedisTemplate<String, Student> redisTemplate;

@Override
public Student crud2() {
    ValueOperations<String, Student> operations = this.redisTemplate.opsForValue();
    // 获取数据
    Student val = operations.get("student2:1");
    if(null==val){
        log.info("缓存中数据不存在");
        val = Student.create();
        // 添加数据
        operations.set("student2:1", val);
        
        Student student2 = Student.create();
        student2.setId(2L);
        operations.set("student2:2", student2);
        this.redisTemplate.opsForList().leftPush("student_list2", val);
        this.redisTemplate.opsForList().leftPush("student_list2", student2);
    }else {
        // 删除数据
        this.redisTemplate.delete("student2:2");
        log.info("删除缓存");
    }
    log.info(JSON.toJSONString(val));
    
    // 获取列表数据
    List<Student> list = this.redisTemplate.opsForList().range("student_list2", 0, 3);
    log.info(JSON.toJSONString(list));
    return val;
}
```

## 二、SpringBoot中实现Redis的读写分离

`spring-boot-starter-data-redis` 原生并不支持读写分离；因此需要我们去手动封装实现；实现思路：1.通过AOP来实现；2.封装工具类，我们在工具类里面实现；3.由使用者自己去处理。这里我们通过再次封装redisTemplate类来实现，简化调用者的工作。由于需要读写分离，因此我们需要自定义配置来实现。代码如下：

#### redis自定义属性配置RedisReadWriteConfig

```java
@Data
@Component
@ConfigurationProperties(prefix = "spring.redis")
public class RedisReadWriteConfig implements Serializable {

    /**
     * 主机地址
     */
    @Value("${spring.redis.host}")
    private String host;

    /**
     * 认证密码
     */
    @Value("${spring.redis.password:#{null}}")
    private String password;

    /**
     * 端口号
     */
    @Value("${spring.redis.port:6379}")
    private int port = 6379;

    /**
     * 数据库编号
     */
    @Value("${spring.redis.database:0}")
    private int database;

    /**
     * 连接超时时间，单位毫秒
     */
    @Value("${spring.redis.timeout:3000}")
    private long timeout;

    /**
     * 关闭超时时间，单位毫秒
     */
    @Value("${spring.redis.lettuce.shutdown-timeout:200}")
    private long shutdownTimeout;

    /**
     * 连接池中的最小空闲连接
     */
    @Value("${spring.redis.lettuce.pool.min-idle:1}")
    private int minIdle;

    /**
     * 连接池中的最大空闲连接
     */
    @Value("${spring.redis.lettuce.pool.max-idle:6}")
    private int maxIdle = 6;

    /**
     * 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
     */
    @Value("${spring.redis.lettuce.pool.max-active:10}")
    private int maxActive = 10;

    /**
     * 连接池最大阻塞等待时间（使用负值表示没有限制），单位毫秒
     */
    @Value("${spring.redis.lettuce.pool.max-wait:1000}")
    private long maxWait = 1000;

    /**
     * redis只读库配置
     */
    private List<RedisReadConfig> redisReadConfigs;

    @Data
    @Validated
    @AllArgsConstructor
    @NoArgsConstructor
    static class RedisReadConfig {

        /**
         * 主机地址
         */
        @NotEmpty
        private String host;

        /**
         * 认证密码
         */
        private String password;

        /**
         * 端口号
         */
        private int port = 6379;

        /**
         * 数据库编号
         */
        private int database = 0;
    }

    /**
     * 只读实例配置
     *
     * @return 返回所有数据读取的配置
     */
    public List<RedisStandaloneConfiguration> buildReadRedisStandaloneConfiguration() {
        if (enableReadWriteModel()) {
            redisReadConfigs = redisReadConfigs.stream().distinct().collect(Collectors.toList());
            List<RedisStandaloneConfiguration> list = new ArrayList<>(redisReadConfigs.size());
            for(RedisReadConfig readConfig : redisReadConfigs){
                list.add(createRedisStandaloneConfiguration(readConfig));
            }
            return list;
        }
        return null;
    }

    /**
     * 写实例配置
     *
     * @return 返回所有数据读取的配置
     */
    public RedisStandaloneConfiguration buildWriteRedisStandaloneConfiguration() {
        RedisReadConfig redisServerConfig = new RedisReadConfig();
        redisServerConfig.setHost(this.host);
        redisServerConfig.setPort(this.port);
        redisServerConfig.setPassword(this.password);
        redisServerConfig.setDatabase(this.database);
        return createRedisStandaloneConfiguration(redisServerConfig);
    }

    /**
     * 是否启动读写分离模式
     *
     * @return 启用返回true；否则false
     */
    public boolean enableReadWriteModel(){
        return redisReadConfigs != null && !redisReadConfigs.isEmpty();
    }

    private RedisStandaloneConfiguration createRedisStandaloneConfiguration(RedisReadConfig redisServerConfig) {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        // 连接地址
        redisStandaloneConfiguration.setHostName(redisServerConfig.getHost());
        // 认证密码
        redisStandaloneConfiguration.setPassword(redisServerConfig.getPassword());
        // 端口号，默认6379
        redisStandaloneConfiguration.setPort(redisServerConfig.getPort());
        // 数据库编号
        redisStandaloneConfiguration.setDatabase(redisServerConfig.getDatabase());
        return redisStandaloneConfiguration;
    }

}
```

配置示例

```yaml
server:
  port: 8088
spring:
  redis:
    # 地址
    host: 192.168.56.102
    # 端口号
    port: 6379
    # 密码
    password: 123456
    # 超时时间，单位毫秒
    timeout: 3000
    # 数据库编号
    database: 0
    # 配置lettuce
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 1
        # 连接池中的最大空闲连接
        max-idle: 6
        # 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
        max-active: 10
        # 连接池最大阻塞等待时间（使用负值表示没有限制）；单位毫秒
        max-wait: 1000
      #关闭超时时间；单位毫秒
      shutdown-timeout: 200
    # redis只读库配置
    redis-read-configs:
      - host: 192.168.56.104
        port: 6379
        password: 123456
      - host: 192.168.56.105
        port: 6379
        password: 123456
```

#### 自定义redis连接工厂ReadWriteLettuceConnectionFactory

由于我们有多个只读库，为了实现动态切换，我们自己是实现一个工厂，方便后面操作

```java
@Slf4j
@Component
public class ReadWriteLettuceConnectionFactory implements DisposableBean {

    private final LettuceConnectionFactory writeConnectionFactory;

    private final List<LettuceConnectionFactory> readConnectionFactories = new ArrayList<>();

    private final AtomicInteger pos = new AtomicInteger();

    private int max = -1;

    public ReadWriteLettuceConnectionFactory(RedisReadWriteConfig readWriteConfig) {
        this.writeConnectionFactory = createLettuceConnectionFactory(readWriteConfig, readWriteConfig.buildWriteRedisStandaloneConfiguration());
        Assert.notNull(writeConnectionFactory, "redis config can not null, if don't used please remove dependence redis jar.");

        if (readWriteConfig.enableReadWriteModel()) {
            List<RedisStandaloneConfiguration> list = readWriteConfig.buildReadRedisStandaloneConfiguration();
            if(null!=list){
                for(RedisStandaloneConfiguration rsc:list){
                    LettuceConnectionFactory connectionFactory = createLettuceConnectionFactory(readWriteConfig, rsc);
                    if(connectionFactory!=null){
                        log.info("redis-read-datasource - load a datasource [{}:{}] success!", rsc.getHostName(), rsc.getPort());
                        readConnectionFactories.add(connectionFactory);
                        max++;
                    }else {
                        log.warn("redis-read-datasource - load a datasource [{}:{}] fail!", rsc.getHostName(), rsc.getPort());
                    }
                }
            }else {
                log.warn("found read redis config, but can't load a datasource fail!");
            }
        }
    }

    /**
     * 获取读连接池
     * @return  返回连接工厂
     */
    public LettuceConnectionFactory getReadFactory() {
        // 简单的负载均衡：轮询方案
        if(pos.get()>max){
            pos.set(0);
        }
        int index = pos.getAndIncrement();
        log.info("chose redis-read-datasource index is [{}]", pos);
        return getReadFactory(index);
    }

    private LettuceConnectionFactory getReadFactory(int index) {
        if(index>max){
            log.warn("no suitable redis-read-datasource [{}], the max {}.", index, max);
            // 发生错误自动切换到写连接上去
            return writeConnectionFactory;
        }
        return readConnectionFactories.get(index);
    }

    /**
     * 获取写连接池
     * @return  返回连接工厂
     */
    public LettuceConnectionFactory getWriteFactory() {
        return writeConnectionFactory;
    }

    /**
     * 创建Lettuce连接工厂
     *
     * @param readWriteConfig redis配置
     * @param redisStandaloneConfiguration redis独立配置
     * @return 返回连接工厂
     */
    private LettuceConnectionFactory createLettuceConnectionFactory(RedisReadWriteConfig readWriteConfig
            , RedisStandaloneConfiguration redisStandaloneConfiguration) {

        if (redisStandaloneConfiguration == null) {
            return null;
        }

        // 连接池配置
        GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig();
        // 连接池中的最小空闲连接
        poolConfig.setMinIdle(readWriteConfig.getMinIdle());
        // 连接池中的最大空闲连接
        poolConfig.setMaxIdle(readWriteConfig.getMaxIdle());
        // 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
        poolConfig.setMaxTotal(readWriteConfig.getMaxActive());
        // 连接池最大阻塞等待时间（使用负值表示没有限制）
        poolConfig.setMaxWaitMillis(readWriteConfig.getMaxWait());

        LettucePoolingClientConfiguration.LettucePoolingClientConfigurationBuilder lettucePoolingClientConfigurationBuilder
                = LettucePoolingClientConfiguration.builder();
        // 连接池配置
        lettucePoolingClientConfigurationBuilder.poolConfig(poolConfig);
        // 关闭超时时间，单位毫秒
        lettucePoolingClientConfigurationBuilder.shutdownTimeout(Duration.ofMillis(readWriteConfig.getShutdownTimeout()));
        // 超时时间，单位毫秒
        lettucePoolingClientConfigurationBuilder.commandTimeout(Duration.ofMillis(readWriteConfig.getTimeout()));

        LettuceConnectionFactory lettuceConnectionFactory = new LettuceConnectionFactory(redisStandaloneConfiguration
                , lettucePoolingClientConfigurationBuilder.build());
        lettuceConnectionFactory.afterPropertiesSet();
        return lettuceConnectionFactory;
    }

    @Override
    public void destroy() throws Exception {
        writeConnectionFactory.destroy();
        if(!readConnectionFactories.isEmpty()){
            for(LettuceConnectionFactory connectionFactory:readConnectionFactories){
                connectionFactory.destroy();
            }
            readConnectionFactories.clear();
        }
        log.info("redis-datasource all closed success.");
    }
}
```

#### 重写RedisTemplate类实现多个只读库的动态切换

为了实现多个只读库能够自动的切换和轮询，需要对原来的RedisTemplate类做些升级，通过查看其源码发现每次执行相关操作前都会调用`getRequiredConnectionFactory()`这个方法；基于此我们通过继承`RedisTemplate`然后重写其`getRequiredConnectionFactory()`方法来实现只读库的切换。

```java
public class ReadWriteRedisTemplate<K, V> extends RedisTemplate<K, V> {

    private ReadWriteLettuceConnectionFactory readWriteConnectionFactory;

    private boolean isRead = false;

    /**
     * RedisTemplate每次执行方法时都会调用这个方法；如果只有1读1写，那么就没有必要再弄这个封装类，直接在创建的时候指定即可
     *
     * @return RedisConnectionFactory
     */
    @Override
    public RedisConnectionFactory getRequiredConnectionFactory() {
        return getFactory();
    }

    public void setReadWriteConnectionFactory(ReadWriteLettuceConnectionFactory readWriteConnectionFactory, boolean isRead) {
        this.isRead = isRead;
        this.readWriteConnectionFactory = readWriteConnectionFactory;
        setConnectionFactory(getFactory());
    }

    private RedisConnectionFactory getFactory(){
        if(this.isRead){
            return this.readWriteConnectionFactory.getReadFactory();
        }
        return this.readWriteConnectionFactory.getWriteFactory();
    }
}
```

#### 配置RedisTemplate的注入bean

```java
@Configuration
public class RedisCachingConfigurer<K, V> extends CachingConfigurerSupport {

    /**
     * 读数据的RedisTemplate
     *
     * @param factory LettuceConnectionFactory
     */
    @Bean(name = "readRedisTemplate")
    public RedisTemplate<K, V> readRedisTemplate(ReadWriteLettuceConnectionFactory factory) {
        return redisTemplate(factory, true);
    }

    /**
     * 写数据的RedisTemplate
     *
     * @param factory LettuceConnectionFactory
     */
    @Bean(name = "writeRedisTemplate")
    public RedisTemplate<K, V> writeRedisTemplate(ReadWriteLettuceConnectionFactory factory) {
        return redisTemplate(factory, false);
    }

    private RedisTemplate<K, V> redisTemplate(ReadWriteLettuceConnectionFactory factory, boolean isRead) {
        //创建Redis缓存操作助手RedisTemplate对象
        ReadWriteRedisTemplate<K, V> template = new ReadWriteRedisTemplate<K, V>();
        template.setReadWriteConnectionFactory(factory, isRead);
        //设置key的序列化方式
        template.setKeySerializer(keySerializer());
        template.setHashKeySerializer(keySerializer());

        //将RedisTemplate的Value序列化方式由JdkSerializationRedisSerializer更换为Jackson2JsonRedisSerializer
        template.setValueSerializer(valueSerializer());
        template.setHashValueSerializer(valueSerializer());

        template.afterPropertiesSet();
        return template;
    }

    private RedisSerializer<String> keySerializer() {
        return new StringRedisSerializer();
    }

    private RedisSerializer<Object> valueSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);

        ObjectMapper om = new ObjectMapper();
        // 指定要序列化的域，field,get和set,以及修饰符范围，ANY是都有包括private和public
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 指定序列化输入的类型，类必须是非final修饰的，final修饰的类，比如String,Integer等会抛出异常
        om.activateDefaultTyping(LaissezFaireSubTypeValidator.instance, ObjectMapper.DefaultTyping.NON_FINAL);
        //解决时间序列化问题
        om.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        om.registerModule(new JavaTimeModule());

        jackson2JsonRedisSerializer.setObjectMapper(om);
        return jackson2JsonRedisSerializer;
    }
}
```

#### 使用示例

```java
@Autowired
private RedisTemplate<String, Student>  writeRedisTemplate;
@Autowired
private RedisTemplate<String, Student>  readRedisTemplate;

/**
 * 由使用者自己判断应该是读还是写；注意只读的只能做读操作
 */
@Override
public Student crud1() {
    // 获取数据
    Student val = this.readRedisTemplate.opsForValue().get("student-rw1:1");
    if (null == val) {
        log.info("缓存中数据不存在");
        val = Student.create();
        // 添加数据
        this.writeRedisTemplate.opsForValue().set("student-rw1:1", val);

        Student student2 = Student.create();
        student2.setId(2L);
        this.writeRedisTemplate.opsForValue().set("student-rw1:2", student2);
        this.writeRedisTemplate.opsForList().leftPush("student_list-rw1", val);
        this.writeRedisTemplate.opsForList().leftPush("student_list-rw1", student2);
    } else {
        // 删除数据
        this.writeRedisTemplate.delete("student-rw1:2");
        log.info("删除缓存");
    }
    log.info(JSON.toJSONString(val));

    // 获取列表数据
    List<Student> list = this.readRedisTemplate.opsForList().range("student_list-rw1", 0, 3);
    log.info(JSON.toJSONString(list));
    return val;
}
```

#### 封装工具类

从上面的例子上我们发现手动切换不是太方便，因此这里我封装一个帮助类

```java
@Component
public class RedisHelper {

    private final RedisTemplate<String, String>  writeRedisTemplate;
    private final RedisTemplate<String, String>  readRedisTemplate;

    public RedisHelper(RedisTemplate<String, String> writeRedisTemplate, RedisTemplate<String, String> readRedisTemplate) {
        this.writeRedisTemplate = writeRedisTemplate;
        this.readRedisTemplate = readRedisTemplate;
    }

    /**
     * 设置值
     */
    public <T> boolean set(String key, T value) {
        if (value instanceof String) {
            return set(key, (String) value);
        }
        return set(key, JSON.toJSONString(value));
    }

    /**
     * 设置值
     */
    public <T> boolean set(String key, T value, long validTime) {
        if (value instanceof String) {
            return set(key, (String) value, validTime);
        }
        return set(key, JSON.toJSONString(value), validTime);
    }

    /**
     * 设置值
     */
    private boolean set(String key, String value, long validTime) {
        Boolean res = this.writeRedisTemplate.execute((RedisCallback<Boolean>) connection -> {
            RedisSerializer<String> serializer = this.writeRedisTemplate.getStringSerializer();
            byte[] keyByte = Objects.requireNonNull(serializer.serialize(key));
            byte[] valueByte = Objects.requireNonNull(serializer.serialize(value));
            connection.set(keyByte, valueByte);
            connection.expire(keyByte, validTime);
            return true;
        });
        return res != null && res;
    }

    /**
     * 设置某个值的缓存时间
     */
    public boolean setExpire(String key, long validTime) {
        Boolean res = this.writeRedisTemplate.execute((RedisCallback<Boolean>) connection -> {
            RedisSerializer<String> serializer = this.writeRedisTemplate.getStringSerializer();
            byte[] keyByte = Objects.requireNonNull(serializer.serialize(key));
            connection.expire(keyByte, validTime);
            return true;
        });
        return res != null && res;
    }

    /**
     * 设置值
     */
    private boolean set(String key, String value) {
        Boolean res = this.writeRedisTemplate.execute((RedisCallback<Boolean>) connection -> {
            RedisSerializer<String> serializer = this.writeRedisTemplate.getStringSerializer();
            connection.set(Objects.requireNonNull(serializer.serialize(key)), Objects.requireNonNull(serializer.serialize(value)));
            return true;
        });
        return res != null && res;
    }

    /**
     * 获取值
     */
    public <T> T get(String key, Class<T> clazz) {
        return JSON.parseObject(getValue(key), clazz);
    }

    /**
     * 获取值
     */
    public <T> List<T> getList(String key, Class<T> clazz) {
        return JSONArray.parseArray(getValue(key), clazz);
    }

    /**
     * 获取值
     */
    public String get(String key) {
        return getValue(key);
    }

    /**
     * 获取值
     */
    private String getValue(String key) {
        return this.readRedisTemplate.execute((RedisCallback<String>) connection -> {
            RedisSerializer<String> serializer = this.readRedisTemplate.getStringSerializer();
            byte[] value = connection.get(Objects.requireNonNull(serializer.serialize(key)));
            return serializer.deserialize(value);
        });
    }

    /**
     * 删除值
     */
    public void del(String key) {
        this.writeRedisTemplate.delete(key);
    }

    /**
     * 批量删除相同前缀的key
     */
    public void batchDel(String prefix) {
        Set<String> keys = keys(prefix);
        if (null != keys && !keys.isEmpty()) {
            this.writeRedisTemplate.delete(keys);
        }
    }

    /**
     * 批量删除
     */
    public void batchDel(Collection<String> keys) {
        this.writeRedisTemplate.delete(keys);
    }

    /**
     * 判断值缓存key是否存在
     */
    public boolean exist(String key) {
        Boolean res = this.writeRedisTemplate.hasKey(key);
        return res != null && res;
    }

    /**
     * 获取相同前缀的key
     */
    public Set<String> keys(String prefix) {
        return this.readRedisTemplate.keys(prefix + "*");
    }

    /**
     * 如果key不存在则设置，此方法使用了redis的原子性
     */
    public boolean setNx(String key, String value, long validTime) {
        return setNx(key, value, validTime, TimeUnit.SECONDS);
    }

    /**
     * 如果key不存在则设置，此方法使用了redis的原子性
     */
    public boolean setNx(String key, String value, long validTime, TimeUnit timeUnit) {
        try {
            ValueOperations<String, String> operations = this.writeRedisTemplate.opsForValue();
            Boolean lock = operations.setIfAbsent(key, value, validTime, timeUnit);
            return lock != null && lock;
        } catch (Exception e) {
            this.del(key);
            e.printStackTrace();
        }
        return false;
    }
}
```

使用示例

```java
@Autowired
private RedisHelper redisHelper;
/**
 * 通过工具类自动切换
 */
@Override
public Student crud2() {
    // 获取数据
    Student val = this.redisHelper.get("student-rw2:1", Student.class);
    if (null == val) {
        log.info("缓存中数据不存在");
        val = Student.create();
        // 添加数据
        this.redisHelper.set("student-rw2:1", val);

        Student student2 = Student.create();
        student2.setId(2L);
        this.redisHelper.set("student-rw2:2", student2);

        List<Student> list = Lists.newArrayList(val, student2);
        this.redisHelper.set("student_list-rw2", list);

    } else {
        // 删除数据
        this.redisHelper.del("student-rw2:2");
        log.info("删除缓存");
    }
    log.info(JSON.toJSONString(val));
    // 获取列表数据
    List<Student> list = this.redisHelper.getList("student_list-rw2", Student.class);
    log.info(JSON.toJSONString(list));
    return val;
}
```

## 三、Redis哨兵模式在SpringBoot中的使用

哨兵模式变化的就是配置信息；其他的和单机版的没有区别。

```yaml
spring:
  redis:
    # redis集群的密码
    password: 123456
    # 超时时间，单位毫秒
    timeout: 3000
    # 数据库编号
    database: 0
    # 配置lettuce
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 1
        # 连接池中的最大空闲连接
        max-idle: 6
        # 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
        max-active: 10
        # 连接池最大阻塞等待时间（使用负值表示没有限制）；单位毫秒
        max-wait: 1000
      #关闭超时时间；单位毫秒
      shutdown-timeout: 200
    # 哨兵配置
    sentinel:
      master: mymaster
      # 多个使用逗号分开
      nodes: 192.168.56.102:26379
      # 哨兵的密码
      password: 123456
```

哨兵模式就是每次通过哨兵来获取redis的master节点信息；同时会订阅其节点切换频道，当发生故障转移时，客户端能收到哨兵的通知，通过重新初始化连接池，完成主节点的切换。

## 四、Redis-Cluster模式在SpringBoot中的使用

Redis-Cluster模式变化的也只是配置信息；其他的和单机版的没有区别。

```yaml
spring:
  redis:
    # 密码
    password: 123456
    # 超时时间，单位毫秒
    timeout: 3000
    # 数据库编号
    database: 0
    # 配置lettuce
    lettuce:
      pool:
        # 连接池中的最小空闲连接
        min-idle: 1
        # 连接池中的最大空闲连接
        max-idle: 6
        # 连接池最大连接数（使用负值表示没有限制,不要配置过大，否则可能会影响redis的性能）
        max-active: 10
        # 连接池最大阻塞等待时间（使用负值表示没有限制）；单位毫秒
        max-wait: 1000
      #关闭超时时间；单位毫秒
      shutdown-timeout: 200
    # 集群配置
    cluster:
      # 最大失败次数
      max-redirects: 3
      # 集群节点
      nodes: 192.168.56.101:6379,192.168.56.102:6379,192.168.56.103:6379,192.168.56.104:6379,192.168.56.105:6379,192.168.56.106:6379
```