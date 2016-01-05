package org.console.xbox;

import org.console.core.GameConsole;

public class XBOXOneGameConsole implements GameConsole {

	@Override
	public void about() {
		System.out.println("Hi,this is microsoft xbox one.It's awesome.");
	}

	@Override
	public String toString() {
		return "XBOXOneGameConsole service";
	}
	
	

}
