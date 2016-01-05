package org.console.ps4;

import org.console.core.GameConsole;

public class PS4GameConsole implements GameConsole{

	@Override
	public void about() {
		System.out.println("This is Sony PS4.It's awesome.");
	}

	@Override
	public String toString() {
		return "PS4GameConsole service";
	}
	
	
	
}
