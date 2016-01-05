package spring.xml.ext.schema;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import spring.xml.ext.bean.Car;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:app.xml" })
public class SchemaTest {

	@Autowired
	@Qualifier("Ferrari458")
	private Car car;

	@Test
	public void propertyTest() {
		assertNotNull(car);

		String brand = car.getBrand();
		float engine = car.getEngine();
		int horsePower = car.getHorsePower();

		assertEquals("Brand incorrect.Should be Ferrari.", "Ferrari", brand);
		assertEquals("Engine incorrect.Should be 4.5L.", 4.5, engine, 0.000001);
		assertEquals("HorsePower incorrect.Should be 605hp.", 605, horsePower);

	}
}
