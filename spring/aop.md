## AOP概念
- Aspect:横切多个类的关注点的模块化。事务管理就是在Java企业级开发中对横切关注点的很好的例子。在Spring AOP中，aspect是通过基于schema配置或者`@Aspect`注解来实现。
- Join point:程序执行中的某个点，比如执行某个方法或者异常的处理。在Spring AOP中，join point总是代表一个方法的执行。
- Advice:切面在某个连接点(join point)采取的动作(简单说就是在某个连接点方法执行时采取的动作)。有`around`，`before`和`after`等动作。许多AOP框架，包括Spring，把advice建模成*interceptor*，在某个连接点维护一个拦截器链(a chain of interceptors)。
- Pointcut:一个匹配连接点的谓语。advice总是和切入点表达式关联在一起，并且在任何匹配切入点表达式的join point方法处运行(比如某个特定名称方法的执行)。Spring默认使用AspectJ切入点表达式语言。
- Target object：被一个或多个aspect切入的对象。由于Spring使用运行时代理来实现AOP，因此target object总是一个代理类。
- AOP proxy：由AOP框架创建的用于实现切面的对象。Spring框架中，AOP proxy是JDK动态代理或者CGLIB代理。
- Weaving：把切面和和其他对象连接起来创建一个`advised`对象。Spring AOP在运行时进行编织。

### Advice类型
- Before
- After returning
- After throwing
- After(finally)
- Around

### Advisor
advisor是在Spring 1.2时带入的概念，在AspectJ中没用相当应的概念。advisor就是一个只有一个advice的切面。