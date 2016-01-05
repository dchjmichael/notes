package org.console.client;

import org.console.core.GameConsole;

public class App {

	public static void main(String[] args) {
		GameConsole console = new ConsoleFactory().getConsole();
		
		console.about();
	}
}
