## 什么是SPI?
A service is a well-known set of interfaces and (usually abstract) classes. A service provider is a specific implementation of a service. The classes in a provider typically implement the interfaces and subclass the classes defined in the service itself. Service providers can be installed in an implementation of the Java platform in the form of extensions, that is, jar files placed into any of the usual extension directories. Providers can also be made available by adding them to the application's class path or by some other platform-specific means.


## API和SPI的区别
- the API is the description of classes/interfaces/methods/... that you call and use to achieve a goal and
- the SPI is the description of classes/interfaces/methods/... that you extend and implement to achieve a goal
Put differently, the API tells you what a specific class/method does for you and the SPI tells you what you must do to conform.

Usually API and SPI are separate. For example in JDBC the Driver class is part of the SPI: If you simply want to use JDBC, you don't need to use it directly, but everyone who implements a JDBC driver must implement that class.

Sometimes they overlap, however. The Connection interface is both SPI and API: You use it routinely when you use a JDBC driver and it needs to be implemented by the developer of the JDBC driver.


## 举个栗子

## 参考资料
- [ServiceLoader-javase docs](http://docs.oracle.com/javase/6/docs/api/java/util/ServiceLoader.html)
- [Developing a Service Provider using Java API(Service Provider Interface)](http://blog.csdn.net/fenglibing/article/details/7083526)
- [Difference between SPI and API](http://stackoverflow.com/questions/2954372/difference-between-spi-and-api/2956803#2956803)