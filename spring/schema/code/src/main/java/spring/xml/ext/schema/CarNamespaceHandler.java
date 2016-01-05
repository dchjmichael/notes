package spring.xml.ext.schema;

import org.springframework.beans.factory.xml.NamespaceHandlerSupport;

public class CarNamespaceHandler extends NamespaceHandlerSupport {

	@Override
	public void init() {
		//遇到car元素的时候交给CarBeanDefinitionParser来解析
		registerBeanDefinitionParser("car", new CarBeanDefinitionParser());

	}

}
