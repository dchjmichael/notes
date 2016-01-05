package org.console.client;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.ServiceLoader;

import org.console.core.GameConsole;

public class ConsoleFactory {

	private static final List<GameConsole> consoles ;
	
	static{
		consoles = new ArrayList<>();
		ServiceLoader<GameConsole> services = ServiceLoader.load(GameConsole.class);
		
		Iterator<GameConsole> it = services.iterator();
		while(it.hasNext()){
			GameConsole console = it.next();
			consoles.add(console);
			
			System.out.println(console +" found.");
		}
	}
	

	public GameConsole getConsole(){
		if(consoles.isEmpty())
			throw new IllegalStateException("console service provider not available.");
		
		if(consoles.size() > 1){
			StringBuilder errMsg = new StringBuilder("found more than one console service provider.");
			String seperator = System.getProperty("line.separator");
			
			for (GameConsole gameConsole : consoles) {
				errMsg.append(seperator).append(gameConsole);
			}
			
			System.err.println(errMsg.toString());
			
			System.err.println("just return the first one found.");
			System.err.flush();
		}
		
		return consoles.get(0);
		
	}
	
}
